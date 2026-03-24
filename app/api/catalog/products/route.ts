import { NextResponse } from "next/server";
import { PrismaCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-catalog.repository";
import {
  GetProductsUseCase,
  CreateProductUseCase,
} from "@/catalog/application/use-cases/catalog.use-cases";

const repository = new PrismaCatalogRepository();

export async function GET() {
  try {
    const useCase = new GetProductsUseCase(repository);
    const products = await useCase.execute();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const useCase = new CreateProductUseCase(repository);
    const product = await useCase.execute(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
