import type { Metadata } from "next";
import { site } from "@/content/site";

// Unlisted on purpose. Not in the nav, not in sitemap.ts, noindex + nofollow below.
// The link only exists in outreach emails, so prices are visible to someone already in a
// conversation and not to every visitor or competitor. Publishing them on the home page
// would anchor every project down to the smallest number on this list.
export const metadata: Metadata = {
  title: "Rates — Abdulaziz Hatamov",
  description: "What things cost, what is not included, and how payment works.",
  robots: { index: false, follow: false },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-14 text-lg font-semibold tracking-tight first:mt-0">{children}</h2>
  );
}

const work = [
  {
    name: "First job",
    price: "$150 fixed",
    time: "2 working days",
    body: "One small, real piece of work so we both find out cheaply. If it is not what we agreed, you do not pay for it and there is nothing to unwind.",
  },
  {
    name: "Fix or single feature on something that already exists",
    price: "$250 – $500",
    time: "3–5 working days",
    body: "A broken flow, a slow page, one feature added to a site or app that is already live.",
  },
  {
    name: "Page or template built from a design",
    price: "$350 – $700 each",
    time: "3–6 working days",
    body: "You send the design, I send back the built page: responsive, accessible, in your repository.",
  },
  {
    name: "Small site, live",
    price: "$1,800 – $3,500",
    time: "2–4 weeks",
    body: "Five to eight pages, a CMS your client can actually use, deployed to your hosting with your keys.",
  },
  {
    name: "Web app or custom build",
    price: "from $3,500",
    time: "priced after a written brief",
    body: "Database, API, frontend, deploy. Auth, roles, billing, background jobs, and the parts most quotes leave out. Milestone one is small and comes first.",
  },
  {
    name: "Standing maintenance",
    price: "$250 / month",
    time: "up to 8 hours, cancel any month",
    body: "Updates, small changes, and being the person who answers when something breaks. Unused hours do not roll over, and I will tell you if a month did not use them.",
  },
];

export default function Rates() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <a
        href="/"
        className="text-faint hover:text-fg font-mono text-xs tracking-[0.18em] uppercase transition-colors"
      >
        &larr; Back
      </a>

      <h1 className="mt-8 text-3xl font-semibold tracking-tight sm:text-4xl">Rates</h1>

      <p className="text-muted mt-5 leading-relaxed">
        Everything below is a fixed price for a fixed scope, not an hourly rate with a running
        meter. You get one number and one date before anything starts. If the scope changes we
        agree a new number first, and I would rather say a job is out of scope than quietly
        absorb it and deliver late.
      </p>

      <H2>What things cost</H2>
      <div className="mt-6 space-y-8">
        {work.map((w) => (
          <div key={w.name} className="border-border border-t pt-5">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <h3 className="font-medium">{w.name}</h3>
              <p className="font-mono text-sm whitespace-nowrap">{w.price}</p>
            </div>
            <p className="text-faint mt-1 font-mono text-xs tracking-wide">{w.time}</p>
            <p className="text-muted mt-3 leading-relaxed">{w.body}</p>
          </div>
        ))}
      </div>

      <H2>What is not included</H2>
      <p className="text-muted leading-relaxed">
        Brand, identity, logos, and design judgement. I build what a designer decided; I am not
        the person to decide it. Same for copywriting and content marketing. I also do not hold
        your hosting, domain, or accounts in my name — everything lands in your repository and
        your infrastructure from the first day, so ending this costs you nothing.
      </p>

      <H2>Working with agencies</H2>
      <p className="text-muted leading-relaxed">
        White-label is the normal arrangement. Your brand, your client relationship, and the
        client never meets me. On repeat work the per-unit prices above come down, and I would
        rather agree that once than renegotiate every project.
      </p>

      <H2>Payment</H2>
      <p className="text-muted leading-relaxed">
        Half up front, half on delivery, for anything fixed-price. Maintenance is monthly in
        advance. Payoneer, Wise, or bank transfer. If you would rather have the protection of
        escrow, Upwork works and I am happy to run it there.
      </p>

      <H2>Timing</H2>
      <p className="text-muted leading-relaxed">
        I work with one client at a time, so the date I give you is real rather than an
        average. I am at {site.timezone}, and I answer everything within a day including the
        awkward messages. If you need something faster than the date I quote, sometimes that is
        possible and costs 50% more, and sometimes I will tell you it is not.
      </p>

      <p className="border-border text-faint mt-16 border-t pt-8 text-sm">
        Prices hold for 60 days from the message that sent you here.{" "}
        <a href={`mailto:${site.email}`} className="hover:text-fg transition-colors">
          {site.email}
        </a>
      </p>
    </main>
  );
}
