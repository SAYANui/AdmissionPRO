"use client"

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
import { Eye, EyeOff, Home, GraduationCap, Loader2, AlertCircle } from "lucide-react"

// --- FIREBASE IMPORTS are here ........................asish bkl dekh




import { auth } from "../../firebase/auth"
import { signInWithEmailAndPassword } from "firebase/auth"

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await signInWithEmailAndPassword(auth, email, password)
      // On success, go to dashboard
      navigate("/admin/dashboard")
    } catch (err: any) {
      console.error(err)
      // Better error messaging
      if (err.code === 'auth/invalid-credential') {
        setError("Invalid email or password.")
      } else {
        setError("Failed to login. Please try again.")
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 p-6 selection:bg-cyan-500/30 font-sans">
      <div className="group relative w-full max-w-md">
        
        {/* EXTERNAL CARD GLOW   (pore add hoa6e)*/}
        <div className="absolute -inset-1 bg-linear-to-r from-cyan-600 to-blue-600 rounded-xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>

        <Card className="relative w-full border-none bg-slate-900 text-slate-50 shadow-2xl overflow-hidden">
          
          <CardHeader className="space-y-4 pt-8">
            <div className="flex items-center justify-between w-full">





              {/* Glowing Logo Box */}
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
                <Link 
                  to="/" 
                  className="relative flex items-center justify-center bg-slate-800 border border-slate-700 p-2 rounded-lg hover:border-cyan-500 transition-all text-cyan-400"
                >
                  <Home className="h-4 w-4" />
                </Link>
              </div>
            </div>

            <div className="text-center space-y-1 pt-2">
              <h2 className="text-2xl font-bold tracking-tight text-slate-300 capitalize">welcome back</h2>
              <CardDescription className="text-slate-400">
                Enter institution's credentials
              </CardDescription>
            </div>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="grid gap-6">





              
              {/* ERROR ALERT */}
              {error && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-xs animate-in fade-in zoom-in duration-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="email" className="text-slate-200 ml-1 text-sm font-medium">Your Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@email.com" 
                  required
                  className="bg-slate-800/50 border-slate-700 text-slate-100 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-slate-200 ml-1 text-sm font-medium">Saved Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    required
                    className="bg-slate-800/50 border-slate-700 text-slate-100 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all pr-10"
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
                type="submit"
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-extrabold text-base py-6 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    AUTHENTICATING...
                  </>
                ) : (
                  "LOGIN TO DASHBOARD"
                )}
              </Button>
              
              <div className="flex flex-col items-center gap-2 mt-2">
                <p className="text-xs text-slate-500">
                  First time? 
                  <Link to="/admin/signup" className="ml-1 text-cyan-400 font-bold hover:text-cyan-300 transition-colors underline-offset-4 hover:underline">
                    Sign up NOW!
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

export default AdminLogin