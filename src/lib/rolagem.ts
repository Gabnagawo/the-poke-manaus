// Navegação dentro da página sem criar entradas de "#âncora" no histórico,
// para o botão voltar do celular não ficar pulando entre seções.

export function irPara(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // scrollIntoView respeita o scroll-padding-top (cabeçalho + abas do cardápio)
  el.scrollIntoView({ behavior: reduzir ? "auto" : "smooth", block: "start" });
}

/** Para links: navega sem hash quando há JS; sem JS o href="#id" continua funcionando. */
export function aoClicarAncora(e: React.MouseEvent<HTMLAnchorElement>, id: string, antes?: () => void) {
  if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
  e.preventDefault();
  if (antes) {
    antes();
    setTimeout(() => irPara(id), 140);
  } else {
    irPara(id);
  }
}
