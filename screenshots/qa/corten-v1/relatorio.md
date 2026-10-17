# Relatório de Auditoria QA — CORTEN-V1 (Microsoft Edge (Chromium))

- **URL auditada:** `http://localhost:3009/`
- **Data/Hora:** 2026-10-16 16:29:11
- **Canal do Navegador:** Microsoft Edge (Chromium)

## 1. Tabela Comparativa por Largura

| Largura | Console Erros | Doc Scrollbar? | Overflow Elementos | Alvos < 44px | Img Problemas | LCP (ms) | CLS | Long Tasks (>50ms) | Transferência (KB) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **360px** | 0 | NÃO | 0 | 8 | 0 | 404 | 0 | 0 | 2361.6 KB |
| **390px** | 0 | NÃO | 0 | 8 | 0 | 156 | 0 | 0 | 2361.6 KB |
| **430px** | 0 | NÃO | 0 | 8 | 0 | 156 | 0 | 0 | 2333.2 KB |
| **768px** | 0 | NÃO | 0 | 4 | 0 | 160 | 0 | 0 | 3428.5 KB |
| **1024px** | 0 | NÃO | 0 | 5 | 0 | 108 | 0 | 0 | 3252.7 KB |
| **1440px** | 0 | NÃO | 0 | 5 | 0 | 108 | 0 | 0 | 4684.7 KB |

## 2. Detalhamento de Problemas por Largura

