import { ProductDetailPageContent } from "@/catalog/presentation/pages/product-detail-page";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  return <ProductDetailPageContent id={id} />;
}
