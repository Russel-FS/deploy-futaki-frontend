"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle } from "lucide-react";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning";
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDialog = ({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  variant = "danger",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/20 backdrop-blur-[2px]"
            onClick={onCancel}
          />

          {/* Diálogo */}
          <motion.div
            key="dialog"
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-sm -translate-x-1/2 -translate-y-1/2"
          >
            <div className="bg-white rounded-3xl shadow-2xl shadow-black/10 border border-border/10 p-6 flex flex-col gap-5">
              {/* Icono y texto */}
              <div className="flex items-start gap-4">
                <div
                  className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    variant === "danger"
                      ? "bg-red-50 text-red-500"
                      : "bg-amber-50 text-amber-500"
                  }`}
                >
                  <AlertTriangle size={18} />
                </div>
                <div className="pt-0.5">
                  <p className="text-[14px] font-black text-foreground leading-snug">
                    {title}
                  </p>
                  {description && (
                    <p className="text-[12px] text-secondary/60 font-medium mt-1 leading-relaxed">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              {/* Acciones */}
              <div className="flex items-center justify-end gap-2">
                <button
                  onClick={onCancel}
                  className="h-9 px-4 rounded-xl text-[12px] font-bold text-secondary/70 hover:text-foreground hover:bg-system-gray-6 transition-all"
                >
                  {cancelLabel}
                </button>
                <button
                  onClick={() => {
                    onConfirm();
                    onCancel();
                  }}
                  className={`h-9 px-4 rounded-xl text-[12px] font-bold text-white transition-all ${
                    variant === "danger"
                      ? "bg-red-500 hover:bg-red-600"
                      : "bg-amber-500 hover:bg-amber-600"
                  }`}
                >
                  {confirmLabel}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
