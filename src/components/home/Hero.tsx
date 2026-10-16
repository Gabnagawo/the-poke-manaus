"use client";

// Hero: mesa vista de cima com as tigelas reais (limon.no), título grande e o
// slogan da marca no letreiro manuscrito (Kaufmann), inclinado como o "FRESH CATCH".

import { useEffect, useState } from "react";
import { usePedido } from "@/lib/pedido";
import { LOJA, statusLoja } from "@/lib/loja";
import { aoClicarAncora } from "@/lib/rolagem";
import { IconeSeta } from "@/components/ui/Icones";

export function Hero() {
  const { abrirMontagem } = usePedido();
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    setStatus(statusLoja().texto);
  }, []);

  return (
    <section
      className="relative overflow-hidden bg-[#246e92] text-creme h-[calc(100svh-var(--altura-topo)-44px)] min-h-[600px] max-h-[900px] lg:h-[calc(100svh-var(--altura-topo)-52px)] lg:min-h-[580px] lg:max-h-[860px]"
      aria-labelledby="titulo-hero"
    >
      <picture>
        <source
          media="(min-width: 1024px)"
          srcSet="/images/hero/mesa-desktop-1600.webp 1600w, /images/hero/mesa-desktop.webp 2400w"
          sizes="100vw"
        />
        <img
          src="/images/hero/mesa-mobile-720.webp"
          srcSet="/images/hero/mesa-mobile-720.webp 720w, /images/hero/mesa-mobile.webp 1080w"
          sizes="100vw"
          alt="Pokes da The Poke vistos de cima, sobre uma mesa azul"
          className="mesa absolute inset-0 h-full w-full object-cover object-top md:object-center lg:object-[75%_center]"
          fetchPriority="high"
          decoding="async"
          width={1080}
          height={2040}
        />
      </picture>

      <div className="relative h-full mx-auto max-w-[1240px] px-5 md:px-8 pt-9 pb-8 md:pt-14 lg:pt-0 lg:pb-16 flex flex-col lg:justify-end">
        <h1
          id="titulo-hero"
          className="titulo text-[clamp(56px,16.5vw,72px)] md:text-[clamp(80px,8.2vw,120px)] leading-[0.88] entrar"
          style={{ "--atraso": "160ms" } as React.CSSProperties}
        >
          Monte
          <br />
          seu poke
        </h1>

        <p
          className="letreiro entrar-letreiro self-start whitespace-nowrap text-amarelo text-[clamp(28px,8.4vw,38px)] md:text-[clamp(44px,4.4vw,64px)] mt-5 ml-1 md:mt-5 md:ml-2 origin-left"
          style={{ "--atraso": "420ms" } as React.CSSProperties}
        >
          Rápido, saboroso &amp; nutritivo.
        </p>

        <div
          className="mt-8 md:mt-10 flex flex-wrap items-center gap-3 entrar"
          style={{ "--atraso": "560ms" } as React.CSSProperties}
        >
          <button type="button" onClick={() => abrirMontagem("M")} className="botao botao-amarelo px-5 md:px-6">
            Monte o seu
            <IconeSeta />
          </button>
          <a href="#cardapio" onClick={(e) => aoClicarAncora(e, "cardapio")} className="botao botao-contorno text-creme px-5 md:px-6">
            Ver cardápio
          </a>
        </div>

        <p
          className="hidden md:block mt-5 text-[15px] font-medium text-creme min-h-5 entrar"
          style={{ "--atraso": "680ms" } as React.CSSProperties}
        >
          {LOJA.local}
          {status ? ` · ${status}` : ""}
        </p>
      </div>
    </section>
  );
}
