import React, { useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Filter,
  Image as ImageIcon,
} from "lucide-react";
import { AdminModal } from "../components/admin-modal";
import { CategoryForm } from "../components/category-form";
import { useCategories } from "../hooks/use-categories";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/shared/ui/button";
import { CategoryRowSkeleton } from "@/shared/ui/skeleton";

export const CategoriesPageContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const { data: categories = [], isLoading, error } = useCategories();

  const handleOpenCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (category: any) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  if (error) {
    return (
      <div className="p-12 text-center bg-red-50 rounded-3xl border border-red-200 text-red-600 font-bold">
        Error al cargar las categorías del sistema.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Categorías
          </h1>
          <p className="text-secondary text-sm font-medium opacity-60 mt-1">
            Organiza y segmenta el catálogo para una mejor navegación.
          </p>
        </div>
        <Button
          variant="secondary"
          className="rounded-full"
          onClick={handleOpenCreate}
          size="md"
        >
          Nueva Categoría
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-border/10 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border/10 bg-white  flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 group w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30 group-focus-within:text-primary transition-colors"
              size={15}
            />
            <input
              type="text"
              placeholder="Buscar categoría o descripción..."
              className="w-full bg-system-gray-6/50   border-none rounded-full py-2.5 pl-11 pr-4 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium placeholder:text-secondary/30"
            />
          </div>
          <Button variant="secondary" size="sm" className="hidden md:flex">
            <Filter size={14} />
            Filtros
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/10 text-[11px] font-semibold text-secondary/50 bg-system-gray-6/30 ">
                <th className="px-8 py-3.5">Imagen</th>
                <th className="px-8 py-3.5">Sección</th>
                <th className="px-8 py-3.5">Descripción</th>
                <th className="px-8 py-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              <AnimatePresence>
                {isLoading ? (
                  <CategoryRowSkeleton rows={5} />
                ) : categories.length === 0 ? (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-8 py-20 text-center text-secondary font-black text-[10px] uppercase italic opacity-30 tracking-widest"
                    >
                      Sin registros disponibles
                    </td>
                  </tr>
                ) : (
                  categories.map((category, idx) => (
                    <motion.tr
                      key={category.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="hover:bg-system-gray-6  transition-colors group cursor-default"
                    >
                      <td className="px-8 py-4">
                        <div className="h-10 w-14 rounded-xl bg-system-gray-6  border border-border/10 overflow-hidden relative shrink-0 group-hover:scale-105 transition-transform duration-500">
                          {category.imageUrl ? (
                            <Image
                              src={category.imageUrl}
                              alt={category.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="flex items-center justify-center h-full text-secondary/20">
                              <ImageIcon size={18} strokeWidth={1.5} />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <div className="font-semibold text-foreground text-[14px] tracking-tight">
                          {category.name}
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <div className="text-secondary font-medium text-[12px] line-clamp-1 max-w-md opacity-50 italic">
                          {category.description || "Sin descripción"}
                        </div>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEdit(category)}
                            className="p-2"
                          >
                            <Edit2 size={14} />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="p-2 text-red-500/50 hover:text-red-500"
                          >
                            <Trash2 size={14} />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingCategory ? "Actualizar Sección" : "Crear Nueva Sección"}
      >
        <CategoryForm
          initialData={editingCategory}
          onSuccess={() => setIsModalOpen(false)}
        />
      </AdminModal>
    </div>
  );
};
