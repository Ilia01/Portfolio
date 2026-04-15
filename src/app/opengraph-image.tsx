import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Ilia Goginashvili - Backend Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#0e0d0b",
          position: "relative",
        }}
      >
        {/* Subtle warm glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,160,84,0.08) 0%, transparent 70%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: "16px",
              color: "#7a746d",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
            }}
          >
            Backend Engineer
          </p>

          <h1
            style={{
              fontFamily: "serif",
              fontSize: "72px",
              color: "#ede9e2",
              margin: 0,
              lineHeight: 1.1,
            }}
          >
            Ilia Goginashvili
          </h1>

          <p
            style={{
              fontFamily: "sans-serif",
              fontSize: "22px",
              color: "#a39d95",
              margin: 0,
              marginTop: "8px",
            }}
          >
            Systems and open-source tools with TypeScript and Node.js
          </p>

          <div
            style={{
              display: "flex",
              gap: "24px",
              marginTop: "24px",
              fontFamily: "monospace",
              fontSize: "15px",
              color: "#d4a054",
            }}
          >
            <span>GitHub</span>
            <span style={{ color: "#2c2825" }}>·</span>
            <span>LinkedIn</span>
            <span style={{ color: "#2c2825" }}>·</span>
            <span>Email</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
