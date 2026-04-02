import { ImageResponse } from "next/og";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog Post — Abdulaziz Hatamov";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function BlogOGImage({ params }: Props) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return new Response("Not found", { status: 404 });

  const excerpt =
    post.excerpt.length > 120 ? post.excerpt.slice(0, 120) + "…" : post.excerpt;

  const date = new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(post.publishedAt);

  const tags = post.tags.slice(0, 4);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#090909",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(200,255,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: "16px", position: "relative" }}>
          <span style={{ color: "#c8ff00", fontFamily: "ui-monospace, Menlo, monospace", fontSize: "12px", fontWeight: 700, letterSpacing: "0.3em", textTransform: "uppercase" }}>
            abdulaziz.cv / blog
          </span>
          <div style={{ flex: 1, height: "1px", background: "rgba(200,255,0,0.2)" }} />
          <span style={{ color: "#555550", fontFamily: "ui-monospace, Menlo, monospace", fontSize: "12px", letterSpacing: "0.1em" }}>
            {date}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px", position: "relative" }}>
          {tags.length > 0 && (
            <div style={{ display: "flex", gap: "12px" }}>
              {tags.map((tag) => (
                <span key={tag} style={{ color: "#c8ff00", fontFamily: "ui-monospace, Menlo, monospace", fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                  {tag}
                </span>
              ))}
            </div>
          )}
          <h1 style={{ color: "#e8e8e4", fontSize: "64px", fontWeight: 900, margin: 0, lineHeight: 1.0, letterSpacing: "-0.025em", maxWidth: "1000px" }}>
            {post.title}
          </h1>
          <p style={{ color: "#888880", fontSize: "19px", margin: 0, lineHeight: 1.55, maxWidth: "880px" }}>
            {excerpt}
          </p>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "24px", position: "relative" }}>
          <span style={{ color: "#444440", fontFamily: "ui-monospace, Menlo, monospace", fontSize: "13px" }}>abdulaziz.cv</span>
          <span style={{ color: "#c8ff00", fontFamily: "ui-monospace, Menlo, monospace", fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase" }}>ABDULAZIZ HATAMOV</span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
