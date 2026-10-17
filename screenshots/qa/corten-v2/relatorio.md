# Relatório de Auditoria QA — CORTEN-V2 (Microsoft Edge (Chromium))

- **URL auditada:** `http://localhost:3009/`
- **Data/Hora:** 2026-10-16 16:31:13
- **Canal do Navegador:** Microsoft Edge (Chromium)

## 1. Tabela Comparativa por Largura

| Largura | Console Erros | Doc Scrollbar? | Overflow Elementos | Alvos < 44px | Img Problemas | LCP (ms) | CLS | Long Tasks (>50ms) | Transferência (KB) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **360px** | 0 | NÃO | 0 | 0 | 0 | 384 | 0 | 0 | 2361.3 KB |
| **390px** | 0 | NÃO | 0 | 0 | 0 | 156 | 0 | 0 | 2361.3 KB |
| **430px** | 0 | NÃO | 0 | 0 | 0 | 160 | 0 | 0 | 2332.9 KB |
| **768px** | 0 | NÃO | 0 | 0 | 0 | 96 | 0 | 0 | 3428.2 KB |
| **1024px** | 0 | NÃO | 0 | 1 | 0 | 148 | 0 | 0 | 3184.4 KB |
| **1440px** | 0 | NÃO | 0 | 1 | 0 | 120 | 0.001 | 0 | 4684.5 KB |

## 2. Detalhamento de Problemas por Largura

### Viewport 360px (mobile-360)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 360px)
- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px
- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 2361.3 KB (Imagens: 926.2 KB, Scripts: 495.0 KB, Fontes: 88.0 KB, CSS: 0.0 KB)

### Viewport 390px (mobile-390)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 390px)
- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px
- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 2361.3 KB (Imagens: 926.2 KB, Scripts: 495.0 KB, Fontes: 88.0 KB, CSS: 0.0 KB)

### Viewport 430px (mobile-430)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 430px)
- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px
- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 2332.9 KB (Imagens: 897.9 KB, Scripts: 495.0 KB, Fontes: 88.0 KB, CSS: 0.0 KB)

### Viewport 768px (tablet-768)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 768px)
- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px
- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 3428.2 KB (Imagens: 1993.2 KB, Scripts: 495.0 KB, Fontes: 88.0 KB, CSS: 0.0 KB)

### Viewport 1024px (desktop-1024)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 1024px)
**Alvos de Toque Menores que 44×44px (1):**
- `header.fixed.inset-x-0 > div.relative.mx-auto:nth-of-type(2) > nav.hidden.items-center > a.relative.py-3:nth-of-type(3)` (texto: "Obras") — 38.8×45px

- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 3184.4 KB (Imagens: 1732.2 KB, Scripts: 495.0 KB, Fontes: 88.0 KB, CSS: 0.0 KB)

### Viewport 1440px (desktop-1440)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 1440px)
**Alvos de Toque Menores que 44×44px (1):**
- `header.fixed.inset-x-0 > div.relative.mx-auto:nth-of-type(2) > nav.hidden.items-center > a.relative.py-3:nth-of-type(3)` (texto: "Obras") — 38.8×45px

- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 4684.5 KB (Imagens: 3215.8 KB, Scripts: 495.0 KB, Fontes: 88.0 KB, CSS: 0.0 KB)

## 3. Maiores Arquivos Transferidos (Top 10)

| Arquivo | Categoria | Tamanho (KB) |
|:---|:---:|:---:|
| `armacao-aerea-1280.webp` | img | 393.9 KB |
| `galpao-piso-epoxi-1920.webp` | img | 350.5 KB |
| `http://localhost:3009/` | other | 321.4 KB |
| `http://localhost:3009/` | other | 321.4 KB |
| `galpao-estrutura-vazio-1920.webp` | img | 292.3 KB |
| `fabrica-branca-1920.webp` | img | 231.3 KB |
| `3dmm3v_fq28gc.js` | script | 224.4 KB |
| `fachada-vidro-v-1920.webp` | img | 215.8 KB |
| `novamed-aerea-1920.webp` | img | 184.1 KB |
| `220o6dnifhgxa.js` | script | 174.4 KB |

## 4. Fontes Carregadas

| Família | Status | Peso | Estilo |
|:---|:---:|:---:|
| Archivo | loaded | 100 900 | normal |

