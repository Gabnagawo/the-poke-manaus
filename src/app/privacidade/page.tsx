import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { LOJA } from "@/lib/loja";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Política de privacidade da The Poke Manaus. Transparência sobre o uso de dados no site de pedidos.",
};

export default function PrivacidadePage() {
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
              TRANSPARÊNCIA
            </span>
            <h1 className="font-display font-black text-4xl sm:text-5xl text-[#0E2A38] leading-display tracking-tight mt-3">
              POLÍTICA DE PRIVACIDADE
            </h1>
            <p className="text-xs text-[#59655D] pt-2">
              Última atualização: 15 de outubro de 2026
            </p>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-[#0E2A38]/90 leading-relaxed">
            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl text-[#0E2A38]">
                1. Quem Somos
              </h2>
              <p>
                A <strong>The Poke Manaus</strong> (inscrita sob o CNPJ 68.439.848/0001-55) é um restaurante especializado em poke havaiano, localizado no Condomínio Park Mall Ephigênio, Av. Ephigênio Salles – Aleixo, Manaus/AM.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl text-[#0E2A38]">
                2. Informações que Coletamos
              </h2>
              <p>
                Este site de pedidos opera com foco em simplicidade e respeito à privacidade do cliente:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-sm text-[#59655D]">
                <li>
                  <strong>Armazenamento Local (localStorage):</strong> Guardamos temporariamente no navegador os itens adicionados à sua sacola para que seu pedido não se perca caso a página seja recarregada. Não utilizamos cookies de rastreamento de terceiros.
                </li>
                <li>
                  <strong>Dados do Pedido:</strong> Ao preencher seu nome, tipo de entrega (retirada ou endereço), forma de pagamento e observações, esses dados são compilados exclusivamente para gerar a mensagem enviada pelo próprio cliente no aplicativo WhatsApp.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl text-[#0E2A38]">
                3. Finalidade do Tratamento
              </h2>
              <p>
                Os dados fornecidos no formulário destinam-se unicamente ao atendimento, preparação e entrega do pedido solicitado, em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD).
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl text-[#0E2A38]">
                4. Compartilhamento de Dados
              </h2>
              <p>
                A The Poke Manaus não vende, aluga nem repassa dados de clientes a terceiros. Quando o cliente opta por realizar o pedido pelo iFood, a transação segue a política de privacidade da plataforma parceira.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-display font-bold text-xl text-[#0E2A38]">
                5. Seus Direitos
              </h2>
              <p>
                Como titular dos dados, você pode a qualquer momento solicitar esclarecimentos ou confirmação sobre o tratamento de informações através de nossos canais de atendimento presencial ou redes sociais oficiais ({LOJA.instagramHandle}).
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
