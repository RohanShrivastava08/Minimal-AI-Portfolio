import { resumeData } from "../data/resumeData"

function Skills() {
  const { skills = {} } = resumeData

  return (
    <section className="max-w-5xl mx-auto px-6">

      {/* Header */}
      <header className="mb-24 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Skills
        </h1>

        <p
          className="mt-4 mx-auto max-w-2xl
                     text-neutral-600 dark:text-neutral-400
                     leading-relaxed"
        >
          A snapshot of the tools and technologies I use across frontend,
          backend, and product development.
        </p>
      </header>

      {/* Skills Grid */}
      <div className="grid gap-10 sm:grid-cols-2">

        {/* Frontend */}
        <div
          className="rounded-2xl border
                     border-neutral-200 dark:border-neutral-800
                     p-7
                     transition
                     hover:border-neutral-300 dark:hover:border-neutral-700"
        >
          <h2 className="text-sm font-medium tracking-tight mb-3">
            Frontend
          </h2>
          <p
            className="text-sm leading-relaxed
                       text-neutral-700 dark:text-neutral-300"
          >
            {skills.frontend?.join(" · ")}
          </p>
        </div>

        {/* UI / UX */}
        <div
          className="rounded-2xl border
                     border-neutral-200 dark:border-neutral-800
                     p-7
                     transition
                     hover:border-neutral-300 dark:hover:border-neutral-700"
        >
          <h2 className="text-sm font-medium tracking-tight mb-3">
            UI / UX & Styling
          </h2>
          <p
            className="text-sm leading-relaxed
                       text-neutral-700 dark:text-neutral-300"
          >
            {skills.uiux?.join(" · ")}
          </p>
        </div>

        {/* Backend */}
        <div
          className="rounded-2xl border
                     border-neutral-200 dark:border-neutral-800
                     p-7
                     transition
                     hover:border-neutral-300 dark:hover:border-neutral-700"
        >
          <h2 className="text-sm font-medium tracking-tight mb-3">
            Backend & Databases
          </h2>
          <p
            className="text-sm leading-relaxed
                       text-neutral-700 dark:text-neutral-300"
          >
            {skills.backend?.join(" · ")}
          </p>
        </div>

        {/* Tools */}
        <div
          className="rounded-2xl border
                     border-neutral-200 dark:border-neutral-800
                     p-7
                     transition
                     hover:border-neutral-300 dark:hover:border-neutral-700"
        >
          <h2 className="text-sm font-medium tracking-tight mb-3">
            Tools & Platforms
          </h2>
          <p
            className="text-sm leading-relaxed
                       text-neutral-700 dark:text-neutral-300"
          >
            {skills.tools?.join(" · ")}
          </p>
        </div>

        {/* AI Tools */}
        <div
          className="sm:col-span-2
                     rounded-2xl border
                     border-neutral-200 dark:border-neutral-800
                     p-7
                     transition
                     hover:border-neutral-300 dark:hover:border-neutral-700"
        >
          <h2 className="text-sm font-medium tracking-tight mb-3">
            AI Tools
          </h2>
          <p
            className="text-sm leading-relaxed
                       text-neutral-700 dark:text-neutral-300"
          >
            {skills.ai?.join(" · ")}
          </p>
        </div>

      </div>
    </section>
  )
}

export default Skills
