import { NextResponse } from "next/server";
import { PrismaAdminCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-admin-catalog.repository";
import { UpdateCategoryUseCase } from "@/catalog/application/use-cases/admin/admin.use-cases";

const adminRepo = new PrismaAdminCatalogRepository();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    const category = await adminRepo.getCategoryById(id);

    if (!category) {
      return NextResponse.json({ error: "No encontrada" }, { status: 404 });
    }

    return NextResponse.json(category);
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
    const useCase = new UpdateCategoryUseCase(adminRepo);
    const category = await useCase.execute(id, data);
    return NextResponse.json(category);
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
    const useCase = new UpdateCategoryUseCase(adminRepo);
    const category = await useCase.execute(id, body);
    return NextResponse.json(category);
  } catch (error: any) {
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}
