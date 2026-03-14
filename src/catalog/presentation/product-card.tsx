"use client";

import React from "react";
import { Product } from "../infrastructure/mock-products";
import { motion } from "framer-motion";
import { WhatsAppIcon } from "@/shared/ui/whatsapp-icon";
import { COMPANY_CONFIG } from "@/core/config/company.config";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const whatsappNumber = COMPANY_CONFIG.contact.whatsapp;
  const message = encodeURIComponent(
    COMPANY_CONFIG.whatsappMessages.productQuery(product.name, product.price),
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group bg-background rounded-3xl p-4 transition-all duration-300 hover:shadow-xl border border-transparent hover:border-border/40 flex flex-col h-full"
    >
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-[#f5f5f7] dark:bg-accent/30 mb-6">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
        />
        {product.stock <= 3 && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-[9px] font-bold uppercase px-2 py-1 rounded-full">
            Últimas unidades
          </span>
        )}
      </div>

      <div className="flex flex-col grow px-2">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold tracking-tight text-foreground/90 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <span className="text-sm font-bold">{product.price}</span>
        </div>
        
        <p className="text-xs text-secondary font-medium mb-4 line-clamp-2">
          {product.description}
        </p>

        {product.specs && (
          <div className="flex flex-wrap gap-2 mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
            {product.specs.map((spec, i) => (
              <span key={i} className="text-[10px] bg-accent/50 px-2 py-0.5 rounded-md font-medium">
                {spec.value}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-[11px] font-bold border border-border/60 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            Consultar disponibilidad
          </a>
        </div>
      </div>
    </motion.div>
  );
};
