import React, { useState } from "react";
import { Plus, Search, Edit2, Trash2, Package, Filter, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { AdminModal } from "../components/admin-modal";
import { ProductForm } from "../components/product-form";
import { useProducts } from "../hooks/use-products";
import { motion, AnimatePresence } from "framer-motion";

export const ProductsPageContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const { data: products = [], isLoading, error } = useProducts();

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  if (error) {
    return (
      <div className="p-12 text-center bg-red-50 dark:bg-red-500/10 rounded-3xl border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 font-bold">
        Error al cargar los productos del catálogo.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">Inventario</h1>
          <p className="text-secondary font-medium tracking-tight mt-2">Control total sobre el catálogo de hardware y especificaciones de Futeki.</p>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="bg-primary text-primary-foreground px-6 py-3.5 rounded-2xl flex items-center justify-center gap-2 text-sm font-black hover:scale-105 active:scale-95 transition-all shadow-xl shadow-primary/20 group hover:shadow-2xl"
        >
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Añadir Producto
        </button>
      </div>

      <div className="bg-white dark:bg-white/2 rounded-[2.5rem] border border-border/10 shadow-2xl shadow-black/2 overflow-hidden">
        <div className="p-6 border-b border-border/10 bg-accent/5 flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 group w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary group-focus-within:text-primary transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Filtrar por nombre, modelo o SKU..." 
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
                <th className="px-8 py-5">Producto</th>
                <th className="px-8 py-5">Categoría</th>
                <th className="px-8 py-5 text-right">Precio</th>
                <th className="px-8 py-5">Stock</th>
                <th className="px-8 py-5 text-right">Gestión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              <AnimatePresence>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <span className="text-secondary font-bold text-sm tracking-tight uppercase">Sincronizando catálogo...</span>
                      </div>
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center text-secondary font-bold text-sm">No se encontraron productos en la base de datos.</td>
                  </tr>
                ) : (
                  products.map((product, idx) => (
                    <motion.tr 
                      key={product.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-accent/5 dark:hover:bg-white/2 transition-colors group cursor-default"
                    >
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl bg-accent border border-border/10 overflow-hidden relative shrink-0 group-hover:scale-105 transition-transform duration-500">
                            {product.imageUrl ? (
                              <Image src={product.imageUrl} alt={product.name} fill className="object-cover" unoptimized />
                            ) : (
                              <div className="flex h-full items-center justify-center text-secondary/20">
                                <Package size={20} />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-black text-foreground text-sm tracking-tight">{product.name}</div>
                            <div className="text-[9px] font-black text-secondary/30 uppercase tracking-[0.2em] mt-0.5">#{product.id.slice(-6)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <span className="text-secondary text-[10px] font-black uppercase tracking-widest bg-accent/5 px-2 py-1 rounded-md border border-border/5">
                          {product.category.name}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="font-black text-sm tracking-tighter text-foreground">
                          ${product.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-2">
                           <div className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            product.stock > 10 ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
                          )} />
                          <span className={cn(
                            "text-[10px] font-black uppercase tracking-widest",
                            product.stock > 10 ? "text-emerald-500" : "text-red-500"
                          )}>{product.stock} un.</span>
                        </div>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                          <button 
                            onClick={() => handleOpenEdit(product)}
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
        title={editingProduct ? "Actualizar Inventario" : "Registrar Activo"}
      >
        <ProductForm 
          initialData={editingProduct}
          onSuccess={() => setIsModalOpen(false)} 
        />
      </AdminModal>
    </div>
  );
};
