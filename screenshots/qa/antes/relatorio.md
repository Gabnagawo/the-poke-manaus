# Relatório de Auditoria QA — ANTES

- **URL auditada:** `https://the-poke-manaus.pages.dev`
- **Data/Hora:** 2026-10-16 02:13:37
- **Canal do Navegador:** Microsoft Edge (Chromium)

## 1. Tabela Comparativa por Largura

| Largura | Console Erros | Overflow | Alvos < 44px | Img Problemas | LCP (ms) | CLS | Long Tasks (>50ms) | Transferência (KB) |
|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|
| **360px** | 0 | 32 | 14 | 17 | 1288 | 0 | 0 | 833.0 KB |
| **390px** | 0 | 31 | 14 | 17 | 684 | 0 | 0 | 833.0 KB |
| **430px** | 0 | 29 | 14 | 17 | 700 | 0 | 0 | 833.0 KB |
| **768px** | 0 | 9 | 21 | 17 | 676 | 0.008 | 0 | 833.0 KB |
| **1024px** | 0 | 9 | 22 | 17 | 636 | 0.049 | 0 | 833.0 KB |
| **1440px** | 0 | 9 | 22 | 17 | 560 | 0.025 | 0 | 833.0 KB |

## 2. Detalhamento de Problemas por Largura

### Viewport 360px (mobile-360)

- **Erros de console:** 0
**Elementos com Overflow Horizontal (32):**
- `<div>` class=`absolute -top-10 -right-10 sm:-top-14 sm:-right-14 w-36 h-36 sm:w-60 sm:h-60 lg:` — width: 175px, right: 415px (tela: 360px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_20px_28px_rgba(0,0,0,0.18)]` — width: 175px, right: 415px (tela: 360px)
- `<img>` class=`object-contain` — width: 175px, right: 415px (tela: 360px)
- `<div>` class=`absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-10 w-32 h-32 sm:w-52 sm:h-52` — width: 145px, right: 400px (tela: 360px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.16)]` — width: 145px, right: 400px (tela: 360px)
- `<img>` class=`object-contain` — width: 145px, right: 400px (tela: 360px)
- `<div>` class=`flex flex-col space-y-4 md:space-y-5 group shrink-0 w-[240px] md:w-auto snap-sta` — width: 240px, right: 504px (tela: 360px)
- `<div>` class=`relative aspect-square bg-[#DEB8A3] rounded-[1px] p-6 md:p-8 flex items-center j` — width: 240px, right: 504px (tela: 360px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.14)]` — width: 192px, right: 480px (tela: 360px)
- `<img>` class=`object-contain` — width: 192px, right: 480px (tela: 360px)
- `<div>` class=`space-y-2 md:space-y-3` — width: 240px, right: 504px (tela: 360px)
- `<h3>` class=`tilt-card-right font-display font-black text-xl md:text-2xl sm:text-3xl text-[#0` — width: 150px, right: 413px (tela: 360px)
- `<p>` class=`text-xs md:text-sm text-[#59655D] leading-relaxed` — width: 240px, right: 504px (tela: 360px)
- `<div>` class=`pt-2 flex items-center justify-between` — width: 240px, right: 504px (tela: 360px)
- `<span>` class=`font-display font-extrabold text-xs md:text-sm text-[#0E2A38]` — width: 119px, right: 383px (tela: 360px)
- `<a>` class=`text-xs font-display font-extrabold uppercase tracking-wider text-[#0E2A38] hove` — width: 93px, right: 504px (tela: 360px)
- `<span>` class=`None` — width: 76px, right: 488px (tela: 360px)
- `<span>` class=`None` — width: 10px, right: 504px (tela: 360px)
- `<div>` class=`flex flex-col space-y-4 md:space-y-5 group shrink-0 w-[240px] md:w-auto snap-sta` — width: 240px, right: 768px (tela: 360px)
- `<div>` class=`relative aspect-square bg-[#D9C3CE] rounded-[1px] p-6 md:p-8 flex items-center j` — width: 240px, right: 768px (tela: 360px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.14)]` — width: 192px, right: 744px (tela: 360px)
- `<img>` class=`object-contain` — width: 192px, right: 744px (tela: 360px)
- `<div>` class=`space-y-2 md:space-y-3` — width: 240px, right: 768px (tela: 360px)
- `<h3>` class=`tilt-card-left font-display font-black text-xl md:text-2xl sm:text-3xl text-[#0E` — width: 164px, right: 691px (tela: 360px)
- `<p>` class=`text-xs md:text-sm text-[#59655D] leading-relaxed` — width: 240px, right: 768px (tela: 360px)
- `<div>` class=`pt-2 flex items-center justify-between` — width: 240px, right: 768px (tela: 360px)
- `<span>` class=`font-display font-extrabold text-xs md:text-sm text-[#0E2A38]` — width: 109px, right: 637px (tela: 360px)
- `<a>` class=`text-xs font-display font-extrabold uppercase tracking-wider text-[#0E2A38] hove` — width: 79px, right: 768px (tela: 360px)
- `<span>` class=`None` — width: 63px, right: 752px (tela: 360px)
- `<span>` class=`None` — width: 10px, right: 768px (tela: 360px)
- `<button>` class=`min-h-[44px] px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-display font-bold upper` — width: 127px, right: 396px (tela: 360px)
- `<button>` class=`min-h-[44px] px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-display font-bold upper` — width: 73px, right: 473px (tela: 360px)

**Alvos de Toque Menores que 44×44px (14):**
- `<button>` "MONTAR AGORA
→" — 106.6×16px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "VER RECEITAS
→" — 92.6×16px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "VER SUCOS
→" — 79.5×16px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "CARDÁPIO NO IFOOD ↗" — 136.4×32px (`text-xs sm:text-sm font-display font-bold uppercase tracking`)
- `<a>` "SIGA @THEPOKEMANAUS NO INSTAGRAM" — 240.1×15px (`text-xs font-display font-bold uppercase tracking-wider text`)
- `<a>` "PEDIR NO IFOOD MANAUS ↗" — 183.1×16px (`inline-flex items-center text-xs font-bold uppercase trackin`)
- `<a>` "Monte seu Poke" — 100.9×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Cardápio" — 58.4×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Sobre a Franquia" — 105.7×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Horários" — 53.8×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Instagram @thepokemanaus
↗" — 328×20px (`hover:text-[#F7EA48] transition-colors flex items-center spa`)
- `<a>` "Política de Privacidade" — 121×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)
- `<a>` "Termos de Uso" — 81.3×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)
- `<a>` "llms.txt" — 40.2×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)

