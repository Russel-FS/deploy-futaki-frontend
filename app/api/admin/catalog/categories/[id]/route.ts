import { NextResponse } from "next/server";
import { PrismaAdminCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-admin-catalog.repository";
import {
  UpdateCategoryUseCase,
  ToggleCategoryActiveUseCase,
} from "@/catalog/application/use-cases/admin/admin.use-cases";

const adminRepo = new PrismaAdminCatalogRepository();

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const category = await adminRepo.getCategoryById(id);

    if (!category) {
      return NextResponse.json(
        { error: "Categoría no encontrada" },
        { status: 404 },
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error al obtener la categoría (Admin):", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const useCase = new UpdateCategoryUseCase(adminRepo);
    const category = await useCase.execute(id, data);
    return NextResponse.json(category);
  } catch (error) {
    console.error("Error al actualizar la categoría (Admin):", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { isActive } = body;
    const useCase = new ToggleCategoryActiveUseCase(adminRepo);
    const category = await useCase.execute(id, isActive);
    return NextResponse.json(category);
  } catch (error: any) {
    console.error("Error al activar/desactivar la categoría (Admin):", error);
    return NextResponse.json(
      { error: error?.message || "Error interno del servidor" },
      { status: 500 },
    );
  }
}
