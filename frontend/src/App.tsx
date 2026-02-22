import { Route, Routes } from "react-router";

import Hero from "@/pages/hero";
import StudentLogin from "./pages/student/StudentLogin";
import StudentSignup from "./pages/student/StudentSignup";
import { ThemeProvider } from "./components/theme-provider";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/login" element={<StudentLogin />} />
        <Route path="/signup" element={<StudentSignup />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App;
