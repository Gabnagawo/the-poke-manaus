import type { Metadata } from "next";
import { PaginaLegal } from "@/components/layout/PaginaLegal";
import { LOJA } from "@/lib/loja";

export const metadata: Metadata = {
  title: "Privacidade",
  description: "Como o site de pedidos da The Poke Manaus usa os seus dados.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <PaginaLegal titulo="Privacidade" atualizado="16 de outubro de 2026">
      <section>
        <h2>Quem somos</h2>
        <p>
          {LOJA.nome}, CNPJ {LOJA.cnpj}, {LOJA.enderecoLinha}, {LOJA.bairro}, {LOJA.cidade}/{LOJA.estado}.
        </p>
      </section>
      <section>
        <h2>O que este site guarda</h2>
        <ul>
          <li>
            <strong>Sacola:</strong> os itens que você escolhe ficam salvos no seu navegador (localStorage), para não se perderem se a
            página recarregar. Não usamos cookies de rastreamento.
          </li>
          <li>
            <strong>Seus dados de entrega:</strong> nome e endereço ficam salvos só no seu aparelho, para preencher o próximo pedido. Você
            pode apagar limpando os dados do site no navegador.
          </li>
          <li>
            <strong>O pedido:</strong> nome, endereço, forma de pagamento e observações servem só para montar a mensagem que você mesmo envia
            pelo WhatsApp. O site não envia nada para nenhum servidor.
          </li>
        </ul>
      </section>
      <section>
        <h2>Para que usamos</h2>
        <p>
          Os dados da mensagem servem para atender, preparar e entregar o seu pedido, conforme a Lei Geral de Proteção de Dados (Lei nº
          13.709/2018).
        </p>
      </section>
      <section>
        <h2>Compartilhamento</h2>
        <p>
          Não vendemos nem repassamos dados de clientes. Pedidos feitos pelo iFood seguem a política de privacidade do iFood.
        </p>
      </section>
      <section>
        <h2>Seus direitos</h2>
        <p>
          Para tirar dúvidas ou pedir a exclusão dos seus dados, fale com a loja no balcão ou pelo Instagram {LOJA.instagramHandle}.
        </p>
      </section>
    </PaginaLegal>
  );
}
