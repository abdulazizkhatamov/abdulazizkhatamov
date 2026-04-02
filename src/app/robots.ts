import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api/"],
      },
      {
        // Prevent AI training crawlers from scraping content
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "CCBot",
          "anthropic-ai",
          "Claude-Web",
          "Amazonbot",
          "FacebookBot",
        ],
        disallow: "/",
      },
    ],
    sitemap: "https://abdulaziz.cv/sitemap.xml",
    host: "https://abdulaziz.cv",
  };
}
