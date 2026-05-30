import { ImageResponse } from "next/og";

export const alt = "Ilia Goginashvili, Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0c0b0a";
const PAPER = "#141311";
const RULE = "#2a2622";
const CREAM = "#ece8e1";
const STONE = "#a39d95";
const ASH = "#76706a";
const AMBER = "#d4a054";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: INK,
          padding: "72px 80px",
          fontFamily:
            'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          color: CREAM,
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 50% at 28% 30%, rgba(212,160,84,0.08) 0%, transparent 65%)",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 18,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: AMBER,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
          }}
        >
          <span
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: AMBER,
            }}
          />
          Open to full-time and freelance
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "auto",
            gap: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 108,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              fontWeight: 600,
            }}
          >
            <span>Full-stack developer.</span>
            <span style={{ color: STONE }}>Shipping product end-to-end.</span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 18,
              marginTop: 12,
              fontSize: 26,
              color: STONE,
            }}
          >
            <span
              style={{
                width: 56,
                height: 2,
                background: AMBER,
              }}
            />
            <span>
              Rebuilding mprmahjong.com on Next.js 16, Postgres, and Prisma.
            </span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 64,
            paddingTop: 28,
            borderTop: `1px solid ${RULE}`,
            fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
            fontSize: 22,
            color: ASH,
            letterSpacing: "0.06em",
          }}
        >
          <div style={{ display: "flex", gap: 12, color: CREAM }}>
            <span>Ilia Goginashvili</span>
            <span style={{ color: RULE }}>·</span>
            <span style={{ color: STONE }}>Tbilisi, Georgia</span>
          </div>
          <span
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              color: AMBER,
            }}
          >
            iliagoginashvili.com
          </span>
        </div>

        <div
          style={{
            position: "absolute",
            right: -40,
            top: -40,
            width: 240,
            height: 240,
            borderRadius: 9999,
            background: PAPER,
            opacity: 0.6,
          }}
        />
      </div>
    ),
    { ...size },
  );
}
