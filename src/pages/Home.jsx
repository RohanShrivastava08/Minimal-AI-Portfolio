import { resumeData } from "../data/resumeData"
import { Linkedin, Github, Users, PenLine } from "lucide-react"
import { Link } from "react-router-dom"
import PortfolioAssistant from "../components/PortfolioAssistant"

function Home() {
  const { name, links = {} } = resumeData
  const firstName = name.split(" ")[0]

  return (
    <>
      {/* ===== MAIN HOME CONTENT ===== */}
      <section className="min-h-[85vh] flex items-center justify-center">
        <div className="text-center max-w-3xl px-6">

          {/* Intro */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight">
            Hi, I’m {firstName}
          </h1>

          <p className="mt-6 text-lg sm:text-xl leading-relaxed
                        text-neutral-600 dark:text-neutral-400">
            I design and build minimal, high-performance web experiences  
            with a strong focus on clarity and usability.
          </p>

          {/* Social icons */}
          <div className="mt-10 flex justify-center items-center gap-8">
            {links.linkedin && (
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-neutral-500 hover:text-neutral-900
                           dark:hover:text-neutral-100 transition"
              >
                <Linkedin size={22} />
              </a>
            )}

            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-neutral-500 hover:text-neutral-900
                           dark:hover:text-neutral-100 transition"
              >
                <Github size={22} />
              </a>
            )}

            {links.peerlist && (
              <a
                href={links.peerlist}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Peerlist"
                className="text-neutral-500 hover:text-neutral-900
                           dark:hover:text-neutral-100 transition"
              >
                <Users size={22} />
              </a>
            )}

            {links.blog && (
              <a
                href={links.blog}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Blog"
                className="text-neutral-500 hover:text-neutral-900
                           dark:hover:text-neutral-100 transition"
              >
                <PenLine size={22} />
              </a>
            )}
          </div>

          {/* CTA buttons */}
          <div className="mt-12 flex justify-center gap-4">
            <Link
              to="/projects"
              className="px-6 py-3 text-sm font-medium rounded-md
                         border border-neutral-300 dark:border-neutral-700
                         hover:bg-neutral-100 dark:hover:bg-neutral-800
                         transition"
            >
              View Projects
            </Link>

            <Link
              to="/contact"
              className="px-6 py-3 text-sm font-medium rounded-md
                         bg-neutral-900 text-white
                         hover:bg-neutral-800
                         dark:bg-neutral-100 dark:text-neutral-900
                         dark:hover:bg-neutral-200
                         transition"
            >
              Contact Me
            </Link>
          </div>

        </div>
      </section>

      {/* ===== FLOATING AI ASSISTANT ===== */}
      <PortfolioAssistant />
    </>
  )
}

export default Home
