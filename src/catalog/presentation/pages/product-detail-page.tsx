"use client";

import React from "react";
import { Navbar } from "@/shared/ui/navbar";
import { Footer } from "@/core/presentation/footer";
import { ProductDetails } from "@/catalog/presentation/components/product-details";
import { usePublicProduct } from "../hooks/use-public-catalog";
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";

interface ProductDetailPageProps {
  id: string;
}

export const ProductDetailPageContent = ({ id }: ProductDetailPageProps) => {
  const { data: product, isLoading, error } = usePublicProduct(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <ProductDetails product={product} />
      <Footer />
    </>
  );
};
