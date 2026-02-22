import { Route, Routes } from "react-router";

import { ThemeProvider } from "./components/theme-provider";
import Hero from "@/pages/Hero";
import AdminDashboard from "./pages/AdminDashboard";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/dashboard" element={<AdminDashboard />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App;
