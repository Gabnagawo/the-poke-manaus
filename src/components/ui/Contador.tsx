"use client";

import { IconeLixo, IconeMais, IconeMenos } from "./Icones";

interface ContadorProps {
  valor: number;
  onMais: () => void;
  onMenos: () => void;
  rotulo: string;
  /** Desliga o "+" (limite atingido) */
  semMais?: boolean;
  /** Mostra a lixeira no lugar do "−" quando o valor é 1 */
  lixeiraNoUm?: boolean;
  claro?: boolean;
}

export function Contador({ valor, onMais, onMenos, rotulo, semMais, lixeiraNoUm, claro }: ContadorProps) {
  const cor = claro ? "bg-white" : "bg-creme-2";
  return (
    <div className={`inline-flex items-center rounded-full ${cor} p-0.5`} role="group" aria-label={rotulo}>
      <button
        type="button"
        onClick={onMenos}
        className="grid place-items-center w-11 h-11 rounded-full active:bg-petroleo/10 transition-colors"
        aria-label={valor === 1 && lixeiraNoUm ? `Remover ${rotulo}` : `Diminuir ${rotulo}`}
      >
        {valor === 1 && lixeiraNoUm ? <IconeLixo /> : <IconeMenos />}
      </button>
      <span className="min-w-6 text-center text-[16px] font-bold num" aria-live="polite">
        {valor}
      </span>
      <button
        type="button"
        onClick={onMais}
        disabled={semMais}
        className="grid place-items-center w-11 h-11 rounded-full active:bg-petroleo/10 transition-colors disabled:opacity-30"
        aria-label={`Aumentar ${rotulo}`}
      >
        <IconeMais />
      </button>
    </div>
  );
}
