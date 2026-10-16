import os
import glob
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

BASE_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), '../..'))
ASSETS_DIR = os.path.join(BASE_DIR, 'assets/ifood')
OUT_DIR = os.path.join(BASE_DIR, 'site/public/images/recortes')
SCREENSHOTS_V4 = os.path.join(BASE_DIR, 'site/screenshots/v4')

os.makedirs(OUT_DIR, exist_ok=True)
os.makedirs(SCREENSHOTS_V4, exist_ok=True)

# 10 cups to process from assets/ifood/*.jpg
CUP_NAMES = [
    'anti-ox', 'ensolarado', 'guaraflow', 'imune-se',
    'mente-fresh', 'move-on', 'power-red', 'reset-green',
    'sussa-vibe', 'tropicalize'
]

# Bowl ellipses tuned 2-3px inward to guarantee zero white table halo
BOWL_ELLIPSES = {
    'poke-makaha': (363.0, 277.5, 344.0, 272.0),
    'poke-grande': (447.0, 350.0, 411.5, 314.5),
    'poke-grande-frango-grelhado': (444.0, 370.0, 400.5, 294.5),
    'poke-medio': (450.5, 360.0, 382.5, 304.5),
    'poke-medio-frango-grelhado': (436.5, 376.0, 356.5, 283.5),
    'poke-pequeno': (443.0, 356.0, 310.5, 266.5),
    'poke-pequeno-frango-grelhado': (429.0, 381.0, 304.5, 254.5),
    'poke-medio-frango-teriyaki': (148.5, 131.5, 117.0, 88.0),
}

