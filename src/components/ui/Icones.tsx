// Ícones de traço (SVG), sempre na cor do texto.
type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const IconeSeta = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export const IconeSetaExterna = ({ className = "w-3.5 h-3.5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const IconeSacola = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M5 8h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 8Z" />
    <path d="M9 10V7a3 3 0 0 1 6 0v3" />
  </svg>
);

export const IconeMais = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.2}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);

export const IconeMenos = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.2}>
    <path d="M5 12h14" />
  </svg>
);

export const IconeFechar = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconeCheck = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.4}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const IconeLixo = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 7h16M10 11v6M14 11v6M6 7l1 12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-12M9 7V4h6v3" />
  </svg>
);

export const IconeLapis = ({ className = "w-4 h-4" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z" />
  </svg>
);

export const IconeVoltar = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
    <path d="M19 12H5M11 6l-6 6 6 6" />
  </svg>
);

export const IconeMenu = ({ className = "w-6 h-6" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2}>
    <path d="M3 7h18M3 12h18M3 17h18" />
  </svg>
);

export const IconeInstagram = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
  </svg>
);

export const IconeWhatsApp = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
    <path d="M12 2.2A9.8 9.8 0 0 0 3.6 17l-1.4 4.8 5-1.3A9.8 9.8 0 1 0 12 2.2Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 12 20Zm4.4-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.5-.4h-.5a.9.9 0 0 0-.6.3 2.7 2.7 0 0 0-.8 2c0 1.2.9 2.3 1 2.5.1.2 1.7 2.6 4.1 3.6 1.5.7 2.1.7 2.9.6.5-.1 1.4-.6 1.6-1.1.2-.6.2-1 .1-1.1l-.4-.3Z" />
  </svg>
);

export const IconeLocal = ({ className = "w-5 h-5" }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...base}>
    <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </svg>
);
