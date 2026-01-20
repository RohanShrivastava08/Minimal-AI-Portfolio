export function askPortfolio(question, resumeData) {
  const q = question.toLowerCase()

  /* ---------------- GREETINGS / INTRO ---------------- */

  if (
    q.includes("hi") ||
    q.includes("hello") ||
    q.includes("hey") ||
    q.includes("who are you")
  ) {
    return (
      `Hi 👋 I’m an interactive portfolio assistant for ${resumeData.name}.\n\n` +
      `I’m designed to give clear, accurate answers about his work, skills, and experience.\n` +
      `Feel free to ask anything related to his projects, tech stack, or background.`
    )
  }

  if (q.includes("about") || q.includes("yourself") || q.includes("introduction")) {
    return (
      `${resumeData.summary}\n\n` +
      `He focuses on building clean, scalable, and user-friendly web applications with a strong attention to detail and performance.`
    )
  }

  /* ---------------- PROJECTS ---------------- */

  if (q.includes("project") || q.includes("build") || q.includes("work")) {
    return (
      `He has worked on a set of focused projects that demonstrate real-world problem solving, clean architecture, and strong frontend fundamentals.\n\n` +
      resumeData.projects
        .map(
          p =>
            `• ${p.name} — ${p.description}`
        )
        .join("\n\n") +
      `\n\nAcross these projects, the emphasis has been on usability, performance, and maintainable code rather than quick demos.`
    )
  }

  /* ---------------- SKILLS / TECH STACK ---------------- */

  if (
    q.includes("skill") ||
    q.includes("technology") ||
    q.includes("tech") ||
    q.includes("stack")
  ) {
    return (
      `His technical skillset is centered around building modern, high-performance web applications.\n\n` +
      Object.entries(resumeData.skills)
        .map(
          ([category, items]) =>
            `${category.toUpperCase()}: ${items.join(", ")}`
        )
        .join("\n\n") +
      `\n\nHe prefers choosing tools based on the problem being solved rather than following trends blindly.`
    )
  }

  /* ---------------- EXPERIENCE ---------------- */

  if (
    q.includes("experience") ||
    q.includes("intern") ||
    q.includes("job") ||
    q.includes("company") ||
    q.includes("worked")
  ) {
    return (
      `Here’s a snapshot of his professional experience:\n\n` +
      resumeData.experience
        .map(
          e =>
            `• ${e.role} at ${e.company}`
        )
        .join("\n") +
      `\n\nThese roles helped him strengthen his understanding of real-world development workflows, collaboration, and production-ready code.`
    )
  }

  /* ---------------- EDUCATION ---------------- */

  if (
    q.includes("education") ||
    q.includes("degree") ||
    q.includes("college") ||
    q.includes("study")
  ) {
    return (
      `His educational background includes:\n\n` +
      resumeData.education
        .map(e => `• ${e.detail}`)
        .join("\n") +
      `\n\nAlongside formal education, he focuses heavily on self-learning and hands-on project work.`
    )
  }

  /* ---------------- VOLUNTEERING ---------------- */

  if (
    q.includes("volunteer") ||
    q.includes("community") ||
    q.includes("leadership")
  ) {
    return (
      `He has also been actively involved in community and volunteering roles:\n\n` +
      resumeData.volunteer
        .map(
          v =>
            `• ${v.role} at ${v.organization}`
        )
        .join("\n") +
      `\n\nThese experiences helped him develop leadership, communication, and community-driven problem-solving skills.`
    )
  }

  /* ---------------- RANDOM / SOFT QUESTIONS ---------------- */

  if (q.includes("why") && q.includes("hire")) {
    return (
      `He brings a strong balance of technical skills, attention to detail, and a mindset focused on building reliable, user-centric products.\n\n` +
      `He values clarity, maintainability, and long-term impact over quick fixes.`
    )
  }

  if (q.includes("strength") || q.includes("good at")) {
    return (
      `His strengths include:\n\n` +
      `• Building clean and intuitive user interfaces\n` +
      `• Writing readable and maintainable code\n` +
      `• Translating requirements into practical solutions\n` +
      `• Focusing on performance and usability`
    )
  }

  /* ---------------- FALLBACK ---------------- */

  return (
    `That’s a thoughtful question 🙂\n\n` +
    `You can ask me about:\n` +
    `• Projects he has built\n` +
    `• Technologies and skills\n` +
    `• Work experience\n` +
    `• Education or volunteering\n\n` +
    `For example: “What projects has Rohan built?”`
  )
}
