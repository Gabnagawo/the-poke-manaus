"use client";

// Cardápio completo, todas as categorias em sequência (como no iFood), com abas fixas que
// acompanham a rolagem. Celular: linhas compactas. Telas maiores: cards no molde Poke House.

import { useEffect, useRef, useState } from "react";
import { CATEGORIAS_CARDAPIO, type ItemCardapio } from "@/data/cardapio";
import { temReceita } from "@/data/montagem";
import { usePedido } from "@/lib/pedido";
import { formatarPreco } from "@/lib/whatsapp";
import { ehCopo, ehFotoInteira, fotoSrc, fotoSrcSet, PASTEL } from "@/lib/fotos";
import { irPara } from "@/lib/rolagem";
import { Contador } from "@/components/ui/Contador";
import { IconeMais, IconeSeta } from "@/components/ui/Icones";
import { Logo } from "@/components/ui/Logo";

const DOM_ID: Record<string, string> = {
  "monte-seu-poke": "monte-seu-poke",
  promocoes: "pokes-da-casa",
  sucos: "sucos",
  bebidas: "bebidas",
};

const NOME_ABA: Record<string, string> = {
  "monte-seu-poke": "Monte seu poke",
  promocoes: "Pokes da casa",
  sucos: "Sucos",
  bebidas: "Bebidas",
};

const GRADE: Record<string, string> = {
  "monte-seu-poke": "sm:grid-cols-2 md:grid-cols-3",
  promocoes: "sm:grid-cols-2 md:grid-cols-3",
  sucos: "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
};

const TAMANHO_POR_ID: Record<string, "P" | "M" | "G"> = { "poke-pequeno": "P", "poke-medio": "M", "poke-grande": "G" };

function Foto({ item, categoria }: { item: ItemCardapio; categoria: string }) {
  const slug = item.foto;
  const cor = PASTEL[categoria];
  return (
    <div
      className={`relative overflow-hidden ${cor} shrink-0 w-[96px] h-[96px] rounded-[14px] sm:w-full sm:h-auto sm:aspect-square sm:rounded-[18px]`}
    >
      {!slug ? (
        <Logo className="absolute inset-0 m-auto w-[62%] h-auto text-petroleo/25" titulo="" />
      ) : ehFotoInteira(slug) ? (
        <img
          src={fotoSrc(slug, 400)}
          srcSet={fotoSrcSet(slug)}
          sizes="(min-width: 640px) 300px, 96px"
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <img
          src={fotoSrc(slug, 400)}
          srcSet={fotoSrcSet(slug)}
          sizes="(min-width: 640px) 300px, 96px"
          alt=""
          loading="lazy"
          decoding="async"
          className={`foto-prato absolute transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] ${
            ehCopo(slug)
              ? "bottom-0 left-1/2 -translate-x-1/2 h-[88%] w-auto max-w-none"
              : "inset-0 m-auto w-[86%] h-[86%] sm:w-[80%] sm:h-[80%] object-contain"
          }`}
        />
      )}
    </div>
  );
}

