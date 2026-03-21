import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Побач — Беларуская гульня ў словы";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const RANK_COLORS = ["#16A34A", "#22C55E", "#F58D3D", "#4B83C8"];

async function fetchGoogleFont(family: string, weight: number) {
  const css = await fetch(
    `https://fonts.googleapis.com/css2?family=${family}:wght@${weight}`,
    { headers: { "User-Agent": "Mozilla/5.0" } },
  ).then((r) => r.text());

  const url = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1];
  if (!url) throw new Error(`Could not parse font URL for ${family}`);
  return fetch(url).then((r) => r.arrayBuffer());
}

export default async function Image() {
  const fontData = await fetchGoogleFont("Roboto+Slab", 700);

  return new ImageResponse(
    <div
      style={{
        width: 1200,
        height: 630,
        backgroundColor: "#F7F3ED",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 40,
      }}
    >
      <div
        style={{
          fontFamily: "RobotoSlab",
          fontSize: 160,
          fontWeight: 700,
          color: "#1B120E",
          letterSpacing: "-0.02em",
          lineHeight: 1,
        }}
      >
        ПОБАЧ
      </div>

      <div style={{ display: "flex", gap: 16 }}>
        {RANK_COLORS.map((color) => (
          <div
            key={color}
            style={{
              width: 52,
              height: 52,
              backgroundColor: color,
              borderRadius: 10,
            }}
          />
        ))}
      </div>
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "RobotoSlab",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    },
  );
}
