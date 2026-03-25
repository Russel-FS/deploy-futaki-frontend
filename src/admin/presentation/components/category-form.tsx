"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, X, Package, Loader2 } from "lucide-react";
import Image from "next/image";

interface CategoryFormProps {
  onSuccess: () => void;
}

export const CategoryForm = ({ onSuccess }: CategoryFormProps) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (data: { name: string; description: string; imageUrl?: string }) => {
      let imageUrl = data.imageUrl;

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

      return fetch("/api/catalog/categories", {
        method: "POST",
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-h-[70vh] overflow-y-auto px-1">
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-secondary">Imagen de la Categoría</label>
        <div className="flex items-center gap-4">
          <div className="h-24 w-24 rounded-2xl bg-accent border-2 border-dashed border-border flex items-center justify-center relative overflow-hidden group shrink-0">
            {previewUrl ? (
              <>
                <Image src={previewUrl} alt="Preview" fill className="object-cover" unoptimized />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white"
                >
                  <X size={20} />
                </button>
              </>
            ) : (
              <Package size={24} className="text-secondary/30" />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="bg-accent hover:bg-border transition-colors px-4 py-2 rounded-xl text-sm font-bold cursor-pointer inline-flex items-center gap-2">
              <ImagePlus size={16} />
              {selectedFile ? "Cambiar imagen" : "Seleccionar imagen"}
              <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
            </label>
            <p className="text-xs text-secondary/60">Se mostrará en la navegación del catálogo.</p>
          </div>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-bold text-secondary">Nombre de la Categoría</label>
        <input
          required
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej: Smartphones, Accesorios..."
          className="w-full bg-white border border-border/50 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-bold text-secondary">Descripción (Opcional)</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe de qué trata esta categoría..."
          className="w-full bg-white border border-border/50 rounded-xl py-2.5 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium min-h-[100px]"
        />
      </div>
      <button
        disabled={mutation.isPending}
        type="submit"
        className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all shadow-sm flex items-center justify-center gap-2"
      >
        {mutation.isPending ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {selectedFile ? "Subiendo imagen..." : "Guardando..."}
          </>
        ) : (
          "Crear Categoría"
        )}
      </button>
    </form>
  );
};
