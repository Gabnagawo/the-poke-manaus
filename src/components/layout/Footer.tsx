// Rodapé da versão Honi Poke: azul-noite, colunas com títulos na cor de ação e o crédito centralizado.

import Link from "next/link";
import { LOJA } from "@/lib/loja";
import { Logo } from "@/components/ui/Logo";
import { IconeInstagram, IconeSetaExterna } from "@/components/ui/Icones";

export function Footer() {
  const ano = 2026;
  const link = "inline-flex min-h-11 items-center gap-1.5 hover:text-amarelo transition-colors";
  return (
    <footer className="bg-noite text-petroleo">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8 pt-16 md:pt-20 pb-6">
        <Logo className="h-[30px] md:h-[36px] w-auto" titulo="The Poke" />

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 text-[15px] leading-[1.6]">
          <div className="col-span-2 md:col-span-1">
            <h2 className="rotulo text-amarelo">A loja</h2>
            <p className="mt-3 text-petroleo/85">
              {LOJA.enderecoLinha}
              <br />
              {LOJA.bairro}, {LOJA.cidade}/{LOJA.estado}
              <br />
              CEP {LOJA.cep}
            </p>
            <p className="mt-3 text-tinta-suave text-[13px]">CNPJ {LOJA.cnpj}</p>
          </div>
          <div>
            <h2 className="rotulo text-amarelo">Cardápio</h2>
            <ul className="mt-2 text-petroleo/85">
              <li>
                <Link href="/#monte-seu-poke" className={link}>
                  Monte seu poke
                </Link>
              </li>
              <li>
                <Link href="/#pokes-da-casa" className={link}>
                  Pokes da casa
                </Link>
              </li>
              <li>
                <Link href="/#sucos" className={link}>
                  Sucos especiais
                </Link>
              </li>
              <li>
                <Link href="/#bebidas" className={link}>
                  Bebidas
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="rotulo text-amarelo">Pedidos</h2>
            <ul className="mt-2 text-petroleo/85">
              <li>
                <Link href="/#cardapio" className={link}>
                  Pedir pelo site
                </Link>
              </li>
              <li>
                <a href={LOJA.linkIfood} target="_blank" rel="noopener noreferrer" className={link}>
                  iFood <IconeSetaExterna />
                </a>
              </li>
              <li className="pt-1 text-tinta-suave text-[14px]">Todos os dias, 11h às 23h</li>
            </ul>
          </div>
          <div>
            <h2 className="rotulo text-amarelo">Redes</h2>
            <ul className="mt-2 text-petroleo/85">
              <li>
                <a href={LOJA.instagram} target="_blank" rel="noopener noreferrer" className={link}>
                  <IconeInstagram className="w-[18px] h-[18px]" /> {LOJA.instagramHandle}
                </a>
              </li>
              <li>
                <a href={LOJA.redeInstagram} target="_blank" rel="noopener noreferrer" className={link}>
                  <IconeInstagram className="w-[18px] h-[18px]" /> @thepokeoficial
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-petroleo/12 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between text-[13px] text-tinta-suave pb-[max(16px,env(safe-area-inset-bottom))]">
          <p>
            © {ano} {LOJA.nome}.
          </p>
          <nav className="flex gap-5" aria-label="Páginas legais">
            <Link href="/privacidade" className="inline-flex min-h-11 items-center hover:text-petroleo transition-colors">
              Privacidade
            </Link>
            <Link href="/termos" className="inline-flex min-h-11 items-center hover:text-petroleo transition-colors">
              Termos
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
