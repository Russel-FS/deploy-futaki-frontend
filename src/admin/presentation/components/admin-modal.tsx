"use client";

import React from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const AdminModal = ({
  isOpen,
  onClose,
  title,
  children,
}: AdminModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-md"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative w-full max-w-2xl bg-white dark:bg-[#0A0A0A] rounded-[2.5rem] shadow-2xl overflow-hidden"
          >
            {/* Cabecera Fija */}
            <div className="flex items-center justify-between p-8 pb-4 border-b border-border/5">
              <h2 className="text-xl font-black tracking-tighter text-foreground">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-3 bg-accent/5 hover:bg-accent/10 rounded-full transition-all active:scale-90"
              >
                <X size={20} className="text-secondary" />
              </button>
            </div>

            <div className="p-8 pt-4 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
