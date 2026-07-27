import { work } from "@/content/work";
import { Section } from "./section";

function ArrowUpRight() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

export function WorkSection() {
  return (
    <Section id="work" label="Selected work">
      <div className="space-y-16">
        {work.map((p) => (
          <article
            key={p.slug}
            className="border-border border-t pt-8 first:border-t-0 first:pt-0"
          >
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <h3 className="text-2xl font-semibold tracking-tight">{p.name}</h3>
              {p.href && (
                <a
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent inline-flex items-center gap-1 text-sm hover:underline"
                >
                  {p.hrefLabel}
                  <ArrowUpRight />
                </a>
              )}
            </div>

            <p className="text-muted mt-1">{p.summary}</p>
            <p className="text-faint mt-1 font-mono text-xs">{p.status}</p>

            <div className="mt-6 space-y-5 leading-relaxed">
              <p className="text-muted">{p.problem}</p>
              <p>{p.built}</p>
            </div>

            <div className="border-accent/40 bg-surface mt-7 border-l-2 py-4 pr-4 pl-5">
              <p className="text-sm font-semibold">{p.hardPartTitle}</p>
              <p className="text-muted mt-2 leading-relaxed">{p.hardPart}</p>
            </div>

            <ul className="mt-7 grid gap-x-8 gap-y-2 font-mono text-xs sm:grid-cols-2">
              {p.facts.map((f) => (
                <li key={f} className="text-muted flex gap-2">
                  <span className="text-accent" aria-hidden="true">
                    ·
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <p className="text-faint mt-6 text-xs leading-relaxed">
              {p.stack.join(" · ")}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
