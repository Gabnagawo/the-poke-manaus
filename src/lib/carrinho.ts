"use client";

import { useState, useEffect } from "react";
import { ItemCardapio } from "@/data/cardapio";

export interface ItemCarrinho {
  idLinha: string;
  itemId: string;
  nome: string;
  categoria: string;
  tamanho?: "P" | "M" | "G";
  precoUnitario: number;
  quantidade: number;
  observacao?: string;
  imagem?: string;
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
  };
}

export type TipoEntrega = "retirada" | "entrega";

export type FormaPagamento = "pix" | "cartao_credito" | "cartao_debito" | "dinheiro";

export interface DadosPedido {
  nomeCliente: string;
  tipoEntrega: TipoEntrega;
  enderecoEntrega?: string;
  bairro?: string;
  complemento?: string;
  pontoReferencia?: string;
  formaPagamento: FormaPagamento;
  trocoPara?: string;
  observacoes?: string;
}

const CHAVE_STORAGE = "thepoke_carrinho_v1";

export function carregarCarrinho(): ItemCarrinho[] {
  if (typeof window === "undefined") return [];
  try {
    const salvo = localStorage.getItem(CHAVE_STORAGE);
    return salvo ? JSON.parse(salvo) : [];
  } catch (err) {
    console.error("Erro ao carregar carrinho do localStorage", err);
    return [];
  }
}

export function salvarCarrinho(itens: ItemCarrinho[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(itens));
    window.dispatchEvent(new CustomEvent("carrinho_atualizado", { detail: itens }));
  } catch (err) {
    console.error("Erro ao salvar carrinho no localStorage", err);
  }
}

export function calcularTotal(itens: ItemCarrinho[]): number {
  return itens.reduce((acc, item) => acc + item.precoUnitario * item.quantidade, 0);
}

export function calcularQuantidadeTotal(itens: ItemCarrinho[]): number {
  return itens.reduce((acc, item) => acc + item.quantidade, 0);
}

// Hook de carrinho reativo com sincronização imediata no mesmo documento e entre abas
export function useCarrinho() {
  const [itens, setItens] = useState<ItemCarrinho[]>([]);
  const [carregado, setCarregado] = useState(false);

  useEffect(() => {
    setItens(carregarCarrinho());
    setCarregado(true);

    const escutarAtualizacaoLocal = (e: Event) => {
      const custom = e as CustomEvent<ItemCarrinho[]>;
      if (custom.detail) {
        setItens(custom.detail);
      } else {
        setItens(carregarCarrinho());
      }
    };

    const escutarStorage = (e: StorageEvent) => {
      if (e.key === CHAVE_STORAGE) {
        setItens(carregarCarrinho());
      }
    };

    window.addEventListener("carrinho_atualizado", escutarAtualizacaoLocal);
    window.addEventListener("storage", escutarStorage);
    return () => {
      window.removeEventListener("carrinho_atualizado", escutarAtualizacaoLocal);
      window.removeEventListener("storage", escutarStorage);
    };
  }, []);

  const atualizarItens = (novos: ItemCarrinho[]) => {
    setItens(novos);
    salvarCarrinho(novos);
  };

  const adicionarAoCarrinho = (
    item: ItemCardapio,
    quantidade = 1,
    observacao = "",
    montagem?: ItemCarrinho["montagem"],
    precoUnitarioCustomizado?: number
  ) => {
    const idLinha = `${item.id}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const novoItem: ItemCarrinho = {
      idLinha,
      itemId: item.id,
      nome: item.nome,
      categoria: item.categoria,
      tamanho: item.tamanho,
      precoUnitario: precoUnitarioCustomizado !== undefined ? precoUnitarioCustomizado : item.preco,
      quantidade,
      observacao: observacao.trim() || undefined,
      imagem: item.imagem,
      montagem,
    };
    const novos = [...carregarCarrinho(), novoItem];
    atualizarItens(novos);
  };

  const alterarQuantidade = (idLinha: string, delta: number) => {
    const atuais = carregarCarrinho();
    const novos = atuais
      .map((item) => {
        if (item.idLinha === idLinha) {
          const novaQtd = item.quantidade + delta;
          return { ...item, quantidade: novaQtd };
        }
        return item;
      })
      .filter((item) => item.quantidade > 0);
    atualizarItens(novos);
  };

  const definirQuantidade = (idLinha: string, quantidade: number) => {
    if (quantidade <= 0) {
      removerDoCarrinho(idLinha);
      return;
    }
    const atuais = carregarCarrinho();
    const novos = atuais.map((item) =>
      item.idLinha === idLinha ? { ...item, quantidade } : item
    );
    atualizarItens(novos);
  };

  const removerDoCarrinho = (idLinha: string) => {
    const atuais = carregarCarrinho();
    atualizarItens(atuais.filter((item) => item.idLinha !== idLinha));
  };

  const atualizarObservacao = (idLinha: string, observacao: string) => {
    const atuais = carregarCarrinho();
    const novos = atuais.map((item) =>
      item.idLinha === idLinha
        ? { ...item, observacao: observacao.trim() || undefined }
        : item
    );
    atualizarItens(novos);
  };

  const limparCarrinho = () => {
    atualizarItens([]);
  };

  return {
    itens,
    carregado,
    quantidadeTotal: calcularQuantidadeTotal(itens),
    total: calcularTotal(itens),
    adicionarAoCarrinho,
    alterarQuantidade,
    definirQuantidade,
    removerDoCarrinho,
    atualizarObservacao,
    limparCarrinho,
  };
}
