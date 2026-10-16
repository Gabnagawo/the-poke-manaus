import type { Metadata, Viewport } from "next";
import "./globals.css";
import { metadadosBase } from "@/lib/metadados";
import { gerarEsquemaRestaurante } from "@/lib/esquema";

export const metadata: Metadata = metadadosBase;

export const viewport: Viewport = {
  themeColor: "#FCF9F0",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const esquemaJson = JSON.stringify(gerarEsquemaRestaurante());

  return (
    <html lang="pt-BR" className="bg-[#FCF9F0]">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: esquemaJson }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#FCF9F0] text-[#1D0B0D] antialiased selection:bg-[#F7EA48] selection:text-[#0E2A38]">
        {children}
      </body>
    </html>
  );
}
