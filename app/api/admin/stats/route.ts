import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET() {
  try {
    const [categoriesCount, productsCount, adminsCount] = await Promise.all([
      prisma.category.count(),
      prisma.product.count(),
      prisma.admin.count(),
    ]);

    return NextResponse.json({
      categories: categoriesCount,
      products: productsCount,
      admins: adminsCount,
    });
  } catch (error) {
    console.error("Error al obtener las estadísticas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
