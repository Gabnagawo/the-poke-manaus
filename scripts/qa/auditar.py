#!/usr/bin/env python3
import sys
import os
import json
import time
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

VIEWPORTS = [
    {"width": 360, "height": 740, "is_mobile": True, "has_touch": True, "label": "mobile-360"},
    {"width": 390, "height": 844, "is_mobile": True, "has_touch": True, "label": "mobile-390"},
    {"width": 430, "height": 932, "is_mobile": True, "has_touch": True, "label": "mobile-430"},
    {"width": 768, "height": 1024, "is_mobile": False, "has_touch": False, "label": "tablet-768"},
    {"width": 1024, "height": 768, "is_mobile": False, "has_touch": False, "label": "desktop-1024"},
    {"width": 1440, "height": 900, "is_mobile": False, "has_touch": False, "label": "desktop-1440"},
]

INIT_SCRIPT = """
window.__qa_lcp = 0;
window.__qa_cls = 0;
window.__qa_long_tasks = [];

try {
  new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    if (entries.length > 0) {
      const lastEntry = entries[entries.length - 1];
      window.__qa_lcp = Math.round(lastEntry.renderTime || lastEntry.loadTime || lastEntry.startTime);
    }
  }).observe({ type: 'largest-contentful-paint', buffered: true });
} catch (e) {}

try {
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (!entry.hadRecentInput) {
        window.__qa_cls += entry.value;
      }
    }
  }).observe({ type: 'layout-shift', buffered: true });
} catch (e) {}

try {
  new PerformanceObserver((entryList) => {
    for (const entry of entryList.getEntries()) {
      if (entry.duration > 50) {
        window.__qa_long_tasks.push({
          duration: Math.round(entry.duration),
          startTime: Math.round(entry.startTime),
          name: entry.name
        });
      }
    }
  }).observe({ type: 'longtask', buffered: true });
} catch (e) {}
"""

