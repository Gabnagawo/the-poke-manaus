import type { Metadata } from "next";
import { LOJA } from "./loja";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || LOJA.siteUrl;
export const SITE_NAME = "The Poke Manaus";
export const SITE_TITLE = "The Poke Manaus | Pedidos Online";
export const SITE_DESCRIPTION =
  "Poke fresco montado do seu jeito no Park Mall Ephigênio em Manaus. Ingredientes selecionados, sucos especiais e entrega rápida. Peça já!";

export const metadadosBase: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: "The Poke Manaus" }],
  keywords: [
    "poke manaus",
    "the poke manaus",
    "poke aleixo manaus",
    "monte seu poke manaus",
    "comida saudavel manaus",
    "restaurante park mall ephigenio",
    "delivery de poke manaus",
    "sucos especiais manaus",
  ],
  robots: {
    index: false, // noindex enquanto protótipo (regra do brief)
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "The Poke Manaus — Rápido, Saboroso & Nutritivo.",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};
