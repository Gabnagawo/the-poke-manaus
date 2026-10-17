"use client";

// Sacola em três passos: revisar itens → dados de entrega e pagamento → pedido pronto no WhatsApp.
// Celular: sobe de baixo. Desktop: gaveta à direita.

import { useEffect, useRef, useState } from "react";
import { usePedido, type DadosCliente, type FormaPagamento, type LinhaSacola } from "@/lib/pedido";
import { LOJA, WHATSAPP_PEDIDOS } from "@/lib/loja";
import { formatarPreco, gerarLinkWhatsApp } from "@/lib/whatsapp";
import { dimensoes, ehCopo, ehFotoInteira, fotoSrc, PASTEL } from "@/lib/fotos";
import { irPara } from "@/lib/rolagem";
import { Painel } from "@/components/ui/Painel";
import { Contador } from "@/components/ui/Contador";
import { Logo } from "@/components/ui/Logo";
import {
  IconeCheck,
  IconeFechar,
  IconeLapis,
  IconeSeta,
  IconeVoltar,
  IconeWhatsApp,
} from "@/components/ui/Icones";

type Passo = "itens" | "dados" | "enviado";

const PAGAMENTOS: { id: FormaPagamento; nome: string }[] = [
  { id: "pix", nome: "Pix" },
  { id: "credito", nome: "Crédito" },
  { id: "debito", nome: "Débito" },
  { id: "dinheiro", nome: "Dinheiro" },
];

function Miniatura({ linha }: { linha: LinhaSacola }) {
  return (
    <div className={`relative shrink-0 w-16 h-16 rounded-[12px] overflow-hidden ${PASTEL[linha.categoria] ?? "bg-areia"}`}>
      {linha.foto ? (
        <img
          src={fotoSrc(linha.foto, 200)}
          {...dimensoes(linha.foto)}
          alt=""
          className={
            ehFotoInteira(linha.foto)
              ? "absolute inset-0 w-full h-full object-cover"
              : ehCopo(linha.foto)
                ? "foto-prato absolute bottom-0 left-1/2 -translate-x-1/2 h-[88%] w-auto max-w-none"
                : "foto-prato absolute inset-0 m-auto w-[86%] h-[86%] object-contain"
          }
        />
      ) : (
        <Logo className="absolute inset-0 m-auto w-[70%] h-auto text-petroleo/25" titulo="" />
      )}
    </div>
  );
}

function Linha({ linha }: { linha: LinhaSacola }) {
  const { alterarQuantidade, definirObservacao, editarLinha } = usePedido();
  const [editandoObs, setEditandoObs] = useState(false);
  const [obs, setObs] = useState(linha.observacao ?? "");

  return (
    <li className="py-5 border-b border-petroleo/10">
      <div className="flex gap-3.5">
        <Miniatura linha={linha} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[16px] font-bold leading-tight">{linha.nome}</h3>
            <span className="text-[15px] font-bold num whitespace-nowrap">
              {formatarPreco(linha.precoUnitario * linha.quantidade)}
            </span>
          </div>
          {linha.quantidade > 1 && (
            <p className="text-[13px] text-tinta-suave num mt-0.5">{formatarPreco(linha.precoUnitario)} cada</p>
          )}

          {linha.montagem && (
            <dl className="mt-2 text-[13.5px] leading-[1.45] text-tinta-suave space-y-0.5">
              {linha.montagem.resumo.map((r) => (
                <div key={r.titulo}>
                  <dt className="inline font-medium text-petroleo">{r.titulo}: </dt>
                  <dd className="inline">{r.itens.join(", ")}</dd>
                </div>
              ))}
            </dl>
          )}

          {linha.observacao && !editandoObs && (
            <p className="mt-2 text-[13.5px] text-tinta-suave">
              <span className="font-medium text-petroleo">Obs.: </span>
              {linha.observacao}
            </p>
          )}

          {editandoObs && (
            <div className="mt-3">
              <textarea
                value={obs}
                onChange={(e) => setObs(e.target.value.slice(0, 140))}
                maxLength={140}
                rows={2}
                className="campo resize-none"
                placeholder="Ex.: sem gelo"
                aria-label={`Observação para ${linha.nome}`}
                autoFocus
              />
              <div className="mt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    definirObservacao(linha.idLinha, obs.trim());
                    setEditandoObs(false);
                  }}
                  className="botao botao-petroleo min-h-10 h-10 px-4 text-[12px]"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setObs(linha.observacao ?? "");
                    setEditandoObs(false);
                  }}
                  className="botao min-h-10 h-10 px-4 text-[12px]"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex items-center -ml-2">
              {linha.montagem ? (
                <button
                  type="button"
                  onClick={() => editarLinha(linha.idLinha)}
                  className="inline-flex items-center gap-1.5 min-h-11 px-2 text-[13px] font-bold uppercase tracking-[0.06em]"
                >
                  <IconeLapis />
                  Editar
                </button>
              ) : (
                !editandoObs && (
                  <button
                    type="button"
                    onClick={() => setEditandoObs(true)}
                    className="inline-flex items-center gap-1.5 min-h-11 px-2 text-[13px] font-bold uppercase tracking-[0.06em]"
                  >
                    <IconeLapis />
                    {linha.observacao ? "Editar obs." : "Observação"}
                  </button>
                )
              )}
            </div>
            <Contador
              valor={linha.quantidade}
              rotulo={linha.nome}
              onMais={() => alterarQuantidade(linha.idLinha, 1)}
              onMenos={() => alterarQuantidade(linha.idLinha, -1)}
              lixeiraNoUm
              claro
            />
          </div>
        </div>
      </div>
    </li>
  );
}

