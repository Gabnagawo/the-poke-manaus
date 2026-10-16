"use client";

// "Explore our menu" da Honi Poke: título e texto centralizados, fotos de cantos arredondados
// e só o nome da categoria com a seta embaixo. Celular: uma larga e duas lado a lado.

import { aoClicarAncora } from "@/lib/rolagem";
import { dimensoes, fotoSrc, fotoSrcSet } from "@/lib/fotos";
import { IconeSeta } from "@/components/ui/Icones";
import { Logo } from "@/components/ui/Logo";

const CARDS = [
  { id: "monte-seu-poke", titulo: "Monte seu poke", foto: "poke-grande", cor: "bg-mar", copo: false },
  { id: "pokes-da-casa", titulo: "Pokes da casa", foto: "poke-makaha", cor: "bg-[#2f86ad]", copo: false },
  { id: "sucos", titulo: "Sucos especiais", foto: "move-on", cor: "bg-[#1f6386]", copo: true },
];

export function Destaques() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 md:px-8 pt-16 pb-14 md:pt-28 md:pb-24" aria-labelledby="titulo-destaques">
      <div className="revelar mx-auto max-w-[620px] text-center mb-10 md:mb-14">
        <Logo className="mx-auto h-[18px] w-auto text-amarelo" titulo="" />
        <h2 id="titulo-destaques" className="titulo mt-5 text-[36px] md:text-[56px]">
          Nosso cardápio
        </h2>
        <p className="mt-4 text-[16px] md:text-[18px] leading-[1.5] text-tinta-suave">
          Monte o poke do seu jeito, escolha uma receita da casa e leve um suco especial junto. Para retirar no balcão ou
          receber em casa.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6">
        {CARDS.map((c, i) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            onClick={(e) => aoClicarAncora(e, c.id)}
            className={`group revelar block ${i === 0 ? "col-span-2 md:col-span-1" : ""}`}
            style={{ "--atraso": `${i * 120}ms` } as React.CSSProperties}
          >
            <div
              className={`relative overflow-hidden rounded-[16px] ${c.cor} ${
                i === 0 ? "aspect-[16/10] md:aspect-[4/5]" : "aspect-square md:aspect-[4/5]"
              }`}
            >
              <img
                src={fotoSrc(c.foto, 800)}
                srcSet={fotoSrcSet(c.foto)}
                {...dimensoes(c.foto)}
                sizes={i === 0 ? "(min-width: 768px) 30vw, 90vw" : "(min-width: 768px) 30vw, 45vw"}
                alt=""
                loading="lazy"
                decoding="async"
                className={`foto-prato absolute transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.05] ${
                  c.copo ? "bottom-0 left-1/2 -translate-x-1/2 h-[86%] w-auto" : "inset-0 m-auto w-[82%] h-[82%] object-contain"
                }`}
              />
            </div>
            <span className="mt-4 inline-flex items-center gap-2 min-h-11 text-[15px] md:text-[17px] font-extrabold uppercase tracking-[0.02em]">
              {c.titulo}
              <IconeSeta className="w-4 h-4 text-amarelo transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
