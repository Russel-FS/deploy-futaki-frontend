"use client";

import React, { useState, useEffect } from "react";
import { BlogPost } from "@/blog/domain/models/blog-post.model";
import { Input, TextArea } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { Switch } from "@/shared/ui/switch";
import { Upload, X, FileText, Globe, Lock } from "lucide-react";
import Image from "next/image";

interface BlogFormProps {
  initialData?: BlogPost | null;
  onSuccess: () => void;
  onSubmit: (data: Partial<BlogPost>) => void;
  isSubmitting: boolean;
}

const generateSlug = (title: string) =>
  title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

export const BlogForm = ({
  initialData,
  onSuccess,
  onSubmit,
  isSubmitting,
}: BlogFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title ?? "",
    slug: initialData?.slug ?? "",
    content: initialData?.content ?? "",
    excerpt: initialData?.excerpt ?? "",
    isPublished: initialData?.isPublished ?? false,
    imageUrl: initialData?.imageUrl ?? "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.imageUrl ?? null,
  );
  const [uploadingImage, setUploadingImage] = useState(false);
  const [slugEdited, setSlugEdited] = useState(false);

  useEffect(() => {
    if (!slugEdited && !initialData) {
      setFormData((prev) => ({ ...prev, slug: generateSlug(prev.title) }));
    }
  }, [formData.title, slugEdited, initialData]);

  /**
   * Maneja el cambio de la imagen de portada
   * @param e Evento de cambio de archivo
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  /**
   * Maneja el envío del formulario
   * @param e Evento de envío del formulario
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrl = formData.imageUrl;

    if (selectedFile) {
      setUploadingImage(true);
      const body = new FormData();
      body.append("file", selectedFile);
      try {
        const res = await fetch("/api/admin/upload", { method: "POST", body });
        const data = await res.json();
        imageUrl = data.url;
      } catch {}
      setUploadingImage(false);
    }

    /**
     * Envía el formulario al callback
     * @param data Datos del formulario
     */
    onSubmit({
      ...formData,
      imageUrl,
      ...(initialData ? { id: initialData.id } : {}),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* estado */}
      <div className="flex items-center justify-between p-4 bg-system-gray-6/50 rounded-2xl border border-border/5">
        <div className="flex items-center gap-3">
          {formData.isPublished ? (
            <Globe size={16} className="text-green-500" />
          ) : (
            <Lock size={16} className="text-secondary/40" />
          )}
          <div>
            <p className="text-[12px] font-semibold text-foreground">
              {formData.isPublished ? "Publicado" : "Borrador"}
            </p>
            <p className="text-[10px] text-secondary/50 font-medium">
              {formData.isPublished
                ? "Visible en el sitio público"
                : "No visible para los visitantes"}
            </p>
          </div>
        </div>
        <Switch
          checked={formData.isPublished}
          onChange={(val) => setFormData((p) => ({ ...p, isPublished: val }))}
        />
      </div>

      {/* imagen */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-secondary/50 mb-2">
          Imagen de Portada
        </label>
        <div className="relative group">
          {previewUrl ? (
            <div className="relative aspect-21/9 rounded-2xl overflow-hidden border border-border/10">
              <Image
                src={previewUrl}
                alt="Portada"
                fill
                className="object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setPreviewUrl(null);
                  setSelectedFile(null);
                  setFormData((p) => ({ ...p, imageUrl: "" }));
                }}
                className="absolute top-3 right-3 bg-black/60 text-white p-1.5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={14} />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center h-40 border-2 border-dashed border-border/20 rounded-2xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-all">
              <Upload size={24} className="text-secondary/40 mb-2" />
              <p className="text-xs font-semibold text-secondary/50">
                Haz clic para subir portada
              </p>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
            </label>
          )}
        </div>
      </div>

      {/* titulo */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-secondary/50 mb-2">
          Título *
        </label>
        <Input
          placeholder="El título de tu artículo..."
          value={formData.title}
          onChange={(e) =>
            setFormData((p) => ({ ...p, title: e.target.value }))
          }
          required
        />
      </div>

      {/* slug */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-secondary/50 mb-2">
          Slug (URL Amigable) *
        </label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-secondary/40 font-mono">
            /blog/
          </span>
          <input
            value={formData.slug}
            onChange={(e) => {
              setSlugEdited(true);
              setFormData((p) => ({ ...p, slug: e.target.value }));
            }}
            placeholder="mi-articulo-url-amigable"
            required
            className="w-full bg-system-gray-6 border border-transparent focus:bg-white focus:border-primary/30 h-11 pl-14 pr-4 rounded-xl text-sm font-mono transition-all outline-none"
          />
        </div>
      </div>

      {/* Resumen */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-secondary/50 mb-2">
          Resumen (Extracto)
        </label>
        <TextArea
          placeholder="Un breve resumen que aparece en la lista de artículos..."
          value={formData.excerpt}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setFormData((p) => ({ ...p, excerpt: e.target.value }))
          }
          rows={2}
        />
      </div>

      {/* Contenido */}
      <div>
        <label className="block text-xs font-black uppercase tracking-wider text-secondary/50 mb-2">
          Contenido *
        </label>
        <textarea
          value={formData.content}
          onChange={(e) =>
            setFormData((p) => ({ ...p, content: e.target.value }))
          }
          required
          rows={16}
          placeholder="Redacta tu artículo aquí. Puedes usar Markdown para dar formato al texto..."
          className="w-full bg-system-gray-6 border border-transparent focus:bg-white focus:border-primary/30 p-5 rounded-2xl text-sm font-medium transition-all outline-none resize-none leading-relaxed font-mono"
        />
        <p className="text-[10px] text-secondary/40 font-medium mt-1.5 ml-1">
          Soporte básico de Markdown (negritas, listas, encabezados)
        </p>
      </div>

      {/* Botón de envío */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          className="h-11 px-6 rounded-xl"
          disabled={isSubmitting || uploadingImage}
        >
          <FileText size={15} className="mr-2" />
          {isSubmitting || uploadingImage
            ? "Guardando..."
            : initialData
              ? "Guardar Cambios"
              : "Crear Artículo"}
        </Button>
      </div>
    </form>
  );
};
