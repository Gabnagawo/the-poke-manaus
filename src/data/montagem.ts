// Opções oficiais para a montagem de poke personalizada (Monte seu Poke)
// Fonte direta: the-poke/CARDAPIO-montagem.md (coletado no iFood The Poke Manaus Aleixo)

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

export interface DetalhesMontagemPoke {
  tamanho: "P" | "M" | "G";
  bases: string[];
  proteinas: string[];
  molhos: string[];
  acompanhamentos: string[];
  crispys: string[];
  proteinasExtras: string[];
  adicionais: string[];
  talher: string;
  observacao?: string;
  precoExtras: number;
}
