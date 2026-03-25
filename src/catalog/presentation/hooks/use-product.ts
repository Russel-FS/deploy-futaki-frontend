import { useQuery } from "@tanstack/react-query";

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => fetch(`/api/catalog/products/${id}`).then((res) => res.json()),
    enabled: !!id,
  });
};
