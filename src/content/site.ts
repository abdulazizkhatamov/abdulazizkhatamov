export const site = {
  name: "Abdulaziz Hatamov",
  domain: "www.abdulaziz.cv",
  url: "https://www.abdulaziz.cv",
  email: "abdulaziz@abdulaziz.cv",
  location: "Margilan, Uzbekistan",
  timezone: "UTC+5",

  // Deliberately null. Abdulaziz works in writing, not on calls, so the site does not offer
  // one - a booking button he does not want anyone to press is worse than no button.
  // The Cal.com link still exists (cal.com/abdulazizhatamov/15min) if this ever changes:
  // put it back here and both buttons return.
  calLink: null as string | null,

  linkedin: "https://www.linkedin.com/in/abdulaziz-hatamov-224203324/",
  github: "https://github.com/abdulazizkhatamov",

  title: "Abdulaziz Hatamov — Full-Stack Developer for Contract Work",
  description:
    "Full-stack developer, 5+ years. I build and ship production systems end to end — database, API, frontend, deploy. Three live right now: a QuickBooks SaaS, an ecommerce platform, and an App Store app.",

  tagline:
    "I build and ship production systems end to end — database, API, frontend, deploy — and then keep them running.",

  proof:
    "Three of them are live right now: a QuickBooks SaaS I built and operate, an ecommerce platform that has been trading for about a year, and an internal mobile app in the App Store.",
} as const;

export const services = [
  {
    title: "Web & app development",
    body: "Full-stack builds from schema to deploy. Next.js and React on the front, NestJS or Node behind it, PostgreSQL underneath. Including the parts most people skip — auth, roles, billing, background jobs, and the deploy pipeline.",
  },
  {
    title: "AI & automation",
    body: "Putting a model inside a working system rather than beside it: generation with cost caps and template fallbacks, classification that drives real state changes, and background jobs that keep running when the request is long gone.",
  },
  {
    title: "Ecommerce",
    body: "Catalogs that model your actual product, checkouts that cannot oversell, admin panels your team can run the business from, and payment flows that stay correct when a webhook arrives twice.",
  },
  {
    title: "Frontend & performance",
    body: "Interfaces that stay responsive at real data volumes — server-side filtering and pagination over tens of thousands of rows, virtualized lists, precise cache invalidation, and honest load times.",
  },
] as const;

export const howIWork = [
  {
    title: "Fixed scope, fixed price, a date",
    body: "You get one number and one delivery date, not an hourly rate and a running meter. If the scope changes, we agree a new number before anything is built.",
  },
  {
    title: "The first milestone is small",
    body: "We start with one concrete deliverable in days, not months. If it is not what we agreed, you do not pay for it and we stop. Nothing to unwind.",
  },
  {
    title: "You own everything from day one",
    body: "Code lands in your repository, deployed to your infrastructure, with your keys. No lock-in, no hosting arrangement you have to keep paying me for.",
  },
  {
    title: "I answer within a day",
    body: "Including the awkward messages. Most problems on a project are communication problems that were left for a week.",
  },
] as const;
