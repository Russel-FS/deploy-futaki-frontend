export interface Category {
  id: string;
  name: string;
  description?: string | null;
  imageUrl?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string | null;
  price: number;
  stock: number;
  imageUrl?: string | null;
  specs?: ProductSpec[] | any | null;
  categoryId: string;
  category?: Category;
  createdAt: Date;
  updatedAt: Date;
}
