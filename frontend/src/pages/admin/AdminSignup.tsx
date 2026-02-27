import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff, Home, GraduationCap, Loader2 } from "lucide-react" 



// --- FIREBASE IMPORTS  same jerom 6ilo login e //
import {  db } from "../../firebase/db" 
import{auth} from "../../firebase/auth"

import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"

const AdminSignup = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  // Input States
  const [formData, setFormData] = useState({
    name: "",
    insname: "",
    email: "",
    password: ""
  })

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // 1. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      )
      const user = userCredential.user






      // 2. Save Admin Info to Firestore
      await setDoc(doc(db, "admins", user.uid), {
        adminName: formData.name,
        institutionName: formData.insname,
        email: formData.email,
        role: "admin",
        createdAt: serverTimestamp()
      })

      // 3. iffffffffff  Success Move to Admin Dashboard//
      navigate("/admin/dashboard")
    } catch (error) {
  console.error("Signup Error:", error);
  if (error instanceof Error) {
    alert(error.message); // No more red line!
  } else {
    alert("An unexpected error occurred");
  }
} finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 p-6 selection:bg-cyan-500/30 font-sans">
      <div className="group relative w-full max-w-md">
        
        <div className="absolute -inset-1 bg-linear-to-r from-cyan-600 to-blue-600 rounded-xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="absolute -inset-px bg-linear-to-r from-cyan-400 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

        <Card className="relative w-full border-none bg-slate-900 text-slate-50 shadow-2xl overflow-hidden">
          
          <CardHeader className="space-y-4 pt-8">
            <div className="flex items-center justify-between w-full">
              <div className="group/logo relative">
                <div className="absolute -inset-1 bg-cyan-500 rounded-lg blur opacity-20 group-hover/logo:opacity-60 transition duration-500"></div>
                <div className="relative flex items-center space-x-2 bg-slate-800/50 border border-slate-700 px-3 py-1.5 rounded-lg">
                  <GraduationCap className="h-5 w-5 text-cyan-400" />
                  <span className="text-xl font-black tracking-tighter text-cyan-400">
                    Admission<span className="text-slate-50">PRO</span>
                  </span>
                </div>
              </div>

              <div className="group/home relative">
                <div className="absolute -inset-1 bg-cyan-500 rounded-lg blur opacity-0 group-hover/home:opacity-50 transition duration-500"></div>
                <Link 
                  to="/" 
                  className="relative flex items-center justify-center bg-slate-800 border border-slate-700 p-2 rounded-lg hover:border-cyan-500 transition-all text-cyan-400"
                >
                  <Home className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-2xl font-bold tracking-tight text-slate-300 uppercase">Admin Registration</h2>
              <CardDescription className="text-slate-400">
                Setup your institution's control center.
              </CardDescription>
            </div>
          </CardHeader>
          
          <form onSubmit={handleSignup}>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-slate-200 ml-1 text-sm tracking-wide">FULL NAME</Label>
                <Input 
                  id="name" 
                  type="text" 
                  required
                  placeholder="your full name " 
                  className="bg-slate-800/50 border-slate-700 text-slate-100 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="insname" className="text-slate-200 ml-1 text-sm tracking-wide">INSTITUTION NAME</Label>
                <Input 
                  id="insname" 
                  type="text" 
                  required
                  placeholder="full institution name" 
                  className="bg-slate-800/50 border-slate-700 text-slate-100 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all"
                  onChange={(e) => setFormData({...formData, insname: e.target.value})}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-slate-200 ml-1 text-sm tracking-wide">OFFICIAL EMAIL</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required
                  placeholder="admin@email.com" 
                  className="bg-slate-800/50 border-slate-700 text-slate-100 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password" className="text-slate-200 ml-1 text-sm tracking-wide">SECURE PASSWORD</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    required
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="bg-slate-800/50 border-slate-700 text-slate-100 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all pr-10"
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
            </CardContent>

            <br>  
            </br>

            <CardFooter className="flex flex-col gap-4 pb-8">
            
              <Button 
                disabled={loading}
                type="submit" 
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-lg py-6 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-[0.98]"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : "CREATE ADMIN ACCOUNT"}
              </Button>
              
              <div className="flex flex-col items-center gap-2 mt-2">
                <p className="text-xs text-slate-500 uppercase tracking-widest">
                  already registered? 
                  <Link to="/admin/login" className="ml-2 text-cyan-400 font-bold hover:text-cyan-300 transition-colors">
                    login here
                  </Link>
                </p>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default AdminSignup