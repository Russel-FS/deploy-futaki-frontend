import { NextResponse } from "next/server";
import { PrismaAdminCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-admin-catalog.repository";
import {
  GetAdminProductsUseCase,
  CreateProductUseCase,
} from "@/catalog/application/use-cases/admin/admin.use-cases";

const adminRepo = new PrismaAdminCatalogRepository();

export async function GET() {
  try {
    const useCase = new GetAdminProductsUseCase(adminRepo);
    const products = await useCase.execute();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error al obtener los productos (Admin):", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const useCase = new CreateProductUseCase(adminRepo);
    const product = await useCase.execute(data);
    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error("Error al crear el producto (Admin):", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
