"use client";

import React from "react";
import { X } from "lucide-react";
import { cn } from "@/shared/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const AdminModal = ({ isOpen, onClose, title, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl relative z-10 animate-in zoom-in-95 fade-in duration-300 overflow-hidden">
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <h2 className="text-xl font-bold">{title}</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-accent rounded-full text-secondary transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
};
