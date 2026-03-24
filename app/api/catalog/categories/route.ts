import { NextResponse } from "next/server";
import { PrismaCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-catalog.repository";
import {
  GetCategoriesUseCase,
  CreateCategoryUseCase,
} from "@/catalog/application/use-cases/catalog.use-cases";

const repository = new PrismaCatalogRepository();

export async function GET() {
  try {
    const useCase = new GetCategoriesUseCase(repository);
    const categories = await useCase.execute();
    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const useCase = new CreateCategoryUseCase(repository);
    const category = await useCase.execute(data);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
