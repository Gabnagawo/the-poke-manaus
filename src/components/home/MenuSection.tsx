"use client";

import { useState } from "react";
import Image from "next/image";
import { CATEGORIAS_CARDAPIO, ItemCardapio } from "@/data/cardapio";
import { formatarPreco } from "@/lib/whatsapp";
import { useCarrinho } from "@/lib/carrinho";

interface MenuSectionProps {
  categoriaAtiva: "monte-seu-poke" | "promocoes" | "sucos" | "bebidas";
  onMudarCategoria: (categoriaId: "monte-seu-poke" | "promocoes" | "sucos" | "bebidas") => void;
  onAbrirMontagemComTamanho: (tamanho: "P" | "M" | "G") => void;
}

// Tons pastéis da Limón para alternar nos fundos dos cards
const TONS_PASTEL = ["bg-[#E5D3BA]", "bg-[#DEB8A3]", "bg-[#D9C3CE]", "bg-[#DBE2DC]"];

export function MenuSection({
  categoriaAtiva,
  onMudarCategoria,
  onAbrirMontagemComTamanho,
}: MenuSectionProps) {
  const { adicionarAoCarrinho } = useCarrinho();
  const [itemAdicionadoId, setItemAdicionadoId] = useState<string | null>(null);

  const handleAdicionarDireto = (item: ItemCardapio) => {
    adicionarAoCarrinho(item, 1);
    setItemAdicionadoId(item.id);
    setTimeout(() => {
      setItemAdicionadoId(null);
    }, 1200);
  };

  const categoriaAtual =
    CATEGORIAS_CARDAPIO.find((c) => c.id === categoriaAtiva) || CATEGORIAS_CARDAPIO[0];

  return (
    <section id="cardapio" className="w-full bg-[#FCF9F0] py-16 md:py-24 border-b border-[#0E2A38]/10">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* Cabeçalho da Seção sem etiquetas de IA */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-3">
          <h2 className="font-display font-black text-4xl sm:text-5xl text-[#0E2A38] leading-display tracking-tight">
            CARDÁPIO
          </h2>
          <p className="text-sm sm:text-base text-[#59655D]">
            Pokes montados na hora, receitas da casa e sucos naturais.
          </p>
        </div>

        {/* Abas de Categorias no Estilo Limón (grudadas no topo abaixo do cabeçalho) */}
        <div className="sticky top-[80px] md:top-[96px] z-30 bg-[#FCF9F0]/95 backdrop-blur-md pt-2 pb-1 border-b border-[#0E2A38]/15 mb-6 sm:mb-12 -mx-4 px-4 sm:-mx-6 sm:px-6">
          <div className="flex items-center justify-start sm:justify-center overflow-x-auto scrollbar-hide gap-1 sm:gap-6">
            {CATEGORIAS_CARDAPIO.map((cat) => {
              const ativa = cat.id === categoriaAtiva;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onMudarCategoria(cat.id)}
                  className={`min-h-[44px] px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-display font-bold uppercase tracking-wider whitespace-nowrap transition-all border-b-2 -mb-[2px] ${
                    ativa
                      ? "border-[#0E2A38] text-[#0E2A38]"
                      : "border-transparent text-[#59655D] hover:text-[#0E2A38]"
                  }`}
                >
                  {cat.titulo}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grade de Itens: Linhas compactas no celular (< 640px) / Grade Limón no Tablet e Desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-10">
          {categoriaAtual.itens.map((item, index) => {
            const isRecemAdicionado = itemAdicionadoId === item.id;
            const isMonteSeuPoke = item.categoria === "monte-seu-poke";
            const corPastel = TONS_PASTEL[index % TONS_PASTEL.length];
            const isTiltLeft = index % 2 === 0;
            const isLaranja = item.id === "suco-laranja" || (item.imagem && item.imagem.includes("laranja"));

            return (
              <div key={item.id}>
                {/* -------------------------------------------------------- */}
                {/* Visual Mobile (< 640px): Linha Compacta (~110-120px)      */}
                {/* -------------------------------------------------------- */}
                <div className="flex sm:hidden items-center gap-3 p-2.5 bg-white rounded-[1px] border border-[#0E2A38]/10 shadow-[0_1px_3px_rgba(0,0,0,0.03)] min-h-[112px]">
                  {/* Quadrado Pastel à esquerda (92x92px) */}
                  <div
                    className={`relative w-[92px] h-[92px] shrink-0 ${corPastel} rounded-[1px] p-2 flex items-center justify-center overflow-hidden`}
                  >
                    {item.destaque && (
                      <span className="absolute top-1 left-1 bg-[#F7EA48] text-[#0E2A38] font-display font-bold text-[9px] px-1.5 py-0.5 rounded-[1px] z-10 leading-none">
                        Destaque
                      </span>
                    )}

                    {item.imagem ? (
                      isLaranja ? (
                        <div className="relative w-full h-full rounded-[1px] overflow-hidden">
                          <Image
                            src={item.imagem}
                            alt={item.nome}
                            fill
                            sizes="92px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div className="relative w-full h-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.12)]">
                          <Image
                            src={item.imagem}
                            alt={item.nome}
                            fill
                            sizes="92px"
                            className="object-contain"
                          />
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-center text-[#0E2A38]/30">
                        <svg
                          className="w-8 h-8"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M4 11h16a1 1 0 0 1 1 1c0 5-4.5 9-9 9s-9-4-9-9a1 1 0 0 1 1-1Z" />
                          <path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Conteúdo Central: Nome, Descrição (2 linhas) e Preço */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between h-[92px] py-0.5">
                    <div>
                      <h3 className="font-display font-black text-[15px] text-[#0E2A38] leading-snug line-clamp-1">
                        {item.nome}
                      </h3>
                      <p className="text-[11px] text-[#59655D] leading-snug line-clamp-2 mt-1">
                        {item.descricao}
                      </p>
                    </div>

                    <div className="font-display font-black text-xs text-[#0E2A38] pt-1">
                      {formatarPreco(item.preco)}
                    </div>
                  </div>

                  {/* Botão + com toque mínimo de 44px à direita */}
                  <div className="shrink-0 pl-1">
                    {isMonteSeuPoke ? (
                      <button
                        type="button"
                        onClick={() =>
                          onAbrirMontagemComTamanho(
                            (item.tamanho as "P" | "M" | "G") || "M"
                          )
                        }
                        aria-label={`Montar ${item.nome}`}
                        className="w-11 h-11 rounded-full bg-[#F7EA48] text-[#0E2A38] font-display font-black text-xl flex items-center justify-center active:scale-95 transition-transform shadow-xs"
                      >
                        +
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleAdicionarDireto(item)}
                        aria-label={`Adicionar ${item.nome}`}
                        className={`w-11 h-11 rounded-full font-display font-black text-xl flex items-center justify-center active:scale-95 transition-transform shadow-xs ${
                          isRecemAdicionado
                            ? "bg-[#103B15] text-[#FCF9F0] text-sm"
                            : "bg-[#F7EA48] text-[#0E2A38]"
                        }`}
                      >
                        {isRecemAdicionado ? "✓" : "+"}
                      </button>
                    )}
                  </div>
                </div>

                {/* -------------------------------------------------------- */}
                {/* Visual Tablet & Desktop (>= 640px): Grade Limón Original */}
                {/* -------------------------------------------------------- */}
                <div className="hidden sm:flex flex-col space-y-4 group">
                  {/* Quadrado Pastel com a Foto */}
                  <div
                    className={`relative aspect-square ${corPastel} rounded-[1px] p-6 sm:p-7 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]`}
                  >
                    {item.destaque && (
                      <span className="absolute top-4 left-4 bg-[#F7EA48] text-[#0E2A38] font-display font-bold text-xs px-2.5 py-0.5 rounded-[1px] z-10">
                        Destaque
                      </span>
                    )}

                    {item.imagem ? (
                      isLaranja ? (
                        /* Foto original de laranja em quadrado sem corte transparente */
                        <div className="relative w-full h-full rounded-[1px] overflow-hidden">
                          <Image
                            src={item.imagem}
                            alt={item.nome}
                            fill
                            sizes="(max-width: 1024px) 50vw, 360px"
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        /* Tigela ou copo recortado com sombra de contato suave */
                        <div className="relative w-full h-full drop-shadow-[0_14px_20px_rgba(0,0,0,0.13)]">
                          <Image
                            src={item.imagem}
                            alt={item.nome}
                            fill
                            sizes="(max-width: 1024px) 50vw, 360px"
                            className="object-contain"
                          />
                        </div>
                      )
                    ) : (
                      <div className="flex items-center justify-center text-[#0E2A38]/30">
                        <svg
                          className="w-12 h-12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M4 11h16a1 1 0 0 1 1 1c0 5-4.5 9-9 9s-9-4-9-9a1 1 0 0 1 1-1Z" />
                          <path d="M7 11V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Conteúdo Textual no Molde Limón */}
                  <div className="flex-1 flex flex-col justify-between space-y-3 pt-1">
                    <div>
                      {/* Título em Caixa Alta Levemente Girado (±4°) */}
                      <h3
                        className={`font-display font-black text-xl sm:text-2xl text-[#0E2A38] tracking-tight ${
                          isTiltLeft ? "tilt-card-left" : "tilt-card-right"
                        }`}
                      >
                        {item.nome}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#59655D] leading-relaxed pt-2">
                        {item.descricao}
                      </p>
                    </div>

                    {/* Linha de Preço e Link de Texto */}
                    <div className="pt-2 border-t border-[#0E2A38]/10 flex items-center justify-between">
                      <span className="font-display font-extrabold text-sm sm:text-base text-[#0E2A38]">
                        {formatarPreco(item.preco)}
                      </span>

                      {isMonteSeuPoke ? (
                        <button
                          type="button"
                          onClick={() =>
                            onAbrirMontagemComTamanho(
                              (item.tamanho as "P" | "M" | "G") || "M"
                            )
                          }
                          className="text-xs font-display font-extrabold uppercase tracking-wider text-[#0E2A38] hover:text-[#2A7CA1] flex items-center space-x-1.5 transition-colors py-1"
                        >
                          <span>Montar</span>
                          <span>→</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAdicionarDireto(item)}
                          className={`text-xs font-display font-extrabold uppercase tracking-wider flex items-center space-x-1.5 transition-colors py-1 ${
                            isRecemAdicionado
                              ? "text-[#103B15]"
                              : "text-[#0E2A38] hover:text-[#2A7CA1]"
                          }`}
                        >
                          <span>{isRecemAdicionado ? "✓ Adicionado" : "Adicionar"}</span>
                          {!isRecemAdicionado && <span>→</span>}
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
