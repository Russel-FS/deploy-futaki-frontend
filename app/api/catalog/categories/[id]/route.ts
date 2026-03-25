import { NextResponse } from "next/server";
import { PrismaCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-catalog.repository";
import { UpdateCategoryUseCase } from "@/catalog/application/use-cases/catalog.use-cases";

const repository = new PrismaCatalogRepository();

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = params;
    const data = await request.json();
    const useCase = new UpdateCategoryUseCase(repository);
    const category = await useCase.execute(id, data);
    return NextResponse.json(category);
  } catch (error) {
    console.error("Error al actualizar la categoría:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
