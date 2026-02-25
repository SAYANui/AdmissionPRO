"use client"

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, Clock, FileText, CreditCard, 
  GraduationCap, ChevronRight, Loader2, AlertCircle
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { db } from "../../firebase/db";
import {  auth } from "../../firebase/auth";

import { collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore";

const StatusPage = () => {
  const [application, setApplication] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const steps = [
    { id: 1, label: "Form Submitted", icon: FileText, statusMatch: "Pending" },
    { id: 2, label: "Under Review", icon: Clock, statusMatch: "Reviewing" },
    { id: 3, label: "Documents Verified", icon: CheckCircle2, statusMatch: "Verified" },
    { id: 4, label: "Final Payment", icon: CreditCard, statusMatch: "Payment" },
  ];

  useEffect(() => {
    // We fetch the latest application for the logged-in student
    const userEmail = auth.currentUser?.email;
    
    if (!userEmail) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "applications"),
      where("studentEmail", "==", userEmail),
      orderBy("createdAt", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        setApplication({ id: snapshot.docs[0].id, ...snapshot.docs[0].data() });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Map Firestore status text to a step number (1-4)
  const getCurrentStep = (status: string) => {
    switch (status) {
      case "Pending": return 1;
      case "Reviewing": return 2;
      case "Verified": return 3;
      case "Payment": return 4;
      case "Completed": return 5; // All done
      default: return 1;
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">
      <Loader2 className="h-10 w-10 animate-spin text-cyan-500" />
    </div>
  );

  if (!application) return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col items-center justify-center p-6 text-center">
      <AlertCircle className="h-16 w-16 text-slate-800 mb-4" />
      <h2 className="text-2xl font-bold">No Application Found</h2>
      <p className="text-slate-500 mt-2 mb-6">You haven't submitted any admission forms yet.</p>
      <Button asChild className="bg-cyan-600 text-slate-950 font-bold">
        <Link to="/student/admission-form">Apply Now</Link>
      </Button>
    </div>
  );

  const currentStepNum = getCurrentStep(application.status);

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-50 font-sans pb-20 selection:bg-cyan-500/30">
      
      {/* BRANDED HEADER */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700">
          <GraduationCap className="h-6 w-6 text-cyan-400" />
          <span className="text-2xl font-black tracking-tighter text-cyan-400">
            Admission<span className="text-slate-50">PRO</span>
          </span>
        </div>
        <Button asChild variant="outline" className="border-slate-700 bg-slate-800/30 text-slate-300 hover:text-cyan-400">
          <Link to="/student/home">HOME</Link>
        </Button>
      </nav>

      <main className="max-w-2xl mx-auto mt-12 px-6">
        {/* STATUS HEADER CARD */}
        <div className="group relative mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 transition"></div>
          <Card className="relative bg-slate-900 border-slate-800 overflow-hidden rounded-2xl border-none shadow-2xl">
            <CardHeader className="border-b border-slate-800/50 pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-100">
                    {application.institution || "Application Overview"}
                  </CardTitle>
                  <p className="text-cyan-400 font-medium">{application.studentName}</p>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                    ID: {application.id.substring(0, 8).toUpperCase()}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-8">
              {/* PROGRESS TRACKER VISUAL */}
              <div className="relative flex justify-between items-start">
                <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-800 z-0"></div>
                <div 
                  className="absolute top-5 left-0 h-0.5 bg-cyan-500 transition-all duration-1000 z-0" 
                  style={{ width: `${Math.min((currentStepNum - 1) * 33.33, 100)}%` }}
                ></div>

                {steps.map((step) => {
                  const Icon = step.icon;
                  const isCompleted = step.id < currentStepNum;
                  const isCurrent = step.id === currentStepNum;

                  return (
                    <div key={step.id} className="relative z-10 flex flex-col items-center">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 border-2
                        ${isCompleted ? 'bg-cyan-500 border-cyan-500' : 
                          isCurrent ? 'bg-slate-900 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]' : 
                          'bg-slate-900 border-slate-800'}
                      `}>
                        {isCompleted ? (
                          <CheckCircle2 className="h-5 w-5 text-slate-950" />
                        ) : (
                          <Icon className={`h-5 w-5 ${isCurrent ? 'text-cyan-400' : 'text-slate-600'}`} />
                        )}
                      </div>
                      <p className={`text-[10px] font-bold mt-3 uppercase tracking-tighter w-20 text-center
                        ${isCurrent ? 'text-cyan-400' : isCompleted ? 'text-slate-300' : 'text-slate-600'}
                      `}>
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* DETAILS SECTION */}
        <div className="space-y-4">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-slate-100 font-bold mb-4 flex items-center">
              <Clock className="mr-2 h-4 w-4 text-cyan-400" />
              Recent Activity
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Current Status</span>
                <span className={`font-bold italic ${application.status === 'Verified' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {application.status}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Submission Date</span>
                <span className="text-slate-300 font-medium">
                  {application.createdAt?.toDate().toLocaleDateString() || "N/A"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-300 hover:text-cyan-400 py-6 rounded-xl">
              Message Support
            </Button>
            <Button 
              disabled={currentStepNum < 4}
              className={`py-6 rounded-xl font-bold transition-all
                ${currentStepNum >= 4 
                  ? 'bg-cyan-600 text-slate-950 hover:bg-cyan-500 shadow-lg shadow-cyan-900/20' 
                  : 'bg-slate-800 text-slate-500 border-none cursor-not-allowed'}
              `}
            >
              {currentStepNum >= 5 ? 'Payment Completed' : 'Proceed to Payment'}
            </Button>
          </div>
        </div>

        <Link to="/student/home" className="flex items-center justify-center mt-12 text-sm text-slate-500 hover:text-cyan-400 transition-colors">
          <ChevronRight className="rotate-180 mr-1 h-4 w-4" />
          Back to feed
        </Link>
      </main>
    </div>
  );
};

export default StatusPage;