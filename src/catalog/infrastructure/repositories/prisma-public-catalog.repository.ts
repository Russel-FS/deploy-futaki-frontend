import { prisma } from "@/shared/lib/prisma";
import {
  IPublicCatalogRepository,
  ProductFilters,
} from "@/catalog/domain/repositories/public-catalog.repository";
import { Category, Product } from "@/catalog/domain/entities/catalog.entity";

export class PrismaPublicCatalogRepository implements IPublicCatalogRepository {
  async getPublicCategories(): Promise<Category[]> {
    return prisma.category.findMany({
      where: { isActive: true },
      orderBy: { name: "asc" },
    });
  }

  async getFeaturedCategories(): Promise<Category[]> {
    return prisma.category.findMany({
      where: { isActive: true, isFeatured: true },
      take: 10,
      orderBy: { updatedAt: "desc" },
    });
  }

  async getPublicProducts(): Promise<Product[]> {
    return prisma.product.findMany({
      where: { isActive: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async getFeaturedProducts(): Promise<Product[]> {
    return prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      take: 10,
      include: { category: true },
      orderBy: { updatedAt: "desc" },
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

  async getFilteredProducts(filters: ProductFilters): Promise<Product[]> {
    const { q, categoryId, minPrice, maxPrice, sort } = filters;

    const where: any = {
      isActive: true,
    };

    if (q) {
      where.OR = [
        { name: { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
        { category: { name: { contains: q, mode: "insensitive" } } },
      ];
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    let orderBy: any = { createdAt: "desc" };
    if (sort === "price-asc") orderBy = { price: "asc" };
    if (sort === "price-desc") orderBy = { price: "desc" };
    if (sort === "name-asc") orderBy = { name: "asc" };
    if (sort === "name-desc") orderBy = { name: "desc" };
    if (sort === "newest") orderBy = { createdAt: "desc" };

    return prisma.product.findMany({
      where,
      orderBy,
      include: { category: true },
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

  async getCategoryById(id: string): Promise<Category | null> {
    const category = await prisma.category.findUnique({
      where: { id },
    });

    if (category && !category.isActive) {
      return null;
    }

    return category;
  }
}