def cutout_cup(stem):
    img_path = os.path.join(ASSETS_DIR, f"{stem}.jpg")
    im = Image.open(img_path).convert('RGB')
    arr = np.array(im)
    h, w, _ = arr.shape
    bg = arr[0, 0].astype(float)
    
    # 1. Color distance from background
    diff = np.sqrt(np.sum((arr.astype(float) - bg)**2, axis=2))
    
    # 2. Floodfill from all outer background border regions
    flood_mask = np.zeros((h + 2, w + 2), np.uint8)
    img_copy = arr.copy()
    flags = 4 | cv2.FLOODFILL_FIXED_RANGE | (255 << 8)
    thresh = 15
    
    # Flood from outer border pixels
    for y in range(h):
        if diff[y, 0] < 10:
            cv2.floodFill(img_copy, flood_mask, (0, y), (0, 255, 0), (thresh, thresh, thresh), (thresh, thresh, thresh), flags)
        if diff[y, w-1] < 10:
            cv2.floodFill(img_copy, flood_mask, (w-1, y), (0, 255, 0), (thresh, thresh, thresh), (thresh, thresh, thresh), flags)
    for x in range(w):
        if (x < 220 or x > 720) and diff[0, x] < 10:
            cv2.floodFill(img_copy, flood_mask, (x, 0), (0, 255, 0), (thresh, thresh, thresh), (thresh, thresh, thresh), flags)
            
    is_bg = (flood_mask[1:-1, 1:-1] == 255)
    raw_fg = (~is_bg).astype(np.uint8)
    
    # 3. Keep only the largest connected component (the cup)
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(raw_fg)
    if num_labels > 1:
        largest_idx = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
        cup_mask = (labels == largest_idx).astype(np.uint8)
    else:
        cup_mask = raw_fg
        
    # 4. Fill internal holes inside the cup
    contours, _ = cv2.findContours(cup_mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    filled_mask = np.zeros_like(cup_mask)
    if contours:
        largest_c = max(contours, key=cv2.contourArea)
        cv2.drawContours(filled_mask, [largest_c], -1, 1, thickness=cv2.FILLED)
    else:
        filled_mask = cup_mask
        
    # 5. Clean horizontal cut at base (row h-1)
    base_xs = np.where(filled_mask[h-1] > 0)[0]
    if len(base_xs) > 0:
        base_min_x, base_max_x = base_xs.min(), base_xs.max()
    else:
        base_xs = np.where(filled_mask[h-2] > 0)[0]
        base_min_x, base_max_x = base_xs.min(), base_xs.max()
        filled_mask[h-1, base_min_x:base_max_x+1] = 1
        
    # 6. Smooth alpha (1px anti-aliasing)
    alpha_float = filled_mask.astype(np.float32) * 255.0
    alpha_blurred = cv2.GaussianBlur(alpha_float, (0, 0), sigmaX=0.8, sigmaY=0.8)
    
    # Keep the bottom row razor sharp and horizontal
    alpha_blurred[h-1, :] = 0
    alpha_blurred[h-1, base_min_x:base_max_x+1] = 255.0
    
    # 7. Defringing via color dilation:
    dist, _ = cv2.distanceTransformWithLabels((filled_mask == 0).astype(np.uint8), cv2.DIST_L2, 5, labelType=cv2.DIST_LABEL_PIXEL)
    inpaint_mask = ((alpha_blurred < 250) & (alpha_blurred > 0) | ((alpha_blurred == 0) & (dist <= 3))).astype(np.uint8)
    defringed_rgb = cv2.inpaint(arr, inpaint_mask, inpaintRadius=3, flags=cv2.INPAINT_TELEA)
    
    final_alpha = np.clip(alpha_blurred, 0, 255).astype(np.uint8)
    rgba = np.dstack([defringed_rgb, final_alpha])
    return Image.fromarray(rgba, mode='RGBA')

def cutout_bowl_ellipse(stem):
    img_path = os.path.join(ASSETS_DIR, f"{stem}.jpg")
    im = Image.open(img_path).convert('RGB')
    arr = np.array(im)
    h, w, _ = arr.shape
    cx, cy, rx, ry = BOWL_ELLIPSES[stem]
    
    y, x = np.indices((h, w))
    dist_norm = np.sqrt(((x - cx) / rx)**2 + ((y - cy) / ry)**2)
    
    # Smooth 1px transition around 1.0
    alpha_float = np.clip((1.002 - dist_norm) / 0.006 * 255, 0, 255)
    
    # Defringe bowl rim: inpaint outer transition from inner rim
    inner_mask = (dist_norm < 0.985).astype(np.uint8)
    outer_band = ((dist_norm >= 0.985) & (dist_norm <= 1.02)).astype(np.uint8)
    defringed_rgb = cv2.inpaint(arr, outer_band, inpaintRadius=3, flags=cv2.INPAINT_TELEA)
    
    rgba = np.dstack([defringed_rgb, alpha_float.astype(np.uint8)])
    return Image.fromarray(rgba, mode='RGBA')

def get_laranja():
    # Keep laranja.webp as-is (photo in square, fully opaque)
    path = os.path.join(OUT_DIR, 'laranja.webp')
    if os.path.exists(path):
        return Image.open(path)
    im = Image.open(os.path.join(ASSETS_DIR, 'laranja.jpg')).convert('RGB')
    w, h = im.size
    crop_size = min(w, h)
    left = (w - crop_size) // 2
    top = (h - crop_size) // 2
    return im.crop((left, top, left + crop_size, top + crop_size))

def build_contact_sheet(all_recortes):
    # Two panels: Left = Petróleo (#0E4C74), Right = Creme (#FCF9F0)
    # We display each asset side-by-side or in two full columns
    items = sorted(all_recortes.keys())
    
    card_w = 220
    card_h = 200
    cols = 4
    rows = (len(items) + cols - 1) // cols
    
    grid_w = cols * card_w + 30
    grid_h = rows * card_h + 90
    
    sheet_w = grid_w * 2 + 20
    sheet_h = grid_h
    
    sheet = Image.new('RGB', (sheet_w, sheet_h), (20, 24, 30))
    draw = ImageDraw.Draw(sheet)
    
    # Header
    draw.text((25, 20), "FOLHA DE CONTATO v4 — RECORTES THE POKE (PETROLEO #0E4C74 vs CREME #FCF9F0)", fill=(247, 234, 72))
    
    # Background boxes
    c_petrol = (14, 76, 116)
    c_creme = (252, 249, 240)
    
    # Draw left panel (Petróleo)
    draw.rectangle([15, 60, grid_w + 5, sheet_h - 15], fill=c_petrol, outline=(30, 100, 150), width=1)
    draw.text((30, 70), "FUNDO ESCURO / PETROLEO (#0E4C74) — Checagem de halo branco ou borda serrilhada", fill=(255, 255, 255))
    
    # Draw right panel (Creme)
    draw.rectangle([grid_w + 15, 60, sheet_w - 15, sheet_h - 15], fill=c_creme, outline=(220, 215, 200), width=1)
    draw.text((grid_w + 30, 70), "FUNDO CLARO / CREME (#FCF9F0) — Checagem de halo escuro, corte limpo e base", fill=(14, 42, 56))
    
    for idx, name in enumerate(items):
        im = all_recortes[name]
        col = idx % cols
        row = idx // cols
        
        # Thumbnail preserving aspect ratio
        thumb = im.copy()
        thumb.thumbnail((card_w - 30, card_h - 60), Image.Resampling.LANCZOS)
        tw, th = thumb.size
        
        # Position in left panel
        lx = 25 + col * card_w + (card_w - tw) // 2
        ly = 100 + row * card_h + (card_h - 50 - th) // 2
        
        # Position in right panel
        rx = grid_w + 25 + col * card_w + (card_w - tw) // 2
        ry = ly
        
        # Paste on left
        if im.mode == 'RGBA':
            sheet.paste(thumb, (lx, ly), thumb)
            sheet.paste(thumb, (rx, ry), thumb)
        else:
            sheet.paste(thumb, (lx, ly))
            sheet.paste(thumb, (rx, ry))
            
        # Draw labels
        lbl_ly = 100 + row * card_h + card_h - 45
        draw.text((25 + col * card_w + 10, lbl_ly), name, fill=(230, 240, 250))
        draw.text((grid_w + 25 + col * card_w + 10, lbl_ly), name, fill=(14, 42, 56))
        
        # Subtle card boundary
        draw.rectangle([25 + col * card_w, 100 + row * card_h, 25 + (col+1)*card_w - 10, 100 + (row+1)*card_h - 10], outline=(40, 95, 135), width=1)
        draw.rectangle([grid_w + 25 + col * card_w, 100 + row * card_h, grid_w + 25 + (col+1)*card_w - 10, 100 + (row+1)*card_h - 10], outline=(230, 225, 215), width=1)

    sheet_path = os.path.join(SCREENSHOTS_V4, 'recortes-v4.png')
    sheet.save(sheet_path, 'PNG')
    print(f"\n[OK] Contact sheet saved to: {sheet_path}")

def run():
    recortes = {}
    
    print("=== PROCESSANDO COPOS DE SUCO (10 UNIDADES) ===")
    for stem in CUP_NAMES:
        print(f"  Recortando copo: {stem}...")
        rgba = cutout_cup(stem)
        out_path = os.path.join(OUT_DIR, f"{stem}.webp")
        rgba.save(out_path, 'WEBP', quality=92)
        size_kb = os.path.getsize(out_path) / 1024
        print(f"    Salvo em {out_path} ({size_kb:.1f} KB)")
        recortes[stem] = rgba

    print("\n=== PROCESSANDO TIGELAS (8 UNIDADES) ===")
    for stem in BOWL_ELLIPSES.keys():
        print(f"  Ajustando tigela: {stem}...")
        rgba = cutout_bowl_ellipse(stem)
        out_path = os.path.join(OUT_DIR, f"{stem}.webp")
        rgba.save(out_path, 'WEBP', quality=92)
        size_kb = os.path.getsize(out_path) / 1024
        print(f"    Salvo em {out_path} ({size_kb:.1f} KB)")
        recortes[stem] = rgba
        
    print("\n=== PROCESSANDO LARANJA (MÃO SEGURANDO COPO) ===")
    im_laranja = get_laranja()
    out_laranja = os.path.join(OUT_DIR, 'laranja.webp')
    im_laranja.save(out_laranja, 'WEBP', quality=92)
    size_kb = os.path.getsize(out_laranja) / 1024
    print(f"  Laranja preservada em {out_laranja} ({size_kb:.1f} KB)")
    recortes['laranja'] = im_laranja
    
    print("\n=== GERANDO FOLHA DE CONTATO v4 ===")
    build_contact_sheet(recortes)

if __name__ == '__main__':
    run()
