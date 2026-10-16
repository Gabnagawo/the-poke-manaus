import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "The Poke Manaus",
    short_name: "The Poke",
    description: "Monte seu poke e peça pelo site da The Poke Manaus.",
    start_url: "/",
    display: "standalone",
    background_color: "#FCF9F0",
    theme_color: "#FCF9F0",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
