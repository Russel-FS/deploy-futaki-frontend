"use client";

import React from "react";
import { Container } from "@/shared/ui/container";
import { motion } from "framer-motion";
import { useFeaturedCategories } from "../hooks/use-public-catalog";
import { ChevronRight, Package } from "lucide-react";
import Link from "next/link";

export const FeaturedCategories: React.FC = () => {
  const { data, isLoading } = useFeaturedCategories();

  const categories = Array.isArray(data) ? data : [];

  if (!isLoading && categories.length === 0) return null;

  return (
    <section className="py-24 bg-system-gray-6  overflow-hidden">
      <Container>
        <div className="flex items-end justify-between mb-12">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4 uppercase">
              Explora por Categorías
            </h2>
            <p className="text-secondary font-medium text-lg">
              Seleccionamos lo mejor de cada segmento para potenciar tu estilo
              de vida.
            </p>
          </div>
          <Link
            href="/catalog"
            className="hidden md:flex items-center gap-2 text-primary font-bold hover:underline group"
          >
            Ver todas{" "}
            <ChevronRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <div className="relative">
          <div className="flex gap-6 overflow-x-auto pb-8 snap-x no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
            {isLoading
              ? [...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="min-w-[280px] md:min-w-[320px] aspect-4/5 bg-accent/20 animate-pulse rounded-[2.5rem]"
                  />
                ))
              : categories.map((category: any, i: number) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    viewport={{ once: true }}
                    className="min-w-[280px] md:min-w-[320px] snap-start group "
                  >
                    <Link href={`/catalog?categoryId=${category.id}`}>
                      <div className="relative aspect-4/5 h-100 rounded-[2.5rem] overflow-hidden bg-white shadow-sm border border-border/10">
                        {category.imageUrl ? (
                          <img
                            src={category.imageUrl}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-accent/5">
                            <Package size={48} className="text-secondary/20" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-80" />
                        <div className="absolute bottom-8 left-8 right-8 text-white">
                          <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                            {category.name}
                          </h3>
                          <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                            Explorar <ChevronRight size={14} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
          </div>
        </div>
      </Container>
    </section>
  );
};
