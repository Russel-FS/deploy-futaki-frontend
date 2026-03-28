"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BlogPost } from "@/blog/domain/models/blog-post.model";
import { toast } from "react-hot-toast";

const QUERY_KEY = ["admin-blog-posts"];

const apiFetch = async (url: string, options?: RequestInit) => {
  const res = await fetch(url, options);
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || "Error en la solicitud");
  }
  return res.json();
};

export const useAdminBlogPosts = () =>
  useQuery<BlogPost[]>({
    queryKey: QUERY_KEY,
    queryFn: () => apiFetch("/api/admin/blog"),
  });

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<BlogPost>) =>
      apiFetch("/api/admin/blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success("Post creado correctamente");
    },
    onError: (err: Error) => toast.error(err.message),
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: Partial<BlogPost> & { id: string }) =>
      apiFetch(`/api/admin/blog/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success("Post actualizado");
    },
    onError: (err: Error) => toast.error(err.message),
  });
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch(`/api/admin/blog/${id}`, { method: "DELETE" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      toast.success("Post eliminado");
    },
    onError: (err: Error) => toast.error(err.message),
  });
};
