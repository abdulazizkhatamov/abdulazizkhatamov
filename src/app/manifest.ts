import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Abdulaziz Hatamov — Frontend Developer",
    short_name: "AH.cv",
    description:
      "Portfolio of Abdulaziz Hatamov, Frontend Developer specializing in React, Next.js, and TypeScript.",
    start_url: "/en",
    display: "standalone",
    background_color: "#090909",
    theme_color: "#090909",
    lang: "en",
    icons: [
      {
        src: "/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
