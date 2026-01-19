function Navbar() {
  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center border-b">
      <span className="font-semibold text-lg">
        minimal-ai-portfolio
      </span>

      <div className="flex gap-6 text-sm">
        <a href="#projects" className="hover:underline">Projects</a>
        <a href="#about" className="hover:underline">About</a>
        <a href="#contact" className="hover:underline">Contact</a>
      </div>
    </nav>
  )
}

export default Navbar
