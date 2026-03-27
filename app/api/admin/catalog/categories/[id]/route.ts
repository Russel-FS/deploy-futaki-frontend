import { NextResponse } from "next/server";
import { PrismaAdminCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-admin-catalog.repository";
import { UpdateCategoryUseCase } from "@/catalog/application/use-cases/admin/admin.use-cases";
import { validateUpdateCategory } from "@/catalog/application/validation/catalog.validation";

const adminRepo = new PrismaAdminCatalogRepository();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id?.trim()) {
      return NextResponse.json(
        { error: "El ID de la categoría es requerido." },
        { status: 400 },
      );
    }

    const category = await adminRepo.getCategoryById(id);
    if (!category) {
      return NextResponse.json(
        { error: "Categoría no encontrada." },
        { status: 404 },
      );
    }

    return NextResponse.json(category);
  } catch (error) {
    console.error("Error al obtener la categoría:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id?.trim()) {
      return NextResponse.json(
        { error: "El ID de la categoría es requerido." },
        { status: 400 },
      );
    }

    const data = await request.json();
    const { errors } = validateUpdateCategory(data);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 422 });
    }

    const useCase = new UpdateCategoryUseCase(adminRepo);
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

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id?.trim()) {
      return NextResponse.json(
        { error: "El ID de la categoría es requerido." },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { errors } = validateUpdateCategory(body);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 422 });
    }

    const useCase = new UpdateCategoryUseCase(adminRepo);
    const category = await useCase.execute(id, body);
    return NextResponse.json(category);
  } catch (error: any) {
    console.error("Error al hacer patch a la categoría:", error);
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 },
    );
  }
}
