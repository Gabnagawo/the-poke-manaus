import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { LOJA } from "@/lib/loja";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso e condições de pedidos da The Poke Manaus no Park Mall Ephigênio.",
};

export default function TermosPage() {
  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FCF9F0] border-b border-[#0E2A38]/10">
        <div className="max-w-[1140px] mx-auto px-4 sm:px-6 h-[80px] flex items-center justify-between">
          <Link
            href="/"
            className="font-display font-black text-xl text-[#0E2A38] hover:opacity-80"
          >
            ← THE POKE MANAUS
          </Link>
          <Link href="/" className="btn-limon px-4 py-2 text-xs font-bold">
            VER CARDÁPIO
          </Link>
        </div>
      </header>

      <main className="flex-1 w-full bg-[#FCF9F0] py-12 md:py-20 text-[#1D0B0D]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8">
          <div>
            <span className="tilt-left bg-[#F7EA48] text-[#0E2A38] font-display font-extrabold text-xs px-3 py-1 uppercase tracking-wider">
              CONDIÇÕES GERAIS
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-[#0E2A38] leading-display tracking-tight mt-3">
              TERMOS DE USO
            </h1>
            <p className="text-xs text-[#59655D] pt-2">
              Última atualização: 15 de outubro de 2026
            </p>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-[#0E2A38]/90 leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl text-[#0E2A38]">
                1. Objeto e Aceitação
              </h2>
              <p>
                Este site destina-se à apresentação do cardápio e montagem de pedidos para o restaurante <strong>The Poke Manaus</strong> (CNPJ 68.439.848/0001-55). Ao utilizar a plataforma para montar sua tigela e enviar pedidos, você concorda com as condições aqui descritas.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl text-[#0E2A38]">
                2. Cardápio, Preços e Disponibilidade
              </h2>
              <p>
                Os preços exibidos no site refletem os valores padrão praticados pela loja. Por se tratar de produtos alimentícios frescos (peixes, hortaliças e frutas da estação), a disponibilidade de itens específicos pode variar conforme o abastecimento diário.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl text-[#0E2A38]">
                3. Confirmação de Pedidos e Horário
              </h2>
              <p>
                O envio do pedido pelo WhatsApp gera a solicitação diretamente à nossa equipe de atendimento. O pedido é formalmente confirmado e iniciado após a confirmação mútua do atendente quanto aos dados de entrega e forma de pagamento. Nosso horário de funcionamento é de segunda a domingo, das 11h às 23h.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl text-[#0E2A38]">
                4. Pagamento e Cancelamentos
              </h2>
              <p>
                Os pagamentos podem ser efetuados via Pix, cartões de crédito/débito ou dinheiro na entrega/retirada. Caso necessite cancelar ou alterar um pedido, solicitamos que entre em contato imediatamente pelos nossos canais oficiais antes do início do preparo da sua tigela.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl text-[#0E2A38]">
                5. Pedidos via Aplicativo Parceiro (iFood)
              </h2>
              <p>
                Quando o pedido for realizado pela plataforma iFood, aplicam-se integralmente os termos de uso, taxas de entrega e condições de pagamento da plataforma do iFood.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
