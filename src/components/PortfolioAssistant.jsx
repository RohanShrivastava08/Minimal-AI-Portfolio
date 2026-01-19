import { useState } from "react";
import { MessageCircle, X, ArrowUpRight } from "lucide-react";
import { resumeData } from "../data/resumeData";

function PortfolioAssistant() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setAnswer("");

    try {
      const res = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: input,
          resumeData,
        }),
      });

      const data = await res.json();
      setAnswer(data.answer);
    } catch (error) {
      setAnswer("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
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

      {open && (
        <div
          className="w-[340px] rounded-xl border
                        border-neutral-300 dark:border-neutral-700
                        bg-white dark:bg-neutral-900 shadow-lg"
        >
          {/* Header */}
          <div
            className="flex items-start justify-between p-4 border-b
                          border-neutral-200 dark:border-neutral-800"
          >
            <div>
              <h3 className="text-sm font-medium">Rohan’s AI Copilot</h3>
              <p className="text-xs text-neutral-500">
                Answers about my work & experience
              </p>
            </div>
            <button onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 text-sm">
            {answer && (
              <div
                className="rounded-md bg-neutral-100 dark:bg-neutral-800
                              p-3 text-neutral-800 dark:text-neutral-200
                              leading-relaxed"
              >
                {answer}
              </div>
            )}

            {loading && <p className="text-xs text-neutral-500">Thinking…</p>}

            <div className="flex gap-2">
              <input
                id="ai-question"
                name="ai-question"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about projects, skills, experience…"
                className="flex-1 rounded-md border
             border-neutral-300 dark:border-neutral-700
             bg-transparent px-3 py-2
             text-sm focus:outline-none"
              />

              <button
                onClick={handleAsk}
                disabled={loading}
                className="p-2 rounded-md bg-neutral-900 text-white
                           dark:bg-neutral-100 dark:text-neutral-900"
              >
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PortfolioAssistant;
