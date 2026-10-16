import Image from "next/image";

interface HeroProps {
  onAbrirMontagem: () => void;
}

export function Hero({ onAbrirMontagem }: HeroProps) {
  return (
    <section className="relative w-full bg-[#DBE2DC] overflow-hidden min-h-[580px] lg:min-h-[660px] flex items-center justify-center border-b border-[#0E2A38]/10 py-20 lg:py-24">
      
      {/* ==================================================================== */}
      {/* COMPOSIÇÃO DE TIGELAS VISTAS DE CIMA (MESA EDITORIAL NO ESTILO LIMÓN) */}
      {/* ==================================================================== */}
      
      {/* Tigela 1: Topo Esquerda (Poke Grande) */}
      <div className="absolute -top-12 -left-12 sm:-top-16 sm:-left-16 w-36 h-36 sm:w-64 sm:h-64 lg:w-80 lg:h-80 pointer-events-none z-0 animate-float-1 select-none">
        <div className="relative w-full h-full drop-shadow-[0_20px_28px_rgba(0,0,0,0.18)]">
          <Image
            src="/images/pratos/poke-grande.webp"
            alt=""
            fill
            sizes="(max-width: 768px) 144px, 320px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Tigela 2: Fundo Esquerda (Poke Makaha) */}
      <div className="absolute -bottom-10 -left-10 sm:-bottom-14 sm:-left-12 w-32 h-32 sm:w-56 sm:h-56 lg:w-72 lg:h-72 pointer-events-none z-0 animate-float-2 select-none">
        <div className="relative w-full h-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.16)]">
          <Image
            src="/images/pratos/poke-makaha.webp"
            alt=""
            fill
            sizes="(max-width: 768px) 128px, 288px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Tigela 3: Topo Direita (Poke Frango Grelhado) */}
      <div className="absolute -top-10 -right-10 sm:-top-14 sm:-right-14 w-36 h-36 sm:w-60 sm:h-60 lg:w-80 lg:h-80 pointer-events-none z-0 animate-float-3 select-none">
        <div className="relative w-full h-full drop-shadow-[0_20px_28px_rgba(0,0,0,0.18)]">
          <Image
            src="/images/pratos/poke-medio-frango-grelhado.webp"
            alt=""
            fill
            sizes="(max-width: 768px) 144px, 320px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Tigela 4: Fundo Direita (Poke Pequeno) */}
      <div className="absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-10 w-32 h-32 sm:w-52 sm:h-52 lg:w-68 lg:h-68 pointer-events-none z-0 animate-float-4 select-none">
        <div className="relative w-full h-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.16)]">
          <Image
            src="/images/pratos/poke-pequeno.webp"
            alt=""
            fill
            sizes="(max-width: 768px) 128px, 272px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Tigela 5: Lateral Direita Meio (Poke Médio Clássico) - apenas em telas médias e grandes */}
      <div className="hidden md:block absolute top-1/2 -translate-y-1/2 -right-16 lg:-right-12 w-48 h-48 lg:w-60 lg:h-60 pointer-events-none z-0 animate-float-5 select-none opacity-85">
        <div className="relative w-full h-full drop-shadow-[0_16px_22px_rgba(0,0,0,0.14)]">
          <Image
            src="/images/pratos/poke-medio.webp"
            alt=""
            fill
            sizes="240px"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* ==================================================================== */}
      {/* CONTEÚDO CENTRAL: LETREIRO INCLINADO, SLOGAN REAL E AÇÕES             */}
      {/* ==================================================================== */}
      <div className="relative z-10 max-w-[840px] mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        
        {/* Letreiro Gigante Inclinado em Azul (#0E2A38) */}
        <div className="py-2">
          <h1 className="letreiro-hero font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-[#0E2A38] tracking-tight leading-none drop-shadow-xs">
            MONTE SEU POKE
          </h1>
        </div>

        {/* Slogan Real do Instagram da Loja */}
        <p className="font-display font-bold text-lg sm:text-2xl md:text-3xl text-[#0E2A38] uppercase tracking-wide mt-4 sm:mt-6 mb-8">
          Rápido, saboroso &amp; nutritivo.
        </p>

        {/* Botões de Ação Direta (alvo >= 44px) */}
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <button
            type="button"
            onClick={onAbrirMontagem}
            className="btn-limon h-13 px-8 text-sm sm:text-base font-extrabold shadow-md w-full sm:w-auto"
          >
            MONTE SEU POKE →
          </button>

          <a
            href="#cardapio"
            className="bg-[#FCF9F0] text-[#0E2A38] border border-[#0E2A38]/30 hover:bg-white h-13 px-8 text-sm sm:text-base font-bold inline-flex items-center justify-center transition-colors rounded-[1px] w-full sm:w-auto"
          >
            VER CARDÁPIO
          </a>
        </div>

      </div>

    </section>
  );
}
