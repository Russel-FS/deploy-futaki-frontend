"use client";

import React, { useState } from "react";
import { Upload, X, Loader2 } from "lucide-react";
import Image from "next/image";
import { Input, TextArea } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";
import { Button } from "@/shared/ui/button";
import { toast } from "@/shared/ui/toast";
import { useSaveCategory } from "../hooks/use-categories";

interface CategoryFormProps {
  onSuccess: () => void;
  initialData?: any;
}

export const CategoryForm = ({ onSuccess, initialData }: CategoryFormProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [isFeatured, setIsFeatured] = useState(initialData?.isFeatured || false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.imageUrl || null,
  );

  const mutation = useSaveCategory();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (previewUrl && !initialData) URL.revokeObjectURL(previewUrl);
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    if (previewUrl && !initialData) URL.revokeObjectURL(previewUrl);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let imageUrl = previewUrl;

    if (selectedFile) {
      const body = new FormData();
      body.append("file", selectedFile);
      try {
        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body,
        });
        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      } catch (error) {
        toast.error("Error al subir la imagen.");
        return;
      }
    }

    mutation.mutate({ 
      id: initialData?.id, 
      name, 
      description, 
      imageUrl,
      isFeatured, 
    }, {
      onSuccess: () => onSuccess()
    });
  };

  const isSubmitting = mutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4 text-left">
        <Input
          label="Nombre de la Categoría"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ej. Smartphones"
        />

        <TextArea
          label="Descripción Corta"
          rows={2}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Breve descripción para el catálogo..."
        />

        <div className="space-y-2">
          <label className="text-[11px] font-semibold text-secondary/50 ml-1 flex items-center gap-2">
            Imagen de Identidad
          </label>

          <div className="relative group">
            {previewUrl ? (
              <div className="relative h-32 w-full rounded-2xl overflow-hidden border border-border/10">
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
              <label className="flex items-center gap-4 p-4 w-full border border-dashed border-border/20 rounded-2xl bg-system-gray-6 hover:bg-accent/50 transition-all cursor-pointer group/upload">
                <div className="p-3 bg-white rounded-xl border border-border/5 group-hover/upload:scale-105 transition-transform">
                  <Upload
                    className="text-secondary/30 group-hover/upload:text-primary transition-colors"
                    size={20}
                  />
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-foreground">
                    Subir Imagen
                  </p>
                  <p className="text-[10px] font-medium text-secondary/40 mt-0.5">
                    Recomendado: 1200x800px
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

        <div className="flex items-center justify-between p-4 bg-system-gray-6/30 rounded-2xl border border-border/5">
          <div>
            <p className="text-[12px] font-semibold text-foreground">Principal / Destacado</p>
            <p className="text-[10px] text-secondary/40 font-medium">Mostrar en la pantalla de inicio principal.</p>
          </div>
          <Switch 
            checked={isFeatured} 
            onChange={setIsFeatured} 
          />
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onSuccess}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button type="submit" disabled={isSubmitting} className="flex-2">
          {isSubmitting ? (
            <Loader2 size={16} className="animate-spin" />
          ) : initialData ? (
            "Actualizar"
          ) : (
            "Crear"
          )}
        </Button>
      </div>
    </form>
  );
};
