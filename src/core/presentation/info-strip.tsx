import React from "react";
import { Container } from "@/shared/ui/container";
import { Truck, ShieldCheck, Headphones, CreditCard } from "lucide-react";

const BENEFITS = [
  {
    icon: Truck,
    title: "Envío Gratis",
    desc: "En todas tus compras mayores a S/ 500",
  },
  {
    icon: ShieldCheck,
    title: "Garantía Total",
    desc: "12 meses de garantía oficial de marca",
  },
  {
    icon: Headphones,
    title: "Soporte 24/7",
    desc: "Atención personalizada por WhatsApp",
  },
  {
    icon: CreditCard,
    title: "Pago Seguro",
    desc: "Aceptamos todas las tarjetas y transferencias",
  }
];

export const InfoStrip: React.FC = () => {
  return (
    <div className="border-y border-border/50 bg-accent/20 py-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {BENEFITS.map((item, i) => (
            <div key={i} className="flex gap-5 items-center">
              <div className="bg-primary/10 p-4 rounded-2xl">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-wider">{item.title}</h4>
                <p className="text-secondary text-[11px] font-medium leading-relaxed mt-1">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};
