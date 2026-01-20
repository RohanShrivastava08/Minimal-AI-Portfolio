export function askPortfolio(question, resumeData) {
  const q = question.toLowerCase()

  // GREETINGS / RANDOM
  if (
    q.includes("hi") ||
    q.includes("hello") ||
    q.includes("hey") ||
    q.includes("who are you")
  ) {
    return (
      `Hi 👋 I'm a portfolio assistant for ${resumeData.name}.\n\n` +
      `You can ask me about his projects, skills, experience, education, or volunteering work.`
    )
  }

  // GENERAL INTRO
  if (q.includes("about") || q.includes("yourself")) {
    return resumeData.summary
  }

  // PROJECTS
  if (q.includes("project") || q.includes("build")) {
    return (
      "Here are some projects he has worked on:\n\n" +
      resumeData.projects
        .map(p => `• ${p.name} — ${p.description}`)
        .join("\n\n")
    )
  }

  // SKILLS / TECH STACK
  if (
    q.includes("skill") ||
    q.includes("technology") ||
    q.includes("tech") ||
    q.includes("stack")
  ) {
    return (
      "His primary technical skills include:\n\n" +
      Object.entries(resumeData.skills)
        .map(
          ([category, items]) =>
            `${category.toUpperCase()}: ${items.join(", ")}`
        )
        .join("\n\n")
    )
  }

  // EXPERIENCE
  if (
    q.includes("experience") ||
    q.includes("work") ||
    q.includes("intern") ||
    q.includes("company")
  ) {
    return (
      "Here’s a snapshot of his professional experience:\n\n" +
      resumeData.experience
        .map(e => `• ${e.role} at ${e.company}`)
        .join("\n")
    )
  }

  // EDUCATION
  if (q.includes("education") || q.includes("degree") || q.includes("college")) {
    return (
      "Educational background:\n\n" +
      resumeData.education
        .map(e => `• ${e.detail}`)
        .join("\n")
    )
  }

  // VOLUNTEERING
  if (q.includes("volunteer") || q.includes("community")) {
    return (
      "He has also been active in community and volunteering roles:\n\n" +
      resumeData.volunteer
        .map(v => `• ${v.role} at ${v.organization}`)
        .join("\n")
    )
  }

  // DEFAULT SMART FALLBACK
  return (
    "That’s a good question 🙂\n\n" +
    "You can ask me about:\n" +
    "• Projects he has built\n" +
    "• Technologies and skills\n" +
    "• Work experience\n" +
    "• Education or volunteering\n\n" +
    "Try something like: “What projects has Rohan built?”"
  )
}
