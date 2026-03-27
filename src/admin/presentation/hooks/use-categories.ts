import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { toast } from "@/shared/ui/toast";

export interface Category {
  id: string;
  name: string;
  description?: string;
  imageUrl?: string;
  isFeatured: boolean;
  isActive: boolean;
}

export interface PaginatedCategoryResponse {
  data: Category[];
  total: number;
  page: number;
  limit: number;
}

export const useCategories = (params: { page?: number; limit?: number; search?: string } = {}) => {
  const { page = 1, limit = 10, search = "" } = params;
  
  return useQuery<PaginatedCategoryResponse>({
    queryKey: ["categories", { page, limit, search }],
    queryFn: () => {
      const url = new URL("/api/admin/catalog/categories", window.location.origin);
      url.searchParams.set("page", page.toString());
      url.searchParams.set("limit", limit.toString());
      if (search) url.searchParams.set("search", search);
      
      return fetch(url.toString()).then((res) => res.json());
    },
    placeholderData: keepPreviousData,
  });
};

export const useToggleCategoryActive = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isActive }: { id: string; isActive: boolean }) => {
      const res = await fetch(`/api/admin/catalog/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive }),
      });
      if (!res.ok) throw new Error();
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast.success(
        variables.isActive
          ? "Categoría activada correctamente"
          : "Categoría desactivada correctamente",
      );
    },
    onError: () => {
      toast.error("No se pudo actualizar el estado de la categoría");
    },
  });
};

export const useToggleCategoryFeatured = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, isFeatured }: { id: string; isFeatured: boolean }) => {
      const res = await fetch(`/api/admin/catalog/categories/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isFeatured }),
      });
      if (!res.ok) throw new Error();
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["featured-categories"] });
      toast.success(
        variables.isFeatured
          ? "Categoría destacada correctamente"
          : "Categoría quitada de destacados",
      );
    },
    onError: () => {
      toast.error("No se pudo actualizar el estado destacado");
    },
  });
};

export const useSaveCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      description,
      imageUrl,
      isFeatured,
    }: {
      id?: string;
      name: string;
      description: string;
      imageUrl?: string | null;
      isFeatured?: boolean;
    }) => {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `/api/admin/catalog/categories/${id}`
        : "/api/admin/catalog/categories";

      const res = await fetch(url, {
        method,
        body: JSON.stringify({ name, description, imageUrl, isFeatured }),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error();
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast.success(
        variables.id
          ? "Categoría actualizada correctamente."
          : "Categoría creada correctamente.",
      );
    },
    onError: () => {
      toast.error("Ocurrió un error al guardar la categoría.");
    },
  });
};
