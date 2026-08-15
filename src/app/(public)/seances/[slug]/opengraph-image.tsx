import { ImageResponse } from "next/og";

import { getSeanceBySlug } from "@/lib/db/queries/seances";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = await getSeanceBySlug(slug);
  const date = s?.sessionDate
    ? new Date(s.sessionDate).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

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
          Taalib · Séance de révision
        </div>
        <div
          style={{
            display: "flex",
            marginTop: 20,
            fontSize: 60,
            fontWeight: 700,
            maxWidth: 1000,
          }}
        >
          {s?.title ?? "Séance"}
        </div>
        {date && (
          <div
            style={{ display: "flex", marginTop: 24, fontSize: 28, color: "#525252" }}
          >
            {date}
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
