import { ProductDetailPageContent } from "@/catalog/presentation/pages/product-detail-page";
import { WhatsAppFloatingButton } from "@/shared/ui/whatsapp-floating";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  return (
    <>
      <ProductDetailPageContent id={id} />
      <WhatsAppFloatingButton />
    </>
  );
}
