"""Teste do fluxo de pedido no celular (390x844): montagem, limites, extras, sacola, edição,
checkout, link do WhatsApp e botão voltar. Uso: python scripts/qa/fluxo.py <url> <pasta-saida>"""
import asyncio, json, os, re, sys, urllib.parse
from playwright.async_api import async_playwright, expect

URL = sys.argv[1] if len(sys.argv) > 1 else "http://localhost:3005/"
OUT = sys.argv[2] if len(sys.argv) > 2 else "screenshots/v4/fluxo"
os.makedirs(OUT, exist_ok=True)
n = 0


async def foto(pg, nome):
    global n
    n += 1
    await pg.wait_for_timeout(450)
    await pg.screenshot(path=f"{OUT}/{n:02d}-{nome}.png")


async def main():
    erros = []
    async with async_playwright() as p:
        b = await p.chromium.launch(channel="msedge", headless=True)
        ctx = await b.new_context(viewport={"width": 390, "height": 844}, is_mobile=True, has_touch=True, device_scale_factor=2)
        pg = await ctx.new_page()
        pg.on("console", lambda m: erros.append(f"{m.type}: {m.text}") if m.type in ("error", "warning") else None)
        pg.on("pageerror", lambda e: erros.append(f"pageerror: {e}"))
        await pg.goto(URL, wait_until="networkidle")
        await pg.evaluate("localStorage.clear()")
        await pg.reload(wait_until="networkidle")
        await pg.wait_for_timeout(900)

        # 1. abrir a montagem pelo hero
        await pg.get_by_role("button", name="Monte o seu").click()
        dlg = pg.get_by_role("dialog")
        await expect(dlg).to_be_visible()
        await foto(pg, "montagem-aberta")

        # 2. tentar adicionar vazio -> erro na base
        await dlg.get_by_role("button", name=re.compile(r"^Adicionar\s*R\$")).click()
        await expect(dlg.get_by_text("Escolha 1 para continuar").first).to_be_visible()
        await foto(pg, "erro-sem-base")

        # 3. base -> avança sozinho
        await dlg.get_by_role("radio", name=re.compile("^Arroz Japonês")).click()
        await pg.wait_for_timeout(900)
        await foto(pg, "base-escolhida-avancou")

        # 4. proteínas
        await dlg.get_by_role("checkbox", name=re.compile("^Salmão Fresco")).click()
        await dlg.get_by_role("checkbox", name=re.compile("^Atum Selado")).click()
        await pg.wait_for_timeout(900)
        await foto(pg, "proteinas")

        # 5. molhos + tentativa de 3º (limite)
        await dlg.get_by_role("checkbox", name=re.compile("^Molho Fit")).click()
        await dlg.get_by_role("checkbox", name=re.compile("^Teriyaki")).click()
        await dlg.get_by_role("checkbox", name=re.compile("^Sweet Chilli")).click()
        await expect(dlg.get_by_role("alert")).to_contain_text("Desmarque")
        await foto(pg, "limite-molhos")

        # 6. acompanhamentos, crispy, extras, adicionais, talher
        for a in ["Manga", "Abacate", "Cenoura"]:
            await dlg.get_by_role("checkbox", name=re.compile(f"^{a}")).click()
        await dlg.get_by_role("checkbox", name=re.compile("^Crispy de Couve")).click()
        await dlg.get_by_role("button", name="Adicionar Salmão Extra").click()
        await dlg.get_by_role("button", name="Adicionar Cream Cheese").click()
        await dlg.get_by_role("button", name="Aumentar Cream Cheese").click()
        await dlg.get_by_role("radio", name=re.compile("^Hashi")).click()
        await foto(pg, "tudo-escolhido")
        botao = dlg.get_by_role("button", name=re.compile(r"^Adicionar\s*R\$"))
        txt = (await botao.inner_text()).replace("\n", " ")
        assert "109,30" in txt, f"total esperado R$ 109,30, veio: {txt}"

        # 7. adicionar
        await botao.click()
        await expect(dlg).to_be_hidden()
        await foto(pg, "adicionado-barra")

        # 8. suco 2x pelo contador
        await pg.get_by_role("button", name="Adicionar Anti-Ox").click()
        await pg.get_by_role("button", name="Aumentar Anti-Ox").click()
        await pg.get_by_role("button", name="Aumentar Anti-Ox").scroll_into_view_if_needed()
        await foto(pg, "suco-contador")

        # 9. abrir sacola pela barra
        await pg.get_by_role("button", name=re.compile("^Ver sacola")).click()
        sac = pg.get_by_role("dialog")
        await expect(sac).to_be_visible()
        await foto(pg, "sacola")

        # 10. editar o poke: trocar para G (faltará 1 proteína)
        await sac.get_by_role("button", name="Editar").click()
        dlg = pg.get_by_role("dialog")
        await expect(dlg.get_by_role("button", name=re.compile("^Salvar"))).to_be_visible()
        await dlg.get_by_role("radio", name=re.compile("^Grande")).click()
        await dlg.get_by_role("button", name=re.compile("^Salvar")).click()
        await foto(pg, "editar-G-falta-proteina")
        await dlg.get_by_role("checkbox", name=re.compile("^Camarão Grelhado")).click()
        salvar = dlg.get_by_role("button", name=re.compile("^Salvar"))
        txt = (await salvar.inner_text()).replace("\n", " ")
        assert "124,30" in txt, f"total G esperado R$ 124,30, veio: {txt}"
        await salvar.click()
        await expect(dlg).to_be_hidden()

        # 11. checkout
        await pg.get_by_role("button", name=re.compile("^Ver sacola")).click()
        sac = pg.get_by_role("dialog")
        await sac.get_by_role("button", name=re.compile("^Continuar")).click()
        await foto(pg, "checkout")
        await sac.get_by_role("link", name=re.compile("Enviar pelo WhatsApp")).click()
        await expect(sac.get_by_text("Diga o seu nome.")).to_be_visible()
        await foto(pg, "checkout-erros")
        await sac.get_by_label("Seu nome").fill("Teste")
        await sac.get_by_label("Rua e número").fill("Rua Teste, 100")
        await sac.get_by_label("Bairro").fill("Aleixo")
        await sac.get_by_role("button", name="Dinheiro").click()
        await sac.get_by_label("Troco para quanto?").fill("R$ 200,00")
        link = await sac.get_by_role("link", name=re.compile("Enviar pelo WhatsApp")).get_attribute("href")
        msg = urllib.parse.unquote(link.split("text=", 1)[1])
        with open(f"{OUT}/mensagem-whatsapp.txt", "w", encoding="utf-8") as f:
            f.write(msg)
        async with ctx.expect_page() as nova:
            await sac.get_by_role("link", name=re.compile("Enviar pelo WhatsApp")).click()
        await (await nova.value).close()
        await expect(sac.get_by_text("Quase lá")).to_be_visible()
        await foto(pg, "enviado")
        await sac.get_by_role("button", name="Manter os itens").click()
        await expect(pg.get_by_role("dialog")).to_be_hidden()

        # 12. botão voltar fecha a montagem sem sair da página
        y0 = await pg.evaluate("scrollY")
        await pg.get_by_role("button", name="Montar Poke Pequeno").first.click()
        await expect(pg.get_by_role("dialog")).to_be_visible()
        await pg.go_back()
        await expect(pg.get_by_role("dialog")).to_be_hidden()
        url = pg.url
        y1 = await pg.evaluate("scrollY")
        await foto(pg, "voltar-fechou")

        # 13. menu do celular -> link de seção
        await pg.evaluate("scrollTo(0,0)")
        await pg.wait_for_timeout(300)
        await pg.get_by_role("button", name="Abrir menu").click()
        await foto(pg, "menu-aberto")
        await pg.get_by_role("dialog").get_by_role("link", name="Horários").click()
        await pg.wait_for_timeout(1500)
        topo = await pg.evaluate("document.getElementById('horarios').getBoundingClientRect().top")
        await foto(pg, "menu-foi-horarios")

        overflow = await pg.evaluate("document.documentElement.scrollWidth > innerWidth")
        print(json.dumps({"url_depois_voltar": url, "scroll_antes": y0, "scroll_depois": y1, "horarios_top": topo,
                          "overflow": overflow, "erros": erros}, ensure_ascii=False, indent=1))
        await b.close()


asyncio.run(main())
