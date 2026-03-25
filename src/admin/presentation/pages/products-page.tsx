import React, { useState } from "react";
import { Plus, Search, Edit2, Trash2, Package, Filter } from "lucide-react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";
import { AdminModal } from "../components/admin-modal";
import { ProductForm } from "../components/product-form";
import { useProducts } from "../hooks/use-products";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/ui/button";

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
      <div className="p-12 text-center bg-red-50  rounded-3xl border border-red-200  text-red-600  font-bold">
        Error al cargar los productos del catálogo.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Inventario
          </h1>
          <p className="text-secondary text-sm font-medium opacity-60 mt-1">
            Gestiona el catálogo de productos y especificaciones técnicas.
          </p>
        </div>
        <Button
          variant="secondary"
          className="rounded-full"
          onClick={handleOpenCreate}
          size="md"
        >
          Registrar Producto
        </Button>
      </div>

      <div className="bg-white  rounded-3xl border border-border/10 overflow-hidden shadow-sm">
        <div className="p-4 border-b border-border/10 bg-white  flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 group w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30 group-focus-within:text-primary transition-colors"
              size={15}
            />
            <input
              type="text"
              placeholder="Buscar por nombre, modelo o SKU..."
              className="w-full bg-system-gray-6/50  border-none rounded-xl py-2.5 pl-11 pr-4 text-[13px] focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all font-medium placeholder:text-secondary/30"
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
              <tr className="border-b border-border/10 text-[11px] font-semibold text-secondary/50 bg-system-gray-6/30  ">
                <th className="px-8 py-3.5">Producto</th>
                <th className="px-8 py-3.5">Sección</th>
                <th className="px-8 py-3.5 text-right">Precio</th>
                <th className="px-8 py-3.5">Stock</th>
                <th className="px-8 py-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
              <AnimatePresence>
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                        <span className="text-secondary/40 font-black text-[10px] tracking-widest uppercase italic">
                          Cargando catálogo...
                        </span>
                      </div>
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-8 py-20 text-center text-secondary font-black text-[10px] uppercase italic opacity-30 tracking-widest"
                    >
                      No se encontraron activos
                    </td>
                  </tr>
                ) : (
                  products.map((product, idx) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className="hover:bg-system-gray-6  transition-colors group cursor-default"
                    >
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl bg-system-gray-6  border border-border/10 overflow-hidden relative shrink-0 group-hover:scale-105 transition-transform duration-500">
                            {product.imageUrl ? (
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover"
                                unoptimized
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-secondary/20">
                                <Package size={18} strokeWidth={1.5} />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-semibold text-foreground text-[14px] tracking-tight">
                              {product.name}
                            </div>
                            <div className="text-[10px] font-medium text-secondary/40 mt-0.5">
                              #{product.id.slice(-6).toUpperCase()}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <span className="text-secondary text-[11px] font-semibold bg-system-gray-6  px-2.5 py-0.5 rounded-full border border-border/10">
                          {product.category.name}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="font-semibold text-[14px] tracking-tight text-foreground">
                          ${product.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={cn(
                              "text-[12px] font-semibold",
                              product.stock > 10
                                ? "text-foreground"
                                : "text-red-500",
                            )}
                          >
                            {product.stock} un.
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-3 text-right">
                        <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-all">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEdit(product)}
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
        title={editingProduct ? "Actualizar Producto" : "Registrar Producto"}
      >
        <ProductForm
          initialData={editingProduct}
          onSuccess={() => setIsModalOpen(false)}
        />
      </AdminModal>
    </div>
  );
};