function Item({ item, categoria }: { item: ItemCardapio; categoria: string }) {
  const { abrirMontagem, abrirReceita, adicionarItem, removerUmDoItem, quantidadeDoItem } = usePedido();
  const tamanho = TAMANHO_POR_ID[item.id];
  const montavel = !!tamanho || temReceita(item.id);
  const qtd = montavel ? 0 : quantidadeDoItem(item.id);

  const montar = () => (tamanho ? abrirMontagem(tamanho) : abrirReceita(item));

  return (
    <li className="group flex gap-4 py-4 border-b border-petroleo/10 sm:flex-col sm:gap-0 sm:py-0 sm:border-0">
      {montavel ? (
        <button type="button" onClick={montar} className="contents" aria-label={`Montar ${item.nome}`} tabIndex={-1}>
          <Foto item={item} categoria={categoria} />
        </button>
      ) : (
        <Foto item={item} categoria={categoria} />
      )}

      <div className="flex-1 min-w-0 flex flex-col sm:mt-5">
        <h4 className="text-[16px] sm:text-[19px] font-bold leading-[1.2] sm:uppercase sm:tracking-[-0.005em]">{item.nome}</h4>
        <p className="mt-1 sm:mt-2 text-[13.5px] sm:text-[15px] leading-[1.4] text-tinta-suave line-clamp-2 sm:line-clamp-3">
          {item.descricao}
        </p>
        <div className="mt-auto pt-2 sm:pt-4 flex items-center justify-between gap-3">
          <span className="text-[15px] sm:text-[17px] font-bold num">
            {formatarPreco(item.preco)}
          </span>

          {montavel ? (
            <button
              type="button"
              onClick={montar}
              className="botao botao-amarelo min-h-11 h-11 px-4 text-[12px] sm:text-[13px]"
              aria-label={`Montar ${item.nome}`}
            >
              Montar
              <IconeSeta className="w-3.5 h-3.5" />
            </button>
          ) : qtd > 0 ? (
            <Contador
              valor={qtd}
              rotulo={item.nome}
              onMais={() => adicionarItem(item)}
              onMenos={() => removerUmDoItem(item.id)}
              lixeiraNoUm
            />
          ) : (
            <button
              type="button"
              onClick={() => adicionarItem(item)}
              className="botao botao-amarelo min-h-11 h-11 w-11 px-0 sm:w-auto sm:px-4 text-[12px] sm:text-[13px]"
              aria-label={`Adicionar ${item.nome}`}
            >
              <span className="hidden sm:inline">Adicionar</span>
              <IconeMais />
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

function ItemLista({ item }: { item: ItemCardapio }) {
  const { adicionarItem, removerUmDoItem, quantidadeDoItem } = usePedido();
  const qtd = quantidadeDoItem(item.id);
  return (
    <li className="flex items-center gap-4 py-3.5 border-b border-petroleo/10 min-h-[72px]">
      <div className="flex-1 min-w-0">
        <h4 className="text-[16px] font-bold leading-tight">{item.nome}</h4>
        <p className="text-[13.5px] text-tinta-suave mt-0.5">{item.descricao}</p>
      </div>
      <span className="text-[15px] font-bold num">{formatarPreco(item.preco)}</span>
      {qtd > 0 ? (
        <Contador
          valor={qtd}
          rotulo={item.nome}
          onMais={() => adicionarItem(item)}
          onMenos={() => removerUmDoItem(item.id)}
          lixeiraNoUm
        />
      ) : (
        <button
          type="button"
          onClick={() => adicionarItem(item)}
          className="botao botao-amarelo min-h-11 h-11 w-11 px-0"
          aria-label={`Adicionar ${item.nome}`}
        >
          <IconeMais />
        </button>
      )}
    </li>
  );
}

export function Cardapio() {
  const [ativa, setAtiva] = useState(CATEGORIAS_CARDAPIO[0].id);
  const trilho = useRef<HTMLDivElement>(null);
  const abas = useRef<Record<string, HTMLButtonElement | null>>({});

  // Aba ativa conforme a rolagem
  useEffect(() => {
    let quadro = 0;
    const calcular = () => {
      quadro = 0;
      const topo = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--altura-topo")) || 64;
      const linha = topo + 52 + 24;
      let atual = CATEGORIAS_CARDAPIO[0].id;
      for (const c of CATEGORIAS_CARDAPIO) {
        const el = document.getElementById(DOM_ID[c.id]);
        if (el && el.getBoundingClientRect().top <= linha) atual = c.id;
      }
      setAtiva((a) => (a === atual ? a : atual));
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(calcular);
    };
    calcular();
    window.addEventListener("scroll", aoRolar, { passive: true });
    window.addEventListener("resize", aoRolar);
    return () => {
      window.removeEventListener("scroll", aoRolar);
      window.removeEventListener("resize", aoRolar);
      if (quadro) cancelAnimationFrame(quadro);
    };
  }, []);

  // Mantém a aba ativa visível na barra (só rolagem horizontal da barra)
  useEffect(() => {
    const aba = abas.current[ativa];
    const t = trilho.current;
    if (!aba || !t) return;
    const alvo = aba.offsetLeft - (t.clientWidth - aba.offsetWidth) / 2;
    t.scrollTo({ left: Math.max(0, alvo), behavior: "smooth" });
  }, [ativa]);

  return (
    <section id="cardapio" className="pb-20 md:pb-28" aria-labelledby="titulo-cardapio">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8 pt-4 md:pt-8 revelar">
        <h2 id="titulo-cardapio" className="titulo text-[40px] md:text-[64px]">
          Cardápio
        </h2>
        <p className="mt-3 max-w-[560px] text-[16px] md:text-[18px] leading-[1.45] text-tinta-suave">
          Monte a sacola aqui e envie o pedido pelo WhatsApp. Se preferir, a loja também está no iFood.
        </p>
      </div>

      {/* Abas fixas */}
      <div className="sticky top-[var(--altura-topo)] z-20 bg-creme mt-6 md:mt-10 border-b border-petroleo/12">
        <div
          ref={trilho}
          className="sem-barra mx-auto max-w-[1240px] px-3 md:px-6 h-[52px] flex items-stretch gap-1 overflow-x-auto"
          role="tablist"
          aria-label="Categorias do cardápio"
        >
          {CATEGORIAS_CARDAPIO.map((c) => {
            const sel = ativa === c.id;
            return (
              <button
                key={c.id}
                ref={(el) => {
                  abas.current[c.id] = el;
                }}
                type="button"
                role="tab"
                aria-selected={sel}
                onClick={() => irPara(DOM_ID[c.id])}
                className={`relative shrink-0 px-3 md:px-4 text-[13px] md:text-[14px] font-bold uppercase tracking-[0.07em] whitespace-nowrap transition-colors ${
                  sel ? "text-petroleo" : "text-tinta-suave hover:text-petroleo"
                }`}
              >
                {NOME_ABA[c.id]}
                <span
                  className={`absolute left-3 right-3 md:left-4 md:right-4 bottom-0 h-[3px] rounded-full bg-petroleo transition-transform duration-300 origin-left ${
                    sel ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </button>
            );
          })}
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        {CATEGORIAS_CARDAPIO.map((c) => (
          <div key={c.id} id={DOM_ID[c.id]} className="pt-10 md:pt-16">
            <div className="md:flex md:items-baseline md:justify-between md:gap-8 mb-2 sm:mb-8">
              <h3 className="titulo text-[28px] md:text-[40px]">{c.titulo}</h3>
              <p className="mt-2 md:mt-0 text-[15px] md:text-[16px] text-tinta-suave">{c.subtitulo}</p>
            </div>
            {c.id === "bebidas" ? (
              <ul className="sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-10">
                {c.itens.map((item) => (
                  <ItemLista key={item.id} item={item} />
                ))}
              </ul>
            ) : (
              <ul className={`sm:grid sm:gap-x-6 sm:gap-y-12 lg:gap-x-8 ${GRADE[c.id]}`}>
                {c.itens.map((item) => (
                  <Item key={item.id} item={item} categoria={c.id} />
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
