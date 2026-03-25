"use client";

import React from "react";
import { 
  Package, 
  Tags, 
  Users, 
  ArrowUpRight 
} from "lucide-react";
import { useAdminStats } from "../hooks/use-admin-stats";
import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export const AdminDashboardPageContent = () => {
  const { data: stats, isLoading } = useAdminStats();

  const statItems = [
    { 
      label: "Total Productos", 
      value: stats?.products ?? 0, 
      icon: Package, 
      color: "text-blue-600 dark:text-blue-400", 
      bg: "bg-blue-50 dark:bg-blue-500/10",
      description: "Inventario activo"
    },
    { 
      label: "Categorías", 
      value: stats?.categories ?? 0, 
      icon: Tags, 
      color: "text-purple-600 dark:text-purple-400", 
      bg: "bg-purple-50 dark:bg-purple-500/10",
      description: "Segmentación de catálogo"
    },
    { 
      label: "Administradores", 
      value: stats?.admins ?? 0, 
      icon: Users, 
      color: "text-emerald-600 dark:text-emerald-400", 
      bg: "bg-emerald-50 dark:bg-emerald-500/10",
      description: "Acceso al panel"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-2"
      >
        <h1 className="text-4xl font-black tracking-tighter text-foreground leading-none">
          Dashboard
        </h1>
        <p className="text-secondary font-medium tracking-tight">
          Panel de control centralizado de <span className="text-primary font-bold">Futeki Intelligence</span>.
        </p>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid gap-8 md:grid-cols-3"
      >
        {statItems.map((stat, i) => (
          <motion.div 
            key={i} 
            variants={item}
            className="group relative p-8 bg-white dark:bg-white/2 rounded-[2.5rem] border border-border/5 hover:border-primary/20 transition-all shadow-sm hover:shadow-xl hover:shadow-primary/5 cursor-default overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 text-secondary/10 group-hover:text-primary/20 transition-colors">
              <stat.icon size={80} strokeWidth={1.5} />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl shadow-inner`}>
                  <stat.icon size={28} />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 px-3 py-1.5 rounded-full">
                  Hoy <ArrowUpRight size={12} />
                </div>
              </div>
              
              <div>
                <p className="text-secondary text-sm font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-5xl font-black tracking-tighter">
                    {isLoading ? (
                      <div className="h-12 w-20 bg-accent/20 animate-pulse rounded-2xl" />
                    ) : (
                      stat.value
                    )}
                  </h3>
                  <span className="text-xs font-bold text-secondary/60">unidades</span>
                </div>
                <p className="text-[11px] text-secondary/50 font-medium mt-4 border-t border-border/5 pt-4">
                  {stat.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-accent/5 dark:bg-white/1 rounded-[3rem] border-2 border-dashed border-border/10 p-12 text-center"
      >
        <div className="max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 bg-accent/10 rounded-2xl mx-auto flex items-center justify-center text-secondary">
            <Package size={32} />
          </div>
          <h4 className="text-xl font-black tracking-tight">Analitycs Avanzados</h4>
          <p className="text-secondary text-sm font-medium">Estamos preparando gráficas de rendimiento y predicción de stock mediante IA para optimizar tu cadena de suministro.</p>
        </div>
      </motion.div>
    </div>
  );
};
