"use client";

// Estado do pedido em um só lugar: sacola (localStorage), janela de montagem,
// sacola aberta/fechada, aviso de "adicionado" e dados do cliente.

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { ItemCardapio } from "@/data/cardapio";
import {
  configPorChave,
  configReceita,
  configTamanho,
  precoExtras,
  resumoMontagem,
  type ConfigMontagem,
  type SelecaoMontagem,
  type Tamanho,
} from "@/data/montagem";

export interface LinhaSacola {
  idLinha: string;
  itemId: string;
  nome: string;
  categoria: ItemCardapio["categoria"];
  foto?: string;
  precoUnitario: number;
  quantidade: number;
  observacao?: string;
  montagem?: {
    chave: string;
    selecao: SelecaoMontagem;
    resumo: { titulo: string; itens: string[] }[];
    precoExtras: number;
  };
}

export type TipoEntrega = "retirada" | "entrega";
export type FormaPagamento = "pix" | "credito" | "debito" | "dinheiro";

export interface DadosCliente {
  nome: string;
  tipoEntrega: TipoEntrega;
  endereco: string;
  bairro: string;
  complemento: string;
  referencia: string;
  pagamento: FormaPagamento;
  troco: string;
  observacoes: string;
}

export const CLIENTE_VAZIO: DadosCliente = {
  nome: "",
  tipoEntrega: "entrega",
  endereco: "",
  bairro: "",
  complemento: "",
  referencia: "",
  pagamento: "pix",
  troco: "",
  observacoes: "",
};

interface EstadoMontagem {
  aberta: boolean;
  config: ConfigMontagem;
  foto?: string;
  selecao: SelecaoMontagem;
  quantidade: number;
  observacao: string;
  /** Quando preenchido, a montagem substitui essa linha da sacola (edição). */
  idLinha?: string;
  /** Muda a cada abertura, para a janela reiniciar o estado interno. */
  versao: number;
}

interface ContextoPedido {
  pronta: boolean;
  linhas: LinhaSacola[];
  quantidadeTotal: number;
  subtotal: number;
  quantidadeDoItem: (itemId: string) => number;
  adicionarItem: (item: ItemCardapio) => void;
  removerUmDoItem: (itemId: string) => void;
  alterarQuantidade: (idLinha: string, delta: number) => void;
  removerLinha: (idLinha: string) => void;
  definirObservacao: (idLinha: string, texto: string) => void;
  limpar: () => void;

  montagem: EstadoMontagem | null;
  abrirMontagem: (tamanho?: Tamanho) => void;
  abrirReceita: (item: ItemCardapio) => void;
  editarLinha: (idLinha: string) => void;
  fecharMontagem: () => void;
  confirmarMontagem: (config: ConfigMontagem, foto: string | undefined, selecao: SelecaoMontagem, quantidade: number, observacao: string) => void;

  sacolaAberta: boolean;
  abrirSacola: () => void;
  fecharSacola: () => void;

  aviso: { id: number; texto: string } | null;

  cliente: DadosCliente;
  salvarCliente: (dados: DadosCliente) => void;
}

const Contexto = createContext<ContextoPedido | null>(null);

const CHAVE_SACOLA = "thepoke_sacola_v2";
const CHAVE_CLIENTE = "thepoke_cliente_v1";

function ler<T>(chave: string, padrao: T): T {
  try {
    const bruto = localStorage.getItem(chave);
    return bruto ? (JSON.parse(bruto) as T) : padrao;
  } catch {
    return padrao;
  }
}

function gravar(chave: string, valor: unknown) {
  try {
    localStorage.setItem(chave, JSON.stringify(valor));
  } catch {
    // modo anônimo ou armazenamento cheio: o pedido segue só na memória
  }
}

