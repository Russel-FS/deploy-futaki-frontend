import { IPublicCatalogRepository } from "@/catalog/domain/repositories/public-catalog.repository";
import { Product, Category } from "@/catalog/domain/entities/catalog.entity";

export class GetPublicCategoriesUseCase {
  constructor(private catalogRepository: IPublicCatalogRepository) {}
  async execute(): Promise<Category[]> {
    return this.catalogRepository.getPublicCategories();
  }
}

export class GetPublicProductsUseCase {
  constructor(private catalogRepository: IPublicCatalogRepository) {}
  async execute(): Promise<Product[]> {
    return this.catalogRepository.getPublicProducts();
  }
}

export class GetFeaturedCategoriesUseCase {
  constructor(private catalogRepository: IPublicCatalogRepository) {}
  async execute(): Promise<Category[]> {
    return this.catalogRepository.getFeaturedCategories();
  }
}

export class GetFeaturedProductsUseCase {
  constructor(private catalogRepository: IPublicCatalogRepository) {}
  async execute(): Promise<Product[]> {
    return this.catalogRepository.getFeaturedProducts();
  }
}

export class GetPublicProductsByCategoryUseCase {
  constructor(private catalogRepository: IPublicCatalogRepository) {}
  async execute(categoryId: string): Promise<Product[]> {
    return this.catalogRepository.getPublicProductsByCategory(categoryId);
  }
}

export class GetProductByIdUseCase {
  constructor(private repository: IPublicCatalogRepository) {}
  async execute(id: string): Promise<Product | null> {
    const product = await this.repository.getProductById(id);
    if (product && !product.isActive) {
      return null;
    }
    return product;
  }
}
