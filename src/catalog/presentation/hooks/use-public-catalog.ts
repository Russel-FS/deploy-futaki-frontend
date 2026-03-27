import { useQuery, keepPreviousData } from "@tanstack/react-query";

/**
 * Hook para obtener categorías públicas
 */
export const usePublicCategories = () => {
  return useQuery({
    queryKey: ["public-categories"],
    queryFn: () => fetch("/api/catalog/categories").then((res) => res.json()),
  });
};

/**
 * Hook para obtener categorÃ­as destacadas
 */
export const useFeaturedCategories = () => {
  return useQuery({
    queryKey: ["featured-categories"],
    queryFn: () =>
      fetch("/api/catalog/categories/featured").then((res) => res.json()),
    placeholderData: keepPreviousData,
  });
};

/**
 * Hook para obtener productos
 */
export const usePublicProducts = (categoryId?: string) => {
  return useQuery({
    queryKey: ["public-products", categoryId],
    queryFn: () => {
      const url = categoryId
        ? `/api/catalog/products?categoryId=${categoryId}`
        : "/api/catalog/products";
      return fetch(url).then((res) => res.json());
    },
    placeholderData: keepPreviousData,
  });
};

/**
 * Hook para obtener productos destacados
 */
export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["featured-products"],
    queryFn: () =>
      fetch("/api/catalog/products/featured").then((res) => res.json()),
    placeholderData: keepPreviousData,
  });
};

/**
 * Hook para obtener un producto individual por ID
 */
export const usePublicProduct = (id: string) => {
  return useQuery({
    queryKey: ["public-product", id],
    queryFn: () =>
      fetch(`/api/catalog/products/${id}`).then((res) => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      }),
    enabled: !!id,
  });
};
