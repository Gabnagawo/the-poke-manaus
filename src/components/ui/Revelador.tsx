"use client";

// Liga as entradas suaves (.revelar) quando cada bloco aparece na tela, como na limon.no.
// Um único IntersectionObserver para a página toda; cada elemento só anima uma vez.

import { useEffect } from "react";
import { limparHistoricoDePainel } from "./Painel";

export function Revelador() {
  useEffect(() => {
    limparHistoricoDePainel();
    // painéis usam o histórico; sem isso o navegador "devolve" a rolagem antiga ao fechar
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";
    const elementos = Array.from(document.querySelectorAll<HTMLElement>(".revelar:not(.visivel)"));
    if (!("IntersectionObserver" in window)) {
      elementos.forEach((el) => el.classList.add("visivel"));
      return;
    }
    const observador = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            observador.unobserve(entrada.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    elementos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, []);
  return null;
}
