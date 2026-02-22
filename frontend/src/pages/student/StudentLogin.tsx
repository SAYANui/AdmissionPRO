import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react" 
const StudentLogin = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 p-6 selection:bg-cyan-500/30">
      <div className="group relative w-full max-w-md">
        
       




        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl blur-2xl opacity-20 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
        <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

        <Card className="relative w-full border-none bg-slate-900 text-slate-50 shadow-2xl">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-black tracking-tighter text-cyan-400">
              Admission<span className="text-slate-50">PRO</span>
            </CardTitle>
            <CardDescription className="text-slate-400">
              Enter your secure credentials.
            </CardDescription>
          </CardHeader>
          
          <CardContent className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-slate-200 ml-1">Your Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="student@email.com" 
                className="bg-slate-800 border-slate-700 text-slate-100 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all"
              />
            </div>
            
            <div className="grid gap-2">
              <Label htmlFor="password" className="text-slate-200 ml-1">Password</Label>
              <div className="relative">
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="your password" 
                  className="bg-slate-800 border-slate-700 text-slate-100 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all pr-10"
                />
                
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-lg py-6 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.5)] active:scale-[0.98]">
              LOGIN
            </Button>
            
            <div className="flex flex-col items-center gap-2 mt-2">
              <p className="text-xs text-slate-500">
                New to the system? 
                <Link to="/student/signup" className="ml-1 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
                  sign up NOW!
                </Link>
              </p>
              <Link to="/" className="text-xs text-slate-100 hover:text-cyan-300 transition-colors">
                ← Back to Student Portal
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default StudentLogin