"use client";

import React, { useState, useEffect } from "react";
import {
  Upload,
  X,
  Loader2,
  Image as ImageIcon,
  Link as LinkIcon,
  Type,
  Palette,
  Pipette,
} from "lucide-react";
import { Input, TextArea } from "@/shared/ui/input";
import { Switch } from "@/shared/ui/switch";
import { Button } from "@/shared/ui/button";
import { useSaveSlide, HeroSlide } from "../hooks/use-slides";
import { cn } from "@/shared/lib/utils";

interface HeroSlideFormProps {
  onSuccess: () => void;
  onCancel?: () => void;
  onFormChange?: (data: any) => void;
  initialData?: HeroSlide | null;
}

const PRESET_COLORS = [
  { label: "Midnight", bg: "#000000", text: "#FFFFFF" },
  { label: "Industrial", bg: "#18181B", text: "#FFFFFF" },
  { label: "Corporate", bg: "#2563EB", text: "#FFFFFF" },
];

export const HeroSlideForm = ({
  onSuccess,
  onCancel,
  onFormChange,
  initialData,
}: HeroSlideFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    subtitle: initialData?.subtitle || "",
    ctaText: initialData?.ctaText || "",
    ctaUrl: initialData?.ctaUrl || "",
    btnBgColor: initialData?.btnBgColor || "#000000",
    btnTextColor: initialData?.btnTextColor || "#FFFFFF",
    order: initialData?.order?.toString() || "0",
    isActive: initialData?.isActive ?? true,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.imageUrl || null,
  );
  const [isUploading, setIsUploading] = useState(false);

  const mutation = useSaveSlide();

  useEffect(() => {
    onFormChange?.({
      ...formData,
      imageUrl: previewUrl,
    });
  }, [formData, previewUrl, onFormChange]);

  useEffect(() => {
    setFormData({
      title: initialData?.title || "",
      subtitle: initialData?.subtitle || "",
      ctaText: initialData?.ctaText || "",
      ctaUrl: initialData?.ctaUrl || "",
      btnBgColor: initialData?.btnBgColor || "#000000",
      btnTextColor: initialData?.btnTextColor || "#FFFFFF",
      order: initialData?.order?.toString() || "0",
      isActive: initialData?.isActive ?? true,
    });
    setPreviewUrl(initialData?.imageUrl || null);
    setSelectedFile(null);
  }, [initialData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Solo se permiten archivos de imagen");
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!previewUrl && !selectedFile) {
      alert("Se requiere una imagen para el banner");
      return;
    }

    setIsUploading(true);
    try {
      let finalImageUrl = initialData?.imageUrl || "";

      if (selectedFile) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", selectedFile);

        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: uploadFormData,
        });

        if (!uploadRes.ok) throw new Error("Error al subir la imagen");
        const uploadData = await uploadRes.json();
        finalImageUrl = uploadData.url;
      }

      await mutation.mutateAsync({
        id: initialData?.id,
        ...formData,
        imageUrl: finalImageUrl,
        order: parseInt(formData.order) || 0,
      });

      onSuccess();
    } catch (error) {
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-3">
        <label className="text-[11px] font-bold text-secondary/50 uppercase tracking-widest flex items-center gap-2">
          <ImageIcon size={12} />
          Imagen de Fondo
        </label>

        <div
          className={cn(
            "relative aspect-video rounded-3xl border-2 border-dashed border-border/10 bg-system-gray-6 overflow-hidden flex items-center justify-center transition-all duration-500",
            !previewUrl && "hover:border-primary/40 hover:bg-primary/5",
          )}
        >
          {previewUrl ? (
            <>
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setPreviewUrl(null);
                }}
                className="absolute top-3 right-3 p-1.5 bg-black/60 backdrop-blur-md text-white rounded-full hover:bg-black transition-colors z-20"
              >
                <X size={14} />
              </button>
            </>
          ) : (
            <label className="flex flex-col items-center gap-2 cursor-pointer p-6 w-full h-full justify-center">
              <Upload className="w-5 h-5 text-primary/40" />
              <div className="text-center">
                <p className="text-[12px] font-bold text-foreground">
                  Subir Imagen
                </p>
                <p className="text-[10px] text-secondary/40 mt-0.5">
                  21:9 recomendado
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

      <div className="space-y-5">
        <div className="space-y-4">
          <Input
            label="Título Principal"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Ej: Innovación en tus manos"
            required
            className="text-sm"
          />
          <TextArea
            label="Subtítulo / Descripción"
            value={formData.subtitle}
            onChange={(e) =>
              setFormData({ ...formData, subtitle: e.target.value })
            }
            placeholder="Breve descripción..."
            rows={2}
            className="text-sm"
          />
        </div>

        <div className="h-px bg-border/5" />

        <div className="space-y-4">
          <label className="text-[11px] font-bold text-secondary/50 uppercase tracking-widest flex items-center gap-2">
            <Palette size={12} />
            Acción y Personalización
          </label>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Texto del Botón"
              value={formData.ctaText}
              onChange={(e) =>
                setFormData({ ...formData, ctaText: e.target.value })
              }
              placeholder="Ej: Ver más"
              className="text-sm"
            />
            <Input
              label="URL de Destino"
              value={formData.ctaUrl}
              onChange={(e) =>
                setFormData({ ...formData, ctaUrl: e.target.value })
              }
              placeholder="Ej: /productos/iphone"
              className="text-sm"
            />
          </div>

          <div className="space-y-4 pt-2">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1 block mb-2">
                Sugerencias de Estilo
              </span>
              <div className="flex flex-wrap gap-2">
                {PRESET_COLORS.map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        btnBgColor: opt.bg,
                        btnTextColor: opt.text,
                      })
                    }
                    className={cn(
                      "group flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-bold transition-all border",
                      formData.btnBgColor === opt.bg
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-transparent bg-system-gray-6 text-secondary/60 hover:bg-system-gray-5",
                    )}
                  >
                    <div
                      className="w-3 h-3 rounded-full border border-black/10 shadow-sm"
                      style={{ backgroundColor: opt.bg }}
                    />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5 shadow-sm">
                <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1 flex items-center gap-1.5">
                  <div 
                    className="w-2.5 h-2.5 rounded-full border border-black/5" 
                    style={{ backgroundColor: formData.btnBgColor }}
                  />
                  Fondo Botón
                </label>
                <div className="flex items-center gap-2 bg-system-gray-6 rounded-2xl p-2 border border-transparent focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                   <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-black/5 shadow-inner grow-0 shrink-0">
                    <input
                      type="color"
                      value={formData.btnBgColor}
                      onChange={(e) => setFormData({ ...formData, btnBgColor: e.target.value })}
                      className="absolute inset-x-0 inset-y-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                    />
                   </div>
                   <input
                    type="text"
                    value={formData.btnBgColor}
                    onChange={(e) => setFormData({ ...formData, btnBgColor: e.target.value })}
                    className="bg-transparent text-xs font-mono font-bold w-full focus:outline-none uppercase"
                   />
                   <Pipette size={14} className="text-secondary/30 mr-2" />
                </div>
              </div>

              <div className="space-y-1.5 shadow-sm">
                <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1 flex items-center gap-1.5">
                  <div 
                    className="w-2.5 h-2.5 rounded-full border border-black/5" 
                    style={{ backgroundColor: formData.btnTextColor }}
                  />
                  Texto Botón
                </label>
                <div className="flex items-center gap-2 bg-system-gray-6 rounded-2xl p-2 border border-transparent focus-within:ring-1 focus-within:ring-primary/20 transition-all">
                  <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-black/5 shadow-inner grow-0 shrink-0">
                    <input
                      type="color"
                      value={formData.btnTextColor}
                      onChange={(e) => setFormData({ ...formData, btnTextColor: e.target.value })}
                      className="absolute inset-x-0 inset-y-0 w-[150%] h-[150%] -translate-x-1/4 -translate-y-1/4 cursor-pointer"
                    />
                   </div>
                   <input
                    type="text"
                    value={formData.btnTextColor}
                    onChange={(e) => setFormData({ ...formData, btnTextColor: e.target.value })}
                    className="bg-transparent text-xs font-mono font-bold w-full focus:outline-none uppercase"
                   />
                   <Type size={14} className="text-secondary/30 mr-2" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="h-px bg-border/5" />

        <div className="flex items-center justify-between bg-system-gray-6 p-4 rounded-2xl border border-border/5">
          <div className="flex flex-col">
            <span className="text-[13px] font-bold text-secondary/80">
              Slide Activo
            </span>
            <span className="text-[10px] text-secondary/40">
              Visible en la Home
            </span>
          </div>
          <Switch
            checked={formData.isActive}
            onChange={(val) => setFormData({ ...formData, isActive: val })}
          />
        </div>

        <Input
          label="Orden de Aparición"
          type="number"
          value={formData.order}
          onChange={(e) => setFormData({ ...formData, order: e.target.value })}
          min="0"
          className="text-sm"
        />
      </div>

      <div className="flex flex-col gap-2 pt-4">
        <Button
          type="submit"
          size="md"
          disabled={mutation.isPending || isUploading}
          className="w-full rounded-full py-4"
        >
          {mutation.isPending || isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "Guardar Cambios"
          )}
        </Button>
        {onCancel && (
          <Button
            type="button"
            size="md"
            variant="ghost"
            onClick={onCancel}
            disabled={mutation.isPending || isUploading}
            className="w-full rounded-full py-4"
          >
            Descartar
          </Button>
        )}
      </div>
    </form>
  );
};
