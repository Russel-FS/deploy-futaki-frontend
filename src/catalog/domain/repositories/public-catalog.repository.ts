import { Category, Product } from "../entities/catalog.entity";

export interface IPublicCatalogRepository {
  getPublicCategories(): Promise<Category[]>;
  getPublicProducts(): Promise<Product[]>;
  getPublicProductsByCategory(categoryId: string): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
}
