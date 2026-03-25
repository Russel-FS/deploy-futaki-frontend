import { NextResponse } from "next/server";
import { PrismaCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-catalog.repository";
import { GetProductByIdUseCase } from "@/catalog/application/use-cases/catalog.use-cases";

const repository = new PrismaCatalogRepository();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const useCase = new GetProductByIdUseCase(repository);
    const product = await useCase.execute(id);

    if (!product) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
