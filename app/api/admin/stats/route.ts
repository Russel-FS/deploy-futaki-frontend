import { NextResponse } from "next/server";
import { prisma } from "@/shared/lib/prisma";

export async function GET() {
  try {
    const [
      categoriesCount,
      productsCount,
      adminsCount,
      categoriesWithCounts,
      recentProducts,
    ] = await Promise.all([
      prisma.category.count(),
      prisma.product.count(),
      prisma.admin.count(),
      prisma.category.findMany({
        where: { isActive: true },
        include: { _count: { select: { products: true } } },
      }),
      prisma.product.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        include: { category: { select: { name: true } } },
      }),
    ]);

    const productsByCategory = categoriesWithCounts
      .map((cat) => ({
        name: cat.name,
        count: cat._count.products,
      }))
      .filter((cat) => cat.count > 0)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return NextResponse.json({
      categories: categoriesCount,
      products: productsCount,
      admins: adminsCount,
      productsByCategory,
      recentProducts,
    });
  } catch (error) {
    console.error("Error al obtener las estadísticas:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 },
    );
  }
}
