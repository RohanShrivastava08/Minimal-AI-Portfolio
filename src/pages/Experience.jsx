import { resumeData } from "../data/resumeData"

function Experience() {
  const { experience = [] } = resumeData

  return (
    <section className="max-w-4xl mx-auto px-6">

      {/* Header */}
      <header className="mb-28 text-center">
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
          Experience
        </h1>

        <p className="mt-4 mx-auto max-w-2xl
                      text-neutral-600 dark:text-neutral-400
                      leading-relaxed">
          A brief overview of where I’ve worked and the kind of impact
          I’ve made while building production-ready applications.
        </p>
      </header>

      {/* Experience blocks */}
      <div className="space-y-24">
        {experience.map((item, index) => (
          <article
            key={index}
            className="relative pl-8"
          >
            {/* Left accent */}
            <span
              className="absolute left-0 top-1
                         h-full w-px
                         bg-neutral-200 dark:bg-neutral-800"
            />

            {/* Index number */}
            <span
              className="absolute -left-1 top-0
                         text-xs font-medium
                         text-neutral-400 dark:text-neutral-500"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Top row */}
            <div className="flex flex-col sm:flex-row
                            sm:items-baseline sm:justify-between
                            gap-3">

              <div>
                <h2 className="text-lg font-medium tracking-tight">
                  {item.role}
                </h2>

                <p className="mt-1 text-sm
                              text-neutral-600 dark:text-neutral-400">
                  {item.company}
                </p>
              </div>

              <span className="text-sm text-neutral-500">
                {item.duration}
              </span>
            </div>

            {/* Description */}
            <div className="mt-6 space-y-3 max-w-3xl">
              {item.details.map((point, idx) => (
                <p
                  key={idx}
                  className="text-sm leading-relaxed
                             text-neutral-700 dark:text-neutral-300"
                >
                  {point}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Experience
