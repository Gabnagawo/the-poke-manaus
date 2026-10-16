"use client";

import { useCarrinho } from "@/lib/carrinho";
import { formatarPreco } from "@/lib/whatsapp";

interface StickyMobileCTAProps {
  onAbrirCarrinho: () => void;
  onAbrirMontagem?: () => void;
}

export function StickyMobileCTA({ onAbrirCarrinho, onAbrirMontagem }: StickyMobileCTAProps) {
  const { quantidadeTotal, total } = useCarrinho();

  return (
    <aside
      aria-label="Barra de pedido rápido"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 p-3 bg-[#FCF9F0]/95 backdrop-blur-md border-t border-[#0E2A38]/15 shadow-lg safe-area-bottom"
    >
      <div className="max-w-md mx-auto flex items-center justify-between gap-3">
        {quantidadeTotal > 0 ? (
          // Quando há itens no carrinho: botão de finalização com total ao vivo
          <button
            type="button"
            onClick={onAbrirCarrinho}
            className="w-full btn-limon !justify-between h-12 px-4 flex items-center shadow-md"
          >
            <div className="flex items-center space-x-2">
              <span className="bg-[#0E2A38] text-[#FCF9F0] text-xs font-black px-2 py-0.5 rounded-full shrink-0">
                {quantidadeTotal} {quantidadeTotal === 1 ? "item" : "itens"}
              </span>
              <span className="font-display font-extrabold text-[13px]">
                VER CARRINHO
              </span>
            </div>
            <span className="font-display font-extrabold text-[14px] tracking-tight shrink-0 pl-3">
              {formatarPreco(total)}
            </span>
          </button>
        ) : (
          // Quando o carrinho está vazio: CTA direto para ação com ícone SVG de traço
          <div className="w-full flex items-center gap-2">
            <button
              type="button"
              onClick={onAbrirMontagem}
              className="flex-1 btn-limon h-12 text-center text-[13px] font-bold"
            >
              MONTE SEU POKE →
            </button>
            <button
              type="button"
              onClick={onAbrirCarrinho}
              aria-label="Abrir sacola de pedidos"
              className="w-12 h-12 flex items-center justify-center border-2 border-[#0E2A38] rounded-[2px] text-[#0E2A38] hover:bg-[#0E2A38]/5 transition-colors shrink-0"
            >
              <svg
                className="w-5 h-5 text-[#0E2A38]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
