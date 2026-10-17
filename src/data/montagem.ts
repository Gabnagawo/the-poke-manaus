// Opções oficiais para a montagem de poke personalizada (Monte seu Poke)
// Fonte direta: the-poke/CARDAPIO-montagem.md (briefing do cliente The Poke Manaus Aleixo)

export interface OpcaoMontagem {
  id: string;
  nome: string;
  descricao?: string;
  gramatura?: string;
  precoExtra?: number;
}

export interface RegrasMontagemTamanho {
  tamanho: "P" | "M" | "G";
  nome: string;
  precoBase: number;
  basesMin: number;
  basesMax: number;
  proteinasMin: number;
  proteinasMax: number;
  molhosMin: number;
  molhosMax: number;
  acompanhamentosMin: number;
  acompanhamentosMax: number;
  crispysMin: number;
  crispysMax: number;
  proteinasExtrasMax: number;
  adicionaisMax: number;
  talherMin: number;
  talherMax: number;
}

export const REGRAS_TAMANHO: Record<"P" | "M" | "G", RegrasMontagemTamanho> = {
  P: {
    tamanho: "P",
    nome: "Poke Pequeno",
    precoBase: 59.9,
    basesMin: 1,
    basesMax: 1,
    proteinasMin: 1,
    proteinasMax: 1,
    molhosMin: 0,
    molhosMax: 2,
    acompanhamentosMin: 1,
    acompanhamentosMax: 4,
    crispysMin: 0,
    crispysMax: 1,
    proteinasExtrasMax: 2,
    adicionaisMax: 4,
    talherMin: 1,
    talherMax: 1,
  },
  M: {
    tamanho: "M",
    nome: "Poke Médio",
    precoBase: 74.9,
    basesMin: 1,
    basesMax: 1,
    proteinasMin: 2,
    proteinasMax: 2,
    molhosMin: 0,
    molhosMax: 2,
    acompanhamentosMin: 1,
    acompanhamentosMax: 5,
    crispysMin: 0,
    crispysMax: 2,
    proteinasExtrasMax: 2,
    adicionaisMax: 4,
    talherMin: 1,
    talherMax: 1,
  },
  G: {
    tamanho: "G",
    nome: "Poke Grande",
    precoBase: 89.9,
    basesMin: 1,
    basesMax: 1,
    proteinasMin: 3,
    proteinasMax: 3,
    molhosMin: 0,
    molhosMax: 2,
    acompanhamentosMin: 0,
    acompanhamentosMax: 6,
    crispysMin: 0,
    crispysMax: 3,
    proteinasExtrasMax: 2,
    adicionaisMax: 4,
    talherMin: 1,
    talherMax: 1,
  },
};

// 1. BASES (1 opção obrigatória)
export const BASES_MONTAGEM: OpcaoMontagem[] = [
  { id: "gohan-temperado", nome: "Gohan Temperado", precoExtra: 0 },
  { id: "arroz-japones", nome: "Arroz Japonês", descricao: "Arroz japonês (gohan) juntinho e saboroso", precoExtra: 0 },
  { id: "bifum", nome: "Bifum", descricao: "Macarrão fininho feito de farinha de arroz, sem glúten e vegano", precoExtra: 0 },
  { id: "arroz-integral", nome: "Arroz Integral", descricao: "Opção fit com mais nutrientes", precoExtra: 0 },
  { id: "mix-folhas", nome: "Mix de Folhas", descricao: "Mix de alfaces e acelga frescas", precoExtra: 0 },
];

