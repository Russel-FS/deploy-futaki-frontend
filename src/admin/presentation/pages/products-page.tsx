"use client";

import React, { useState, useEffect } from "react";
import {
  Search,
  Edit2,
  Package,
  ChevronLeft,
  ChevronRight,
  Star,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { AdminModal } from "../components/admin-modal";
import { ProductForm } from "../components/product-form";
import { useProducts, useToggleProductActive, useToggleProductFeatured } from "../hooks/use-products";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { Button } from "@/shared/ui/button";
import { ProductRowSkeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/lib/utils";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { Switch } from "@/shared/ui/switch";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.1 },
  },
};

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 15, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 400, damping: 30 },
  },
  exit: { opacity: 0, scale: 0.98, transition: { duration: 0.2 } },
};

export const ProductsPageContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const { data, isLoading, error } = useProducts({
    page,
    search: debouncedSearch,
    limit: 10,
  });

  const products = data?.data || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / 10);

  const toggleMutation = useToggleProductActive();
  const toggleFeaturedMutation = useToggleProductFeatured();

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: any) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleToggleActive = (id: string, currentStatus: boolean) => {
    toggleMutation.mutate({ id, isActive: !currentStatus });
  };

  const handleToggleFeatured = (id: string, currentStatus: boolean) => {
    toggleFeaturedMutation.mutate({ id, isFeatured: !currentStatus });
  };

  if (error) {
    return (
      <div className="p-12 text-center bg-red-50 rounded-4xl border border-red-200 text-red-600 font-bold shadow-sm">
        Error al cargar los productos del catálogo.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground">
            Inventario
          </h1>
          <p className="text-secondary/90 text-[15px] font-medium mt-2 max-w-xl leading-relaxed">
            Gestiona el catálogo de productos y especificaciones técnicas.
          </p>
        </div>
        <Button
          className="rounded-full hover:-translate-y-0.5 transition-all duration-300 px-6 py-6"
          onClick={handleOpenCreate}
          size="lg"
        >
          <Plus size={20} className="mr-2" />
          Registrar Producto
        </Button>
      </div>

      <div className="bg-white rounded-4xl border border-border/10 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-500">
        <div className="p-5 border-b border-border/10 bg-white flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 group w-full">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/60 group-focus-within:text-primary transition-colors duration-300"
              size={18}
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar por nombre, modelo o SKU..."
              className="w-full bg-system-gray-6 border border-transparent rounded-full py-3.5 pl-12 pr-4 text-[14px] focus:outline-none focus:bg-white focus:border-primary/20 focus:ring-4 focus:ring-primary/10 transition-all font-medium placeholder:text-secondary/70 text-foreground"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/5 text-[13px] font-bold text-secondary/80 bg-white uppercase tracking-wider">
                <th className="px-8 py-5">Producto</th>
                <th className="px-8 py-5">Sección</th>
                <th className="px-8 py-5 text-right">Precio</th>
                <th className="px-8 py-5 text-center">Stock</th>
                <th className="px-8 py-5 text-center">Destacado</th>
                <th className="px-8 py-5 text-right w-32">Acciones</th>
              </tr>
            </thead>
            
            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="divide-y divide-border/5 bg-white"
            >
              <AnimatePresence mode="wait">
                {isLoading ? (
                  <ProductRowSkeleton rows={6} />
                ) : products.length === 0 ? (
                  <motion.tr
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <td
                      colSpan={6}
                      className="px-8 py-24 text-center text-secondary font-bold text-[14px] opacity-50"
                    >
                      No se encontraron activos
                    </td>
                  </motion.tr>
                ) : (
                  products.map((product: any) => (
                    <motion.tr
                      key={product.id}
                      variants={rowVariants}
                      whileHover={{ backgroundColor: "rgba(0,0,0,0.015)" }}
                      className={cn(
                        "group transition-colors",
                        !product.isActive && "opacity-50 grayscale-[0.3]",
                      )}
                    >
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-2xl bg-system-gray-6 border border-border/10 overflow-hidden relative shrink-0 group-hover:shadow-md transition-all duration-300">
                            {product.imageUrl ? (
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                unoptimized
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full text-secondary/50">
                                <Package size={20} strokeWidth={1.5} />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-foreground text-[15px] tracking-tight group-hover:text-primary transition-colors">
                              {product.name}
                            </div>
                            <div className="text-[12px] font-semibold text-secondary/80 mt-0.5 tracking-wide uppercase">
                              #{product.id.slice(-6)}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-secondary/90 text-[12px] font-bold bg-system-gray-6 px-3 py-1 rounded-full border border-border/10">
                          {product.category?.name || "Sin Categoría"}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="font-bold text-[15px] tracking-tight text-foreground">
                          ${product.price.toLocaleString()}
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <div className="flex justify-center">
                          <span
                            className={cn(
                              "text-[13px] font-bold",
                              product.stock > 10
                                ? "text-foreground/80"
                                : "text-red-500",
                            )}
                          >
                            {product.stock} un.
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5 text-center">
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleToggleFeatured(product.id, product.isFeatured)}
                          disabled={toggleFeaturedMutation.isPending}
                          className={cn(
                            "p-2.5 rounded-full transition-all duration-300 outline-none",
                            product.isFeatured 
                              ? "bg-yellow-50 text-yellow-500 shadow-sm" 
                              : "text-secondary/50 hover:bg-system-gray-6 hover:text-secondary/80"
                          )}
                        >
                          <Star size={18} fill={product.isFeatured ? "currentColor" : "none"} />
                        </motion.button>
                      </td>
                      <td className="px-8 py-5 text-right w-32">
                        <div className="flex items-center justify-end gap-2">
                          <Switch
                            checked={product.isActive}
                            onChange={() =>
                              handleToggleActive(product.id, product.isActive)
                            }
                            disabled={toggleMutation.isPending}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenEdit(product)}
                            className="p-2.5 rounded-full text-secondary/80 hover:text-primary hover:bg-primary/5 transition-all duration-300 ml-1"
                          >
                            <Edit2 size={16} />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="p-5 border-t border-border/5 bg-white flex items-center justify-between">
            <p className="text-[13px] font-semibold text-secondary/80 ml-4">
              Página {page} de {totalPages}
            </p>
            <div className="flex items-center gap-2 mr-4 bg-system-gray-6 p-1 rounded-full">
              <Button
                variant="ghost"
                size="sm"
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="p-2 h-9 w-9 rounded-full bg-white shadow-sm disabled:shadow-none disabled:bg-transparent transition-all"
              >
                <ChevronLeft size={16} />
              </Button>
              <div className="w-px h-4 bg-border/20 mx-1" />
              <Button
                variant="ghost"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="p-2 h-9 w-9 rounded-full bg-white shadow-sm disabled:shadow-none disabled:bg-transparent transition-all"
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        )}
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

