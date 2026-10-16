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

def auditar(url, rotulo, browser_type="edge"):
    script_dir = os.path.dirname(os.path.abspath(__file__))
    if os.path.basename(os.path.abspath(os.path.join(script_dir, '..'))) == 'scripts':
        site_dir = os.path.abspath(os.path.join(script_dir, '../..'))
    else:
        site_dir = os.path.abspath(os.path.join(script_dir, '..'))
        
    out_dir = os.path.join(site_dir, 'screenshots/qa', rotulo)
    os.makedirs(out_dir, exist_ok=True)
    
    browser_display = "WebKit (Safari Engine)" if browser_type == "webkit" else "Microsoft Edge (Chromium)"
    
    print(f"==================================================")
    print(f"AUDITORIA QA THE POKE — URL: {url}")
    print(f"Navegador: {browser_display}")
    print(f"Rotulo: {rotulo} | Saida: {out_dir}")
    print(f"==================================================\n")
    
    relatorio = {
        "url": url,
        "rotulo": rotulo,
        "browser": browser_display,
        "browser_type": browser_type,
        "timestamp": time.strftime("%Y-%m-%d %H:%M:%S"),
        "viewports": {}
    }
    
    with sync_playwright() as p:
        if browser_type == "webkit":
            browser = p.webkit.launch(headless=True)
        else:
            browser = p.chromium.launch(channel="msedge", headless=True)
        
        for vp in VIEWPORTS:
            w = vp["width"]
            h = vp["height"]
            label = vp["label"]
            is_mobile = vp["is_mobile"]
            has_touch = vp["has_touch"]
            
            print(f"--- Auditando viewport {w}x{h} ({label}) [{browser_type}] ---")
            
            console_errors = []
            page_errors = []
            network_requests = []
            
            if browser_type == "webkit":
                ua = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1" if is_mobile else "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15"
            else:
                ua = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0"
                
            context = browser.new_context(
                viewport={"width": w, "height": h},
                is_mobile=is_mobile,
                has_touch=has_touch,
                user_agent=ua
            )
            
            context.add_init_script(INIT_SCRIPT)
            page = context.new_page()
            
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
            page.on("pageerror", lambda err: page_errors.append(str(err)))
            
            def on_response(response):
                try:
                    r_url = response.url
                    status = response.status
                    headers = response.headers
                    cl = headers.get("content-length")
                    size = int(cl) if cl and cl.isdigit() else 0
                    ctype = headers.get("content-type", "").lower()
                    
                    category = "other"
                    if "image" in ctype or any(r_url.endswith(ext) for ext in [".webp", ".png", ".jpg", ".jpeg", ".svg", ".ico"]):
                        category = "img"
                    elif "font" in ctype or any(r_url.endswith(ext) for ext in [".woff2", ".woff", ".ttf", ".otf"]):
                        category = "font"
                    elif "javascript" in ctype or r_url.endswith(".js"):
                        category = "script"
                    elif "css" in ctype or r_url.endswith(".css"):
                        category = "css"
                        
                    network_requests.append({
                        "url": r_url,
                        "status": status,
                        "category": category,
                        "size": size,
                        "type": ctype
                    })
                except Exception:
                    pass
                    
            page.on("response", on_response)
            
            page.goto(url, wait_until="networkidle", timeout=30000)
            page.wait_for_timeout(600)
            
            # Capture above-the-fold screenshot
            dobra_path = os.path.join(out_dir, f"dobra-{w}.png")
            page.screenshot(path=dobra_path)
            
            # Scroll down slowly and back up to trigger lazy-loads and animations
            total_height = page.evaluate("() => document.body.scrollHeight")
            curr_y = 0
            step = 300
            while curr_y < total_height:
                page.evaluate(f"window.scrollBy(0, {step})")
                curr_y += step
                page.wait_for_timeout(80)
                total_height = page.evaluate("() => document.body.scrollHeight")
                
            page.evaluate("() => window.scrollTo(0, 0)")
            page.wait_for_timeout(400)
            
            metrics = page.evaluate("""() => {
                const docWidth = window.innerWidth || document.documentElement.clientWidth;
                const docScrollWidth = Math.max(document.documentElement.scrollWidth, document.body ? document.body.scrollWidth : 0);
                const hasDocScroll = docScrollWidth > docWidth + 1;
                
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
                            ? curr.className.trim().split(/\\s+/).filter(c => !c.includes(':') && !c.includes('/') && !c.includes('[') && !c.includes('!') && c.length < 25).slice(0, 2).join('.')
                            : '';
                        let part = tag + (cls ? '.' + cls : '') + (nth > 1 ? `:nth-of-type(${nth})` : '');
                        parts.unshift(part);
                        curr = curr.parentElement;
                        if (parts.length >= 4) break;
                    }
                    return parts.join(' > ');
                }

                function hasClippingAncestor(el) {
                    let curr = el.parentElement;
                    while (curr && curr !== document.documentElement && curr !== document.body) {
                        const style = window.getComputedStyle(curr);
                        const ox = style.overflowX;
                        const o = style.overflow;
                        if (['hidden', 'clip', 'auto', 'scroll'].includes(ox) || ['hidden', 'clip', 'auto', 'scroll'].includes(o)) {
                            return true;
                        }
                        curr = curr.parentElement;
                    }
                    return false;
                }

                // 1. Horizontal overflow — only count elements extending outside viewport WITHOUT a clipping ancestor
                const overflowing = [];
                document.querySelectorAll('*').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    const style = window.getComputedStyle(el);
                    if (style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0' && rect.height > 0 && rect.width > 0) {
                        if (rect.right > docWidth + 1 || rect.left < -1) {
                            if (!hasClippingAncestor(el)) {
                                overflowing.push({
                                    tag: el.tagName.toLowerCase(),
                                    id: el.id || null,
                                    selector: getSelector(el),
                                    classes: el.className ? String(el.className).slice(0, 80) : null,
                                    width: Math.round(rect.width),
                                    right: Math.round(rect.right),
                                    left: Math.round(rect.left),
                                    docWidth: docWidth
                                });
                            }
                        }
                    }
                });
                
                // 2. Small touch targets (< 44x44) — ignore sr-only and skip links
                const smallTargets = [];
                document.querySelectorAll('button, a, input, select, textarea, [role="button"]').forEach(el => {
                    if (el.classList && el.classList.contains('sr-only')) return;
                    if (el.closest('.sr-only')) return;
                    const label = el.getAttribute('aria-label') || el.innerText || el.getAttribute('placeholder') || el.getAttribute('title') || '';
                    if (label.toLowerCase().includes('pular para o cardápio') || label.toLowerCase().includes('pular para')) return;

                    const rect = el.getBoundingClientRect();
                    const style = window.getComputedStyle(el);
                    if (style.display === 'none' || style.visibility === 'hidden' || style.opacity === '0' || rect.width === 0 || rect.height === 0) {
                        return;
                    }
                    if (rect.width <= 1 && rect.height <= 1) return;

                    if (rect.width < 43.5 || rect.height < 43.5) {
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
                let lcp = window.__qa_lcp || 0;
                if (!lcp && window.performance) {
                    const paintEntries = performance.getEntriesByType('paint');
                    for (const pe of paintEntries) {
                        if (pe.name === 'first-contentful-paint') {
                            lcp = Math.round(pe.startTime);
                        }
                    }
                }
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
                    docWidth,
                    docScrollWidth,
                    hasDocScroll,
                    overflowing,
                    smallTargets,
                    imageIssues,
                    lcp,
                    cls,
                    longTasks,
                    fonts
                };
            }""")
            
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
                "doc_scroll_width": metrics["docScrollWidth"],
                "has_doc_scroll": metrics["hasDocScroll"],
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
            print(f"  Console Errors: {len(console_errors)} | ScrollWidth: {metrics['docScrollWidth']}/{w} (Scroll: {metrics['hasDocScroll']}) | Overflow elements: {len(metrics['overflowing'])} | Alvos < 44px: {len(metrics['smallTargets'])}")
            print(f"  LCP: {metrics['lcp']} ms | CLS: {metrics['cls']} | Long Tasks: {len(metrics['longTasks'])} | Total: {vp_data['bytes_transferred']['total_kb']} KB\n")
            
        browser.close()
        
    json_path = os.path.join(out_dir, "relatorio.json")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(relatorio, f, indent=2, ensure_ascii=False)
        
    md_path = os.path.join(out_dir, "relatorio.md")
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(f"# Relatório de Auditoria QA — {rotulo.upper()} ({browser_display})\n\n")
        f.write(f"- **URL auditada:** `{url}`\n")
        f.write(f"- **Data/Hora:** {relatorio['timestamp']}\n")
        f.write(f"- **Canal do Navegador:** {browser_display}\n\n")
        
        f.write("## 1. Tabela Comparativa por Largura\n\n")
        f.write("| Largura | Console Erros | Doc Scrollbar? | Overflow Elementos | Alvos < 44px | Img Problemas | LCP (ms) | CLS | Long Tasks (>50ms) | Transferência (KB) |\n")
        f.write("|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|\n")
        for vp in VIEWPORTS:
            w_str = str(vp["width"])
            d = relatorio["viewports"].get(w_str, {})
            scroll_status = "SIM" if d.get('has_doc_scroll') else "NÃO"
            f.write(f"| **{w_str}px** | {len(d.get('console_errors', []))} | {scroll_status} | {d.get('overflow_count', 0)} | {d.get('small_touch_targets_count', 0)} | {d.get('image_issues_count', 0)} | {d.get('lcp_ms', 0)} | {d.get('cls', 0)} | {d.get('long_tasks_count', 0)} | {d.get('bytes_transferred', {}).get('total_kb', 0)} KB |\n")
            
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
                f.write(f"**Elementos com Overflow Horizontal Não-Cortados ({d['overflow_count']}):**\n")
                for el in d["overflow_elements"]:
                    f.write(f"- `{el.get('selector', '')}` — width: {el['width']}px, right: {el['right']}px (tela: {el['docWidth']}px)\n")
                f.write("\n")
            else:
                f.write(f"- **Overflow horizontal:** Nenhum elemento extrapolando a tela sem corte (document scrollWidth: {d.get('doc_scroll_width')}px)\n")
                
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
            f.write("|:---|:---:|:---:|\n")
            for font in fonts:
                f.write(f"| {font.get('family', '')} | {font.get('status', '')} | {font.get('weight', '')} | {font.get('style', '')} |\n")
        f.write("\n")

    print(f"\n[OK] Auditoria ({browser_display}) concluida com sucesso!")
    print(f"Relatorios gerados:")
    print(f"  - {json_path}")
    print(f"  - {md_path}")
    return relatorio

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Uso: python scripts/qa/auditar.py <url> <rotulo> [edge|webkit|both]")
        sys.exit(1)
    url_arg = sys.argv[1]
    rotulo_arg = sys.argv[2]
    browser_arg = sys.argv[3].lower() if len(sys.argv) > 3 else "edge"
    
    if browser_arg == "both":
        print("Iniciando auditoria dupla: Edge + WebKit...")
        auditar(url_arg, rotulo_arg, "edge")
        auditar(url_arg, f"{rotulo_arg}-webkit", "webkit")
    else:
        auditar(url_arg, rotulo_arg, browser_arg)