**Problemas de Imagem (17):**
- `logo.webp`: sem width/height, pesada demais (natural: 640px vs exibida: 44px, ratio 14.55x)
- `poke-grande.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 171px, ratio 5.27x)
- `poke-makaha.webp`: sem width/height, pesada demais (natural: 740px vs exibida: 145px, ratio 5.12x)
- `poke-medio-frango-grelhado.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 175px, ratio 5.16x)
- `poke-pequeno.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 145px, ratio 6.23x)
- `poke-medio.webp`: sem width/height
- `poke-grande.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 192px, ratio 4.69x)
- `poke-makaha.webp`: sem width/height, pesada demais (natural: 740px vs exibida: 192px, ratio 3.85x)
- `anti-ox.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 192px, ratio 4.69x)
- `poke-makaha.webp`: sem width/height, pesada demais (natural: 740px vs exibida: 264px, ratio 2.80x)
- `poke-pequeno.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 76px, ratio 11.84x)
- `poke-pequeno.webp`: sem width/height
- `poke-medio.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 76px, ratio 11.84x)
- `poke-medio.webp`: sem width/height
- `poke-grande.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 76px, ratio 11.84x)
- `poke-grande.webp`: sem width/height
- `logo.webp`: sem width/height, pesada demais (natural: 640px vs exibida: 48px, ratio 13.33x)

- **Transferência:** Total: 833.0 KB (Imagens: 698.1 KB, Scripts: 0.0 KB, Fontes: 135.0 KB, CSS: 0.0 KB)

### Viewport 390px (mobile-390)

