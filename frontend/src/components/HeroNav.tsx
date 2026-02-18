import { ModeToggle } from "./mode-toggle"

const HeroNav = () => {
  return (
    <nav className="flex items-center justify-between p-4">
      <h1 className="text-xl">AsmissionPRO</h1>
      <ModeToggle />
    </nav>
  )
}

export default HeroNav
