import { prisma } from "@/shared/lib/prisma";
import { IAdminCatalogRepository, PaginatedResult } from "@/catalog/domain/repositories/admin-catalog.repository";
import { Category, Product } from "@/catalog/domain/entities/catalog.entity";

export class PrismaAdminCatalogRepository implements IAdminCatalogRepository {
  async getCategories(params: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResult<Category>> {
    const { page = 1, limit = 10, search = "" } = params;
    const skip = (page - 1) * limit;

    const where = search
      ? { name: { contains: search, mode: "insensitive" as any } }
      : {};

    const [total, data] = await Promise.all([
      prisma.category.count({ where }),
      prisma.category.findMany({
        where,
        skip,
        take: limit,
        orderBy: { name: "asc" },
      }),
    ]);

    return { data, total, page, limit };
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
        isFeatured: data.isFeatured ?? false,
        isActive: data.isActive ?? true,
      },
    });
  }

  async updateCategory(id: string, data: Partial<Category>): Promise<Category> {
    const { id: _, ...updateData } = data;
    return prisma.category.update({
      where: { id },
      data: updateData as any,
    });
  }

  async deleteCategory(id: string): Promise<void> {
    await prisma.category.delete({
      where: { id },
    });
  }

  async getProducts(params: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResult<Product>> {
    const { page = 1, limit = 10, search = "" } = params;
    const skip = (page - 1) * limit;

    const where = search
      ? { 
          OR: [
            { name: { contains: search, mode: "insensitive" as any } },
            { description: { contains: search, mode: "insensitive" as any } }
          ]
        }
      : {};

    const [total, data] = await Promise.all([
      prisma.product.count({ where }),
      prisma.product.findMany({
        where,
        skip,
        take: limit,
        include: { category: true },
        orderBy: { createdAt: "desc" },
      }),
    ]);

    return { data, total, page, limit };
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
        stock: Number(data.stock),
        imageUrl: data.imageUrl,
        categoryId: data.categoryId,
        specs: data.specs || [],
        isFeatured: data.isFeatured ?? false,
        isActive: data.isActive ?? true,
      },
      include: { category: true },
    });
  }

  async updateProduct(id: string, data: any): Promise<Product> {
    const { id: _, category: __, ...rest } = data;
    const updateData = { ...rest };
    
    if (data.price !== undefined) updateData.price = Number(data.price);
    if (data.stock !== undefined) updateData.stock = Number(data.stock);
    
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
      where: { categoryId, isActive: true },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });
  }
}
