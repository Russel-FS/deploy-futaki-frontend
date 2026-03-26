import { useQuery } from "@tanstack/react-query";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
  isActive: boolean;
  category: {
    name: string;
  };
}

interface Category {
  name: string;
}

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => fetch("/api/admin/catalog/categories").then((res) => res.json()),
  });
};

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetch("/api/admin/catalog/products").then((res) => res.json()),
  });
};
