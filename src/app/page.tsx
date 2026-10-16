import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Faixa } from "@/components/home/Faixa";
import { Destaques } from "@/components/home/Destaques";
import { Cardapio } from "@/components/home/Cardapio";
import { ALoja } from "@/components/home/ALoja";
import { Horarios } from "@/components/home/Horarios";
import { BarraSacola } from "@/components/pedido/BarraSacola";
import { Montagem } from "@/components/pedido/Montagem";
import { Sacola } from "@/components/pedido/Sacola";
import { Revelador } from "@/components/ui/Revelador";

export default function Inicio() {
  return (
    <>
      <a
        href="#cardapio"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-amarelo focus:px-5 focus:py-3 focus:font-bold"
      >
        Pular para o cardápio
      </a>
      <Header />
      <main className="flex-1">
        <Hero />
        <Faixa />
        <Destaques />
        <Cardapio />
        <ALoja />
        <Horarios />
      </main>
      <Footer />
      <BarraSacola />
      <Montagem />
      <Sacola />
      <Revelador />
    </>
  );
}
