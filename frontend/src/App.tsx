import { Route, Routes } from "react-router";

import { ThemeProvider } from "./components/theme-provider";
import Hero from "@/pages/Hero";
import AdminDashboard from "./pages/admin/dashboard";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminLogin from "./pages/admin/AdminLogin";
import ManageCourses from "./pages/admin/managecourses";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/signup" element={<AdminSignup />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/managecourses" element={<ManageCourses />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App;
