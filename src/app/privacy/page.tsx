import type { Metadata } from "next";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy — Abdulaziz Hatamov",
  description:
    "What data I hold, where it came from, the legal basis for it, and how to have it removed.",
  alternates: { canonical: "/privacy" },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-12 text-lg font-semibold tracking-tight first:mt-0">{children}</h2>
  );
}

export default function Privacy() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <a
        href="/"
        className="text-faint hover:text-fg font-mono text-xs tracking-[0.18em] uppercase transition-colors"
      >
        &larr; Back
      </a>

      <h1 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">Privacy</h1>

      <p className="text-muted mt-5 leading-relaxed">
        Short version: this site sets no cookies and asks you for nothing. If I have emailed
        you, the section on outreach below explains exactly what I hold and how to make me
        delete it.
      </p>

      <div className="mt-4 space-y-4 leading-relaxed">
        <H2>Who I am</H2>
        <p className="text-muted">
          Abdulaziz Hatamov, an individual providing software development services from
          Ozoda 6, Margilan, 151100, Uzbekistan. Contact:{" "}
          <a href={`mailto:${site.email}`} className="text-accent hover:underline">
            {site.email}
          </a>
          . I am the data controller for anything described here.
        </p>

        <H2>This website</H2>
        <p className="text-muted">
          No cookies, no tracking pixels, no advertising, no third-party scripts. Vercel Web
          Analytics records anonymous, aggregated page views and does not use cookies or
          identify individual visitors. My host keeps standard server logs, including IP
          addresses, for security and troubleshooting.
        </p>

        <H2>If I contacted you about work</H2>
        <p className="text-muted">
          I contact businesses that have publicly advertised a need for the services I
          provide. Where that happens, I hold a small amount of business contact information:
          a company name, a public business email address or contact form, a website, and a
          note of the public signal that prompted the message — for example a job posting or
          a page-speed measurement I took of the company&apos;s own site.
        </p>
        <p className="text-muted">
          That information is collected from publicly available sources: the company&apos;s
          own website, its public job board, or a public listing. I do not buy lists, scrape
          personal accounts, or process any special-category data.
        </p>
        <p className="text-muted">
          The legal basis is legitimate interest under Article 6(1)(f) GDPR, assessed and
          documented before contact. The interest is offering relevant professional services
          to a business that has publicly signalled the corresponding need. The volume is low
          and every message is written individually.
        </p>

        <H2>Making it stop</H2>
        <p className="text-muted">
          Reply to any message with &quot;no&quot;, &quot;stop&quot;, or anything to that
          effect, or write to{" "}
          <a href={`mailto:${site.email}`} className="text-accent hover:underline">
            {site.email}
          </a>
          . I will delete your details and you will not hear from me again. This is permanent,
          not a pause, and it takes effect the day I read it rather than at the end of any
          statutory period.
        </p>
        <p className="text-muted">
          You may also ask what I hold, ask for it to be corrected or provided to you, or
          object to the processing. Those requests are answered within 30 days and usually
          the same day.
        </p>

        <H2>Sharing and retention</H2>
        <p className="text-muted">
          I do not sell, rent, or share this information. It exists in my mailbox and in a
          private spreadsheet. Contact details for prospects who did not respond are deleted
          within twelve months. Records for anyone who opted out are kept as a suppression
          entry only, so that I do not contact them again by mistake.
        </p>

        <H2>Clients</H2>
        <p className="text-muted">
          For people I actually work with, I hold what the work requires — contact details,
          project communication, and invoicing records. Invoicing records are kept as long as
          tax law requires. Any credentials or access I am given are held only for the
          duration of the project and revoked at the end of it.
        </p>

        <H2>Changes</H2>
        <p className="text-muted">
          If this changes materially I will update this page. Last updated 27 July 2026.
        </p>
      </div>

      <p className="border-border text-faint mt-16 border-t pt-8 text-sm">
        Abdulaziz Hatamov · Ozoda 6, Margilan, 151100, Uzbekistan ·{" "}
        <a href={`mailto:${site.email}`} className="hover:text-fg transition-colors">
          {site.email}
        </a>
      </p>
    </main>
  );
}
