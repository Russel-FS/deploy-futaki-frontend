"use client";

import React from "react";
import { Product } from "../infrastructure/mock-products";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="group bg-accent rounded-3xl p-6 flex flex-col items-center text-center transition-all duration-300"
    >
      <div className="relative w-full aspect-square mb-8 overflow-hidden rounded-2xl">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {product.stock <= 5 && (
          <span className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] uppercase font-bold px-2 py-1 rounded-full">
            Stock Bajo
          </span>
        )}
      </div>
      <div className="flex flex-col grow">
        <p className="text-primary text-[10px] uppercase tracking-widest font-bold mb-2">{product.category}</p>
        <h3 className="text-xl font-bold mb-2">{product.name}</h3>
        <p className="text-secondary text-sm mb-6 line-clamp-2">{product.description}</p>
        <div className="mt-auto flex items-center justify-between w-full">
          <span className="text-lg font-medium">{product.price}</span>
          <button className="text-primary font-medium hover:underline text-sm">Detalles</button>
        </div>
      </div>
    </motion.div>
  );
};
