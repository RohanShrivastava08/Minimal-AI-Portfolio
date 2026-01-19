import { resumeData } from "../data/resumeData"

function Skills() {
  const { skills = {} } = resumeData

  return (
    <section className="max-w-4xl mx-auto">

      {/* Page Header */}
      <header className="mb-20 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Skills
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
          Technologies and tools I use to design, build, and ship reliable
          web applications.
        </p>
      </header>

      {/* Skills Grid */}
      <div className="grid gap-14 sm:grid-cols-2">

        {/* Frontend */}
        <div>
          <h2 className="text-base font-medium mb-3">
            Frontend
          </h2>
          <p className="text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300">
            {skills.frontend?.join(", ")}
          </p>
        </div>

        {/* UI / UX */}
        <div>
          <h2 className="text-base font-medium mb-3">
            UI / UX & Styling
          </h2>
          <p className="text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300">
            {skills.uiux?.join(", ")}
          </p>
        </div>

        {/* Backend */}
        <div>
          <h2 className="text-base font-medium mb-3">
            Backend & Databases
          </h2>
          <p className="text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300">
            {skills.backend?.join(", ")}
          </p>
        </div>

        {/* Tools */}
        <div>
          <h2 className="text-base font-medium mb-3">
            Tools & Platforms
          </h2>
          <p className="text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300">
            {skills.tools?.join(", ")}
          </p>
        </div>

        {/* AI Tools */}
        <div className="sm:col-span-2">
          <h2 className="text-base font-medium mb-3">
            AI Tools
          </h2>
          <p className="text-[13px] leading-relaxed text-neutral-700 dark:text-neutral-300">
            {skills.ai?.join(", ")}
          </p>
        </div>

      </div>
    </section>
  )
}

export default Skills
