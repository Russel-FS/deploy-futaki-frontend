import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "@/shared/ui/toast";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  imageUrl?: string;
  isActive: boolean;
  category: {
    name: string;
  };
}

export const useProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () =>
      fetch("/api/admin/catalog/products").then((res) => res.json()),
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
      if (!res.ok) throw new Error();
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast.success(
        variables.isActive
          ? "Producto activado correctamente"
          : "Producto desactivado correctamente",
      );
    },
    onError: () => {
      toast.error("No se pudo actualizar el estado del producto");
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

      if (!res.ok) throw new Error();
      return res.json();
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      toast.success(
        variables.id
          ? "Producto actualizado correctamente."
          : "Producto registrado correctamente.",
      );
    },
    onError: () => {
      toast.error("Ocurrió un error al guardar el producto.");
    },
  });
};
