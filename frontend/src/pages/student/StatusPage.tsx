import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle2, 
  Clock, 
  FileText, 
  CreditCard, 
  GraduationCap, 
  Home as HomeIcon,
  ChevronRight
} from "lucide-react";

const StatusPage = () => {
  // In a real app, this data would come from Firebase based on the Logged-in Student's ID
  const applicationStatus = {
    collegeName: "Tech University",
    course: "B.Tech Computer Science",
    trackingId: "ADPRO-8829-X12",
    currentStep: 2, // 1: Submitted, 2: Under Review, 3: Verified, 4: Payment
    updatedAt: "Oct 24, 2023",
  };

  const steps = [
    { id: 1, label: "Form Submitted", icon: FileText },
    { id: 2, label: "Under Review", icon: Clock },
    { id: 3, label: "Documents Verified", icon: CheckCircle2 },
    { id: 4, label: "Final Payment", icon: CreditCard },
  ];

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-50 font-sans pb-20 selection:bg-cyan-500/30">
      
      {/* BRANDED HEADER */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="group/logo relative">
          <div className="absolute -inset-1 bg-cyan-500 rounded-lg blur opacity-25 group-hover/logo:opacity-75 transition duration-1000"></div>
          <div className="relative flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700">
            <GraduationCap className="h-6 w-6 text-cyan-400" />
            <span className="text-2xl font-black tracking-tighter text-cyan-400">
              Admission<span className="text-slate-50">PRO</span>
            </span>
          </div>
        </div>

        <div className="group/home relative">
         
               <Button 
                 asChild 
                 variant="outline" 
                 className="relative w-full border-slate-700 bg-slate-800/30 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all py-5"
               >
                 <Link to="/student/home">
                   HOME
                 </Link>
               </Button>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto mt-12 px-6">
        {/* STATUS HEADER CARD */}
        <div className="group relative mb-8">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-2xl blur opacity-20 transition"></div>
          <Card className="relative bg-slate-900 border-slate-800 overflow-hidden rounded-2xl border-none shadow-2xl">
            <CardHeader className="border-b border-slate-800/50 pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl font-bold text-slate-100">{applicationStatus.collegeName}</CardTitle>
                  <p className="text-cyan-400 font-medium">{applicationStatus.course}</p>
                </div>
                <div className="bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 rounded-full">
                  <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">
                    ID: {applicationStatus.trackingId}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-8">
              {/* PROGRESS TRACKER VISUAL */}
              <div className="relative flex justify-between items-start">
                {/* Connecting Line */}
                <div className="absolute top-5 left-0 w-full h-0.5 bg-slate-800 z-0"></div>
                <div 
                  className="absolute top-5 left-0 h-0.5 bg-cyan-500 transition-all duration-1000 z-0" 
                  style={{ width: `${(applicationStatus.currentStep - 1) * 33.33}%` }}
                ></div>

                {steps.map((step) => {
                  const Icon = step.icon;
                  const isCompleted = step.id < applicationStatus.currentStep;
                  const isCurrent = step.id === applicationStatus.currentStep;

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
                <span className="text-slate-500">Last Updated</span>
                <span className="text-slate-300 font-medium">{applicationStatus.updatedAt}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Verification Status</span>
                <span className="text-amber-400 font-medium italic">Pending Admin Review</span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" className="border-slate-800 bg-slate-900/50 text-slate-300 hover:text-cyan-400 py-6 rounded-xl">
              Message Support
            </Button>
            <Button 
              disabled={applicationStatus.currentStep < 4}
              className={`py-6 rounded-xl font-bold transition-all
                ${applicationStatus.currentStep >= 4 
                  ? 'bg-cyan-600 text-slate-950 hover:bg-cyan-500 shadow-lg shadow-cyan-900/20' 
                  : 'bg-slate-800 text-slate-500 border-none cursor-not-allowed'}
              `}
            >
              Proceed to Payment
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