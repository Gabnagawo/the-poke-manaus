# Relatório de Auditoria QA — V4-PRODUCAO (Microsoft Edge (Chromium))

- **URL auditada:** `https://the-poke-manaus.pages.dev`
- **Data/Hora:** 2026-10-16 02:56:34
- **Canal do Navegador:** Microsoft Edge (Chromium)

## 1. Tabela Comparativa por Largura

| Largura | Console Erros | Doc Scrollbar? | Overflow Elementos | Alvos < 44px | Img Problemas | LCP (ms) | CLS | Long Tasks (>50ms) | Transferência (KB) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **360px** | 0 | NÃO | 0 | 4 | 25 | 1324 | 0 | 0 | 500.5 KB |
| **390px** | 0 | NÃO | 0 | 4 | 25 | 860 | 0 | 0 | 500.5 KB |
| **430px** | 0 | NÃO | 0 | 4 | 25 | 676 | 0 | 0 | 500.5 KB |
| **768px** | 0 | NÃO | 0 | 4 | 25 | 704 | 0 | 0 | 964.8 KB |
| **1024px** | 0 | NÃO | 0 | 4 | 25 | 788 | 0 | 0 | 965.6 KB |
| **1440px** | 0 | NÃO | 0 | 4 | 25 | 864 | 0 | 0 | 1252.7 KB |

## 2. Detalhamento de Problemas por Largura

### Viewport 360px (mobile-360)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 360px)
**Alvos de Toque Menores que 44×44px (4):**
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0` (texto: "MONTE SEU POKE") — 154.6×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(2)` (texto: "POKES DA CASA") — 145.1×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(3)` (texto: "SUCOS") — 81.8×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(4)` (texto: "BEBIDAS") — 93.5×36px

