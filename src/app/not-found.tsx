import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#FCF9F0] text-[#1D0B0D]">
      <header className="w-full bg-[#FCF9F0] border-b border-[#0E2A38]/10 py-5">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative w-9 h-9">
              <Image
                src="/images/logo/logo.webp"
                alt="The Poke"
                fill
                className="object-contain"
              />
            </div>
            <span className="font-display font-black text-lg text-[#0E2A38]">
              THE POKE MANAUS
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-6 text-center">
        <div className="max-w-md space-y-6">
          <span className="tilt-left bg-[#F7EA48] text-[#0E2A38] font-display font-extrabold text-xs px-3 py-1 uppercase tracking-wider">
            ERRO 404
          </span>
          <h1 className="font-display font-black text-6xl sm:text-7xl text-[#0E2A38] leading-display tracking-tight">
            PÁGINA NÃO ENCONTRADA
          </h1>
          <p className="text-sm sm:text-base text-[#59655D] leading-relaxed">
            A tigela que você estava procurando não está mais aqui. Que tal dar uma olhada no nosso cardápio fresco?
          </p>
          <div className="pt-2">
            <Link href="/" className="btn-limon h-12 px-8 text-sm font-bold shadow-sm">
              VOLTAR AO CARDÁPIO →
            </Link>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 border-t border-[#0E2A38]/10 text-center text-xs text-[#59655D]">
        © The Poke Manaus · Park Mall Ephigênio
      </footer>
    </div>
  );
}
