// "A loja": texto curto com os fatos do briefing + foto de produto num quadro terracota
// (como o "HEALTHY FAST FOOD ON THE GO" da limon.no).

import { LOJA } from "@/lib/loja";
import { fotoSrc } from "@/lib/fotos";
import { IconeInstagram } from "@/components/ui/Icones";

export function ALoja() {
  return (
    <section id="a-loja" className="bg-creme-2/60 border-y border-petroleo/8" aria-labelledby="titulo-loja">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8 py-16 md:py-28 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="revelar">
          <h2 id="titulo-loja" className="titulo text-[40px] md:text-[60px]">
            A primeira The Poke do Norte
          </h2>
          <p className="mt-6 text-[18px] md:text-[22px] font-light leading-[1.45]">
            A rede The Poke nasceu em {LOJA.fundacaoRede}. A loja de Manaus abriu em {LOJA.inauguracao}, no {LOJA.local},
            bairro {LOJA.bairro}, e é a primeira da marca na Região Norte.
          </p>
          <p className="mt-4 text-[16px] md:text-[18px] leading-[1.5] text-tinta-suave">
            Você monta a tigela do seu jeito ou escolhe uma receita da casa. Dá para retirar no balcão ou receber em casa.
          </p>
          <a
            href={LOJA.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="botao botao-contorno mt-8"
          >
            <IconeInstagram className="w-[18px] h-[18px]" />
            {LOJA.instagramHandle}
          </a>
        </div>

        <div className="revelar relative aspect-[5/4] rounded-[22px] bg-[#c97b5b] overflow-hidden" style={{ "--atraso": "200ms" } as React.CSSProperties}>
          <img
            src={fotoSrc("poke-makaha", 800)}
            alt="Poke Makaha"
            loading="lazy"
            decoding="async"
            className="foto-prato absolute left-[6%] top-[12%] w-[62%] h-auto"
          />
          <img
            src={fotoSrc("guaraflow", 800)}
            alt="Suco Guaraflow"
            loading="lazy"
            decoding="async"
            className="foto-prato absolute right-[7%] bottom-0 h-[78%] w-auto"
          />
        </div>
      </div>
    </section>
  );
}
