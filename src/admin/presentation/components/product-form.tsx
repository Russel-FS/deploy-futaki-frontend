"use client";

import React, { useState } from "react";
import {
  Upload,
  X,
  Package,
  Loader2,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useCategories } from "../hooks/use-categories";
import { Input, TextArea } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { toast } from "@/shared/ui/toast";
import { useSaveProduct } from "../hooks/use-products";

interface ProductFormProps {
  onSuccess: () => void;
  initialData?: any;
}

export const ProductForm = ({ onSuccess, initialData }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price?.toString() || "",
    stock: initialData?.stock?.toString() || "",
    categoryId: initialData?.categoryId || "",
  });
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>(
    initialData?.specs || [],
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    initialData?.imageUrl || null,
  );

  const { data: categories = [] } = useCategories();
  const mutation = useSaveProduct();

  const handleAddSpec = () => {
    setSpecs([...specs, { label: "", value: "" }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (
    index: number,
    field: "label" | "value",
    val: string,
  ) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = val;
    setSpecs(newSpecs);
  };

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
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      imageUrl,
      specs,
    }, {
      onSuccess: () => onSuccess()
    });
  };

  const isSubmitting = mutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      {/* Identidad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <label className="text-[11px] font-semibold text-secondary/50 ml-1 mb-2 block">
            Identidad Visual
          </label>
          <div className="relative group aspect-square">
            {previewUrl ? (
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-border/10">
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
              <label className="flex flex-col items-center justify-center h-full w-full border border-dashed border-border/20 rounded-2xl bg-system-gray-6 hover:bg-accent/50 transition-all cursor-pointer group/upload">
                <Upload
                  className="text-secondary/30 group-hover/upload:text-primary transition-colors"
                  size={24}
                />
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

        <div className="md:col-span-2 space-y-4">
          <Input
            label="Nombre del Producto"
            required
            placeholder="Ej. iPhone 15 Pro"
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
          />

          <div className="space-y-1.5">
            <label className="text-[11px] font-semibold text-secondary/50 ml-1">
              Categoría
            </label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, categoryId: e.target.value }))
              }
              className="w-full bg-system-gray-6 border border-border/10 rounded-xl p-3 text-[13px] font-medium focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all appearance-none"
            >
              <option value="">Seleccionar...</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Parámetros */}
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Precio Venta"
          type="number"
          step="0.01"
          placeholder="0.00"
          value={formData.price}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, price: e.target.value }))
          }
        />
        <Input
          label="Existencias (Stock)"
          type="number"
          placeholder="0"
          value={formData.stock}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, stock: e.target.value }))
          }
        />
      </div>

      <TextArea
        label="Descripción del Producto"
        placeholder="Detalles técnicos y comerciales..."
        value={formData.description}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, description: e.target.value }))
        }
        className="min-h-[100px]"
      />

      {/* Especificaciones */}
      <div className="space-y-3 pt-2">
        <div className="flex justify-between items-center">
          <label className="text-[11px] font-semibold text-secondary/50 ml-1">
            Especificaciones Técnicas
          </label>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleAddSpec}
            className="text-[9px] px-3 py-1.5"
          >
            + Añadir
          </Button>
        </div>

        <div className="space-y-2">
          {specs.map((spec, index) => (
            <div
              key={index}
              className="flex gap-2 items-center group/spec animate-in fade-in slide-in-from-right-1"
            >
              <input
                placeholder="Atributo"
                value={spec.label}
                onChange={(e) =>
                  handleSpecChange(index, "label", e.target.value)
                }
                className="flex-1 bg-system-gray-6  border border-border/10 rounded-xl py-2 px-3 text-[12px] font-medium focus:ring-1 focus:ring-primary/10 outline-none"
              />
              <input
                placeholder="Valor"
                value={spec.value}
                onChange={(e) =>
                  handleSpecChange(index, "value", e.target.value)
                }
                className="flex-[1.5] bg-system-gray-6   border border-border/10 rounded-xl py-2 px-3 text-[12px] font-medium focus:ring-1 focus:ring-primary/10 outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveSpec(index)}
                className="p-1.5 text-secondary/20 hover:text-red-500 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
          {specs.length === 0 && (
            <div className="text-center py-6 bg-system-gray-6/50 border border-dashed border-border/10 rounded-2xl">
              <p className="text-[9px] font-black uppercase tracking-widest text-secondary/30 italic">
                Sin atributos técnicos
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-6 sticky bottom-0 bg-white   py-4 z-10 border-t border-border/5">
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
            "Actualizar Inventario"
          ) : (
            "Registrar Producto"
          )}
        </Button>
      </div>
    </form>
  );
};
