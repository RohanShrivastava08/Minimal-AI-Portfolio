import { NavLink } from "react-router-dom"
import { Moon, Sun } from "lucide-react"

const links = [
  { to: "/", label: "Home" },
  { to: "/experience", label: "Experience" },
  { to: "/projects", label: "Projects" },
  { to: "/skills", label: "Skills" },
  { to: "/education", label: "Education" },
  { to: "/volunteer", label: "Volunteer" },
]

function Navbar({ theme, setTheme }) {
  return (
    <nav className="sticky top-0 z-50 bg-neutral-50/80 dark:bg-neutral-950/80 backdrop-blur border-b border-neutral-200 dark:border-neutral-800">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <NavLink to="/" className="text-sm font-semibold">
          Rohan.dev
        </NavLink>

        <div className="flex items-center gap-6 text-sm">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `transition relative ${
                  isActive
                    ? "font-medium"
                    : "opacity-70 hover:opacity-100"
                }`
              }
            >
              {link.label}
              {({ isActive }) =>
                isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-px bg-current" />
                )
              }
            </NavLink>
          ))}

          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="ml-2 p-2 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
