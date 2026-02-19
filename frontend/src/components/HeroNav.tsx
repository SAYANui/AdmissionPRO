import { ModeToggle } from "./mode-toggle"
import { Button } from "./ui/button"

const HeroNav = () => {
  return (
    <nav className="container mx-auto border-b border-dashed">
      <div className="flex items-center justify-between p-4">
        <h1 className="text-xl">Admission<span className="text-primary">PRO</span></h1>
        <div className="flex justify-center items-center gap-2">
          <ModeToggle />
          <Button variant="outline" size="sm">Log In</Button>
          <Button variant="default" size="sm">Sign Up</Button>
        </div>
      </div>
    </nav>
  )
}

export default HeroNav
