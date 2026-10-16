export interface ItemCardapio {
  id: string;
  nome: string;
  categoria: "monte-seu-poke" | "promocoes" | "sucos" | "bebidas";
  preco: number;
  descricao: string;
  imagem?: string;
  destaque?: boolean;
  tamanho?: "P" | "M" | "G";
  regrasMontagem?: {
    basesMax: number;
    proteinasMax: number;
    molhosMax: number;
    acompanhamentosMax: number;
    crispysMax: number;
  };
}

export interface CategoriaCardapio {
  id: "monte-seu-poke" | "promocoes" | "sucos" | "bebidas";
  titulo: string;
  subtitulo: string;
  itens: ItemCardapio[];
}

export const ITENS_CARDAPIO: ItemCardapio[] = [
  // --- MONTE SEU POKE ---
  {
    id: "poke-pequeno",
    nome: "Poke Pequeno",
    categoria: "monte-seu-poke",
    preco: 59.9,
    tamanho: "P",
    descricao: "1 base + 1 porção de proteína + 2 molhos + 4 acompanhamentos + 1 crispy",
    imagem: "/images/pratos/poke-pequeno.webp",
    regrasMontagem: {
      basesMax: 1,
      proteinasMax: 1,
      molhosMax: 2,
      acompanhamentosMax: 4,
      crispysMax: 1,
    },
  },
  {
    id: "poke-medio",
    nome: "Poke Médio",
    categoria: "monte-seu-poke",
    preco: 74.9,
    tamanho: "M",
    descricao: "1 base + 2 porções de proteína + 2 molhos + 5 acompanhamentos + 2 crispys",
    imagem: "/images/pratos/poke-medio.webp",
    destaque: true,
    regrasMontagem: {
      basesMax: 1,
      proteinasMax: 2,
      molhosMax: 2,
      acompanhamentosMax: 5,
      crispysMax: 2,
    },
  },
  {
    id: "poke-grande",
    nome: "Poke Grande",
    categoria: "monte-seu-poke",
    preco: 89.9,
    tamanho: "G",
    descricao: "1 base + 3 porções de proteína + 2 molhos + 6 acompanhamentos + 3 crispys",
    imagem: "/images/pratos/poke-grande.webp",
    regrasMontagem: {
      basesMax: 1,
      proteinasMax: 3,
      molhosMax: 2,
      acompanhamentosMax: 6,
      crispysMax: 3,
    },
  },

  // --- PROMOÇÕES / POKES DA CASA ---
  {
    id: "poke-makaha",
    nome: "Poke Makaha",
    categoria: "promocoes",
    preco: 59.9,
    descricao: "80 g de pasta de salmão + 1 base + 4 acompanhamentos + 2 molhos + 1 crispy",
    imagem: "/images/pratos/poke-makaha.webp",
  },
  {
    id: "poke-pequeno-frango-grelhado",
    nome: "Poke Pequeno – Frango Grelhado",
    categoria: "promocoes",
    preco: 44.9,
    descricao: "80 g de frango grelhado + 1 base + 4 acompanhamentos + 2 molhos + 1 crispy",
    imagem: "/images/pratos/poke-pequeno-frango-grelhado.webp",
  },
  {
    id: "poke-medio-frango-grelhado",
    nome: "Poke Médio – Frango Grelhado",
    categoria: "promocoes",
    preco: 58.9,
    descricao: "160 g de frango grelhado + 1 base + 5 acompanhamentos + 2 molhos + 2 crispys",
    imagem: "/images/pratos/poke-medio-frango-grelhado.webp",
  },
  {
    id: "poke-grande-frango-grelhado",
    nome: "Poke Grande – Frango Grelhado",
    categoria: "promocoes",
    preco: 73.9,
    descricao: "240 g de frango grelhado + 1 base + 6 acompanhamentos + 2 molhos + 2 crispys",
    imagem: "/images/pratos/poke-grande-frango-grelhado.webp",
  },
  {
    id: "poke-medio-frango-teriyaki",
    nome: "Poke Médio – Frango Teriyaki",
    categoria: "promocoes",
    preco: 59.9,
    descricao: "160 g de frango em cubos, empanado e frito, caramelizado no molho teriyaki com gengibre",
    imagem: "/images/pratos/poke-medio-frango-teriyaki.webp",
  },

  // --- SUCOS ESPECIAIS ---
  {
    id: "suco-anti-ox",
    nome: "Anti-Ox",
    categoria: "sucos",
    preco: 19.9,
    descricao: "Morango + uva (açúcar ou adoçante, a pedido)",
    imagem: "/images/pratos/anti-ox.webp",
  },
  {
    id: "suco-ensolarado",
    nome: "Ensolarado",
    categoria: "sucos",
    preco: 19.9,
    descricao: "Morango + tangerina",
    imagem: "/images/pratos/ensolarado.webp",
  },
  {
    id: "suco-guaraflow",
    nome: "Guaraflow",
    categoria: "sucos",
    preco: 19.9,
    descricao: "Pó de guaraná + xarope de guaraná + gelo + limão",
    imagem: "/images/pratos/guaraflow.webp",
    destaque: true,
  },
  {
    id: "suco-laranja",
    nome: "Laranja",
    categoria: "sucos",
    preco: 19.9,
    descricao: "Suco natural da fruta",
    imagem: "/images/pratos/laranja.webp",
  },
  {
    id: "suco-move-on",
    nome: "Move On",
    categoria: "sucos",
    preco: 28.9,
    descricao: "Açaí + morango",
    imagem: "/images/pratos/move-on.webp",
  },
  {
    id: "suco-power-red",
    nome: "Power Red",
    categoria: "sucos",
    preco: 19.9,
    descricao: "Frutas vermelhas",
    imagem: "/images/pratos/power-red.webp",
  },
  {
    id: "suco-reset-green",
    nome: "Reset Green",
    categoria: "sucos",
    preco: 19.9,
    descricao: "Suco verde: abacaxi, hortelã, couve-folha, brócolis, espinafre",
    imagem: "/images/pratos/reset-green.webp",
  },
  {
    id: "suco-tropicalize",
    nome: "Tropicalize",
    categoria: "sucos",
    preco: 19.9,
    descricao: "Abacaxi + frutas vermelhas",
    imagem: "/images/pratos/tropicalize.webp",
  },
  {
    id: "suco-mente-fresh",
    nome: "Mente Fresh",
    categoria: "sucos",
    preco: 19.9,
    descricao: "Abacaxi + hortelã",
    imagem: "/images/pratos/mente-fresh.webp",
  },
  {
    id: "suco-sussa-vibe",
    nome: "Sussa Vibe",
    categoria: "sucos",
    preco: 19.9,
    descricao: "Maracujá + morango",
    imagem: "/images/pratos/sussa-vibe.webp",
  },
  {
    id: "suco-imune-se",
    nome: "Imune-se",
    categoria: "sucos",
    preco: 19.9,
    descricao: "Acerola + tangerina",
    imagem: "/images/pratos/imune-se.webp",
  },
  {
    id: "suco-limao",
    nome: "Limão",
    categoria: "sucos",
    preco: 19.9,
    descricao: "Suco natural da fruta",
  },

  // --- BEBIDAS ---
  {
    id: "bebida-agua-mineral",
    nome: "Água Mineral",
    categoria: "bebidas",
    preco: 8.0,
    descricao: "Sem gás, 500 ml",
  },
  {
    id: "bebida-agua-com-gas",
    nome: "Água Mineral com Gás",
    categoria: "bebidas",
    preco: 6.0,
    descricao: "Com gás, 500 ml",
  },
  {
    id: "bebida-h2oh-limoneto",
    nome: "H2OH! Limoneto",
    categoria: "bebidas",
    preco: 10.0,
    descricao: "Garrafa 500 ml",
  },
  {
    id: "bebida-coca-cola",
    nome: "Coca-Cola",
    categoria: "bebidas",
    preco: 10.0,
    descricao: "Lata 350 ml",
  },
  {
    id: "bebida-coca-cola-zero",
    nome: "Coca-Cola Zero",
    categoria: "bebidas",
    preco: 10.0,
    descricao: "Lata 350 ml",
  },
  {
    id: "bebida-guarana-antarctica",
    nome: "Guaraná Antarctica",
    categoria: "bebidas",
    preco: 10.0,
    descricao: "Lata 350 ml",
  },
  {
    id: "bebida-guarana-antarctica-zero",
    nome: "Guaraná Antarctica Zero",
    categoria: "bebidas",
    preco: 5.9,
    descricao: "Lata 350 ml",
  },
  {
    id: "bebida-fanta-laranja",
    nome: "Fanta Laranja",
    categoria: "bebidas",
    preco: 10.0,
    descricao: "Lata 350 ml",
  },
  {
    id: "bebida-fanta-uva",
    nome: "Fanta Uva",
    categoria: "bebidas",
    preco: 10.0,
    descricao: "Lata 350 ml",
  },
  {
    id: "bebida-schweppes-citrus",
    nome: "Schweppes Citrus",
    categoria: "bebidas",
    preco: 10.0,
    descricao: "Lata 350 ml",
  },
  {
    id: "bebida-corona-extra",
    nome: "Corona Extra",
    categoria: "bebidas",
    preco: 20.0,
    descricao: "Cerveja pilsen mexicana, 355 ml",
  },
  {
    id: "bebida-heineken",
    nome: "Heineken",
    categoria: "bebidas",
    preco: 18.0,
    descricao: "Long neck 355 ml (proibida para menores de 18 anos)",
  },
];

export const CATEGORIAS_CARDAPIO: CategoriaCardapio[] = [
  {
    id: "monte-seu-poke",
    titulo: "Monte seu Poke",
    subtitulo: "Escolha o tamanho e monte com ingredientes frescos na tigela",
    itens: ITENS_CARDAPIO.filter((i) => i.categoria === "monte-seu-poke"),
  },
  {
    id: "promocoes",
    titulo: "Pokes da Casa",
    subtitulo: "Receitas prontas da casa",
    itens: ITENS_CARDAPIO.filter((i) => i.categoria === "promocoes"),
  },
  {
    id: "sucos",
    titulo: "Sucos Especiais",
    subtitulo: "Combinações funcionais e nutritivas preparadas na hora",
    itens: ITENS_CARDAPIO.filter((i) => i.categoria === "sucos"),
  },
  {
    id: "bebidas",
    titulo: "Bebidas",
    subtitulo: "Águas, refrigerantes e cervejas",
    itens: ITENS_CARDAPIO.filter((i) => i.categoria === "bebidas"),
  },
];
