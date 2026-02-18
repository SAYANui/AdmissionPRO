import { Route, Routes } from "react-router";

import Hero from "@/pages/Hero";
import { ThemeProvider } from "./components/theme-provider";

export function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/" element={<Hero />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App;
