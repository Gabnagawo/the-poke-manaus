"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyMobileCTA } from "@/components/layout/StickyMobileCTA";
import { Hero } from "@/components/home/Hero";
import { CategoryHighlights } from "@/components/home/CategoryHighlights";
import { EditorialConcept } from "@/components/home/EditorialConcept";
import { MenuSection } from "@/components/home/MenuSection";
import { OpeningHours } from "@/components/home/OpeningHours";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { ModalMonteSeuPoke } from "@/components/poke/ModalMonteSeuPoke";
import { useCarrinho } from "@/lib/carrinho";
import { ItemCardapio } from "@/data/cardapio";

export default function HomePage() {
  const [carrinhoAberto, setCarrinhoAberto] = useState(false);
  const [modalMontagemAberto, setModalMontagemAberto] = useState(false);
  const [tamanhoMontagem, setTamanhoMontagem] = useState<"P" | "M" | "G">("M");
  const [categoriaAtiva, setCategoriaAtiva] = useState<
    "monte-seu-poke" | "promocoes" | "sucos" | "bebidas"
  >("monte-seu-poke");

  const { adicionarAoCarrinho } = useCarrinho();

  const handleAbrirMontagem = (tamanho: "P" | "M" | "G" = "M") => {
    setTamanhoMontagem(tamanho);
    setModalMontagemAberto(true);
  };

  const handleAdicionarMontagem = (
    item: ItemCardapio,
    quantidade: number,
    observacao: string,
    montagem?: {
      bases: string[];
      proteinas: string[];
      molhos: string[];
      acompanhamentos: string[];
      crispys: string[];
      proteinasExtras?: string[];
      adicionais?: string[];
      talher?: string;
      precoExtras?: number;
    },
    precoUnitarioCustomizado?: number
  ) => {
    adicionarAoCarrinho(item, quantidade, observacao, montagem, precoUnitarioCustomizado);
  };

  return (
    <>
      <Header
        onAbrirCarrinho={() => setCarrinhoAberto(true)}
        onAbrirMontagem={() => handleAbrirMontagem("M")}
      />

      <main className="flex-1 w-full pb-16 md:pb-0">
        <Hero onAbrirMontagem={() => handleAbrirMontagem("M")} />
        
        <CategoryHighlights
          onAbrirMontagem={() => handleAbrirMontagem("M")}
          onSelecionarCategoria={(cat) => setCategoriaAtiva(cat)}
        />

        <EditorialConcept onAbrirMontagem={() => handleAbrirMontagem("M")} />

        <MenuSection
          categoriaAtiva={categoriaAtiva}
          onMudarCategoria={(cat) => setCategoriaAtiva(cat)}
          onAbrirMontagemComTamanho={(t) => handleAbrirMontagem(t)}
        />

        <OpeningHours />
      </main>

      <Footer />

      <StickyMobileCTA
        onAbrirCarrinho={() => setCarrinhoAberto(true)}
        onAbrirMontagem={() => handleAbrirMontagem("M")}
      />

      <CartDrawer
        aberto={carrinhoAberto}
        onFechar={() => setCarrinhoAberto(false)}
      />

      <ModalMonteSeuPoke
        aberto={modalMontagemAberto}
        tamanhoInicial={tamanhoMontagem}
        onFechar={() => setModalMontagemAberto(false)}
        onAdicionar={handleAdicionarMontagem}
      />
    </>
  );
}