// 2. PROTEÍNAS (Obrigatório conforme o tamanho)
export const PROTEINAS_MONTAGEM: OpcaoMontagem[] = [
  { id: "file-mignon", nome: "Filé mignon", precoExtra: 5.0 },
  { id: "porco-glaciado", nome: "Porco Glaciado", gramatura: "80g", precoExtra: 0 },
  { id: "peixe-crocante", nome: "Peixe Crocante", gramatura: "70g", precoExtra: 0 },
  { id: "atum", nome: "Atum", gramatura: "70g", precoExtra: 0 },
  { id: "atum-selado", nome: "Atum Selado", gramatura: "70g", precoExtra: 0 },
  { id: "shimeji", nome: "Shimeji", gramatura: "70g", precoExtra: 0 },
  { id: "salmao-fresco", nome: "Salmão Fresco", gramatura: "70g", precoExtra: 5.0 },
  { id: "salmao-macaricado", nome: "Salmão Maçaricado", gramatura: "70g", precoExtra: 5.0 },
  { id: "salmao-grelhado", nome: "Salmão Grelhado", gramatura: "70g", precoExtra: 5.0 },
  { id: "camarao", nome: "Camarão", gramatura: "70g", precoExtra: 0 },
  { id: "camarao-empanado", nome: "Camarão Empanado", gramatura: "70g", precoExtra: 0 },
  { id: "camarao-grelhado", nome: "Camarão Grelhado", gramatura: "70g", precoExtra: 0 },
  { id: "pasta-salmao", nome: "Pasta de Salmão", gramatura: "70g", precoExtra: 0 },
  { id: "tartare-salmao", nome: "Tartare de Salmão", gramatura: "70g", precoExtra: 5.0 },
  { id: "frango-grelhado", nome: "Frango Grelhado", gramatura: "80g", precoExtra: 0 },
  { id: "tartare-atum", nome: "Tartare de Atum", gramatura: "70g", precoExtra: 0 },
];

// 3. MOLHOS (Até 2 opções)
export const MOLHOS_MONTAGEM: OpcaoMontagem[] = [
  { id: "maionese-wasabi", nome: "Maionese de Wasabi", precoExtra: 0 },
  { id: "sweet-chilli", nome: "Sweet Chilli", precoExtra: 0 },
  { id: "molho-thai", nome: "Molho Thai", precoExtra: 0 },
  { id: "teriyaki", nome: "Teriyaki", precoExtra: 0 },
  { id: "maionese-spicy", nome: "Maionese Spicy", precoExtra: 0 },
  { id: "mostarda-mel", nome: "Mostarda e Mel", precoExtra: 0 },
  { id: "iogurte-castanha", nome: "Iogurte com Castanha", precoExtra: 0 },
  { id: "molho-casa", nome: "Molho da Casa", precoExtra: 0 },
  { id: "molho-citrus", nome: "Molho Citrus", precoExtra: 0 },
  { id: "molho-fit", nome: "Molho Fit", descricao: "Molho fit artesanal", precoExtra: 3.5 },
  { id: "shoyu-tradicional", nome: "Shoyu Tradicional", precoExtra: 0 },
  { id: "shoyu-light", nome: "Shoyu Light", precoExtra: 0 },
];

