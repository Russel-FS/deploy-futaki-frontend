import React, { useState } from "react";
import { Plus, Search, Edit2, Trash2, Tag, Filter, MoreHorizontal, Image as ImageIcon } from "lucide-react";
import { AdminModal } from "../components/admin-modal";
import { CategoryForm } from "../components/category-form";
import { useCategories } from "../hooks/use-categories";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

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
      <div className="p-12 text-center bg-red-50 dark:bg-red-500/10 rounded-3xl border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 font-bold">
        Error al cargar las categorías del sistema.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Categorías</h1>
          <p className="text-secondary font-medium tracking-tight mt-2">Organización y segmentación inteligente de productos Futeki.</p>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="bg-primary text-primary-foreground px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 group hover:shadow-2xl"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Nueva Categoría
        </button>
      </div>

      <div className="bg-white dark:bg-white/2 rounded-[2.5rem] border border-border/10 shadow-2xl shadow-black/2 overflow-hidden">
        <div className="p-6 border-b border-border/10 bg-accent/5 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 group w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Buscar por nombre o descripción..." 
              className="w-full bg-white dark:bg-white/5 border border-border/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-bold placeholder:text-secondary/40"
            />
          </div>
          <button className="px-5 py-3.5 rounded-2xl border border-border/10 text-secondary hover:text-foreground hover:bg-white dark:hover:bg-white/5 transition-all flex items-center gap-2 text-sm font-bold shrink-0">
            <Filter size={18} />
            Filtros
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/10 uppercase text-[10px] font-black text-secondary/60 tracking-[0.2em] bg-accent/2">
                <th className="px-8 py-5">Identidad</th>
                <th className="px-8 py-5">Nombre Sección</th>
                <th className="px-8 py-5">Descripción Estratégica</th>
                <th className="px-8 py-5 text-right">Gestión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              <AnimatePresence>
                {isLoading ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <span className="text-secondary font-bold text-sm tracking-tight uppercase">Sincronizando secciones...</span>
                      </div>
                    </td>
                  </tr>
                ) : categories.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-8 py-20 text-center text-secondary font-bold text-sm">No se encontraron categorías disponibles.</td>
                  </tr>
                ) : (
                  categories.map((category, idx) => (
                    <motion.tr 
                      key={category.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-accent/5 dark:hover:bg-white/2 transition-colors group cursor-default"
                    >
                      <td className="px-8 py-4">
                        <div className="h-12 w-16 rounded-xl bg-accent border border-border/10 overflow-hidden relative shrink-0">
                          {category.imageUrl ? (
                            <Image src={category.imageUrl} alt={category.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" unoptimized />
                          ) : (
                            <div className="flex items-center justify-center h-full text-secondary/30">
                              <ImageIcon size={20} />
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <div className="font-black text-foreground text-sm tracking-tight">
                          {category.name}
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <div className="text-secondary font-medium text-xs line-clamp-1 max-w-md">
                          {category.description || "Sin descripción asignada"}
                        </div>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                          <button 
                            onClick={() => handleOpenEdit(category)}
                            className="p-2.5 hover:bg-white dark:hover:bg-white/10 rounded-xl text-secondary hover:text-primary transition-all border border-transparent hover:border-border/10 shadow-sm"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button className="p-2.5 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl text-secondary hover:text-red-500 transition-all border border-transparent hover:border-red-500/10 shadow-sm">
                            <Trash2 size={16} />
                          </button>
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
