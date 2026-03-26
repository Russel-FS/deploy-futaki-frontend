import { useQuery } from "@tanstack/react-query";

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  isActive: boolean;
}

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () =>
      fetch("/api/admin/catalog/categories").then((res) => res.json()),
  });
};
