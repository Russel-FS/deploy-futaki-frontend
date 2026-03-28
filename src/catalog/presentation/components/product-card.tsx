"use client";

import React from "react";
import { motion } from "framer-motion";
import { COMPANY_CONFIG } from "@/core/config/company.config";
import Link from "next/link";
import { Product } from "@/catalog/domain/entities/catalog.entity";
import { Package } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const whatsappNumber = COMPANY_CONFIG.contact.whatsapp;
  const message = encodeURIComponent(
    COMPANY_CONFIG.whatsappMessages.productQuery(
      product.name,
      product.price.toString(),
    ),
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group rounded-3xl p-4 bg-system-gray-6 transition-colors duration-300 border border-transparent hover:border-border/40 flex flex-col h-full"
    >
      <Link
        href={`/products/${product.id}`}
        className="block relative aspect-square overflow-hidden rounded-2xl bg-[#f5f5f7] dark:bg-accent/30 mb-6"
      >
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-accent/10">
            <Package size={48} className="text-secondary/20" />
          </div>
        )}
        {product.stock <= 3 && product.stock > 0 && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-[9px] font-bold uppercase px-2 py-1 rounded-full shadow-lg">
            Últimas unidades
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-4 right-4 bg-secondary text-white text-[9px] font-bold uppercase px-2 py-1 rounded-full shadow-lg">
            Agotado
          </span>
        )}
      </Link>

      <div className="flex flex-col grow px-2">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-lg font-bold tracking-tight text-foreground/90 group-hover:text-primary transition-colors cursor-pointer">
              {product.name}
            </h3>
          </Link>
          <span className="text-sm font-black">
            ${product.price.toLocaleString()}
          </span>
        </div>

        <p className="text-xs text-secondary font-medium mb-4 line-clamp-2">
          {product.description}
        </p>

        {product.specs && Array.isArray(product.specs) && (
          <div className="flex flex-wrap gap-2 mb-6 opacity-60 group-hover:opacity-100 transition-opacity">
            {product.specs.slice(0, 3).map((spec: any, i: number) => (
              <span
                key={i}
                className="text-[9px] bg-accent/50 px-2 py-0.5 rounded-md font-bold uppercase tracking-wider"
              >
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
            className="flex items-center bg-white justify-center gap-2 w-full py-3 rounded-full text-[11px] font-bold border border-border/60 hover:border-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            Consultar disponibilidad
          </a>
        </div>
      </div>
    </motion.div>
  );
};
