"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CategoryFormProps {
  onSuccess: () => void;
}

export const CategoryForm = ({ onSuccess }: CategoryFormProps) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const mutation = useMutation({
    mutationFn: (data: { name: string; description: string }) =>
      fetch("/api/catalog/categories", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      }).then((res) => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      queryClient.invalidateQueries({ queryKey: ["admin-stats"] });
      onSuccess();
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ name, description });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        className="w-full bg-primary text-primary-foreground py-3 rounded-2xl font-bold text-sm hover:opacity-90 disabled:opacity-50 transition-all shadow-sm"
      >
        {mutation.isPending ? "Guardando..." : "Crear Categoría"}
      </button>
    </form>
  );
};
