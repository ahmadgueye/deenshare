import type { MetadataRoute } from "next";

import { defaultDescription } from "@/lib/metadata";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "DeenShare",
    short_name: "DeenShare",
    description: defaultDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#171717",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
