import { Route, Routes } from "react-router";

<<<<<<< HEAD
=======
import Hero from "@/pages/hero";
import StudentLogin from "./pages/student/StudentLogin";
import StudentSignup from "./pages/student/StudentSignup";
>>>>>>> 94cd692d2408365fe1cbf0a86c7992b68f83f2e6
import { ThemeProvider } from "./components/theme-provider";
import Hero from "@/pages/Hero";
import AdminDashboard from "./pages/AdminDashboard";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Hero />} />
<<<<<<< HEAD
        <Route path="/dashboard" element={<AdminDashboard />} />
=======
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/signup" element={<StudentSignup />} />
>>>>>>> 94cd692d2408365fe1cbf0a86c7992b68f83f2e6
      </Routes>
    </ThemeProvider>
  )
}

export default App;
