export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { question, resumeData } = req.body
  const API_KEY = process.env.OPENAI_API_KEY

  if (!API_KEY) {
    return res.status(500).json({ error: "Missing OpenAI API key" })
  }

  if (!question || !resumeData) {
    return res.status(400).json({ error: "Missing question or resumeData" })
  }

  // ---- VERY CLEAR, HUMAN-READABLE CONTEXT ----
  const context = `
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
`

  const prompt = `
You are an assistant answering questions about a developer portfolio.

Rules:
- Use ONLY the portfolio data below
- If the answer exists, answer clearly
- If it does not exist, say: "That information is not mentioned"

Portfolio Data:
${context}

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
            { role: "user", content: prompt }
          ],
          temperature: 0,
        }),
      }
    )

    const data = await response.json()

    // 🔍 TEMP DEBUG (CRITICAL)
    console.log("OPENAI RAW:", JSON.stringify(data, null, 2))

    const answer =
      data?.choices?.[0]?.message?.content?.trim() ||
      "That information is not mentioned."

    return res.status(200).json({ answer })

  } catch (err) {
    console.error("OPENAI ERROR:", err)
    return res.status(500).json({ error: "OpenAI request failed" })
  }
}
