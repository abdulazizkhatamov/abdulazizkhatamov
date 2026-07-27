import { site } from "@/content/site";

export function Hero() {
  return (
    <section id="top" className="pt-16 pb-4 sm:pt-24">
      <p className="text-faint font-mono text-xs tracking-[0.18em] uppercase">
        Full-Stack Developer · Available for contract
      </p>

      <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">
        {site.name}
      </h1>

      <p className="text-fg mt-6 max-w-2xl text-lg leading-relaxed sm:text-xl">
        {site.tagline}
      </p>

      <p className="text-muted mt-4 max-w-2xl leading-relaxed">{site.proof}</p>

      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
        <a
          href={`mailto:${site.email}?subject=Project%20enquiry`}
          className="border-fg bg-fg text-bg hover:border-accent hover:bg-accent inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
        >
          {site.email}
        </a>
        {site.calLink && (
          <a
            href={site.calLink}
            className="border-border text-fg hover:border-fg inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors"
          >
            Book a call
          </a>
        )}
        <span className="text-faint text-sm">
          {site.location} · {site.timezone} · Remote
        </span>
      </div>
    </section>
  );
}
