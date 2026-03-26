import { prisma } from "@/shared/lib/prisma";
import { IAdminCatalogRepository } from "@/catalog/domain/repositories/admin-catalog.repository";
import { Category, Product } from "@/catalog/domain/entities/catalog.entity";

export class PrismaAdminCatalogRepository implements IAdminCatalogRepository {
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

  async createCategory(data: Partial<Category>): Promise<Category> {
    return prisma.category.create({
      data: {
        name: data.name!,
        description: data.description || "",
        imageUrl: data.imageUrl || "",
        isActive: data.isActive ?? true,
      },
    });
  }

  async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
    return prisma.category.update({
      where: { id },
      data: { ...data },
    });
  }

  async deleteCategory(id: string): Promise<void> {
    await prisma.category.delete({
      where: { id },
    });
  }

  async toggleCategoryActive(id: string, isActive: boolean): Promise<Category> {
    try {
      return await prisma.category.update({
        where: { id },
        data: { isActive },
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new Error(`Categoría con ID ${id} no encontrada`);
      }
      throw error;
    }
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
        price: Number(data.price),
        imageUrl: data.imageUrl,
        categoryId: data.categoryId,
        specs: data.specs || [],
        isActive: data.isActive ?? true,
      },
      include: { category: true },
    });
  }

  async updateProduct(id: string, data: any): Promise<Product> {
    const updateData = { ...data };
    if (data.price) updateData.price = Number(data.price);
    
    return prisma.product.update({
      where: { id },
      data: updateData,
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

  async toggleProductActive(id: string, isActive: boolean): Promise<Product> {
    try {
      return await prisma.product.update({
        where: { id },
        data: { isActive },
        include: { category: true },
      });
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new Error(`Producto con ID ${id} no encontrado`);
      }
      throw error;
    }
  }
}
