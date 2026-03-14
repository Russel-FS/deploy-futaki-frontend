"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Container } from "@/shared/ui/container";

const SLIDES = [
  {
    id: 1,
    title: "Innovación en tus manos",
    subtitle: "Descubre la nueva generación de MacBook Pro con chip M3 Max.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1600&auto=format&fit=crop",
    cta: "Explorar MacBook",
    color: "bg-blue-600"
  },
  {
    id: 2,
    title: "El futuro es Titanium",
    subtitle: "iPhone 15 Pro. El primer iPhone con diseño de titanio aeroespacial.",
    image: "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=1600&auto=format&fit=crop",
    cta: "Ver iPhone",
    color: "bg-zinc-800"
  },
  {
    id: 3,
    title: "Gaming sin límites",
    subtitle: "Las mejores laptops gamer del mundo están aquí.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=1600&auto=format&fit=crop",
    cta: "Ver Gaming",
    color: "bg-purple-600"
  }
];

export const HeroCarousel: React.FC = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const next = () => setCurrent((prev) => (prev + 1) % SLIDES.length);
  const prev = () => setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);

  return (
    <div className="relative h-[500px] md:h-[80vh] w-full overflow-hidden bg-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent z-10" />
          <img
            src={SLIDES[current].image}
            alt={SLIDES[current].title}
            className="w-full h-full object-cover scale-105"
          />
          
          <Container className="absolute inset-0 z-20 flex flex-col justify-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter leading-[0.9]">
                {SLIDES[current].title}
              </h1>
              <p className="text-lg md:text-xl text-zinc-300 mb-10 font-medium">
                {SLIDES[current].subtitle}
              </p>
              <button className={`${SLIDES[current].color} text-white px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-2xl`}>
                {SLIDES[current].cta}
              </button>
            </motion.div>
          </Container>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute bottom-10 right-10 z-30 flex gap-4">
        <button onClick={prev} className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={next} className="p-4 rounded-full border border-white/20 text-white hover:bg-white hover:text-black transition-all">
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-10 z-30 flex gap-2">
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? "w-10 bg-white" : "w-2 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
};
