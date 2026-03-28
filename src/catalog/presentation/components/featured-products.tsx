"use client";

import React from "react";
import { Container } from "@/shared/ui/container";
import { motion } from "framer-motion";
import { useFeaturedProducts } from "../hooks/use-public-catalog";
import { ProductCard } from "./product-card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export const FeaturedProducts: React.FC = () => {
  const { data, isLoading } = useFeaturedProducts();

  const products = Array.isArray(data) ? data : [];

  if (!isLoading && products.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="flex items-end justify-between mb-16">
          <div className="max-w-3xl">
            <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">
              Selección Futeki
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-foreground mb-6 uppercase leading-none">
              Los Imprescindibles <br />
              <span className="text-secondary/70">de esta semana.</span>
            </h2>
            <p className="text-xl text-secondary font-medium">
              Encuentra los mejores productos de esta semana.
            </p>
          </div>
          <Link
            href="/catalog"
            className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline group"
          >
            Ver Todo{" "}
            <ChevronRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-4/5 bg-accent/10 animate-pulse rounded-4xl"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: any, i: number) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
};
