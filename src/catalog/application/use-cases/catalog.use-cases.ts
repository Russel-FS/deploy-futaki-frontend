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
  constructor(private repository: ICatalogRepository) {}
  async execute(data: any): Promise<Product> {
    return this.repository.createProduct(data);
  }
}

export class GetProductByIdUseCase {
  constructor(private repository: ICatalogRepository) {}
  async execute(id: string): Promise<Product | null> {
    return this.repository.getProductById(id);
  }
}

export class CreateCategoryUseCase {
  constructor(private catalogRepository: ICatalogRepository) {}
  async execute(data: any): Promise<Category> {
    return this.catalogRepository.createCategory(data);
  }
}

export class UpdateCategoryUseCase {
  constructor(private repository: ICatalogRepository) {}
  async execute(id: string, data: any): Promise<Category> {
    return this.repository.updateCategory(id, data);
  }
}

export class UpdateProductUseCase {
  constructor(private repository: ICatalogRepository) {}
  async execute(id: string, data: any): Promise<Product> {
    return this.repository.updateProduct(id, data);
  }
}