- **Erros de console:** 0
**Elementos com Overflow Horizontal (31):**
- `<div>` class=`absolute -top-10 -right-10 sm:-top-14 sm:-right-14 w-36 h-36 sm:w-60 sm:h-60 lg:` — width: 175px, right: 445px (tela: 390px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_20px_28px_rgba(0,0,0,0.18)]` — width: 175px, right: 445px (tela: 390px)
- `<img>` class=`object-contain` — width: 175px, right: 445px (tela: 390px)
- `<div>` class=`absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-10 w-32 h-32 sm:w-52 sm:h-52` — width: 145px, right: 430px (tela: 390px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.16)]` — width: 145px, right: 430px (tela: 390px)
- `<img>` class=`object-contain` — width: 145px, right: 430px (tela: 390px)
- `<div>` class=`flex flex-col space-y-4 md:space-y-5 group shrink-0 w-[240px] md:w-auto snap-sta` — width: 240px, right: 504px (tela: 390px)
- `<div>` class=`relative aspect-square bg-[#DEB8A3] rounded-[1px] p-6 md:p-8 flex items-center j` — width: 240px, right: 504px (tela: 390px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.14)]` — width: 192px, right: 480px (tela: 390px)
- `<img>` class=`object-contain` — width: 192px, right: 480px (tela: 390px)
- `<div>` class=`space-y-2 md:space-y-3` — width: 240px, right: 504px (tela: 390px)
- `<h3>` class=`tilt-card-right font-display font-black text-xl md:text-2xl sm:text-3xl text-[#0` — width: 150px, right: 413px (tela: 390px)
- `<p>` class=`text-xs md:text-sm text-[#59655D] leading-relaxed` — width: 240px, right: 504px (tela: 390px)
- `<div>` class=`pt-2 flex items-center justify-between` — width: 240px, right: 504px (tela: 390px)
- `<a>` class=`text-xs font-display font-extrabold uppercase tracking-wider text-[#0E2A38] hove` — width: 93px, right: 504px (tela: 390px)
- `<span>` class=`None` — width: 76px, right: 488px (tela: 390px)
- `<span>` class=`None` — width: 10px, right: 504px (tela: 390px)
- `<div>` class=`flex flex-col space-y-4 md:space-y-5 group shrink-0 w-[240px] md:w-auto snap-sta` — width: 240px, right: 768px (tela: 390px)
- `<div>` class=`relative aspect-square bg-[#D9C3CE] rounded-[1px] p-6 md:p-8 flex items-center j` — width: 240px, right: 768px (tela: 390px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.14)]` — width: 192px, right: 744px (tela: 390px)
- `<img>` class=`object-contain` — width: 192px, right: 744px (tela: 390px)
- `<div>` class=`space-y-2 md:space-y-3` — width: 240px, right: 768px (tela: 390px)
- `<h3>` class=`tilt-card-left font-display font-black text-xl md:text-2xl sm:text-3xl text-[#0E` — width: 164px, right: 691px (tela: 390px)
- `<p>` class=`text-xs md:text-sm text-[#59655D] leading-relaxed` — width: 240px, right: 768px (tela: 390px)
- `<div>` class=`pt-2 flex items-center justify-between` — width: 240px, right: 768px (tela: 390px)
- `<span>` class=`font-display font-extrabold text-xs md:text-sm text-[#0E2A38]` — width: 109px, right: 637px (tela: 390px)
- `<a>` class=`text-xs font-display font-extrabold uppercase tracking-wider text-[#0E2A38] hove` — width: 79px, right: 768px (tela: 390px)
- `<span>` class=`None` — width: 63px, right: 752px (tela: 390px)
- `<span>` class=`None` — width: 10px, right: 768px (tela: 390px)
- `<button>` class=`min-h-[44px] px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-display font-bold upper` — width: 127px, right: 396px (tela: 390px)
- `<button>` class=`min-h-[44px] px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-display font-bold upper` — width: 73px, right: 473px (tela: 390px)

**Alvos de Toque Menores que 44×44px (14):**
- `<button>` "MONTAR AGORA
→" — 106.6×16px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "VER RECEITAS
→" — 92.6×16px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "VER SUCOS
→" — 79.5×16px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "CARDÁPIO NO IFOOD ↗" — 136.4×32px (`text-xs sm:text-sm font-display font-bold uppercase tracking`)
- `<a>` "SIGA @THEPOKEMANAUS NO INSTAGRAM" — 240.1×15px (`text-xs font-display font-bold uppercase tracking-wider text`)
- `<a>` "PEDIR NO IFOOD MANAUS ↗" — 183.1×16px (`inline-flex items-center text-xs font-bold uppercase trackin`)
- `<a>` "Monte seu Poke" — 100.9×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Cardápio" — 58.4×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Sobre a Franquia" — 105.7×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Horários" — 53.8×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Instagram @thepokemanaus
↗" — 358×20px (`hover:text-[#F7EA48] transition-colors flex items-center spa`)
- `<a>` "Política de Privacidade" — 121×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)
- `<a>` "Termos de Uso" — 81.3×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)
- `<a>` "llms.txt" — 40.2×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)

