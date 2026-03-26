import { IAdminCatalogRepository } from "@/catalog/domain/repositories/admin-catalog.repository";
import { Product, Category } from "@/catalog/domain/entities/catalog.entity";

export class GetAdminProductsUseCase {
  constructor(private catalogRepository: IAdminCatalogRepository) {}
  async execute() {
    return this.catalogRepository.getProducts();
  }
}

export class GetAdminCategoriesUseCase {
  constructor(private catalogRepository: IAdminCatalogRepository) {}
  async execute() {
    return this.catalogRepository.getCategories();
  }
}

export class CreateProductUseCase {
  constructor(private repository: IAdminCatalogRepository) {}
  async execute(data: any): Promise<Product> {
    return this.repository.createProduct(data);
  }
}

export class CreateCategoryUseCase {
  constructor(private catalogRepository: IAdminCatalogRepository) {}
  async execute(data: any): Promise<Category> {
    return this.catalogRepository.createCategory(data);
  }
}

export class UpdateCategoryUseCase {
  constructor(private repository: IAdminCatalogRepository) {}
  async execute(id: string, data: any): Promise<Category> {
    return this.repository.updateCategory(id, data);
  }
}

export class UpdateProductUseCase {
  constructor(private repository: IAdminCatalogRepository) {}
  async execute(id: string, data: any): Promise<Product> {
    return this.repository.updateProduct(id, data);
  }
}
