import Image from "next/image";
import { LOJA } from "@/lib/loja";

interface EditorialConceptProps {
  onAbrirMontagem: () => void;
}

export function EditorialConcept({ onAbrirMontagem }: EditorialConceptProps) {
  return (
    <section id="sobre" className="w-full bg-[#FCF9F0] py-16 md:py-24 border-b border-[#0E2A38]/10">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Coluna de Texto: Factual, direta e sem enfeites de IA */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#0E2A38] leading-display tracking-tight">
              THE POKE EM MANAUS
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-[#59655D] leading-relaxed">
              <p>
                A rede The Poke foi fundada em 2019. A unidade no Condomínio Park Mall Ephigênio, inaugurada em 26 de setembro de 2026, é a primeira da marca em Manaus e na Região Norte.
              </p>
              <p>
                Você pode montar a sua tigela escolhendo cada etapa — base, proteínas, molhos, acompanhamentos e crispys — ou optar pelas receitas prontas da casa.
              </p>
            </div>

            <div className="pt-2 flex flex-wrap gap-4 items-center">
              <button
                type="button"
                onClick={onAbrirMontagem}
                className="btn-limon h-12 px-6 text-xs sm:text-sm font-bold shadow-sm"
              >
                MONTAR POKE →
              </button>
              <a
                href={LOJA.linkIfood}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-[#2A7CA1] hover:underline py-2"
              >
                Cardápio no iFood ↗
              </a>
            </div>
          </div>

          {/* Coluna Visual: Composição Editorial com Tigela Recortada sobre Fundo Pastel */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[420px] aspect-[4/5] bg-[#E5D3BA] rounded-[1px] p-8 flex flex-col justify-between shadow-sm">
              <div className="flex justify-between items-start">
                <span className="font-display font-extrabold text-2xl text-[#0E2A38] tracking-tight">
                  THE POKE
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0E2A38]/70">
                  Park Mall Ephigênio
                </span>
              </div>

              <div className="relative w-full h-64 my-auto drop-shadow-[0_20px_28px_rgba(0,0,0,0.18)]">
                <Image
                  src="/images/pratos/poke-makaha.webp"
                  alt="Poke Makaha da The Poke Manaus"
                  fill
                  sizes="360px"
                  className="object-contain"
                />
              </div>

              <div className="pt-4 border-t border-[#0E2A38]/15 flex items-center justify-between text-xs text-[#0E2A38]">
                <span className="font-bold">Poke Makaha</span>
                <span>Receita da Casa</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
