import {
  useQuery,
  useMutation,
  useQueryClient,
  keepPreviousData,
} from "@tanstack/react-query";
import { toast } from "@/shared/ui/toast";
import { ADMIN_QUERY_KEYS } from "../constants/query-keys";
import { PUBLIC_QUERY_KEYS } from "@/catalog/presentation/constants/query-keys";
import { extractErrorMessage } from "@/shared/utils/error-handler";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
  pdfUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
  category: {
    name: string;
  };
}

export interface PaginatedProductResponse {
  data: Product[];
  total: number;
  page: number;
  limit: number;
}

export interface ProductMetrics {
  total: number;
  active: number;
  featured: number;
  lowStock: number;
}

export const useProductMetrics = () => {
  return useQuery<{ data: ProductMetrics }>({
    queryKey: ADMIN_QUERY_KEYS.PRODUCTS.METRICS,
    queryFn: () =>
      fetch("/api/admin/catalog/products/metrics").then((res) => res.json()),
  });
};

export const useProducts = (
  params: { page?: number; limit?: number; search?: string } = {},
) => {
  const { page = 1, limit = 10, search = "" } = params;

  return useQuery<PaginatedProductResponse>({
    queryKey: [...ADMIN_QUERY_KEYS.PRODUCTS.ALL, { page, limit, search }],
    queryFn: () => {
      const url = new URL(
        "/api/admin/catalog/products",
        window.location.origin,
      );
      url.searchParams.set("page", page.toString());
      url.searchParams.set("limit", limit.toString());
      if (search) url.searchParams.set("search", search);

      return fetch(url.toString()).then((res) => res.json());
    },
    placeholderData: keepPreviousData,
  });
};

export const useToggleProductActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const res = await fetch(`/api/admin/catalog/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });
      if (!res.ok) {
        const msg = await extractErrorMessage(
          res,
          "No se pudo actualizar el estado del producto.",
        );
        throw new Error(msg);
      }
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUERY_KEYS.PRODUCTS.ALL,
      });
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUERY_KEYS.PRODUCTS.METRICS,
      });
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUERY_KEYS.DASHBOARD.STATS,
      });
      queryClient.invalidateQueries({
        queryKey: PUBLIC_QUERY_KEYS.PRODUCTS.ALL,
      });
      queryClient.invalidateQueries({
        queryKey: PUBLIC_QUERY_KEYS.PRODUCTS.FEATURED,
      });
      toast.success(
        variables.isActive
          ? "Producto activado correctamente"
          : "Producto desactivado correctamente",
      );
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "No se pudo actualizar el estado del producto.",
      );
    },
  });
};

export const useToggleProductFeatured = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      isFeatured,
    }: {
      id: string;
      isFeatured: boolean;
    }) => {
      const res = await fetch(`/api/admin/catalog/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured }),
      });
      if (!res.ok) {
        const msg = await extractErrorMessage(
          res,
          "No se pudo actualizar el estado destacado.",
        );
        throw new Error(msg);
      }
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUERY_KEYS.PRODUCTS.ALL,
      });
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUERY_KEYS.PRODUCTS.METRICS,
      });
      queryClient.invalidateQueries({
        queryKey: PUBLIC_QUERY_KEYS.PRODUCTS.ALL,
      });
      queryClient.invalidateQueries({
        queryKey: PUBLIC_QUERY_KEYS.PRODUCTS.FEATURED,
      });
      toast.success(
        variables.isFeatured
          ? "Producto destacado correctamente"
          : "Producto quitado de destacados",
      );
    },
    onError: (error: Error) => {
      toast.error(
        error.message || "No se pudo actualizar el estado destacado.",
      );
    },
  });
};

export const useSaveProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      id?: string;
      name: string;
      description: string;
      price: number;
      stock: number;
      categoryId: string;
      imageUrl?: string | null;
      pdfUrl?: string | null;
      isFeatured?: boolean;
      specs?: any[];
    }) => {
      const { id, ...rest } = data;
      const method = id ? "PUT" : "POST";
      const url = id
        ? `/api/admin/catalog/products/${id}`
        : "/api/admin/catalog/products";

      const res = await fetch(url, {
        method,
        body: JSON.stringify(rest),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) {
        const msg = await extractErrorMessage(
          res,
          "Ocurrió un error al guardar el producto.",
        );
        throw new Error(msg);
      }
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUERY_KEYS.PRODUCTS.ALL,
      });
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUERY_KEYS.PRODUCTS.METRICS,
      });
      queryClient.invalidateQueries({
        queryKey: ADMIN_QUERY_KEYS.DASHBOARD.STATS,
      });
      queryClient.invalidateQueries({
        queryKey: PUBLIC_QUERY_KEYS.PRODUCTS.ALL,
      });
      queryClient.invalidateQueries({
        queryKey: PUBLIC_QUERY_KEYS.PRODUCTS.FEATURED,
      });
      if (variables.id) {
        queryClient.invalidateQueries({
          queryKey: PUBLIC_QUERY_KEYS.PRODUCTS.DETAIL(variables.id),
        });
      }
      toast.success(
        variables.id
          ? "Producto actualizado correctamente."
          : "Producto registrado correctamente.",
      );
    },
    onError: (error: Error) => {
      toast.error(error.message || "Ocurrió un error al guardar el producto.");
    },
  });
};
