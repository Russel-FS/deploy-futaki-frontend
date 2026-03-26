import { prisma } from "@/shared/lib/prisma";
import { IPublicCatalogRepository } from "@/catalog/domain/repositories/public-catalog.repository";
import { Category, Product } from "@/catalog/domain/entities/catalog.entity";

export class PrismaPublicCatalogRepository implements IPublicCatalogRepository {
  async getPublicCategories(): Promise<Category[]> {
    return prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
  }

  async getPublicProducts(): Promise<Product[]> {
    return prisma.product.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async getPublicProductsByCategory(categoryId: string): Promise<Product[]> {
    return prisma.product.findMany({
      where: {
        categoryId,
        isActive: true,
      },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async getProductById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
    
    if (product && !product.isActive) {
      return null;
    }
    
    return product;
  }
}
