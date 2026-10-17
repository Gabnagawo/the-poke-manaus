// Fotos do cardápio: recortes reais (briefing do cliente) já aparados no tamanho do prato,
// gerados por scripts/gerar-fotos-cardapio.py em 200, 400 e 800 px de largura.

import { DIMENSOES_FOTOS } from "@/data/dimensoes-fotos";

/** width/height reais da foto aparada (proporção), para as <img> */
export function dimensoes(slug: string) {
  const d = DIMENSOES_FOTOS[slug];
  return d ? { width: d[0], height: d[1] } : {};
}

export function fotoSrc(slug: string, largura: 200 | 400 | 800 = 400) {
  return `/images/cardapio/${slug}-${largura}.webp`;
}

export function fotoSrcSet(slug: string) {
  return `${fotoSrc(slug, 200)} 200w, ${fotoSrc(slug, 400)} 400w, ${fotoSrc(slug, 800)} 800w`;
}

/** Copos de suco: o corte da foto original é reto embaixo, então ficam encostados na base do quadro. */
const COPOS = new Set([
  "anti-ox",
  "ensolarado",
  "guaraflow",
  "imune-se",
  "mente-fresh",
  "move-on",
  "power-red",
  "reset-green",
  "sussa-vibe",
  "tropicalize",
]);
export const ehCopo = (slug?: string) => !!slug && COPOS.has(slug);

/** Foto que não é recorte (laranja: mão segurando o copo, fundo claro) */
const FOTOS_INTEIRAS = new Set(["laranja"]);
export const ehFotoInteira = (slug?: string) => !!slug && FOTOS_INTEIRAS.has(slug);

/** Cor pastel do quadro por categoria (limon.no usa um tom por categoria) */
export const PASTEL: Record<string, string> = {
  "monte-seu-poke": "bg-areia",
  promocoes: "bg-pessego",
  sucos: "bg-lavanda",
  bebidas: "bg-menta",
};
