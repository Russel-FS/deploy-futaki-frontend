import { NextResponse, NextRequest } from "next/server";
import { PrismaAdminCatalogRepository } from "@/catalog/infrastructure/repositories/prisma-admin-catalog.repository";

const repository = new PrismaAdminCatalogRepository();

export async function GET(request: NextRequest) {
  try {
    const metrics = await repository.getProductMetrics();
    return NextResponse.json({ success: true, data: metrics });
  } catch (error) {
    console.error("Error al obtener métricas de productos:", error);
    return NextResponse.json(
      { success: false, error: "Error al obtener métricas de productos" },
      { status: 500 },
    );
  }
}
