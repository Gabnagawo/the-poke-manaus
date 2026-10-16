"use client";

// Horários na faixa "Catering" da Honi Poke: foto de ponta a ponta e um painel centralizado por cima.

import { useEffect, useState } from "react";
import { LOJA, statusLoja, type StatusLoja } from "@/lib/loja";
import { IconeInstagram, IconeLocal, IconeSetaExterna } from "@/components/ui/Icones";

export function Horarios() {
  const [status, setStatus] = useState<StatusLoja | null>(null);

  useEffect(() => {
    const atualizar = () => setStatus(statusLoja());
    atualizar();
    const t = setInterval(atualizar, 60_000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="horarios" className="relative overflow-hidden bg-[#16547a]" aria-labelledby="titulo-horarios">
      <picture>
        <source media="(min-width: 1024px)" srcSet="/images/hero/mesa-desktop-1600.webp" />
        <img
          src="/images/hero/mesa-mobile-720.webp"
          alt=""
          loading="lazy"
          decoding="async"
          width={1080}
          height={2040}
          className="absolute inset-0 h-full w-full object-cover object-bottom lg:object-center"
        />
      </picture>

      <div className="relative mx-auto max-w-[1240px] px-4 md:px-8 py-20 md:py-28">
        <div className="revelar mx-auto max-w-[560px] rounded-[22px] bg-noite/92 px-6 py-10 md:px-12 md:py-12 text-center shadow-[0_20px_60px_rgb(2_20_34/0.5)]">
          <h2 id="titulo-horarios" className="titulo text-[36px] md:text-[52px]">
            Horários
          </h2>
          <p className="mt-4 text-[19px] md:text-[22px] font-medium">
            Todos os dias, das <span className="num">11h às 23h</span>
          </p>
          <p className="mt-2 text-[15px] font-medium min-h-6" aria-live="polite">
            {status && (
              <>
                <span className={`inline-block w-2 h-2 rounded-full mr-2 align-middle ${status.aberta ? "bg-ok" : "bg-petroleo/40"}`} aria-hidden />
                {status.texto}
              </>
            )}
          </p>

          <p className="mt-7 text-[15px] font-bold uppercase tracking-[0.08em] text-amarelo">{LOJA.local}</p>
          <p className="mt-2 text-[16px] md:text-[17px] leading-[1.5] text-tinta-suave">
            {LOJA.enderecoLinha}
            <br />
            {LOJA.bairro}, {LOJA.cidade}/{LOJA.estado} · CEP {LOJA.cep}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href={LOJA.mapa} target="_blank" rel="noopener noreferrer" className="botao botao-amarelo">
              <IconeLocal className="w-[18px] h-[18px]" />
              Como chegar
            </a>
            <a href={LOJA.linkIfood} target="_blank" rel="noopener noreferrer" className="botao botao-contorno">
              iFood
              <IconeSetaExterna />
            </a>
            <a href={LOJA.instagram} target="_blank" rel="noopener noreferrer" className="botao botao-contorno">
              <IconeInstagram className="w-[18px] h-[18px]" />
              Instagram
            </a>
          </div>
          <p className="mt-4 text-[13px] text-tinta-suave">No iFood, o pedido mínimo é de R$ 20,00.</p>
        </div>
      </div>
    </section>
  );
}
