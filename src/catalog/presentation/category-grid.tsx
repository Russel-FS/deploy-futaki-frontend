"use client";

import React from "react";
import { Container } from "@/shared/ui/container";
import { motion } from "framer-motion";

const CATEGORIES = [
  {
    name: "Laptops",
    count: "45 Productos",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Gaming",
    count: "21 Productos",
    image:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Móviles",
    count: "32 Productos",
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
  },
  {
    name: "Accesorios",
    count: "89 Productos",
    image:
      "https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=600&auto=format&fit=crop",
  },
];

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-24">
      <Container>
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">
              Nuestras Secciones
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
              Compra por Categoría
            </h2>
          </div>
          <button className="text-sm font-black border-b-2 border-primary pb-1 hover:text-primary transition-colors">
            VER TODO
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((cat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.02 }}
              className="relative aspect-4/5 overflow-hidden rounded-[32px] group cursor-pointer"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">
                  {cat.name}
                </h3>
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest">
                  {cat.count}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
