import { useQuery } from "@tanstack/react-query";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
  category: {
    name: string;
  };
}

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => fetch("/api/catalog/products").then((res) => res.json()),
  });
};
