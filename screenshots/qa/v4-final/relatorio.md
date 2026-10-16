# Relatório de Auditoria QA — V4-FINAL (Microsoft Edge (Chromium))

- **URL auditada:** `http://localhost:3005/`
- **Data/Hora:** 2026-10-16 03:02:20
- **Canal do Navegador:** Microsoft Edge (Chromium)

## 1. Tabela Comparativa por Largura

| Largura | Console Erros | Doc Scrollbar? | Overflow Elementos | Alvos < 44px | Img Problemas | LCP (ms) | CLS | Long Tasks (>50ms) | Transferência (KB) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **360px** | 0 | NÃO | 0 | 0 | 25 | 332 | 0 | 0 | 1684.3 KB |
| **390px** | 0 | NÃO | 0 | 0 | 25 | 188 | 0 | 0 | 1684.3 KB |
| **430px** | 0 | NÃO | 0 | 0 | 25 | 188 | 0 | 0 | 1684.3 KB |
| **768px** | 0 | NÃO | 0 | 0 | 25 | 188 | 0 | 0 | 2148.6 KB |
| **1024px** | 0 | NÃO | 0 | 0 | 25 | 188 | 0 | 0 | 2149.4 KB |
| **1440px** | 0 | NÃO | 0 | 0 | 25 | 200 | 0 | 1 | 2436.5 KB |

## 2. Detalhamento de Problemas por Largura

### Viewport 360px (mobile-360)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 360px)
- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px
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

- **Transferência:** Total: 1684.3 KB (Imagens: 405.0 KB, Scripts: 528.7 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

### Viewport 390px (mobile-390)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 390px)
- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px
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

- **Transferência:** Total: 1684.3 KB (Imagens: 405.0 KB, Scripts: 528.7 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

### Viewport 430px (mobile-430)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 430px)
- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px
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

- **Transferência:** Total: 1684.3 KB (Imagens: 405.0 KB, Scripts: 528.7 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

### Viewport 768px (tablet-768)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 753px)
- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px
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

- **Transferência:** Total: 2148.6 KB (Imagens: 869.2 KB, Scripts: 528.7 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

### Viewport 1024px (desktop-1024)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 1009px)
- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px
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

- **Transferência:** Total: 2149.4 KB (Imagens: 870.0 KB, Scripts: 528.7 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

### Viewport 1440px (desktop-1440)

- **Erros de console:** 0
- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: 1425px)
- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px
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

- **Transferência:** Total: 2436.5 KB (Imagens: 1157.2 KB, Scripts: 528.7 KB, Fontes: 95.5 KB, CSS: 0.0 KB)

## 3. Maiores Arquivos Transferidos (Top 10)

| Arquivo | Categoria | Tamanho (KB) |
|:---|:---:|:---:|
| `http://localhost:3005/` | other | 274.0 KB |
| `http://localhost:3005/` | other | 274.0 KB |
| `3dmm3v_fq28gc.js` | script | 224.4 KB |
| `10g5ub5068kzx.js` | script | 164.7 KB |
| `mesa-desktop-1600.webp` | img | 100.1 KB |
| `poke-grande-800.webp` | img | 99.4 KB |
| `poke-makaha-800.webp` | img | 76.0 KB |
| `__next._index.txt` | other | 70.3 KB |
| `move-on-800.webp` | img | 63.5 KB |
| `power-red-800.webp` | img | 63.5 KB |

## 4. Fontes Carregadas

| Família | Status | Peso | Estilo |
|:---|:---:|:---:|
| Aktiv Grotesk | loaded | 300 | normal |
| Aktiv Grotesk | loaded | 400 | normal |
| Aktiv Grotesk | loaded | 500 | normal |
| Aktiv Grotesk | loaded | 700 | normal |
| Aktiv Grotesk | loaded | 800 | normal |
| Kaufmann | loaded | 400 | normal |

