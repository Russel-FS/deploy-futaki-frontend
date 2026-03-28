import { CatalogPageContent } from "@/catalog/presentation/pages/catalog-page";
import { Navbar } from "@/shared/ui/navbar";
import { Footer } from "@/core/presentation/footer";

export default function CatalogPage() {
  return (
    <main>
      <Navbar />
      <CatalogPageContent />
      <Footer />
    </main>
  );
}
