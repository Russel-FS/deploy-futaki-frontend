import { NextResponse, NextRequest } from "next/server";
import { PrismaAdminCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-admin-catalog.repository";
import {
  GetAdminProductsUseCase,
  CreateProductUseCase,
} from "@/catalog/application/use-cases/admin/admin.use-cases";
import { validateCreateProduct } from "@/catalog/application/validation/catalog.validation";

const adminRepo = new PrismaAdminCatalogRepository();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    if (isNaN(page) || page < 1) {
      return NextResponse.json(
        { error: "El parámetro 'page' debe ser un número positivo." },
        { status: 400 },
      );
    }
    if (isNaN(limit) || limit < 1 || limit > 100) {
      return NextResponse.json(
        { error: "El parámetro 'limit' debe ser un número entre 1 y 100." },
        { status: 400 },
      );
    }

    const useCase = new GetAdminProductsUseCase(adminRepo);
    const result = await useCase.execute({ page, limit, search });

    return NextResponse.json(result);
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

    const { errors } = validateCreateProduct(data);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 422 });
    }

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
