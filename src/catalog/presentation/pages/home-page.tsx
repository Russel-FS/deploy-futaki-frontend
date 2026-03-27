"use client";

import { Navbar } from "@/shared/ui/navbar";
import { HeroCarousel } from "@/core/presentation/hero-carousel";
import { BlogSection } from "@/blog/presentation/blog-section";
import { Footer } from "@/core/presentation/footer";
import { FeaturedCategories } from "@/catalog/presentation/components/featured-categories";
import { FeaturedProducts } from "@/catalog/presentation/components/featured-products";

export const HomePageContent = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroCarousel />

      {/* Secciones Destacadas  */}
      <FeaturedCategories />
      <FeaturedProducts />

      {/* Sección de Blog/Contenido */}
      <BlogSection />

      {/* Pie de página */}
      <Footer />
    </main>
  );
};
