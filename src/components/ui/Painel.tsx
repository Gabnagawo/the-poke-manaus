"use client";

// Janela deslizante usada pela montagem, pela sacola e pelo menu do celular.
// - celular: sobe de baixo (tela quase cheia); desktop: modal central ou gaveta lateral
// - trava a rolagem do fundo, fecha no Esc e no botão "voltar" do celular
// - prende o foco do teclado dentro da janela e devolve ao fechar

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";

type Variante = "montagem" | "sacola" | "menu";

// Uma única entrada no histórico para qualquer painel aberto, para que trocar
// de um painel para outro (sacola → editar montagem) não dispare "voltar" duas vezes.
let abertos = 0;
let entradaNoHistorico = false;

function registrarAbertura() {
  abertos += 1;
  if (!entradaNoHistorico) {
    window.history.pushState({ painel: true }, "");
    entradaNoHistorico = true;
  }
}

function registrarFechamento(porVoltar: boolean) {
  abertos = Math.max(0, abertos - 1);
  if (porVoltar) {
    entradaNoHistorico = false;
    return;
  }
  setTimeout(() => {
    if (abertos === 0 && entradaNoHistorico) {
      entradaNoHistorico = false;
      if (window.history.state?.painel) window.history.back();
    }
  }, 0);
}

const ESTILOS: Record<Variante, { caixa: string; fora: string; dentro: string }> = {
  montagem: {
    caixa:
      "inset-x-0 bottom-0 top-3 rounded-t-[22px] md:inset-auto md:left-1/2 md:top-1/2 md:w-[min(780px,92vw)] md:h-[min(88vh,920px)] md:rounded-[22px]",
    fora: "translate-y-full md:translate-y-[-46%] md:-translate-x-1/2 md:opacity-0 md:scale-[0.98]",
    dentro: "translate-y-0 md:-translate-y-1/2 md:-translate-x-1/2 md:opacity-100 md:scale-100",
  },
  sacola: {
    caixa:
      "inset-x-0 bottom-0 top-3 rounded-t-[22px] md:inset-y-0 md:left-auto md:right-0 md:top-0 md:w-[460px] md:rounded-none md:rounded-l-[22px]",
    fora: "translate-y-full md:translate-y-0 md:translate-x-full",
    dentro: "translate-y-0 md:translate-x-0",
  },
  menu: {
    caixa: "inset-0",
    fora: "opacity-0 -translate-y-3",
    dentro: "opacity-100 translate-y-0",
  },
};

interface PainelProps {
  aberto: boolean;
  onFechar: () => void;
  rotulo: string;
  variante: Variante;
  children: ReactNode;
  className?: string;
}

export function Painel({ aberto, onFechar, rotulo, variante, children, className = "" }: PainelProps) {
  const [montado, setMontado] = useState(aberto);
  const [visivel, setVisivel] = useState(false);
  const caixa = useRef<HTMLDivElement>(null);
  const fechar = useRef(onFechar);
  fechar.current = onFechar;

  // Entrada e saída com animação (mantém montado durante a saída)
  useEffect(() => {
    if (aberto) {
      setMontado(true);
      const id = requestAnimationFrame(() => requestAnimationFrame(() => setVisivel(true)));
      return () => cancelAnimationFrame(id);
    }
    setVisivel(false);
    const t = setTimeout(() => setMontado(false), 300);
    return () => clearTimeout(t);
  }, [aberto]);

  // Trava a rolagem, Esc, voltar do celular e foco
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.activeElement as HTMLElement | null;
    document.documentElement.classList.add("travado");
    registrarAbertura();
    let porVoltar = false;

    const aoVoltar = () => {
      porVoltar = true;
      fechar.current();
    };
    const aoTeclar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        fechar.current();
        return;
      }
      if (e.key !== "Tab" || !caixa.current) return;
      const focaveis = caixa.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focaveis.length) return;
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    };

    window.addEventListener("popstate", aoVoltar);
    document.addEventListener("keydown", aoTeclar);
    const foco = setTimeout(() => caixa.current?.focus({ preventScroll: true }), 60);

    return () => {
      clearTimeout(foco);
      window.removeEventListener("popstate", aoVoltar);
      document.removeEventListener("keydown", aoTeclar);
      registrarFechamento(porVoltar);
      // só destrava se nenhum outro painel abriu no lugar
      setTimeout(() => {
        if (abertos === 0) document.documentElement.classList.remove("travado");
      }, 0);
      if (anterior && document.contains(anterior)) anterior.focus({ preventScroll: true });
    };
  }, [aberto]);

  if (!montado || typeof document === "undefined") return null;

  const e = ESTILOS[variante];
  return createPortal(
    <div className="fixed inset-0 z-50" aria-hidden={!aberto}>
      {variante !== "menu" && (
        <div
          className={`absolute inset-0 bg-petroleo-2/50 transition-opacity duration-300 ${visivel ? "opacity-100" : "opacity-0"}`}
          onClick={() => fechar.current()}
        />
      )}
      <div
        ref={caixa}
        role="dialog"
        aria-modal="true"
        aria-label={rotulo}
        tabIndex={-1}
        className={`absolute flex flex-col overflow-hidden bg-creme shadow-[0_-10px_40px_rgb(10_58_89/0.18)] outline-none transition-[translate,scale,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform ${e.caixa} ${visivel ? e.dentro : e.fora} ${className}`}
      >
        {children}
      </div>
    </div>,
    document.body,
  );
}

/** Limpa uma entrada de painel que sobrou no histórico depois de recarregar a página. */
export function limparHistoricoDePainel() {
  if (typeof window !== "undefined" && window.history.state?.painel) {
    window.history.replaceState(null, "");
  }
}
