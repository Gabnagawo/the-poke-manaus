import type { Metadata } from "next";
import { PaginaLegal } from "@/components/layout/PaginaLegal";
import { LOJA } from "@/lib/loja";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Condições para fazer pedidos pelo site da The Poke Manaus.",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <PaginaLegal titulo="Termos de uso" atualizado="16 de outubro de 2026">
      <section>
        <h2>O site</h2>
        <p>
          Este site mostra o cardápio da {LOJA.nome} (CNPJ {LOJA.cnpj}) e ajuda você a montar o pedido. Ao usar o site, você concorda com
          estas condições.
        </p>
      </section>
      <section>
        <h2>Cardápio e preços</h2>
        <p>Os preços são os praticados pela loja. A disponibilidade de alguns itens pode variar.</p>
      </section>
      <section>
        <h2>Confirmação do pedido</h2>
        <p>
          O pedido só vale depois que a loja responder pelo WhatsApp confirmando os itens, a entrega e o pagamento. Horário de atendimento:
          {" "}
          {LOJA.horario.toLowerCase()}.
        </p>
      </section>
      <section>
        <h2>Pagamento e cancelamento</h2>
        <p>
          Pix, cartão de crédito, cartão de débito ou dinheiro, na entrega ou na retirada. Para cancelar ou alterar um pedido, avise a loja
          o quanto antes, antes do preparo.
        </p>
      </section>
      <section>
        <h2>Pedidos pelo iFood</h2>
        <p>Pedidos feitos pelo iFood seguem os termos, as taxas e as formas de pagamento do iFood.</p>
      </section>
    </PaginaLegal>
  );
}
