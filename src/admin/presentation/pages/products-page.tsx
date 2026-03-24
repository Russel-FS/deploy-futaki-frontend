import React, { useState } from "react";
import { Plus, Search, Edit2, Trash2, Package } from "lucide-react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { AdminModal } from "../components/admin-modal";
import { ProductForm } from "../components/product-form";
import { useProducts } from "../hooks/use-products";

export const ProductsPageContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: products = [], isLoading, error } = useProducts();

  if (error) {
    return (
      <div className="p-8 text-center text-red-500">
        Error al cargar productos.
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Productos</h1>
          <p className="text-secondary text-[14px] mt-1">Gestiona el inventario y catálogo de Futeki.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-primary text-primary-foreground px-4 py-2.5 rounded-2xl flex items-center gap-2 text-[14px] font-bold hover:opacity-90 transition-opacity shadow-sm"
        >
          <Plus size={18} />
          Nuevo Producto
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-border/50 overflow-hidden">
        <div className="p-4 border-b border-border/50 bg-gray-50/50 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" size={16} />
            <input 
              type="text" 
              placeholder="Buscar productos..." 
              className="w-full bg-white border border-border/50 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border/50 uppercase text-[11px] font-bold text-secondary tracking-wider bg-gray-50/30">
                <th className="px-6 py-4">Producto</th>
                <th className="px-6 py-4">Categoría</th>
                <th className="px-6 py-4">Precio</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-secondary text-sm">Cargando productos...</td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-secondary text-sm">No hay productos registrados.</td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-accent overflow-hidden shrink-0 border border-border relative">
                          {product.imageUrl ? (
                            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-secondary/30">
                              <Package size={20} />
                            </div>
                          )}
                        </div>
                        <div className="font-semibold text-foreground text-sm">{product.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-secondary text-sm font-medium">{product.category.name}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-sm">
                      ${product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold",
                        product.stock > 10 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      )}>
                        {product.stock} un.
                      </span>
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
        title="Nuevo Producto"
      >
        <ProductForm onSuccess={() => setIsModalOpen(false)} />
      </AdminModal>
    </div>
  );
};
