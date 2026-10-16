"""Gera favicons, ícones do app e a imagem de compartilhamento (OG) com a identidade nova:
logo vetorial (brand/logo the poke.pdf), Aktiv Grotesk, Kaufmann e a mesa do hero.

Uso: python scripts/gerar-marca.py
"""
import asyncio
import os
import re
from pathlib import Path

from PIL import Image
from playwright.async_api import async_playwright

RAIZ = Path(__file__).resolve().parents[1]
PUB = RAIZ / "public"
logo = (RAIZ / "src" / "components" / "ui" / "Logo.tsx").read_text(encoding="utf-8")
D = re.search(r'LOGO_PATH = "([^"]+)"', logo).group(1)
T = re.search(r'transform="([^"]+)"', logo).group(1)
SVG = f'<svg viewBox="66 375 481 110" fill="currentColor"><path transform="{T}" d="{D}"/></svg>'
URL = PUB.as_uri()

FONTES = f"""
@font-face{{font-family:A;font-weight:800;src:url({URL}/fonts/aktiv/AktivGrotesk-XBold.woff2)}}
@font-face{{font-family:A;font-weight:700;src:url({URL}/fonts/aktiv/AktivGrotesk-Bold.woff2)}}
@font-face{{font-family:K;src:url({URL}/fonts/kaufmann/Kaufmann.woff2)}}
"""

ICONE = f"""<html><head><style>{FONTES}
html,body{{margin:0}} .q{{width:512px;height:512px;background:#2a7ca1;display:grid;place-items:center;color:#fcf9f0}}
.q svg{{width:76%}}</style></head><body><div class="q">{SVG}</div></body></html>"""

OG = f"""<html><head><style>{FONTES}
html,body{{margin:0}}
.og{{position:relative;width:1200px;height:630px;overflow:hidden;background:#2c7ca0;color:#fcf9f0;font-family:A}}
.og img{{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:78% 40%}}
.t{{position:absolute;left:64px;bottom:70px}}
.logo{{position:absolute;left:64px;top:150px;width:170px;color:#fcf9f0}}
.r{{font-weight:700;font-size:20px;letter-spacing:.08em;text-transform:uppercase;opacity:.9}}
h1{{margin:14px 0 0;font-weight:800;font-size:112px;line-height:.88;letter-spacing:-.015em;text-transform:uppercase}}
.k{{font-family:K;color:#f7ea48;font-size:54px;margin-top:22px;transform:rotate(-7deg);transform-origin:left;display:inline-block}}
</style></head><body><div class="og"><img src="{URL}/images/hero/mesa-desktop.webp">
<div class="logo">{SVG}</div>
<div class="t"><div class="r">Park Mall Ephigênio · Manaus</div><h1>Monte<br>seu poke</h1>
<div class="k">Rápido, saboroso &amp; nutritivo.</div></div></div></body></html>"""


async def renderizar(html: str, largura: int, altura: int, saida: Path, transparente=False):
    async with async_playwright() as p:
        b = await p.chromium.launch(channel="msedge")
        pg = await b.new_page(viewport={"width": largura, "height": altura})
        tmp = RAIZ / "scripts" / "_tmp_marca.html"
        tmp.write_text(html, encoding="utf-8")
        await pg.goto(tmp.as_uri())
        await pg.wait_for_timeout(600)
        await pg.screenshot(path=str(saida), omit_background=transparente)
        tmp.unlink()
        await b.close()


async def main():
    base = RAIZ / "scripts" / "_icone512.png"
    await renderizar(ICONE, 512, 512, base)
    im = Image.open(base).convert("RGB")
    im.save(PUB / "icon-512.png")
    im.resize((192, 192), Image.LANCZOS).save(PUB / "icon-192.png")
    im.resize((180, 180), Image.LANCZOS).save(PUB / "apple-touch-icon.png")
    im.resize((32, 32), Image.LANCZOS).save(PUB / "icon.png")
    im.save(PUB / "favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    base.unlink()

    png = RAIZ / "scripts" / "_og.png"
    await renderizar(OG, 1200, 630, png)
    Image.open(png).convert("RGB").save(PUB / "og-image.jpg", "JPEG", quality=84, optimize=True, progressive=True)
    png.unlink()
    print("ok:", ", ".join(f"{n} {os.path.getsize(PUB / n) // 1024} KB" for n in ["icon-512.png", "favicon.ico", "og-image.jpg"]))


asyncio.run(main())
