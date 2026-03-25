"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Upload,
  X,
  Loader2,
  Tag,
  FileText,
  Image as ImageIcon,
} from "lucide-react";
import Image from "next/image";

interface CategoryFormProps {
  onSuccess: () => void;
  initialData?: any;
}

export const CategoryForm = ({ onSuccess, initialData }: CategoryFormProps) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.imageUrl || null,
  );

  /**
   * Maneja la lógica de creación o actualización de una categoría.
   * @param data - Objeto con el nombre y descripción de la categoría.
   */
  const mutation = useMutation({
    mutationFn: async (data: { name: string; description: string }) => {
      let imageUrl = previewUrl;

      if (selectedFile) {
        const body = new FormData();
        body.append("file", selectedFile);
        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body,
        });
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      const method = initialData ? "PUT" : "POST";
      const url = initialData
        ? `/api/catalog/categories/${initialData.id}`
        : "/api/catalog/categories";

      return fetch(url, {
        method,
        body: JSON.stringify({ ...data, imageUrl }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      onSuccess();
    },
  });

  /**
   * Maneja la selección de un archivo de imagen.
   * @param e - Evento de cambio de archivo.
   */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl && !initialData) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  /**
   * Maneja la eliminación de un archivo de imagen.
   */
  const handleRemoveImage = () => {
    if (previewUrl && !initialData) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  /**
   * Maneja el envío del formulario.
   * @param e - Evento de envío del formulario.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, description });
  };

  const isSubmitting = mutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 text-left">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 flex items-center gap-2 ml-1">
            Nombre de la Categoría
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej. Smartphones"
            className="w-full bg-accent/5 border border-border/5 rounded-2xl p-3.5 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-secondary/20"
          />
        </div>

        {/* Descripción */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 flex items-center gap-2 ml-1">
            Descripción Corta
          </label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Breve descripción para el catálogo..."
            className="w-full bg-accent/5 border border-border/5 rounded-2xl p-3.5 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all placeholder:text-secondary/20 min-h-[80px] resize-none"
          />
        </div>

        {/* Imagen de Categoría */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 flex items-center gap-2 ml-1">
            Imagen de Identidad
          </label>

          <div className="relative group">
            {previewUrl ? (
              <div className="relative h-32 w-full rounded-2xl overflow-hidden border border-border/10 shadow-sm">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex items-center gap-4 p-4 w-full border border-dashed border-border/20 rounded-2xl bg-accent/5 hover:bg-accent/10 transition-all cursor-pointer group/upload">
                <div className="p-3 bg-white dark:bg-white/5 rounded-xl shadow-sm group-hover/upload:scale-105 transition-transform">
                  <Upload
                    className="text-secondary/40 group-hover/upload:text-primary transition-colors"
                    size={20}
                  />
                </div>
                <div>
                  <p className="text-[10px] font-black text-foreground uppercase tracking-widest">
                    Subir Imagen
                  </p>
                  <p className="text-[9px] font-bold text-secondary/40 uppercase tracking-tighter mt-0.5">
                    JPG, PNG Máx 5MB
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onSuccess}
          className="flex-1 py-3 px-6 rounded-xl border border-border/5 text-[11px] font-black uppercase tracking-widest text-secondary hover:bg-accent/5 transition-all"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="flex-2 bg-primary text-primary-foreground py-3 px-6 rounded-xl text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/20 active:scale-95 transition-all disabled:opacity-50"
        >
          {isSubmitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : initialData ? (
            "Actualizar"
          ) : (
            "Crear"
          )}
        </button>
      </div>
    </form>
  );
};
