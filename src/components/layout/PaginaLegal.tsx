import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function PaginaLegal({ titulo, atualizado, children }: { titulo: string; atualizado: string; children: ReactNode }) {
  return (
    <>
      <Header inicio={false} />
      <main className="mx-auto w-full max-w-[760px] px-5 md:px-8 py-14 md:py-24">
        <h1 className="titulo text-[40px] md:text-[60px]">{titulo}</h1>
        <p className="mt-3 text-[14px] text-tinta-suave">Última atualização: {atualizado}</p>
        <div className="mt-10 space-y-9 text-[16px] md:text-[17px] leading-[1.6] [&_h2]:text-[20px] [&_h2]:font-bold [&_h2]:mb-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_p+p]:mt-3">
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
