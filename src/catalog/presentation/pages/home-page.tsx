"use client";

import { Navbar } from "@/shared/ui/navbar";
import { HeroCarousel } from "@/core/presentation/hero-carousel";
import { ProductGrid } from "@/catalog/presentation/components/product-grid";
import { BlogSection } from "@/blog/presentation/blog-section";
import { Footer } from "@/core/presentation/footer";
import { CategoryGrid } from "@/catalog/presentation/components/category-grid";

export const HomePageContent = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroCarousel />
      <CategoryGrid />

      {/* Sección de Catálogo */}
      <ProductGrid />

      {/* Sección de Blog/Contenido */}
      <BlogSection />

      {/* Pie de página */}
      <Footer />
    </main>
  );
};
