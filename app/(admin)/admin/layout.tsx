"use client";

import React from "react";
import { AdminSidebar } from "@/admin/presentation/components/admin-sidebar";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "@/shared/ui/toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-system-gray-6 text-foreground font-sans">
      <Toaster />
      <AdminSidebar />
      <main className="flex-1 relative overflow-y-auto w-full">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative px-6 py-10 lg:px-12 lg:py-16 max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
