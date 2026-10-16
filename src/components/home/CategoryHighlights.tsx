import Image from "next/image";

interface CategoryHighlightsProps {
  onAbrirMontagem: () => void;
  onSelecionarCategoria: (categoriaId: "monte-seu-poke" | "promocoes" | "sucos" | "bebidas") => void;
}

export function CategoryHighlights({
  onAbrirMontagem,
  onSelecionarCategoria,
}: CategoryHighlightsProps) {
  return (
    <section className="w-full bg-[#FCF9F0] py-16 md:py-24 border-b border-[#0E2A38]/10">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* Cabeçalho Limpo no Estilo Limón (sem etiquetas extras) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="font-display font-black text-4xl sm:text-5xl text-[#0E2A38] leading-display tracking-tight">
              O QUE SERVIMOS NA LOJA
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#59655D] max-w-md">
            Do clássico poke montado na tigela às receitas da casa e sucos especiais batidos na hora.
          </p>
        </div>

        {/* Rolagem Lateral de Cards Menores no Celular (~240px, ~1.5 card) / Grade no Desktop */}
        <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 overflow-x-auto scrollbar-hide snap-x pb-4 md:pb-0 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
          
          {/* Card 1: Monte seu Poke (Areia Quente #E5D3BA) */}
          <div className="flex flex-col space-y-4 md:space-y-5 group shrink-0 w-[240px] md:w-auto snap-start">
            <div className="relative aspect-square bg-[#E5D3BA] rounded-[1px] p-6 md:p-8 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]">
              {/* O único selo permitido pela revisão: Destaque, plano, sem rotação */}
              <span className="absolute top-4 left-4 bg-[#F7EA48] text-[#0E2A38] font-display font-bold text-xs px-3 py-1 uppercase tracking-wider z-10 rounded-[1px]">
                Destaque
              </span>
              
              {/* Tigela recortada com sombra de contato suave (sem multiply) */}
              <div className="relative w-full h-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.14)]">
                <Image
                  src="/images/pratos/poke-grande.webp"
                  alt="Monte seu Poke"
                  fill
                  sizes="(max-width: 768px) 240px, 360px"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="space-y-2 md:space-y-3">
              <h3 className="tilt-card-left font-display font-black text-xl md:text-2xl sm:text-3xl text-[#0E2A38] tracking-tight">
                MONTE SEU POKE
              </h3>
              <p className="text-xs md:text-sm text-[#59655D] leading-relaxed">
                Escolha o tamanho (P, M ou G) e monte cada etapa: base, proteínas, molhos, acompanhamentos e finalização com crispy crocante.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="font-display font-extrabold text-xs md:text-sm text-[#0E2A38]">
                  A partir de R$ 59,90
                </span>
                <button
                  type="button"
                  onClick={onAbrirMontagem}
                  className="text-xs font-display font-extrabold uppercase tracking-wider text-[#0E2A38] hover:text-[#2A7CA1] flex items-center space-x-1.5 transition-colors"
                >
                  <span>Montar agora</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          </div>

          {/* Card 2: Pokes da Casa (Argila/Pêssego #DEB8A3) */}
          <div className="flex flex-col space-y-4 md:space-y-5 group shrink-0 w-[240px] md:w-auto snap-start">
            <div className="relative aspect-square bg-[#DEB8A3] rounded-[1px] p-6 md:p-8 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]">
              <div className="relative w-full h-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.14)]">
                <Image
                  src="/images/pratos/poke-makaha.webp"
                  alt="Poke Makaha da Casa"
                  fill
                  sizes="(max-width: 768px) 240px, 360px"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="space-y-2 md:space-y-3">
              <h3 className="tilt-card-right font-display font-black text-xl md:text-2xl sm:text-3xl text-[#0E2A38] tracking-tight">
                POKES DA CASA
              </h3>
              <p className="text-xs md:text-sm text-[#59655D] leading-relaxed">
                Prontas para pedir: Poke Makaha com pasta de salmão, Frango Grelhado (P, M, G) e Frango Teriyaki.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="font-display font-extrabold text-xs md:text-sm text-[#0E2A38]">
                  A partir de R$ 44,90
                </span>
                <a
                  href="#cardapio"
                  onClick={() => onSelecionarCategoria("promocoes")}
                  className="text-xs font-display font-extrabold uppercase tracking-wider text-[#0E2A38] hover:text-[#2A7CA1] flex items-center space-x-1.5 transition-colors"
                >
                  <span>Ver receitas</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Card 3: Sucos Especiais (Lavanda Pastel #D9C3CE) */}
          <div className="flex flex-col space-y-4 md:space-y-5 group shrink-0 w-[240px] md:w-auto snap-start">
            <div className="relative aspect-square bg-[#D9C3CE] rounded-[1px] p-6 md:p-8 flex items-center justify-center overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]">
              <div className="relative w-full h-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.14)]">
                <Image
                  src="/images/pratos/anti-ox.webp"
                  alt="Sucos Especiais"
                  fill
                  sizes="(max-width: 768px) 240px, 360px"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="space-y-2 md:space-y-3">
              <h3 className="tilt-card-left font-display font-black text-xl md:text-2xl sm:text-3xl text-[#0E2A38] tracking-tight">
                SUCOS ESPECIAIS
              </h3>
              <p className="text-xs md:text-sm text-[#59655D] leading-relaxed">
                Combinações nutritivas preparadas na hora: Guaraflow, Anti-Ox, Move On com açaí e morango, e Reset Green.
              </p>
              <div className="pt-2 flex items-center justify-between">
                <span className="font-display font-extrabold text-xs md:text-sm text-[#0E2A38]">
                  R$ 19,90 a R$ 28,90
                </span>
                <a
                  href="#cardapio"
                  onClick={() => onSelecionarCategoria("sucos")}
                  className="text-xs font-display font-extrabold uppercase tracking-wider text-[#0E2A38] hover:text-[#2A7CA1] flex items-center space-x-1.5 transition-colors"
                >
                  <span>Ver sucos</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
