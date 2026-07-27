/**
 * Every claim here is verified against projects.md.
 *
 * Hard rule: Dueflo is built, shipped and running, and has NO customers and NO results yet.
 * It is never credited with recovery rates, revenue or user counts. Nordfiord and Goodwell
 * are described by their production status and scope, never by order volumes or adoption
 * numbers, because nobody has measured those.
 */

export type CaseStudy = {
  slug: string;
  name: string;
  summary: string;
  status: string;
  href: string | null;
  hrefLabel: string | null;
  problem: string;
  built: string;
  hardPartTitle: string;
  hardPart: string;
  facts: string[];
  stack: string[];
};

export const work: CaseStudy[] = [
  {
    slug: "dueflo",
    name: "Dueflo",
    summary: "Automated invoice collection for QuickBooks",
    status: "Live · my own product",
    href: "https://dueflo.com",
    hrefLabel: "dueflo.com",
    problem:
      "Small businesses on QuickBooks quietly write off overdue invoices. Not because the money is gone, but because chasing it is manual, socially awkward, and the first thing dropped when the week gets busy. The invoices that need the most persistence get the least.",
    built:
      "A multi-tenant SaaS that connects to a company's QuickBooks over OAuth, syncs every overdue invoice, and runs a six-step sequence across email and SMS over forty-five days — escalating in tone from friendly to final notice. The first two steps are templated; the rest are written by Claude with the full engagement history as context and a hard monthly spend cap per organisation, falling back to templates once the cap is hit. Replies are classified automatically and pause the sequence. When the QuickBooks balance reaches zero, the invoice closes itself.",
    hardPartTitle: "The hard part: never sending the same message twice",
    hardPart:
      "Automated messages about money are unforgiving. One duplicate demand to a customer who already paid costs the business the relationship, and no apology undoes it. So every send is idempotent three ways: an idempotency key at the delivery provider, a unique database index on (sequence, step, channel), and crash recovery that advances the sequence rather than retrying it. On top of that, a distributed lock and a twenty-four hour cooldown mean a customer with six overdue invoices still receives at most one message a day. The scheduled jobs fan out — one child task per organisation — so a slow tenant cannot delay everyone else's sends.",
    facts: [
      "6-step sequence over 45 days",
      "11-table multi-tenant schema",
      "5 signature-verified webhook integrations",
      "AI generation with per-plan spend caps",
      "CAN-SPAM · TCPA windows · RFC 8058 one-click unsubscribe",
      "3 Stripe subscription tiers",
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Drizzle",
      "tRPC",
      "Trigger.dev",
      "Anthropic Claude",
      "Stripe",
      "Redis",
    ],
  },
  {
    slug: "nordfiord",
    name: "Nordfiord",
    summary: "Ecommerce platform for a supplements brand",
    status: "Live · trading about a year · client work",
    href: "https://nordfiord.com",
    hrefLabel: "nordfiord.com",
    problem:
      "A supplements brand needed a storefront that could describe what it actually sells — the form, the ingredients, what each one does, who it is for, what the evidence says. Off-the-shelf platforms model a T-shirt with a size and a colour. They also needed an admin their own team could run the business from, not a developer.",
    built:
      "Three applications in one monorepo: a Next.js storefront, a React admin panel, and a NestJS API. The catalog is modelled to the domain — products carry forms, ingredients, effects, target audiences, benefits, science references and reviews as first-class relations rather than free text. Checkout runs through Stripe with a webhook-driven order state machine. Product images upload straight from the browser to object storage over presigned URLs, so large files never touch the API server. Carts live in Redis. The admin dashboard streams revenue, month-over-month growth and a thirty-day series over WebSockets, behind role-based access enforced at the API and again at the route.",
    hardPartTitle: "The hard part: a checkout that cannot oversell",
    hardPart:
      "Selling stock you do not have is the failure that costs a store both money and trust, and it happens in the gap between a customer starting checkout and the payment clearing. Stock is never decremented when someone reaches the checkout page — only once Stripe's webhook confirms the payment, inside a database transaction that takes a row-level lock on the item. Two people buying the last unit in the same second cannot both succeed. The same webhook is written to be safe on redelivery, because payment providers retry.",
    facts: [
      "3 applications — storefront, admin, API",
      "116 API endpoints across ~26 modules",
      "23 data models",
      "21 admin routes",
      "Domain-specific catalog modelling",
      "Real-time analytics over WebSockets",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "NestJS",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "Stripe",
      "Cloudflare R2",
      "Docker",
    ],
  },
  {
    slug: "goodwell",
    name: "Goodwell",
    summary: "Internal ordering and field-sales app for an appliance retailer",
    status: "In production · published to the App Store",
    href: "https://apps.apple.com/app/goodwell/id6770019658",
    hrefLabel: "App Store",
    problem:
      "A large appliance retailer — fridges, air conditioners, gas appliances — was running branch ordering, seller payments and stock requisitions across paper and spreadsheets. Managers and field sellers needed genuinely different tools, on phones, in their own language, across multiple branches.",
    built:
      "A cross-platform React Native application covering the operation end to end: catalog and ordering, cart and checkout, stock and inventory, requisitions, seller payments and payment types, KPI planning and tracking, vouchers, sales reporting and notifications. Fifteen service modules sit behind it. State is split between server cache and local stores so the app stays usable on a bad connection, and the whole interface is translated rather than hard-coded in one language.",
    hardPartTitle: "The hard part: two products in one app",
    hardPart:
      "Managers and sellers do different jobs, and bolting both onto one navigation produces an app that neither trusts. The application splits at the router: separate navigation stacks, separate carts, separate permissions, resolved at sign-in from the user's role and store assignment. Neither role ever sees a screen that is not theirs, and adding a capability for one does not risk leaking it to the other — which matters when one of those roles handles money.",
    facts: [
      "41 screens",
      "15 API service modules",
      "Separate manager and seller applications",
      "Multi-language throughout",
      "iOS 15.1+ · iPhone, iPad, Apple Silicon",
      "Android",
    ],
    stack: [
      "React Native",
      "Expo",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "expo-router",
    ],
  },
];