// 4. ACOMPANHAMENTOS (Limites por tamanho)
export const ACOMPANHAMENTOS_MONTAGEM: OpcaoMontagem[] = [
  { id: "abacaxi-natural", nome: "Abacaxi Natural", descricao: "Abacaxi em cubinhos", precoExtra: 0 },
  { id: "abacaxi-grelhado", nome: "Abacaxi Grelhado", descricao: "Abacaxi grelhado e caramelizado", precoExtra: 0 },
  { id: "abacate", nome: "Abacate", descricao: "Abacate em cubos com leve toque cítrico", precoExtra: 0 },
  { id: "amendoim", nome: "Amendoim", descricao: "Amendoim torrado sem casca e sem sal", precoExtra: 0 },
  { id: "brocolis", nome: "Brócolis", descricao: "Floretes de brócolis cozidos", precoExtra: 0 },
  { id: "cebola-roxa", nome: "Cebola Roxa", descricao: "Cebola roxa em tiras fininhas", precoExtra: 0 },
  { id: "cebolinha", nome: "Cebolinha", descricao: "Cebolinha em finas rodelas", precoExtra: 0 },
  { id: "cenoura", nome: "Cenoura", descricao: "Cenoura finamente ralada", precoExtra: 0 },
  { id: "coco", nome: "Coco", descricao: "Polpa de coco em lascas", precoExtra: 0 },
  { id: "gengibre", nome: "Gengibre", descricao: "Fatias de gengibre em conserva", precoExtra: 0 },
  { id: "guacamole", nome: "Guacamole", descricao: "Cremosa com abacate e toque cítrico", precoExtra: 0 },
  { id: "kani", nome: "Kani", descricao: "Kani-kama em tiras", precoExtra: 0 },
  { id: "manga", nome: "Manga", descricao: "Manga cortada em cubinhos", precoExtra: 0 },
  { id: "milho", nome: "Milho", descricao: "Milho verde em conserva", precoExtra: 0 },
  { id: "nori", nome: "Nori", descricao: "Alga cortada em tirinhas", precoExtra: 0 },
  { id: "salada-honolulu", nome: "Salada Honolulu", descricao: "Repolho, cheiro verde, uvas passas e molho agridoce", precoExtra: 0 },
  { id: "sunomono", nome: "Sunomono", descricao: "Rodelas de pepino em molho agridoce", precoExtra: 0 },
  { id: "sunomono-beterraba", nome: "Sunomono de Beterraba", descricao: "Beterraba ralada em molho agridoce", precoExtra: 0 },
  { id: "tomate-cereja", nome: "Tomate Cereja", descricao: "Tomates cereja frescos", precoExtra: 0 },
  { id: "espaguete-legumes", nome: "Espaguete de Legumes", descricao: "Abobrinha, batatinha e cenoura refogados", precoExtra: 0 },
];

// 5. CRISPYS (Limites por tamanho)
export const CRISPYS_MONTAGEM: OpcaoMontagem[] = [
  { id: "chips-batata-doce", nome: "Chips de batata doce", precoExtra: 0 },
  { id: "crispy-couve", nome: "Crispy de Couve", precoExtra: 0 },
  { id: "crispy-cebola", nome: "Crispy de Cebola", precoExtra: 0 },
  { id: "crispy-batata-doce", nome: "Crispy de Batata Doce", precoExtra: 0 },
  { id: "gergelim", nome: "Gergelim", precoExtra: 0 },
];

// 6. PROTEÍNAS EXTRAS (Opcional, até 2)
export const PROTEINAS_EXTRAS_MONTAGEM: OpcaoMontagem[] = [
  { id: "extra-file-mignon", nome: "Filé mignon (70g)", precoExtra: 17.9 },
  { id: "extra-salmao", nome: "Salmão Extra", precoExtra: 17.9 },
  { id: "extra-salmao-macaricado", nome: "Salmão Maçaricado Extra", precoExtra: 17.9 },
  { id: "extra-salmao-grelhado", nome: "Salmão Grelhado Extra", precoExtra: 17.9 },
  { id: "extra-tartare-salmao", nome: "Tartare de Salmão Extra", precoExtra: 17.9 },
  { id: "extra-pasta-salmao", nome: "Pasta de Salmão Extra", precoExtra: 17.9 },
  { id: "extra-camarao-cozido", nome: "Camarão Cozido Extra", precoExtra: 12.9 },
  { id: "extra-camarao-empanado", nome: "Camarão Empanado Extra", precoExtra: 12.9 },
  { id: "extra-camarao-grelhado", nome: "Camarão Grelhado Extra", precoExtra: 12.9 },
  { id: "extra-atum", nome: "Atum Extra", precoExtra: 12.9 },
  { id: "extra-atum-selado", nome: "Atum Selado Extra", precoExtra: 12.9 },
  { id: "extra-shimeji", nome: "Shimeji Extra", precoExtra: 12.9 },
  { id: "extra-peixe-crocante", nome: "Peixe Branco Crocante Extra", precoExtra: 12.9 },
  { id: "extra-frango", nome: "Frango Extra", precoExtra: 10.0 },
  { id: "extra-porco-glaciado", nome: "Porco Glaciado Extra", precoExtra: 12.9 },
];

