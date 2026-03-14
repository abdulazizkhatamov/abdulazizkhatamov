import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.skill.deleteMany();
  await prisma.experience.deleteMany();
  await prisma.project.deleteMany();
  await prisma.siteSettings.deleteMany();

  // ─── Skills ───────────────────────────────────────────────────────────────
  const skills = [
    // Core
    { name: "JavaScript (ES2022+)", category: "Core", order: 0 },
    { name: "TypeScript", category: "Core", order: 1 },
    { name: "HTML5", category: "Core", order: 2 },
    { name: "CSS3", category: "Core", order: 3 },
    { name: "SCSS / Sass", category: "Core", order: 4 },

    // Frontend
    { name: "React 19", category: "Frontend", order: 0 },
    { name: "Next.js 15", category: "Frontend", order: 1 },
    { name: "Redux Toolkit", category: "Frontend", order: 2 },
    { name: "Zustand", category: "Frontend", order: 3 },
    { name: "TanStack Query v5", category: "Frontend", order: 4 },
    { name: "TanStack Router", category: "Frontend", order: 5 },
    { name: "React Hook Form", category: "Frontend", order: 6 },
    { name: "Zod", category: "Frontend", order: 7 },
    { name: "Vite", category: "Frontend", order: 8 },
    { name: "Webpack", category: "Frontend", order: 9 },

    // UI
    { name: "Tailwind CSS v4", category: "UI", order: 0 },
    { name: "Shadcn UI", category: "UI", order: 1 },
    { name: "Mantine UI v7", category: "UI", order: 2 },
    { name: "Radix UI", category: "UI", order: 3 },
    { name: "Framer Motion", category: "UI", order: 4 },
    { name: "Material UI", category: "UI", order: 5 },

    // Backend
    { name: "Node.js", category: "Backend", order: 0 },
    { name: "NestJS", category: "Backend", order: 1 },
    { name: "Prisma ORM", category: "Backend", order: 2 },
    { name: "PostgreSQL", category: "Backend", order: 3 },
    { name: "MongoDB", category: "Backend", order: 4 },
    { name: "Redis", category: "Backend", order: 5 },
    { name: "better-auth", category: "Backend", order: 6 },

    // APIs
    { name: "REST", category: "APIs", order: 0 },
    { name: "GraphQL", category: "APIs", order: 1 },
    { name: "WebSockets", category: "APIs", order: 2 },
    { name: "Stripe", category: "APIs", order: 3 },
    { name: "Axios", category: "APIs", order: 4 },

    // DevOps
    { name: "Git & GitHub", category: "DevOps", order: 0 },
    { name: "GitHub Actions", category: "DevOps", order: 1 },
    { name: "Docker", category: "DevOps", order: 2 },
    { name: "Ubuntu VPS", category: "DevOps", order: 3 },
    { name: "Nginx", category: "DevOps", order: 4 },
    { name: "Cloudflare R2", category: "DevOps", order: 5 },
    { name: "PM2", category: "DevOps", order: 6 },

    // Testing
    { name: "Jest", category: "Testing", order: 0 },
    { name: "Vitest", category: "Testing", order: 1 },
    { name: "React Testing Library", category: "Testing", order: 2 },
    { name: "Playwright", category: "Testing", order: 3 },
  ];

  await prisma.skill.createMany({ data: skills });
  console.log(`✅ ${skills.length} skills seeded`);

  // ─── Experience ───────────────────────────────────────────────────────────
  await prisma.experience.create({
    data: {
      company: "Freelance & Contract",
      role: "Middle Frontend Developer",
      location: "Remote",
      startDate: new Date("2023-01-01"),
      endDate: null,
      current: true,
      order: 0,
      bullets: [
        "Designed and shipped Nordfiord — a complete ecommerce platform across three production repositories (Next.js 15 storefront, React 19 + Vite admin panel, NestJS REST API), handling real Stripe payments, Redis-backed cart sessions with 7-day TTL, and direct Cloudflare R2 image uploads via presigned URLs.",
        "Architected scalable frontend systems applying compound component patterns, custom hook layers, and design token systems — delivering reusable, maintainable codebases that scale cleanly across multiple client projects.",
        "Built high-frequency real-time interfaces using WebSockets and TanStack Query, including a live admin dashboard with revenue analytics, 30-day time series charts, order status tracking, and low-stock alerts.",
        "Established CI/CD pipelines with GitHub Actions covering automated type-checking, linting, builds, and zero-downtime SSH deployments to Ubuntu VPS — eliminating all manual deployment steps.",
        "Delivered complete projects independently: translating client requirements into technical architecture, defining data models, integrating third-party services (Stripe, Resend, Cloudflare R2), and owning production deployments end-to-end.",
      ],
    },
  });

  await prisma.experience.create({
    data: {
      company: "RTM",
      role: "Frontend Developer",
      location: "Fergana, Uzbekistan",
      startDate: new Date("2021-06-01"),
      endDate: new Date("2023-05-01"),
      current: false,
      order: 1,
      bullets: [
        "Core contributor to an educational management platform serving multiple institutions — built modules for student records, grade management, financial operations, and administrative reporting used by hundreds of staff members daily.",
        "Designed and implemented data-intensive React interfaces including multi-step forms, paginated tables with server-side filtering, and role-based dashboards — streamlining workflows that previously required manual processes.",
        "Led systematic migration of legacy jQuery UI to a component-driven React architecture, establishing reusable patterns and reducing code duplication across the entire frontend codebase.",
        "Integrated and consumed 15+ RESTful API endpoints across multiple business domains, implementing robust error handling, loading states, optimistic updates, and cache invalidation strategies with React Query.",
        "Contributed to team engineering culture: participated in sprint planning and task breakdowns, conducted peer code reviews, documented component APIs, and supported junior developers in adopting React best practices.",
      ],
    },
  });

  console.log("✅ 2 experience entries seeded");

  // ─── Nordfiord (single combined project) ─────────────────────────────────
  await prisma.project.create({
    data: {
      slug: "nordfiord",
      title: "Nordfiord",
      description:
        "Full-stack ecommerce platform for pharmaceutical-grade dietary supplements — three production repositories working as one system: a Next.js 15 storefront, a React 19 + Vite admin panel, and a NestJS REST API. Stripe payments, Redis cart, Cloudflare R2 storage, full RBAC, and GDPR-compliant user management.",
      techStack: [
        "Next.js 15",
        "React 19",
        "NestJS",
        "TypeScript",
        "PostgreSQL",
        "Prisma ORM",
        "Redis",
        "Stripe",
        "Cloudflare R2",
        "better-auth",
        "TanStack Query",
        "TanStack Router",
        "Zustand",
        "Tailwind CSS v4",
        "Mantine UI v7",
        "Docker",
      ],
      details: {
        overview:
          "Nordfiord is a production-grade ecommerce platform for pharmaceutical-grade dietary supplements. It is built across three tightly integrated repositories — each with a clear responsibility boundary. The storefront handles the customer experience, the admin panel handles internal operations, and the NestJS API is the single source of truth for all business logic, data, and third-party integrations. Every piece of the stack was chosen deliberately: Redis for cart persistence and caching, Stripe for PCI-compliant payments, Cloudflare R2 for cost-effective object storage with presigned uploads that never touch the API server, and better-auth for session management with role-based access across all three apps.",
        repos: [
          {
            name: "Storefront",
            subtitle: "Next.js 15 · App Router · TypeScript",
            description:
              "The customer-facing storefront built on Next.js 15 App Router with full SEO coverage — dynamic sitemap generated from live product slugs, robots.txt blocking private routes, per-product Open Graph metadata via generateMetadata, and canonical URLs on every page. Customers can browse products with multi-dimensional filtering (effects, ingredients, form, audience), manage their cart, authenticate via better-auth cookie sessions, and complete purchases through Stripe's hosted checkout flow.",
            techStack: [
              "Next.js 15 (App Router)",
              "TypeScript",
              "Tailwind CSS v4",
              "TanStack Query v5",
              "Zustand",
              "better-auth",
              "Stripe",
              "Axios",
              "Redis",
            ],
            highlights: [
              "Cart hydration on page load: CartInitializer fetches Redis cart from the API and syncs it into Zustand — client state is always consistent with the server source of truth.",
              "Stripe Checkout Session flow with dynamic price_data — stock is only decremented after checkout.session.completed webhook fires, preventing overselling on abandoned sessions.",
              "generateMetadata per product detail page: fetches product name, short description, and primary image from the API to build accurate OG cards for social sharing.",
              "Sitemap auto-generated at build and runtime from live product slugs via the API — new products appear in search indexing without any manual step.",
              "Route protection via middleware: /cart, /checkout, /account, and /orders redirect unauthenticated users to /login with the intended destination preserved.",
              "Role enforcement: staff and admin accounts are blocked from the storefront at the middleware level — they are redirected to the admin panel.",
              "Axios instance with automatic .data unwrapping and shared error interceptor — API calls across all hooks are consistently handled without boilerplate.",
            ],
          },
          {
            name: "Admin Panel",
            subtitle: "React 19 · Vite · TanStack Router",
            description:
              "Internal dashboard for managing every aspect of the platform — products, variants, images, categories, taxonomy (effects, ingredients, forms, audiences), orders, users, and site settings. Built with React 19 and Vite for fast development iteration, TanStack Router for type-safe file-based routing, and Mantine UI v7 for a consistent design system. React Compiler is enabled, eliminating the need for manual useMemo and useCallback throughout the codebase.",
            techStack: [
              "React 19",
              "Vite",
              "TypeScript",
              "TanStack Router",
              "TanStack Query v5",
              "Mantine UI v7",
              "Zustand",
              "better-auth",
              "Axios",
              "Cloudflare R2",
            ],
            highlights: [
              "Full RBAC with two staff tiers: admin has unrestricted access; staff can create and edit products, view and manage orders, and ban/unban users — but cannot delete, change roles, or anonymize.",
              "Product editor with five dedicated tabs: Basic Info (name, slug, rich description, status), Relations (category, effects, ingredients, audiences), Variants (pricing in cents, SKU, stock, Stripe Price ID), Images (drag-and-drop R2 upload), and Science Facts (sourced research claims with source URLs).",
              "Image upload flow: frontend requests a presigned uploadUrl + publicUrl from the API, PUTs the file bytes directly to Cloudflare R2, then saves only the publicUrl to the database — the API server never handles file bytes.",
              "Order management with enforced status transitions: CANCELLED and REFUNDED are terminal states — the UI locks further actions, matching backend validation rules and preventing invalid state changes.",
              "GDPR user anonymization: admin-only action that irreversibly scrubs PII from the database. Requires typing ANONYMIZE into a confirmation input to proceed — designed to prevent accidental triggering.",
              "Real-time dashboard: revenue stats (all-time, today, this month, MoM growth %), order status breakdown, low-stock variant alerts, recent orders table, and a 30-day revenue + order count time series chart.",
              "React Compiler enabled across the entire codebase — automatic memoization of components and hook return values without any manual optimization annotations.",
            ],
          },
          {
            name: "REST API",
            subtitle: "NestJS · PostgreSQL · Redis",
            description:
              "The backend API powering both the storefront and admin panel. All routes are prefixed with /api and organized into domain modules: products, variants, images, categories, effects, ingredients, audiences, forms, science-facts, orders, cart, users, dashboard, and webhooks. Access is tiered into four levels — public (no auth), authenticated (any logged-in user), staff (admin or staff role), and admin (admin only) — enforced via a RolesGuard applied per route.",
            techStack: [
              "NestJS",
              "TypeScript",
              "PostgreSQL",
              "Prisma ORM",
              "Redis (@keyv/redis)",
              "Stripe",
              "Cloudflare R2 (S3-compatible)",
              "better-auth (admin plugin)",
              "Docker",
            ],
            highlights: [
              "Cart stored entirely in Redis with key cart:{userId} and 7-day TTL — cart data never enters the PostgreSQL database, keeping the relational schema clean and cart operations fast.",
              "Stripe product and price sync on creation: each product maps to a Stripe Product, each variant to a Stripe Price. Price changes archive the old Stripe Price and create a new one — Stripe's immutability constraint is handled transparently.",
              "Webhook handler at POST /api/webhooks/stripe processes checkout.session.completed (order → PROCESSING, stock decremented), checkout.session.expired (order → CANCELLED), and charge.refunded (order → REFUNDED or PARTIALLY_REFUNDED). Raw body parsing enabled in main.ts for Stripe signature verification.",
              "Presigned R2 upload endpoint: POST /products/:id/images/presigned-url returns { uploadUrl, publicUrl, key }. The browser uploads directly to R2, the server never receives file bytes. Bucket token uses minimum required permissions (Object Read & Write only).",
              "Dashboard endpoint returns a full analytics payload cached in Redis for 5 minutes: all-time and period revenue, MoM growth %, order counts by status, product and variant counts with low-stock breakdown, user counts by role, and a 30-day daily time series. Force-refresh available via POST /dashboard/refresh (admin only).",
              "Soft delete + restore pattern on products, users, and orders — nothing is hard deleted. Admin-only restore endpoints allow recovery from accidental deletions.",
              "One Stripe Customer per user created lazily on first checkout and stored as stripeCustomerId — subsequent checkouts reuse the existing Stripe Customer for consistent payment history.",
            ],
          },
        ],
        architecture: [
          "Three-repository structure: storefront (Next.js, port 5174), admin panel (Vite + React, port 5173), REST API (NestJS, port 3000) — each deployed independently with shared PostgreSQL and Redis.",
          "Single PostgreSQL database accessed exclusively through the NestJS API — neither frontend app queries the database directly, enforcing a clean API boundary.",
          "Redis serves dual purpose: cart session store (keyv with TTL, no persistence required) and API response cache (dashboard endpoint with 5-minute TTL and manual invalidation).",
          "better-auth manages sessions for all three apps with a shared cookie domain. Three roles exist: customer (default, storefront access), staff (content management), admin (full platform access). Role assignment is admin-only.",
          "Image pipeline: browser → presigned URL request to API → direct PUT to Cloudflare R2 → publicUrl saved to DB via API. The API acts as a coordinator only — no file bytes pass through NestJS.",
          "Stripe integration: products and prices synced on creation, checkout via hosted Checkout Sessions, order state driven entirely by webhooks — the frontend never directly modifies order status.",
          "Order status machine: PENDING → PROCESSING → COMPLETED → REFUNDED / PARTIALLY_REFUNDED. Also: PENDING or PROCESSING → CANCELLED. Terminal states (CANCELLED, REFUNDED) reject all further transitions at the API level.",
        ],
      },
      liveUrl: "https://nordfiord.com",
      githubUrl: null,
      imageUrl: null,
      featured: true,
      order: 0,
    },
  });

  console.log("✅ Nordfiord project seeded");

  // ─── Site Settings ────────────────────────────────────────────────────────
  await prisma.siteSettings.create({
    data: { id: "singleton", openToWork: true },
  });

  console.log("✅ Site settings seeded");
  console.log("🎉 Done!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
