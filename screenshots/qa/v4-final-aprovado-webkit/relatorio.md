# Relatório de Auditoria QA — V4-FINAL-APROVADO-WEBKIT (WebKit (Safari Engine))

- **URL auditada:** `http://127.0.0.1:3005/`
- **Data/Hora:** 2026-10-16 04:27:00
- **Canal do Navegador:** WebKit (Safari Engine)

## 1. Tabela Comparativa por Largura

| Largura | Console Erros | Doc Scrollbar? | Overflow Elementos | Alvos < 44px | Img Problemas | LCP (ms) | CLS | Long Tasks (>50ms) | Transferência (KB) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **360px** | 0 | NÃO | 0 | 0 | 0 | 288 | 0 | 0 | 1625.1 KB |
| **390px** | 0 | NÃO | 0 | 0 | 0 | 264 | 0 | 0 | 1663.5 KB |
| **430px** | 0 | NÃO | 0 | 0 | 0 | 256 | 0 | 0 | 1663.5 KB |
| **768px** | 0 | NÃO | 0 | 0 | 0 | 316 | 0 | 0 | 2127.7 KB |
| **1024px** | 0 | NÃO | 0 | 0 | 0 | 296 | 0 | 0 | 2113.2 KB |
| **1440px** | 0 | NÃO | 0 | 0 | 0 | 300 | 0 | 0 | 2352.1 KB |

## 2. Detalhamento de Problemas por Largura

### Viewport 360px (mobile-360)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 360px)
- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px
- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 1625.1 KB (Imagens: 366.6 KB, Scripts: 529.3 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

### Viewport 390px (mobile-390)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 390px)
- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px
- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 1663.5 KB (Imagens: 405.0 KB, Scripts: 529.3 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

### Viewport 430px (mobile-430)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 430px)
- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px
- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 1663.5 KB (Imagens: 405.0 KB, Scripts: 529.3 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

### Viewport 768px (tablet-768)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 768px)
- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px
- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 2127.7 KB (Imagens: 869.2 KB, Scripts: 529.3 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

### Viewport 1024px (desktop-1024)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 1024px)
- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px
- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 2113.2 KB (Imagens: 854.7 KB, Scripts: 529.3 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

### Viewport 1440px (desktop-1440)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 1440px)
- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px
- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 2352.1 KB (Imagens: 1093.6 KB, Scripts: 529.3 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

## 3. Maiores Arquivos Transferidos (Top 10)

| Arquivo | Categoria | Tamanho (KB) |
|:---|:---:|:---:|
| `http://127.0.0.1:3005/` | other | 274.1 KB |
| `http://127.0.0.1:3005/` | other | 274.1 KB |
| `3dmm3v_fq28gc.js` | script | 224.4 KB |
| `10g5ub5068kzx.js` | script | 164.7 KB |
| `mesa-desktop-1600.webp` | img | 100.1 KB |
| `poke-grande-800.webp` | img | 99.4 KB |
| `poke-makaha-800.webp` | img | 76.0 KB |
| `__next._index.txt` | other | 70.2 KB |
| `move-on-800.webp` | img | 63.5 KB |
| `anti-ox-400.webp` | img | 56.5 KB |

## 4. Fontes Carregadas

| Família | Status | Peso | Estilo |
|:---|:---:|:---:|
| Aktiv Grotesk | loaded | 300 | normal |
| Aktiv Grotesk | loaded | 400 | normal |
| Aktiv Grotesk | loaded | 500 | normal |
| Aktiv Grotesk | loaded | 700 | normal |
| Aktiv Grotesk | loaded | 800 | normal |
| Kaufmann | loaded | 400 | normal |

