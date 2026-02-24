import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, 
  ArrowLeft, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  BookOpen, 
  Send,
  Upload
} from "lucide-react";

const AdmissionForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/student/statuspage");//redirect korbe sts page e 
    }, 2000);
  };

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-50 font-sans pb-10 selection:bg-cyan-500/30">
      
      {/* HEADER */}
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <Link to="/student/home" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-bold uppercase tracking-wider">Cancel</span>
        </Link>
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-cyan-400" />
          <span className="text-xl font-black text-cyan-400">Admission<span className="text-slate-50">PRO</span></span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 mt-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-black mb-3">Complete your Application</h1>
          <p className="text-slate-400">Fill in your details accurately to secure your admission!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
        
        


          <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-cyan-400" /> Your Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Name</label>
                <Input required placeholder="your full name" className="bg-slate-950 border-slate-800 focus:border-cyan-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">your personal email</label>
                <Input required type="email" placeholder="student@email.com" className="bg-slate-950 border-slate-800 focus:border-cyan-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                <Input required type="tel" placeholder="+91**********" className="bg-slate-950 border-slate-800 focus:border-cyan-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">your date of birth</label>
                <Input required type="date" className="bg-slate-950 border-slate-800 focus:border-cyan-500 transition-all text-slate-400" />
              </div>
            </CardContent>
          </Card>




<Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <User className="h-5 w-5 text-cyan-400" /> Your Father's details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Name</label>
                <Input required placeholder="your full name" className="bg-slate-950 border-slate-800 focus:border-cyan-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">email</label>
                <Input required type="email" placeholder="student@email.com" className="bg-slate-950 border-slate-800 focus:border-cyan-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                <Input required type="tel" placeholder="+91**********" className="bg-slate-950 border-slate-800 focus:border-cyan-500 transition-all" />
              </div>
            </CardContent>
          </Card>












       
          <Card className="bg-slate-900 border-slate-800 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-blue-400" /> Your Academic Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Previous organization/College</label>
                <Input required placeholder=" full name of your institution....." className="bg-slate-950 border-slate-800 focus:border-cyan-500" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Percentage/GPA</label>
                  <Input required placeholder="75% or 3.8" className="bg-slate-950 border-slate-800 focus:border-cyan-500" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase">Year of Passing</label>
                  <Input required placeholder="0000" className="bg-slate-950 border-slate-800 focus:border-cyan-500" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">Address</label>
                <Textarea placeholder="Enter your residential address" className="bg-slate-950 border-slate-800 focus:border-cyan-500 min-h-[100px]" />
              </div>
            </CardContent>
          </Card>

         
          <div className="p-6 border-2 border-dashed border-slate-800 rounded-2xl bg-slate-900/30 flex flex-col items-center justify-center text-center group hover:border-cyan-500/50 transition-all">
             <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-cyan-500 group-hover:text-slate-950 transition-all">
                <Upload className="h-6 w-6" />
             </div>
             <p className="font-bold text-slate-200">Upload document regarding your filled information (marksheet,adhaar & pan)</p>
             <p className="text-xs text-slate-500 mt-1">PDF(Max 5MB)</p>
             <input type="file" className="hidden" id="file-upload" />
             <Button variant="outline" type="button" className="mt-4 border-slate-700" onClick={() => document.getElementById('file-upload').click()}>
               click to Choose File
             </Button>
          </div>

         
          <Button 
            disabled={loading}
            type="submit" 
            className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black py-8 text-xl rounded-2xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-[0.98]"
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                PROCESSING...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                SUBMIT APPLICATION <Send className="h-5 w-5" />
              </div>
            )}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AdmissionForm;