**Problemas de Imagem (17):**
- `logo.webp`: sem width/height, pesada demais (natural: 640px vs exibida: 44px, ratio 14.55x)
- `poke-grande.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 171px, ratio 5.27x)
- `poke-makaha.webp`: sem width/height, pesada demais (natural: 740px vs exibida: 145px, ratio 5.12x)
- `poke-medio-frango-grelhado.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 175px, ratio 5.16x)
- `poke-pequeno.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 145px, ratio 6.23x)
- `poke-medio.webp`: sem width/height
- `poke-grande.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 192px, ratio 4.69x)
- `poke-makaha.webp`: sem width/height, pesada demais (natural: 740px vs exibida: 192px, ratio 3.85x)
- `anti-ox.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 192px, ratio 4.69x)
- `poke-makaha.webp`: sem width/height, pesada demais (natural: 740px vs exibida: 294px, ratio 2.52x)
- `poke-pequeno.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 76px, ratio 11.84x)
- `poke-pequeno.webp`: sem width/height
- `poke-medio.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 76px, ratio 11.84x)
- `poke-medio.webp`: sem width/height
- `poke-grande.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 76px, ratio 11.84x)
- `poke-grande.webp`: sem width/height
- `logo.webp`: sem width/height, pesada demais (natural: 640px vs exibida: 48px, ratio 13.33x)

- **Transferência:** Total: 833.0 KB (Imagens: 698.1 KB, Scripts: 0.0 KB, Fontes: 135.0 KB, CSS: 0.0 KB)

### Viewport 430px (mobile-430)

- **Erros de console:** 0
**Elementos com Overflow Horizontal (29):**
- `<div>` class=`absolute -top-10 -right-10 sm:-top-14 sm:-right-14 w-36 h-36 sm:w-60 sm:h-60 lg:` — width: 175px, right: 485px (tela: 430px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_20px_28px_rgba(0,0,0,0.18)]` — width: 175px, right: 485px (tela: 430px)
- `<img>` class=`object-contain` — width: 175px, right: 485px (tela: 430px)
- `<div>` class=`absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-10 w-32 h-32 sm:w-52 sm:h-52` — width: 145px, right: 470px (tela: 430px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.16)]` — width: 145px, right: 470px (tela: 430px)
- `<img>` class=`object-contain` — width: 145px, right: 470px (tela: 430px)
- `<div>` class=`flex flex-col space-y-4 md:space-y-5 group shrink-0 w-[240px] md:w-auto snap-sta` — width: 240px, right: 504px (tela: 430px)
- `<div>` class=`relative aspect-square bg-[#DEB8A3] rounded-[1px] p-6 md:p-8 flex items-center j` — width: 240px, right: 504px (tela: 430px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.14)]` — width: 192px, right: 480px (tela: 430px)
- `<img>` class=`object-contain` — width: 192px, right: 480px (tela: 430px)
- `<div>` class=`space-y-2 md:space-y-3` — width: 240px, right: 504px (tela: 430px)
- `<p>` class=`text-xs md:text-sm text-[#59655D] leading-relaxed` — width: 240px, right: 504px (tela: 430px)
- `<div>` class=`pt-2 flex items-center justify-between` — width: 240px, right: 504px (tela: 430px)
- `<a>` class=`text-xs font-display font-extrabold uppercase tracking-wider text-[#0E2A38] hove` — width: 93px, right: 504px (tela: 430px)
- `<span>` class=`None` — width: 76px, right: 488px (tela: 430px)
- `<span>` class=`None` — width: 10px, right: 504px (tela: 430px)
- `<div>` class=`flex flex-col space-y-4 md:space-y-5 group shrink-0 w-[240px] md:w-auto snap-sta` — width: 240px, right: 768px (tela: 430px)
- `<div>` class=`relative aspect-square bg-[#D9C3CE] rounded-[1px] p-6 md:p-8 flex items-center j` — width: 240px, right: 768px (tela: 430px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_16px_24px_rgba(0,0,0,0.14)]` — width: 192px, right: 744px (tela: 430px)
- `<img>` class=`object-contain` — width: 192px, right: 744px (tela: 430px)
- `<div>` class=`space-y-2 md:space-y-3` — width: 240px, right: 768px (tela: 430px)
- `<h3>` class=`tilt-card-left font-display font-black text-xl md:text-2xl sm:text-3xl text-[#0E` — width: 164px, right: 691px (tela: 430px)
- `<p>` class=`text-xs md:text-sm text-[#59655D] leading-relaxed` — width: 240px, right: 768px (tela: 430px)
- `<div>` class=`pt-2 flex items-center justify-between` — width: 240px, right: 768px (tela: 430px)
- `<span>` class=`font-display font-extrabold text-xs md:text-sm text-[#0E2A38]` — width: 109px, right: 637px (tela: 430px)
- `<a>` class=`text-xs font-display font-extrabold uppercase tracking-wider text-[#0E2A38] hove` — width: 79px, right: 768px (tela: 430px)
- `<span>` class=`None` — width: 63px, right: 752px (tela: 430px)
- `<span>` class=`None` — width: 10px, right: 768px (tela: 430px)
- `<button>` class=`min-h-[44px] px-3 sm:px-4 py-2.5 text-xs sm:text-sm font-display font-bold upper` — width: 73px, right: 473px (tela: 430px)

**Alvos de Toque Menores que 44×44px (14):**
- `<button>` "MONTAR AGORA
→" — 106.6×16px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "VER RECEITAS
→" — 92.6×16px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "VER SUCOS
→" — 79.5×16px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "CARDÁPIO NO IFOOD ↗" — 136.4×32px (`text-xs sm:text-sm font-display font-bold uppercase tracking`)
- `<a>` "SIGA @THEPOKEMANAUS NO INSTAGRAM" — 240.1×15px (`text-xs font-display font-bold uppercase tracking-wider text`)
- `<a>` "PEDIR NO IFOOD MANAUS ↗" — 183.1×16px (`inline-flex items-center text-xs font-bold uppercase trackin`)
- `<a>` "Monte seu Poke" — 100.9×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Cardápio" — 58.4×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Sobre a Franquia" — 105.7×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Horários" — 53.8×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Instagram @thepokemanaus
↗" — 398×20px (`hover:text-[#F7EA48] transition-colors flex items-center spa`)
- `<a>` "Política de Privacidade" — 121×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)
- `<a>` "Termos de Uso" — 81.3×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)
- `<a>` "llms.txt" — 40.2×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)

