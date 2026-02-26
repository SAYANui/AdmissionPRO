"use client"

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, Clock, FileText, CreditCard, 
  GraduationCap, ChevronRight, Loader2, AlertCircle, Sparkles, Upload, FileCheck
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { db } from "../../firebase/db";
import { auth } from "../../firebase/auth";
import { collection, query, where, orderBy, limit, onSnapshot, doc, updateDoc } from "firebase/firestore";

const StatusPage = () => {
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [finalDoc, setFinalDoc] = useState<File | null>(null);

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user?.email) {
        const q = query(
          collection(db, "applications"),
          where("studentEmail", "==", user.email),
          orderBy("createdAt", "desc"),
          limit(1)
        );

        const unsubscribeDocs = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            setApplication({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
          } else {
            setApplication(null);
          }
          setLoading(false);
        });

        return () => unsubscribeDocs();
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const getCurrentStep = (status: string) => {
    switch (status) {
      case "Pending": return 1;
      case "Reviewing": return 2;
      case "Verified": return 3;
      case "Payment": return 4;
      case "Completed": return 5; 
      default: return 1;
    }
  };

  // --- NEW: HANDLE FINAL DOCUMENT SUBMISSION ---
  const handleFinalUpload = async () => {
    if (!finalDoc || !application) return;
    setIsProcessing(true);
    
    try {
      const reader = new FileReader();
      reader.readAsDataURL(finalDoc);
      reader.onload = async () => {
        const base64 = reader.result as string;
        const appRef = doc(db, "applications", application.id);
        await updateDoc(appRef, {
          finalDocumentBase64: base64,
          status: "Verified", // Moves them to the next step
          finalDocUploadedAt: new Date()
        });
        alert("Final documents uploaded successfully!");
      };
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePayment = async () => {
    if (!application) return;
    setIsProcessing(true);
    try {
      const refId = "PAY-" + Math.random().toString(36).substring(2, 9).toUpperCase();
      const appRef = doc(db, "applications", application.id);
      await updateDoc(appRef, {
        status: "Completed",
        paymentRef: refId,
        paidAt: new Date()
      });
      alert(`Admission Confirmed! Ref: ${refId}`);
    } catch (error) {
      console.error(error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center"><Loader2 className="h-10 w-10 animate-spin text-cyan-500" /></div>;

  if (!application) return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <AlertCircle className="h-16 w-16 text-slate-800 mb-4" />
      <h2 className="text-2xl font-bold">No Application Found</h2>
      <Button asChild className="mt-6 bg-cyan-600"><Link to="/student/admission-form">Apply Now</Link></Button>
    </div>
  );

  const currentStepNum = getCurrentStep(application.status);

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-50 pb-20">
      {/* Navbar omitted for brevity*/}
      
      <main className="max-w-2xl mx-auto mt-12 px-6">
        {/* Status Stepper Card omitted for brevity*/}

        <div className="space-y-4 mt-8">
          
          {/* --- CONDITIONAL UPLOAD SECTION --- */}
          {/* This only shows if Admin sets status to "Reviewing" and no final doc exists yet */}




          {application.status === "Reviewing" && !application.finalDocumentBase64 && (
            <div className="bg-blue-500/10 border-2 border-dashed border-blue-500/30 p-6 rounded-2xl text-center">
              <Upload className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-bold text-blue-100">Action Required: Upload Final Docs</h3>
              <p className="text-xs text-slate-400 mb-4">Please upload your signed undertaking or missing certificates!!!.</p>
              
              <input 
                type="file" 
                id="final-doc" 
                className="hidden" 
                onChange={(e) => setFinalDoc(e.target.files ? e.target.files[0] : null)}
              />
              
              <div className="flex flex-col gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById('final-doc')?.click()}
                  className="border-slate-700 text-xs"
                >
                  {finalDoc ? finalDoc.name : "Select PDF"}
                </Button>
                
                {finalDoc && (
                  <Button 
                    onClick={handleFinalUpload} 
                    disabled={isProcessing}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-bold"
                  >
                    {isProcessing ? "Uploading..." : "Submit to Admin"}
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* --- PAYMENT SECTION --- */}
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-slate-100 font-bold mb-4 flex items-center gap-2">
              <Clock className="h-4 w-4 text-cyan-400" /> Status: {application.status}
            </h3>
            
            {application.status === "Payment" ? (
              <div className="space-y-4">
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-sm text-cyan-200">
                  Admin has approved your documents. Please complete the payment.
                </div>
                <Button 
                  onClick={handlePayment} 
                  disabled={isProcessing}
                  className="w-full py-8 bg-cyan-500 text-slate-950 font-black text-lg hover:bg-cyan-400"
                >
                  {isProcessing ? <Loader2 className="animate-spin" /> : "PAY ADMISSION FEE"}
                </Button>
              </div>
            ) : (
              <Button disabled className={`w-full py-6 rounded-xl font-bold ${application.status === "Completed" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-slate-800 text-slate-500"}`}>
                {application.status === "Completed" ? "ADMISSION SECURED" : "PENDING ADMIN REVIEW"}
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StatusPage;