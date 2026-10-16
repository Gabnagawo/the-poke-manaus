import type { Metadata, Viewport } from "next";
import "./globals.css";
import { metadadosBase } from "@/lib/metadados";
import { gerarEsquemaRestaurante } from "@/lib/esquema";
import { PedidoProvider } from "@/lib/pedido";
import { LogoSimbolo } from "@/components/ui/Logo";

export const metadata: Metadata = metadadosBase;

export const viewport: Viewport = {
  themeColor: "#FCF9F0",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const esquemaJson = JSON.stringify(gerarEsquemaRestaurante());

  return (
    <html lang="pt-BR">
      <head>
        {/* liga as animações de entrada só quando há JS (sem JS, tudo aparece) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <link rel="preload" href="/fonts/aktiv/AktivGrotesk-XBold.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/kaufmann/Kaufmann.woff2" as="font" type="font/woff2" crossOrigin="" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: esquemaJson }} />
      </head>
      <body className="min-h-screen flex flex-col">
        <LogoSimbolo />
        <PedidoProvider>{children}</PedidoProvider>
      </body>
    </html>
  );
}
