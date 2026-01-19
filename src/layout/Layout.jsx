import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "../components/Navbar"

function Layout() {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    const root = document.documentElement
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark")
  }, [theme])

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors">
      <Navbar theme={theme} setTheme={setTheme} />
      <main className="max-w-5xl mx-auto px-6 py-16">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
