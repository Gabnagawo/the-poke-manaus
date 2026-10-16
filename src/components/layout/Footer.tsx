import Link from "next/link";
import Image from "next/image";
import { LOJA } from "@/lib/loja";

export function Footer() {
  const anoAtual = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#0E2A38] text-[#FCF9F0] border-t-2 border-[#103B15]/20 pt-16 pb-12">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* Bloco Superior do Rodapé */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#FCF9F0]/15">
          
          {/* Coluna Marca e Slogan Real */}
          <div className="md:col-span-5 flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/images/logo/logo.webp"
                  alt="The Poke"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-extrabold text-2xl tracking-tight text-[#FCF9F0]">
                  THE POKE
                </span>
                <span className="text-xs uppercase font-bold tracking-widest text-[#F7EA48]">
                  Manaus · Park Mall Ephigênio
                </span>
              </div>
            </div>

            <p className="font-display font-normal text-lg text-[#F7EA48] tracking-wide pt-1">
              RÁPIDO, SABOROSO &amp; NUTRITIVO.
            </p>

            <p className="text-sm text-[#FCF9F0]/80 leading-relaxed max-w-sm">
              Poke montado na hora com receitas da casa e sucos naturais.
            </p>

            <div className="pt-2 text-xs text-[#FCF9F0]/60 space-y-1">
              <p>CNPJ: {LOJA.cnpj}</p>
              <p>Rede fundada em 2019. Loja de Manaus inaugurada em 26/09/2026.</p>
            </div>
          </div>

          {/* Coluna Localização e Atendimento */}
          <div className="md:col-span-4 flex flex-col space-y-3">
            <h3 className="font-display font-bold text-base tracking-wider text-[#F7EA48] uppercase">
              Onde Estamos
            </h3>
            <p className="text-sm text-[#FCF9F0]/90 leading-relaxed">
              {LOJA.enderecoLinha}
              <br />
              Bairro {LOJA.bairro} — {LOJA.cidade}/{LOJA.estado}
              <br />
              CEP {LOJA.cep}
            </p>

            <div className="pt-2">
              <h4 className="font-display font-semibold text-xs tracking-wider text-[#FCF9F0]/70 uppercase">
                Horário de Atendimento
              </h4>
              <p className="text-sm text-[#FCF9F0]/90 font-medium pt-0.5">
                {LOJA.horario}
              </p>
            </div>

            <div className="pt-2">
              <a
                href={LOJA.linkIfood}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-[#F7EA48] hover:underline"
              >
                Pedir no iFood Manaus ↗
              </a>
            </div>
          </div>

          {/* Coluna Navegação & Redes */}
          <div className="md:col-span-3 flex flex-col space-y-3">
            <h3 className="font-display font-bold text-base tracking-wider text-[#F7EA48] uppercase">
              Navegação
            </h3>
            <ul className="space-y-2 text-sm text-[#FCF9F0]/80">
              <li>
                <a href="#cardapio" className="hover:text-[#F7EA48] transition-colors">
                  Monte seu Poke
                </a>
              </li>
              <li>
                <a href="#cardapio" className="hover:text-[#F7EA48] transition-colors">
                  Cardápio
                </a>
              </li>
              <li>
                <a href="#sobre" className="hover:text-[#F7EA48] transition-colors">
                  Sobre a Franquia
                </a>
              </li>
              <li>
                <a href="#horarios" className="hover:text-[#F7EA48] transition-colors">
                  Horários
                </a>
              </li>
              <li>
                <a
                  href={LOJA.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#F7EA48] transition-colors flex items-center space-x-1"
                >
                  <span>Instagram {LOJA.instagramHandle}</span>
                  <span className="text-xs">↗</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Faixa Inferior de Direitos e Links Legais */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FCF9F0]/60 space-y-4 sm:space-y-0">
          <p>© {anoAtual} The Poke Manaus. Todos os direitos reservados.</p>
          <div className="flex items-center space-x-6">
            <Link
              href="/privacidade"
              className="hover:text-[#FCF9F0] transition-colors underline-offset-4 hover:underline py-1"
            >
              Política de Privacidade
            </Link>
            <Link
              href="/termos"
              className="hover:text-[#FCF9F0] transition-colors underline-offset-4 hover:underline py-1"
            >
              Termos de Uso
            </Link>
            <a
              href="/llms.txt"
              className="hover:text-[#FCF9F0] transition-colors underline-offset-4 hover:underline py-1"
            >
              llms.txt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
