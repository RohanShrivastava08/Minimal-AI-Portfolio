export function askPortfolio(question, resumeData) {
  const q = question.toLowerCase()

  if (q.includes("hi") || q.includes("hello") || q.includes("hey")) {
    return `Hi 👋 I'm an interactive assistant for ${resumeData.name}.
You can ask me about projects, skills, experience, or education.`
  }

  if (q.includes("about") || q.includes("yourself")) {
    return resumeData.summary
  }

  if (q.includes("project")) {
    return (
      "Here are some projects I've worked on:\n\n" +
      resumeData.projects
        .map(p => `• ${p.name} — ${p.description}`)
        .join("\n\n")
    )
  }

  if (q.includes("skill") || q.includes("tech")) {
    return (
      "My technical skillset includes:\n\n" +
      Object.entries(resumeData.skills)
        .map(([k, v]) => `${k.toUpperCase()}: ${v.join(", ")}`)
        .join("\n\n")
    )
  }

  if (q.includes("experience") || q.includes("work")) {
    return (
      "Here’s a snapshot of my experience:\n\n" +
      resumeData.experience
        .map(e => `• ${e.role} at ${e.company}`)
        .join("\n")
    )
  }

  if (q.includes("education")) {
    return (
      "My education:\n\n" +
      resumeData.education.map(e => `• ${e.detail}`).join("\n")
    )
  }

  if (q.includes("volunteer")) {
    return (
      "Community & volunteering:\n\n" +
      resumeData.volunteer
        .map(v => `• ${v.role} at ${v.organization}`)
        .join("\n")
    )
  }

  return (
    "That’s a thoughtful question 🙂\n\n" +
    "You can ask me about:\n" +
    "• Projects\n• Skills\n• Experience\n• Education\n\n" +
    "Try: “What projects have you built?”"
  )
}
