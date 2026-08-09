import { ImageResponse } from "next/og";

import { getThematiqueBySlug } from "@/lib/db/queries/thematiques";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = await getThematiqueBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#fafafa",
          color: "#171717",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#737373" }}>
          DeenShare{t ? ` · ${t.cours.title}` : " · Thématique"}
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 64,
            fontWeight: 700,
            maxWidth: 1000,
          }}
        >
          {t?.title ?? "Thématique"}
        </div>
      </div>
    ),
    { ...size }
  );
}
