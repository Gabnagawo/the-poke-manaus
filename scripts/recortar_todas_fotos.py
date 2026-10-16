import os
import glob
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

ASSETS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../assets/ifood'))
OUT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../public/images/recortes'))
SCREENSHOTS_V2 = os.path.abspath(os.path.join(os.path.dirname(__file__), '../screenshots/v2'))

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(SCREENSHOTS_V2, exist_ok=True)

def cutout_makaha(img_path):
    im = Image.open(img_path).convert('RGBA')
    w, h = im.size
    y, x = np.indices((h, w))
    cx, cy = 363.0, 277.5
    rx, ry = 346.0, 274.0
    dist_norm = np.sqrt(((x - cx) / rx)**2 + ((y - cy) / ry)**2)
    alpha = np.clip((1.002 - dist_norm) / 0.006 * 255, 0, 255).astype(np.uint8)
    alpha_img = Image.fromarray(alpha, mode='L').filter(ImageFilter.GaussianBlur(radius=1.0))
    im.putalpha(alpha_img)
    return im

def cutout_laranja(img_path):
    # Laranja has a hand holding the cup and a wall shadow on the left
    im = Image.open(img_path).convert('RGB')
    w, h = im.size
    filled = im.copy()
    
    # Border points
    for x in range(0, w, 5):
        for y in [0, h - 1]:
            ImageDraw.floodfill(filled, (x, y), (255, 0, 255), thresh=34)
    for y in range(0, h, 5):
        for x in [0, w - 1]:
            ImageDraw.floodfill(filled, (x, y), (255, 0, 255), thresh=34)
            
    # Also seed the wall shadow on the left (e.g. x=100, y=300)
    ImageDraw.floodfill(filled, (100, 300), (255, 0, 255), thresh=35)
    ImageDraw.floodfill(filled, (50, 400), (255, 0, 255), thresh=35)
    ImageDraw.floodfill(filled, (80, 200), (255, 0, 255), thresh=35)
    
    arr_filled = np.array(filled)
    is_bg = (arr_filled[:, :, 0] == 255) & (arr_filled[:, :, 1] == 0) & (arr_filled[:, :, 2] == 255)
    
    alpha = np.where(is_bg, 0, 255).astype(np.uint8)
    # Clear any residual left margin shadow
    alpha[:, :180] = np.where(alpha[:, :180] > 0, 0, alpha[:, :180])
    
    alpha_img = Image.fromarray(alpha, mode='L').filter(ImageFilter.GaussianBlur(radius=1.2))
    rgba = im.convert('RGBA')
    rgba.putalpha(alpha_img)
    return rgba

def cutout_bowl(img_path):
    im = Image.open(img_path).convert('RGB')
    w, h = im.size
    filled = im.copy()
    
    # High threshold on border to swallow shadow completely without touching bowl
    # The bowl ceramic is pinkish-tan or food ingredients
    # Seed top, left, right, and bottom borders
    for x in range(0, w, 5):
        for y in [0, h - 1]:
            ImageDraw.floodfill(filled, (x, y), (255, 0, 255), thresh=40)
    for y in range(0, h, 5):
        for x in [0, w - 1]:
            ImageDraw.floodfill(filled, (x, y), (255, 0, 255), thresh=40)
            
    arr_filled = np.array(filled)
    is_bg = (arr_filled[:, :, 0] == 255) & (arr_filled[:, :, 1] == 0) & (arr_filled[:, :, 2] == 255)
    alpha = np.where(is_bg, 0, 255).astype(np.uint8)
    
    # In bottom 15% of the image, any pixel with low saturation and neutral grey is shadow
    arr = np.array(im)
    r, g, b = arr[:,:,0].astype(int), arr[:,:,1].astype(int), arr[:,:,2].astype(int)
    sat = np.maximum(r, np.maximum(g, b)) - np.minimum(r, np.minimum(g, b))
    y_idx = np.indices((h, w))[0]
    
    # Shadow shelf cleanup: only at bottom right outside bowl curve (x > w*0.55, y > h*0.82)
    shadow_shelf = (y_idx > h * 0.82) & (sat <= 12) & (r < 240)
    alpha[shadow_shelf] = 0
    
    # Clean edges
    edge_m = 4
    alpha[:edge_m, :] = 0
    alpha[-edge_m:, :] = 0
    alpha[:, :edge_m] = 0
    alpha[:, -edge_m:] = 0
    
    alpha_img = Image.fromarray(alpha, mode='L').filter(ImageFilter.GaussianBlur(radius=1.1))
    rgba = im.convert('RGBA')
    rgba.putalpha(alpha_img)
    return rgba

def cutout_suco(img_path):
    im = Image.open(img_path).convert('RGB')
    w, h = im.size
    filled = im.copy()
    
    for x in range(0, w, 5):
        for y in [0, h - 1]:
            ImageDraw.floodfill(filled, (x, y), (255, 0, 255), thresh=34)
    for y in range(0, h, 5):
        for x in [0, w - 1]:
            ImageDraw.floodfill(filled, (x, y), (255, 0, 255), thresh=34)
            
    arr_filled = np.array(filled)
    is_bg = (arr_filled[:, :, 0] == 255) & (arr_filled[:, :, 1] == 0) & (arr_filled[:, :, 2] == 255)
    alpha = np.where(is_bg, 0, 255).astype(np.uint8)
    
    # Clean tiny surface spot at bottom
    alpha[-6:, :] = 0
    alpha[:4, :] = 0
    alpha[:, :4] = 0
    alpha[:, -4:] = 0
    
    alpha_img = Image.fromarray(alpha, mode='L').filter(ImageFilter.GaussianBlur(radius=1.1))
    rgba = im.convert('RGBA')
    rgba.putalpha(alpha_img)
    return rgba

def process_all():
    files = sorted(glob.glob(os.path.join(ASSETS_DIR, '*.jpg')) + glob.glob(os.path.join(ASSETS_DIR, '*.jpeg')))
    cutouts = {}
    
    for f in files:
        base = os.path.basename(f)
        if base == 'logo.jpeg':
            continue
        stem = os.path.splitext(base)[0]
        print(f"Processing {base}...")
        if 'makaha' in stem:
            rgba = cutout_makaha(f)
        elif stem == 'laranja':
            rgba = cutout_laranja(f)
        elif 'poke' in stem:
            rgba = cutout_bowl(f)
        else:
            rgba = cutout_suco(f)
            
        out_webp = os.path.join(OUT_DIR, f"{stem}.webp")
        rgba.save(out_webp, 'WEBP', quality=90)
        size_kb = os.path.getsize(out_webp) / 1024
        print(f"  Saved {stem}.webp ({size_kb:.1f} KB)")
        cutouts[stem] = rgba
        
    cell_w, cell_h = 280, 240
    cols = 4
    rows = (len(cutouts) + cols - 1) // cols
    sheet_w = cols * cell_w + 40
    sheet_h = rows * cell_h + 80
    
    sheet = Image.new('RGB', (sheet_w, sheet_h), (26, 32, 44))
    draw = ImageDraw.Draw(sheet)
    draw.text((20, 20), "FOLHA DE CONTATO v2 — RECORTES DAS FOTOS SOBRE FUNDO ESCURO (#1A202C)", fill=(247, 234, 72))
    
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
