import { prisma } from "@/shared/lib/prisma";
import { Category, Product } from "../../domain/entities/catalog.entity";
import { ICatalogRepository } from "../../domain/repositories/catalog.repository";

export class PrismaCatalogRepository implements ICatalogRepository {
  async getCategories(): Promise<Category[]> {
    return prisma.category.findMany({
      orderBy: { name: "asc" },
    });
  }

  async getCategoryById(id: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { id },
    });
  }

  async createCategory(data: any): Promise<Category> {
    return prisma.category.create({
      data: {
        name: data.name,
        description: data.description,
      },
    });
  }

  async updateCategory(id: string, data: any): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data,
    });
  }

  async deleteCategory(id: string): Promise<void> {
    await prisma.category.delete({
      where: { id },
    });
  }

  async getProducts(): Promise<Product[]> {
    return prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async getProductById(id: string): Promise<Product | null> {
    return prisma.product.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async createProduct(data: any): Promise<Product> {
    return prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
        imageUrl: data.imageUrl,
        categoryId: data.categoryId,
      },
      include: { category: true },
    });
  }

  async updateProduct(id: string, data: any): Promise<Product> {
    return prisma.product.update({
      where: { id },
      data,
      include: { category: true },
    });
  }

  async deleteProduct(id: string): Promise<void> {
    await prisma.product.delete({
      where: { id },
    });
  }

  async getProductsByCategory(categoryId: string): Promise<Product[]> {
    return prisma.product.findMany({
      where: { categoryId },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  }
}
