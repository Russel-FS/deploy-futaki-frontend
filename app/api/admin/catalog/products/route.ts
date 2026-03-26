import { NextResponse, NextRequest } from "next/server";
import { PrismaAdminCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-admin-catalog.repository";
import {
  GetAdminProductsUseCase,
  CreateProductUseCase,
} from "@/catalog/application/use-cases/admin/admin.use-cases";

const adminRepo = new PrismaAdminCatalogRepository();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

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
