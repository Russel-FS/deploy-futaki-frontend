import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/shared/ui/toast";

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

export const useSaveCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      name,
      description,
      imageUrl,
    }: {
      id?: string;
      name: string;
      description: string;
      imageUrl?: string | null;
    }) => {
      const method = id ? "PUT" : "POST";
      const url = id
        ? `/api/admin/catalog/categories/${id}`
        : "/api/admin/catalog/categories";

      const res = await fetch(url, {
        method,
        body: JSON.stringify({ name, description, imageUrl }),
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
