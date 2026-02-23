import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, GraduationCap } from "lucide-react"; 

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
  
  
  
      <nav className="flex items-center justify-between px-8 py-6 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
        
        


        <div className="group relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
          <div className="relative flex items-center space-x-2 bg-slate-900 px-4 py-2 rounded-lg border border-slate-700">
            <GraduationCap className="h-6 w-6 text-cyan-400" />
            <span className="text-2xl font-black tracking-tighter text-cyan-400">
              Admission<span className="text-slate-50">PRO</span>
            </span>
          </div>
        </div>

   
        <div className="hidden md:flex space-x-8 font-medium text-slate-400">
          <Link to="/courses" className="hover:text-cyan-400 transition-colors">Courses</Link>
          <a href="#" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#" className="hover:text-cyan-400 transition-colors">Contact</a>
        </div>

       
        <div className="flex items-center space-x-4">

      
      
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg blur opacity-0 group-hover:opacity-50 transition duration-500"></div>
            <Link 
              to="/" 
              className="relative flex items-center justify-center bg-slate-900 border border-slate-700 p-2 rounded-lg hover:border-cyan-500 transition-all"
            >
              <Home className="h-5 w-5 text-cyan-400" />
            </Link>
          </div>

          <Link to="/student/login" className="text-slate-300 font-medium hover:text-cyan-400 transition">
            Login
          </Link>
          
          <Button asChild className="bg-cyan-600 text-slate-950 font-bold hover:bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <Link to="/student/signup">Sign Up</Link>
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-8 py-20 md:py-32 flex flex-col items-center text-center">
        <div className="group relative mb-6">
          <div className="absolute -inset-1 bg-cyan-500 rounded-full blur opacity-20 group-hover:opacity-40 transition"></div>
          <span className="relative bg-slate-900 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-sm font-semibold">
            AHHH AHHHH AHHHHHHHH💦💦
          </span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
          Your journey to <span className="text-cyan-400">Higher Education</span> starts here.
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
          The simplest way to manage your university applications, track your admission status, and pay fees—all in one secure dashboard[cite: 2].
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" className="bg-cyan-600 text-slate-950 px-8 py-7 rounded-xl text-lg font-bold hover:bg-cyan-500 shadow-lg shadow-cyan-900/20 active:scale-95 transition-all">
            Apply Now
          </Button>
          <Button variant="outline" size="lg" className="border-slate-700 bg-transparent text-slate-50 px-8 py-7 rounded-xl text-lg font-bold hover:bg-slate-900 hover:border-cyan-500 transition-all">
            Browse Courses
          </Button>
        </div>

        {/* Floating Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-slate-800 pt-12 w-full">
          <div>
            <div className="text-3xl font-bold text-cyan-400">10k+</div>
            <div className="text-slate-500 text-sm">Active Students</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-cyan-400">500+</div>
            <div className="text-slate-500 text-sm">Colleges</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-cyan-400">98%</div>
            <div className="text-slate-500 text-sm">Success Rate</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-cyan-400">24/7</div>
            <div className="text-slate-500 text-sm">Support</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;