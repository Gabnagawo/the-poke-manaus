import os
import sys
import time
import urllib.parse
from playwright.sync_api import sync_playwright

output_dir = r"C:\Users\gabri\OneDrive\Documentos\Projetos - Gabriel Nagawo\the-poke\site\screenshots\v1"
os.makedirs(output_dir, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(channel="msedge", headless=True)
    
    viewports = [
        ("desktop-1440.png", 1440, 900),
        ("tablet-768.png", 768, 1024),
        ("mobile-430.png", 430, 932),
        ("mobile-390.png", 390, 844),
        ("mobile-360.png", 360, 800),
    ]
    
    print("--- 1. VALIDANDO VIEWPORTS E RESPONSIVIDADE ---", flush=True)
    for filename, width, height in viewports:
        page = browser.new_page(viewport={"width": width, "height": height})
        console_errors = []
        page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)
        
        page.goto("http://localhost:3005", wait_until="networkidle")
        
        # Scroll to bottom and back so all images load
        page.evaluate("""async () => {
            await new Promise((resolve) => {
                let totalHeight = 0;
                const distance = 400;
                const timer = setInterval(() => {
                    const scrollHeight = document.body.scrollHeight;
                    window.scrollBy(0, distance);
                    totalHeight += distance;
                    if(totalHeight >= scrollHeight){
                        clearInterval(timer);
                        window.scrollTo(0, 0);
                        resolve();
                    }
                }, 80);
            });
        }""")
        time.sleep(1.2)
        
        overflow = page.evaluate("() => document.documentElement.scrollWidth > document.documentElement.clientWidth")
        broken_imgs = page.evaluate("""() => {
            return Array.from(document.querySelectorAll('img'))
                .filter(img => img.complete && img.naturalWidth === 0)
                .map(img => img.src);
        }""")
        
        filepath = os.path.join(output_dir, filename)
        page.screenshot(path=filepath, full_page=True)
        print(f"{filename}: Largura={width}px, RolagemLateral={overflow}, ErrosConsole={len(console_errors)}, ImagensQuebradas={len(broken_imgs)}", flush=True)
        if console_errors:
            print(f"  Erros em {filename}:", console_errors, flush=True)
        if broken_imgs:
            print(f"  Imagens quebradas em {filename}:", broken_imgs, flush=True)
        page.close()
        
    print("\n--- 2. TESTANDO FLUXO COMPLETO DE PEDIDO ---", flush=True)
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    page.goto("http://localhost:3005", wait_until="networkidle")
    
    # 1. Clicar em 'MONTE SEU POKE' no hero
    btn_monte = page.locator("section >> button:has-text('MONTE SEU POKE')").first
    btn_monte.click()
    time.sleep(0.6)
    page.screenshot(path=os.path.join(output_dir, "fluxo-01-montagem-modal.png"))
    print("Captura salva: fluxo-01-montagem-modal.png", flush=True)
    
    # Preencher observação do Poke Médio
    modal = page.locator("div[role='dialog']")
    modal.locator("input[placeholder*='Molho']").fill("Bastante gergelim e molho tare a parte")
    time.sleep(0.3)
    
    # Adicionar à sacola
    modal.locator("button:has-text('ADICIONAR')").click()
    time.sleep(0.6)
    
    # Carrinho abre automaticamente. Fechar painel do carrinho para adicionar suco
    page.locator("button[aria-label='Fechar painel do carrinho']").click()
    time.sleep(0.4)
    
    # Mudar para categoria Sucos Especiais
    page.locator("button:has-text('SUCOS ESPECIAIS')").click()
    time.sleep(0.5)
    
    # Adicionar suco Anti-Ox
    anti_ox_btn = page.locator("div:has-text('Anti-Ox') >> button:has-text('ADICIONAR')").first
    anti_ox_btn.click()
    time.sleep(0.6)
    
    # Abrir carrinho pelo botão do header
    page.locator("header >> button.btn-limon").click()
    time.sleep(0.6)
    page.screenshot(path=os.path.join(output_dir, "fluxo-02-carrinho.png"))
    print("Captura salva: fluxo-02-carrinho.png", flush=True)
    
    # Avançar para checkout
    page.locator("button:has-text('AVANÇAR PARA DADOS DE ENTREGA')").click()
    time.sleep(0.5)
    
    # Preencher dados do formulário
    page.locator("input[placeholder*='Como podemos te chamar']").fill("Gabriel Nagawo")
    page.locator("button:has-text('Entrega em Manaus')").click()
    time.sleep(0.3)
    page.locator("input[placeholder*='Av. Ephigênio Salles']").fill("Av. Ephigênio Salles, 1200")
    page.locator("input[placeholder*='Aleixo']").fill("Aleixo")
    page.locator("input[placeholder*='Apto']").fill("Apto 402")
    page.locator("textarea[placeholder*='restrição']").fill("Caprichar no gergelim, por favor!")
    time.sleep(0.3)
    
    page.screenshot(path=os.path.join(output_dir, "fluxo-03-checkout.png"))
    print("Captura salva: fluxo-03-checkout.png", flush=True)
    
    # Clicar em finalizar via WhatsApp
    with page.expect_popup() as popup_info:
        page.locator("button:has-text('ENVIAR PEDIDO VIA WHATSAPP')").click()
    popup = popup_info.value
    popup_url = popup.url
    print("URL do WhatsApp gerada:", popup_url, flush=True)
    
    parsed = urllib.parse.urlparse(popup_url)
    params = urllib.parse.parse_qs(parsed.query)
    msg_text = params.get("text", [""])[0]
    
    msg_file = os.path.join(output_dir, "mensagem-whatsapp.txt")
    with open(msg_file, "w", encoding="utf-8") as f:
        f.write(msg_text)
    print("Mensagem salva em:", msg_file, flush=True)
    print("\n================ MENSAGEM WHATSAPP GERADA ================\n" + msg_text + "\n===========================================================", flush=True)
    
    # 3. Páginas Legais e 404
    print("\n--- 3. VALIDANDO PÁGINAS LEGAIS E 404 ---", flush=True)
    page.goto("http://localhost:3005/privacidade", wait_until="networkidle")
    page.screenshot(path=os.path.join(output_dir, "privacidade-1440.png"), full_page=True)
    print("Captura salva: privacidade-1440.png", flush=True)
    
    page.goto("http://localhost:3005/termos", wait_until="networkidle")
    page.screenshot(path=os.path.join(output_dir, "termos-1440.png"), full_page=True)
    print("Captura salva: termos-1440.png", flush=True)
    
    page.goto("http://localhost:3005/pagina-inexistente", wait_until="networkidle")
    page.screenshot(path=os.path.join(output_dir, "404-1440.png"), full_page=True)
    print("Captura salva: 404-1440.png", flush=True)
    
    browser.close()

print("\nTODOS OS TESTES E CAPTURAS FINALIZADOS COM SUCESSO!", flush=True)
