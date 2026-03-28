"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Container } from "@/shared/ui/container";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  LayoutGrid,
  List,
  ArrowUpDown,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useFilteredProducts,
  usePublicCategories,
} from "../hooks/use-public-catalog";
import { ProductCard } from "../components/product-card";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";

export const CatalogPageContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Estados de la URL
  const q = searchParams.get("q") || "";
  const categoryId = searchParams.get("categoryId") || "";
  const sort = searchParams.get("sort") || "newest";

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: products = [], isLoading } = useFilteredProducts({
    q,
    categoryId,
    sort,
  });

  const { data: categories = [] } = usePublicCategories();

  /**
   * Actualiza los filtros de búsqueda y navega a la página del catálogo con los nuevos filtros.
   */
  const handleUpdateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/catalog?${params.toString()}`);
  };

  /**
   * Limpia todos los filtros de búsqueda y navega a la página principal del catálogo.
   */
  const clearFilters = () => {
    router.push("/catalog");
  };

  const activeCategory = categories.find((c: any) => c.id === categoryId);

  return (
    <div className="min-h-screen bg-accent/5 pt-24 pb-20">
      <Container>
        {/* Header de Búsqueda */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex-1 min-w-0 pr-4">
              <h1 className="text-4xl font-black tracking-tight text-foreground uppercase italic underline decoration-primary/30 underline-offset-8 wrap-break-word line-clamp-3 md:line-clamp-2 pb-2">
                {q
                  ? `Resultados para "${q}"`
                  : activeCategory
                    ? activeCategory.name
                    : "Catálogo Completo"}
              </h1>
              <p className="text-secondary/50 font-medium mt-3 flex items-center gap-2">
                <LayoutGrid size={14} className="shrink-0" />
                Explora nuestra selección de tecnología de alto rendimiento.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative group">
                <select
                  value={sort}
                  onChange={(e) => handleUpdateFilter("sort", e.target.value)}
                  className="appearance-none bg-system-gray-6 rounded-full px-5 py-2.5 pr-10 text-[13px] font-bold outline-none transition-all cursor-pointer  "
                >
                  <option value="newest">Lo más reciente</option>
                  <option value="price-asc">Precio: Menor a Mayor</option>
                  <option value="price-desc">Precio: Mayor a Menor</option>
                  <option value="name-asc">Nombre: A - Z</option>
                </select>
                <ArrowUpDown
                  size={14}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none"
                />
              </div>

              <Button
                variant="outline"
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden rounded-xl h-10 px-4"
              >
                <SlidersHorizontal size={16} className="mr-2" />
                Filtros
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-12">
          {/* Sidebar de Filtros (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-10 sticky top-28 h-fit">
            <section className="space-y-4">
              <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-secondary/40">
                Categorías
              </h3>
              <div className="flex flex-col gap-1">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => handleUpdateFilter("categoryId", "")}
                  className={cn(
                    "text-left px-4 py-3 rounded-full text-[13px] font-bold  ",
                    !categoryId
                      ? "bg-primary text-white"
                      : "text-secondary hover:bg-white hover:text-primary",
                  )}
                >
                  Todas las categorías
                </motion.button>
                {categories.map((cat: any) => (
                  <motion.button
                    key={cat.id}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => handleUpdateFilter("categoryId", cat.id)}
                    className={cn(
                      "text-left px-4 py-3 rounded-full text-[13px] font-bold  ",
                      categoryId === cat.id
                        ? "bg-primary text-white"
                        : "text-secondary hover:bg-white hover:text-primary",
                    )}
                  >
                    {cat.name}
                  </motion.button>
                ))}
              </div>
            </section>

            {(q || categoryId) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="w-full text-red-500 hover:bg-red-50 rounded-xl py-4 font-bold text-xs"
              >
                <X size={14} className="mr-2" />
                Limpiar Filtros
              </Button>
            )}
          </aside>

          {/* Grid de Productos */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="aspect-4/5 bg-system-gray-6 rounded-4xl animate-pulse"
                    />
                  ))}
                </motion.div>
              ) : products.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {products.map((product: any) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-20 text-center"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-secondary/10 border border-border/5">
                    <Search size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    No encontramos lo que buscas
                  </h3>
                  <p className="text-secondary/50 text-sm mt-2 max-w-md mx-auto">
                    Intenta ajustando tus filtros o buscando con otros términos.
                  </p>
                  <Button
                    onClick={clearFilters}
                    variant="primary"
                    className="mt-8 rounded-full"
                  >
                    Ver todo el catálogo
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </Container>

      {/* Mobile Filters Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-md bg-white z-70 shadow-2xl lg:hidden flex flex-col pt-20 p-8"
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-black italic underline decoration-primary/30">
                  Filtros
                </h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-10 h-10 rounded-full bg-accent/50 flex items-center justify-center text-secondary hover:bg-accent transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-10 pb-10">
                <section className="space-y-4">
                  <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-secondary/40">
                    Categorías
                  </h3>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => {
                        handleUpdateFilter("categoryId", "");
                        setIsFilterOpen(false);
                      }}
                      className={cn(
                        "text-left px-5 py-3 rounded-2xl text-[14px] font-bold transition-all",
                        !categoryId
                          ? "bg-primary text-white"
                          : "bg-accent/50 text-secondary",
                      )}
                    >
                      Todas las categorías
                    </button>
                    {categories.map((cat: any) => (
                      <button
                        key={cat.id}
                        onClick={() => {
                          handleUpdateFilter("categoryId", cat.id);
                          setIsFilterOpen(false);
                        }}
                        className={cn(
                          "text-left px-5 py-3 rounded-2xl text-[14px] font-bold transition-all",
                          categoryId === cat.id
                            ? "bg-primary text-white"
                            : "bg-accent/50 text-secondary",
                        )}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </section>
              </div>

              {(q || categoryId) && (
                <Button
                  onClick={() => {
                    clearFilters();
                    setIsFilterOpen(false);
                  }}
                  className="w-full rounded-2xl py-4 font-black uppercase tracking-widest text-[11px]"
                >
                  Limpiar todos los filtros
                </Button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
