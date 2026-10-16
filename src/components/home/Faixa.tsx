// Faixa com o slogan correndo, como a "FRESHLY MADE TO BRIGHTEN YOUR DAY" da Poke House.
// Só usa transform (barata para o celular) e para quando o sistema pede menos movimento.

import { Fragment } from "react";
import { Logo } from "@/components/ui/Logo";

const FRASES = ["Rápido, saboroso & nutritivo", "Monte seu poke", "Park Mall Ephigênio", "Todos os dias, das 11h às 23h"];

function Trecho() {
  return (
    <div className="flex shrink-0 items-center">
      {FRASES.map((f) => (
        <Fragment key={f}>
          <span className="px-6 md:px-8 whitespace-nowrap">{f}</span>
          <Logo className="h-[14px] md:h-[16px] w-auto text-creme/80 shrink-0" titulo="" />
        </Fragment>
      ))}
    </div>
  );
}

export function Faixa() {
  return (
    <div className="relative overflow-hidden bg-petroleo text-amarelo h-11 lg:h-[52px] flex items-center select-none">
      <p className="sr-only">{FRASES.join(". ")}.</p>
      <div className="faixa-trilho flex w-max text-[13px] md:text-[15px] font-bold uppercase tracking-[0.1em]" aria-hidden>
        <Trecho />
        <Trecho />
      </div>
    </div>
  );
}
