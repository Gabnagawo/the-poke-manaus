// "Our concept" da Honi Poke: foto de cantos arredondados à esquerda, texto à direita,
// "como funciona" em prosa e a frase manuscrita no fim.

import { LOJA } from "@/lib/loja";
import { dimensoes, fotoSrc, fotoSrcSet } from "@/lib/fotos";
import { IconeInstagram } from "@/components/ui/Icones";

export function ALoja() {
  return (
    <section id="a-loja" className="bg-superficie" aria-labelledby="titulo-loja">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8 py-16 md:py-28 grid md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div
          className="revelar relative aspect-[4/5] md:aspect-[5/6] rounded-[22px] bg-mar overflow-hidden md:order-1"
          style={{ "--atraso": "120ms" } as React.CSSProperties}
        >
          <img
            src={fotoSrc("poke-makaha", 400)}
            srcSet={fotoSrcSet("poke-makaha")}
            {...dimensoes("poke-makaha")}
            sizes="(min-width: 768px) 34vw, 70vw"
            alt="Poke Makaha"
            loading="lazy"
            decoding="async"
            className="foto-prato absolute left-[7%] top-[10%] w-[74%] h-auto"
          />
          <img
            src={fotoSrc("guaraflow", 400)}
            srcSet={fotoSrcSet("guaraflow")}
            {...dimensoes("guaraflow")}
            sizes="(min-width: 768px) 16vw, 32vw"
            alt="Suco Guaraflow"
            loading="lazy"
            decoding="async"
            className="foto-prato absolute right-[6%] bottom-0 h-[56%] w-auto"
          />
        </div>

        <div className="revelar md:order-2">
          <h2 id="titulo-loja" className="titulo text-[36px] md:text-[52px]">
            A primeira The Poke do Norte
          </h2>
          <p className="mt-6 text-[17px] md:text-[20px] leading-[1.5]">
            A rede The Poke nasceu em {LOJA.fundacaoRede}. A loja de Manaus abriu em {LOJA.inauguracao}, no {LOJA.local}, bairro{" "}
            {LOJA.bairro}, e é a primeira da marca na Região Norte.
          </p>
          <p className="mt-6 text-[15px] font-bold uppercase tracking-[0.06em] text-amarelo">Como funciona</p>
          <p className="mt-2 text-[16px] md:text-[18px] leading-[1.5] text-tinta-suave">
            Escolha o tamanho e monte etapa por etapa, ou peça uma receita da casa. Envie o pedido pelo WhatsApp e retire no balcão ou
            receba em casa.
          </p>
          <p className="letreiro mt-8 text-[38px] md:text-[48px] text-amarelo -rotate-[4deg] origin-left inline-block">
            Do seu jeito!
          </p>
          <div className="mt-8">
            <a href={LOJA.instagram} target="_blank" rel="noopener noreferrer" className="botao botao-contorno">
              <IconeInstagram className="w-[18px] h-[18px]" />
              {LOJA.instagramHandle}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
