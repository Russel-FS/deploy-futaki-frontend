"use client";

import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ImagePlus, X, Package, Loader2 } from "lucide-react";
import Image from "next/image";
import { useCategories } from "../hooks/use-categories";

interface ProductFormProps {
  onSuccess: () => void;
}

export const ProductForm = ({ onSuccess }: ProductFormProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const { data: categories = [] } = useCategories();

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      let imageUrl: string | undefined;

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

      return fetch("/api/catalog/products", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          price: parseFloat(data.price),
          stock: parseInt(data.stock),
          imageUrl,
        }),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
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
    mutation.mutate(formData);
  };

  const isSubmitting = mutation.isPending;

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-h-[70vh] overflow-y-auto px-1"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5 col-span-2">
          <label className="text-sm font-bold text-secondary">
            Imagen del Producto
          </label>
          <div className="flex items-center gap-4">
            <div className="h-24 w-24 rounded-2xl bg-accent border-2 border-dashed border-border flex items-center justify-center relative overflow-hidden group shrink-0">
              {previewUrl ? (
                <>
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
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
              {selectedFile && (
                <p className="text-xs text-secondary font-medium truncate max-w-[180px]">
                  {selectedFile.name}
                </p>
              )}
              <p className="text-xs text-secondary/60">
                La imagen se subirá al guardar.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-1.5 col-span-2">
          <label className="text-sm font-bold text-secondary">Nombre</label>
          <input
            required
            type="text"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full bg-white border border-border/50 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-secondary">Precio</label>
          <input
            required
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, price: e.target.value }))
            }
            className="w-full bg-white border border-border/50 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-bold text-secondary">
            Stock Inicial
          </label>
          <input
            required
            type="number"
            value={formData.stock}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, stock: e.target.value }))
            }
            className="w-full bg-white border border-border/50 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium"
          />
        </div>

        <div className="space-y-1.5 col-span-2">
          <label className="text-sm font-bold text-secondary">Categoría</label>
          <select
            required
            value={formData.categoryId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, categoryId: e.target.value }))
            }
            className="w-full bg-white border border-border/50 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium appearance-none"
          >
            <option value="">Selecciona una categoría</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1.5 col-span-2">
          <label className="text-sm font-bold text-secondary">
            Descripción
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, description: e.target.value }))
            }
            className="w-full bg-white border border-border/50 rounded-xl py-2.5 px-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium min-h-[80px]"
          />
        </div>
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full bg-primary text-primary-foreground py-3 rounded-2xl font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all shadow-sm mt-4 flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <Loader2 size={16} className="animate-spin" />
            {selectedFile ? "Subiendo imagen..." : "Guardando..."}
          </>
        ) : (
          "Crear Producto"
        )}
      </button>
    </form>
  );
};