const novoId = () => `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;

export function PedidoProvider({ children }: { children: ReactNode }) {
  const [linhas, setLinhas] = useState<LinhaSacola[]>([]);
  const [pronta, setPronta] = useState(false);
  const [montagem, setMontagem] = useState<EstadoMontagem | null>(null);
  const [sacolaAberta, setSacolaAberta] = useState(false);
  const [aviso, setAviso] = useState<{ id: number; texto: string } | null>(null);
  const [cliente, setCliente] = useState<DadosCliente>(CLIENTE_VAZIO);
  const versao = useRef(0);
  const timerAviso = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Carrega a sacola salva e acompanha outras abas
  useEffect(() => {
    const salvas = ler<LinhaSacola[]>(CHAVE_SACOLA, []);
    setLinhas(Array.isArray(salvas) ? salvas.filter((l) => l && l.idLinha && l.quantidade > 0) : []);
    setCliente({ ...CLIENTE_VAZIO, ...ler<Partial<DadosCliente>>(CHAVE_CLIENTE, {}) });
    setPronta(true);
    const aoMudar = (e: StorageEvent) => {
      if (e.key === CHAVE_SACOLA) setLinhas(ler<LinhaSacola[]>(CHAVE_SACOLA, []));
    };
    window.addEventListener("storage", aoMudar);
    return () => window.removeEventListener("storage", aoMudar);
  }, []);

  useEffect(() => {
    if (pronta) gravar(CHAVE_SACOLA, linhas);
  }, [linhas, pronta]);

  const avisar = useCallback((texto: string) => {
    if (timerAviso.current) clearTimeout(timerAviso.current);
    setAviso({ id: Date.now(), texto });
    timerAviso.current = setTimeout(() => setAviso(null), 2800);
  }, []);

  const adicionarItem = useCallback(
    (item: ItemCardapio) => {
      setLinhas((atuais) => {
        const i = atuais.findIndex((l) => l.itemId === item.id && !l.montagem && !l.observacao);
        if (i >= 0) {
          const copia = [...atuais];
          copia[i] = { ...copia[i], quantidade: copia[i].quantidade + 1 };
          return copia;
        }
        return [
          ...atuais,
          {
            idLinha: novoId(),
            itemId: item.id,
            nome: item.nome,
            categoria: item.categoria,
            foto: item.foto,
            precoUnitario: item.preco,
            quantidade: 1,
          },
        ];
      });
      avisar(`${item.nome} na sacola`);
    },
    [avisar],
  );

  const removerUmDoItem = useCallback((itemId: string) => {
    setLinhas((atuais) => {
      // tira da última linha simples desse item
      for (let i = atuais.length - 1; i >= 0; i--) {
        const l = atuais[i];
        if (l.itemId === itemId && !l.montagem) {
          const copia = [...atuais];
          if (l.quantidade <= 1) copia.splice(i, 1);
          else copia[i] = { ...l, quantidade: l.quantidade - 1 };
          return copia;
        }
      }
      return atuais;
    });
  }, []);

  const quantidadeDoItem = useCallback(
    (itemId: string) => linhas.filter((l) => l.itemId === itemId && !l.montagem).reduce((a, l) => a + l.quantidade, 0),
    [linhas],
  );

  const alterarQuantidade = useCallback((idLinha: string, delta: number) => {
    setLinhas((atuais) =>
      atuais
        .map((l) => (l.idLinha === idLinha ? { ...l, quantidade: Math.min(99, l.quantidade + delta) } : l))
        .filter((l) => l.quantidade > 0),
    );
  }, []);

  const removerLinha = useCallback((idLinha: string) => {
    setLinhas((atuais) => atuais.filter((l) => l.idLinha !== idLinha));
  }, []);

  const definirObservacao = useCallback((idLinha: string, texto: string) => {
    setLinhas((atuais) =>
      atuais.map((l) => (l.idLinha === idLinha ? { ...l, observacao: texto.slice(0, 140) || undefined } : l)),
    );
  }, []);

  const limpar = useCallback(() => setLinhas([]), []);

  // ---------------------------------------------------------------- montagem
  const abrirComConfig = useCallback(
    (config: ConfigMontagem, extra: Partial<EstadoMontagem> = {}) => {
      versao.current += 1;
      setSacolaAberta(false);
      setMontagem({
        aberta: true,
        config,
        selecao: {},
        quantidade: 1,
        observacao: "",
        versao: versao.current,
        ...extra,
      });
    },
    [],
  );

  const abrirMontagem = useCallback(
    (tamanho: Tamanho = "M") => {
      const fotos: Record<Tamanho, string> = { P: "poke-pequeno", M: "poke-medio", G: "poke-grande" };
      abrirComConfig(configTamanho(tamanho), { foto: fotos[tamanho] });
    },
    [abrirComConfig],
  );

  const abrirReceita = useCallback(
    (item: ItemCardapio) => {
      const config = configReceita(item.id, item.nome, item.preco);
      if (config) abrirComConfig(config, { foto: item.foto });
      else adicionarItem(item);
    },
    [abrirComConfig, adicionarItem],
  );

  const editarLinha = useCallback(
    (idLinha: string) => {
      const linha = linhas.find((l) => l.idLinha === idLinha);
      if (!linha?.montagem) return;
      const config = configPorChave(linha.montagem.chave, linha.nome, linha.precoUnitario - linha.montagem.precoExtras);
      if (!config) return;
      abrirComConfig(config, {
        foto: linha.foto,
        selecao: linha.montagem.selecao,
        quantidade: linha.quantidade,
        observacao: linha.observacao ?? "",
        idLinha,
      });
    },
    [linhas, abrirComConfig],
  );

  const fecharMontagem = useCallback(() => {
    setMontagem((m) => (m ? { ...m, aberta: false } : m));
  }, []);

  const confirmarMontagem = useCallback(
    (config: ConfigMontagem, foto: string | undefined, selecao: SelecaoMontagem, quantidade: number, observacao: string) => {
      if (!montagem) return;
      const { idLinha } = montagem;
      const extras = precoExtras(config, selecao);
      const categoria: LinhaSacola["categoria"] = ["P", "M", "G"].includes(config.chave) ? "monte-seu-poke" : "promocoes";
      const linha: LinhaSacola = {
        idLinha: idLinha ?? novoId(),
        itemId: config.itemId,
        nome: config.nome,
        categoria,
        foto,
        precoUnitario: Math.round((config.precoBase + extras) * 100) / 100,
        quantidade,
        observacao: observacao.trim().slice(0, 140) || undefined,
        montagem: { chave: config.chave, selecao, resumo: resumoMontagem(config, selecao), precoExtras: extras },
      };
      setLinhas((atuais) =>
        idLinha ? atuais.map((l) => (l.idLinha === idLinha ? linha : l)) : [...atuais, linha],
      );
      setMontagem((m) => (m ? { ...m, aberta: false } : m));
      avisar(idLinha ? `${config.nome} atualizado` : `${config.nome} na sacola`);
    },
    [montagem, avisar],
  );

  const abrirSacola = useCallback(() => {
    setMontagem((m) => (m ? { ...m, aberta: false } : m));
    setSacolaAberta(true);
  }, []);
  const fecharSacola = useCallback(() => setSacolaAberta(false), []);

  const salvarCliente = useCallback((dados: DadosCliente) => {
    setCliente(dados);
    // guarda nome e endereço para o próximo pedido (só neste aparelho)
    gravar(CHAVE_CLIENTE, { ...dados, observacoes: "", troco: "" });
  }, []);

  const quantidadeTotal = linhas.reduce((a, l) => a + l.quantidade, 0);
  const subtotal = Math.round(linhas.reduce((a, l) => a + l.precoUnitario * l.quantidade, 0) * 100) / 100;

  const valor = useMemo<ContextoPedido>(
    () => ({
      pronta,
      linhas,
      quantidadeTotal,
      subtotal,
      quantidadeDoItem,
      adicionarItem,
      removerUmDoItem,
      alterarQuantidade,
      removerLinha,
      definirObservacao,
      limpar,
      montagem,
      abrirMontagem,
      abrirReceita,
      editarLinha,
      fecharMontagem,
      confirmarMontagem,
      sacolaAberta,
      abrirSacola,
      fecharSacola,
      aviso,
      cliente,
      salvarCliente,
    }),
    [
      pronta,
      linhas,
      quantidadeTotal,
      subtotal,
      quantidadeDoItem,
      adicionarItem,
      removerUmDoItem,
      alterarQuantidade,
      removerLinha,
      definirObservacao,
      limpar,
      montagem,
      abrirMontagem,
      abrirReceita,
      editarLinha,
      fecharMontagem,
      confirmarMontagem,
      sacolaAberta,
      abrirSacola,
      fecharSacola,
      aviso,
      cliente,
      salvarCliente,
    ],
  );

  return <Contexto.Provider value={valor}>{children}</Contexto.Provider>;
}

export function usePedido() {
  const ctx = useContext(Contexto);
  if (!ctx) throw new Error("usePedido precisa estar dentro de <PedidoProvider>");
  return ctx;
}
