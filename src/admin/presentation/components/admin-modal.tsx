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
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="bg-white  w-full max-w-lg rounded-4xl border border-border/10 overflow-hidden shadow-2xl flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabecera Fija */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-border/5 bg-system-gray-6  ">
              <h2 className="text-xl font-bold tracking-tight text-foreground">
                {title}
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-secondary/70 hover:text-foreground hover:bg-white  rounded-full transition-all active:scale-90"
              >
                <X size={20} strokeWidth={2.5} />
              </button>
            </div>

            <div className="p-7 pt-4 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
