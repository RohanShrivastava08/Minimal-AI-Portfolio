export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { question, resumeData } = req.body
  const API_KEY = process.env.OPENAI_API_KEY

  if (!question || !resumeData) {
    return res.status(400).json({ error: "Invalid request" })
  }

  // ---- STRONG, CLEAR CONTEXT ----
  const context = `
Name: ${resumeData.name}
Role: ${resumeData.role}

Summary:
${resumeData.summary}

Projects:
${resumeData.projects
  .map(p => `- ${p.name}: ${p.description}`)
  .join("\n")}

Skills:
Frontend: ${resumeData.skills.frontend.join(", ")}
UI/UX: ${resumeData.skills.uiux.join(", ")}
Backend: ${resumeData.skills.backend.join(", ")}
Tools: ${resumeData.skills.tools.join(", ")}
AI Tools: ${resumeData.skills.ai.join(", ")}

Experience:
${resumeData.experience
  .map(e => `- ${e.role} at ${e.company} (${e.duration})`)
  .join("\n")}

Education:
${resumeData.education
  .map(e => `- ${e.detail} at ${e.institute}`)
  .join("\n")}

Volunteering:
${resumeData.volunteer
  .map(v => `- ${v.role} at ${v.organization}`)
  .join("\n")}
`

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          {
            role: "system",
            content:
              "You are a professional portfolio assistant. If the answer exists in the data, answer clearly. If not, say: That information is not mentioned.",
          },
          {
            role: "user",
            content: `Portfolio Data:\n${context}\n\nQuestion:\n${question}`,
          },
        ],
        temperature: 0,
      }),
    })

    const data = await response.json()

    const answer =
      data?.output_text ||
      "That information is not mentioned."

      console.log("OPENAI RAW RESPONSE:", JSON.stringify(data, null, 2))


    return res.status(200).json({ answer })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: "OpenAI request failed" })
  }
}
