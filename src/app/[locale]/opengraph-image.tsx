import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Abdulaziz Hatamov — Frontend Developer";

export default function HomeOGImage() {
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

        {/* Top bar */}
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
              fontSize: "13px",
              fontWeight: 700,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
            }}
          >
            abdulaziz.cv
          </span>
          <div
            style={{
              flex: 1,
              height: "1px",
              background: "rgba(200,255,0,0.2)",
            }}
          />
        </div>

        {/* Main heading */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              lineHeight: 0.88,
            }}
          >
            <span
              style={{
                color: "#e8e8e4",
                fontSize: "100px",
                fontWeight: 900,
                letterSpacing: "-0.04em",
              }}
            >
              ABDULAZIZ
            </span>
            <span
              style={{
                color: "#c8ff00",
                fontSize: "100px",
                fontWeight: 900,
                letterSpacing: "-0.04em",
              }}
            >
              HATAMOV
            </span>
          </div>
          <span
            style={{
              color: "#888880",
              fontFamily: "ui-monospace, Menlo, monospace",
              fontSize: "20px",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginTop: "8px",
            }}
          >
            FRONTEND DEVELOPER
          </span>
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
              letterSpacing: "0.08em",
            }}
          >
            React · Next.js · TypeScript · NestJS · PostgreSQL
          </span>
          <span
            style={{
              color: "#c8ff00",
              fontFamily: "ui-monospace, Menlo, monospace",
              fontSize: "12px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            AVAILABLE FOR HIRE
          </span>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
