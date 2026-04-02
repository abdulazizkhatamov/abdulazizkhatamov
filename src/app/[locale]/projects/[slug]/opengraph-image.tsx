import { ImageResponse } from "next/og";
import prisma from "@/lib/prisma";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Project — Abdulaziz Hatamov";
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string; slug: string }> };

export default async function ProjectOGImage({ params }: Props) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({
    where: { slug },
    select: { title: true, description: true, techStack: true },
  });

  if (!project) return new Response("Not found", { status: 404 });

  const techStack = project.techStack.slice(0, 6);
  const description =
    project.description.length > 130
      ? project.description.slice(0, 130) + "…"
      : project.description;

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
        {/* Grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(200,255,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(200,255,0,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            position: "relative",
          }}
        >
          <span
            style={{
              color: "#c8ff00",
              fontFamily: "ui-monospace, Menlo, monospace",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            abdulaziz.cv / projects
          </span>
          <div
            style={{ flex: 1, height: "1px", background: "rgba(200,255,0,0.2)" }}
          />
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            position: "relative",
          }}
        >
          <h1
            style={{
              color: "#e8e8e4",
              fontSize: "76px",
              fontWeight: 900,
              margin: 0,
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              color: "#888880",
              fontSize: "19px",
              margin: 0,
              lineHeight: 1.55,
              maxWidth: "880px",
            }}
          >
            {description}
          </p>

          {techStack.length > 0 && (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {techStack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    background: "rgba(200,255,0,0.08)",
                    border: "1px solid rgba(200,255,0,0.25)",
                    color: "#c8ff00",
                    padding: "5px 14px",
                    fontFamily: "ui-monospace, Menlo, monospace",
                    fontSize: "11px",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    borderRadius: "2px",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom strip */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid rgba(255,255,255,0.08)",
            paddingTop: "24px",
            position: "relative",
          }}
        >
          <span
            style={{
              color: "#444440",
              fontFamily: "ui-monospace, Menlo, monospace",
              fontSize: "13px",
            }}
          >
            abdulaziz.cv
          </span>
          <span
            style={{
              color: "#c8ff00",
              fontFamily: "ui-monospace, Menlo, monospace",
              fontSize: "13px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            ABDULAZIZ HATAMOV
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
