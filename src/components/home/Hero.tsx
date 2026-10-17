"use client";

// Hero da versão Honi Poke: foto de ponta a ponta com o slogan grande na cor de ação
// ("LIFE IN A BOWL" da Honi) e a escolha do jeito de pedir logo de cara.
// Celular: painel flutuante embaixo com Entrega / Retirar (o painel rosa da Honi, aqui em azul).

import { useEffect, useState } from "react";
import { preload } from "react-dom";
import { usePedido, type TipoEntrega } from "@/lib/pedido";
import { LOJA, statusLoja } from "@/lib/loja";
import { irPara } from "@/lib/rolagem";

const MESA_CELULAR = "/images/hero/mesa-mobile-720.webp 720w, /images/hero/mesa-mobile-900.webp 900w, /images/hero/mesa-mobile.webp 1080w";
const MESA_DESKTOP = "/images/hero/mesa-desktop-1600.webp 1600w, /images/hero/mesa-desktop.webp 2400w";

export function Hero() {
  preload("/images/hero/mesa-mobile-720.webp", {
    as: "image",
    imageSrcSet: MESA_CELULAR,
    imageSizes: "100vw",
    fetchPriority: "high",
    media: "(max-width: 1023px)",
  });
  preload("/images/hero/mesa-desktop-1600.webp", {
    as: "image",
    imageSrcSet: MESA_DESKTOP,
    imageSizes: "100vw",
    fetchPriority: "high",
    media: "(min-width: 1024px)",
  });
  const { definirEntrega } = usePedido();
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    setStatus(statusLoja().texto);
  }, []);

  const pedir = (tipo: TipoEntrega) => {
    definirEntrega(tipo);
    irPara("cardapio");
  };

  return (
    <section
      className="relative overflow-hidden bg-[#16547a] text-petroleo h-[calc(100svh-var(--altura-topo))] min-h-[620px] max-h-[920px] lg:h-[calc(100svh-var(--altura-topo)-40px)] lg:min-h-[580px] lg:max-h-[860px]"
      aria-labelledby="titulo-hero"
    >
      <picture>
        <source media="(min-width: 1024px)" srcSet={MESA_DESKTOP} sizes="100vw" />
        <img
          src="/images/hero/mesa-mobile-720.webp"
          srcSet={MESA_CELULAR}
          sizes="100vw"
          alt="Pokes da The Poke vistos de cima, sobre uma mesa azul"
          className="mesa absolute inset-0 h-full w-full object-cover object-top md:object-center lg:object-[75%_center]"
          fetchPriority="high"
          decoding="async"
          width={1080}
          height={2040}
        />
      </picture>

      <div className="relative h-full mx-auto max-w-[1240px] px-5 md:px-8 pt-10 md:pt-16 lg:pt-0 lg:pb-16 flex flex-col items-center text-center lg:items-start lg:text-left lg:justify-end">
        <h1
          id="titulo-hero"
          className="titulo text-amarelo text-[clamp(44px,12.6vw,58px)] md:text-[clamp(60px,6.4vw,96px)] leading-[0.95] entrar"
          style={{ "--atraso": "120ms" } as React.CSSProperties}
        >
          Rápido,
          <br />
          saboroso <span className="whitespace-nowrap">&amp;</span>
          <br /> nutritivo.
        </h1>

        <p
          className="mt-4 md:mt-6 max-w-[30ch] text-[17px] md:text-[21px] leading-[1.35] font-medium entrar"
          style={{ "--atraso": "300ms" } as React.CSSProperties}
        >
          Monte o seu poke ou escolha uma receita da casa. {LOJA.local}.
        </p>

        {/* Desktop: jeito de pedir junto do título */}
        <div className="hidden lg:flex mt-10 items-center gap-3 entrar" style={{ "--atraso": "460ms" } as React.CSSProperties}>
          <button type="button" onClick={() => pedir("entrega")} className="botao botao-amarelo">
            Pedir para entregar
          </button>
          <button type="button" onClick={() => pedir("retirada")} className="botao botao-contorno">
            Retirar na loja
          </button>
        </div>
        <p className="hidden lg:block mt-5 text-[15px] font-medium min-h-5 entrar" style={{ "--atraso": "560ms" } as React.CSSProperties}>
          {status ?? " "}
        </p>
      </div>

      {/* Celular e tablet: painel flutuante */}
      <div
        className="lg:hidden absolute inset-x-4 bottom-4 md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-[440px] rounded-[22px] bg-noite/92 p-4 pt-3.5 shadow-[0_14px_40px_rgb(2_20_34/0.5)] entrar"
        style={{ "--atraso": "520ms" } as React.CSSProperties}
      >
        <p className="text-center text-[14px] font-bold">Como você quer pedir?</p>
        <div className="mt-3 grid grid-cols-2 gap-2.5">
          <button type="button" onClick={() => pedir("entrega")} className="botao botao-amarelo px-3">
            Entrega
          </button>
          <button type="button" onClick={() => pedir("retirada")} className="botao botao-contorno px-3">
            Retirar
          </button>
        </div>
        <p className="mt-2 text-center text-tinta-suave text-[13px] min-h-5">{status ?? ""}</p>
      </div>
    </section>
  );
}
