import { Navbar } from "@/shared/ui/navbar";
import { Hero } from "@/core/presentation/hero";
import { ProductGrid } from "@/catalog/presentation/product-grid";
import { BlogSection } from "@/blog/presentation/blog-section";
import { Footer } from "@/core/presentation/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Sección de Catálogo */}
      <ProductGrid />
      
      {/* Sección de Blog/Contenido */}
      <BlogSection />
      
      {/* Pie de página */}
      <Footer />
    </main>
  );
}
