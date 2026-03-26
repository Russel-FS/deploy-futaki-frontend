import { NextResponse } from "next/server";
import { PrismaPublicCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-public-catalog.repository";
import { GetPublicCategoriesUseCase } from "@/catalog/application/use-cases/public/public.use-cases";

const publicRepo = new PrismaPublicCatalogRepository();

export async function GET() {
  try {
    const useCase = new GetPublicCategoriesUseCase(publicRepo);
    const categories = await useCase.execute();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error al obtener las categorías (Público):", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
