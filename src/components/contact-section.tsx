import { site } from "@/content/site";
import { Section } from "./section";

export function ContactSection() {
  return (
    <Section id="contact" label="Contact">
      <div className="max-w-2xl">
        <p className="text-xl leading-relaxed sm:text-2xl">
          Write to me with what you are trying to ship and by when. You will get back a
          fixed price, a date, and an honest answer about whether I am the right person
          for it.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
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
        </div>

        <p className="text-muted mt-6 text-sm">
          I answer everything within a day, including the awkward messages.
        </p>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-border text-faint mt-8 flex flex-wrap items-center justify-between gap-4 border-t py-8 text-sm">
      <p>
        {site.name} · {site.location}
      </p>
      <div className="flex gap-5">
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-fg transition-colors"
        >
          LinkedIn
        </a>
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-fg transition-colors"
        >
          GitHub
        </a>
        <a
          href={`mailto:${site.email}`}
          className="hover:text-fg transition-colors"
        >
          Email
        </a>
        <a href="/privacy" className="hover:text-fg transition-colors">
          Privacy
        </a>
      </div>
    </footer>
  );
}
