import type { DadosCliente, LinhaSacola } from "./pedido";
import { LOJA, WHATSAPP_PEDIDOS } from "./loja";

export function formatarPreco(valor: number): string {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const NOMES_PAGAMENTO: Record<DadosCliente["pagamento"], string> = {
  pix: "Pix",
  credito: "Cartão de crédito",
  debito: "Cartão de débito",
  dinheiro: "Dinheiro",
};

export function nomePagamento(c: DadosCliente) {
  if (c.pagamento === "dinheiro") {
    return c.troco.trim() ? `Dinheiro (troco para ${c.troco.trim()})` : "Dinheiro (sem troco)";
  }
  return NOMES_PAGAMENTO[c.pagamento];
}

export function formatarMensagemWhatsApp(cliente: DadosCliente, linhas: LinhaSacola[]): string {
  const total = linhas.reduce((a, l) => a + l.precoUnitario * l.quantidade, 0);
  const m: string[] = [];

  m.push(`*Pedido pelo site — ${LOJA.nome}*`);
  m.push("");
  m.push(`*Nome:* ${cliente.nome.trim()}`);
  if (cliente.tipoEntrega === "entrega") {
    m.push("*Entrega*");
    m.push(`Endereço: ${cliente.endereco.trim()}`);
    if (cliente.bairro.trim()) m.push(`Bairro: ${cliente.bairro.trim()}`);
    if (cliente.complemento.trim()) m.push(`Complemento: ${cliente.complemento.trim()}`);
    if (cliente.referencia.trim()) m.push(`Referência: ${cliente.referencia.trim()}`);
  } else {
    m.push(`*Retirada na loja* (${LOJA.local})`);
  }

  m.push("");
  m.push("*Itens*");
  for (const l of linhas) {
    m.push(`${l.quantidade}x ${l.nome} — ${formatarPreco(l.precoUnitario * l.quantidade)}`);
    for (const r of l.montagem?.resumo ?? []) {
      m.push(`   ${r.titulo}: ${r.itens.join(", ")}`);
    }
    if (l.observacao) m.push(`   Obs.: ${l.observacao}`);
  }

  m.push("");
  m.push(`*Total dos itens:* ${formatarPreco(total)}`);
  if (cliente.tipoEntrega === "entrega") m.push("Taxa de entrega: a combinar");
  m.push(`*Pagamento:* ${nomePagamento(cliente)}`);
  if (cliente.observacoes.trim()) {
    m.push("");
    m.push(`*Observações:* ${cliente.observacoes.trim()}`);
  }

  return m.join("\n");
}

export function gerarLinkWhatsApp(cliente: DadosCliente, linhas: LinhaSacola[]) {
  const texto = encodeURIComponent(formatarMensagemWhatsApp(cliente, linhas));
  if (WHATSAPP_PEDIDOS) {
    return `https://wa.me/${WHATSAPP_PEDIDOS.replace(/\D/g, "")}?text=${texto}`;
  }
  // Sem número definido: o WhatsApp abre e a pessoa escolhe o contato
  return `https://wa.me/?text=${texto}`;
}
