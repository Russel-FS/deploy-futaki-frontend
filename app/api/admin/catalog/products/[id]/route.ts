import { NextResponse } from "next/server";
import { PrismaAdminCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-admin-catalog.repository";
import { UpdateProductUseCase } from "@/catalog/application/use-cases/admin/admin.use-cases";

const adminRepo = new PrismaAdminCatalogRepository();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const product = await adminRepo.getProductById(id);

    if (!product) {
      return NextResponse.json({ error: "No encontrado" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const data = await request.json();
    const useCase = new UpdateProductUseCase(adminRepo);
    const product = await useCase.execute(id, data);
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const useCase = new UpdateProductUseCase(adminRepo);
    const product = await useCase.execute(id, body);
    return NextResponse.json(product);
  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message || "Internal Error" }, { status: 500 });
  }
}
