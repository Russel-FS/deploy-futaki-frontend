import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { PUBLIC_QUERY_KEYS } from "../constants/query-keys";

/**
 * Hook para obtener categorías públicas
 */
export const usePublicCategories = () => {
  return useQuery({
    queryKey: PUBLIC_QUERY_KEYS.CATEGORIES.ALL,
    queryFn: () => fetch("/api/catalog/categories").then((res) => res.json()),
  });
};

/**
 * Hook para obtener categorÃ­as destacadas
 */
export const useFeaturedCategories = () => {
  return useQuery({
    queryKey: PUBLIC_QUERY_KEYS.CATEGORIES.FEATURED,
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
    queryKey: [...PUBLIC_QUERY_KEYS.PRODUCTS.ALL, categoryId],
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
    queryKey: PUBLIC_QUERY_KEYS.PRODUCTS.FEATURED,
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
    queryKey: PUBLIC_QUERY_KEYS.PRODUCTS.DETAIL(id),
    queryFn: () =>
      fetch(`/api/catalog/products/${id}`).then((res) => {
        if (!res.ok) throw new Error("Producto no encontrado");
        return res.json();
      }),
    enabled: !!id,
  });
};

/**
 * Hook para obtener slides del carrusel
 */
export const usePublicSlides = () => {
  return useQuery({
    queryKey: PUBLIC_QUERY_KEYS.SLIDES.ALL,
    queryFn: () =>
      fetch("/api/catalog/slides").then((res) => {
        if (!res.ok) throw new Error("No se pudieron cargar los banners");
        return res.json().then((d) => d.data);
      }),
  });
};

/**
 * Hook para obtener productos filtrados
 */
export const useFilteredProducts = (filters: any) => {
  return useQuery({
    queryKey: [...PUBLIC_QUERY_KEYS.PRODUCTS.ALL, filters],
    queryFn: () => {
      const params = new URLSearchParams();
      if (filters.q) params.append("q", filters.q);
      if (filters.categoryId) params.append("categoryId", filters.categoryId);
      if (filters.minPrice) params.append("minPrice", filters.minPrice.toString());
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
      if (filters.sort) params.append("sort", filters.sort);

      return fetch(`/api/catalog/products?${params.toString()}`).then((res) => {
        if (!res.ok) throw new Error("Error al buscar productos");
        return res.json();
      });
    },
    placeholderData: keepPreviousData,
  });
};
