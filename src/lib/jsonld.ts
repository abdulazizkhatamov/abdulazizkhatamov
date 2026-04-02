const BASE_URL = "https://abdulaziz.cv";

export function personJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: "Abdulaziz Hatamov",
    url: `${BASE_URL}/${locale}`,
    jobTitle: "Frontend Developer",
    description:
      "Frontend Developer with 4+ years of experience building production web applications using React, Next.js, TypeScript, and Node.js.",
    sameAs: [
      "https://github.com/abdulazizkhatamov",
      "https://linkedin.com/in/abdulazizkhatamov",
    ],
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "NestJS",
      "PostgreSQL",
      "Redis",
      "Tailwind CSS",
      "GraphQL",
    ],
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: "Abdulaziz Hatamov",
    description: "Portfolio of Abdulaziz Hatamov, Frontend Developer",
    author: { "@type": "Person", "@id": `${BASE_URL}/#person` },
    inLanguage: ["en", "uz", "ru"],
  };
}

export function articleJsonLd({
  title,
  description,
  publishedAt,
  updatedAt,
  slug,
  locale,
  tags,
}: {
  title: string;
  description: string;
  publishedAt: Date | null;
  updatedAt: Date;
  slug: string;
  locale: string;
  tags: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${BASE_URL}/${locale}/blog/${slug}`,
    ...(publishedAt && { datePublished: publishedAt.toISOString() }),
    dateModified: updatedAt.toISOString(),
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Abdulaziz Hatamov",
      url: BASE_URL,
    },
    publisher: {
      "@type": "Person",
      name: "Abdulaziz Hatamov",
      url: BASE_URL,
    },
    keywords: tags.join(", "),
    image: `${BASE_URL}/${locale}/blog/${slug}/opengraph-image`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/${locale}/blog/${slug}`,
    },
    inLanguage: locale,
  };
}

export function projectJsonLd({
  title,
  description,
  slug,
  locale,
  techStack,
  liveUrl,
  updatedAt,
}: {
  title: string;
  description: string;
  slug: string;
  locale: string;
  techStack: string[];
  liveUrl: string | null;
  updatedAt: Date;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: title,
    description,
    url: liveUrl ?? `${BASE_URL}/${locale}/projects/${slug}`,
    dateModified: updatedAt.toISOString(),
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Abdulaziz Hatamov",
    },
    keywords: techStack.join(", "),
    image: `${BASE_URL}/${locale}/projects/${slug}/opengraph-image`,
    genre: "Software",
    inLanguage: locale,
  };
}

export function breadcrumbJsonLd(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.item,
    })),
  };
}
