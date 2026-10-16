import asyncio
import os
import urllib.parse
from playwright.async_api import async_playwright

BASE_URL = "http://localhost:3005"
SCREENSHOTS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../screenshots/v3"))
os.makedirs(SCREENSHOTS_DIR, exist_ok=True)

VIEWPORTS = [
    {"name": "desktop-1440", "width": 1440, "height": 900},
    {"name": "tablet-768", "width": 768, "height": 1024},
    {"name": "mobile-430", "width": 430, "height": 932},
    {"name": "mobile-390", "width": 390, "height": 844},
    {"name": "mobile-360", "width": 360, "height": 800},
]

async def run_validation():
    async with async_playwright() as p:
        browser = await p.chromium.launch(channel="msedge", headless=True)
        results = []

        print("=== 1. CAPTURANDO TELAS EM TODOS OS VIEWPORTS ===")
        for vp in VIEWPORTS:
            context = await browser.new_context(
                viewport={"width": vp["width"], "height": vp["height"]},
                device_scale_factor=2,
            )
            page = await context.new_page()

            console_errors = []
            page.on("console", lambda msg: console_errors.append(msg.text) if msg.type == "error" else None)

            await page.goto(BASE_URL, wait_until="networkidle")
            await page.wait_for_timeout(600)

            # Rola a página até o fim para carregar imagens e volta ao topo
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await page.wait_for_timeout(800)
            await page.evaluate("window.scrollTo(0, 0)")
            await page.wait_for_timeout(400)

            overflow = await page.evaluate("document.documentElement.scrollWidth > window.innerWidth")

            # Verifica apenas imagens visíveis na renderização para evitar falso-positivo de tags escondidas
            broken_images = await page.evaluate("""() => {
                const imgs = Array.from(document.querySelectorAll('img'));
                const visibleImgs = imgs.filter(img => img.offsetParent !== null || img.getClientRects().length > 0);
                return visibleImgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
            }""")

            dobra_path = os.path.join(SCREENSHOTS_DIR, f"{vp['name']}-dobra.png")
            await page.screenshot(path=dobra_path, full_page=False)

            full_path = os.path.join(SCREENSHOTS_DIR, f"{vp['name']}-full.png")
            await page.screenshot(path=full_path, full_page=True)

            results.append({
                "viewport": vp["name"],
                "width": vp["width"],
                "overflow": overflow,
                "broken_images": len(broken_images),
                "console_errors": len(console_errors),
            })

            print(f"[{vp['name']}] Overflow={overflow}, ConsoleErrors={len(console_errors)}, BrokenImgs={len(broken_images)}")
            if len(console_errors) > 0:
                print(f"  Erros de console: {console_errors}")
            if len(broken_images) > 0:
                print(f"  Imagens quebradas: {broken_images}")
            await context.close()

        # Captura Desktop Modal Montagem
        print("\n=== 2. CAPTURANDO MODAL DESKTOP ===")
        ctx_desk = await browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        page_desk = await ctx_desk.new_page()
        await page_desk.goto(BASE_URL, wait_until="networkidle")
        btn_desk_monte = page_desk.locator("button:has-text('MONTE SEU POKE →')").first
        await btn_desk_monte.click()
        await page_desk.wait_for_timeout(500)
        await page_desk.screenshot(path=os.path.join(SCREENSHOTS_DIR, "modal-desktop.png"), full_page=False)
        print("Captured modal-desktop.png")
        await ctx_desk.close()

        # FLUXO COMPLETO NO CELULAR (390px)
        print("\n=== 3. FLUXO INTERATIVO NO CELULAR (390px) ===")
        context_mobile = await browser.new_context(
            viewport={"width": 390, "height": 844},
            device_scale_factor=2,
        )
        page = await context_mobile.new_page()

        # Intercepta window.open para capturar a mensagem gerada para o WhatsApp
        await page.add_init_script("""
            window.__lastWhatsappUrl = null;
            window.open = function(url) {
                window.__lastWhatsappUrl = url;
                return window;
            };
        """)

        await page.goto(BASE_URL, wait_until="networkidle")
        await page.wait_for_timeout(500)

        # Passo 1: Abrir a montagem
        btn_monte = page.locator("button:has-text('MONTE SEU POKE →')").first
        await btn_monte.click()
        await page.wait_for_timeout(400)
        await page.screenshot(path=os.path.join(SCREENSHOTS_DIR, "01-modal-aberto.png"))
        print("Passo 1: Modal aberto")

        # Passo 2: Escolher Tamanho M
        btn_m = page.locator("button:has-text('Poke Médio')").first
        await btn_m.click()
        await page.wait_for_timeout(300)
        await page.screenshot(path=os.path.join(SCREENSHOTS_DIR, "02-tamanho-m.png"))
        print("Passo 2: Tamanho M selecionado")

        # Passo 3: Preencher todas as etapas MENOS a base (para testar erro)
        # Proteínas (tamanho M requer 2 proteínas)
        btn_salmao = page.locator("button:has-text('Salmão Fresco')").first
        await btn_salmao.scroll_into_view_if_needed()
        await btn_salmao.click()

        btn_frango = page.locator("button:has-text('Frango Grelhado')").first
        await btn_frango.scroll_into_view_if_needed()
        await btn_frango.click()

        # Molho: Molho Fit (+ R$ 3,50 extra)
        btn_molho = page.locator("button:has-text('Molho Fit')").first
        await btn_molho.scroll_into_view_if_needed()
        await btn_molho.click()

        # Acompanhamentos (até 5, selecionar manga, cenoura, milho)
        for acomp in ["Manga", "Cenoura", "Milho"]:
            btn_ac = page.locator(f"button:has-text('{acomp}')").first
            await btn_ac.scroll_into_view_if_needed()
            await btn_ac.click()

        # Crispys (selecionar Crispy de Couve)
        btn_crispy = page.locator("button:has-text('Crispy de Couve')").first
        await btn_crispy.scroll_into_view_if_needed()
        await btn_crispy.click()

        # Talher (Hashi)
        btn_hashi = page.locator("button:has-text('Hashi')").first
        await btn_hashi.scroll_into_view_if_needed()
        await btn_hashi.click()

        await page.wait_for_timeout(300)
        await page.screenshot(path=os.path.join(SCREENSHOTS_DIR, "03-preenchimento-sem-base.png"))
        print("Passo 3: Etapas preenchidas sem selecionar base")

        # Passo 4: Tentar adicionar sem a base -> Verificar Erro e rolagem para base
        btn_adicionar_modal = page.locator("button:has-text('ADICIONAR À SACOLA →')")
        await btn_adicionar_modal.click()
        await page.wait_for_selector("text=Escolha 1 base obrigatória", state="visible")
        await page.wait_for_timeout(1000)
        await page.screenshot(path=os.path.join(SCREENSHOTS_DIR, "04-erro-falta-base.png"))
        print("Passo 4: Validação de erro capturada (falta base)")

        # Passo 5: Selecionar a base obrigatória (Arroz Japonês)
        btn_base = page.locator("button:has-text('Arroz Japonês')").first
        await btn_base.click()
        await page.wait_for_timeout(300)
        await page.screenshot(path=os.path.join(SCREENSHOTS_DIR, "05-base-selecionada.png"))
        print("Passo 5: Base selecionada")

        # Passo 6: Adicionar à sacola
        await btn_adicionar_modal.click()
        await page.wait_for_timeout(600)
        await page.screenshot(path=os.path.join(SCREENSHOTS_DIR, "06-adicionado-carrinho.png"))
        print("Passo 6: Poke adicionado com sucesso (modal fechado, barra fixa atualizada)")

        # Passo 7: Rolar até o cardápio compacto e adicionar 1 suco
        btn_aba_sucos = page.locator("button:has-text('Sucos Especiais')").first
        await btn_aba_sucos.scroll_into_view_if_needed()
        await btn_aba_sucos.click()
        await page.wait_for_timeout(400)

        # Clicar no botão '+' visível do primeiro suco na linha compacta
        btn_add_suco = page.locator("button[aria-label*='Adicionar']:visible").first
        await btn_add_suco.scroll_into_view_if_needed()
        await btn_add_suco.click()
        await page.wait_for_timeout(400)
        await page.screenshot(path=os.path.join(SCREENSHOTS_DIR, "07-adicionar-suco.png"))
        print("Passo 7: Suco adicionado pelo cardápio compacto")

        # Passo 8: Abrir o Carrinho
        btn_ver_carrinho = page.locator("button:has-text('VER CARRINHO')").first
        await btn_ver_carrinho.click()
        await page.wait_for_timeout(500)
        await page.screenshot(path=os.path.join(SCREENSHOTS_DIR, "08-carrinho-aberto.png"))
        print("Passo 8: Carrinho aberto com poke customizado e suco")

        # Passo 9: Avançar para dados de entrega e preencher formulário
        btn_avancar = page.locator("button:has-text('AVANÇAR PARA DADOS DE ENTREGA →')")
        await btn_avancar.click()
        await page.wait_for_timeout(400)

        # Preencher nome do cliente
        await page.locator("input[placeholder*='Como podemos te chamar?']").fill("Gabriel Nagawo")

        # Selecionar Entrega em Manaus
        btn_entrega = page.locator("button:has-text('Entrega em Manaus')").first
        await btn_entrega.click()
        await page.wait_for_timeout(300)

        # Preencher endereço de entrega
        await page.locator("input[placeholder*='Ex: Av. Ephigênio Salles']").fill("Av. Ephigênio Salles, 1250 - Park Mall Ephigênio")
        await page.locator("input[placeholder*='Ex: Aleixo, Adrianópolis']").fill("Aleixo")

        # Selecionar Pix
        btn_pix = page.locator("button:has-text('Pix')").first
        await btn_pix.click()

        await page.wait_for_timeout(300)
        await page.screenshot(path=os.path.join(SCREENSHOTS_DIR, "09-carrinho-checkout.png"))
        print("Passo 9: Checkout preenchido")

        # Passo 10: Enviar pedido via WhatsApp
        btn_enviar_wpp = page.locator("button:has-text('ENVIAR PEDIDO VIA WHATSAPP →')")
        await btn_enviar_wpp.click()
        await page.wait_for_timeout(800)

        # Recupera URL gerada para o WhatsApp
        whatsapp_url = await page.evaluate("window.__lastWhatsappUrl")
        print(f"URL WhatsApp capturada: {whatsapp_url}")

        if whatsapp_url:
            parsed = urllib.parse.urlparse(whatsapp_url)
            qs = urllib.parse.parse_qs(parsed.query)
            mensagem_raw = qs.get("text", [""])[0]
            
            wpp_file_path = os.path.join(SCREENSHOTS_DIR, "mensagem-whatsapp.txt")
            with open(wpp_file_path, "w", encoding="utf-8") as f:
                f.write(mensagem_raw)
            print(f"Mensagem salva em: {wpp_file_path}")
            print("\n--- CONTEÚDO DA MENSAGEM WHATSAPP ---")
            print(mensagem_raw)
            print("-------------------------------------\n")

        await page.screenshot(path=os.path.join(SCREENSHOTS_DIR, "10-whatsapp-gerado.png"))
        print("Passo 10: Captura final do checkout")

        await context_mobile.close()
        await browser.close()
        print("\nVALIAÇÃO CONCLUÍDA COM SUCESSO!")

if __name__ == "__main__":
    asyncio.run(run_validation())
