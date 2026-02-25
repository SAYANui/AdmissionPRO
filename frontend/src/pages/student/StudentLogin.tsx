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








// --- FIREBASE IMPORTS .................................................//
import { auth } from "../../firebase/auth" // Adjust path if needed
import { signInWithEmailAndPassword } from "firebase/auth"

const StudentLogin = () => {
  const [showPassword, setShowPassword] = useState(false)
  const navigate = useNavigate()






  // --- LOGIC for email,password....................



  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  // --- LOGIN FUNCTION ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log("Logged in successfully!")
      navigate("/student/home") // Send to student dashboard
    } catch (error: any) {
      // Friendly error messages
      if (error.code === 'auth/user-not-found') alert("No user found with this email.")
      else if (error.code === 'auth/wrong-password') alert("Incorrect password.")
      else alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-950 p-6 selection:bg-cyan-500/30 font-sans">
      <div className="group relative w-full max-w-md">
        
        {/* EXTERNAL CARD GLOW */}
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-xl blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
        <div className="absolute -inset-px bg-gradient-to-r from-cyan-400 to-cyan-600 rounded-xl opacity-0 group-hover:opacity-100 transition duration-500"></div>

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
              <h2 className="text-2xl font-bold tracking-tight text-slate-300">welcome back student</h2>
              <CardDescription className="text-slate-400">
                Enter your secure credentials.
              </CardDescription>
            </div>
          </CardHeader>
          
          <form onSubmit={handleLogin}>
            <CardContent className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-slate-200 ml-1 text-sm">your email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@email.com" 
                  className="bg-slate-800/50 border-slate-700 text-slate-100 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all"
                />
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-slate-200 ml-1 text-sm">password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••" 
                    className="bg-slate-800/50 border-slate-700 text-slate-100 focus-visible:ring-cyan-500 focus-visible:border-cyan-500 transition-all pr-10"
                  />
                  
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pb-8">

<br>
</br>

            
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold text-lg py-6 rounded-lg transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] active:scale-[0.98]"
              >
                {loading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "LOGIN"}
              </Button>
              
              <div className="flex flex-col items-center gap-2 mt-2">
                <p className="text-xs text-slate-500">
                  New here? 
                  <Link to="/student/signup" className="ml-1 text-cyan-400 font-semibold hover:text-cyan-300 transition-colors">
                    Sign up NOW!
                  </Link>
                </p>
                <div className="group/inst relative w-full">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-0 group-hover/inst:opacity-40 transition duration-500"></div>
                  
                  <Button 
                    asChild 
                    type="button"
                    variant="outline" 
                    className="relative w-full border-slate-700 bg-slate-800/30 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/50 transition-all py-5"
                  >
                    <Link to="/admin/login">
                      Login as Institution
                    </Link>
                  </Button>
                </div>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default StudentLogin