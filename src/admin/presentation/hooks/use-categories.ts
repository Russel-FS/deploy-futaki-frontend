import { useQuery } from "@tanstack/react-query";

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
}

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => fetch("/api/catalog/categories").then((res) => res.json()),
  });
};
