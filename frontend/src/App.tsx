import { Route, Routes } from "react-router";

import { ThemeProvider } from "./components/theme-provider";
import Hero from "@/pages/Hero";
import AdminDashboard from "./pages/admin/dashboard";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminLogin from "./pages/admin/AdminLogin";
import ManageCourses from "./pages/admin/managecourses";
import StudentLogin from "./pages/student/StudentLogin";
import StudentSignup from "./pages/student/StudentSignup";
import StatusPage from "./pages/student/StatusPage";
import Home from "./pages/student/home";
import Coursesdetails from "./pages/student/coursesdetails";
import AdmissionForm from "./pages/student/AdmissionForm";
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
        <Route path="/student/login" element={<StudentLogin/>}/>
        <Route path="/student/signup" element={<StudentSignup/>}/>
        <Route path="/student/home" element={<Home/>}/>
        <Route path="/student/statuspage" element ={<StatusPage/>}/>
<Route path="/student/course/:id" element={<Coursesdetails />} />
<Route path="/student/apply" element={<AdmissionForm/>}/>
      </Routes>
    </ThemeProvider>
  )
}

export default App;