### Viewport 360px (mobile-360)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 360px)
**Alvos de Toque Menores que 44×44px (8):**
- `div.relative.h-full:nth-of-type(7) > ul.entrar > li > button.relative.display` (texto: "INDUSTRIAL") — 190.3×33.7px
- `div.relative.h-full:nth-of-type(7) > ul.entrar > li:nth-of-type(2) > button.relative.display` (texto: "FARMACÊUTICO") — 257.1×33.7px
- `div.relative.h-full:nth-of-type(7) > ul.entrar > li:nth-of-type(3) > button.relative.display` (texto: "CORPORATIVO") — 234.7×33.7px
- `div.relative.h-full:nth-of-type(7) > ul.entrar > li:nth-of-type(4) > button.relative.display` (texto: "INFRAESTRUTURA") — 294.1×33.7px
- `section.relative.overflow-hidden > div.relative.h-full:nth-of-type(7) > div.mt-8.flex > a.group.inline-flex` (texto: "Obra
Sede corporativa") — 320×21px
- `div.mx-auto.px-5 > div.mt-14.flex:nth-of-type(2) > div.sem-barra.-mx-5 > button.aba` (texto: "Todos") — 38.4×44px
- `section.pb-24:nth-of-type(5) > div.mx-auto.px-5 > div.sem-barra.mt-8 > button.aba` (texto: "Todas") — 38.1×44px
- `div > ul.mt-3 > li:nth-of-type(3) > a.inline-flex.min-h-11` (texto: "Obras") — 41×44px

- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 2361.6 KB (Imagens: 926.2 KB, Scripts: 494.9 KB, Fontes: 88.0 KB, CSS: 0.0 KB)

### Viewport 390px (mobile-390)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 390px)
**Alvos de Toque Menores que 44×44px (8):**
- `div.relative.h-full:nth-of-type(7) > ul.entrar > li > button.relative.display` (texto: "INDUSTRIAL") — 206.1×36.5px
- `div.relative.h-full:nth-of-type(7) > ul.entrar > li:nth-of-type(2) > button.relative.display` (texto: "FARMACÊUTICO") — 278.4×36.5px
- `div.relative.h-full:nth-of-type(7) > ul.entrar > li:nth-of-type(3) > button.relative.display` (texto: "CORPORATIVO") — 254.1×36.5px
- `div.relative.h-full:nth-of-type(7) > ul.entrar > li:nth-of-type(4) > button.relative.display` (texto: "INFRAESTRUTURA") — 318.5×36.5px
- `section.relative.overflow-hidden > div.relative.h-full:nth-of-type(7) > div.mt-8.flex > a.group.inline-flex` (texto: "Obra
Sede corporativa") — 350×21px
- `div.mx-auto.px-5 > div.mt-14.flex:nth-of-type(2) > div.sem-barra.-mx-5 > button.aba` (texto: "Todos") — 38.4×44px
- `section.pb-24:nth-of-type(5) > div.mx-auto.px-5 > div.sem-barra.mt-8 > button.aba` (texto: "Todas") — 38.1×44px
- `div > ul.mt-3 > li:nth-of-type(3) > a.inline-flex.min-h-11` (texto: "Obras") — 41×44px

- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 2361.6 KB (Imagens: 926.2 KB, Scripts: 494.9 KB, Fontes: 88.0 KB, CSS: 0.0 KB)

### Viewport 430px (mobile-430)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 430px)
**Alvos de Toque Menores que 44×44px (8):**
- `div.relative.h-full:nth-of-type(7) > ul.entrar > li > button.relative.display` (texto: "INDUSTRIAL") — 227.3×40.3px
- `div.relative.h-full:nth-of-type(7) > ul.entrar > li:nth-of-type(2) > button.relative.display` (texto: "FARMACÊUTICO") — 307.1×40.3px
- `div.relative.h-full:nth-of-type(7) > ul.entrar > li:nth-of-type(3) > button.relative.display` (texto: "CORPORATIVO") — 280.3×40.3px
- `div.relative.h-full:nth-of-type(7) > ul.entrar > li:nth-of-type(4) > button.relative.display` (texto: "INFRAESTRUTURA") — 351.3×40.3px
- `section.relative.overflow-hidden > div.relative.h-full:nth-of-type(7) > div.mt-8.flex > a.group.inline-flex` (texto: "Obra
Sede corporativa") — 390×21px
- `div.mx-auto.px-5 > div.mt-14.flex:nth-of-type(2) > div.sem-barra.-mx-5 > button.aba` (texto: "Todos") — 38.4×44px
- `section.pb-24:nth-of-type(5) > div.mx-auto.px-5 > div.sem-barra.mt-8 > button.aba` (texto: "Todas") — 38.1×44px
- `div > ul.mt-3 > li:nth-of-type(3) > a.inline-flex.min-h-11` (texto: "Obras") — 41×44px

- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 2333.2 KB (Imagens: 897.9 KB, Scripts: 494.9 KB, Fontes: 88.0 KB, CSS: 0.0 KB)

### Viewport 768px (tablet-768)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 768px)
**Alvos de Toque Menores que 44×44px (4):**
- `section.relative.overflow-hidden > div.relative.h-full:nth-of-type(7) > div.mt-8.flex > a.group.inline-flex` (texto: "Obra
Sede corporativa") — 180.9×21px
- `div.mx-auto.px-5 > div.mt-14.flex:nth-of-type(2) > div.sem-barra.-mx-5 > button.aba` (texto: "Todos") — 38.4×44px
- `section.pb-24:nth-of-type(5) > div.mx-auto.px-5 > div.sem-barra.mt-8 > button.aba` (texto: "Todas") — 38.1×44px
- `div > ul.mt-3 > li:nth-of-type(3) > a.inline-flex.min-h-11` (texto: "Obras") — 41×44px

- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 3428.5 KB (Imagens: 1993.2 KB, Scripts: 494.9 KB, Fontes: 88.0 KB, CSS: 0.0 KB)

### Viewport 1024px (desktop-1024)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 1024px)
**Alvos de Toque Menores que 44×44px (5):**
- `header.fixed.inset-x-0 > div.relative.mx-auto:nth-of-type(2) > nav.hidden.items-center > a.relative.py-3:nth-of-type(3)` (texto: "Obras") — 38.8×45px
- `section.relative.overflow-hidden > div.relative.h-full:nth-of-type(7) > div.mt-8.flex > a.group.inline-flex` (texto: "Obra
Ampliação da fábrica Novamed") — 269.8×21px
- `div.mx-auto.px-5 > div.mt-14.flex:nth-of-type(2) > div.sem-barra.-mx-5 > button.aba` (texto: "Todos") — 38.4×44px
- `section.pb-24:nth-of-type(5) > div.mx-auto.px-5 > div.sem-barra.mt-8 > button.aba` (texto: "Todas") — 38.1×44px
- `div > ul.mt-3 > li:nth-of-type(3) > a.inline-flex.min-h-11` (texto: "Obras") — 41×44px

- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 3252.7 KB (Imagens: 1800.3 KB, Scripts: 494.9 KB, Fontes: 88.0 KB, CSS: 0.0 KB)

### Viewport 1440px (desktop-1440)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 1440px)
**Alvos de Toque Menores que 44×44px (5):**
- `header.fixed.inset-x-0 > div.relative.mx-auto:nth-of-type(2) > nav.hidden.items-center > a.relative.py-3:nth-of-type(3)` (texto: "Obras") — 38.8×45px
- `section.relative.overflow-hidden > div.relative.h-full:nth-of-type(7) > div.mt-8.flex > a.group.inline-flex` (texto: "Obra
Sede corporativa") — 180.9×21px
- `div.mx-auto.px-5 > div.mt-14.flex:nth-of-type(2) > div.sem-barra.-mx-5 > button.aba` (texto: "Todos") — 38.4×44px
- `section.pb-24:nth-of-type(5) > div.mx-auto.px-5 > div.sem-barra.mt-8 > button.aba` (texto: "Todas") — 38.1×44px
- `div > ul.mt-3 > li:nth-of-type(3) > a.inline-flex.min-h-11` (texto: "Obras") — 41×44px

- **Imagens:** Todas com alt, dimensões e tamanho adequado
- **Transferência:** Total: 4684.7 KB (Imagens: 3215.8 KB, Scripts: 494.9 KB, Fontes: 88.0 KB, CSS: 0.0 KB)

## 3. Maiores Arquivos Transferidos (Top 10)

| Arquivo | Categoria | Tamanho (KB) |
|:---|:---:|:---:|
| `armacao-aerea-1280.webp` | img | 393.9 KB |
| `galpao-piso-epoxi-1920.webp` | img | 350.5 KB |
| `http://localhost:3009/` | other | 322.0 KB |
| `http://localhost:3009/` | other | 322.0 KB |
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

