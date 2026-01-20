import { resumeData } from "../src/data/resumeData"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { question } = req.body
  const API_KEY = process.env.OPENAI_API_KEY

  if (!question) {
    return res.status(400).json({ error: "Question missing" })
  }

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
Answer the question using ONLY the portfolio data below.
If the answer does not exist, say: "That information is not mentioned."

Portfolio:
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
          messages: [{ role: "user", content: prompt }],
          temperature: 0,
        }),
      }
    )

    const data = await response.json()

    return res.status(200).json({
      answer:
        data?.choices?.[0]?.message?.content ||
        "That information is not mentioned.",
    })
  } catch (error) {
    return res.status(500).json({ error: "OpenAI request failed" })
  }
}