**Problemas de Imagem (17):**
- `logo.webp`: sem width/height, pesada demais (natural: 640px vs exibida: 44px, ratio 14.55x)
- `poke-grande.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 171px, ratio 5.27x)
- `poke-makaha.webp`: sem width/height, pesada demais (natural: 740px vs exibida: 145px, ratio 5.12x)
- `poke-medio-frango-grelhado.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 175px, ratio 5.16x)
- `poke-pequeno.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 145px, ratio 6.23x)
- `poke-medio.webp`: sem width/height
- `poke-grande.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 192px, ratio 4.69x)
- `poke-makaha.webp`: sem width/height, pesada demais (natural: 740px vs exibida: 192px, ratio 3.85x)
- `anti-ox.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 192px, ratio 4.69x)
- `poke-makaha.webp`: sem width/height
- `poke-pequeno.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 76px, ratio 11.84x)
- `poke-pequeno.webp`: sem width/height
- `poke-medio.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 76px, ratio 11.84x)
- `poke-medio.webp`: sem width/height
- `poke-grande.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 76px, ratio 11.84x)
- `poke-grande.webp`: sem width/height
- `logo.webp`: sem width/height, pesada demais (natural: 640px vs exibida: 48px, ratio 13.33x)

- **Transferência:** Total: 833.0 KB (Imagens: 698.1 KB, Scripts: 0.0 KB, Fontes: 135.0 KB, CSS: 0.0 KB)

### Viewport 768px (tablet-768)

- **Erros de console:** 0
**Elementos com Overflow Horizontal (9):**
- `<div>` class=`absolute -top-10 -right-10 sm:-top-14 sm:-right-14 w-36 h-36 sm:w-60 sm:h-60 lg:` — width: 291px, right: 849px (tela: 768px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_20px_28px_rgba(0,0,0,0.18)]` — width: 291px, right: 849px (tela: 768px)
- `<img>` class=`object-contain` — width: 291px, right: 849px (tela: 768px)
- `<div>` class=`absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-10 w-32 h-32 sm:w-52 sm:h-52` — width: 235px, right: 821px (tela: 768px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.16)]` — width: 235px, right: 821px (tela: 768px)
- `<img>` class=`object-contain` — width: 235px, right: 821px (tela: 768px)
- `<div>` class=`hidden md:block absolute top-1/2 -translate-y-1/2 -right-16 lg:-right-12 w-48 h-` — width: 208px, right: 840px (tela: 768px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_16px_22px_rgba(0,0,0,0.14)]` — width: 208px, right: 840px (tela: 768px)
- `<img>` class=`object-contain` — width: 208px, right: 840px (tela: 768px)

**Alvos de Toque Menores que 44×44px (21):**
- `<button>` "Monte seu Poke" — 94.2×35.5px (`hover:text-[#2A7CA1] transition-colors py-2 cursor-pointer`)
- `<a>` "CARDÁPIO" — 66.3×35.5px (`hover:text-[#2A7CA1] transition-colors py-2`)
- `<a>` "SOBRE" — 42.2×35.5px (`hover:text-[#2A7CA1] transition-colors py-2`)
- `<a>` "HORÁRIOS" — 66.8×35.5px (`hover:text-[#2A7CA1] transition-colors py-2`)
- `<button>` "MONTAR AGORA
→" — 95.3×32px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "VER RECEITAS
→" — 87.6×32px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "VER SUCOS
→" — 79.5×16px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "CARDÁPIO NO IFOOD ↗" — 159.1×36px (`text-xs sm:text-sm font-display font-bold uppercase tracking`)
- `<button>` "MONTAR
→" — 63.7×24px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<button>` "MONTAR
→" — 63.7×24px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<button>` "MONTAR
→" — 63.7×24px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "SIGA @THEPOKEMANAUS NO INSTAGRAM" — 240.1×15px (`text-xs font-display font-bold uppercase tracking-wider text`)
- `<a>` "PEDIR NO IFOOD MANAUS ↗" — 183.1×16px (`inline-flex items-center text-xs font-bold uppercase trackin`)
- `<a>` "Monte seu Poke" — 100.9×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Cardápio" — 58.4×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Sobre a Franquia" — 105.7×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Horários" — 53.8×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Instagram @thepokemanaus
↗" — 150×40px (`hover:text-[#F7EA48] transition-colors flex items-center spa`)
- `<a>` "Política de Privacidade" — 121×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)
- `<a>` "Termos de Uso" — 81.3×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)
- `<a>` "llms.txt" — 40.2×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)