// 7. ADICIONAIS (Opcional, até 4)
export const ADICIONAIS_MONTAGEM: OpcaoMontagem[] = [
  { id: "cream-cheese", nome: "Cream Cheese", descricao: "Porção adicional de cream cheese", precoExtra: 4.0 },
];

// 8. TALHER (1 opção obrigatória)
export const TALHERES_MONTAGEM: OpcaoMontagem[] = [
  { id: "hashi", nome: "Hashi", descricao: "Palitinhos de madeira", precoExtra: 0 },
  { id: "garfo", nome: "Garfo", descricao: "Garfo descartável", precoExtra: 0 },
  { id: "sem-talher", nome: "Não é necessário", descricao: "Não enviaremos talheres", precoExtra: 0 },
];

// -----------------------------------------------------------------------------
// Configuração da montagem por etapas (usada pela janela "Monte seu poke")
// -----------------------------------------------------------------------------

export type Tamanho = "P" | "M" | "G";
export type TipoEtapa = "unica" | "multipla" | "quantidade";

export interface EtapaMontagem {
  id: "base" | "proteinas" | "molhos" | "acompanhamentos" | "crispys" | "extras" | "adicionais" | "talher";
  titulo: string;
  opcoes: OpcaoMontagem[];
  min: number;
  max: number;
  /** unica = escolhe 1; multipla = marca várias; quantidade = contador por opção (extras pagos) */
  tipo: TipoEtapa;
}

export interface ConfigMontagem {
  /** P, M, G ou o id da receita da casa */
  chave: string;
  itemId: string;
  nome: string;
  precoBase: number;
  /** Proteína já definida nas receitas da casa (ex.: "80 g de pasta de salmão") */
  fixo?: string;
  etapas: EtapaMontagem[];
}

/** Seleção: etapa → opção → quantidade (1 nas etapas de marcar) */
export type SelecaoMontagem = Partial<Record<EtapaMontagem["id"], Record<string, number>>>;

const ID_ITEM_TAMANHO: Record<Tamanho, string> = { P: "poke-pequeno", M: "poke-medio", G: "poke-grande" };

export function configTamanho(t: Tamanho): ConfigMontagem {
  const r = REGRAS_TAMANHO[t];
  return {
    chave: t,
    itemId: ID_ITEM_TAMANHO[t],
    nome: r.nome,
    precoBase: r.precoBase,
    etapas: [
      { id: "base", titulo: "Base", opcoes: BASES_MONTAGEM, min: 1, max: 1, tipo: "unica" },
      { id: "proteinas", titulo: "Proteínas", opcoes: PROTEINAS_MONTAGEM, min: r.proteinasMin, max: r.proteinasMax, tipo: "multipla" },
      { id: "molhos", titulo: "Molhos", opcoes: MOLHOS_MONTAGEM, min: 0, max: r.molhosMax, tipo: "multipla" },
      { id: "acompanhamentos", titulo: "Acompanhamentos", opcoes: ACOMPANHAMENTOS_MONTAGEM, min: r.acompanhamentosMin, max: r.acompanhamentosMax, tipo: "multipla" },
      { id: "crispys", titulo: "Crispys", opcoes: CRISPYS_MONTAGEM, min: 0, max: r.crispysMax, tipo: "multipla" },
      { id: "extras", titulo: "Proteína extra", opcoes: PROTEINAS_EXTRAS_MONTAGEM, min: 0, max: r.proteinasExtrasMax, tipo: "quantidade" },
      { id: "adicionais", titulo: "Adicionais", opcoes: ADICIONAIS_MONTAGEM, min: 0, max: r.adicionaisMax, tipo: "quantidade" },
      { id: "talher", titulo: "Talher", opcoes: TALHERES_MONTAGEM, min: 1, max: 1, tipo: "unica" },
    ],
  };
}

