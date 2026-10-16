// Rodapé: dados da loja em colunas e o logo gigante de ponta a ponta (Poke House).

import Link from "next/link";
import { LOJA } from "@/lib/loja";
import { Logo } from "@/components/ui/Logo";
import { IconeSetaExterna } from "@/components/ui/Icones";

export function Footer() {
  const ano = 2026;
  return (
    <footer className="bg-petroleo text-creme overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8 pt-16 md:pt-24 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 text-[15px] leading-[1.6]">
        <div className="col-span-2 md:col-span-1">
          <h2 className="rotulo text-amarelo">A loja</h2>
          <p className="mt-3">
            {LOJA.enderecoLinha}
            <br />
            {LOJA.bairro}, {LOJA.cidade}/{LOJA.estado}
            <br />
            CEP {LOJA.cep}
          </p>
          <p className="mt-3 text-creme/70 text-[13px]">CNPJ {LOJA.cnpj}</p>
        </div>
        <div>
          <h2 className="rotulo text-amarelo">Horário</h2>
          <p className="mt-3">
            Todos os dias
            <br />
            11h às 23h
          </p>
        </div>
        <div>
          <h2 className="rotulo text-amarelo">Pedidos</h2>
          <ul className="mt-2">
            <li>
              <Link href="/#cardapio" className="inline-flex min-h-11 items-center hover:text-amarelo transition-colors">
                Cardápio
              </Link>
            </li>
            <li>
              <a
                href={LOJA.linkIfood}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 hover:text-amarelo transition-colors"
              >
                iFood <IconeSetaExterna />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="rotulo text-amarelo">Redes</h2>
          <ul className="mt-2">
            <li>
              <a
                href={LOJA.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 hover:text-amarelo transition-colors"
              >
                {LOJA.instagramHandle} <IconeSetaExterna />
              </a>
            </li>
            <li>
              <a
                href={LOJA.redeInstagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 hover:text-amarelo transition-colors"
              >
                @thepokeoficial <IconeSetaExterna />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="mx-auto max-w-[1240px] px-5 md:px-8 mt-14 md:mt-20">
        <Logo className="w-full h-auto text-azul" titulo="thepoke" />
      </div>

      <div className="mx-auto max-w-[1240px] px-5 md:px-8 py-6 mt-6 border-t border-creme/15 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-[13px] text-creme/70 pb-[max(24px,env(safe-area-inset-bottom))]">
        <p>
          © {ano} {LOJA.nome}.
        </p>
        <nav className="flex gap-5" aria-label="Páginas legais">
          <Link href="/privacidade" className="inline-flex min-h-11 items-center hover:text-creme transition-colors">
            Privacidade
          </Link>
          <Link href="/termos" className="inline-flex min-h-11 items-center hover:text-creme transition-colors">
            Termos
          </Link>
        </nav>
      </div>
    </footer>
  );
}
