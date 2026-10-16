# Relatório de Auditoria QA — V4

- **URL auditada:** `http://localhost:3005/`
- **Data/Hora:** 2026-10-16 02:21:19
- **Canal do Navegador:** Microsoft Edge (Chromium)

## 1. Tabela Comparativa por Largura

| Largura | Console Erros | Overflow | Alvos < 44px | Img Problemas | LCP (ms) | CLS | Long Tasks (>50ms) | Transferência (KB) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **360px** | 0 | 28 | 2 | 25 | 300 | 0 | 1 | 1534.8 KB |
| **390px** | 0 | 26 | 2 | 25 | 260 | 0 | 1 | 1534.8 KB |
| **430px** | 4 | 23 | 2 | 25 | 252 | 0 | 1 | 1491.5 KB |
| **768px** | 0 | 22 | 2 | 25 | 320 | 0 | 1 | 2053.8 KB |
| **1024px** | 0 | 18 | 3 | 25 | 300 | 0 | 0 | 2006.1 KB |
| **1440px** | 0 | 15 | 3 | 25 | 280 | 0 | 1 | 2169.0 KB |

## 2. Detalhamento de Problemas por Largura

### Viewport 360px (mobile-360)

- **Erros de console:** 0
**Elementos com Overflow Horizontal (28):**
- `body.min-h-screen.flex > main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex` — width: 2472px, right: 2305px (tela: 360px)
- `main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0` — width: 1236px, right: 1069px (tela: 360px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > span.px-6.whitespace-nowrap:nth-of-type(2)` — width: 179px, right: 371px (tela: 360px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(2)` — width: 61px, right: 432px (tela: 360px)
- `div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(2) > use` — width: 61px, right: 423px (tela: 360px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > span.px-6.whitespace-nowrap:nth-of-type(3)` — width: 219px, right: 650px (tela: 360px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(3)` — width: 61px, right: 712px (tela: 360px)
- `div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(3) > use` — width: 61px, right: 703px (tela: 360px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > span.px-6.whitespace-nowrap:nth-of-type(4)` — width: 296px, right: 1008px (tela: 360px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(4)` — width: 61px, right: 1069px (tela: 360px)
- `div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(4) > use` — width: 61px, right: 1060px (tela: 360px)
- `main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2)` — width: 1236px, right: 2305px (tela: 360px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap` — width: 297px, right: 1366px (tela: 360px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg` — width: 61px, right: 1428px (tela: 360px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg > use` — width: 61px, right: 1419px (tela: 360px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(2)` — width: 179px, right: 1606px (tela: 360px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(2)` — width: 61px, right: 1668px (tela: 360px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(2) > use` — width: 61px, right: 1659px (tela: 360px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(3)` — width: 219px, right: 1886px (tela: 360px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(3)` — width: 61px, right: 1947px (tela: 360px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(3) > use` — width: 61px, right: 1939px (tela: 360px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(4)` — width: 296px, right: 2244px (tela: 360px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(4)` — width: 61px, right: 2305px (tela: 360px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(4) > use` — width: 61px, right: 2296px (tela: 360px)
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(3)` — width: 74px, right: 383px (tela: 360px)
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(4)` — width: 86px, right: 473px (tela: 360px)
- `div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(4) > span.absolute.left-3` — width: 0px, right: 399px (tela: 360px)
- `#horarios > div.relative.mx-auto > img.foto-prato.pointer-events-none` — width: 192px, right: 418px (tela: 360px)

**Alvos de Toque Menores que 44×44px (2):**
- `body.min-h-screen.flex > a.sr-only` (texto: "Pular para o cardápio") — 1×1px
- `body.min-h-screen.flex > header.sticky.top-0 > div.mx-auto.px-3 > a.block.py-2` (texto: "The Poke Manaus, início") — 113.7×42px

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
- `poke-makaha-800.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute`): sem width/height, pesada demais (natural: 715px vs exibida: 198px, ratio 3.60x)
- `guaraflow-800.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute:nth-of-type(2)`): sem width/height, pesada demais (natural: 458px vs exibida: 137px, ratio 3.35x)
- `power-red-800.webp` (seletor: `#horarios > div.relative.mx-auto > img.foto-prato.pointer-events-none`): sem width/height

- **Transferência:** Total: 1534.8 KB (Imagens: 559.2 KB, Scripts: 528.7 KB, Fontes: 95.5 KB, CSS: 48.7 KB)

### Viewport 390px (mobile-390)

- **Erros de console:** 0
**Elementos com Overflow Horizontal (26):**
- `body.min-h-screen.flex > main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex` — width: 2472px, right: 2303px (tela: 390px)
- `main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0` — width: 1236px, right: 1067px (tela: 390px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(2)` — width: 61px, right: 430px (tela: 390px)
- `div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(2) > use` — width: 61px, right: 421px (tela: 390px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > span.px-6.whitespace-nowrap:nth-of-type(3)` — width: 219px, right: 648px (tela: 390px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(3)` — width: 61px, right: 710px (tela: 390px)
- `div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(3) > use` — width: 61px, right: 701px (tela: 390px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > span.px-6.whitespace-nowrap:nth-of-type(4)` — width: 296px, right: 1006px (tela: 390px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(4)` — width: 61px, right: 1067px (tela: 390px)
- `div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(4) > use` — width: 61px, right: 1058px (tela: 390px)
- `main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2)` — width: 1236px, right: 2303px (tela: 390px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap` — width: 297px, right: 1364px (tela: 390px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg` — width: 61px, right: 1425px (tela: 390px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg > use` — width: 61px, right: 1417px (tela: 390px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(2)` — width: 179px, right: 1604px (tela: 390px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(2)` — width: 61px, right: 1666px (tela: 390px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(2) > use` — width: 61px, right: 1657px (tela: 390px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(3)` — width: 219px, right: 1884px (tela: 390px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(3)` — width: 61px, right: 1945px (tela: 390px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(3) > use` — width: 61px, right: 1937px (tela: 390px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(4)` — width: 296px, right: 2242px (tela: 390px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(4)` — width: 61px, right: 2303px (tela: 390px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(4) > use` — width: 61px, right: 2294px (tela: 390px)
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(4)` — width: 86px, right: 473px (tela: 390px)
- `div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(4) > span.absolute.left-3` — width: 0px, right: 399px (tela: 390px)
- `#horarios > div.relative.mx-auto > img.foto-prato.pointer-events-none` — width: 192px, right: 449px (tela: 390px)

**Alvos de Toque Menores que 44×44px (2):**
- `body.min-h-screen.flex > a.sr-only` (texto: "Pular para o cardápio") — 1×1px
- `body.min-h-screen.flex > header.sticky.top-0 > div.mx-auto.px-3 > a.block.py-2` (texto: "The Poke Manaus, início") — 113.7×42px

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
- `poke-makaha-800.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute`): sem width/height, pesada demais (natural: 715px vs exibida: 217px, ratio 3.29x)
- `guaraflow-800.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute:nth-of-type(2)`): sem width/height, pesada demais (natural: 458px vs exibida: 150px, ratio 3.06x)
- `power-red-800.webp` (seletor: `#horarios > div.relative.mx-auto > img.foto-prato.pointer-events-none`): sem width/height

- **Transferência:** Total: 1534.8 KB (Imagens: 559.2 KB, Scripts: 528.7 KB, Fontes: 95.5 KB, CSS: 48.7 KB)

### Viewport 430px (mobile-430)

**Erros de Console:**
- `Failed to load resource: the server responded with a status of 404 (File not found)`
- `Failed to load resource: the server responded with a status of 404 (File not found)`
- `Failed to load resource: net::ERR_CONNECTION_REFUSED`
- `Failed to load resource: net::ERR_CONNECTION_REFUSED`

**Elementos com Overflow Horizontal (23):**
- `body.min-h-screen.flex > main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex` — width: 2472px, right: 2300px (tela: 430px)
- `main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0` — width: 1236px, right: 1065px (tela: 430px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > span.px-6.whitespace-nowrap:nth-of-type(3)` — width: 219px, right: 646px (tela: 430px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(3)` — width: 61px, right: 707px (tela: 430px)
- `div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(3) > use` — width: 61px, right: 699px (tela: 430px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > span.px-6.whitespace-nowrap:nth-of-type(4)` — width: 296px, right: 1003px (tela: 430px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(4)` — width: 61px, right: 1065px (tela: 430px)
- `div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(4) > use` — width: 61px, right: 1056px (tela: 430px)
- `main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2)` — width: 1236px, right: 2300px (tela: 430px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap` — width: 297px, right: 1362px (tela: 430px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg` — width: 61px, right: 1423px (tela: 430px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg > use` — width: 61px, right: 1415px (tela: 430px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(2)` — width: 179px, right: 1602px (tela: 430px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(2)` — width: 61px, right: 1663px (tela: 430px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(2) > use` — width: 61px, right: 1655px (tela: 430px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(3)` — width: 219px, right: 1882px (tela: 430px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(3)` — width: 61px, right: 1943px (tela: 430px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(3) > use` — width: 61px, right: 1935px (tela: 430px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(4)` — width: 296px, right: 2239px (tela: 430px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(4)` — width: 61px, right: 2300px (tela: 430px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(4) > use` — width: 61px, right: 2292px (tela: 430px)
- `#cardapio > div.sticky.z-20:nth-of-type(2) > div.sem-barra.mx-auto > button.relative.shrink-0:nth-of-type(4)` — width: 86px, right: 473px (tela: 430px)
- `#horarios > div.relative.mx-auto > img.foto-prato.pointer-events-none` — width: 192px, right: 491px (tela: 430px)

**Alvos de Toque Menores que 44×44px (2):**
- `body.min-h-screen.flex > a.sr-only` (texto: "Pular para o cardápio") — 1×1px
- `body.min-h-screen.flex > header.sticky.top-0 > div.mx-auto.px-3 > a.block.py-2` (texto: "The Poke Manaus, início") — 113.7×42px

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
- `poke-makaha-800.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute`): sem width/height, pesada demais (natural: 715px vs exibida: 242px, ratio 2.96x)
- `guaraflow-800.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute:nth-of-type(2)`): sem width/height, pesada demais (natural: 458px vs exibida: 167px, ratio 2.75x)
- `power-red-800.webp` (seletor: `#horarios > div.relative.mx-auto > img.foto-prato.pointer-events-none`): sem width/height

- **Transferência:** Total: 1491.5 KB (Imagens: 538.0 KB, Scripts: 528.7 KB, Fontes: 95.5 KB, CSS: 48.7 KB)

### Viewport 768px (tablet-768)

- **Erros de console:** 0
**Elementos com Overflow Horizontal (22):**
- `body.min-h-screen.flex > main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex` — width: 2916px, right: 2722px (tela: 768px)
- `main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0` — width: 1458px, right: 1264px (tela: 768px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > span.px-6.whitespace-nowrap:nth-of-type(3)` — width: 261px, right: 774px (tela: 768px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(3)` — width: 70px, right: 844px (tela: 768px)
- `div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(3) > use` — width: 70px, right: 834px (tela: 768px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > span.px-6.whitespace-nowrap:nth-of-type(4)` — width: 350px, right: 1194px (tela: 768px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(4)` — width: 70px, right: 1264px (tela: 768px)
- `div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(4) > use` — width: 70px, right: 1255px (tela: 768px)
- `main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2)` — width: 1458px, right: 2722px (tela: 768px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap` — width: 352px, right: 1616px (tela: 768px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg` — width: 70px, right: 1686px (tela: 768px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg > use` — width: 70px, right: 1676px (tela: 768px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(2)` — width: 215px, right: 1901px (tela: 768px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(2)` — width: 70px, right: 1971px (tela: 768px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(2) > use` — width: 70px, right: 1961px (tela: 768px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(3)` — width: 261px, right: 2232px (tela: 768px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(3)` — width: 70px, right: 2302px (tela: 768px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(3) > use` — width: 70px, right: 2292px (tela: 768px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(4)` — width: 350px, right: 2652px (tela: 768px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(4)` — width: 70px, right: 2722px (tela: 768px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(4) > use` — width: 70px, right: 2713px (tela: 768px)
- `#horarios > div.relative.mx-auto > img.foto-prato.pointer-events-none` — width: 474px, right: 786px (tela: 768px)

**Alvos de Toque Menores que 44×44px (2):**
- `body.min-h-screen.flex > a.sr-only` (texto: "Pular para o cardápio") — 1×1px
- `body.min-h-screen.flex > div.hidden.fixed:nth-of-type(3) > button.botao.botao-amarelo` (texto: "VER SACOLA") — 114.7×40px

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
- `poke-makaha-800.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute`): sem width/height, pesada demais (natural: 715px vs exibida: 189px, ratio 3.79x)
- `guaraflow-800.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute:nth-of-type(2)`): sem width/height, pesada demais (natural: 458px vs exibida: 130px, ratio 3.52x)
- `power-red-800.webp` (seletor: `#horarios > div.relative.mx-auto > img.foto-prato.pointer-events-none`): sem width/height

- **Transferência:** Total: 2053.8 KB (Imagens: 1078.1 KB, Scripts: 528.7 KB, Fontes: 95.5 KB, CSS: 48.8 KB)

### Viewport 1024px (desktop-1024)

- **Erros de console:** 0
**Elementos com Overflow Horizontal (18):**
- `body.min-h-screen.flex > main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex` — width: 2916px, right: 2733px (tela: 1024px)
- `main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0` — width: 1458px, right: 1275px (tela: 1024px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > span.px-6.whitespace-nowrap:nth-of-type(4)` — width: 350px, right: 1205px (tela: 1024px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(4)` — width: 70px, right: 1275px (tela: 1024px)
- `div.faixa-trilho.flex > div.flex.shrink-0 > svg:nth-of-type(4) > use` — width: 70px, right: 1266px (tela: 1024px)
- `main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2)` — width: 1458px, right: 2733px (tela: 1024px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap` — width: 352px, right: 1627px (tela: 1024px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg` — width: 70px, right: 1697px (tela: 1024px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg > use` — width: 70px, right: 1687px (tela: 1024px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(2)` — width: 215px, right: 1912px (tela: 1024px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(2)` — width: 70px, right: 1982px (tela: 1024px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(2) > use` — width: 70px, right: 1972px (tela: 1024px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(3)` — width: 261px, right: 2243px (tela: 1024px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(3)` — width: 70px, right: 2313px (tela: 1024px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(3) > use` — width: 70px, right: 2303px (tela: 1024px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(4)` — width: 350px, right: 2663px (tela: 1024px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(4)` — width: 70px, right: 2733px (tela: 1024px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(4) > use` — width: 70px, right: 2723px (tela: 1024px)

**Alvos de Toque Menores que 44×44px (3):**
- `body.min-h-screen.flex > a.sr-only` (texto: "Pular para o cardápio") — 1×1px
- `header.sticky.top-0 > div.mx-auto.px-3 > div.flex.items-center:nth-of-type(2) > a.hidden.items-center` (texto: "INSTAGRAM") — 112.3×19.5px
- `body.min-h-screen.flex > div.hidden.fixed:nth-of-type(3) > button.botao.botao-amarelo` (texto: "VER SACOLA") — 114.7×40px

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
- `poke-makaha-800.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute`): sem width/height, pesada demais (natural: 715px vs exibida: 268px, ratio 2.67x)
- `guaraflow-800.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute:nth-of-type(2)`): sem width/height
- `power-red-800.webp` (seletor: `#horarios > div.relative.mx-auto > img.foto-prato.pointer-events-none`): sem width/height

- **Transferência:** Total: 2006.1 KB (Imagens: 1030.3 KB, Scripts: 528.7 KB, Fontes: 95.5 KB, CSS: 48.8 KB)

### Viewport 1440px (desktop-1440)

- **Erros de console:** 0
**Elementos com Overflow Horizontal (15):**
- `body.min-h-screen.flex > main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex` — width: 2916px, right: 2724px (tela: 1440px)
- `main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0` — width: 1458px, right: 1266px (tela: 1440px)
- `main.flex-1 > div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2)` — width: 1458px, right: 2724px (tela: 1440px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap` — width: 352px, right: 1618px (tela: 1440px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg` — width: 70px, right: 1688px (tela: 1440px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg > use` — width: 70px, right: 1678px (tela: 1440px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(2)` — width: 215px, right: 1903px (tela: 1440px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(2)` — width: 70px, right: 1973px (tela: 1440px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(2) > use` — width: 70px, right: 1963px (tela: 1440px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(3)` — width: 261px, right: 2234px (tela: 1440px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(3)` — width: 70px, right: 2304px (tela: 1440px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(3) > use` — width: 70px, right: 2294px (tela: 1440px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > span.px-6.whitespace-nowrap:nth-of-type(4)` — width: 350px, right: 2654px (tela: 1440px)
- `div.relative.overflow-hidden > div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(4)` — width: 70px, right: 2724px (tela: 1440px)
- `div.faixa-trilho.flex > div.flex.shrink-0:nth-of-type(2) > svg:nth-of-type(4) > use` — width: 70px, right: 2714px (tela: 1440px)

**Alvos de Toque Menores que 44×44px (3):**
- `body.min-h-screen.flex > a.sr-only` (texto: "Pular para o cardápio") — 1×1px
- `header.sticky.top-0 > div.mx-auto.px-3 > div.flex.items-center:nth-of-type(2) > a.hidden.items-center` (texto: "INSTAGRAM") — 112.3×19.5px
- `body.min-h-screen.flex > div.hidden.fixed:nth-of-type(3) > button.botao.botao-amarelo` (texto: "VER SACOLA") — 114.7×40px

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
- `guaraflow-800.webp` (seletor: `#a-loja > div.mx-auto.px-5 > div.revelar.relative:nth-of-type(2) > img.foto-prato.absolute:nth-of-type(2)`): sem width/height
- `power-red-800.webp` (seletor: `#horarios > div.relative.mx-auto > img.foto-prato.pointer-events-none`): sem width/height

- **Transferência:** Total: 2169.0 KB (Imagens: 1193.3 KB, Scripts: 528.7 KB, Fontes: 95.5 KB, CSS: 48.8 KB)

## 3. Maiores Arquivos Transferidos (Top 10)

| Arquivo | Categoria | Tamanho (KB) |
|:---|:---:|:---:|
| `3dmm3v_fq28gc.js` | script | 224.4 KB |
| `10g5ub5068kzx.js` | script | 164.7 KB |
| `http://localhost:3005/` | other | 122.3 KB |
| `http://localhost:3005/` | other | 122.3 KB |
| `poke-grande-800.webp` | img | 99.4 KB |
| `mesa-desktop-1600.webp` | img | 98.4 KB |
| `poke-makaha-800.webp` | img | 76.0 KB |
| `move-on-800.webp` | img | 63.5 KB |
| `power-red-800.webp` | img | 63.5 KB |
| `anti-ox-400.webp` | img | 56.5 KB |

## 4. Fontes Carregadas

| Família | Status | Peso | Estilo |
|:---|:---:|:---:|:---:|
| Aktiv Grotesk | loaded | 300 | normal |
| Aktiv Grotesk | loaded | 400 | normal |
| Aktiv Grotesk | loaded | 500 | normal |
| Aktiv Grotesk | loaded | 700 | normal |
| Aktiv Grotesk | loaded | 800 | normal |
| Kaufmann | loaded | 400 | normal |

