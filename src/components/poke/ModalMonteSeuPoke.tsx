"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import {
  REGRAS_TAMANHO,
  RegrasMontagemTamanho,
  BASES_MONTAGEM,
  PROTEINAS_MONTAGEM,
  MOLHOS_MONTAGEM,
  ACOMPANHAMENTOS_MONTAGEM,
  CRISPYS_MONTAGEM,
  PROTEINAS_EXTRAS_MONTAGEM,
  ADICIONAIS_MONTAGEM,
  TALHERES_MONTAGEM,
  OpcaoMontagem,
} from "@/data/montagem";
import { ItemCardapio } from "@/data/cardapio";
import { formatarPreco } from "@/lib/whatsapp";

interface ModalMonteSeuPokeProps {
  aberto: boolean;
  tamanhoInicial?: "P" | "M" | "G";
  onFechar: () => void;
  onAdicionar: (
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
  ) => void;
}

export function ModalMonteSeuPoke({
  aberto,
  tamanhoInicial = "M",
  onFechar,
  onAdicionar,
}: ModalMonteSeuPokeProps) {
  const [tamanho, setTamanho] = useState<"P" | "M" | "G">(tamanhoInicial);
  const [base, setBase] = useState<string>("");
  const [proteinas, setProteinas] = useState<string[]>([]);
  const [molhos, setMolhos] = useState<string[]>([]);
  const [acompanhamentos, setAcompanhamentos] = useState<string[]>([]);
  const [crispys, setCrispys] = useState<string[]>([]);
  const [proteinasExtras, setProteinasExtras] = useState<string[]>([]);
  const [adicionais, setAdicionais] = useState<string[]>([]);
  const [talher, setTalher] = useState<string>("");
  const [observacao, setObservacao] = useState("");
  const [erros, setErros] = useState<{ [etapa: string]: string }>({});

  // Refs para scroll automático em caso de erro de validação
  const refEtapaBase = useRef<HTMLDivElement>(null);
  const refEtapaProteina = useRef<HTMLDivElement>(null);
  const refEtapaAcomp = useRef<HTMLDivElement>(null);
  const refEtapaTalher = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (aberto) {
      setTamanho(tamanhoInicial);
      setErros({});
    }
  }, [aberto, tamanhoInicial]);

  if (!aberto) return null;

  const regra: RegrasMontagemTamanho = REGRAS_TAMANHO[tamanho];

  // Cálculo ao vivo dos preços extras
  const calcularPrecoExtras = (): number => {
    let extra = 0;
    // Proteínas com adicional
    proteinas.forEach((nome) => {
      const op = PROTEINAS_MONTAGEM.find((p) => p.nome === nome);
      if (op?.precoExtra) extra += op.precoExtra;
    });
    // Molhos extras (ex: Molho Fit)
    molhos.forEach((nome) => {
      const op = MOLHOS_MONTAGEM.find((m) => m.nome === nome);
      if (op?.precoExtra) extra += op.precoExtra;
    });
    // Proteínas extras
    proteinasExtras.forEach((nome) => {
      const op = PROTEINAS_EXTRAS_MONTAGEM.find((p) => p.nome === nome);
      if (op?.precoExtra) extra += op.precoExtra;
    });
    // Adicionais extras
    adicionais.forEach((nome) => {
      const op = ADICIONAIS_MONTAGEM.find((a) => a.nome === nome);
      if (op?.precoExtra) extra += op.precoExtra;
    });
    return extra;
  };

  const precoExtras = calcularPrecoExtras();
  const precoTotal = regra.precoBase + precoExtras;

  // Seleção única (Base / Talher)
  const selecionarUnico = (
    tipo: "base" | "talher",
    nome: string
  ) => {
    if (tipo === "base") {
      setBase(nome);
      if (erros.base) {
        setErros((prev) => {
          const n = { ...prev };
          delete n.base;
          return n;
        });
      }
    } else {
      setTalher(nome);
      if (erros.talher) {
        setErros((prev) => {
          const n = { ...prev };
          delete n.talher;
          return n;
        });
      }
    }
  };

  // Seleção múltipla com trava no limite máximo
  const toggleMultiplo = (
    tipo: "proteina" | "molho" | "acompanhamento" | "crispy" | "proteinaExtra" | "adicional",
    nome: string,
    limiteMax: number
  ) => {
    const map = {
      proteina: { get: proteinas, set: setProteinas, erroKey: "proteina" },
      molho: { get: molhos, set: setMolhos, erroKey: "molho" },
      acompanhamento: { get: acompanhamentos, set: setAcompanhamentos, erroKey: "acomp" },
      crispy: { get: crispys, set: setCrispys, erroKey: "crispy" },
      proteinaExtra: { get: proteinasExtras, set: setProteinasExtras, erroKey: "proteinaExtra" },
      adicional: { get: adicionais, set: setAdicionais, erroKey: "adicional" },
    };

    const atual = map[tipo].get;
    const setter = map[tipo].set;
    const erroKey = map[tipo].erroKey;

    if (atual.includes(nome)) {
      setter(atual.filter((item) => item !== nome));
    } else {
      if (atual.length < limiteMax) {
        setter([...atual, nome]);
        if (erros[erroKey]) {
          setErros((prev) => {
            const n = { ...prev };
            delete n[erroKey];
            return n;
          });
        }
      }
    }
  };

  const handleTrocarTamanho = (novoTamanho: "P" | "M" | "G") => {
    setTamanho(novoTamanho);
    const novaRegra = REGRAS_TAMANHO[novoTamanho];
    if (proteinas.length > novaRegra.proteinasMax) {
      setProteinas(proteinas.slice(0, novaRegra.proteinasMax));
    }
    if (acompanhamentos.length > novaRegra.acompanhamentosMax) {
      setAcompanhamentos(acompanhamentos.slice(0, novaRegra.acompanhamentosMax));
    }
    if (crispys.length > novaRegra.crispysMax) {
      setCrispys(crispys.slice(0, novaRegra.crispysMax));
    }
    setErros({});
  };

  const handleConfirmar = () => {
    const novosErros: { [etapa: string]: string } = {};

    // 1. Base obrigatória
    if (!base) {
      novosErros.base = "Escolha 1 base obrigatória para seu poke.";
    }

    // 2. Proteínas obrigatórias por tamanho
    if (proteinas.length < regra.proteinasMin) {
      novosErros.proteina = `Escolha ${regra.proteinasMin} proteína(s) obrigatória(s) para o tamanho ${tamanho} (selecionadas: ${proteinas.length}).`;
    }

    // 3. Acompanhamentos mínimos
    if (acompanhamentos.length < regra.acompanhamentosMin) {
      novosErros.acomp = `Escolha pelo menos ${regra.acompanhamentosMin} acompanhamento(s) para o tamanho ${tamanho}.`;
    }

    // 4. Talher obrigatório
    if (!talher) {
      novosErros.talher = "Selecione uma opção de talher obrigatória.";
    }

    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);

      // Rolagem suave até a primeira etapa que faltou (centralizada para não colidir com o título sticky)
      if (novosErros.base && refEtapaBase.current) {
        refEtapaBase.current.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (novosErros.proteina && refEtapaProteina.current) {
        refEtapaProteina.current.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (novosErros.acomp && refEtapaAcomp.current) {
        refEtapaAcomp.current.scrollIntoView({ behavior: "smooth", block: "center" });
      } else if (novosErros.talher && refEtapaTalher.current) {
        refEtapaTalher.current.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    const itemCardapio: ItemCardapio = {
      id: `poke-${tamanho.toLowerCase()}`,
      nome: regra.nome,
      categoria: "monte-seu-poke",
      preco: precoTotal,
      tamanho: tamanho,
      descricao: `Base: ${base} | Proteínas: ${proteinas.join(", ")}`,
      imagem: `/images/pratos/poke-${tamanho === "P" ? "pequeno" : tamanho === "M" ? "medio" : "grande"}.webp`,
    };

    onAdicionar(
      itemCardapio,
      1,
      observacao,
      {
        bases: [base],
        proteinas,
        molhos,
        acompanhamentos,
        crispys,
        proteinasExtras: proteinasExtras.length > 0 ? proteinasExtras : undefined,
        adicionais: adicionais.length > 0 ? adicionais : undefined,
        talher,
        precoExtras,
      },
      precoTotal
    );

    onFechar();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-montagem-titulo"
      className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/65 backdrop-blur-xs animate-in fade-in duration-200"
    >
      {/* Container: Sheet em tela cheia no celular (h-[94vh]), Modal alto no desktop */}
      <div className="relative w-full md:max-w-3xl h-[92vh] md:h-[88vh] bg-[#FCF9F0] md:rounded-[2px] shadow-2xl flex flex-col overflow-hidden border border-[#0E2A38]/15">
        
        {/* Cabeçalho Fixo do Modal */}
        <div className="px-5 sm:px-8 py-4 bg-[#FCF9F0] border-b border-[#0E2A38]/10 flex items-center justify-between shrink-0">
          <div>
            <h2
              id="modal-montagem-titulo"
              className="font-display font-black text-2xl sm:text-3xl text-[#0E2A38] tracking-tight"
            >
              MONTE SEU POKE
            </h2>
            <p className="text-xs sm:text-sm text-[#59655D] mt-0.5">
              Escolha o tamanho e monte etapa por etapa.
            </p>
          </div>

          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar"
            className="w-11 h-11 flex items-center justify-center text-[#0E2A38] text-2xl font-bold hover:bg-[#0E2A38]/5 rounded-xs transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Corpo Rolável com as Etapas */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-8 py-6 space-y-8 scroll-smooth">
          
          {/* ================================================================ */}
          {/* ETAPA: TAMANHO DO POKE                                           */}
          {/* ================================================================ */}
          <div className="space-y-3">
            <div className="sticky top-0 bg-[#FCF9F0]/95 backdrop-blur-xs py-2 z-10 flex items-baseline justify-between border-b border-[#0E2A38]/10">
              <h3 className="font-display font-bold text-base sm:text-lg text-[#0E2A38]">
                1. TAMANHO DA TIGELA
              </h3>
              <span className="text-xs font-semibold text-[#59655D]">
                Selecione 1
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(["P", "M", "G"] as const).map((t) => {
                const r = REGRAS_TAMANHO[t];
                const selecionado = tamanho === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => handleTrocarTamanho(t)}
                    className={`min-h-[56px] p-4 text-left border rounded-[1px] transition-all flex flex-col justify-between ${
                      selecionado
                        ? "bg-[#0E2A38] text-[#FCF9F0] border-[#0E2A38] shadow-sm"
                        : "bg-white text-[#0E2A38] border-[#0E2A38]/20 hover:border-[#0E2A38]"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-display font-black text-lg">
                        {r.nome}
                      </span>
                      <span className={`text-xs font-bold ${selecionado ? "text-[#F7EA48]" : "text-[#2A7CA1]"}`}>
                        {formatarPreco(r.precoBase)}
                      </span>
                    </div>
                    <span className={`text-xs mt-1 ${selecionado ? "text-[#FCF9F0]/80" : "text-[#59655D]"}`}>
                      {r.proteinasMax} prot. · {r.acompanhamentosMax} acomp. · {r.crispysMax} crispys
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================================ */}
          {/* ETAPA 1: BASES (1 Obrigatória)                                   */}
          {/* ================================================================ */}
          <div ref={refEtapaBase} className="space-y-3 pt-2">
            <div className="sticky top-0 bg-[#FCF9F0]/95 backdrop-blur-xs py-2 z-10 flex items-baseline justify-between border-b border-[#0E2A38]/10">
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#0E2A38]">
                  2. BASE
                </h3>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-xs">
                  Obrigatório
                </span>
              </div>
              <span className="text-xs font-semibold text-[#59655D]">
                {base ? "1 de 1" : "0 de 1"}
              </span>
            </div>

            {erros.base && (
              <p className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xs border border-red-200 flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-red-600 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{erros.base}</span>
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {BASES_MONTAGEM.map((op) => {
                const ativo = base === op.nome;
                return (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => selecionarUnico("base", op.nome)}
                    className={`min-h-[48px] px-4 py-3 text-left border rounded-[1px] transition-all flex items-center justify-between text-xs sm:text-sm font-medium ${
                      ativo
                        ? "bg-[#0E2A38] text-[#FCF9F0] border-[#0E2A38]"
                        : "bg-white text-[#0E2A38] border-[#0E2A38]/15 hover:border-[#0E2A38]"
                    }`}
                  >
                    <span>{op.nome}</span>
                    <span className="text-xs font-bold ml-2">
                      {ativo ? "✓" : "+ R$ 0,00"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================================ */}
          {/* ETAPA 2: PROTEÍNAS (Obrigatório conforme tamanho: P=1, M=2, G=3) */}
          {/* ================================================================ */}
          <div ref={refEtapaProteina} className="space-y-3 pt-2">
            <div className="sticky top-0 bg-[#FCF9F0]/95 backdrop-blur-xs py-2 z-10 flex items-baseline justify-between border-b border-[#0E2A38]/10">
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#0E2A38]">
                  3. PROTEÍNAS
                </h3>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-xs">
                  Obrigatório ({regra.proteinasMax})
                </span>
              </div>
              <span className="text-xs font-semibold text-[#59655D]">
                {proteinas.length} de {regra.proteinasMax}
              </span>
            </div>

            {erros.proteina && (
              <p className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xs border border-red-200 flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-red-600 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{erros.proteina}</span>
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PROTEINAS_MONTAGEM.map((op) => {
                const ativo = proteinas.includes(op.nome);
                const desabilitado = !ativo && proteinas.length >= regra.proteinasMax;
                return (
                  <button
                    key={op.id}
                    type="button"
                    disabled={desabilitado}
                    onClick={() => toggleMultiplo("proteina", op.nome, regra.proteinasMax)}
                    className={`min-h-[48px] px-4 py-3 text-left border rounded-[1px] transition-all flex items-center justify-between text-xs sm:text-sm font-medium ${
                      ativo
                        ? "bg-[#0E2A38] text-[#FCF9F0] border-[#0E2A38]"
                        : desabilitado
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60"
                        : "bg-white text-[#0E2A38] border-[#0E2A38]/15 hover:border-[#0E2A38]"
                    }`}
                  >
                    <div className="flex flex-col">
                      <span>{op.nome}</span>
                      {op.gramatura && (
                        <span className={`text-[10px] ${ativo ? "text-[#FCF9F0]/70" : "text-[#59655D]"}`}>
                          {op.gramatura}
                        </span>
                      )}
                    </div>
                    <span className="text-xs font-bold ml-2">
                      {ativo ? "✓" : op.precoExtra ? `+ ${formatarPreco(op.precoExtra)}` : "+ R$ 0,00"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================================ */}
          {/* ETAPA 3: MOLHOS (Até 2 opções)                                    */}
          {/* ================================================================ */}
          <div className="space-y-3 pt-2">
            <div className="sticky top-0 bg-[#FCF9F0]/95 backdrop-blur-xs py-2 z-10 flex items-baseline justify-between border-b border-[#0E2A38]/10">
              <h3 className="font-display font-bold text-base sm:text-lg text-[#0E2A38]">
                4. MOLHOS
              </h3>
              <span className="text-xs font-semibold text-[#59655D]">
                {molhos.length} de {regra.molhosMax} (opcional)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {MOLHOS_MONTAGEM.map((op) => {
                const ativo = molhos.includes(op.nome);
                const desabilitado = !ativo && molhos.length >= regra.molhosMax;
                return (
                  <button
                    key={op.id}
                    type="button"
                    disabled={desabilitado}
                    onClick={() => toggleMultiplo("molho", op.nome, regra.molhosMax)}
                    className={`min-h-[48px] px-4 py-3 text-left border rounded-[1px] transition-all flex items-center justify-between text-xs sm:text-sm font-medium ${
                      ativo
                        ? "bg-[#0E2A38] text-[#FCF9F0] border-[#0E2A38]"
                        : desabilitado
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60"
                        : "bg-white text-[#0E2A38] border-[#0E2A38]/15 hover:border-[#0E2A38]"
                    }`}
                  >
                    <span>{op.nome}</span>
                    <span className="text-xs font-bold ml-2">
                      {ativo ? "✓" : op.precoExtra ? `+ ${formatarPreco(op.precoExtra)}` : "+ R$ 0,00"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================================ */}
          {/* ETAPA 4: ACOMPANHAMENTOS (Limites por tamanho)                    */}
          {/* ================================================================ */}
          <div ref={refEtapaAcomp} className="space-y-3 pt-2">
            <div className="sticky top-0 bg-[#FCF9F0]/95 backdrop-blur-xs py-2 z-10 flex items-baseline justify-between border-b border-[#0E2A38]/10">
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#0E2A38]">
                  5. ACOMPANHAMENTOS
                </h3>
                {regra.acompanhamentosMin > 0 && (
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-xs">
                    Mín. {regra.acompanhamentosMin}
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold text-[#59655D]">
                {acompanhamentos.length} de {regra.acompanhamentosMax}
              </span>
            </div>

            {erros.acomp && (
              <p className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xs border border-red-200 flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-red-600 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{erros.acomp}</span>
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ACOMPANHAMENTOS_MONTAGEM.map((op) => {
                const ativo = acompanhamentos.includes(op.nome);
                const desabilitado = !ativo && acompanhamentos.length >= regra.acompanhamentosMax;
                return (
                  <button
                    key={op.id}
                    type="button"
                    disabled={desabilitado}
                    onClick={() => toggleMultiplo("acompanhamento", op.nome, regra.acompanhamentosMax)}
                    className={`min-h-[48px] px-4 py-3 text-left border rounded-[1px] transition-all flex items-center justify-between text-xs sm:text-sm font-medium ${
                      ativo
                        ? "bg-[#0E2A38] text-[#FCF9F0] border-[#0E2A38]"
                        : desabilitado
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60"
                        : "bg-white text-[#0E2A38] border-[#0E2A38]/15 hover:border-[#0E2A38]"
                    }`}
                  >
                    <span>{op.nome}</span>
                    <span className="text-xs font-bold ml-2">
                      {ativo ? "✓" : "+ R$ 0,00"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================================ */}
          {/* ETAPA 5: CRISPYS (Limites por tamanho)                            */}
          {/* ================================================================ */}
          <div className="space-y-3 pt-2">
            <div className="sticky top-0 bg-[#FCF9F0]/95 backdrop-blur-xs py-2 z-10 flex items-baseline justify-between border-b border-[#0E2A38]/10">
              <h3 className="font-display font-bold text-base sm:text-lg text-[#0E2A38]">
                6. CRISPYS CROCANTES
              </h3>
              <span className="text-xs font-semibold text-[#59655D]">
                {crispys.length} de {regra.crispysMax} (opcional)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {CRISPYS_MONTAGEM.map((op) => {
                const ativo = crispys.includes(op.nome);
                const desabilitado = !ativo && crispys.length >= regra.crispysMax;
                return (
                  <button
                    key={op.id}
                    type="button"
                    disabled={desabilitado}
                    onClick={() => toggleMultiplo("crispy", op.nome, regra.crispysMax)}
                    className={`min-h-[48px] px-4 py-3 text-left border rounded-[1px] transition-all flex items-center justify-between text-xs sm:text-sm font-medium ${
                      ativo
                        ? "bg-[#0E2A38] text-[#FCF9F0] border-[#0E2A38]"
                        : desabilitado
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60"
                        : "bg-white text-[#0E2A38] border-[#0E2A38]/15 hover:border-[#0E2A38]"
                    }`}
                  >
                    <span>{op.nome}</span>
                    <span className="text-xs font-bold ml-2">
                      {ativo ? "✓" : "+ R$ 0,00"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================================ */}
          {/* ETAPA 6: PROTEÍNAS EXTRAS (Opcional, até 2, cobradas)             */}
          {/* ================================================================ */}
          <div className="space-y-3 pt-2">
            <div className="sticky top-0 bg-[#FCF9F0]/95 backdrop-blur-xs py-2 z-10 flex items-baseline justify-between border-b border-[#0E2A38]/10">
              <h3 className="font-display font-bold text-base sm:text-lg text-[#0E2A38]">
                7. PROTEÍNA EXTRA (OPCIONAL)
              </h3>
              <span className="text-xs font-semibold text-[#59655D]">
                {proteinasExtras.length} de {regra.proteinasExtrasMax}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PROTEINAS_EXTRAS_MONTAGEM.map((op) => {
                const ativo = proteinasExtras.includes(op.nome);
                const desabilitado = !ativo && proteinasExtras.length >= regra.proteinasExtrasMax;
                return (
                  <button
                    key={op.id}
                    type="button"
                    disabled={desabilitado}
                    onClick={() => toggleMultiplo("proteinaExtra", op.nome, regra.proteinasExtrasMax)}
                    className={`min-h-[48px] px-4 py-3 text-left border rounded-[1px] transition-all flex items-center justify-between text-xs sm:text-sm font-medium ${
                      ativo
                        ? "bg-[#0E2A38] text-[#FCF9F0] border-[#0E2A38]"
                        : desabilitado
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-60"
                        : "bg-white text-[#0E2A38] border-[#0E2A38]/15 hover:border-[#0E2A38]"
                    }`}
                  >
                    <span>{op.nome}</span>
                    <span className="text-xs font-bold ml-2 text-amber-700">
                      {ativo ? "✓" : `+ ${formatarPreco(op.precoExtra || 0)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================================ */}
          {/* ETAPA 7: ADICIONAIS (Opcional, até 4, cobrado)                    */}
          {/* ================================================================ */}
          <div className="space-y-3 pt-2">
            <div className="sticky top-0 bg-[#FCF9F0]/95 backdrop-blur-xs py-2 z-10 flex items-baseline justify-between border-b border-[#0E2A38]/10">
              <h3 className="font-display font-bold text-base sm:text-lg text-[#0E2A38]">
                8. ADICIONAIS (OPCIONAL)
              </h3>
              <span className="text-xs font-semibold text-[#59655D]">
                {adicionais.length} de {regra.adicionaisMax}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {ADICIONAIS_MONTAGEM.map((op) => {
                const ativo = adicionais.includes(op.nome);
                return (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => toggleMultiplo("adicional", op.nome, regra.adicionaisMax)}
                    className={`min-h-[48px] px-4 py-3 text-left border rounded-[1px] transition-all flex items-center justify-between text-xs sm:text-sm font-medium ${
                      ativo
                        ? "bg-[#0E2A38] text-[#FCF9F0] border-[#0E2A38]"
                        : "bg-white text-[#0E2A38] border-[#0E2A38]/15 hover:border-[#0E2A38]"
                    }`}
                  >
                    <span>{op.nome}</span>
                    <span className="text-xs font-bold ml-2 text-amber-700">
                      {ativo ? "✓" : `+ ${formatarPreco(op.precoExtra || 0)}`}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================================ */}
          {/* ETAPA 8: TALHER (1 Obrigatório)                                   */}
          {/* ================================================================ */}
          <div ref={refEtapaTalher} className="space-y-3 pt-2">
            <div className="sticky top-0 bg-[#FCF9F0]/95 backdrop-blur-xs py-2 z-10 flex items-baseline justify-between border-b border-[#0E2A38]/10">
              <div className="flex items-center space-x-2">
                <h3 className="font-display font-bold text-base sm:text-lg text-[#0E2A38]">
                  9. ESCOLHA SEU TALHER
                </h3>
                <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-xs">
                  Obrigatório
                </span>
              </div>
              <span className="text-xs font-semibold text-[#59655D]">
                {talher ? "1 de 1" : "0 de 1"}
              </span>
            </div>

            {erros.talher && (
              <p className="text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xs border border-red-200 flex items-center space-x-2">
                <svg
                  className="w-4 h-4 text-red-600 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{erros.talher}</span>
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {TALHERES_MONTAGEM.map((op) => {
                const ativo = talher === op.nome;
                return (
                  <button
                    key={op.id}
                    type="button"
                    onClick={() => selecionarUnico("talher", op.nome)}
                    className={`min-h-[48px] px-4 py-3 text-left border rounded-[1px] transition-all flex items-center justify-between text-xs sm:text-sm font-medium ${
                      ativo
                        ? "bg-[#0E2A38] text-[#FCF9F0] border-[#0E2A38]"
                        : "bg-white text-[#0E2A38] border-[#0E2A38]/15 hover:border-[#0E2A38]"
                    }`}
                  >
                    <span>{op.nome}</span>
                    <span className="text-xs font-bold ml-2">
                      {ativo ? "✓" : "Grátis"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================================================================ */}
          {/* ETAPA 9: OBSERVAÇÕES ESPECIAIS (máx 140 caracteres)               */}
          {/* ================================================================ */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between items-baseline">
              <label
                htmlFor="obs-poke"
                className="font-display font-bold text-xs uppercase tracking-wider text-[#0E2A38]"
              >
                Algum comentário? (Observações para este poke)
              </label>
              <span className="text-[11px] text-[#59655D]">
                {observacao.length}/140
              </span>
            </div>

            <input
              id="obs-poke"
              type="text"
              maxLength={140}
              placeholder="Ex: Molho à parte, sem cebola, bastante gergelim..."
              value={observacao}
              onChange={(e) => setObservacao(e.target.value)}
              className="w-full text-xs sm:text-sm px-4 py-3 bg-white border border-[#0E2A38]/20 rounded-[1px] focus:outline-none focus:border-[#2A7CA1]"
            />
          </div>

        </div>

        {/* Rodapé Fixo com Total ao Vivo e Botão de Adição */}
        <div className="px-5 sm:px-8 py-4 bg-[#FCF9F0] border-t border-[#0E2A38]/15 flex items-center justify-between shrink-0 shadow-lg">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#59655D] font-bold block">
              Total deste Poke
            </span>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-display font-black text-2xl text-[#0E2A38]">
                {formatarPreco(precoTotal)}
              </span>
              {precoExtras > 0 && (
                <span className="text-xs font-semibold text-amber-700">
                  (inclui {formatarPreco(precoExtras)} em extras)
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={onFechar}
              className="hidden sm:inline-block text-xs font-display font-bold uppercase tracking-wider text-[#59655D] hover:text-[#0E2A38] px-4 py-2"
            >
              Cancelar
            </button>

            <button
              type="button"
              onClick={handleConfirmar}
              className="btn-limon h-12 px-6 sm:px-8 text-xs sm:text-sm font-extrabold shadow-md"
            >
              ADICIONAR À SACOLA →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
