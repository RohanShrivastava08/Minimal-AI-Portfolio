import { useState } from "react"
import {
  MessageCircle,
  X,
  ArrowUpRight,
  Trash2,
  Minus,
} from "lucide-react"
import { askPortfolio } from "./portfolioBrain"
import { resumeData } from "../data/resumeData"

const SUGGESTED_QUESTIONS = [
  "What projects have you built?",
  "What technologies do you use?",
  "Tell me about your experience",
  "Give a quick introduction",
]

function AiAssistant() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState("")
  const [thinking, setThinking] = useState(false)
  const [messages, setMessages] = useState([])

  const askQuestion = (text) => {
    if (!text.trim()) return

    setThinking(true)
    setInput("")

    setMessages(prev => [
      { role: "user", text },
      ...prev,
    ])

    setTimeout(() => {
      const reply = askPortfolio(text, resumeData)
      setMessages(prev => [
        { role: "assistant", text: reply },
        ...prev,
      ])
      setThinking(false)
    }, 400)
  }

  const clearChat = () => {
    setMessages([])
    setThinking(false)
    setInput("")
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full
                     border bg-white dark:bg-neutral-900
                     border-neutral-300 dark:border-neutral-700
                     text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <MessageCircle size={16} />
          Portfolio Assistant
        </button>
      )}

      {open && (
        <div
          className="w-[330px] h-[440px] rounded-xl border
                     bg-white dark:bg-neutral-900
                     border-neutral-300 dark:border-neutral-700
                     shadow-lg flex flex-col"
        >
          {/* Header */}
          <div className="p-3 border-b flex justify-between items-center
                          border-neutral-200 dark:border-neutral-800">
            <div>
              <h3 className="text-sm font-medium">
                Portfolio Assistant
              </h3>
              <p className="text-xs text-neutral-500">
                Ask about my work
              </p>
            </div>
            <div className="flex gap-2">
              {messages.length > 0 && (
                <button onClick={clearChat}>
                  <Trash2 size={14} />
                </button>
              )}
              <button onClick={() => setOpen(false)}>
                <Minus size={16} />
              </button>
              <button onClick={() => setOpen(false)}>
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Chat */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3
                          flex flex-col-reverse text-sm">
            {thinking && (
              <div className="text-xs text-neutral-500">
                Thinking…
              </div>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 rounded-md
                            whitespace-pre-line animate-fadeIn
                            ${
                              msg.role === "user"
                                ? "ml-auto bg-neutral-900 text-white"
                                : "mr-auto bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                            }`}
              >
                {msg.text}
              </div>
            ))}

            {messages.length === 0 && !thinking && (
              <div className="space-y-2">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => askQuestion(q)}
                    className="block w-full text-left text-xs px-3 py-2
                               rounded-md border
                               border-neutral-200 dark:border-neutral-700
                               hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-3 border-t flex gap-2
                          border-neutral-200 dark:border-neutral-800">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask something…"
              className="flex-1 rounded-md border px-3 py-2 text-sm
                         bg-transparent
                         border-neutral-300 dark:border-neutral-700"
              onKeyDown={(e) =>
                e.key === "Enter" && askQuestion(input)
              }
            />
            <button
              onClick={() => askQuestion(input)}
              className="p-2 rounded-md bg-neutral-900 text-white
                         dark:bg-neutral-100 dark:text-neutral-900"
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