/**
 * Receitas da casa que pedem escolhas (a descrição do briefing do cliente diz "+ 1 base + N acompanhamentos +
 * 2 molhos + N crispys"). A proteína vem pronta; as listas de opções são as mesmas do Monte seu Poke.
 * [A CONFIRMAR com o cliente: se as opções das receitas são as mesmas da montagem.]
 */
const RECEITAS: Record<string, { fixo: string; acomp: number; crispys: number }> = {
  "poke-makaha": { fixo: "80 g de pasta de salmão", acomp: 4, crispys: 1 },
  "poke-pequeno-frango-grelhado": { fixo: "80 g de frango grelhado", acomp: 4, crispys: 1 },
  "poke-medio-frango-grelhado": { fixo: "160 g de frango grelhado", acomp: 5, crispys: 2 },
  "poke-grande-frango-grelhado": { fixo: "240 g de frango grelhado", acomp: 6, crispys: 2 },
};

export function configReceita(itemId: string, nome: string, preco: number): ConfigMontagem | null {
  const r = RECEITAS[itemId];
  if (!r) return null;
  return {
    chave: itemId,
    itemId,
    nome,
    precoBase: preco,
    fixo: r.fixo,
    etapas: [
      { id: "base", titulo: "Base", opcoes: BASES_MONTAGEM, min: 1, max: 1, tipo: "unica" },
      { id: "molhos", titulo: "Molhos", opcoes: MOLHOS_MONTAGEM, min: 0, max: 2, tipo: "multipla" },
      { id: "acompanhamentos", titulo: "Acompanhamentos", opcoes: ACOMPANHAMENTOS_MONTAGEM, min: 1, max: r.acomp, tipo: "multipla" },
      { id: "crispys", titulo: "Crispys", opcoes: CRISPYS_MONTAGEM, min: 0, max: r.crispys, tipo: "multipla" },
      { id: "talher", titulo: "Talher", opcoes: TALHERES_MONTAGEM, min: 1, max: 1, tipo: "unica" },
    ],
  };
}

export function temReceita(itemId: string) {
  return itemId in RECEITAS;
}

export function totalEtapa(selecao: SelecaoMontagem, etapa: EtapaMontagem) {
  return Object.values(selecao[etapa.id] ?? {}).reduce((a, b) => a + b, 0);
}

export function precoExtras(config: ConfigMontagem, selecao: SelecaoMontagem) {
  let total = 0;
  for (const etapa of config.etapas) {
    for (const [id, qtd] of Object.entries(selecao[etapa.id] ?? {})) {
      const op = etapa.opcoes.find((o) => o.id === id);
      if (op?.precoExtra) total += op.precoExtra * qtd;
    }
  }
  return Math.round(total * 100) / 100;
}

/** Etapas obrigatórias que ainda faltam, na ordem da janela. */
export function etapasPendentes(config: ConfigMontagem, selecao: SelecaoMontagem) {
  return config.etapas.filter((e) => totalEtapa(selecao, e) < e.min);
}

/** Resumo legível, usado na sacola e na mensagem do WhatsApp. */
export function resumoMontagem(config: ConfigMontagem, selecao: SelecaoMontagem) {
  const linhas: { titulo: string; itens: string[] }[] = [];
  if (config.fixo) linhas.push({ titulo: "Proteína", itens: [config.fixo] });
  for (const etapa of config.etapas) {
    const itens = Object.entries(selecao[etapa.id] ?? {})
      .filter(([, q]) => q > 0)
      .map(([id, q]) => {
        const nome = etapa.opcoes.find((o) => o.id === id)?.nome ?? id;
        return q > 1 ? `${q}x ${nome}` : nome;
      });
    if (itens.length) linhas.push({ titulo: etapa.titulo, itens });
  }
  return linhas;
}

export function configPorChave(chave: string, nome: string, preco: number): ConfigMontagem | null {
  if (chave === "P" || chave === "M" || chave === "G") return configTamanho(chave);
  return configReceita(chave, nome, preco);
}
