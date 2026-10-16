"use client";

import { useEffect, useState } from "react";
import { LOJA } from "@/lib/loja";

export function OpeningHours() {
  const [abertoAgora, setAbertoAgora] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const now = new Date();
      const horaManaus = parseInt(
        new Intl.DateTimeFormat("pt-BR", {
          timeZone: "America/Manaus",
          hour: "numeric",
          hour12: false,
        }).format(now),
        10
      );
      setAbertoAgora(horaManaus >= 11 && horaManaus < 23);
    } catch {
      setAbertoAgora(null);
    }
  }, []);

  return (
    <section id="horarios" className="w-full bg-[#DBE2DC] py-16 md:py-24 border-b border-[#0E2A38]/10 text-[#0E2A38]">
      <div className="max-w-[1140px] mx-auto px-4 sm:px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Lado Esquerdo: Horários e Localização */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-[#0E2A38] leading-display tracking-tight">
              HORÁRIOS &amp; ATENDIMENTO
            </h2>

            <p className="text-base sm:text-lg text-[#0E2A38]/80 leading-relaxed max-w-lg">
              No Condomínio Park Mall Ephigênio, bairro Aleixo. Atendimento no balcão e delivery todos os dias.
            </p>

            {/* Tabela Limpa de Horários */}
            <div className="bg-[#FCF9F0] border border-[#0E2A38]/15 rounded-[1px] p-6 max-w-md space-y-3 shadow-xs">
              <div className="flex justify-between items-center pb-3 border-b border-[#0E2A38]/10 text-sm">
                <span className="font-bold">Segunda a Domingo</span>
                <span className="font-display font-extrabold text-[#2A7CA1]">
                  11h00 às 23h00
                </span>
              </div>
              
              <div className="flex justify-between items-center text-xs pt-1">
                <span className="text-[#59655D]">Horário de Manaus</span>
                {abertoAgora !== null ? (
                  abertoAgora ? (
                    <span className="text-[#103B15] font-bold flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#103B15] inline-block animate-pulse" />
                      <span>Aberto agora</span>
                    </span>
                  ) : (
                    <span className="text-[#59655D] font-bold flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#59655D] inline-block" />
                      <span>Fechado agora · Abre às 11h</span>
                    </span>
                  )
                ) : (
                  <span className="text-[#59655D]">11h às 23h</span>
                )}
              </div>
            </div>

            {/* Endereço */}
            <div className="space-y-1 text-sm text-[#0E2A38]">
              <p className="font-display font-extrabold text-base">
                PARK MALL EPHIGÊNIO
              </p>
              <p className="text-[#0E2A38]/80">
                {LOJA.enderecoLinha} — {LOJA.bairro}, {LOJA.cidade}/{LOJA.estado}
              </p>
              <p className="text-xs text-[#0E2A38]/60">CEP {LOJA.cep}</p>
            </div>
          </div>

          {/* Lado Direito: Canais de Delivery e iFood */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[400px] bg-[#FCF9F0] border border-[#0E2A38]/15 rounded-[1px] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="space-y-1">
                <h3 className="font-display font-extrabold text-2xl text-[#0E2A38]">
                  CANAL IFOOD MANAUS
                </h3>
                <p className="text-xs sm:text-sm text-[#59655D] leading-relaxed">
                  Você também pode pedir pelo aplicativo do iFood.
                </p>
              </div>

              <div className="p-3.5 bg-[#DBE2DC]/40 rounded-[1px] border border-[#0E2A38]/10 text-xs space-y-1.5 text-[#0E2A38]">
                <p>
                  <strong className="font-bold">Pedido mínimo no iFood:</strong> R$ 20,00
                </p>
                <p>
                  <strong className="font-bold">Entrega:</strong> calculada por endereço
                </p>
                <p>
                  <strong className="font-bold">Pagamento no app:</strong> Pix, cartões e vales
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={LOJA.linkIfood}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full btn-limon h-12 text-xs font-extrabold shadow-sm flex items-center justify-center space-x-2"
                >
                  <span>ACESSAR LOJA NO IFOOD</span>
                  <span>↗</span>
                </a>
              </div>

              <div className="text-center">
                <a
                  href={LOJA.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-display font-bold uppercase tracking-wider text-[#0E2A38] hover:text-[#2A7CA1] underline-offset-4 hover:underline"
                >
                  Siga @thepokemanaus no Instagram
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
