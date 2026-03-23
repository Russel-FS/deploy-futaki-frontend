import { Navbar } from "@/shared/ui/navbar";
import { HeroCarousel } from "@/core/presentation/hero-carousel";
import { ProductGrid } from "@/catalog/presentation/product-grid";
import { BlogSection } from "@/blog/presentation/blog-section";
import { Footer } from "@/core/presentation/footer";
import { InfoStrip } from "@/core/presentation/info-strip";
import { CategoryGrid } from "@/catalog/presentation/category-grid";
import { WhatsAppFloatingButton } from "@/shared/ui/whatsapp-floating";

export default function LandingPage() {
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
}
