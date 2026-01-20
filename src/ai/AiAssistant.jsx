import { useState } from "react"
import { MessageCircle, X, ArrowUpRight, Trash2, Minus } from "lucide-react"
import { askPortfolio } from "./portfolioBrain"
import { resumeData } from "../data/resumeData"

const SUGGESTED_QUESTIONS = [
  "What projects has Rohan built?",
  "What technologies does he use?",
  "Where has he worked before?",
  "Tell me about him",
]

function AiAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const [messages, setMessages] = useState([])

  const askQuestion = (question) => {
    if (!question.trim()) return

    setMessages(prev => [...prev, { role: "user", text: question }])
    setInput("")
    setThinking(true)

    setTimeout(() => {
      const reply = askPortfolio(question, resumeData)
      setMessages(prev => [...prev, { role: "assistant", text: reply }])
      setThinking(false)
    }, 400)
  }

  const clearChat = () => {
    setMessages([])
    setInput("")
    setThinking(false)
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Floating button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2
                     rounded-full border border-neutral-300
                     bg-white text-sm font-medium
                     hover:bg-neutral-100 transition"
        >
          <MessageCircle size={16} />
          Portfolio Assistant
        </button>
      )}

      {/* Assistant panel */}
      {open && (
        <div className="w-[340px] h-[460px]
                        rounded-xl border bg-white
                        shadow-lg flex flex-col">

          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b">
            <div>
              <h3 className="text-sm font-medium">Portfolio Assistant</h3>
              <p className="text-xs text-neutral-500">
                Chat about my work
              </p>
            </div>

            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  title="Clear chat"
                  className="text-neutral-500 hover:text-neutral-900"
                >
                  <Trash2 size={15} />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                title="Minimize"
                className="text-neutral-500 hover:text-neutral-900"
              >
                <Minus size={16} />
              </button>
              <button
                onClick={() => setOpen(false)}
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat body */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
            {messages.length === 0 && !thinking && (
              <div className="space-y-2">
                {SUGGESTED_QUESTIONS.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => askQuestion(q)}
                    className="block w-full text-left text-xs
                               px-3 py-2 rounded-md
                               border border-neutral-200
                               hover:bg-neutral-100 transition"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] px-3 py-2 rounded-md
                            whitespace-pre-line animate-fadeIn
                            ${msg.role === "user"
                              ? "ml-auto bg-neutral-900 text-white"
                              : "mr-auto bg-neutral-100 text-neutral-900"
                            }`}
              >
                {msg.text}
              </div>
            ))}

            {thinking && (
              <div className="text-xs text-neutral-500">
                Thinking…
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question…"
              className="flex-1 rounded-md border px-3 py-2 text-sm"
              onKeyDown={(e) => {
                if (e.key === "Enter") askQuestion(input)
              }}
            />
            <button
              onClick={() => askQuestion(input)}
              className="p-2 rounded-md bg-neutral-900 text-white"
            >
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AiAssistant