**Problemas de Imagem (25):**
- `poke-grande-400.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-200.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar:nth-of-type(2) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `move-on-200.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar:nth-of-type(3) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-pequeno-200.webp` (seletor: `li.group.flex > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-200.webp` (seletor: `li.group.flex:nth-of-type(2) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-grande-200.webp` (seletor: `li.group.flex:nth-of-type(3) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-200.webp` (seletor: `li.group.flex > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-pequeno-frango-grelhado-200.webp` (seletor: `li.group.flex:nth-of-type(2) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-frango-grelhado-200.webp` (seletor: `li.group.flex:nth-of-type(3) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-grande-frango-grelhado-200.webp` (seletor: `li.group.flex:nth-of-type(4) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-frango-teriyaki-200.webp` (seletor: `ul > li.group.flex:nth-of-type(5) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `anti-ox-200.webp` (seletor: `ul > li.group.flex > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `ensolarado-200.webp` (seletor: `ul > li.group.flex:nth-of-type(2) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `guaraflow-200.webp` (seletor: `ul > li.group.flex:nth-of-type(3) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `laranja-200.webp` (seletor: `ul > li.group.flex:nth-of-type(4) > div.relative.overflow-hidden > img.absolute.inset-0`): sem width/height
- `move-on-200.webp` (seletor: `ul > li.group.flex:nth-of-type(5) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `power-red-200.webp` (seletor: `ul > li.group.flex:nth-of-type(6) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `reset-green-200.webp` (seletor: `ul > li.group.flex:nth-of-type(7) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `tropicalize-200.webp` (seletor: `ul > li.group.flex:nth-of-type(8) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `mente-fresh-200.webp` (seletor: `ul > li.group.flex:nth-of-type(9) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `sussa-vibe-200.webp` (seletor: `ul > li.group.flex:nth-of-type(10) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `imune-se-200.webp` (seletor: `ul > li.group.flex:nth-of-type(11) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-400.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute`): sem width/height
- `guaraflow-200.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute:nth-of-type(2)`): sem width/height
- `power-red-200.webp` (seletor: `#horarios > div.relative.mx-auto > img.foto-prato.pointer-events-none`): sem width/height

- **Transferência:** Total: 500.5 KB (Imagens: 405.0 KB, Scripts: 0.0 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

### Viewport 390px (mobile-390)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 390px)
**Alvos de Toque Menores que 44×44px (4):**
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0` (texto: "MONTE SEU POKE") — 154.6×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(2)` (texto: "POKES DA CASA") — 145.1×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(3)` (texto: "SUCOS") — 81.8×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(4)` (texto: "BEBIDAS") — 93.5×36px

**Problemas de Imagem (25):**
- `poke-grande-400.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-200.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar:nth-of-type(2) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `move-on-200.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar:nth-of-type(3) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-pequeno-200.webp` (seletor: `li.group.flex > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-200.webp` (seletor: `li.group.flex:nth-of-type(2) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-grande-200.webp` (seletor: `li.group.flex:nth-of-type(3) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-200.webp` (seletor: `li.group.flex > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-pequeno-frango-grelhado-200.webp` (seletor: `li.group.flex:nth-of-type(2) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-frango-grelhado-200.webp` (seletor: `li.group.flex:nth-of-type(3) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-grande-frango-grelhado-200.webp` (seletor: `li.group.flex:nth-of-type(4) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-frango-teriyaki-200.webp` (seletor: `ul > li.group.flex:nth-of-type(5) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `anti-ox-200.webp` (seletor: `ul > li.group.flex > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `ensolarado-200.webp` (seletor: `ul > li.group.flex:nth-of-type(2) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `guaraflow-200.webp` (seletor: `ul > li.group.flex:nth-of-type(3) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `laranja-200.webp` (seletor: `ul > li.group.flex:nth-of-type(4) > div.relative.overflow-hidden > img.absolute.inset-0`): sem width/height
- `move-on-200.webp` (seletor: `ul > li.group.flex:nth-of-type(5) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `power-red-200.webp` (seletor: `ul > li.group.flex:nth-of-type(6) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `reset-green-200.webp` (seletor: `ul > li.group.flex:nth-of-type(7) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `tropicalize-200.webp` (seletor: `ul > li.group.flex:nth-of-type(8) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `mente-fresh-200.webp` (seletor: `ul > li.group.flex:nth-of-type(9) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `sussa-vibe-200.webp` (seletor: `ul > li.group.flex:nth-of-type(10) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `imune-se-200.webp` (seletor: `ul > li.group.flex:nth-of-type(11) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-400.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute`): sem width/height
- `guaraflow-200.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute:nth-of-type(2)`): sem width/height
- `power-red-200.webp` (seletor: `#horarios > div.relative.mx-auto > img.foto-prato.pointer-events-none`): sem width/height

- **Transferência:** Total: 500.5 KB (Imagens: 405.0 KB, Scripts: 0.0 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

### Viewport 430px (mobile-430)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 430px)
**Alvos de Toque Menores que 44×44px (4):**
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0` (texto: "MONTE SEU POKE") — 154.6×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(2)` (texto: "POKES DA CASA") — 145.1×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(3)` (texto: "SUCOS") — 81.8×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(4)` (texto: "BEBIDAS") — 93.5×36px

**Problemas de Imagem (25):**
- `poke-grande-400.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-200.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar:nth-of-type(2) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `move-on-200.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar:nth-of-type(3) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-pequeno-200.webp` (seletor: `li.group.flex > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-200.webp` (seletor: `li.group.flex:nth-of-type(2) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-grande-200.webp` (seletor: `li.group.flex:nth-of-type(3) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-200.webp` (seletor: `li.group.flex > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-pequeno-frango-grelhado-200.webp` (seletor: `li.group.flex:nth-of-type(2) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-frango-grelhado-200.webp` (seletor: `li.group.flex:nth-of-type(3) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-grande-frango-grelhado-200.webp` (seletor: `li.group.flex:nth-of-type(4) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-frango-teriyaki-200.webp` (seletor: `ul > li.group.flex:nth-of-type(5) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `anti-ox-200.webp` (seletor: `ul > li.group.flex > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `ensolarado-200.webp` (seletor: `ul > li.group.flex:nth-of-type(2) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `guaraflow-200.webp` (seletor: `ul > li.group.flex:nth-of-type(3) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `laranja-200.webp` (seletor: `ul > li.group.flex:nth-of-type(4) > div.relative.overflow-hidden > img.absolute.inset-0`): sem width/height
- `move-on-200.webp` (seletor: `ul > li.group.flex:nth-of-type(5) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `power-red-200.webp` (seletor: `ul > li.group.flex:nth-of-type(6) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `reset-green-200.webp` (seletor: `ul > li.group.flex:nth-of-type(7) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `tropicalize-200.webp` (seletor: `ul > li.group.flex:nth-of-type(8) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `mente-fresh-200.webp` (seletor: `ul > li.group.flex:nth-of-type(9) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `sussa-vibe-200.webp` (seletor: `ul > li.group.flex:nth-of-type(10) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `imune-se-200.webp` (seletor: `ul > li.group.flex:nth-of-type(11) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-400.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute`): sem width/height
- `guaraflow-200.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute:nth-of-type(2)`): sem width/height
- `power-red-200.webp` (seletor: `#horarios > div.relative.mx-auto > img.foto-prato.pointer-events-none`): sem width/height

- **Transferência:** Total: 500.5 KB (Imagens: 405.0 KB, Scripts: 0.0 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

### Viewport 768px (tablet-768)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 753px)
**Alvos de Toque Menores que 44×44px (4):**
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0` (texto: "MONTE SEU POKE") — 159.4×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(2)` (texto: "POKES DA CASA") — 149.5×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(3)` (texto: "SUCOS") — 83.8×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(4)` (texto: "BEBIDAS") — 95.9×36px

**Problemas de Imagem (25):**
- `poke-grande-400.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-400.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar:nth-of-type(2) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `move-on-400.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar:nth-of-type(3) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-pequeno-400.webp` (seletor: `li.group.flex > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-400.webp` (seletor: `li.group.flex:nth-of-type(2) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-grande-400.webp` (seletor: `li.group.flex:nth-of-type(3) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-400.webp` (seletor: `li.group.flex > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-pequeno-frango-grelhado-400.webp` (seletor: `li.group.flex:nth-of-type(2) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-frango-grelhado-400.webp` (seletor: `li.group.flex:nth-of-type(3) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-grande-frango-grelhado-400.webp` (seletor: `li.group.flex:nth-of-type(4) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-frango-teriyaki-400.webp` (seletor: `ul > li.group.flex:nth-of-type(5) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `anti-ox-400.webp` (seletor: `ul > li.group.flex > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `ensolarado-400.webp` (seletor: `ul > li.group.flex:nth-of-type(2) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `guaraflow-400.webp` (seletor: `ul > li.group.flex:nth-of-type(3) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `laranja-400.webp` (seletor: `ul > li.group.flex:nth-of-type(4) > div.relative.overflow-hidden > img.absolute.inset-0`): sem width/height
- `move-on-400.webp` (seletor: `ul > li.group.flex:nth-of-type(5) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `power-red-400.webp` (seletor: `ul > li.group.flex:nth-of-type(6) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `reset-green-400.webp` (seletor: `ul > li.group.flex:nth-of-type(7) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `tropicalize-400.webp` (seletor: `ul > li.group.flex:nth-of-type(8) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `mente-fresh-400.webp` (seletor: `ul > li.group.flex:nth-of-type(9) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `sussa-vibe-400.webp` (seletor: `ul > li.group.flex:nth-of-type(10) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `imune-se-400.webp` (seletor: `ul > li.group.flex:nth-of-type(11) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-400.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute`): sem width/height
- `guaraflow-200.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute:nth-of-type(2)`): sem width/height
- `power-red-400.webp` (seletor: `#horarios > div.relative.mx-auto > img.foto-prato.pointer-events-none`): sem width/height

- **Transferência:** Total: 964.8 KB (Imagens: 869.2 KB, Scripts: 0.0 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

### Viewport 1024px (desktop-1024)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 1009px)
**Alvos de Toque Menores que 44×44px (4):**
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0` (texto: "MONTE SEU POKE") — 159.4×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(2)` (texto: "POKES DA CASA") — 149.5×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(3)` (texto: "SUCOS") — 83.8×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(4)` (texto: "BEBIDAS") — 95.9×36px

**Problemas de Imagem (25):**
- `poke-grande-400.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-400.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar:nth-of-type(2) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `move-on-400.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar:nth-of-type(3) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-pequeno-400.webp` (seletor: `li.group.flex > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-400.webp` (seletor: `li.group.flex:nth-of-type(2) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-grande-400.webp` (seletor: `li.group.flex:nth-of-type(3) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-400.webp` (seletor: `li.group.flex > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-pequeno-frango-grelhado-400.webp` (seletor: `li.group.flex:nth-of-type(2) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-frango-grelhado-400.webp` (seletor: `li.group.flex:nth-of-type(3) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-grande-frango-grelhado-400.webp` (seletor: `li.group.flex:nth-of-type(4) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-frango-teriyaki-400.webp` (seletor: `ul > li.group.flex:nth-of-type(5) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `anti-ox-400.webp` (seletor: `ul > li.group.flex > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `ensolarado-400.webp` (seletor: `ul > li.group.flex:nth-of-type(2) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `guaraflow-400.webp` (seletor: `ul > li.group.flex:nth-of-type(3) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `laranja-400.webp` (seletor: `ul > li.group.flex:nth-of-type(4) > div.relative.overflow-hidden > img.absolute.inset-0`): sem width/height
- `move-on-400.webp` (seletor: `ul > li.group.flex:nth-of-type(5) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `power-red-400.webp` (seletor: `ul > li.group.flex:nth-of-type(6) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `reset-green-400.webp` (seletor: `ul > li.group.flex:nth-of-type(7) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `tropicalize-400.webp` (seletor: `ul > li.group.flex:nth-of-type(8) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `mente-fresh-400.webp` (seletor: `ul > li.group.flex:nth-of-type(9) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `sussa-vibe-400.webp` (seletor: `ul > li.group.flex:nth-of-type(10) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `imune-se-400.webp` (seletor: `ul > li.group.flex:nth-of-type(11) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-400.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute`): sem width/height
- `guaraflow-200.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute:nth-of-type(2)`): sem width/height
- `power-red-400.webp` (seletor: `#horarios > div.relative.mx-auto > img.foto-prato.pointer-events-none`): sem width/height

- **Transferência:** Total: 965.6 KB (Imagens: 870.0 KB, Scripts: 0.0 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

### Viewport 1440px (desktop-1440)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 1425px)
**Alvos de Toque Menores que 44×44px (4):**
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0` (texto: "MONTE SEU POKE") — 159.4×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(2)` (texto: "POKES DA CASA") — 149.5×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(3)` (texto: "SUCOS") — 83.8×36px
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(4)` (texto: "BEBIDAS") — 95.9×36px

**Problemas de Imagem (25):**
- `poke-grande-800.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-800.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar:nth-of-type(2) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `move-on-800.webp` (seletor: `div.grid.grid-cols-2:nth-of-type(2) > a.group.revelar:nth-of-type(3) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-pequeno-400.webp` (seletor: `li.group.flex > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-400.webp` (seletor: `li.group.flex:nth-of-type(2) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-grande-400.webp` (seletor: `li.group.flex:nth-of-type(3) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-400.webp` (seletor: `li.group.flex > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-pequeno-frango-grelhado-400.webp` (seletor: `li.group.flex:nth-of-type(2) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-frango-grelhado-400.webp` (seletor: `li.group.flex:nth-of-type(3) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-grande-frango-grelhado-400.webp` (seletor: `li.group.flex:nth-of-type(4) > button.contents > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-medio-frango-teriyaki-400.webp` (seletor: `ul > li.group.flex:nth-of-type(5) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `anti-ox-400.webp` (seletor: `ul > li.group.flex > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `ensolarado-400.webp` (seletor: `ul > li.group.flex:nth-of-type(2) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `guaraflow-400.webp` (seletor: `ul > li.group.flex:nth-of-type(3) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `laranja-400.webp` (seletor: `ul > li.group.flex:nth-of-type(4) > div.relative.overflow-hidden > img.absolute.inset-0`): sem width/height
- `move-on-400.webp` (seletor: `ul > li.group.flex:nth-of-type(5) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `power-red-400.webp` (seletor: `ul > li.group.flex:nth-of-type(6) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `reset-green-400.webp` (seletor: `ul > li.group.flex:nth-of-type(7) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `tropicalize-400.webp` (seletor: `ul > li.group.flex:nth-of-type(8) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `mente-fresh-400.webp` (seletor: `ul > li.group.flex:nth-of-type(9) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `sussa-vibe-400.webp` (seletor: `ul > li.group.flex:nth-of-type(10) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `imune-se-400.webp` (seletor: `ul > li.group.flex:nth-of-type(11) > div.relative.overflow-hidden > img.foto-prato.absolute`): sem width/height
- `poke-makaha-800.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute`): sem width/height
- `guaraflow-400.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute:nth-of-type(2)`): sem width/height
- `power-red-800.webp` (seletor: `#horarios > div.relative.mx-auto > img.foto-prato.pointer-events-none`): sem width/height

- **Transferência:** Total: 1252.7 KB (Imagens: 1157.2 KB, Scripts: 0.0 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

## 3. Maiores Arquivos Transferidos (Top 10)

| Arquivo | Categoria | Tamanho (KB) |
|:---|:---:|:---:|
| `mesa-desktop-1600.webp` | img | 100.1 KB |
| `poke-grande-800.webp` | img | 99.4 KB |
| `poke-makaha-800.webp` | img | 76.0 KB |
| `move-on-800.webp` | img | 63.5 KB |
| `power-red-800.webp` | img | 63.5 KB |
| `anti-ox-400.webp` | img | 56.5 KB |
| `power-red-400.webp` | img | 55.5 KB |
| `move-on-400.webp` | img | 55.0 KB |
| `reset-green-400.webp` | img | 51.5 KB |
| `tropicalize-400.webp` | img | 48.3 KB |

## 4. Fontes Carregadas

| Família | Status | Peso | Estilo |
|:---|:---:|:---:|
| Aktiv Grotesk | loaded | 300 | normal |
| Aktiv Grotesk | loaded | 400 | normal |
| Aktiv Grotesk | loaded | 500 | normal |
| Aktiv Grotesk | loaded | 700 | normal |
| Aktiv Grotesk | loaded | 800 | normal |
| Kaufmann | loaded | 400 | normal |

