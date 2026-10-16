"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LOJA } from "@/lib/loja";
import { useCarrinho } from "@/lib/carrinho";

interface HeaderProps {
  onAbrirCarrinho: () => void;
  onAbrirMontagem?: () => void;
}

export function Header({ onAbrirCarrinho, onAbrirMontagem }: HeaderProps) {
  const [menuAberto, setMenuAberto] = useState(false);
  const { quantidadeTotal, total } = useCarrinho();

  const toggleMenu = () => setMenuAberto(!menuAberto);
  const fecharMenu = () => setMenuAberto(false);

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FCF9F0] border-b border-[#0E2A38]/10 transition-colors">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 h-[80px] md:h-[96px] flex items-center justify-between">
          
          {/* Lado Esquerdo (Desktop: Navegação / Mobile: Hambúrguer) */}
          <div className="flex items-center">
            {/* Mobile: Botão Hambúrguer (alvo de toque mínimo 44x44px) */}
            <button
              type="button"
              onClick={toggleMenu}
              aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuAberto}
              className="md:hidden flex flex-col justify-center items-center w-11 h-11 -ml-2 text-[#0E2A38] focus:outline-none"
            >
              <span className="w-6 h-0.5 bg-[#0E2A38] block mb-1.5 transition-transform duration-200" />
              <span className="w-6 h-0.5 bg-[#0E2A38] block mb-1.5 transition-opacity duration-200" />
              <span className="w-6 h-0.5 bg-[#0E2A38] block transition-transform duration-200" />
            </button>

            {/* Desktop: Links de Navegação */}
            <nav className="hidden md:flex items-center space-x-6 text-[13px] font-bold tracking-wider uppercase font-display text-[#0E2A38]">
              <button
                type="button"
                onClick={onAbrirMontagem}
                className="hover:text-[#2A7CA1] transition-colors py-2 cursor-pointer"
              >
                Monte seu Poke
              </button>
              <a
                href="#cardapio"
                className="hover:text-[#2A7CA1] transition-colors py-2"
              >
                Cardápio
              </a>
              <a
                href="#sobre"
                className="hover:text-[#2A7CA1] transition-colors py-2"
              >
                Sobre
              </a>
              <a
                href="#horarios"
                className="hover:text-[#2A7CA1] transition-colors py-2"
              >
                Horários
              </a>
            </nav>
          </div>

          {/* Centro: Logo The Poke */}
          <div className="flex-1 flex justify-center md:flex-initial">
            <Link
              href="/"
              className="flex items-center space-x-2.5 py-1 focus:outline-none"
              aria-label="The Poke Manaus - Início"
            >
              <div className="relative w-11 h-11 md:w-12 md:h-12 flex-shrink-0">
                <Image
                  src="/images/logo/logo.webp"
                  alt="The Poke"
                  fill
                  sizes="(max-width: 768px) 44px, 48px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display font-extrabold text-[17px] md:text-[19px] leading-tight tracking-tight text-[#0E2A38]">
                  THE POKE
                </span>
                <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-[#2A7CA1]">
                  Manaus · Park Mall
                </span>
              </div>
            </Link>
          </div>

          {/* Lado Direito: Ações (Instagram + Carrinho) */}
          <div className="flex items-center space-x-3">
            <a
              href={LOJA.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram @thepokemanaus"
              className="hidden lg:inline-flex text-[12px] font-bold uppercase tracking-wider text-[#0E2A38] hover:text-[#2A7CA1] transition-colors pr-2"
            >
              Instagram
            </a>

            {/* Botão de Carrinho no estilo Limón */}
            <button
              type="button"
              onClick={onAbrirCarrinho}
              aria-label={`Abrir carrinho com ${quantidadeTotal} itens`}
              className="btn-limon px-3 sm:px-5 py-2 text-[13px] md:text-[14px] shadow-sm flex items-center space-x-2"
            >
              <span className="font-display font-bold">
                {quantidadeTotal > 0 ? "PEDIDO" : "CARRINHO"}
              </span>
              {quantidadeTotal > 0 && (
                <span className="inline-flex items-center justify-center bg-[#0E2A38] text-[#FCF9F0] text-[11px] font-black w-5 h-5 rounded-full ml-1">
                  {quantidadeTotal}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menu Gaveta Mobile em Tela Cheia (Estilo Limón: fundo verde-sálvia #DBE2DC) */}
      {menuAberto && (
        <div
          className="fixed inset-0 z-50 bg-[#DBE2DC] flex flex-col justify-between p-6 md:hidden animate-in fade-in duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Menu de navegação"
        >
          {/* Topo da Gaveta com Botão Fechar */}
          <div className="flex items-center justify-between border-b border-[#0E2A38]/15 pb-4">
            <div className="flex items-center space-x-2">
              <div className="relative w-9 h-9">
                <Image
                  src="/images/logo/logo.webp"
                  alt="The Poke"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-display font-bold text-[#0E2A38] text-base">
                THE POKE MANAUS
              </span>
            </div>
            <button
              type="button"
              onClick={fecharMenu}
              aria-label="Fechar menu"
              className="w-11 h-11 flex items-center justify-center text-[#0E2A38] text-2xl font-bold rounded"
            >
              ✕
            </button>
          </div>

          {/* Links Principais Mobile (alvo >= 44px) */}
          <nav className="flex flex-col space-y-4 my-auto py-6">
            <button
              type="button"
              onClick={() => {
                fecharMenu();
                onAbrirMontagem?.();
              }}
              className="text-left font-display font-extrabold text-3xl text-[#0E2A38] hover:text-[#2A7CA1] transition-colors py-2 border-b border-[#0E2A38]/10 cursor-pointer"
            >
              Monte seu Poke
            </button>
            <a
              href="#cardapio"
              onClick={fecharMenu}
              className="font-display font-extrabold text-3xl text-[#0E2A38] hover:text-[#2A7CA1] transition-colors py-2 border-b border-[#0E2A38]/10"
            >
              Cardápio Completo
            </a>
            <a
              href="#sobre"
              onClick={fecharMenu}
              className="font-display font-extrabold text-3xl text-[#0E2A38] hover:text-[#2A7CA1] transition-colors py-2 border-b border-[#0E2A38]/10"
            >
              Sobre a The Poke
            </a>
            <a
              href="#horarios"
              onClick={fecharMenu}
              className="font-display font-extrabold text-3xl text-[#0E2A38] hover:text-[#2A7CA1] transition-colors py-2 border-b border-[#0E2A38]/10"
            >
              Horários & Local
            </a>
            <a
              href={LOJA.linkIfood}
              target="_blank"
              rel="noopener noreferrer"
              onClick={fecharMenu}
              className="font-display font-bold text-xl text-[#2A7CA1] hover:underline pt-2"
            >
              Pedir no iFood ↗
            </a>
          </nav>

          {/* Rodapé da Gaveta Mobile */}
          <div className="pt-4 border-t border-[#0E2A38]/15 text-sm text-[#0E2A38]/80 space-y-2">
            <p className="font-semibold">{LOJA.enderecoLinha}</p>
            <p>{LOJA.horario}</p>
            <div className="pt-2">
              <a
                href={LOJA.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display font-bold text-xs uppercase tracking-wider text-[#0E2A38] inline-block py-1"
              >
                Instagram {LOJA.instagramHandle} ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
