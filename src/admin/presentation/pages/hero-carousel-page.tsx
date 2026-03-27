"use client";

import React, { useState, useEffect } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Eye,
  ChevronLeft,
  ChevronRight,
  Loader2,
  Settings,
  Layout,
  LayoutGrid,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/shared/ui/button";
import { useSlides, useDeleteSlide, HeroSlide } from "../hooks/use-slides";
import { HeroSlideForm } from "../components/hero-slide-form";
import { cn } from "@/shared/lib/utils";

export const HeroCarouselPage = () => {
  const [selectedSlide, setSelectedSlide] = useState<HeroSlide | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(0);
  const [draftData, setDraftData] = useState<any>(null);

  const { data: slides = [], isLoading } = useSlides();
  const deleteMutation = useDeleteSlide();

  // seleccion inicial
  useEffect(() => {
    if (slides.length > 0 && !selectedSlide && !isCreating) {
      setSelectedSlide(slides[0]);
      setPreviewIndex(0);
    }
  }, [slides, selectedSlide, isCreating]);

  /**
   * Navega entre los slides
   * @param direction "next" | "prev"
   * @returns void
   */
  const handleNavigate = (direction: "next" | "prev") => {
    if (slides.length === 0) return;
    setIsCreating(false);

    let newIndex;
    if (direction === "next") {
      newIndex = (previewIndex + 1) % slides.length;
    } else {
      newIndex = (previewIndex - 1 + slides.length) % slides.length;
    }

    setPreviewIndex(newIndex);
    setSelectedSlide(slides[newIndex]);
  };

  /**
   * Abre el formulario para crear un nuevo slide
   * @returns void
   */
  const handleOpenCreate = () => {
    setSelectedSlide(null);
    setIsCreating(true);
    setDraftData({
      title: "Nuevo Banner",
      subtitle: "Personaliza este texto en el editor",
      ctaText: "Más información",
      color: "bg-primary",
      imageUrl: null,
    });
  };

  /**
   * Elimina un slide
   * @param id
   * @returns void
   */
  const handleDelete = (id: string) => {
    if (confirm("¿Estás seguro de eliminar este banner?")) {
      deleteMutation.mutate(id);
      if (selectedSlide?.id === id) {
        setSelectedSlide(null);
        setPreviewIndex(0);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-primary/40" />
      </div>
    );
  }

  // que se muestra en el canvas
  const canvasData = isCreating ? draftData : draftData || slides[previewIndex];

  return (
    <div className="max-w-[1600px] mx-auto sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* contenido principal */}
        <div className="lg:col-span-8 space-y-8">
          {/* Header */}
          <div className="flex flex-wrap space-y-4 items-center justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tighter text-foreground flex items-center gap-3">
                Diseño de Portada
              </h1>
              <p className="text-secondary/50 text-[13px] font-medium mt-1">
                Visualiza y gestiona el impacto visual de tu tienda en tiempo
                real.
              </p>
            </div>
            <div className="flex gap-3">
              {isCreating && (
                <Button
                  variant="ghost"
                  className="rounded-full px-8 py-4 h-auto font-bold text-sm border border-border/10 hover:bg-red-50 hover:text-red-500 transition-all"
                  onClick={() => {
                    setIsCreating(false);
                    setDraftData(null);
                    if (slides.length > 0)
                      setSelectedSlide(slides[previewIndex]);
                  }}
                >
                  Cancelar
                </Button>
              )}
              <Button
                className="rounded-full px-8 py-4 h-auto font-bold text-sm shadow-xl shadow-primary/10 transition-transform active:scale-95"
                onClick={handleOpenCreate}
              >
                <Plus size={18} className="mr-2" />
                Nuevo Slide
              </Button>
            </div>
          </div>

          {/* vista previa */}
          <section className="space-y-4">
            <div className="flex items-center justify-between px-2">
              <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-secondary/40 flex items-center gap-2">
                <Eye size={14} />
                {isCreating
                  ? "Vista Previa (Creando Nuevo)"
                  : "Vista Previa de los Slides"}
              </h2>
              {slides.length > 0 && !isCreating && (
                <div className="text-[11px] font-black text-secondary/30 bg-system-gray-6 px-3 py-1 rounded-full border border-border/5">
                  {previewIndex + 1} / {slides.length}
                </div>
              )}
            </div>

            <div className="relative group aspect-21/9 w-full rounded-[2.5rem] overflow-hidden bg-system-gray-6 shadow-2xl border border-border/10 ring-1 ring-black/5">
              <AnimatePresence mode="wait">
                {canvasData ? (
                  <motion.div
                    key={canvasData.id || "draft"}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/20 to-transparent z-10" />

                    {canvasData.imageUrl ? (
                      <img
                        src={canvasData.imageUrl}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-zinc-800 to-zinc-950 flex flex-col items-center justify-center text-white/20 gap-4">
                        <ImageIcon size={64} strokeWidth={1} />
                        <div className="text-center">
                          <p className="text-sm font-black uppercase tracking-widest text-white/40">
                            Sin Imagen Seleccionada
                          </p>
                          <p className="text-xs font-medium">
                            Sube una imagen en el editor lateral
                          </p>
                        </div>
                      </div>
                    )}

                    <div className="absolute inset-0 z-20 flex flex-col justify-center px-10 md:px-20 scale-90 md:scale-100 origin-left">
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="max-w-xl"
                      >
                        {isCreating && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-white/80 border border-white/10 mb-6 group-hover:bg-primary/20 transition-colors">
                            <Sparkles size={10} className="text-yellow-400" />
                            Nuevo Banner en Borrador
                          </span>
                        )}
                        <h3 className="text-3xl md:text-5xl font-black text-white mb-3 leading-[0.9] uppercase tracking-tighter">
                          {canvasData.title || "Sin título"}
                        </h3>
                        <p className="text-white/60 text-sm md:text-base font-medium mb-8 line-clamp-2 max-w-sm">
                          {canvasData.subtitle || "Escribe una descripción..."}
                        </p>
                        {canvasData.ctaText && (
                          <div
                            className={cn(
                              "inline-flex px-8 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest text-white shadow-2xl transition-all duration-300",
                              canvasData.color || "bg-primary",
                            )}
                          >
                            {canvasData.ctaText}
                          </div>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-system-gray-6">
                    <p className="text-secondary/40 font-bold">
                      No hay slides para mostrar
                    </p>
                  </div>
                )}
              </AnimatePresence>

              {!isCreating && slides.length > 1 && (
                <div className="absolute bottom-6 right-6 z-40 flex gap-3">
                  <button
                    onClick={() => handleNavigate("prev")}
                    className="p-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-white hover:text-black transition-all active:scale-90"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => handleNavigate("next")}
                    className="p-3 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-white hover:bg-white hover:text-black transition-all active:scale-90"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* controles del editor */}
        <div className="lg:col-span-4 lg:sticky lg:top-8 animate-in fade-in slide-in-from-right-4 duration-700">
          <div className="bg-white rounded-[2.5rem] p-8 border border-border/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />

            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div>
                  <h2 className="text-xl font-black tracking-tight">
                    Editor de Slide
                  </h2>
                  <p className="text-[11px] font-bold text-secondary/40 uppercase tracking-widest mt-0.5">
                    {isCreating ? "Creando nuevo" : "Ajustes de contenido"}
                  </p>
                </div>
              </div>

              {selectedSlide || isCreating ? (
                <HeroSlideForm
                  key={selectedSlide?.id || "new"}
                  initialData={selectedSlide}
                  onFormChange={setDraftData}
                  onSuccess={() => {
                    setIsCreating(false);
                    setDraftData(null);
                  }}
                  onCancel={() => {
                    setIsCreating(false);
                    setDraftData(null);
                    if (slides.length > 0)
                      setSelectedSlide(slides[previewIndex]);
                  }}
                />
              ) : (
                <div className="py-20 text-center space-y-4">
                  <div className="w-16 h-16 bg-system-gray-6 rounded-full flex items-center justify-center mx-auto text-secondary/20">
                    <Edit2 size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-secondary">
                      No hay slide seleccionado
                    </p>
                    <p className="text-xs text-secondary/40 mt-1 max-w-[200px] mx-auto">
                      Utiliza las flechas en el preview para seleccionar un
                      slide o crea uno nuevo.
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    onClick={handleOpenCreate}
                    className="text-primary hover:bg-primary/5 rounded-xl font-bold text-xs"
                  >
                    Crear slide nuevo
                  </Button>
                </div>
              )}
            </div>
          </div>

          {!isCreating && selectedSlide && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-red-50/50 rounded-3xl border border-red-100 flex items-center justify-between"
            >
              <div className="flex flex-col">
                <span className="text-[11px] font-black text-red-600 uppercase tracking-widest">
                  Zona de Peligro
                </span>
                <span className="text-[10px] text-red-400 font-medium">
                  Esta acción no se puede deshacer
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(selectedSlide.id)}
                className="text-red-500 hover:bg-red-500 hover:text-white rounded-xl h-9 font-bold text-[11px]"
              >
                Eliminar Slide
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
