"use client";

// Janela "Monte seu poke": etapas com limites por tamanho (dados reais do briefing do cliente).
// Celular: tela quase cheia vinda de baixo, abas das etapas fixas no topo e o total
// fixo embaixo. Desktop: modal central com a mesma estrutura.

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePedido } from "@/lib/pedido";
import {
  REGRAS_TAMANHO,
  configTamanho,
  etapasPendentes,
  precoExtras,
  totalEtapa,
  type ConfigMontagem,
  type EtapaMontagem,
  type SelecaoMontagem,
  type Tamanho,
} from "@/data/montagem";
import { formatarPreco } from "@/lib/whatsapp";
import { dimensoes, fotoSrc } from "@/lib/fotos";
import { Painel } from "@/components/ui/Painel";
import { Contador } from "@/components/ui/Contador";
import { IconeCheck, IconeFechar, IconeMais } from "@/components/ui/Icones";

const FOTO_TAMANHO: Record<Tamanho, string> = { P: "poke-pequeno", M: "poke-medio", G: "poke-grande" };

function regraTexto(e: EtapaMontagem) {
  if (e.tipo === "quantidade") return `Opcional, até ${e.max}`;
  if (e.min === e.max) return e.min === 1 ? "Escolha 1" : `Escolha ${e.min}`;
  if (e.min === 0) return `Opcional, até ${e.max}`;
  return `De ${e.min} a ${e.max}`;
}

function resumoTamanho(t: Tamanho) {
  const r = REGRAS_TAMANHO[t];
  return `${r.proteinasMax} ${r.proteinasMax === 1 ? "proteína" : "proteínas"} · até ${r.acompanhamentosMax} acomp. · até ${r.crispysMax} ${
    r.crispysMax === 1 ? "crispy" : "crispys"
  }`;
}

interface CorpoProps {
  configInicial: ConfigMontagem;
  fotoInicial?: string;
  selecaoInicial: SelecaoMontagem;
  quantidadeInicial: number;
  observacaoInicial: string;
  editando: boolean;
  onFechar: () => void;
}

