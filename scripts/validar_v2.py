import asyncio
import os
from playwright.async_api import async_playwright

BASE_URL = "http://localhost:3005"
SCREENSHOTS_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "../screenshots/v2"))
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

            # Scroll down to bottom to trigger all lazy-loaded images, then back to top
            await page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
            await page.wait_for_timeout(800)
            await page.evaluate("window.scrollTo(0, 0)")
            await page.wait_for_timeout(400)

            overflow = await page.evaluate("document.documentElement.scrollWidth > window.innerWidth")

            broken_images = await page.evaluate("""() => {
                const imgs = Array.from(document.querySelectorAll('img'));
                return imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
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

            print(f"Viewport {vp['name']}: Overflow={overflow}, ConsoleErrors={len(console_errors)}, BrokenImgs={len(broken_images)}")
            await context.close()

        # Capture interactive states: Cart drawer and Modal Monte seu Poke
        context = await browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=2)
        page = await context.new_page()
        await page.goto(BASE_URL, wait_until="networkidle")
        
        # 1. Open modal montagem
        btn_hero = page.locator("button:has-text('MONTE SEU POKE →')").first
        await btn_hero.click()
        await page.wait_for_timeout(500)
        modal_path = os.path.join(SCREENSHOTS_DIR, "modal-montagem.png")
        await page.screenshot(path=modal_path, full_page=False)
        print("Captured modal-montagem.png")

        # Close modal via close button
        btn_close = page.locator("button[aria-label='Fechar']")
        await btn_close.click()
        await page.wait_for_timeout(400)

        # 2. Open Cart Drawer
        btn_cart = page.locator("button:has-text('CARRINHO'), button:has-text('PEDIDO')").first
        await btn_cart.click()
        await page.wait_for_timeout(500)
        cart_path = os.path.join(SCREENSHOTS_DIR, "carrinho-drawer.png")
        await page.screenshot(path=cart_path, full_page=False)
        print("Captured carrinho-drawer.png")

        await browser.close()
        print("\nAll validation checks and screenshots finished successfully!")

if __name__ == "__main__":
    asyncio.run(run_validation())
