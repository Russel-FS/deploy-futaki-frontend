"use client";

import React from "react";
import { Container } from "@/shared/ui/container";
import { ProductCard } from "./product-card";
import { usePublicProducts } from "../hooks/use-public-products";

export const ProductGrid: React.FC = () => {
  const { data: products = [], isLoading } = usePublicProducts();

  return (
    <section id="catalog" className="py-24 bg-background">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">
              Catálogo Seleccionado
            </span>
            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">
              Lo más vendido de la semana
            </h2>
            <p className="text-secondary font-medium md:text-lg">
              Equipos de alto rendimiento seleccionados cuidadosamente por
              nuestros expertos.
            </p>
          </div>
          <button className="bg-foreground text-background px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
            Ver catálogo completo
          </button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-4/5 bg-accent animate-pulse rounded-3xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};
