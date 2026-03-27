import { Category, Product } from "../entities/catalog.entity";

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface CategoryMetrics {
  total: number;
  active: number;
  featured: number;
}

export interface ProductMetrics {
  total: number;
  active: number;
  featured: number;
  lowStock: number;
}

export interface IAdminCatalogRepository {
  // Categorías
  getCategories(params: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResult<Category>>;
  
  getCategoryById(id: string): Promise<Category | null>;
  createCategory(data: Partial<Category>): Promise<Category>;
  updateCategory(id: string, data: Partial<Category>): Promise<Category>;
  deleteCategory(id: string): Promise<void>;
  getCategoryMetrics(): Promise<CategoryMetrics>;

  // Productos
  getProducts(params: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<PaginatedResult<Product>>;
  
  getProductById(id: string): Promise<Product | null>;
  createProduct(data: Partial<Product>): Promise<Product>;
  updateProduct(id: string, data: Partial<Product>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  getProductMetrics(): Promise<ProductMetrics>;
}
