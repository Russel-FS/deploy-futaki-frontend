"use client";

import React from "react";
import { AdminSidebar } from "@/admin/presentation/components/admin-sidebar";
import { motion, AnimatePresence } from "framer-motion";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-white dark:bg-[#050505] text-foreground font-sans">
      <AdminSidebar />
      <main className="flex-1 relative overflow-y-auto">
        <div className="absolute inset-0 bg-linear-to-tr from-accent/5 via-transparent to-primary/5 pointer-events-none" />
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative p-8 lg:p-12"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
