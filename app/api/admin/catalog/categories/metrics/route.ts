import { NextResponse, NextRequest } from "next/server";
import { PrismaAdminCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-admin-catalog.repository";

const repository = new PrismaAdminCatalogRepository();

export async function GET(request: NextRequest) {
  try {
    const metrics = await repository.getCategoryMetrics();
    return NextResponse.json({ success: true, data: metrics });
  } catch (error) {
    console.error("Error al obtener métricas de categorías:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener métricas de categorías" },
      { status: 500 },
    );
  }
}
