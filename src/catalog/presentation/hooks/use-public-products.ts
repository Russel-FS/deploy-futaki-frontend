import { useQuery } from "@tanstack/react-query";

export const usePublicProducts = () => {
  return useQuery({
    queryKey: ["public-products"],
    queryFn: () => fetch("/api/catalog/products").then((res) => res.json()),
  });
};
