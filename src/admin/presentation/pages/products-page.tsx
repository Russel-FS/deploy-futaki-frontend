import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Edit2,
  Package,
  Filter,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import Image from "next/image";
import { AdminModal } from "../components/admin-modal";
import { ProductForm } from "../components/product-form";
import { useProducts, useToggleProductActive, useToggleProductFeatured } from "../hooks/use-products";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/ui/button";
import { ProductRowSkeleton } from "@/shared/ui/skeleton";
import { cn } from "@/shared/lib/utils";
import { useDebounce } from "@/shared/hooks/use-debounce";
import { Switch } from "@/shared/ui/switch";

export const ProductsPageContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);

  // Estados para paginaciÃ³n y bÃºsqueda
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  // Resetear a la pÃ¡gina 1 al buscar
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
      <div className="p-12 text-center bg-red-50  rounded-3xl border border-red-200  text-red-600  font-bold">
        Error al cargar los productos del catalogo.
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
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
                <th className="px-8 py-3.5">Destacado</th>
                <th className="px-8 py-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/10">
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
                      colSpan={5}
                      className="px-8 py-20 text-center text-secondary font-black text-[10px] uppercase italic opacity-30 tracking-widest"
                    >
                      No se encontraron activos
                    </td>
                  </motion.tr>
                ) : (
                  products.map((product, idx) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.03 }}
                      className={cn(
                        "hover:bg-system-gray-6 transition-colors group cursor-default",
                        !product.isActive && "opacity-50 grayscale-[0.5]",
                      )}
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
                          {product.category?.name || "Sin CategorÃ­a"}
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
                      <td className="px-8 py-4 text-right">
                        <div className="flex items-center justify-end gap-3">
                          <button
                            onClick={() => handleToggleFeatured(product.id, product.isFeatured)}
                            disabled={toggleFeaturedMutation.isPending}
                            className={cn(
                              "p-2 rounded-full transition-all",
                              product.isFeatured 
                                ? "bg-yellow-50 text-yellow-500 shadow-sm" 
                                : "text-secondary/20 hover:bg-system-gray-6 hover:text-secondary/40"
                            )}
                          >
                            <Star size={16} fill={product.isFeatured ? "currentColor" : "none"} />
                          </button>
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
                            className="p-2 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <Edit2 size={14} />
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

        {/* Paginación */}
        <div className="p-4 border-t border-border/10 bg-system-gray-6/20 flex items-center justify-between">
          <p className="text-[11px] font-semibold text-secondary/40 ml-4">
            Mostrando {products.length} de {total} resultados
          </p>
          <div className="flex items-center gap-2 mr-4">
            <Button
              variant="ghost"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="p-2 h-9 w-9 rounded-full"
            >
              <ChevronLeft size={16} />
            </Button>
            <span className="text-[12px] font-bold text-foreground mx-2 w-4 text-center">
              {page}
            </span>
            <Button
              variant="ghost"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="p-2 h-9 w-9 rounded-full"
            >
              <ChevronRight size={16} />
            </Button>
          </div>
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