**Problemas de Imagem (17):**
- `logo.webp`: sem width/height, pesada demais (natural: 640px vs exibida: 48px, ratio 13.33x)
- `poke-grande.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 304px, ratio 2.96x)
- `poke-makaha.webp`: sem width/height, pesada demais (natural: 740px vs exibida: 253px, ratio 2.92x)
- `poke-medio-frango-grelhado.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 291px, ratio 3.09x)
- `poke-pequeno.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 235px, ratio 3.83x)
- `poke-medio.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 208px, ratio 4.33x)
- `poke-grande.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 155px, ratio 5.82x)
- `poke-makaha.webp`: sem width/height, pesada demais (natural: 740px vs exibida: 155px, ratio 4.78x)
- `anti-ox.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 155px, ratio 5.82x)
- `poke-makaha.webp`: sem width/height
- `poke-pequeno.webp`: sem width/height
- `poke-pequeno.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 284px, ratio 3.17x)
- `poke-medio.webp`: sem width/height
- `poke-medio.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 284px, ratio 3.17x)
- `poke-grande.webp`: sem width/height
- `poke-grande.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 284px, ratio 3.17x)
- `logo.webp`: sem width/height, pesada demais (natural: 640px vs exibida: 48px, ratio 13.33x)

- **Transferência:** Total: 833.0 KB (Imagens: 698.1 KB, Scripts: 0.0 KB, Fontes: 135.0 KB, CSS: 0.0 KB)

### Viewport 1024px (desktop-1024)

- **Erros de console:** 0
**Elementos com Overflow Horizontal (9):**
- `<div>` class=`absolute -top-10 -right-10 sm:-top-14 sm:-right-14 w-36 h-36 sm:w-60 sm:h-60 lg:` — width: 388px, right: 1114px (tela: 1024px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_20px_28px_rgba(0,0,0,0.18)]` — width: 388px, right: 1114px (tela: 1024px)
- `<img>` class=`object-contain` — width: 388px, right: 1114px (tela: 1024px)
- `<div>` class=`absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-10 w-32 h-32 sm:w-52 sm:h-52` — width: 307px, right: 1082px (tela: 1024px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.16)]` — width: 307px, right: 1082px (tela: 1024px)
- `<img>` class=`object-contain` — width: 307px, right: 1082px (tela: 1024px)
- `<div>` class=`hidden md:block absolute top-1/2 -translate-y-1/2 -right-16 lg:-right-12 w-48 h-` — width: 260px, right: 1082px (tela: 1024px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_16px_22px_rgba(0,0,0,0.14)]` — width: 260px, right: 1082px (tela: 1024px)
- `<img>` class=`object-contain` — width: 260px, right: 1082px (tela: 1024px)

