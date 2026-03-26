import { NextResponse, NextRequest } from "next/server";
import { PrismaAdminCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-admin-catalog.repository";
import {
  GetAdminCategoriesUseCase,
  CreateCategoryUseCase,
} from "@/catalog/application/use-cases/admin/admin.use-cases";

const adminRepo = new PrismaAdminCatalogRepository();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const search = searchParams.get("search") || "";

    const useCase = new GetAdminCategoriesUseCase(adminRepo);
    const result = await useCase.execute({ page, limit, search });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error("Error al obtener las categorías (Admin):", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const useCase = new CreateCategoryUseCase(adminRepo);
    const category = await useCase.execute(data);
    return NextResponse.json(category, { status: 201 });
  } catch (error) {
    console.error("Error al crear la categoría (Admin):", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
