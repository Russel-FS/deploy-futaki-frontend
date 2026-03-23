"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../lib/theme-context";
import { Palette as PaletteIcon, Check, X, Plus } from "lucide-react";

const palettes = [
  { id: "apple", color: "#0071e3", name: "Apple Blue" },
  { id: "midnight", color: "#8b5cf6", name: "Midnight" },
  { id: "nature", color: "#10b981", name: "Nature" },
  { id: "rose", color: "#fb7185", name: "Rose Gold" },
  { id: "industrial", color: "#f59e0b", name: "Industrial" },
] as const;

export const PaletteSwitcher: React.FC = () => {
  const {
    palette: currentPalette,
    setPalette,
    customColor,
    setCustomColor,
  } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setCustomColor(newColor);
    if (currentPalette !== "custom") {
      setPalette("custom");
    }
  };

  return (
    <div className="fixed top-24 right-8 z-50 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className="bg-white/90 dark:bg-accent/90 backdrop-blur-xl p-4 rounded-4xl shadow-2xl border border-border/40 flex flex-col gap-3"
          >
            <div className="px-2 mb-1 flex items-center justify-between">
              <span className="text-[10px] font-black uppercase tracking-widest text-secondary/60">
                Personalizar
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-secondary/40 hover:text-secondary transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
            <div className="flex gap-3">
              <div className="relative group">
                <input
                  type="color"
                  value={customColor}
                  onChange={handleCustomColorChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  title="Color Personalizado"
                />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-full shadow-inner border-2 border-dashed border-secondary/30 transition-all flex items-center justify-center relative overflow-hidden"
                  style={{
                    backgroundColor:
                      currentPalette === "custom" ? customColor : "transparent",
                  }}
                >
                  {currentPalette === "custom" ? (
                    <Check className="w-4 h-4 text-white mix-blend-difference" />
                  ) : (
                    <Plus className="w-4 h-4 text-secondary/40" />
                  )}
                </motion.div>
                {currentPalette === "custom" && (
                  <motion.div
                    layoutId="active-palette"
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground"
                  />
                )}
              </div>

              {/* Predefined Palettes */}
              {palettes.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPalette(p.id)}
                  className="relative group"
                  title={p.name}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full shadow-inner border-2 border-transparent transition-all overflow-hidden"
                    style={{ backgroundColor: p.color }}
                  >
                    {currentPalette === p.id && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </motion.div>
                  {currentPalette === p.id && (
                    <motion.div
                      layoutId="active-palette"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-foreground"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-white/90 dark:bg-accent/90 backdrop-blur-xl rounded-full shadow-2xl border border-border/40 flex items-center justify-center group transition-all"
        style={{
          color:
            currentPalette === "custom"
              ? customColor
              : palettes.find((p) => p.id === currentPalette)?.color,
        }}
      >
        <PaletteIcon className="w-6 h-6 transition-transform group-hover:rotate-12" />
      </motion.button>
    </div>
  );
};
