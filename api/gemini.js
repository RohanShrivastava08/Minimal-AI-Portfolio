export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { question, resumeData } = req.body

  if (!question || !resumeData) {
    return res.status(400).json({ error: "Invalid request" })
  }

  const API_KEY = process.env.GEMINI_API_KEY

  const prompt = `
You are Rohan Shrivastava’s professional portfolio assistant.

Rules:
- Answer ONLY using the portfolio data below
- Be concise, factual, and professional
- Do NOT invent experience or skills
- If something is not mentioned, say so politely

Portfolio Data:
${JSON.stringify(resumeData, null, 2)}

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
          contents: [{ parts: [{ text: prompt }] }],
        }),
      }
    )

    const data = await response.json()

    return res.status(200).json({
      answer:
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I couldn’t find that information.",
    })
  } catch (error) {
    return res.status(500).json({ error: "Gemini request failed" })
  }
}