function CorpoMontagem({
  configInicial,
  fotoInicial,
  selecaoInicial,
  quantidadeInicial,
  observacaoInicial,
  editando,
  onFechar,
}: CorpoProps) {
  const { confirmarMontagem } = usePedido();
  const porTamanho = ["P", "M", "G"].includes(configInicial.chave);
  const [tamanho, setTamanho] = useState<Tamanho>(porTamanho ? (configInicial.chave as Tamanho) : "M");
  const config = useMemo(() => (porTamanho ? configTamanho(tamanho) : configInicial), [porTamanho, tamanho, configInicial]);
  const foto = porTamanho ? FOTO_TAMANHO[tamanho] : fotoInicial;

  const [selecao, setSelecao] = useState<SelecaoMontagem>(selecaoInicial);
  const [quantidade, setQuantidade] = useState(quantidadeInicial);
  const [observacao, setObservacao] = useState(observacaoInicial);
  const [erros, setErros] = useState<Set<string>>(new Set());
  const [tremendo, setTremendo] = useState<string | null>(null);
  const [aviso, setAviso] = useState<{ etapa: string; texto: string } | null>(null);
  const [ativa, setAtiva] = useState(config.etapas[0].id);

  const rolagem = useRef<HTMLDivElement>(null);
  const trilho = useRef<HTMLDivElement>(null);
  const secoes = useRef<Record<string, HTMLElement | null>>({});
  const abas = useRef<Record<string, HTMLButtonElement | null>>({});

  const pendentes = etapasPendentes(config, selecao);
  const extras = precoExtras(config, selecao);
  const unitario = config.precoBase + extras;
  const total = unitario * quantidade;

  // --------------------------------------------------------------- rolagem
  const rolarAte = useCallback((id: string) => {
    const caixa = rolagem.current;
    const alvo = secoes.current[id];
    if (!caixa || !alvo) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    caixa.scrollTo({ top: alvo.offsetTop - 64, behavior: reduzir ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const caixa = rolagem.current;
    if (!caixa) return;
    let quadro = 0;
    const calcular = () => {
      quadro = 0;
      let atual = config.etapas[0].id;
      for (const e of config.etapas) {
        const s = secoes.current[e.id];
        if (s && s.offsetTop - caixa.scrollTop <= 120) atual = e.id;
      }
      setAtiva(atual);
    };
    const aoRolar = () => {
      if (!quadro) quadro = requestAnimationFrame(calcular);
    };
    caixa.addEventListener("scroll", aoRolar, { passive: true });
    return () => {
      caixa.removeEventListener("scroll", aoRolar);
      if (quadro) cancelAnimationFrame(quadro);
    };
  }, [config]);

  useEffect(() => {
    const aba = abas.current[ativa];
    const t = trilho.current;
    if (!aba || !t) return;
    t.scrollTo({ left: Math.max(0, aba.offsetLeft - 16), behavior: "smooth" });
  }, [ativa]);

  // --------------------------------------------------------------- seleção
  const limparErro = (id: string) =>
    setErros((atual) => {
      if (!atual.has(id)) return atual;
      const n = new Set(atual);
      n.delete(id);
      return n;
    });

  const avancarSeCompletou = (etapa: EtapaMontagem, novoTotal: number, antes: number) => {
    const completou = antes < etapa.max && novoTotal === etapa.max && (etapa.tipo === "unica" || etapa.min === etapa.max);
    if (!completou) return;
    const i = config.etapas.findIndex((e) => e.id === etapa.id);
    const proxima = config.etapas[i + 1];
    if (proxima) setTimeout(() => rolarAte(proxima.id), 260);
  };

  const tocar = (etapa: EtapaMontagem, opcaoId: string) => {
    setAviso(null);
    const atual = selecao[etapa.id] ?? {};
    const antes = totalEtapa(selecao, etapa);

    if (etapa.tipo === "unica") {
      if (atual[opcaoId]) return;
      setSelecao((s) => ({ ...s, [etapa.id]: { [opcaoId]: 1 } }));
      limparErro(etapa.id);
      avancarSeCompletou(etapa, 1, antes);
      return;
    }

    if (atual[opcaoId]) {
      const { [opcaoId]: _removido, ...resto } = atual;
      void _removido;
      setSelecao((s) => ({ ...s, [etapa.id]: resto }));
      return;
    }

    if (antes >= etapa.max) {
      setAviso({
        etapa: etapa.id,
        texto: `Você já escolheu ${etapa.max}. Desmarque uma opção para trocar.`,
      });
      setTremendo(etapa.id);
      setTimeout(() => setTremendo(null), 420);
      return;
    }
    setSelecao((s) => ({ ...s, [etapa.id]: { ...atual, [opcaoId]: 1 } }));
    if (antes + 1 >= etapa.min) limparErro(etapa.id);
    avancarSeCompletou(etapa, antes + 1, antes);
  };

  const mudarQuantidade = (etapa: EtapaMontagem, opcaoId: string, delta: number) => {
    setAviso(null);
    const atual = selecao[etapa.id] ?? {};
    const antes = totalEtapa(selecao, etapa);
    if (delta > 0 && antes >= etapa.max) {
      setAviso({ etapa: etapa.id, texto: `O limite desta etapa é ${etapa.max}.` });
      setTremendo(etapa.id);
      setTimeout(() => setTremendo(null), 420);
      return;
    }
    const nova = Math.max(0, (atual[opcaoId] ?? 0) + delta);
    const copia = { ...atual };
    if (nova === 0) delete copia[opcaoId];
    else copia[opcaoId] = nova;
    setSelecao((s) => ({ ...s, [etapa.id]: copia }));
  };

  const trocarTamanho = (t: Tamanho) => {
    if (t === tamanho) return;
    const novo = configTamanho(t);
    // corta o que passar do novo limite
    setSelecao((s) => {
      const n: SelecaoMontagem = { ...s };
      for (const e of novo.etapas) {
        const escolhas = Object.entries(n[e.id] ?? {});
        let soma = 0;
        const mantidas: Record<string, number> = {};
        for (const [id, q] of escolhas) {
          const cabe = Math.min(q, e.max - soma);
          if (cabe > 0) {
            mantidas[id] = cabe;
            soma += cabe;
          }
        }
        n[e.id] = mantidas;
      }
      return n;
    });
    setTamanho(t);
    setAviso(null);
  };

  const adicionar = () => {
    if (pendentes.length) {
      const primeira = pendentes[0];
      setErros(new Set(pendentes.map((e) => e.id)));
      rolarAte(primeira.id);
      setTremendo(primeira.id);
      setTimeout(() => setTremendo(null), 420);
      return;
    }
    confirmarMontagem(config, foto, selecao, quantidade, observacao);
  };

  const faltando = pendentes
    .map((e) => (e.min > 1 ? `${e.titulo.toLowerCase()} (${totalEtapa(selecao, e)} de ${e.min})` : e.titulo.toLowerCase()))
    .join(", ");

  return (
    <>
      {/* Cabeçalho */}
      <div className="shrink-0 border-b border-petroleo/10 bg-creme">
        <div className="mx-auto w-full flex items-start gap-3 px-5 pt-3 md:pt-6">
          <div className="md:hidden absolute left-1/2 top-1.5 -translate-x-1/2 w-10 h-1 rounded-full bg-petroleo/20" aria-hidden />
          <div className="flex-1 min-w-0 pt-2">
            <h2 className="titulo text-[26px] md:text-[34px]">{config.nome}</h2>
            <p className="mt-1 text-[14px] text-tinta-suave">{porTamanho ? "Monte etapa por etapa" : "Receita da casa"}</p>
          </div>
          <button
            type="button"
            onClick={onFechar}
            className="mt-1 -mr-2 grid place-items-center w-11 h-11 rounded-full hover:bg-petroleo/5 active:bg-petroleo/10"
            aria-label="Fechar"
          >
            <IconeFechar />
          </button>
        </div>

        {/* Abas das etapas */}
        <div ref={trilho} className="sem-barra flex gap-2 overflow-x-auto px-5 py-3" aria-label="Etapas">
          {config.etapas.map((e) => {
            const n = totalEtapa(selecao, e);
            const ok = n >= e.min && (e.min > 0 || n > 0);
            const erro = erros.has(e.id) && n < e.min;
            const sel = ativa === e.id;
            return (
              <button
                key={e.id}
                ref={(el) => {
                  abas.current[e.id] = el;
                }}
                type="button"
                onClick={() => rolarAte(e.id)}
                className={`shrink-0 inline-flex items-center gap-1.5 h-9 px-3.5 rounded-full text-[13px] font-medium border transition-colors ${
                  erro
                    ? "border-erro text-erro bg-superficie"
                    : ok
                      ? "bg-amarelo border-amarelo text-tinta-escura"
                      : sel
                        ? "border-petroleo text-petroleo bg-superficie"
                        : "border-petroleo/20 text-petroleo/80 bg-superficie"
                }`}
              >
                {ok && !erro && <IconeCheck className="w-3.5 h-3.5" />}
                {e.titulo}
                {e.max > 1 && e.tipo !== "quantidade" && n > 0 && (
                  <span className="num opacity-80">
                    {n}/{e.max}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Etapas */}
      <div ref={rolagem} className="painel-rolagem relative flex-1 overflow-y-auto">
        <div className="px-5 pt-5 pb-8">
          {/* Tamanho / proteína fixa */}
          <div className="flex gap-4 items-center">
            <div className="relative shrink-0 w-[84px] h-[84px] rounded-[16px] bg-areia overflow-hidden">
              {foto && (
                <img src={fotoSrc(foto, 200)} {...dimensoes(foto)} alt="" className="foto-prato absolute inset-0 m-auto w-[88%] h-[88%] object-contain" />
              )}
            </div>
            <p className="text-[15px] leading-[1.45] text-tinta-suave">
              {porTamanho ? (
                <>A base é sempre 1. Os molhos vão até 2. Os extras pagos somam no total na hora.</>
              ) : (
                <>
                  Proteína da receita: <strong className="text-petroleo font-bold">{config.fixo}</strong>. Escolha o resto abaixo.
                </>
              )}
            </p>
          </div>

          {porTamanho && (
            <div className="mt-6" role="radiogroup" aria-label="Tamanho">
              <h3 className="text-[18px] font-bold">Tamanho</h3>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {(["P", "M", "G"] as Tamanho[]).map((t) => {
                  const sel = t === tamanho;
                  return (
                    <button
                      key={t}
                      type="button"
                      role="radio"
                      aria-checked={sel}
                      onClick={() => trocarTamanho(t)}
                      className={`rounded-[14px] border-[1.5px] px-2 py-3 text-center transition-colors ${
                        sel ? "bg-amarelo border-amarelo text-tinta-escura" : "border-petroleo/15 bg-superficie hover:border-petroleo/40"
                      }`}
                    >
                      <span className="block text-[15px] font-bold">{REGRAS_TAMANHO[t].nome.replace("Poke ", "")}</span>
                      <span className="block text-[14px] num mt-0.5 opacity-90">{formatarPreco(REGRAS_TAMANHO[t].precoBase)}</span>
                    </button>
                  );
                })}
              </div>
              <p className="mt-2 text-[13px] text-tinta-suave">{resumoTamanho(tamanho)}</p>
            </div>
          )}

          {config.etapas.map((e) => {
            const n = totalEtapa(selecao, e);
            const erro = erros.has(e.id) && n < e.min;
            const completa = n >= e.min && e.min > 0;
            return (
              <section
                key={e.id}
                ref={(el) => {
                  secoes.current[e.id] = el;
                }}
                className="pt-8"
                aria-labelledby={`etapa-${e.id}`}
              >
                <div className={`flex items-baseline justify-between gap-3 ${tremendo === e.id ? "tremer" : ""}`}>
                  <div>
                    <h3 id={`etapa-${e.id}`} className="text-[18px] font-bold">
                      {e.titulo}
                    </h3>
                    <p className={`text-[14px] mt-0.5 ${erro ? "text-erro font-medium" : "text-tinta-suave"}`}>
                      {erro ? (e.min > 1 ? `Escolha ${e.min} para continuar` : "Escolha 1 para continuar") : regraTexto(e)}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 text-[13px] font-bold num ${
                      completa ? "text-ok" : e.min > 0 ? "text-petroleo" : "text-tinta-suave"
                    }`}
                  >
                    {completa ? (
                      <span className="inline-flex items-center gap-1">
                        <IconeCheck className="w-4 h-4" />
                        {e.max > 1 ? `${n}/${e.max}` : "ok"}
                      </span>
                    ) : e.min > 0 ? (
                      `${n}/${e.min === e.max ? e.max : e.min}`
                    ) : n > 0 ? (
                      `${n}/${e.max}`
                    ) : (
                      ""
                    )}
                  </span>
                </div>

                {aviso?.etapa === e.id && (
                  <p className="mt-2 text-[14px] font-medium text-erro" role="alert">
                    {aviso.texto}
                  </p>
                )}

                {e.tipo === "quantidade" ? (
                  <ul className="mt-3 grid md:grid-cols-2 gap-2">
                    {e.opcoes.map((o) => {
                      const q = selecao[e.id]?.[o.id] ?? 0;
                      return (
                        <li
                          key={o.id}
                          className={`flex items-center gap-3 rounded-[14px] border-[1.5px] bg-superficie pl-3.5 pr-1.5 py-1.5 min-h-[56px] ${
                            q > 0 ? "border-petroleo" : "border-petroleo/12"
                          }`}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-[15px] font-medium leading-tight">{o.nome}</p>
                            <p className="text-[13px] text-tinta-suave num mt-0.5">+ {formatarPreco(o.precoExtra ?? 0)}</p>
                          </div>
                          {q > 0 ? (
                            <Contador
                              valor={q}
                              rotulo={o.nome}
                              onMais={() => mudarQuantidade(e, o.id, 1)}
                              onMenos={() => mudarQuantidade(e, o.id, -1)}
                              semMais={n >= e.max}
                            />
                          ) : (
                            <button
                              type="button"
                              onClick={() => mudarQuantidade(e, o.id, 1)}
                              className="grid place-items-center w-11 h-11 rounded-full bg-creme-2"
                              aria-label={`Adicionar ${o.nome}`}
                            >
                              <IconeMais />
                            </button>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div
                    className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2"
                    role={e.tipo === "unica" ? "radiogroup" : "group"}
                    aria-labelledby={`etapa-${e.id}`}
                  >
                    {e.opcoes.map((o) => {
                      const sel = !!selecao[e.id]?.[o.id];
                      const cheio = !sel && e.tipo === "multipla" && n >= e.max;
                      return (
                        <button
                          key={o.id}
                          type="button"
                          role={e.tipo === "unica" ? "radio" : "checkbox"}
                          aria-checked={sel}
                          onClick={() => tocar(e, o.id)}
                          className={`relative text-left rounded-[14px] border-[1.5px] px-3.5 py-2.5 min-h-[56px] transition-[background-color,border-color,opacity] duration-150 active:scale-[0.98] ${
                            sel
                              ? "bg-amarelo border-amarelo text-tinta-escura"
                              : erro
                                ? "border-erro/40 bg-superficie"
                                : "border-petroleo/12 bg-superficie hover:border-petroleo/35"
                          } ${cheio ? "opacity-45" : ""}`}
                        >
                          <span className="block pr-5 text-[15px] font-medium leading-[1.2]">{o.nome}</span>
                          {(!!o.gramatura || (o.precoExtra ?? 0) > 0) && (
                            <span className={`block text-[12.5px] mt-1 num ${sel ? "text-tinta-escura/75" : "text-tinta-suave"}`}>
                              {[o.gramatura, o.precoExtra ? `+ ${formatarPreco(o.precoExtra)}` : null].filter(Boolean).join(" · ")}
                            </span>
                          )}
                          {sel && <IconeCheck className="absolute right-2.5 top-2.5 w-4 h-4 text-tinta-escura" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </section>
            );
          })}

          <section className="pt-8">
            <label htmlFor="obs-montagem" className="text-[18px] font-bold">
              Algum comentário?
            </label>
            <p className="text-[14px] text-tinta-suave mt-0.5">Opcional. Ex.: molho à parte.</p>
            <textarea
              id="obs-montagem"
              value={observacao}
              onChange={(ev) => setObservacao(ev.target.value.slice(0, 140))}
              maxLength={140}
              rows={2}
              className="campo mt-3 resize-none"
            />
            <p className="mt-1 text-right text-[12px] text-tinta-suave num">{observacao.length}/140</p>
          </section>
        </div>
      </div>

      {/* Rodapé fixo */}
      <div className="shrink-0 border-t border-petroleo/10 bg-creme px-5 pt-3 pb-[max(12px,env(safe-area-inset-bottom))]">
        <p className="text-[13px] text-tinta-suave min-h-[18px] mb-2 truncate" aria-live="polite">
          {pendentes.length ? (
            <>
              Falta: <span className="text-petroleo font-medium">{faltando}</span>
            </>
          ) : extras > 0 ? (
            <span className="num">
              {formatarPreco(config.precoBase)} + {formatarPreco(extras)} de extras
            </span>
          ) : (
            "Tudo certo. Confira e adicione."
          )}
        </p>
        <div className="flex items-center gap-3">
          <Contador
            valor={quantidade}
            rotulo="quantidade deste poke"
            onMais={() => setQuantidade((q) => Math.min(20, q + 1))}
            onMenos={() => setQuantidade((q) => Math.max(1, q - 1))}
          />
          <button
            type="button"
            onClick={adicionar}
            className={`botao flex-1 h-14 min-h-14 px-4 justify-between ${pendentes.length ? "bg-mar text-petroleo" : "botao-amarelo"}`}
          >
            <span>{editando ? "Salvar" : "Adicionar"}</span>
            <span className="num normal-case tracking-normal text-[16px]">{formatarPreco(total)}</span>
          </button>
        </div>
      </div>
    </>
  );
}

export function Montagem() {
  const { montagem, fecharMontagem } = usePedido();
  if (!montagem) return null;
  return (
    <Painel aberto={montagem.aberta} onFechar={fecharMontagem} rotulo={`Montar ${montagem.config.nome}`} variante="montagem">
      <CorpoMontagem
        key={montagem.versao}
        configInicial={montagem.config}
        fotoInicial={montagem.foto}
        selecaoInicial={montagem.selecao}
        quantidadeInicial={montagem.quantidade}
        observacaoInicial={montagem.observacao}
        editando={!!montagem.idLinha}
        onFechar={fecharMontagem}
      />
    </Painel>
  );
}
