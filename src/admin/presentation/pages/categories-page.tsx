import React, { useState } from "react";
import { Plus, Search, Edit2, Trash2 } from "lucide-react";
import { AdminModal } from "../components/admin-modal";
import { CategoryForm } from "../components/category-form";
import { useCategories } from "../hooks/use-categories";

export const CategoriesPageContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: categories = [], isLoading, error } = useCategories();

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error al cargar categorías.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Categorías</h1>
          <p className="text-secondary text-[14px] mt-1">Gestiona las agrupaciones de tus productos.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-foreground px-4 py-2.5 rounded-2xl flex items-center gap-2 text-[14px] font-bold hover:opacity-90 transition-opacity shadow-sm"
        >
          <Plus size={18} />
          Nueva Categoría
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-border/50 overflow-hidden">
        <div className="p-4 border-b border-border/50 bg-gray-50/50 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
            <input 
              type="text" 
              placeholder="Buscar categorías..." 
              className="w-full bg-white border border-border/50 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border/50 uppercase text-[11px] font-bold text-secondary tracking-wider bg-gray-50/30">
                <th className="px-6 py-4">Nombre</th>
                <th className="px-6 py-4">Descripción</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-secondary text-sm">Cargando categorías...</td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-secondary text-sm">No hay categorías registradas.</td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{category.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-secondary text-sm line-clamp-1 max-w-xs">{category.description || "Sin descripción"}</div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-accent rounded-lg text-secondary hover:text-primary transition-colors">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-lg text-secondary hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Nueva Categoría"
      >
        <CategoryForm onSuccess={() => setIsModalOpen(false)} />
      </AdminModal>
    </div>
  );
};
