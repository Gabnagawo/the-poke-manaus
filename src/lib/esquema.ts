import { LOJA } from "./loja";
import { ITENS_CARDAPIO } from "@/data/cardapio";
import { SITE_URL } from "./metadados";

export function gerarEsquemaRestaurante() {
  return {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE_URL}/#restaurant`,
    name: LOJA.nome,
    alternateName: LOJA.marca,
    description: "Restaurante de comida havaiana e saudável especializado em pokes personalizáveis e sucos especiais no Park Mall Ephigênio em Manaus.",
    image: `${SITE_URL}/og-image.jpg`,
    logo: `${SITE_URL}/icon-512.png`,
    url: SITE_URL,
    servesCuisine: ["Hawaiian", "Healthy", "Poke", "Seafood"],
    priceRange: "$$",
    slogan: LOJA.slogan,
    taxID: LOJA.cnpj,
    address: {
      "@type": "PostalAddress",
      streetAddress: LOJA.enderecoLinha,
      addressLocality: LOJA.cidade,
      addressRegion: LOJA.estado,
      postalCode: LOJA.cep,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -3.0903,
      longitude: -59.9928,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "11:00",
        closes: "23:00",
      },
    ],
    hasMenu: {
      "@type": "Menu",
      name: "Cardápio The Poke Manaus",
      hasMenuSection: [
        {
          "@type": "MenuSection",
          name: "Monte seu Poke",
          hasMenuItem: ITENS_CARDAPIO.filter((i) => i.categoria === "monte-seu-poke").map((item) => ({
            "@type": "MenuItem",
            name: item.nome,
            description: item.descricao,
            offers: {
              "@type": "Offer",
              price: item.preco.toFixed(2),
              priceCurrency: "BRL",
            },
          })),
        },
        {
          "@type": "MenuSection",
          name: "Pokes da Casa",
          hasMenuItem: ITENS_CARDAPIO.filter((i) => i.categoria === "promocoes").map((item) => ({
            "@type": "MenuItem",
            name: item.nome,
            description: item.descricao,
            offers: {
              "@type": "Offer",
              price: item.preco.toFixed(2),
              priceCurrency: "BRL",
            },
          })),
        },
        {
          "@type": "MenuSection",
          name: "Sucos Especiais",
          hasMenuItem: ITENS_CARDAPIO.filter((i) => i.categoria === "sucos").map((item) => ({
            "@type": "MenuItem",
            name: item.nome,
            description: item.descricao,
            offers: {
              "@type": "Offer",
              price: item.preco.toFixed(2),
              priceCurrency: "BRL",
            },
          })),
        },
        {
          "@type": "MenuSection",
          name: "Bebidas",
          hasMenuItem: ITENS_CARDAPIO.filter((i) => i.categoria === "bebidas").map((item) => ({
            "@type": "MenuItem",
            name: item.nome,
            description: item.descricao,
            offers: {
              "@type": "Offer",
              price: item.preco.toFixed(2),
              priceCurrency: "BRL",
            },
          })),
        },
      ],
    },
    sameAs: [LOJA.linkIfood, LOJA.instagram, LOJA.redeInstagram, LOJA.redeSite],
  };
}

export function textoLlms(): string {
  return `# ${LOJA.nome} (${LOJA.marca})

> ${LOJA.slogan}

## Visão Geral
Restaurante de poke em Manaus/AM, no Condomínio Park Mall Ephigênio (bairro Aleixo). Primeira unidade da rede Thepoke® na Região Norte, com pokes montados por etapas (Monte seu Poke), receitas da casa e sucos especiais.

## Localização e Horário
- Endereço: ${LOJA.enderecoLinha} — ${LOJA.bairro}, ${LOJA.cidade}/${LOJA.estado}, CEP ${LOJA.cep}
- Funcionamento: ${LOJA.horario}
- CNPJ: ${LOJA.cnpj}
- Instagram: ${LOJA.instagramHandle} (${LOJA.instagram})
- Delivery Oficial: iFood (${LOJA.linkIfood})

## Cardápio e Preços
### Monte seu Poke
- Poke Pequeno (R$ 59,90): 1 base + 1 porção de proteína + 2 molhos + 4 acompanhamentos + 1 crispy
- Poke Médio (R$ 74,90): 1 base + 2 porções de proteína + 2 molhos + 5 acompanhamentos + 2 crispys
- Poke Grande (R$ 89,90): 1 base + 3 porções de proteína + 2 molhos + 6 acompanhamentos + 3 crispys

### Pokes da Casa
- Poke Makaha (R$ 59,90): 80 g de pasta de salmão + 1 base + 4 acompanhamentos + 2 molhos + 1 crispy
- Poke Pequeno Frango Grelhado (R$ 44,90): 80 g de frango grelhado + 1 base + 4 acompanhamentos + 2 molhos + 1 crispy
- Poke Médio Frango Grelhado (R$ 58,90): 160 g de frango grelhado + 1 base + 5 acompanhamentos + 2 molhos + 2 crispys
- Poke Grande Frango Grelhado (R$ 73,90): 240 g de frango grelhado + 1 base + 6 acompanhamentos + 2 molhos + 2 crispys
- Poke Médio Frango Teriyaki (R$ 59,90): 160 g de frango em cubos, empanado e frito, caramelizado no molho teriyaki com gengibre

### Sucos Especiais (R$ 19,90 a R$ 28,90)
- Anti-Ox (R$ 19,90): Morango + uva
- Ensolarado (R$ 19,90): Morango + tangerina
- Guaraflow (R$ 19,90): Pó de guaraná + xarope de guaraná + gelo + limão
- Laranja (R$ 19,90): Suco natural da fruta
- Move On (R$ 28,90): Açaí + morango
- Power Red (R$ 19,90): Frutas vermelhas
- Reset Green (R$ 19,90): Suco verde: abacaxi, hortelã, couve-folha, brócolis, espinafre
- Tropicalize (R$ 19,90): Abacaxi + frutas vermelhas
- Mente Fresh (R$ 19,90): Abacaxi + hortelã
- Sussa Vibe (R$ 19,90): Maracujá + morango
- Imune-se (R$ 19,90): Acerola + tangerina
- Limão (R$ 19,90): Suco natural da fruta

### Bebidas
- Água mineral sem gás 500 ml: R$ 8,00
- Água mineral com gás 500 ml: R$ 6,00
- H2OH! Limoneto 500 ml: R$ 10,00
- Refrigerantes lata 350 ml (Coca-Cola, Coca-Cola Zero, Guaraná Antarctica, Fanta Laranja, Fanta Uva, Schweppes Citrus): R$ 10,00
- Guaraná Antarctica Zero lata 350 ml: R$ 5,90
- Cerveja Heineken 355 ml: R$ 18,00
- Cerveja Corona Extra 355 ml: R$ 20,00
`;
}
