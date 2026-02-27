"use client"

import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, Clock, FileText, CreditCard, 
  GraduationCap, ChevronRight, Loader2, AlertCircle, Sparkles, Upload, FileCheck, RefreshCw
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { db } from "../../firebase/db";
import { auth } from "../../firebase/auth";
import { collection, query, where, orderBy, limit, getDocs, doc, updateDoc } from "firebase/firestore";

const StatusPage = () => {
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [finalDoc, setFinalDoc] = useState<File | null>(null);

  // --- OPTIMIZED FETCH LOGIC ---
  const fetchStatus = useCallback(async (userEmail: string) => {
    setRefreshing(true);
    try {
      const q = query(
        collection(db, "applications"),
        where("studentEmail", "==", userEmail),
        orderBy("createdAt", "desc"),
        limit(1)
      );

      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setApplication({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
      } else {
        setApplication(null);
      }
    } catch (error) {
      console.error("Error fetching status:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user?.email) {
        fetchStatus(user.email);
      } else {
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [fetchStatus]);

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

  // --- LOGIC FIX: Handle Final Document Submission ---
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
          status: "Verified", 
          finalDocUploadedAt: new Date()
        });
        
        alert("Final documents uploaded successfully!");
        // Refresh local data after update
        fetchStatus(auth.currentUser?.email!);
      };
    } catch (error) {
      console.error("Upload error:", error);
      alert("Upload failed. Try a smaller file.");
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
      fetchStatus(auth.currentUser?.email!);
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
      <Button asChild className="mt-6 bg-cyan-600"><Link to="/student/home">Browse Courses</Link></Button>
    </div>
  );

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-50 pb-20">
      
      {/* Mini-Header with Refresh */}
      <div className="max-w-2xl mx-auto pt-8 px-6 flex justify-between items-center">
        <h1 className="text-xl font-bold tracking-tight">Application Tracker</h1>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => fetchStatus(auth.currentUser?.email!)}
          className="text-slate-500 hover:text-cyan-400"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Sync
        </Button>
      </div>

      <main className="max-w-2xl mx-auto mt-12 px-6">
        {/* Step Visualization Logic (Your current step is {getCurrentStep(application.status)}) */}
        
        <div className="space-y-4 mt-8">
          
          {/* --- CONDITIONAL UPLOAD SECTION --- */}
          {application.status === "Reviewing" && !application.finalDocumentBase64 && (
            <div className="bg-blue-500/10 border-2 border-dashed border-blue-500/30 p-6 rounded-2xl text-center">
              <Upload className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <h3 className="font-bold text-blue-100">Action Required: Upload Final Docs</h3>
              <p className="text-xs text-slate-400 mb-4">Please upload your signed undertaking or missing certificates.</p>
              
              <input 
                type="file" 
                id="final-doc" 
                className="hidden" 
                accept=".pdf,image/*"
                onChange={(e) => setFinalDoc(e.target.files ? e.target.files[0] : null)}
              />
              
              <div className="flex flex-col gap-3">
                <Button 
                  variant="outline" 
                  onClick={() => document.getElementById('final-doc')?.click()}
                  className="border-slate-700 text-xs"
                >
                  {finalDoc ? finalDoc.name : "Select Document (PDF/Image)"}
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
            <div className="flex justify-between items-center mb-4">
               <h3 className="text-slate-100 font-bold flex items-center gap-2">
                <Clock className="h-4 w-4 text-cyan-400" /> Current Status
              </h3>
              <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 text-xs font-bold rounded-full border border-cyan-500/20">
                {application.status.toUpperCase()}
              </span>
            </div>
            
            {application.status === "Payment" ? (
              <div className="space-y-4">
                <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-sm text-cyan-200">
                  Congratulations! Admin has approved your documents. Please complete the admission fee payment to secure your seat.
                </div>
                <Button 
                  onClick={handlePayment} 
                  disabled={isProcessing}
                  className="w-full py-8 bg-cyan-500 text-slate-950 font-black text-lg hover:bg-cyan-400 transition-all"
                >
                  {isProcessing ? <Loader2 className="animate-spin" /> : "PAY ADMISSION FEE"}
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                 <Button disabled className={`w-full py-6 rounded-xl font-bold transition-all ${application.status === "Completed" ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-slate-800 text-slate-500"}`}>
                  {application.status === "Completed" ? "ADMISSION SECURED ✓" : "PENDING ADMIN REVIEW"}
                </Button>
                {application.status === "Completed" && (
                  <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest">
                    Payment Ref: {application.paymentRef}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default StatusPage;