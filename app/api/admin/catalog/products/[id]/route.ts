import { NextResponse } from "next/server";
import { PrismaAdminCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-admin-catalog.repository";
import { UpdateProductUseCase } from "@/catalog/application/use-cases/admin/admin.use-cases";
import { validateUpdateProduct } from "@/catalog/application/validation/catalog.validation";

const adminRepo = new PrismaAdminCatalogRepository();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    if (!id?.trim()) {
      return NextResponse.json(
        { error: "El ID del producto es requerido." },
        { status: 400 },
      );
    }

    const product = await adminRepo.getProductById(id);
    if (!product) {
      return NextResponse.json(
        { error: "Producto no encontrado." },
        { status: 404 },
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error al obtener el producto:", error);
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
        { error: "El ID del producto es requerido." },
        { status: 400 },
      );
    }

    const data = await request.json();
    const { errors } = validateUpdateProduct(data);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 422 });
    }

    const useCase = new UpdateProductUseCase(adminRepo);
    const product = await useCase.execute(id, data);
    return NextResponse.json(product);
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
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
        { error: "El ID del producto es requerido." },
        { status: 400 },
      );
    }

    const body = await request.json();
    const { errors } = validateUpdateProduct(body);
    if (errors.length > 0) {
      return NextResponse.json({ errors }, { status: 422 });
    }

    const useCase = new UpdateProductUseCase(adminRepo);
    const product = await useCase.execute(id, body);
    return NextResponse.json(product);
  } catch (error: any) {
    console.error("Error al hacer patch al producto:", error);
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 },
    );
  }
}
