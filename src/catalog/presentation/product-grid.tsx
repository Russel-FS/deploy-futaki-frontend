"use client";

import React from "react";
import { Container } from "@/shared/ui/container";
import { ProductCard } from "./product-card";
import { MOCK_PRODUCTS } from "../infrastructure/mock-products";

export const ProductGrid: React.FC = () => {
  return (
    <section id="catalog" className="py-24 bg-background">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
              Catálogo Seleccionado.
            </h2>
            <p className="text-secondary text-lg">
              Una colección de herramientas diseñadas para elevar tu día a día. Encuentra el equilibrio perfecto entre estética y funcionalidad.
            </p>
          </div>
          <div className="flex gap-4">
             {/* Filtros o categorías si se desea */}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};
