"use client";

// Horários e endereço no fundo sálvia, com o copo inclinado no lugar da sacola amarela da limon.no.

import { useEffect, useState } from "react";
import { LOJA, statusLoja, type StatusLoja } from "@/lib/loja";
import { fotoSrc } from "@/lib/fotos";
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
    <section id="horarios" className="relative overflow-hidden bg-salvia" aria-labelledby="titulo-horarios">
      <div className="relative mx-auto max-w-[1240px] px-5 md:px-8 pt-16 pb-44 md:py-28 grid md:grid-cols-[1.1fr_0.9fr] gap-10">
        <div className="revelar relative z-10">
          <h2 id="titulo-horarios" className="titulo text-[40px] md:text-[60px]">
            Horários
          </h2>

          <dl className="mt-8 max-w-[460px] text-[17px] md:text-[20px]">
            <div className="flex items-baseline justify-between gap-6 py-4 border-y border-petroleo/20">
              <dt className="font-light">Segunda a domingo</dt>
              <dd className="font-bold num">11h às 23h</dd>
            </div>
          </dl>
          <p className="mt-4 text-[15px] font-medium min-h-6" aria-live="polite">
            {status && (
              <>
                <span
                  className={`inline-block w-2 h-2 rounded-full mr-2 align-middle ${status.aberta ? "bg-[#2f8a4c]" : "bg-petroleo/40"}`}
                  aria-hidden
                />
                {status.texto}
              </>
            )}
          </p>

          <h3 className="mt-12 text-[15px] font-bold uppercase tracking-[0.08em]">{LOJA.local}</h3>
          <p className="mt-2 text-[17px] md:text-[19px] font-light leading-[1.5]">
            {LOJA.enderecoLinha}
            <br />
            {LOJA.bairro}, {LOJA.cidade}/{LOJA.estado} · CEP {LOJA.cep}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href={LOJA.mapa} target="_blank" rel="noopener noreferrer" className="botao botao-petroleo">
              <IconeLocal className="w-[18px] h-[18px]" />
              Como chegar
            </a>
            <a href={LOJA.linkIfood} target="_blank" rel="noopener noreferrer" className="botao botao-contorno">
              Pedir no iFood
              <IconeSetaExterna />
            </a>
            <a href={LOJA.instagram} target="_blank" rel="noopener noreferrer" className="botao botao-contorno">
              <IconeInstagram className="w-[18px] h-[18px]" />
              Instagram
            </a>
          </div>
          <p className="mt-4 text-[13px] text-tinta-suave">No iFood, o pedido mínimo é de R$ 20,00.</p>
        </div>

        <img
          src={fotoSrc("power-red", 800)}
          alt=""
          loading="lazy"
          decoding="async"
          className="foto-prato pointer-events-none absolute -bottom-6 right-[-4%] w-[150px] md:w-auto md:h-[66%] md:right-[10%] md:-bottom-8 rotate-[12deg] origin-bottom"
        />
      </div>
    </section>
  );
}
