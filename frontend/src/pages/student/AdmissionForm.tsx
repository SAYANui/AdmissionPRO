"use client"

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  GraduationCap, ArrowLeft, User, BookOpen, Send, Upload, FileCheck, AlertCircle 
} from "lucide-react";

// --- FIREBASE IMPORTS ---
import { db } from "../../firebase/db"; 
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const AdmissionForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  
  // State for form fields
  const [formData, setFormData] = useState({
    studentName: "",
    studentEmail: "",
    phone: "",
    dob: "",
    fatherName: "",
    fatherEmail: "",
    fatherPhone: "",
    institution: "",
    gpa: "",
    passingYear: "",
    address: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // HELPER: Convert File to Base64 string
  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      alert("Please upload the required PDF document.");
      return;
    }

    // Double-check file size (1MB = 1048576 bytes)
    if (file.size > 1048576) {
      alert("File is too large! Please keep it under 1MB.");
      return;
    }

    setLoading(true);

    try {
      // 1. Convert PDF to string
      const base64String = await convertToBase64(file);

      // 2. Save to Firestore
      await addDoc(collection(db, "applications"), {
        ...formData,
        documentBase64: base64String, // The PDF stored as a string
        fileName: file.name,
        status: "Pending",
        createdAt: serverTimestamp()
      });

      navigate("/student/statuspage");
    } catch (error) {
      console.error("Firebase Error:", error);
      alert("Failed to submit. Check your connection or file size.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dark min-h-screen bg-slate-950 text-slate-50 font-sans pb-10 selection:bg-cyan-500/30">
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <Link to="/student/home" className="flex items-center gap-2 text-slate-400 hover:text-cyan-400 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span className="text-sm font-bold uppercase tracking-wider">Cancel</span>
        </Link>
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-cyan-400" />
          <span className="text-xl font-black text-cyan-400 uppercase tracking-tighter">Admission<span className="text-slate-50">PRO</span></span>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 mt-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black mb-3 tracking-tight">Complete Application</h1>
          <p className="text-slate-400">Your future starts here. Fill in the details below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* PERSONAL INFORMATION */}
          <Card className="bg-slate-900 border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-slate-100">
                <User className="h-5 w-5 text-cyan-400" /> Student Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Full Name</label>
                <Input name="studentName" required onChange={handleInputChange} className="bg-slate-950 border-slate-800 focus:ring-cyan-500/20" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Personal Email</label>
                <Input name="studentEmail" type="email" required onChange={handleInputChange} className="bg-slate-950 border-slate-800" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Phone Number</label>
                <Input name="phone" required onChange={handleInputChange} className="bg-slate-950 border-slate-800" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Date of Birth</label>
                <Input name="dob" type="date" required onChange={handleInputChange} className="bg-slate-950 border-slate-800 text-slate-400" />
              </div>
            </CardContent>
          </Card>

          {/* FATHER'S DETAILS */}
          <Card className="bg-slate-900 border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-cyan-500"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-slate-100">
                <User className="h-5 w-5 text-cyan-400" /> Father's Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Father's Name</label>
                <Input name="fatherName" required onChange={handleInputChange} className="bg-slate-950 border-slate-800" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Father's Email</label>
                <Input name="fatherEmail" type="email" required onChange={handleInputChange} className="bg-slate-950 border-slate-800" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Father's Contact</label>
                <Input name="fatherPhone" required onChange={handleInputChange} className="bg-slate-950 border-slate-800" />
              </div>
            </CardContent>
          </Card>

          {/* ACADEMIC DETAILS */}
          <Card className="bg-slate-900 border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg text-slate-100">
                <BookOpen className="h-5 w-5 text-blue-400" /> Academic Background
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Previous Institution</label>
                <Input name="institution" required onChange={handleInputChange} placeholder="Full name of school/college" className="bg-slate-950 border-slate-800" />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Aggregate Score (GPA/%)</label>
                  <Input name="gpa" required onChange={handleInputChange} className="bg-slate-950 border-slate-800" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Passing Year</label>
                  <Input name="passingYear" required onChange={handleInputChange} className="bg-slate-950 border-slate-800" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Residential Address</label>
                <Textarea name="address" required onChange={handleInputChange} className="bg-slate-950 border-slate-800 min-h-[100px]" />
              </div>
            </CardContent>
          </Card>

          {/* BASE64 FILE UPLOAD SECTION */}
          <div className={`p-8 border-2 border-dashed rounded-3xl bg-slate-900/40 flex flex-col items-center justify-center text-center transition-all duration-300 ${file ? 'border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.05)]' : 'border-slate-800 hover:border-cyan-500/50'}`}>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all duration-500 ${file ? 'bg-emerald-500 text-slate-950 rotate-[360deg]' : 'bg-slate-800 text-slate-400'}`}>
                {file ? <FileCheck className="h-7 w-7" /> : <Upload className="h-7 w-7" />}
              </div>
              <div className="space-y-1">
                <p className="font-bold text-slate-200">
                  {file ? file.name : "Documents (Marksheet, Aadhaar & PAN)"}
                </p>
                {!file && <p className="text-xs text-slate-500 uppercase tracking-widest">Combine into one PDF (Max 1MB)</p>}
                {file && <p className="text-[10px] text-emerald-500 font-black uppercase">Ready for submission</p>}
              </div>
              
              <input 
                type="file" 
                accept="application/pdf"
                className="hidden" 
                id="file-upload" 
                onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
              />
              <Button variant="outline" type="button" className="mt-6 border-slate-800 hover:bg-slate-800 text-xs font-bold uppercase tracking-widest" onClick={() => document.getElementById('file-upload')?.click()}>
                {file ? "Replace File" : "Choose PDF"}
              </Button>
          </div>

          <Button disabled={loading} type="submit" className="group w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black py-8 text-xl rounded-2xl shadow-[0_20px_40px_rgba(6,182,212,0.2)] transition-all active:scale-[0.98]">
            {loading ? (
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 border-4 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                UPLOADING...
              </div>
            ) : (
              <div className="flex items-center gap-2 uppercase tracking-tighter">
                Submit Application <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </div>
            )}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default AdmissionForm;