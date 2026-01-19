import { resumeData } from "../data/resumeData"

function Education() {
  const { education = [] } = resumeData

  return (
    <section className="max-w-4xl mx-auto">

      {/* Page Header (same scale as Experience) */}
      <header className="mb-20 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Education
        </h1>
        <p className="mt-4 mx-auto max-w-2xl text-neutral-600 dark:text-neutral-400">
          My academic background and formal education that shaped my
          foundation in computer science and technology.
        </p>
      </header>

      {/* Education List */}
      <div className="space-y-16">
        {education.map((item, index) => (
          <div key={index} className="relative pl-6">

            {/* Subtle vertical guide (same visual weight as Experience spacing) */}
            <div className="absolute left-0 top-1 h-full w-px
                            bg-neutral-200 dark:bg-neutral-800" />

            <div className="flex flex-col gap-3">
              {/* Degree / Program */}
              <h2 className="text-lg font-medium">
                {item.detail}
              </h2>

              {/* Institute */}
              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                {item.institute}
              </p>

              {/* Duration */}
              <span className="text-sm text-neutral-500">
                {item.duration}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Education
