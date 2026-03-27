import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { extractErrorMessage } from "@/shared/utils/error-handler";
import { PUBLIC_QUERY_KEYS } from "@/catalog/presentation/constants/query-keys";

export interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  ctaText: string | null;
  ctaUrl: string | null;
  btnBgColor: string | null;
  btnTextColor: string | null;
  order: number;
  isActive: boolean;
  updatedAt: string;
}

export const useSlides = () => {
  return useQuery({
    queryKey: ["admin", "slides"],
    queryFn: async () => {
      const res = await fetch("/api/admin/catalog/slides");
      if (!res.ok) throw new Error("No se pudieron cargar los banners");
      const data = await res.json();
      return data.data as HeroSlide[];
    },
  });
};

export const useSaveSlide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: any) => {
      const url = id
        ? `/api/admin/catalog/slides/${id}`
        : "/api/admin/catalog/slides";
      const method = id ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(
          await extractErrorMessage(res, "Error al guardar el banner"),
        );
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "slides"] });
      queryClient.invalidateQueries({ queryKey: PUBLIC_QUERY_KEYS.SLIDES.ALL });
      toast.success("Banner guardado correctamente");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteSlide = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(`/api/admin/catalog/slides/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(
          await extractErrorMessage(res, "Error al eliminar el banner"),
        );
      }

      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "slides"] });
      queryClient.invalidateQueries({ queryKey: PUBLIC_QUERY_KEYS.SLIDES.ALL });
      toast.success("Banner eliminado correctamente");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