**Alvos de Toque Menores que 44×44px (22):**
- `<button>` "Monte seu Poke" — 94.2×35.5px (`hover:text-[#2A7CA1] transition-colors py-2 cursor-pointer`)
- `<a>` "CARDÁPIO" — 66.3×35.5px (`hover:text-[#2A7CA1] transition-colors py-2`)
- `<a>` "SOBRE" — 42.2×35.5px (`hover:text-[#2A7CA1] transition-colors py-2`)
- `<a>` "HORÁRIOS" — 66.8×35.5px (`hover:text-[#2A7CA1] transition-colors py-2`)
- `<a>` "Instagram @thepokemanaus" — 88.6×18px (`hidden lg:inline-flex text-[12px] font-bold uppercase tracki`)
- `<button>` "MONTAR AGORA
→" — 106.6×16px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "VER RECEITAS
→" — 92.6×16px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "VER SUCOS
→" — 79.5×16px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "CARDÁPIO NO IFOOD ↗" — 159.1×36px (`text-xs sm:text-sm font-display font-bold uppercase tracking`)
- `<button>` "MONTAR
→" — 63.7×24px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<button>` "MONTAR
→" — 63.7×24px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<button>` "MONTAR
→" — 63.7×24px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "SIGA @THEPOKEMANAUS NO INSTAGRAM" — 240.1×15px (`text-xs font-display font-bold uppercase tracking-wider text`)
- `<a>` "PEDIR NO IFOOD MANAUS ↗" — 183.1×16px (`inline-flex items-center text-xs font-bold uppercase trackin`)
- `<a>` "Monte seu Poke" — 100.9×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Cardápio" — 58.4×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Sobre a Franquia" — 105.7×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Horários" — 53.8×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Instagram @thepokemanaus
↗" — 214×20px (`hover:text-[#F7EA48] transition-colors flex items-center spa`)
- `<a>` "Política de Privacidade" — 121×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)
- `<a>` "Termos de Uso" — 81.3×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)
- `<a>` "llms.txt" — 40.2×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)

**Problemas de Imagem (17):**
- `logo.webp`: sem width/height, pesada demais (natural: 640px vs exibida: 48px, ratio 13.33x)
- `poke-grande.webp`: sem width/height
- `poke-makaha.webp`: sem width/height
- `poke-medio-frango-grelhado.webp`: sem width/height
- `poke-pequeno.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 307px, ratio 2.93x)
- `poke-medio.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 260px, ratio 3.46x)
- `poke-grande.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 240px, ratio 3.75x)
- `poke-makaha.webp`: sem width/height, pesada demais (natural: 740px vs exibida: 240px, ratio 3.08x)
- `anti-ox.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 240px, ratio 3.75x)
- `poke-makaha.webp`: sem width/height
- `poke-pequeno.webp`: sem width/height
- `poke-pequeno.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 243px, ratio 3.71x)
- `poke-medio.webp`: sem width/height
- `poke-medio.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 243px, ratio 3.71x)
- `poke-grande.webp`: sem width/height
- `poke-grande.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 243px, ratio 3.71x)
- `logo.webp`: sem width/height, pesada demais (natural: 640px vs exibida: 48px, ratio 13.33x)

- **Transferência:** Total: 833.0 KB (Imagens: 698.1 KB, Scripts: 0.0 KB, Fontes: 135.0 KB, CSS: 0.0 KB)

### Viewport 1440px (desktop-1440)

- **Erros de console:** 0
**Elementos com Overflow Horizontal (9):**
- `<div>` class=`absolute -top-10 -right-10 sm:-top-14 sm:-right-14 w-36 h-36 sm:w-60 sm:h-60 lg:` — width: 388px, right: 1530px (tela: 1440px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_20px_28px_rgba(0,0,0,0.18)]` — width: 388px, right: 1530px (tela: 1440px)
- `<img>` class=`object-contain` — width: 388px, right: 1530px (tela: 1440px)
- `<div>` class=`absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-10 w-32 h-32 sm:w-52 sm:h-52` — width: 307px, right: 1498px (tela: 1440px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_18px_24px_rgba(0,0,0,0.16)]` — width: 307px, right: 1498px (tela: 1440px)
- `<img>` class=`object-contain` — width: 307px, right: 1498px (tela: 1440px)
- `<div>` class=`hidden md:block absolute top-1/2 -translate-y-1/2 -right-16 lg:-right-12 w-48 h-` — width: 260px, right: 1498px (tela: 1440px)
- `<div>` class=`relative w-full h-full drop-shadow-[0_16px_22px_rgba(0,0,0,0.14)]` — width: 260px, right: 1498px (tela: 1440px)
- `<img>` class=`object-contain` — width: 260px, right: 1498px (tela: 1440px)

**Alvos de Toque Menores que 44×44px (22):**
- `<button>` "Monte seu Poke" — 94.2×35.5px (`hover:text-[#2A7CA1] transition-colors py-2 cursor-pointer`)
- `<a>` "CARDÁPIO" — 66.3×35.5px (`hover:text-[#2A7CA1] transition-colors py-2`)
- `<a>` "SOBRE" — 42.2×35.5px (`hover:text-[#2A7CA1] transition-colors py-2`)
- `<a>` "HORÁRIOS" — 66.8×35.5px (`hover:text-[#2A7CA1] transition-colors py-2`)
- `<a>` "Instagram @thepokemanaus" — 88.6×18px (`hidden lg:inline-flex text-[12px] font-bold uppercase tracki`)
- `<button>` "MONTAR AGORA
→" — 106.6×16px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "VER RECEITAS
→" — 92.6×16px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "VER SUCOS
→" — 79.5×16px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "CARDÁPIO NO IFOOD ↗" — 159.1×36px (`text-xs sm:text-sm font-display font-bold uppercase tracking`)
- `<button>` "MONTAR
→" — 63.7×24px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<button>` "MONTAR
→" — 63.7×24px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<button>` "MONTAR
→" — 63.7×24px (`text-xs font-display font-extrabold uppercase tracking-wider`)
- `<a>` "SIGA @THEPOKEMANAUS NO INSTAGRAM" — 240.1×15px (`text-xs font-display font-bold uppercase tracking-wider text`)
- `<a>` "PEDIR NO IFOOD MANAUS ↗" — 183.1×16px (`inline-flex items-center text-xs font-bold uppercase trackin`)
- `<a>` "Monte seu Poke" — 100.9×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Cardápio" — 58.4×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Sobre a Franquia" — 105.7×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Horários" — 53.8×17px (`hover:text-[#F7EA48] transition-colors`)
- `<a>` "Instagram @thepokemanaus
↗" — 243×20px (`hover:text-[#F7EA48] transition-colors flex items-center spa`)
- `<a>` "Política de Privacidade" — 121×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)
- `<a>` "Termos de Uso" — 81.3×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)
- `<a>` "llms.txt" — 40.2×24px (`hover:text-[#FCF9F0] transition-colors underline-offset-4 ho`)

