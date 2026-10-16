"use client";

import { useState } from "react";
import Image from "next/image";
import { useCarrinho, DadosPedido, FormaPagamento, TipoEntrega } from "@/lib/carrinho";
import { formatarPreco, gerarLinkWhatsApp } from "@/lib/whatsapp";
import { LOJA, WHATSAPP_PEDIDOS } from "@/lib/loja";

interface CartDrawerProps {
  aberto: boolean;
  onFechar: () => void;
}

export function CartDrawer({ aberto, onFechar }: CartDrawerProps) {
  const {
    itens,
    quantidadeTotal,
    total,
    alterarQuantidade,
    removerDoCarrinho,
    atualizarObservacao,
    limparCarrinho,
  } = useCarrinho();

  const [etapa, setEtapa] = useState<"carrinho" | "checkout">("carrinho");
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState<{ [campo: string]: string }>({});

  // Dados do formulário
  const [nomeCliente, setNomeCliente] = useState("");
  const [tipoEntrega, setTipoEntrega] = useState<TipoEntrega>("retirada");
  const [enderecoEntrega, setEnderecoEntrega] = useState("");
  const [bairro, setBairro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [pontoReferencia, setPontoReferencia] = useState("");
  const [formaPagamento, setFormaPagamento] = useState<FormaPagamento>("pix");
  const [trocoPara, setTrocoPara] = useState("");
  const [observacoes, setObservacoes] = useState("");

  if (!aberto) return null;

  const validarFormulario = (): boolean => {
    const novosErros: { [campo: string]: string } = {};

    if (!nomeCliente.trim()) {
      novosErros.nomeCliente = "Por favor, informe seu nome.";
    }

    if (tipoEntrega === "entrega" && !enderecoEntrega.trim()) {
      novosErros.enderecoEntrega = "Por favor, informe a rua e o número para entrega.";
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleFinalizarWhatsApp = () => {
    if (!validarFormulario()) return;

    setCarregando(true);

    const dados: DadosPedido = {
      nomeCliente,
      tipoEntrega,
      enderecoEntrega: tipoEntrega === "entrega" ? enderecoEntrega : undefined,
      bairro: tipoEntrega === "entrega" ? bairro : undefined,
      complemento: tipoEntrega === "entrega" ? complemento : undefined,
      pontoReferencia: tipoEntrega === "entrega" ? pontoReferencia : undefined,
      formaPagamento,
      trocoPara: formaPagamento === "dinheiro" ? trocoPara : undefined,
      observacoes,
    };

    const { url } = gerarLinkWhatsApp(dados, itens);

    setTimeout(() => {
      setCarregando(false);
      window.open(url, "_blank");
    }, 400);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-label="Sacola de pedidos"
    >
      {/* Backdrop clique para fechar */}
      <div className="absolute inset-0" onClick={onFechar} />

      {/* Painel Lateral */}
      <div className="relative w-full max-w-[500px] h-full bg-[#FCF9F0] text-[#1D0B0D] flex flex-col shadow-2xl z-10 overflow-hidden">
        
        {/* Topo do Carrinho */}
        <div className="px-6 py-5 border-b border-[#0E2A38]/10 flex items-center justify-between bg-[#FCF9F0]">
          <div className="flex items-center space-x-2">
            <h2 className="font-display font-extrabold text-2xl text-[#0E2A38]">
              {etapa === "carrinho" ? "SEU PEDIDO" : "FINALIZAR PEDIDO"}
            </h2>
            {itens.length > 0 && etapa === "carrinho" && (
              <span className="bg-[#0E2A38] text-[#FCF9F0] text-xs font-bold px-2 py-0.5 rounded-full">
                {quantidadeTotal}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onFechar}
            aria-label="Fechar painel do carrinho"
            className="w-11 h-11 flex items-center justify-center text-[#0E2A38] text-2xl hover:opacity-75 transition-opacity"
          >
            ✕
          </button>
        </div>

        {/* Conteúdo Central */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {itens.length === 0 ? (
            // Estado Vazio
            <div className="h-full flex flex-col items-center justify-center text-center py-16 space-y-4">
              <div className="w-20 h-20 bg-[#DBE2DC] rounded-full flex items-center justify-center text-[#0E2A38]">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
              <h3 className="font-display font-bold text-xl text-[#0E2A38]">
                Sua sacola está vazia
              </h3>
              <p className="text-sm text-[#59655D] max-w-xs">
                Explore nossos pokes frescos, receitas da casa e sucos especiais para começar seu pedido.
              </p>
              <a
                href="#cardapio"
                onClick={onFechar}
                className="btn-limon px-6 py-3 text-sm mt-2"
              >
                VER CARDÁPIO
              </a>
            </div>
          ) : etapa === "carrinho" ? (
            // Lista de Itens no Carrinho
            <div className="space-y-4">
              {itens.map((item) => (
                <div
                  key={item.idLinha}
                  className="p-4 bg-white border border-[#0E2A38]/10 rounded-sm space-y-3 shadow-xs"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start space-x-3">
                      {item.imagem && (
                        <div className="relative w-14 h-14 flex-shrink-0 bg-[#FCF9F0] rounded-xs overflow-hidden border border-[#0E2A38]/10">
                          <Image
                            src={item.imagem}
                            alt={item.nome}
                            fill
                            className="object-contain mix-blend-multiply p-1"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="font-display font-bold text-base text-[#0E2A38] leading-tight">
                          {item.nome} {item.tamanho && `(${item.tamanho})`}
                        </h4>
                        <p className="text-xs font-semibold text-[#2A7CA1] pt-0.5">
                          {formatarPreco(item.precoUnitario)} cada
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => removerDoCarrinho(item.idLinha)}
                      aria-label={`Remover ${item.nome} da sacola`}
                      className="text-xs text-red-600 hover:text-red-800 font-bold p-1"
                    >
                      Remover
                    </button>
                  </div>

                  {/* Detalhes de Montagem do Poke */}
                  {item.montagem && (
                    <div className="text-xs bg-[#FCF9F0] p-2.5 rounded border border-[#0E2A38]/5 space-y-1 text-[#0E2A38]/90">
                      {item.montagem.bases.length > 0 && (
                        <p>
                          <span className="font-bold">Base:</span> {item.montagem.bases.join(", ")}
                        </p>
                      )}
                      {item.montagem.proteinas.length > 0 && (
                        <p>
                          <span className="font-bold">Proteínas:</span> {item.montagem.proteinas.join(", ")}
                        </p>
                      )}
                      {item.montagem.molhos.length > 0 && (
                        <p>
                          <span className="font-bold">Molhos:</span> {item.montagem.molhos.join(", ")}
                        </p>
                      )}
                      {item.montagem.acompanhamentos.length > 0 && (
                        <p>
                          <span className="font-bold">Acompanhamentos:</span> {item.montagem.acompanhamentos.join(", ")}
                        </p>
                      )}
                      {item.montagem.crispys.length > 0 && (
                        <p>
                          <span className="font-bold">Crispys:</span> {item.montagem.crispys.join(", ")}
                        </p>
                      )}
                      {item.montagem.proteinasExtras && item.montagem.proteinasExtras.length > 0 && (
                        <p>
                          <span className="font-bold">Proteína Extra:</span> {item.montagem.proteinasExtras.join(", ")}
                        </p>
                      )}
                      {item.montagem.adicionais && item.montagem.adicionais.length > 0 && (
                        <p>
                          <span className="font-bold">Adicionais:</span> {item.montagem.adicionais.join(", ")}
                        </p>
                      )}
                      {item.montagem.talher && (
                        <p>
                          <span className="font-bold">Talher:</span> {item.montagem.talher}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Campo de observação individual */}
                  <div>
                    <input
                      type="text"
                      placeholder="Observação deste item (ex: pouco molho)"
                      value={item.observacao || ""}
                      onChange={(e) => atualizarObservacao(item.idLinha, e.target.value)}
                      className="w-full text-xs px-3 py-1.5 bg-[#FCF9F0] border border-[#0E2A38]/15 rounded-xs focus:outline-none focus:border-[#2A7CA1]"
                    />
                  </div>

                  {/* Controle de Quantidade e Subtotal */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#0E2A38]/10">
                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => alterarQuantidade(item.idLinha, -1)}
                        aria-label="Diminuir quantidade"
                        className="w-9 h-9 flex items-center justify-center bg-[#FCF9F0] border border-[#0E2A38]/20 font-bold text-base rounded-xs hover:bg-[#DBE2DC]"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-display font-extrabold text-sm">
                        {item.quantidade}
                      </span>
                      <button
                        type="button"
                        onClick={() => alterarQuantidade(item.idLinha, 1)}
                        aria-label="Aumentar quantidade"
                        className="w-9 h-9 flex items-center justify-center bg-[#FCF9F0] border border-[#0E2A38]/20 font-bold text-base rounded-xs hover:bg-[#DBE2DC]"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-display font-extrabold text-base text-[#0E2A38]">
                      {formatarPreco(item.precoUnitario * item.quantidade)}
                    </span>
                  </div>
                </div>
              ))}

              <div className="pt-2 flex justify-between items-center text-xs text-[#59655D]">
                <button
                  type="button"
                  onClick={limparCarrinho}
                  className="hover:text-red-700 underline"
                >
                  Esvaziar sacola
                </button>
                <span>{itens.length} {itens.length === 1 ? "produto diferente" : "produtos diferentes"}</span>
              </div>
            </div>
          ) : (
            // Etapa de Checkout / Dados de Entrega e Pagamento
            <form onSubmit={(e) => { e.preventDefault(); handleFinalizarWhatsApp(); }} className="space-y-5">
              
              {/* Nome */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0E2A38] mb-1">
                  Seu Nome Completo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Como podemos te chamar?"
                  value={nomeCliente}
                  onChange={(e) => setNomeCliente(e.target.value)}
                  className={`w-full px-3.5 py-2.5 text-sm bg-white border ${
                    erros.nomeCliente ? "border-red-500" : "border-[#0E2A38]/20"
                  } rounded-xs focus:outline-none focus:border-[#2A7CA1]`}
                />
                {erros.nomeCliente && (
                  <p className="text-xs text-red-600 mt-1">{erros.nomeCliente}</p>
                )}
              </div>

              {/* Tipo de Entrega */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0E2A38] mb-1.5">
                  Como deseja receber?
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTipoEntrega("retirada")}
                    className={`py-2.5 px-3 text-xs font-bold rounded-xs border text-center transition-colors ${
                      tipoEntrega === "retirada"
                        ? "bg-[#0E2A38] text-[#FCF9F0] border-[#0E2A38]"
                        : "bg-white text-[#0E2A38] border-[#0E2A38]/20 hover:bg-[#DBE2DC]"
                    }`}
                  >
                    Retirada no Balcão
                    <span className="block text-[10px] font-normal opacity-80 pt-0.5">
                      Park Mall Ephigênio
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setTipoEntrega("entrega")}
                    className={`py-2.5 px-3 text-xs font-bold rounded-xs border text-center transition-colors ${
                      tipoEntrega === "entrega"
                        ? "bg-[#0E2A38] text-[#FCF9F0] border-[#0E2A38]"
                        : "bg-white text-[#0E2A38] border-[#0E2A38]/20 hover:bg-[#DBE2DC]"
                    }`}
                  >
                    Entrega em Manaus
                    <span className="block text-[10px] font-normal opacity-80 pt-0.5">
                      No seu endereço
                    </span>
                  </button>
                </div>
              </div>

              {/* Campos de Endereço (se entrega) */}
              {tipoEntrega === "entrega" && (
                <div className="space-y-3 p-3.5 bg-white border border-[#0E2A38]/10 rounded-xs">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#0E2A38] mb-1">
                      Endereço e Número *
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Av. Ephigênio Salles, 1000"
                      value={enderecoEntrega}
                      onChange={(e) => setEnderecoEntrega(e.target.value)}
                      className={`w-full px-3 py-2 text-sm bg-[#FCF9F0] border ${
                        erros.enderecoEntrega ? "border-red-500" : "border-[#0E2A38]/15"
                      } rounded-xs focus:outline-none focus:border-[#2A7CA1]`}
                    />
                    {erros.enderecoEntrega && (
                      <p className="text-xs text-red-600 mt-1">{erros.enderecoEntrega}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A38] mb-1">
                        Bairro
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Aleixo, Adrianópolis"
                        value={bairro}
                        onChange={(e) => setBairro(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-[#FCF9F0] border border-[#0E2A38]/15 rounded-xs focus:outline-none focus:border-[#2A7CA1]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A38] mb-1">
                        Complemento / Apto
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Apto 302 Bl B"
                        value={complemento}
                        onChange={(e) => setComplemento(e.target.value)}
                        className="w-full px-3 py-2 text-sm bg-[#FCF9F0] border border-[#0E2A38]/15 rounded-xs focus:outline-none focus:border-[#2A7CA1]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0E2A38] mb-1">
                      Ponto de Referência
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Próximo à academia, portaria 2"
                      value={pontoReferencia}
                      onChange={(e) => setPontoReferencia(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-[#FCF9F0] border border-[#0E2A38]/15 rounded-xs focus:outline-none focus:border-[#2A7CA1]"
                    />
                  </div>
                </div>
              )}

              {/* Forma de Pagamento */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0E2A38] mb-1.5">
                  Forma de Pagamento
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {[
                    { id: "pix", nome: "Pix" },
                    { id: "cartao_credito", nome: "Cartão Crédito" },
                    { id: "cartao_debito", nome: "Cartão Débito" },
                    { id: "dinheiro", nome: "Dinheiro" },
                  ].map((forma) => (
                    <button
                      key={forma.id}
                      type="button"
                      onClick={() => setFormaPagamento(forma.id as FormaPagamento)}
                      className={`p-2.5 font-bold rounded-xs border text-left transition-colors ${
                        formaPagamento === forma.id
                          ? "bg-[#0E2A38] text-[#FCF9F0] border-[#0E2A38]"
                          : "bg-white text-[#0E2A38] border-[#0E2A38]/15 hover:bg-[#DBE2DC]"
                      }`}
                    >
                      {forma.nome}
                    </button>
                  ))}
                </div>

                {formaPagamento === "dinheiro" && (
                  <div className="mt-2.5">
                    <label className="block text-xs text-[#0E2A38] mb-1">
                      Precisa de troco para quanto? (deixe em branco se tiver o valor exato)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: R$ 100,00"
                      value={trocoPara}
                      onChange={(e) => setTrocoPara(e.target.value)}
                      className="w-full px-3 py-2 text-sm bg-white border border-[#0E2A38]/15 rounded-xs focus:outline-none focus:border-[#2A7CA1]"
                    />
                  </div>
                )}
              </div>

              {/* Observações Gerais */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#0E2A38] mb-1">
                  Observações Gerais do Pedido
                </label>
                <textarea
                  rows={2}
                  placeholder="Alguma restrição alimentar ou instrução para entrega?"
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-[#0E2A38]/20 rounded-xs focus:outline-none focus:border-[#2A7CA1]"
                />
              </div>
            </form>
          )}
        </div>

        {/* Rodapé do Carrinho com Totais e Botão de Ação */}
        {itens.length > 0 && (
          <div className="p-6 border-t border-[#0E2A38]/10 bg-white space-y-4">
            
            {/* Linhas de Valores */}
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between items-center text-[#59655D]">
                <span>Subtotal dos itens</span>
                <span>{formatarPreco(total)}</span>
              </div>
              <div className="flex justify-between items-center text-[#59655D] text-xs">
                <span>Taxa de entrega</span>
                <span>{tipoEntrega === "retirada" ? "Grátis (retirada no local)" : "A combinar com o entregador"}</span>
              </div>
              <div className="flex justify-between items-center text-lg font-display font-extrabold text-[#0E2A38] pt-2 border-t border-[#0E2A38]/10">
                <span>TOTAL DO PEDIDO</span>
                <span>{formatarPreco(total)}</span>
              </div>
            </div>

            {/* [A CONFIRMAR] Número do WhatsApp oficial da loja aguarda confirmação do cliente */}
            <p className="text-[11px] text-[#59655D] bg-[#FCF9F0] p-2 rounded-[1px] border border-[#0E2A38]/10 text-center">
              O pedido abre no seu WhatsApp, pronto para enviar.
            </p>

            {/* Botões de Ação */}
            {etapa === "carrinho" ? (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setEtapa("checkout")}
                  className="w-full btn-limon h-12 text-sm font-bold shadow-sm"
                >
                  AVANÇAR PARA DADOS DE ENTREGA →
                </button>
                <a
                  href={LOJA.linkIfood}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-outline-dark h-11 text-xs text-center justify-center"
                >
                  PREFERE PEDIR PELO IFOOD? CLIQUE AQUI ↗
                </a>
              </div>
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  disabled={carregando}
                  onClick={handleFinalizarWhatsApp}
                  className="w-full btn-limon h-12 text-sm font-bold shadow-md disabled:opacity-50"
                >
                  {carregando ? "GERANDO MENSAGEM..." : "ENVIAR PEDIDO VIA WHATSAPP →"}
                </button>
                <button
                  type="button"
                  onClick={() => setEtapa("carrinho")}
                  className="w-full py-2 text-xs font-bold text-[#0E2A38] hover:underline text-center"
                >
                  ← Voltar para revisão dos itens
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
