"use client";

// Três cards de categoria (limon.no): quadro pastel com o prato recortado e título levemente
// inclinado. No celular: o primeiro largo e os outros dois lado a lado (grade da Honi Poke).

import { aoClicarAncora } from "@/lib/rolagem";
import { formatarPreco } from "@/lib/whatsapp";
import { fotoSrc, fotoSrcSet } from "@/lib/fotos";
import { IconeSeta } from "@/components/ui/Icones";

const CARDS = [
  {
    id: "monte-seu-poke",
    titulo: "Monte seu poke",
    texto: "Escolha o tamanho, a base, as proteínas, os molhos e o resto, etapa por etapa.",
    preco: `a partir de ${formatarPreco(59.9)}`,
    foto: "poke-grande",
    cor: "bg-areia",
    giro: "-rotate-[5deg]",
    copo: false,
  },
  {
    id: "pokes-da-casa",
    titulo: "Pokes da casa",
    texto: "Makaha com pasta de salmão, frango grelhado nos três tamanhos e frango teriyaki.",
    preco: `a partir de ${formatarPreco(44.9)}`,
    foto: "poke-makaha",
    cor: "bg-pessego",
    giro: "rotate-[4deg]",
    copo: false,
  },
  {
    id: "sucos",
    titulo: "Sucos especiais",
    texto: "Guaraflow, Anti-Ox, Move On com açaí e morango, Reset Green e outros.",
    preco: `${formatarPreco(19.9)} a ${formatarPreco(28.9)}`,
    foto: "move-on",
    cor: "bg-lavanda",
    giro: "-rotate-[4deg]",
    copo: true,
  },
];

export function Destaques() {
  return (
    <section className="mx-auto max-w-[1240px] px-5 md:px-8 pt-16 pb-14 md:pt-28 md:pb-24" aria-labelledby="titulo-destaques">
      <div className="revelar md:flex md:items-end md:justify-between md:gap-10 mb-8 md:mb-14">
        <h2 id="titulo-destaques" className="titulo text-[40px] md:text-[64px]">
          Pokes &amp; sucos
        </h2>
        <p className="mt-3 md:mt-0 max-w-[440px] text-[17px] md:text-[19px] leading-[1.45] text-tinta-suave">
          Monte do seu jeito, peça uma receita da casa e leve um suco especial junto.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-9 md:gap-x-8">
        {CARDS.map((c, i) => (
          <a
            key={c.id}
            href={`#${c.id}`}
            onClick={(e) => aoClicarAncora(e, c.id)}
            className={`group revelar block ${i === 0 ? "col-span-2 md:col-span-1" : ""}`}
            style={{ "--atraso": `${[0, 200, 400][i]}ms` } as React.CSSProperties}
          >
            <div
              className={`relative overflow-hidden rounded-[16px] ${c.cor} ${
                i === 0 ? "aspect-[16/10] md:aspect-square" : "aspect-square"
              }`}
            >
              <img
                src={fotoSrc(c.foto, 800)}
                srcSet={fotoSrcSet(c.foto)}
                sizes={i === 0 ? "(min-width: 768px) 30vw, 90vw" : "(min-width: 768px) 30vw, 45vw"}
                alt=""
                loading="lazy"
                decoding="async"
                className={`foto-prato absolute transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${
                  c.copo
                    ? "bottom-0 left-1/2 -translate-x-1/2 h-[86%] w-auto"
                    : "inset-0 m-auto w-[78%] h-[78%] object-contain"
                }`}
              />
            </div>
            <h3 className={`titulo mt-5 md:mt-7 text-[22px] md:text-[32px] origin-left inline-block ${c.giro}`}>{c.titulo}</h3>
            <p className="mt-3 text-[14px] md:text-[17px] leading-[1.45] text-tinta-suave hidden sm:block md:pr-6">{c.texto}</p>
            <p className="mt-2 md:mt-3 text-[13px] md:text-[14px] font-medium text-tinta-suave num">{c.preco}</p>
            <span className="link-seta mt-1 text-[12px] md:text-[13px]">
              Pedir
              <IconeSeta />
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
