// React se hooks import
import { useState } from "react"

// Icons (sirf UI ke liye)
import { MessageCircle, X, ArrowUpRight } from "lucide-react"

// Resume data import (AI ko context dene ke liye)
import { resumeData } from "../data/resumeData"

function PortfolioAssistant() {
  // ===== STATE =====

  // Bot open hai ya band
  const [open, setOpen] = useState(false)

  // User ka input question
  const [input, setInput] = useState("")

  // Gemini ka response
  const [answer, setAnswer] = useState("")

  // Loading state (Thinking…)
  const [loading, setLoading] = useState(false)


  const handleAsk = async () => {
    if (!input.trim()) return

    setLoading(true)
    setAnswer("")

    try {
      
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: input,
          resumeData: resumeData,
        }),
      })

      const data = await res.json()
      setAnswer(data.answer)
    } catch (error) {
      setAnswer("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  // ===== UI =====
  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* ================= CLOSED STATE ================= */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2
                     rounded-full border border-neutral-300 dark:border-neutral-700
                     bg-white dark:bg-neutral-900
                     text-sm font-medium
                     hover:bg-neutral-100 dark:hover:bg-neutral-800
                     transition"
        >
          <MessageCircle size={16} />
          Ask about my work
        </button>
      )}

      {/* ================= OPEN STATE ================= */}
      {open && (
        <div
          className="w-[340px] rounded-xl
                     border border-neutral-300 dark:border-neutral-700
                     bg-white dark:bg-neutral-900
                     shadow-lg"
        >
          {/* ===== HEADER ===== */}
          <div
            className="flex items-start justify-between p-4
                       border-b border-neutral-200 dark:border-neutral-800"
          >
            <div>
              <h3 className="text-sm font-medium">
                Rohan’s AI Copilot
              </h3>
              <p className="text-xs text-neutral-500">
                Answers about my work & experience
              </p>
            </div>

            {/* Close button */}
            <button
              onClick={() => setOpen(false)}
              className="text-neutral-500 hover:text-neutral-900
                         dark:hover:text-neutral-100 transition"
            >
              <X size={16} />
            </button>
          </div>

          {/* ===== BODY ===== */}
          <div className="p-4 space-y-4 text-sm">
            {/* Gemini Answer */}
            {answer && (
              <div
                className="rounded-md p-3
                           bg-neutral-100 dark:bg-neutral-800
                           text-neutral-800 dark:text-neutral-200
                           leading-relaxed"
              >
                {answer}
              </div>
            )}

            {/* Loading */}
            {loading && (
              <p className="text-xs text-neutral-500">
                Thinking…
              </p>
            )}

            {/* Input + Send */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills, roles…"
                className="flex-1 rounded-md
                           border border-neutral-300 dark:border-neutral-700
                           bg-transparent px-3 py-2
                           text-sm focus:outline-none"
              />

              <button
                onClick={handleAsk}
                disabled={loading}
                className="p-2 rounded-md
                           bg-neutral-900 text-white
                           hover:bg-neutral-800
                           dark:bg-neutral-100 dark:text-neutral-900
                           dark:hover:bg-neutral-200
                           transition"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PortfolioAssistant
