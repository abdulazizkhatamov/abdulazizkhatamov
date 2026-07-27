import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — Full-Stack Developer`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time. This is the image that appears whenever the link is pasted
 * into an email, LinkedIn, or a DM — the single highest-value piece of SEO on the site,
 * because it decides whether the link reads as legitimate or as spam.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0b0c",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 30,
              color: "#5eead4",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
            }}
          >
            Full-Stack Developer
          </div>
          <div
            style={{
              fontSize: 82,
              color: "#ededea",
              marginTop: 20,
              lineHeight: 1.05,
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#a1a19b",
              marginTop: 28,
              lineHeight: 1.35,
              maxWidth: 900,
            }}
          >
            I build and ship production systems end to end — database, API, frontend,
            deploy.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 26,
            color: "#757570",
          }}
        >
          <div style={{ display: "flex" }}>{site.domain}</div>
          <div style={{ display: "flex" }}>{site.email}</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
