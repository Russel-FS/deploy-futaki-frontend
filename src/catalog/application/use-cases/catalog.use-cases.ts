import { ICatalogRepository } from "@/catalog/domain/repositories/catalog.repository";
import { Product, Category } from "@/catalog/domain/entities/catalog.entity";

export class GetProductsUseCase {
  constructor(private catalogRepository: ICatalogRepository) {}
  async execute() {
    return this.catalogRepository.getProducts();
  }
}

export class GetCategoriesUseCase {
  constructor(private catalogRepository: ICatalogRepository) {}
  async execute() {
    return this.catalogRepository.getCategories();
  }
}

export class CreateProductUseCase {
  constructor(private catalogRepository: ICatalogRepository) {}
  async execute(data: any): Promise<Product> {
    return this.catalogRepository.createProduct(data);
  }
}

export class CreateCategoryUseCase {
  constructor(private catalogRepository: ICatalogRepository) {}
  async execute(data: any): Promise<Category> {
    return this.catalogRepository.createCategory(data);
  }
}
