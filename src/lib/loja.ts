// Dados oficiais e constantes da loja The Poke Manaus
// Fonte: Briefing — Site The Poke Manaus.md (Receita Federal / briefing do cliente)
// NUNCA invente dados fora das fontes oficiais.

export const LOJA = {
  nome: "The Poke Manaus",
  marca: "Thepoke®",
  slogan: "Rápido, saboroso & nutritivo.",
  cnpj: "68.439.848/0001-55",
  // Endereço sem número até confirmação da divergência (2045 x 3047 Loja 63)
  local: "Park Mall Ephigênio",
  enderecoLinha: "Condomínio Park Mall Ephigênio, Av. Ephigênio Salles",
  bairro: "Aleixo",
  cidade: "Manaus",
  estado: "AM",
  cep: "69060-020",
  horario: "Todos os dias, das 11h às 23h",
  abreHora: 11,
  fechaHora: 23,
  inauguracao: "26 de setembro de 2026",
  fundacaoRede: 2019,
  instagram: "https://www.instagram.com/thepokemanaus/",
  instagramHandle: "@thepokemanaus",
  redeInstagram: "https://www.instagram.com/thepokeoficial/",
  redeSite: "https://www.amothepoke.com.br/",
  mapa: "https://www.google.com/maps/search/?api=1&query=Park+Mall+Ephig%C3%AAnio+Manaus",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://the-poke-manaus.pages.dev",
} as const;

// Número de WhatsApp para pedidos [A CONFIRMAR com cliente]
// Enquanto for null, a URL gerada é https://wa.me/?text=... e o cliente escolhe o contato
export const WHATSAPP_PEDIDOS: string | null = null;

/** Hora atual em Manaus (UTC−4, sem horário de verão). */
function horaEmManaus(agora: Date) {
  const partes = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Manaus",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).formatToParts(agora);
  const h = Number(partes.find((p) => p.type === "hour")?.value ?? 0) % 24;
  const m = Number(partes.find((p) => p.type === "minute")?.value ?? 0);
  return h + m / 60;
}

export interface StatusLoja {
  aberta: boolean;
  texto: string;
}

/** "Aberto agora · até 23h" ou "Fechado agora · abre às 11h", pelo horário de Manaus. */
export function statusLoja(agora: Date = new Date()): StatusLoja {
  const h = horaEmManaus(agora);
  const aberta = h >= LOJA.abreHora && h < LOJA.fechaHora;
  return aberta
    ? { aberta, texto: `Aberto agora · até ${LOJA.fechaHora}h` }
    : { aberta, texto: `Fechado agora · abre às ${LOJA.abreHora}h` };
}
