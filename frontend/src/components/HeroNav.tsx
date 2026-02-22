import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"
import { useNavigate } from "react-router"

const HeroNav = () => {
  const navigate = useNavigate()

  return (
    <header className="container mx-auto border-b border-dashed">
      <nav className="flex items-center justify-between p-4">
        <h1 className="text-xl">Admission<span className="text-primary font-extrabold">PRO</span></h1>
        <div className="flex justify-center items-center gap-2">
          <ModeToggle />
          <Button variant="outline" size="sm" onClick={() => navigate("/studentlogin")}>Log In</Button>
          <Button variant="default" size="sm" onClick={() => navigate("/studentsignup")}>Sign Up</Button>
        </div>
      </nav>
    </header>
  )
}

export default HeroNav
