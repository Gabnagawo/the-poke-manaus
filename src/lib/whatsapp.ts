import { DadosPedido, ItemCarrinho, calcularTotal } from "./carrinho";
import { LOJA, WHATSAPP_PEDIDOS } from "./loja";

export function formatarPreco(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function formatarMensagemWhatsApp(
  pedido: DadosPedido,
  itens: ItemCarrinho[]
): string {
  const total = calcularTotal(itens);
  const linhas: string[] = [];

  linhas.push(`*NOVO PEDIDO — ${LOJA.nome.toUpperCase()}*`);
  linhas.push("----------------------------------------");
  linhas.push(`*Cliente:* ${pedido.nomeCliente.trim()}`);
  linhas.push(
    `*Tipo de entrega:* ${pedido.tipoEntrega === "entrega" ? "Entrega no endereço" : "Retirada no balcão (Park Mall Ephigênio)"}`
  );

  if (pedido.tipoEntrega === "entrega") {
    linhas.push(`*Endereço:* ${pedido.enderecoEntrega || "A combinar"}`);
    if (pedido.bairro) {
      linhas.push(`*Bairro:* ${pedido.bairro}`);
    }
    if (pedido.complemento) {
      linhas.push(`*Complemento:* ${pedido.complemento}`);
    }
    if (pedido.pontoReferencia) {
      linhas.push(`*Ponto de referência:* ${pedido.pontoReferencia}`);
    }
  }

  linhas.push("");
  linhas.push("*ITENS DO PEDIDO:*");

  itens.forEach((item) => {
    const subtotal = item.precoUnitario * item.quantidade;
    const nomeComTamanho = item.tamanho ? `${item.nome} (${item.tamanho})` : item.nome;
    linhas.push(`• *${item.quantidade}x ${nomeComTamanho}* — ${formatarPreco(subtotal)}`);

    if (item.montagem) {
      const m = item.montagem;
      if (m.bases && m.bases.length > 0) {
        linhas.push(`  - Base: ${m.bases.join(", ")}`);
      }
      if (m.proteinas && m.proteinas.length > 0) {
        linhas.push(`  - Proteínas: ${m.proteinas.join(", ")}`);
      }
      if (m.molhos && m.molhos.length > 0) {
        linhas.push(`  - Molhos: ${m.molhos.join(", ")}`);
      }
      if (m.acompanhamentos && m.acompanhamentos.length > 0) {
        linhas.push(`  - Acompanhamentos: ${m.acompanhamentos.join(", ")}`);
      }
      if (m.crispys && m.crispys.length > 0) {
        linhas.push(`  - Crispys: ${m.crispys.join(", ")}`);
      }
      if (m.proteinasExtras && m.proteinasExtras.length > 0) {
        linhas.push(`  - Proteína Extra: ${m.proteinasExtras.join(", ")}`);
      }
      if (m.adicionais && m.adicionais.length > 0) {
        linhas.push(`  - Adicionais: ${m.adicionais.join(", ")}`);
      }
      if (m.talher) {
        linhas.push(`  - Talher: ${m.talher}`);
      }
    }

    if (item.observacao) {
      linhas.push(`  - Obs: ${item.observacao}`);
    }
  });

  linhas.push("----------------------------------------");
  linhas.push(`*TOTAL DOS ITENS:* ${formatarPreco(total)}`);

  const nomesPagamento: Record<DadosPedido["formaPagamento"], string> = {
    pix: "Pix",
    cartao_credito: "Cartão de Crédito (na entrega/retirada)",
    cartao_debito: "Cartão de Débito (na entrega/retirada)",
    dinheiro: pedido.trocoPara
      ? `Dinheiro (Troco para ${pedido.trocoPara})`
      : "Dinheiro (sem troco)",
  };

  linhas.push(`*Forma de pagamento:* ${nomesPagamento[pedido.formaPagamento]}`);

  if (pedido.observacoes?.trim()) {
    linhas.push("");
    linhas.push(`*Observações gerais:* ${pedido.observacoes.trim()}`);
  }

  linhas.push("----------------------------------------");
  linhas.push(`Loja: ${LOJA.enderecoLinha} — ${LOJA.bairro}, ${LOJA.cidade}/${LOJA.estado}`);
  linhas.push(`Horário de atendimento: ${LOJA.horario}`);

  return linhas.join("\n");
}

export function gerarLinkWhatsApp(
  pedido: DadosPedido,
  itens: ItemCarrinho[]
): { url: string; pendenteConfirmacaoNumero: boolean } {
  const mensagem = formatarMensagemWhatsApp(pedido, itens);
  const textoCodificado = encodeURIComponent(mensagem);

  if (WHATSAPP_PEDIDOS) {
    const numeroLimpo = WHATSAPP_PEDIDOS.replace(/\D/g, "");
    return {
      url: `https://wa.me/${numeroLimpo}?text=${textoCodificado}`,
      pendenteConfirmacaoNumero: false,
    };
  }

  // Enquanto WHATSAPP_PEDIDOS for null, abre https://wa.me/?text=...
  return {
    url: `https://wa.me/?text=${textoCodificado}`,
    pendenteConfirmacaoNumero: true,
  };
}
