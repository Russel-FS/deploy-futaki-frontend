import { MOCK_PRODUCTS } from "@/catalog/infrastructure/mock-products";
import { ProductDetails } from "@/catalog/presentation/product-details";
import { Navbar } from "@/shared/ui/navbar";
import { Footer } from "@/core/presentation/footer";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    id: string;
  };
}

export function generateStaticParams() {
  return MOCK_PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = MOCK_PRODUCTS.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <ProductDetails product={product} />
      <Footer />
    </>
  );
}
