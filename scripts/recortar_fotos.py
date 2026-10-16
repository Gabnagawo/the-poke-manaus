import os
import glob
import numpy as np
from PIL import Image, ImageDraw, ImageFilter

def cutout_light_bg(img_path, thresh=34, blur_radius=1.2):
    im = Image.open(img_path).convert('RGB')
    w, h = im.size
    filled = im.copy()
    
    # Border points to seed floodfill
    for x in range(0, w, 5):
        for y in [0, h - 1]:
            ImageDraw.floodfill(filled, (x, y), (255, 0, 255), thresh=thresh)
    for y in range(0, h, 5):
        for x in [0, w - 1]:
            ImageDraw.floodfill(filled, (x, y), (255, 0, 255), thresh=thresh)
            
    arr_filled = np.array(filled)
    is_bg = (arr_filled[:, :, 0] == 255) & (arr_filled[:, :, 1] == 0) & (arr_filled[:, :, 2] == 255)
    
    # Invert to get foreground mask
    fg_mask = ~is_bg
    
    # Remove isolated specks outside main subject by keeping only large connected components
    # Using simple morphological cleaning
    alpha = np.where(fg_mask, 255, 0).astype(np.uint8)
    alpha_img = Image.fromarray(alpha, mode='L')
    
    # Smooth edge with 1-2px blur
    alpha_smooth = alpha_img.filter(ImageFilter.GaussianBlur(radius=blur_radius))
    
    rgba = im.convert('RGBA')
    rgba.putalpha(alpha_smooth)
    return rgba

print("Helper ready")
