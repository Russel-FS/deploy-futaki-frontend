"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Container } from "@/shared/ui/container";
import Link from "next/link";
import { cn } from "@/shared/lib/utils";
import { usePublicSlides } from "@/catalog/presentation/hooks/use-public-catalog";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string | null;
  imageUrl: string;
  ctaText: string | null;
  ctaUrl: string | null;
  btnBgColor: string | null;
  btnTextColor: string | null;
  order: number;
}

export const HeroCarousel: React.FC = () => {
  const { data: slides = [], isLoading } = usePublicSlides();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides]);

  const next = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prev = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  if (isLoading) {
    return (
      <div className="h-[500px] md:h-[85vh] w-full bg-black flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-white/20" />
      </div>
    );
  }

  if (slides.length === 0) return null;

  const currentSlide = slides[current];

  return (
    <div className="relative h-[500px] md:h-[85vh] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent z-10" />
          <img
            src={currentSlide.imageUrl}
            alt={currentSlide.title}
            className="w-full h-full object-cover scale-105"
          />

          <Container className="absolute inset-0 z-20 flex flex-col justify-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-2xl px-6 md:px-0"
            >
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9] line-clamp-2">
                {currentSlide.title}
              </h1>
              {currentSlide.subtitle && (
                <p className="text-lg md:text-xl text-zinc-300 mb-10 font-medium max-w-lg line-clamp-3">
                  {currentSlide.subtitle}
                </p>
              )}

              {currentSlide.ctaText && (
                <Link
                  href={currentSlide.ctaUrl || "#"}
                  className="inline-block px-10 py-5 rounded-full text-sm font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-2xl"
                  style={{
                    backgroundColor: currentSlide.btnBgColor || "#000000",
                    color: currentSlide.btnTextColor || "#FFFFFF",
                  }}
                >
                  {currentSlide.ctaText}
                </Link>
              )}
            </motion.div>
          </Container>
        </motion.div>
      </AnimatePresence>

      {/* Controles */}
      {slides.length > 1 && (
        <>
          <div className="absolute bottom-10 right-10 z-30 flex gap-4">
            <button
              onClick={prev}
              className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all backdrop-blur-md"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* indicadores */}
          <div className="absolute bottom-10 left-10 z-30 flex gap-2">
            {slides.map((_: any, i: number) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === current ? "w-10 bg-white" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
