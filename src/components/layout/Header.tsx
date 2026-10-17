"use client";

// Cabeçalho no molde da limon.no: links à esquerda, logo no centro, ação à direita.
// Celular: menu | logo | Pedir/Sacola. O menu abre uma cortina sálvia em tela cheia.

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePedido } from "@/lib/pedido";
import { LOJA, statusLoja } from "@/lib/loja";
import { aoClicarAncora, irPara } from "@/lib/rolagem";
import { Logo } from "@/components/ui/Logo";
import { Painel } from "@/components/ui/Painel";
import { IconeFechar, IconeInstagram, IconeMenu, IconeSacola } from "@/components/ui/Icones";

const LINKS = [
  { id: "cardapio", texto: "Cardápio" },
  { id: "pokes-da-casa", texto: "Pokes da casa" },
  { id: "sucos", texto: "Sucos" },
  { id: "a-loja", texto: "A loja" },
  { id: "horarios", texto: "Horários" },
];

export function Header({ inicio = true }: { inicio?: boolean }) {
  const { quantidadeTotal, abrirSacola, abrirMontagem, pronta } = usePedido();
  const [rolou, setRolou] = useState(false);
  const [menuAberto, setMenuAberto] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const aoRolar = () => setRolou(window.scrollY > 8);
    aoRolar();
    window.addEventListener("scroll", aoRolar, { passive: true });
    return () => window.removeEventListener("scroll", aoRolar);
  }, []);

  useEffect(() => {
    if (menuAberto) setStatus(statusLoja().texto);
  }, [menuAberto]);

  const temItens = pronta && quantidadeTotal > 0;

  const acaoPrincipal = () => {
    if (temItens) abrirSacola();
    else if (inicio) irPara("cardapio");
    else window.location.href = "/#cardapio";
  };

  const linkSecao = (id: string, texto: string, classe: string, antes?: () => void) =>
    inicio ? (
      <a key={id} href={`#${id}`} onClick={(e) => aoClicarAncora(e, id, antes)} className={classe}>
        {texto}
      </a>
    ) : (
      <Link key={id} href={`/#${id}`} className={classe}>
        {texto}
      </Link>
    );

  return (
    <>
      <header
        className={`sticky top-0 z-40 bg-creme transition-shadow duration-300 ${
          rolou ? "shadow-[0_1px_0_rgb(14_76_116/0.12)]" : ""
        }`}
      >
        <div className="mx-auto max-w-[1240px] h-[var(--altura-topo)] px-3 md:px-8 grid grid-cols-[1fr_auto_1fr] items-center">
          {/* esquerda */}
          <div className="flex items-center">
            <button
              type="button"
              onClick={() => setMenuAberto(true)}
              className="lg:hidden grid place-items-center w-11 h-11 -ml-1 rounded-full active:bg-petroleo/5"
              aria-label="Abrir menu"
              aria-expanded={menuAberto}
            >
              <IconeMenu />
            </button>
            <nav className="hidden lg:flex items-center gap-6 xl:gap-7 text-[13px] whitespace-nowrap font-bold uppercase tracking-[0.08em]" aria-label="Seções">
              {LINKS.filter((l) => ["cardapio", "a-loja", "horarios"].includes(l.id)).map((l) =>
                linkSecao(l.id, l.texto, "py-3 hover:text-azul transition-colors"),
              )}
              {inicio && (
                <button type="button" onClick={() => abrirMontagem("M")} className="hidden xl:inline py-3 uppercase hover:text-azul transition-colors">
                  Monte seu poke
                </button>
              )}
            </nav>
          </div>

          {/* centro */}
          <Link href="/" className="flex items-center min-h-11 px-1" aria-label="The Poke Manaus, início">
            <Logo className="h-[26px] md:h-[34px] w-auto" />
          </Link>

          {/* direita */}
          <div className="flex items-center justify-end gap-5">
            <a
              href={LOJA.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 min-h-11 text-[13px] font-bold uppercase tracking-[0.08em] hover:text-azul transition-colors"
            >
              <IconeInstagram className="w-[18px] h-[18px]" />
              Instagram
            </a>
            <button
              type="button"
              onClick={acaoPrincipal}
              className="botao botao-amarelo min-h-11 h-11 px-4 md:px-5 text-[13px] gap-2"
              aria-label={temItens ? `Abrir sacola com ${quantidadeTotal} ${quantidadeTotal === 1 ? "item" : "itens"}` : "Pedir: ver o cardápio"}
            >
              {temItens ? (
                <>
                  <IconeSacola className="w-[18px] h-[18px]" />
                  <span className="hidden sm:inline">Sacola</span>
                  <span className="num grid place-items-center min-w-6 h-6 px-1.5 rounded-full bg-petroleo text-creme text-[12px]">
                    {quantidadeTotal}
                  </span>
                </>
              ) : (
                "Pedir"
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Menu do celular: cortina sálvia (limon.no) */}
      <Painel aberto={menuAberto} onFechar={() => setMenuAberto(false)} rotulo="Menu" variante="menu" className="!bg-salvia">
        <div className="h-[var(--altura-topo)] px-3 grid grid-cols-[1fr_auto_1fr] items-center shrink-0">
          <span />
          <Logo className="h-[26px] w-auto" />
          <button
            type="button"
            onClick={() => setMenuAberto(false)}
            className="justify-self-end grid place-items-center w-11 h-11 rounded-full active:bg-petroleo/10"
            aria-label="Fechar menu"
          >
            <IconeFechar className="w-6 h-6" />
          </button>
        </div>
        <nav className="flex-1 overflow-y-auto px-5 pt-4" aria-label="Seções">
          <ul className="border-t border-petroleo/20">
            {LINKS.map((l) => (
              <li key={l.id} className="border-b border-petroleo/20">
                {linkSecao(l.id, l.texto, "flex items-center min-h-16 text-[26px] titulo", () => setMenuAberto(false))}
              </li>
            ))}
            {inicio && (
              <li className="border-b border-petroleo/20">
                <button
                  type="button"
                  onClick={() => {
                    setMenuAberto(false);
                    setTimeout(() => abrirMontagem("M"), 320);
                  }}
                  className="flex items-center w-full min-h-16 text-[26px] titulo text-left"
                >
                  Monte seu poke
                </button>
              </li>
            )}
          </ul>
          <div className="mt-8 space-y-3 pb-[max(24px,env(safe-area-inset-bottom))]">
            {status && <p className="text-[15px] font-medium">{status}</p>}
            <p className="text-[15px] text-petroleo/80">
              {LOJA.local} · {LOJA.bairro}, {LOJA.cidade}
            </p>
            <div className="flex flex-wrap gap-3 pt-3">
              <a href={LOJA.instagram} target="_blank" rel="noopener noreferrer" className="botao botao-contorno">
                <IconeInstagram className="w-[18px] h-[18px]" />
                Instagram
              </a>
            </div>
          </div>
        </nav>
      </Painel>
    </>
  );
}
