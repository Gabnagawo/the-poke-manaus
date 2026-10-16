"""Compõe a 'mesa vista de cima' do hero (estilo limon.no) a partir dos recortes reais.

Uso: python scripts/hero/compor_mesa.py  (gera public/images/hero/mesa-*.webp)
Cada variante tem a lista de tigelas: (arquivo, cx, cy, largura, rotação), com cx/cy/largura
em fração da largura da tela. Sombras: uma de contato (curta e escura) e uma projetada (longa e suave).
"""
import os, sys, random
from PIL import Image, ImageFilter, ImageChops, ImageDraw

RAIZ = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
REC = os.path.join(RAIZ, "public", "images", "recortes")
OUT = os.path.join(RAIZ, "public", "images", "hero")
os.makedirs(OUT, exist_ok=True)

MESA = (44, 124, 160)      # azul da marca (círculo do logo, #2A7CA1), um pouco mais claro


def fundo(w, h, cor=MESA):
    """Mesa com luz suave vinda do alto à esquerda e um grão leve, para não parecer cor chapada."""
    base = Image.new("RGB", (w, h), cor)
    luz = Image.new("L", (w, h), 0)
    d = ImageDraw.Draw(luz)
    r = int(max(w, h) * 0.9)
    cx, cy = int(w * 0.32), int(h * 0.18)
    for i in range(40, 0, -1):
        rr = int(r * i / 40)
        d.ellipse([cx - rr, cy - rr, cx + rr, cy + rr], fill=int(70 * (1 - i / 40)))
    luz = luz.filter(ImageFilter.GaussianBlur(max(w, h) // 12))
    clara = Image.new("RGB", (w, h), tuple(min(255, c + 26) for c in cor))
    escura = Image.new("RGB", (w, h), tuple(max(0, c - 22) for c in cor))
    img = Image.composite(clara, escura, luz.point(lambda v: min(255, v * 3)))
    img = Image.blend(base, img, 0.85)
    rnd = random.Random(7)
    grao = Image.effect_noise((w, h), 18).convert("L")
    grao = grao.point(lambda v: 128 + (v - 128) // 6)
    img = ImageChops.overlay(img, Image.merge("RGB", (grao, grao, grao)))
    return img


def recorte(nome):
    im = Image.open(os.path.join(REC, nome)).convert("RGBA")
    return im.crop(im.split()[3].getbbox())


def colar(tela, nome, cx, cy, larg, rot):
    W, H = tela.size
    im = recorte(nome)
    lw = int(W * larg)
    im = im.resize((lw, int(im.height * lw / im.width)), Image.LANCZOS)
    if rot:
        im = im.rotate(rot, resample=Image.BICUBIC, expand=True)
    x, y = int(W * cx - im.width / 2), int(H * cy - im.height / 2) if False else int(W * cy - im.height / 2)
    a = im.split()[3]
    # sombra projetada (longa, suave)
    for off, blur, op in ((0.045, 0.05, 0.42), (0.012, 0.012, 0.35)):
        s = Image.new("L", tela.size, 0)
        s.paste(a, (x + int(lw * off * 0.5), y + int(lw * off)))
        s = s.filter(ImageFilter.GaussianBlur(max(1, int(lw * blur))))
        sombra = Image.new("RGB", tela.size, (12, 30, 38))
        tela.paste(sombra, (0, 0), s.point(lambda v: int(v * op)))
    tela.paste(im, (x, y), im)


def compor(nome, w, h, tigelas, cor=MESA):
    tela = fundo(w, h, cor)
    for t in tigelas:
        colar(tela, *t)
    tela.save(os.path.join(OUT, nome + ".webp"), "WEBP", quality=80, method=6)
    print(nome, w, h, os.path.getsize(os.path.join(OUT, nome + ".webp")) // 1024, "KB")


# cx, cy e largura em fração da LARGURA da tela (cy também, para manter proporção entre variantes)
DESKTOP = [
    ("poke-grande.webp",               0.09, 0.05, 0.25, -4),
    ("poke-medio.webp",                0.42, 0.02, 0.21, 3),
    ("poke-pequeno-frango-grelhado.webp", 0.75, 0.05, 0.23, -3),
    ("poke-makaha.webp",               0.99, 0.26, 0.24, 4),
    ("poke-pequeno.webp",              0.67, 0.31, 0.20, -3),
    ("poke-grande-frango-grelhado.webp", 0.86, 0.52, 0.24, 3),
]
MOBILE = [
    ("poke-pequeno-frango-grelhado.webp", 1.00, 0.02, 0.38, -3),
    ("poke-pequeno.webp",              1.02, 1.12, 0.50, 3),
    ("poke-grande.webp",               0.34, 1.42, 0.80, -3),
    ("poke-makaha.webp",               0.94, 1.80, 0.60, 2),
    ("poke-medio.webp",               -0.04, 1.98, 0.52, -2),
]

if __name__ == "__main__":
    compor("mesa-desktop", 2400, 1300, DESKTOP)
    compor("mesa-mobile", 1080, 2040, MOBILE)
    im = Image.open(os.path.join(OUT, "mesa-desktop.webp"))
    im.resize((1600, int(1600 * im.height / im.width)), Image.LANCZOS).save(os.path.join(OUT, "mesa-desktop-1600.webp"), "WEBP", quality=80, method=6)
    im = Image.open(os.path.join(OUT, "mesa-mobile.webp"))
    im.resize((720, int(720 * im.height / im.width)), Image.LANCZOS).save(os.path.join(OUT, "mesa-mobile-720.webp"), "WEBP", quality=78, method=6)
    for n in os.listdir(OUT):
        if n.endswith("-preview.jpg"):
            os.remove(os.path.join(OUT, n))
