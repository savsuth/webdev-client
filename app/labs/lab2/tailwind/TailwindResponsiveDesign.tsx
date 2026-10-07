// Shared card markup, so the personal and sample cards differ only in copy and breakpoint classes.
// Class names are passed as complete strings because Tailwind detects utilities by scanning the source.
function ResponsiveCard({
  id,
  eyebrow,
  title,
  description,
  cardClassName = "",
  textClassName = "",
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  cardClassName?: string;
  textClassName?: string;
}) {
  return (
    <div
      id={id}
      className={`mx-auto w-full max-w-md overflow-hidden rounded-xl bg-white shadow-md md:max-w-2xl ${cardClassName}`}
    >
      <div className="md:flex">
        <div className="relative md:w-48 md:shrink-0">
          <img
            className="h-56 w-full object-cover md:h-full md:min-h-56 md:w-48"
            src="/images/reactjs.jpg"
            alt="React JS"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <svg viewBox="0 0 24 24" className="h-24 w-24" aria-hidden="true">
              <circle cx="12" cy="12" r="2.05" fill="currentColor" />
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <ellipse cx="12" cy="12" rx="10" ry="4.2" />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="10"
                  ry="4.2"
                  transform="rotate(60 12 12)"
                />
                <ellipse
                  cx="12"
                  cy="12"
                  rx="10"
                  ry="4.2"
                  transform="rotate(120 12 12)"
                />
              </g>
            </svg>
            <div className="mt-2 text-2xl font-semibold">React JS</div>
          </div>
        </div>
        <div className={`min-w-0 p-8 ${textClassName}`}>
          <div className="text-sm font-semibold tracking-wide text-indigo-500 uppercase">
            {eyebrow}
          </div>
          <a
            href="#"
            className="mt-1 block text-lg leading-tight font-medium text-black no-underline hover:underline"
          >
            {title}
          </a>
          <p className="mt-2 text-gray-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

export default function TailwindResponsiveDesign() {
  return (
    <div className="font-sans">
      <h2 className="text-3xl font-bold mb-4">Responsive Design</h2>
      <ResponsiveCard
        id="wd-your-responsive"
        eyebrow="CS 5610 Web Development"
        title="Building Kambaz with Next.js"
        description="A learning-management prototype built one assignment at a time, from plain HTML to a deployed full-stack application."
        cardClassName="lg:max-w-3xl"
      />
      <div className="mt-8" />
      <ResponsiveCard
        id="wd-ai-responsive"
        eyebrow="Professional Courses"
        title="Rocket Propulsion Fundamentals"
        description="An in-depth study of the fundamentals of rocket propulsion..."
        textClassName="lg:p-12"
      />
    </div>
  );
}