def auditar(url, rotulo):
    # Set output dir relative to the script location
    script_dir = os.path.dirname(os.path.abspath(__file__))
    # site dir is two levels up or one level up
    if os.path.basename(os.path.abspath(os.path.join(script_dir, '..'))) == 'scripts':
        site_dir = os.path.abspath(os.path.join(script_dir, '../..'))
    else:
        site_dir = os.path.abspath(os.path.join(script_dir, '..'))
        
    out_dir = os.path.join(site_dir, 'screenshots/qa', rotulo)
    os.makedirs(out_dir, exist_ok=True)
    
    print(f"==================================================")
    print(f"AUDITORIA QA THE POKE — URL: {url}")
    print(f"Rotulo: {rotulo} | Saida: {out_dir}")
    print(f"==================================================\n")
    
    relatorio = {
        "url": url,
        "rotulo": rotulo,
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "viewports": {}
    }
    
    with sync_playwright() as p:
        # Launch Microsoft Edge
        browser = p.chromium.launch(channel="msedge", headless=True)
        
        for vp in VIEWPORTS:
            w = vp["width"]
            h = vp["height"]
            label = vp["label"]
            is_mobile = vp["is_mobile"]
            has_touch = vp["has_touch"]
            
            print(f"--- Auditando viewport {w}x{h} ({label}) ---")
            
            console_errors = []
            page_errors = []
            network_requests = []
            
            context = browser.new_context(
                viewport={"width": w, "height": h},
                is_mobile=is_mobile,
                has_touch=has_touch,
                user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"
            )
            
            # Inject performance observers
            context.add_init_script(INIT_SCRIPT)
            page = context.new_page()
            
            # Listeners
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
            page.on("pageerror", lambda err: page_errors.append(str(err)))
            
            def on_response(response):
                try:
                    url = response.url
                    status = response.status
                    headers = response.headers
                    cl = headers.get("content-length")
                    size = int(cl) if cl and cl.isdigit() else 0
                    ctype = headers.get("content-type", "").lower()
                    
                    category = "other"
                    if "image" in ctype or any(url.endswith(ext) for ext in [".webp", ".png", ".jpg", ".jpeg", ".svg", ".ico"]):
                        category = "img"
                    elif "font" in ctype or any(url.endswith(ext) for ext in [".woff2", ".woff", ".ttf", ".otf"]):
                        category = "font"
                    elif "javascript" in ctype or url.endswith(".js"):
                        category = "script"
                    elif "css" in ctype or url.endswith(".css"):
                        category = "css"
                        
                    network_requests.append({
                        "url": url,
                        "status": status,
                        "category": category,
                        "size": size,
                        "type": ctype
                    })
                except Exception:
                    pass
                    
            page.on("response", on_response)
            
            # Navigate
            t0 = time.time()
            page.goto(url, wait_until="networkidle", timeout=30000)
            page.wait_for_timeout(500)
            
            # Capture above-the-fold screenshot
            dobra_path = os.path.join(out_dir, f"dobra-{w}.png")
            page.screenshot(path=dobra_path)
            
            # Scroll down slowly and back up
            total_height = page.evaluate("() => document.body.scrollHeight")
            curr_y = 0
            step = 300
            while curr_y < total_height:
                page.mouse.wheel(0, step)
                curr_y += step
                page.wait_for_timeout(100)
                total_height = page.evaluate("() => document.body.scrollHeight")
                
            # Scroll back to top
            page.mouse.wheel(0, -total_height)
            page.evaluate("() => window.scrollTo(0, 0)")
            page.wait_for_timeout(400)
            
            # Collect metrics
            metrics = page.evaluate("""() => {
                const docWidth = document.documentElement.clientWidth;
                
                function getSelector(el) {
                    if (!el || el.nodeType !== 1) return '';
                    if (el.id) return '#' + el.id;
                    const parts = [];
                    let curr = el;
                    while (curr && curr.nodeType === 1 && curr.tagName.toLowerCase() !== 'html') {
                        let tag = curr.tagName.toLowerCase();
                        if (curr.id) {
                            parts.unshift('#' + curr.id);
                            break;
                        }
                        let sibling = curr;
                        let nth = 1;
                        while ((sibling = sibling.previousElementSibling)) {
                            if (sibling.tagName.toLowerCase() === tag) nth++;
                        }
                        let cls = curr.className && typeof curr.className === 'string'
                            ? curr.className.trim().split(/\s+/).filter(c => !c.includes(':') && !c.includes('/') && !c.includes('[') && !c.includes('!') && c.length < 25).slice(0, 2).join('.')
                            : '';
                        let part = tag + (cls ? '.' + cls : '') + (nth > 1 ? `:nth-of-type(${nth})` : '');
                        parts.unshift(part);
                        curr = curr.parentElement;
                        if (parts.length >= 4) break;
                    }
                    return parts.join(' > ');
                }

                // 1. Horizontal overflow
                const overflowing = [];
                document.querySelectorAll('*').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const style = window.getComputedStyle(el);
                    if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0' && rect.height > 0) {
                        if (rect.right > docWidth + 1 || rect.width > docWidth + 1) {
                            overflowing.push({
                                tag: el.tagName.toLowerCase(),
                                id: el.id || null,
                                selector: getSelector(el),
                                classes: el.className ? String(el.className).slice(0, 80) : null,
                                width: Math.round(rect.width),
                                right: Math.round(rect.right),
                                docWidth: docWidth
                            });
                        }
                    }
                });
                
                // 2. Small touch targets (< 44x44)
                const smallTargets = [];
                document.querySelectorAll('button, a, input, select, textarea, [role="button"]').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const style = window.getComputedStyle(el);
                    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0' || rect.width === 0 || rect.height === 0) {
                        return;
                    }
                    if (rect.width < 43.5 || rect.height < 43.5) {
                        const label = el.getAttribute('aria-label') || el.innerText || el.getAttribute('placeholder') || el.getAttribute('title') || '';
                        smallTargets.push({
                            tag: el.tagName.toLowerCase(),
                            text: label.trim().slice(0, 50),
                            selector: getSelector(el),
                            width: Math.round(rect.width * 10) / 10,
                            height: Math.round(rect.height * 10) / 10,
                            classes: el.className ? String(el.className).slice(0, 60) : ''
                        });
                    }
                });
                
                // 3. Images audit
                const imageIssues = [];
                document.querySelectorAll('img').forEach(img => {
                    const rect = img.getBoundingClientRect();
                    const style = window.getComputedStyle(img);
                    if (style.display === 'none' || style.visibility === 'hidden') return;
                    
                    const missingAlt = !img.hasAttribute('alt');
                    const missingDimensions = !img.hasAttribute('width') && !img.hasAttribute('height');
                    const displayedWidth = rect.width;
                    const naturalWidth = img.naturalWidth;
                    const tooHeavy = (displayedWidth > 0 && naturalWidth > 2.5 * displayedWidth);
                    
                    if (missingAlt || missingDimensions || tooHeavy) {
                        imageIssues.push({
                            src: img.currentSrc || img.src || '',
                            selector: getSelector(img),
                            alt: img.getAttribute('alt') || null,
                            missingAlt: missingAlt,
                            missingDimensions: missingDimensions,
                            tooHeavy: tooHeavy,
                            naturalWidth: naturalWidth,
                            displayedWidth: Math.round(displayedWidth),
                            ratio: displayedWidth > 0 ? (naturalWidth / displayedWidth).toFixed(2) : null
                        });
                    }
                });
                
                // 4. Performance Observers
                const lcp = window.__qa_lcp || 0;
                const cls = Math.round((window.__qa_cls || 0) * 1000) / 1000;
                const longTasks = window.__qa_long_tasks || [];
                
                // 5. Loaded fonts
                const fonts = [];
                if (document.fonts) {
                    document.fonts.forEach(f => {
                        fonts.push({
                            family: f.family,
                            status: f.status,
                            weight: f.weight,
                            style: f.style
                        });
                    });
                }
                
                return {
                    overflowing,
                    smallTargets,
                    imageIssues,
                    lcp,
                    cls,
                    longTasks,
                    fonts
                };
            }""")
            
            # Aggregate network bytes
            bytes_by_type = {"img": 0, "font": 0, "script": 0, "css": 0, "other": 0}
            for req in network_requests:
                cat = req["category"]
                bytes_by_type[cat] = bytes_by_type.get(cat, 0) + req["size"]
                
            sorted_requests = sorted(network_requests, key=lambda x: x["size"], reverse=True)
            top_10_files = [{
                "url": r["url"].split("/")[-1].split("?")[0] or r["url"],
                "full_url": r["url"],
                "size_kb": round(r["size"] / 1024, 1),
                "type": r["category"]
            } for r in sorted_requests[:10] if r["size"] > 0]
            
            vp_data = {
                "width": w,
                "height": h,
                "is_mobile": is_mobile,
                "console_errors": console_errors,
                "page_errors": page_errors,
                "overflow_count": len(metrics["overflowing"]),
                "overflow_elements": metrics["overflowing"],
                "small_touch_targets_count": len(metrics["smallTargets"]),
                "small_touch_targets": metrics["smallTargets"],
                "image_issues_count": len(metrics["imageIssues"]),
                "image_issues": metrics["imageIssues"],
                "bytes_transferred": {
                    "total_kb": round(sum(bytes_by_type.values()) / 1024, 1),
                    "img_kb": round(bytes_by_type["img"] / 1024, 1),
                    "font_kb": round(bytes_by_type["font"] / 1024, 1),
                    "script_kb": round(bytes_by_type["script"] / 1024, 1),
                    "css_kb": round(bytes_by_type["css"] / 1024, 1),
                    "other_kb": round(bytes_by_type["other"] / 1024, 1),
                },
                "top_10_files": top_10_files,
                "lcp_ms": metrics["lcp"],
                "cls": metrics["cls"],
                "long_tasks_count": len(metrics["longTasks"]),
                "long_tasks": metrics["longTasks"],
                "fonts": metrics["fonts"]
            }
            
            relatorio["viewports"][str(w)] = vp_data
            context.close()
            
            print(f"  [OK] Dobra capturada: dobra-{w}.png")
            print(f"  Console Errors: {len(console_errors)} | Overflow: {len(metrics['overflowing'])} | Alvos < 44px: {len(metrics['smallTargets'])}")
            print(f"  LCP: {metrics['lcp']} ms | CLS: {metrics['cls']} | Long Tasks: {len(metrics['longTasks'])} | Total: {vp_data['bytes_transferred']['total_kb']} KB\n")
            
        browser.close()
        
    # Write relatorio.json
    json_path = os.path.join(out_dir, "relatorio.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(relatorio, f, indent=2, ensure_ascii=False)
        
    # Write relatorio.md
    md_path = os.path.join(out_dir, "relatorio.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(f"# Relatório de Auditoria QA — {rotulo.upper()}\n\n")
        f.write(f"- **URL auditada:** `{url}`\n")
        f.write(f"- **Data/Hora:** {relatorio['timestamp']}\n")
        f.write(f"- **Canal do Navegador:** Microsoft Edge (Chromium)\n\n")
        
        f.write("## 1. Tabela Comparativa por Largura\n\n")
        f.write("| Largura | Console Erros | Overflow | Alvos < 44px | Img Problemas | LCP (ms) | CLS | Long Tasks (>50ms) | Transferência (KB) |\n")
        f.write("|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|\n")
        for vp in VIEWPORTS:
            w_str = str(vp["width"])
            d = relatorio["viewports"].get(w_str, {})
            f.write(f"| **{w_str}px** | {len(d.get('console_errors', []))} | {d.get('overflow_count', 0)} | {d.get('small_touch_targets_count', 0)} | {d.get('image_issues_count', 0)} | {d.get('lcp_ms', 0)} | {d.get('cls', 0)} | {d.get('long_tasks_count', 0)} | {d.get('bytes_transferred', {}).get('total_kb', 0)} KB |\n")
            
        f.write("\n## 2. Detalhamento de Problemas por Largura\n\n")
        for vp in VIEWPORTS:
            w_str = str(vp["width"])
            d = relatorio["viewports"].get(w_str, {})
            f.write(f"### Viewport {w_str}px ({vp['label']})\n\n")
            
            if d.get("console_errors"):
                f.write("**Erros de Console:**\n")
                for err in d["console_errors"]:
                    f.write(f"- `{err}`\n")
                f.write("\n")
            else:
                f.write("- **Erros de console:** 0\n")
                
            if d.get("overflow_count", 0) > 0:
                f.write(f"**Elementos com Overflow Horizontal ({d['overflow_count']}):**\n")
                for el in d["overflow_elements"]:
                    f.write(f"- `{el.get('selector', '')}` — width: {el['width']}px, right: {el['right']}px (tela: {el['docWidth']}px)\n")
                f.write("\n")
            else:
                f.write("- **Overflow horizontal:** Nenhum elemento extrapolando a tela\n")
                
            if d.get("small_touch_targets_count", 0) > 0:
                f.write(f"**Alvos de Toque Menores que 44×44px ({d['small_touch_targets_count']}):**\n")
                for t in d["small_touch_targets"]:
                    f.write(f"- `{t.get('selector', '')}` (texto: \"{t['text']}\") — {t['width']}×{t['height']}px\n")
                f.write("\n")
            else:
                f.write("- **Alvos de toque:** Todos os elementos interativos possuem pelo menos 44×44px\n")
                
            if d.get("image_issues_count", 0) > 0:
                f.write(f"**Problemas de Imagem ({d['image_issues_count']}):**\n")
                for img in d["image_issues"]:
                    issues = []
                    if img.get("missingAlt"): issues.append("sem alt")
                    if img.get("missingDimensions"): issues.append("sem width/height")
                    if img.get("tooHeavy"): issues.append(f"pesada demais (natural: {img['naturalWidth']}px vs exibida: {img['displayedWidth']}px, ratio {img['ratio']}x)")
                    src_short = img['src'].split('/')[-1]
                    f.write(f"- `{src_short}` (seletor: `{img.get('selector', '')}`): {', '.join(issues)}\n")
                f.write("\n")
            else:
                f.write("- **Imagens:** Todas com alt, dimensões e tamanho adequado\n")
                
            bytes_info = d.get("bytes_transferred", {})
            f.write(f"- **Transferência:** Total: {bytes_info.get('total_kb')} KB (Imagens: {bytes_info.get('img_kb')} KB, Scripts: {bytes_info.get('script_kb')} KB, Fontes: {bytes_info.get('font_kb')} KB, CSS: {bytes_info.get('css_kb')} KB)\n\n")

        f.write("## 3. Maiores Arquivos Transferidos (Top 10)\n\n")
        # Use top 10 from desktop 1440
        top_10 = relatorio["viewports"].get("1440", {}).get("top_10_files", [])
        if top_10:
            f.write("| Arquivo | Categoria | Tamanho (KB) |\n")
            f.write("|:---|:---:|:---:|\n")
            for f_item in top_10:
                f.write(f"| `{f_item['url']}` | {f_item['type']} | {f_item['size_kb']} KB |\n")
        f.write("\n")
        
        f.write("## 4. Fontes Carregadas\n\n")
        fonts = relatorio["viewports"].get("1440", {}).get("fonts", [])
        if fonts:
            f.write("| Família | Status | Peso | Estilo |\n")
            f.write("|:---|:---:|:---:|:---:|\n")
            for font in fonts:
                f.write(f"| {font.get('family', '')} | {font.get('status', '')} | {font.get('weight', '')} | {font.get('style', '')} |\n")
        f.write("\n")

    print(f"\n[OK] Auditoria concluida com sucesso!")
    print(f"Relatorios gerados:")
    print(f"  - {json_path}")
    print(f"  - {md_path}")
    return relatorio

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python scripts/qa/auditar.py <url> <rotulo>")
        sys.exit(1)
    url_arg = sys.argv[1]
    rotulo_arg = sys.argv[2]
    auditar(url_arg, rotulo_arg)
