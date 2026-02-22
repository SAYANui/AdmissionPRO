// ashish == aro boro behen ka lauda
import {  useState } from "react"
import { Eye, EyeOff } from "lucide-react"
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
import { useNavigate } from "react-router-dom"

export default function AdminSignup() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Register Admin</CardTitle>
          <CardDescription>
            Create an administrator account for the admission system
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="first-name">Full Name</Label>
            <Input id="first-name" placeholder="John Doe" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="staff-id">College Name</Label>
            <Input id="staff-id" placeholder="abcd1234" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Work Email</Label>
            <Input id="email" type="email" placeholder="admin@college.edu" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type={showPassword ? "text" : "password"} />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" onClick={() => navigate("/admin/dashboard")}>Create Admin Account</Button>
          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Link to="/admin/login" className="text-primary hover:underline">
              Log in here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
