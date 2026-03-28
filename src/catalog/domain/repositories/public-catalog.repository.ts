import { Category, Product } from "../entities/catalog.entity";

export interface ProductFilters {
  q?: string;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  sort?: "newest" | "price-asc" | "price-desc" | "name-asc" | "name-desc";
}

export interface IPublicCatalogRepository {
  getPublicCategories(): Promise<Category[]>;
  getPublicProducts(): Promise<Product[]>;
  getFeaturedCategories(): Promise<Category[]>;
  getFeaturedProducts(): Promise<Product[]>;
  getPublicProductsByCategory(categoryId: string): Promise<Product[]>;
  getFilteredProducts(filters: ProductFilters): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  getCategoryById(id: string): Promise<Category | null>;
}
