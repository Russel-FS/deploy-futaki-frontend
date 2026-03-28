import { NextRequest, NextResponse } from "next/server";
import { PrismaPublicCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-public-catalog.repository";
import {
  GetFilteredProductsUseCase,
} from "@/catalog/application/use-cases/public/public.use-cases";

const publicRepo = new PrismaPublicCatalogRepository();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      q: searchParams.get("q") || undefined,
      categoryId: searchParams.get("categoryId") || undefined,
      minPrice: searchParams.get("minPrice") ? Number(searchParams.get("minPrice")) : undefined,
      maxPrice: searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined,
      sort: (searchParams.get("sort") as any) || undefined,
    };

    const useCase = new GetFilteredProductsUseCase(publicRepo);
    const products = await useCase.execute(filters);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error al obtener los productos (Público):", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
