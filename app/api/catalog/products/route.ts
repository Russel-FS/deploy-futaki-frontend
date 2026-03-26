import { NextResponse } from "next/server";
import { PrismaPublicCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-public-catalog.repository";
import { GetPublicProductsUseCase } from "@/catalog/application/use-cases/public/public.use-cases";

const publicRepo = new PrismaPublicCatalogRepository();

export async function GET() {
  try {
    const useCase = new GetPublicProductsUseCase(publicRepo);
    const products = await useCase.execute();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error al obtener los productos (Público):", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
