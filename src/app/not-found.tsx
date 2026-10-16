import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Header inicio={false} />
      <main className="mx-auto w-full max-w-[760px] px-5 md:px-8 py-24 md:py-36 text-center">
        <p className="letreiro text-[44px] md:text-[56px] text-azul -rotate-[7deg] inline-block">Ops!</p>
        <h1 className="titulo text-[40px] md:text-[64px] mt-6">Página não encontrada</h1>
        <p className="mt-4 text-[17px] text-tinta-suave">Este endereço não existe. O cardápio continua no mesmo lugar.</p>
        <Link href="/#cardapio" className="botao botao-amarelo mt-10">
          Ver cardápio
        </Link>
      </main>
      <Footer />
    </>
  );
}