function Campo({
  id,
  rotulo,
  erro,
  children,
  dica,
}: {
  id: string;
  rotulo: string;
  erro?: string;
  dica?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-[14px] font-bold mb-1.5">
        {rotulo}
      </label>
      {children}
      {erro ? (
        <p id={`${id}-erro`} className="mt-1.5 text-[13px] font-medium text-erro">
          {erro}
        </p>
      ) : dica ? (
        <p className="mt-1.5 text-[13px] text-tinta-suave">{dica}</p>
      ) : null}
    </div>
  );
}

export function Sacola() {
  const { sacolaAberta, fecharSacola, linhas, quantidadeTotal, subtotal, abrirMontagem, cliente, salvarCliente, limpar } =
    usePedido();
  const [passo, setPasso] = useState<Passo>("itens");
  const [dados, setDados] = useState<DadosCliente>(cliente);
  const [erros, setErros] = useState<Partial<Record<keyof DadosCliente, string>>>({});
  const corpo = useRef<HTMLDivElement>(null);

  // Ao abrir: volta ao começo e carrega os dados salvos do cliente
  useEffect(() => {
    if (sacolaAberta) {
      setPasso(linhas.length ? "itens" : "itens");
      setDados(cliente);
      setErros({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sacolaAberta]);

  useEffect(() => {
    corpo.current?.scrollTo({ top: 0 });
  }, [passo]);

  const atualizar = <K extends keyof DadosCliente>(campo: K, valor: DadosCliente[K]) => {
    setDados((d) => ({ ...d, [campo]: valor }));
    if (erros[campo]) setErros((e) => ({ ...e, [campo]: undefined }));
  };

  const validar = () => {
    const e: Partial<Record<keyof DadosCliente, string>> = {};
    if (dados.nome.trim().length < 2) e.nome = "Diga o seu nome.";
    if (dados.tipoEntrega === "entrega") {
      if (dados.endereco.trim().length < 5) e.endereco = "Informe a rua e o número.";
      if (dados.bairro.trim().length < 2) e.bairro = "Informe o bairro.";
    }
    setErros(e);
    const primeiro = Object.keys(e)[0];
    if (primeiro) {
      const el = document.getElementById(`campo-${primeiro}`);
      el?.focus();
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
      return false;
    }
    return true;
  };

  const link = gerarLinkWhatsApp(dados, linhas);

  const voltarAoCardapio = () => {
    fecharSacola();
    setTimeout(() => irPara("cardapio"), 340);
  };

  const titulo = passo === "itens" ? "Sua sacola" : passo === "dados" ? "Finalizar pedido" : "Pedido pronto";

  return (
    <Painel aberto={sacolaAberta} onFechar={fecharSacola} rotulo={titulo} variante="sacola">
      {/* Cabeçalho */}
      <div className="shrink-0 relative flex items-center gap-2 px-3 md:px-5 h-[68px] border-b border-petroleo/10">
        <div className="md:hidden absolute left-1/2 top-1.5 -translate-x-1/2 w-10 h-1 rounded-full bg-petroleo/20" aria-hidden />
        {passo === "dados" ? (
          <button
            type="button"
            onClick={() => setPasso("itens")}
            className="grid place-items-center w-11 h-11 rounded-full hover:bg-petroleo/5"
            aria-label="Voltar para a sacola"
          >
            <IconeVoltar />
          </button>
        ) : (
          <span className="w-2" />
        )}
        <h2 className="flex-1 titulo text-[24px] md:text-[26px]">
          {titulo}
          {passo === "itens" && quantidadeTotal > 0 && (
            <span className="ml-2 align-middle inline-grid place-items-center min-w-7 h-7 px-2 rounded-full bg-amarelo text-tinta-escura text-[14px] num tracking-normal">
              {quantidadeTotal}
            </span>
          )}
        </h2>
        <button
          type="button"
          onClick={fecharSacola}
          className="grid place-items-center w-11 h-11 rounded-full hover:bg-petroleo/5"
          aria-label="Fechar sacola"
        >
          <IconeFechar />
        </button>
      </div>

      {/* Corpo */}
      <div ref={corpo} className="painel-rolagem flex-1 overflow-y-auto">
        {passo === "itens" &&
          (linhas.length === 0 ? (
            <div className="px-6 py-14 text-center">
              <p className="titulo text-[28px]">Sacola vazia</p>
              <p className="mt-3 text-[16px] text-tinta-suave">Escolha um poke ou um suco no cardápio.</p>
              <div className="mt-8 flex flex-col gap-3 max-w-[280px] mx-auto">
                <button type="button" onClick={() => abrirMontagem("M")} className="botao botao-amarelo">
                  Monte seu poke
                </button>
                <button type="button" onClick={voltarAoCardapio} className="botao botao-contorno">
                  Ver cardápio
                </button>
              </div>
            </div>
          ) : (
            <div className="px-5">
              <ul>
                {linhas.map((l) => (
                  <Linha key={l.idLinha} linha={l} />
                ))}
              </ul>
              <button type="button" onClick={voltarAoCardapio} className="link-seta my-4">
                Adicionar mais itens
                <IconeSeta />
              </button>
            </div>
          ))}

        {passo === "dados" && (
          <form
            className="px-5 py-6 space-y-6"
            onSubmit={(e) => e.preventDefault()}
            noValidate
            aria-label="Dados do pedido"
          >
            <Campo id="campo-nome" rotulo="Seu nome" erro={erros.nome}>
              <input
                id="campo-nome"
                className="campo"
                value={dados.nome}
                onChange={(e) => atualizar("nome", e.target.value)}
                autoComplete="name"
                enterKeyHint="next"
                aria-invalid={!!erros.nome}
                aria-describedby={erros.nome ? "campo-nome-erro" : undefined}
              />
            </Campo>

            <fieldset>
              <legend className="text-[14px] font-bold mb-2">Como você quer receber?</legend>
              <div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-creme-2">
                {(["entrega", "retirada"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => atualizar("tipoEntrega", t)}
                    aria-pressed={dados.tipoEntrega === t}
                    className={`h-11 rounded-full text-[14px] font-bold transition-colors ${
                      dados.tipoEntrega === t ? "bg-amarelo text-tinta-escura" : "text-petroleo"
                    }`}
                  >
                    {t === "entrega" ? "Entrega" : "Retirar na loja"}
                  </button>
                ))}
              </div>
            </fieldset>

            {dados.tipoEntrega === "entrega" ? (
              <div className="space-y-4">
                <Campo id="campo-endereco" rotulo="Rua e número" erro={erros.endereco}>
                  <input
                    id="campo-endereco"
                    className="campo"
                    value={dados.endereco}
                    onChange={(e) => atualizar("endereco", e.target.value)}
                    autoComplete="street-address"
                    aria-invalid={!!erros.endereco}
                    aria-describedby={erros.endereco ? "campo-endereco-erro" : undefined}
                  />
                </Campo>
                <Campo id="campo-bairro" rotulo="Bairro" erro={erros.bairro}>
                  <input
                    id="campo-bairro"
                    className="campo"
                    value={dados.bairro}
                    onChange={(e) => atualizar("bairro", e.target.value)}
                    autoComplete="address-level3"
                    aria-invalid={!!erros.bairro}
                    aria-describedby={erros.bairro ? "campo-bairro-erro" : undefined}
                  />
                </Campo>
                <div className="grid grid-cols-2 gap-3">
                  <Campo id="campo-complemento" rotulo="Complemento">
                    <input
                      id="campo-complemento"
                      className="campo"
                      value={dados.complemento}
                      onChange={(e) => atualizar("complemento", e.target.value)}
                      placeholder="Apto, bloco"
                    />
                  </Campo>
                  <Campo id="campo-referencia" rotulo="Referência">
                    <input
                      id="campo-referencia"
                      className="campo"
                      value={dados.referencia}
                      onChange={(e) => atualizar("referencia", e.target.value)}
                      placeholder="Perto de..."
                    />
                  </Campo>
                </div>
                <p className="text-[13px] text-tinta-suave">A taxa de entrega é combinada pelo WhatsApp.</p>
              </div>
            ) : (
              <p className="rounded-[14px] bg-salvia px-4 py-3.5 text-[15px] leading-[1.45]">
                Retire no balcão da loja: {LOJA.enderecoLinha}, {LOJA.bairro}.
              </p>
            )}

            <fieldset>
              <legend className="text-[14px] font-bold mb-2">Pagamento</legend>
              <div className="grid grid-cols-2 gap-2">
                {PAGAMENTOS.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => atualizar("pagamento", p.id)}
                    aria-pressed={dados.pagamento === p.id}
                    className={`h-12 rounded-[14px] border-[1.5px] text-[15px] font-medium transition-colors ${
                      dados.pagamento === p.id ? "bg-amarelo border-amarelo text-tinta-escura" : "border-petroleo/15 bg-superficie"
                    }`}
                  >
                    {p.nome}
                  </button>
                ))}
              </div>
              <p className="mt-2 text-[13px] text-tinta-suave">
                {dados.tipoEntrega === "entrega" ? "Pagamento na entrega." : "Pagamento na retirada."}
              </p>
              {dados.pagamento === "dinheiro" && (
                <div className="mt-4">
                  <Campo id="campo-troco" rotulo="Troco para quanto?" dica="Deixe em branco se não precisar de troco.">
                    <input
                      id="campo-troco"
                      className="campo"
                      value={dados.troco}
                      onChange={(e) => atualizar("troco", e.target.value)}
                      inputMode="decimal"
                      placeholder="R$ 100,00"
                    />
                  </Campo>
                </div>
              )}
            </fieldset>

            <Campo id="campo-observacoes" rotulo="Observações (opcional)">
              <textarea
                id="campo-observacoes"
                className="campo resize-none"
                rows={2}
                value={dados.observacoes}
                onChange={(e) => atualizar("observacoes", e.target.value.slice(0, 280))}
              />
            </Campo>
          </form>
        )}

        {passo === "enviado" && (
          <div className="px-6 py-12 text-center">
            <span className="mx-auto grid place-items-center w-16 h-16 rounded-full bg-amarelo text-tinta-escura">
              <IconeCheck className="w-8 h-8" />
            </span>
            <p className="titulo text-[30px] mt-6">Quase lá</p>
            <p className="mt-3 text-[16px] leading-[1.5] text-tinta-suave max-w-[340px] mx-auto">
              {WHATSAPP_PEDIDOS
                ? "A mensagem com o pedido abriu no WhatsApp. É só tocar em enviar."
                : "A mensagem com o pedido abriu no WhatsApp. Escolha a conversa com a The Poke Manaus e toque em enviar."}
            </p>
            <a href={link} target="_blank" rel="noopener noreferrer" className="botao botao-contorno mt-8">
              <IconeWhatsApp />
              Abrir o WhatsApp de novo
            </a>
            <div className="mt-10 pt-8 border-t border-petroleo/10 flex flex-col gap-3 max-w-[300px] mx-auto">
              <button
                type="button"
                onClick={() => {
                  limpar();
                  voltarAoCardapio();
                }}
                className="botao botao-petroleo"
              >
                Esvaziar a sacola
              </button>
              <button type="button" onClick={fecharSacola} className="botao">
                Manter os itens
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Rodapé */}
      {passo !== "enviado" && linhas.length > 0 && (
        <div className="shrink-0 border-t border-petroleo/10 px-5 pt-4 pb-[max(14px,env(safe-area-inset-bottom))] bg-creme">
          <div className="flex items-baseline justify-between">
            <span className="text-[15px]">{passo === "itens" ? "Subtotal" : "Total dos itens"}</span>
            <span className="text-[20px] font-bold num">{formatarPreco(subtotal)}</span>
          </div>
          {passo === "dados" && dados.tipoEntrega === "entrega" && (
            <p className="text-[13px] text-tinta-suave text-right">+ taxa de entrega a combinar</p>
          )}

          {passo === "itens" ? (
            <button type="button" onClick={() => setPasso("dados")} className="botao botao-amarelo w-full h-14 min-h-14 mt-3">
              Continuar
              <IconeSeta />
            </button>
          ) : (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                if (!validar()) {
                  e.preventDefault();
                  return;
                }
                salvarCliente(dados);
                setPasso("enviado");
              }}
              className="botao botao-amarelo w-full h-14 min-h-14 mt-3"
            >
              <IconeWhatsApp />
              Enviar pelo WhatsApp
            </a>
          )}
        </div>
      )}
    </Painel>
  );
}
