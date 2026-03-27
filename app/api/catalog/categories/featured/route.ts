import { NextResponse } from "next/server";
import { PrismaPublicCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-public-catalog.repository";
import { GetFeaturedCategoriesUseCase } from "@/catalog/application/use-cases/public/public.use-cases";

const publicRepo = new PrismaPublicCatalogRepository();

export async function GET() {
  try {
    const useCase = new GetFeaturedCategoriesUseCase(publicRepo);
    const categories = await useCase.execute();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error al obtener categorias destacadas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
