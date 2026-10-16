"""Gera as fotos do cardápio (public/images/cardapio/<slug>-200|400|800.webp) a partir dos recortes.

- Tigelas: apara no contorno do prato (canal alpha) com uma margem pequena.
- Copos: apara no contorno, sem margem embaixo (o corte reto do copo encosta na base do quadro).
- Fotos sem recorte (laranja): corte quadrado central.
Uso: python scripts/gerar-fotos-cardapio.py
"""
import os
from PIL import Image

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
REC = os.path.join(RAIZ, "public", "images", "recortes")
OUT = os.path.join(RAIZ, "public", "images", "cardapio")
os.makedirs(OUT, exist_ok=True)
COPOS = {"anti-ox", "ensolarado", "guaraflow", "imune-se", "mente-fresh", "move-on", "power-red", "reset-green", "sussa-vibe", "tropicalize"}

for nome in sorted(os.listdir(REC)):
    if not nome.endswith(".webp"):
        continue
    slug = nome[:-5]
    im = Image.open(os.path.join(REC, nome))
    if im.mode != "RGBA":
        lado = min(im.size)
        x, y = (im.width - lado) // 2, (im.height - lado) // 2
        im = im.convert("RGB").crop((x, y, x + lado, y + lado))
    else:
        a = im.split()[3].point(lambda v: 255 if v > 12 else 0)
        l, t, r, b = a.getbbox()
        m = int(max(r - l, b - t) * 0.02)
        if slug in COPOS:
            im = im.crop((max(0, l - m), max(0, t - m), min(im.width, r + m), b))
        else:
            im = im.crop((max(0, l - m), max(0, t - m), min(im.width, r + m), min(im.height, b + m)))
    for w in (200, 400, 800):
        alvo = im if im.width <= w else im.resize((w, round(im.height * w / im.width)), Image.LANCZOS)
        alvo.save(os.path.join(OUT, f"{slug}-{w}.webp"), "WEBP", quality=82, method=6)
    print(slug, im.size)
