"use client";

// Celular: barra fixa da sacola, só quando há itens (como iFood e Poke House).
// O aviso de "adicionado" aparece dentro da própria barra, sem pop-up por cima.
// Desktop: o aviso aparece no canto, com atalho para a sacola.

import { useEffect, useState } from "react";
import { usePedido } from "@/lib/pedido";
import { formatarPreco } from "@/lib/whatsapp";
import { IconeCheck, IconeSacola } from "@/components/ui/Icones";

export function BarraSacola() {
  const { quantidadeTotal, subtotal, abrirSacola, sacolaAberta, montagem, aviso, pronta } = usePedido();
  const [pulando, setPulando] = useState(false);

  useEffect(() => {
    if (!aviso) return;
    setPulando(true);
    const t = setTimeout(() => setPulando(false), 400);
    return () => clearTimeout(t);
  }, [aviso]);

  const algoAberto = sacolaAberta || !!montagem?.aberta;
  const visivel = pronta && quantidadeTotal > 0 && !algoAberto;

  return (
    <>
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-30 px-3 pt-2 pb-[max(10px,env(safe-area-inset-bottom))] transition-[translate,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          visivel ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 pointer-events-none"
        }`}
        aria-hidden={!visivel}
      >
        <button
          type="button"
          onClick={abrirSacola}
          tabIndex={visivel ? 0 : -1}
          className="w-full h-14 rounded-full bg-amarelo text-tinta-escura flex items-center gap-3 pl-2 pr-5 shadow-[0_8px_24px_rgb(2_20_34/0.45)] active:scale-[0.98] transition-transform"
          aria-label={`Ver sacola: ${quantidadeTotal} ${quantidadeTotal === 1 ? "item" : "itens"}, ${formatarPreco(subtotal)}`}
        >
          <span className={`relative grid place-items-center w-10 h-10 rounded-full bg-tinta-escura text-amarelo ${pulando ? "pulo" : ""}`}>
            <IconeSacola className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 min-w-5 h-5 px-1 rounded-full bg-petroleo text-tinta-escura text-[11px] font-bold grid place-items-center num">
              {quantidadeTotal}
            </span>
          </span>
          <span className="flex-1 text-left text-[14px] font-bold uppercase tracking-[0.06em] truncate" aria-live="polite">
            {aviso ? (
              <span className="inline-flex items-center gap-1.5 normal-case tracking-normal font-medium text-[15px]">
                <IconeCheck className="w-4 h-4" />
                {aviso.texto}
              </span>
            ) : (
              "Ver sacola"
            )}
          </span>
          <span className="text-[15px] font-bold num">{formatarPreco(subtotal)}</span>
        </button>
      </div>

      {/* Desktop: aviso no canto */}
      <div
        className={`hidden md:flex fixed bottom-6 right-6 z-40 items-center gap-4 rounded-full bg-mar text-petroleo pl-5 pr-1.5 py-1.5 shadow-[0_10px_30px_rgb(10_58_89/0.3)] transition-[translate,opacity] duration-300 ${
          aviso && !algoAberto ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"
        }`}
        role="status"
      >
        <span className="inline-flex items-center gap-2 text-[15px] font-medium">
          <IconeCheck className="w-4 h-4 text-amarelo" />
          {aviso?.texto}
        </span>
        <button type="button" onClick={abrirSacola} className="botao botao-amarelo min-h-11 h-11 px-4 text-[12px]">
          Ver sacola
        </button>
      </div>
    </>
  );
}
