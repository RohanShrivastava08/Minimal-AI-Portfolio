export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { question, resumeData } = req.body
  const API_KEY = process.env.OPENAI_API_KEY

  if (!question || !resumeData) {
    return res.status(400).json({ error: "Invalid request" })
  }

  const prompt = `
You are an AI assistant for a developer portfolio.

Rules:
- Answer ONLY using the portfolio data below
- Be clear, professional, and concise
- Do NOT invent anything
- If info is missing, say "That information is not mentioned"

Portfolio:
Name: ${resumeData.name}
Role: ${resumeData.role}

Projects:
${resumeData.projects.map(p => `- ${p.name}: ${p.description}`).join("\n")}

Skills:
${Object.values(resumeData.skills).flat().join(", ")}

Experience:
${resumeData.experience.map(e => `- ${e.role} at ${e.company}`).join("\n")}

Question:
${question}
`

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            { role: "user", content: prompt },
          ],
          temperature: 0.2,
        }),
      }
    )

    const data = await response.json()

    const answer =
      data?.choices?.[0]?.message?.content ||
      "That information is not mentioned."

    return res.status(200).json({ answer })
  } catch (err) {
    return res.status(500).json({ error: "OpenAI request failed" })
  }
}