**Problemas de Imagem (17):**
- `logo.webp`: sem width/height, pesada demais (natural: 640px vs exibida: 48px, ratio 13.33x)
- `poke-grande.webp`: sem width/height
- `poke-makaha.webp`: sem width/height
- `poke-medio-frango-grelhado.webp`: sem width/height
- `poke-pequeno.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 307px, ratio 2.93x)
- `poke-medio.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 260px, ratio 3.46x)
- `poke-grande.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 279px, ratio 3.23x)
- `poke-makaha.webp`: sem width/height, pesada demais (natural: 740px vs exibida: 279px, ratio 2.66x)
- `anti-ox.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 279px, ratio 3.23x)
- `poke-makaha.webp`: sem width/height
- `poke-pequeno.webp`: sem width/height
- `poke-pequeno.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 281px, ratio 3.20x)
- `poke-medio.webp`: sem width/height
- `poke-medio.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 281px, ratio 3.20x)
- `poke-grande.webp`: sem width/height
- `poke-grande.webp`: sem width/height, pesada demais (natural: 900px vs exibida: 281px, ratio 3.20x)
- `logo.webp`: sem width/height, pesada demais (natural: 640px vs exibida: 48px, ratio 13.33x)

- **Transferência:** Total: 833.0 KB (Imagens: 698.1 KB, Scripts: 0.0 KB, Fontes: 135.0 KB, CSS: 0.0 KB)

## 3. Maiores Arquivos Transferidos (Top 10)

| Arquivo | Categoria | Tamanho (KB) |
|:---|:---:|:---:|
| `poke-grande.webp` | img | 149.2 KB |
| `poke-medio.webp` | img | 128.8 KB |
| `poke-makaha.webp` | img | 111.0 KB |
| `poke-medio-frango-grelhado.webp` | img | 110.4 KB |
| `poke-pequeno.webp` | img | 86.1 KB |
| `anti-ox.webp` | img | 83.1 KB |
| `logo.webp` | img | 29.3 KB |
| `CabinetGrotesk-400.woff2` | font | 24.9 KB |
| `CabinetGrotesk-700.woff2` | font | 24.7 KB |
| `GeneralSans-400.woff2` | font | 22.5 KB |

## 4. Fontes Carregadas

| Família | Status | Peso | Estilo |
|:---|:---:|:---:|:---:|
| General Sans | unloaded | 300 | normal |
| General Sans | loaded | 400 | normal |
| General Sans | loaded | 500 | normal |
| General Sans | unloaded | 600 | normal |
| General Sans | loaded | 700 | normal |
| Cabinet Grotesk | loaded | 400 | normal |
| Cabinet Grotesk | loaded | 700 | normal |
| Cabinet Grotesk | loaded | 800 | normal |

