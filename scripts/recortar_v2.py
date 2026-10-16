import os
import glob
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ASSETS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../assets/ifood'))
OUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../public/images/recortes'))
SCREENSHOTS_V2 = os.path.abspath(os.path.join(os.path.dirname(__file__), '../screenshots/v2'))

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(SCREENSHOTS_V2, exist_ok=True)

# Ellipse parameters (cx, cy, rx, ry) tuned per bowl
BOWL_ELLIPSES = {
    'poke-makaha': (363.0, 277.5, 346.0, 274.0),
    'poke-grande': (447.0, 350.0, 415.0, 318.0),
    'poke-grande-frango-grelhado': (444.0, 370.0, 404.0, 298.0),
    'poke-medio': (450.5, 360.0, 386.0, 308.0),
    'poke-medio-frango-grelhado': (436.5, 376.0, 360.0, 287.0),
    'poke-pequeno': (443.0, 356.0, 314.0, 270.0),
    'poke-pequeno-frango-grelhado': (429.0, 381.0, 308.0, 258.0),
    'poke-medio-frango-teriyaki': (148.5, 131.5, 119.0, 90.0),
}

def cutout_bowl_ellipse(img_path, stem):
    im = Image.open(img_path).convert('RGBA')
    w, h = im.size
    cx, cy, rx, ry = BOWL_ELLIPSES[stem]
    
    y, x = np.indices((h, w))
    dist_norm = np.sqrt(((x - cx) / rx)**2 + ((y - cy) / ry)**2)
    
    # Smooth 1px transition around 1.0
    alpha = np.clip((1.002 - dist_norm) / 0.006 * 255, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha, mode='L').filter(ImageFilter.GaussianBlur(radius=1.0))
    im.putalpha(alpha_img)
    return im

def cutout_cup(img_path, stem):
    im = Image.open(img_path).convert('RGB')
    w, h = im.size
    filled = im.copy()
    
    # Lower threshold for mente-fresh to prevent jagged edges on pale green
    thresh = 22 if stem == 'mente-fresh' else 32
    
    for x in range(0, w, 5):
        for y in [0, h - 1]:
            ImageDraw.floodfill(filled, (x, y), (255, 0, 255), thresh=thresh)
    for y in range(0, h, 5):
        for x in [0, w - 1]:
            ImageDraw.floodfill(filled, (x, y), (255, 0, 255), thresh=thresh)
            
    arr_filled = np.array(filled)
    is_bg = (arr_filled[:, :, 0] == 255) & (arr_filled[:, :, 1] == 0) & (arr_filled[:, :, 2] == 255)
    alpha = np.where(is_bg, 0, 255).astype(np.uint8)
    
    # Cut dark shadow at the base of the cup (bottom ~30px)
    # The cup base rim reflection is around y=638, shadow starts below y=644
    base_cut_y = int(h * 0.954) # ~644 on 675h
    alpha[base_cut_y:, :] = 0
    
    # Clean edges
    alpha[:4, :] = 0
    alpha[:, :4] = 0
    alpha[:, -4:] = 0
    
    blur_r = 1.3 if stem == 'mente-fresh' else 1.1
    alpha_img = Image.fromarray(alpha, mode='L').filter(ImageFilter.GaussianBlur(radius=blur_r))
    rgba = im.convert('RGBA')
    rgba.putalpha(alpha_img)
    return rgba

def process_laranja(img_path):
    # Laranja: use original photo in a square (675x675 centered), no transparent cutout
    im = Image.open(img_path).convert('RGB')
    w, h = im.size
    # Crop to centered square
    crop_size = min(w, h)
    left = (w - crop_size) // 2
    top = (h - crop_size) // 2
    square = im.crop((left, top, left + crop_size, top + crop_size))
    # Return as RGBA (fully opaque)
    return square.convert('RGBA')

def process_all():
    files = sorted(glob.glob(os.path.join(ASSETS_DIR, '*.jpg')) + glob.glob(os.path.join(ASSETS_DIR, '*.jpeg')))
    cutouts = {}
    
    for f in files:
        base = os.path.basename(f)
        if base == 'logo.jpeg':
            continue
        stem = os.path.splitext(base)[0]
        print(f"Processing {base}...")
        
        if stem in BOWL_ELLIPSES:
            rgba = cutout_bowl_ellipse(f, stem)
        elif stem == 'laranja':
            rgba = process_laranja(f)
        else:
            rgba = cutout_cup(f, stem)
            
        out_webp = os.path.join(OUT_DIR, f"{stem}.webp")
        rgba.save(out_webp, 'WEBP', quality=90)
        size_kb = os.path.getsize(out_webp) / 1024
        print(f"  Saved {stem}.webp ({size_kb:.1f} KB)")
        cutouts[stem] = rgba
        
    # Generate contact sheet over dark background #1a202c
    cell_w, cell_h = 280, 240
    cols = 4
    rows = (len(cutouts) + cols - 1) // cols
    sheet_w = cols * cell_w + 40
    sheet_h = rows * cell_h + 80
    
    sheet = Image.new('RGB', (sheet_w, sheet_h), (26, 32, 44))
    draw = ImageDraw.Draw(sheet)
    draw.text((20, 20), "FOLHA DE CONTATO v2.1 — RECORTES COM MASCARA ELIPTICA E BASE LIMPA (#1A202C)", fill=(247, 234, 72))
    
    for idx, (name, img) in enumerate(cutouts.items()):
        col = idx % cols
        row = idx // cols
        x_base = 20 + col * cell_w
        y_base = 60 + row * cell_h
        
        thumb = img.copy()
        thumb.thumbnail((cell_w - 30, cell_h - 50), Image.Resampling.LANCZOS)
        tw, th = thumb.size
        
        paste_x = x_base + (cell_w - tw) // 2
        paste_y = y_base + (cell_h - 40 - th) // 2
        
        sheet.paste(thumb, (paste_x, paste_y), thumb)
        draw.text((x_base + 10, y_base + cell_h - 30), name, fill=(220, 220, 220))
        draw.rectangle([x_base, y_base, x_base + cell_w - 10, y_base + cell_h - 10], outline=(45, 55, 72), width=1)
        
    sheet_path = os.path.join(SCREENSHOTS_V2, 'recortes.png')
    sheet.save(sheet_path, 'PNG')
    print(f"\nContact sheet saved to {sheet_path}")

if __name__ == '__main__':
    process_all()
