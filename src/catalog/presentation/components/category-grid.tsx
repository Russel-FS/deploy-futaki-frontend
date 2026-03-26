import React from "react";
import { Container } from "@/shared/ui/container";
import { motion } from "framer-motion";
import { usePublicCategories } from "../hooks/use-public-catalog";
import { Package } from "lucide-react";

export const CategoryGrid: React.FC = () => {
  const { data: categories = [], isLoading } = usePublicCategories();

  return (
    <section className="py-24">
      <Container>
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">
              Nuestras Secciones
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground">
              Compra por Categoría
            </h2>
          </div>
          <button className="text-sm font-black border-b-2 border-primary pb-1 hover:text-primary transition-colors text-foreground">
            VER TODO
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading
            ? [...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="aspect-4/5 bg-accent/20 animate-pulse rounded-[32px]"
                />
              ))
            : categories.map((cat: any, i: number) => (
                <motion.div
                  key={cat.id || i}
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-4/5 overflow-hidden rounded-[32px] group cursor-pointer bg-accent/5 border border-border/10"
                >
                  {cat.imageUrl ? (
                    <img
                      src={cat.imageUrl}
                      alt={cat.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-accent/5">
                      <Package size={48} className="text-secondary/20" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 text-white">
                    <h3 className="text-3xl font-black uppercase tracking-tighter leading-none mb-2">
                      {cat.name}
                    </h3>
                    <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.2em]">
                      Ver sección
                    </p>
                  </div>
                </motion.div>
              ))}
        </div>
      </Container>
    </section>
  );
};
