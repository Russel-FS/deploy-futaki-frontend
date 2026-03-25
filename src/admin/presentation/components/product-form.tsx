"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Upload, X, Package, Loader2, Plus, Trash2, Tag, DollarSign, Box, FileText, Settings2 } from "lucide-react";
import Image from "next/image";
import { useCategories } from "../hooks/use-categories";
import { cn } from "@/shared/lib/utils";

interface ProductFormProps {
  onSuccess: () => void;
  initialData?: any;
}

export const ProductForm = ({ onSuccess, initialData }: ProductFormProps) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    description: initialData?.description || "",
    price: initialData?.price?.toString() || "",
    stock: initialData?.stock?.toString() || "",
    categoryId: initialData?.categoryId || "",
  });
  const [specs, setSpecs] = useState<{ label: string; value: string }[]>(initialData?.specs || []);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialData?.imageUrl || null);

  const { data: categories = [] } = useCategories();

  const mutation = useMutation({
    mutationFn: async (data: typeof formData) => {
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
      const url = initialData ? `/api/catalog/products/${initialData.id}` : "/api/catalog/products";

      return fetch(url, {
        method,
        body: JSON.stringify({
          ...data,
          price: parseFloat(data.price),
          stock: parseInt(data.stock),
          imageUrl,
          specs,
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

  const handleAddSpec = () => {
    setSpecs([...specs, { label: "", value: "" }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSpecChange = (index: number, field: "label" | "value", val: string) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const isSubmitting = mutation.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-left">
      {/* Identidad */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1 mb-2 block">Identidad Visual</label>
          <div className="relative group aspect-square">
            {previewUrl ? (
              <div className="relative h-full w-full rounded-2xl overflow-hidden border border-border/10 shadow-sm">
                <Image src={previewUrl} alt="Preview" fill className="object-cover" unoptimized />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1.5 bg-black/60 backdrop-blur-md rounded-full text-white hover:bg-red-500 transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center h-full w-full border border-dashed border-border/20 rounded-2xl bg-accent/5 hover:bg-accent/10 transition-all cursor-pointer group/upload">
                <Upload className="text-secondary/30 group-hover/upload:text-primary transition-colors" size={24} />
                <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
              </label>
            )}
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Nombre del Producto</label>
            <input
              required
              type="text"
              placeholder="Ej. iPhone 15 Pro"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full bg-accent/5 border border-border/5 rounded-2xl p-3.5 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Categoría</label>
            <select
              required
              value={formData.categoryId}
              onChange={(e) => setFormData(prev => ({ ...prev, categoryId: e.target.value }))}
              className="w-full bg-accent/5 border border-border/5 rounded-2xl p-3.5 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all appearance-none"
            >
              <option value="">Seleccionar...</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Parámetros */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1 flex items-center gap-2">
            <DollarSign size={10} className="text-emerald-500" />
            Venta (USD)
          </label>
          <input
            required
            type="number"
            step="0.01"
            placeholder="0.00"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
            className="w-full bg-accent/5 border border-border/5 rounded-2xl p-3.5 text-sm font-black focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all text-emerald-600"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1 flex items-center gap-2">
            <Box size={10} className="text-blue-500" />
            Stock
          </label>
          <input
            required
            type="number"
            placeholder="0"
            value={formData.stock}
            onChange={(e) => setFormData(prev => ({ ...prev, stock: e.target.value }))}
            className="w-full bg-accent/5 border border-border/5 rounded-2xl p-3.5 text-sm font-black focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all text-blue-600"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1 flex items-center gap-2">
          <FileText size={10} className="text-primary" />
          Descripción
        </label>
        <textarea
          placeholder="Detalles del producto..."
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          className="w-full bg-accent/5 border border-border/5 rounded-2xl p-3.5 text-sm font-bold focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all min-h-[60px] resize-none"
        />
      </div>

      {/* Especificaciones */}
      <div className="space-y-3 pt-2">
        <div className="flex justify-between items-center">
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">Especificaciones</label>
          <button
            type="button"
            onClick={handleAddSpec}
            className="text-[9px] font-black uppercase bg-primary/10 text-primary px-3 py-1.5 rounded-full hover:bg-primary/20 transition-all active:scale-95"
          >
            Añadir Atributo
          </button>
        </div>
        
        <div className="space-y-2">
          {specs.map((spec, index) => (
            <div key={index} className="flex gap-2 items-center group/spec animate-in fade-in slide-in-from-right-1">
              <input
                placeholder="Nombre"
                value={spec.label}
                onChange={(e) => handleSpecChange(index, "label", e.target.value)}
                className="flex-1 bg-accent/5 border border-border/5 rounded-xl py-2 px-3 text-[11px] font-bold"
              />
              <input
                placeholder="Valor"
                value={spec.value}
                onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                className="flex-[1.5] bg-accent/5 border border-border/5 rounded-xl py-2 px-3 text-[11px] font-bold"
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
            <div className="text-center py-4 bg-accent/2 border border-dashed border-border/5 rounded-2xl">
              <p className="text-[9px] font-black uppercase tracking-widest text-secondary/20 italic">Sin atributos</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 pt-6 sticky bottom-0 bg-white dark:bg-[#0A0A0A] py-3 z-10 border-t border-border/5">
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
          ) : (
            initialData ? "Actualizar" : "Crear"
          )}
        </button>
      </div>
    </form>
  );
};
