import { useQuery } from "@tanstack/react-query";

interface Category {
  id: string;
  name: string;
  description?: string;
}

export const useCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: () => fetch("/api/catalog/categories").then((res) => res.json()),
  });
};
