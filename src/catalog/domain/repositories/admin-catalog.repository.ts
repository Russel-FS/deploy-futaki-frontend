import { Category, Product } from "../entities/catalog.entity";

export interface IAdminCatalogRepository {
  // Categorías
  getCategories(): Promise<Category[]>;
  getCategoryById(id: string): Promise<Category | null>;
  createCategory(data: Partial<Category>): Promise<Category>;
  updateCategory(id: string, data: Partial<Category>): Promise<Category>;
  deleteCategory(id: string): Promise<void>;
  toggleCategoryActive(id: string, isActive: boolean): Promise<Category>;

  // Productos
  getProducts(): Promise<Product[]>;
  getProductById(id: string): Promise<Product | null>;
  createProduct(data: Partial<Product>): Promise<Product>;
  updateProduct(id: string, data: Partial<Product>): Promise<Product>;
  deleteProduct(id: string): Promise<void>;
  getProductsByCategory(categoryId: string): Promise<Product[]>;
  toggleProductActive(id: string, isActive: boolean): Promise<Product>;
}
