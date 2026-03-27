import { NextResponse } from "next/server";
import { PrismaPublicCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-public-catalog.repository";
import { GetProductByIdUseCase } from "@/catalog/application/use-cases/public/public.use-cases";

const publicRepo = new PrismaPublicCatalogRepository();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const useCase = new GetProductByIdUseCase(publicRepo);
    const product = await useCase.execute(id);

    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado o inactivo" },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error al obtener el producto (Público):", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
