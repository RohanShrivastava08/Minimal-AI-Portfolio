export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { question, resumeData } = req.body

  if (!question || !resumeData) {
    return res.status(400).json({ error: "Invalid request" })
  }

  const API_KEY = process.env.GEMINI_API_KEY

  // ---- COMPRESSED, CLEAR PROMPT (VERY IMPORTANT) ----
  const prompt = `
You are a professional AI assistant for a developer portfolio.

Rules:
- Answer ONLY using the information provided below
- Be concise, clear, and professional
- Do NOT invent or assume anything
- If information is missing, say "That information is not mentioned"

Portfolio Info:
Name: ${resumeData.name}
Role: ${resumeData.role}

Projects:
${resumeData.projects.map(p => `- ${p.name}: ${p.description}`).join("\n")}

Skills:
${Object.values(resumeData.skills).flat().join(", ")}

Experience:
${resumeData.experience.map(e => `- ${e.role} at ${e.company}`).join("\n")}

Education:
${resumeData.education.map(e => `- ${e.detail} at ${e.institute}`).join("\n")}

Question:
${question}
`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    )

    const data = await response.json()

    // ---- SAFE PARSING (THIS FIXES YOUR ISSUE) ----
    let answer = "That information is not mentioned."

    const parts = data?.candidates?.[0]?.content?.parts
    if (Array.isArray(parts)) {
      const text = parts.map(p => p.text).filter(Boolean).join("\n")
      if (text.trim()) answer = text
    }

    return res.status(200).json({ answer })
  } catch (error) {
    console.error("Gemini API error:", error)
    return res.status(500).json({ error: "Gemini request failed" })
  }
}
