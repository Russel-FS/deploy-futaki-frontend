"use client";

import React from "react";
import { Package, Tags, Users, ArrowUpRight, ImageOff } from "lucide-react";
import { useAdminStats } from "../hooks/use-admin-stats";
import { motion, Variants } from "framer-motion";
import { CategoryChart } from "../components/dashboard/category-chart";

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export const AdminDashboardPageContent = () => {
  const { data: stats, isLoading } = useAdminStats();

  const statItems = [
    {
      label: "Total Productos",
      value: stats?.products ?? 0,
      icon: Package,
      color: "text-blue-600 ",
      bg: "bg-blue-50 ",
      description: "Inventario activo",
    },
    {
      label: "Categorías",
      value: stats?.categories ?? 0,
      icon: Tags,
      color: "text-purple-600 ",
      bg: "bg-purple-50 ",
      description: "Segmentación de catálogo",
    },
    {
      label: "Administradores",
      value: stats?.admins ?? 0,
      icon: Users,
      color: "text-emerald-600 ",
      bg: "bg-emerald-50 ",
      description: "Acceso al panel",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-12">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex flex-col gap-1.5"
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-secondary text-sm font-medium opacity-60">
          Resumen operativo de{" "}
          <span className="text-primary font-semibold">Futeki</span>.
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
            className="group relative p-7 bg-white  rounded-3xl border border-border/10 hover:border-primary/30 transition-all cursor-default overflow-hidden "
          >
            <div className="absolute top-0 right-0 p-8 text-secondary/5 group-hover:text-primary/10 transition-colors">
              <stat.icon size={80} strokeWidth={1} />
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="bg-system-gray-6  p-3.5 rounded-xl border border-border/10">
                  <stat.icon size={22} className={stat.color} strokeWidth={2} />
                </div>
              </div>

              <div>
                <p className="text-secondary/70 text-[11px] font-semibold tracking-tight mb-1">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-2">
                  <h3 className="text-4xl font-bold tracking-tight text-foreground">
                    {isLoading ? (
                      <div className="h-10 w-16 bg-accent/20 animate-pulse rounded-xl" />
                    ) : (
                      stat.value
                    )}
                  </h3>
                  <span className="text-[10px] font-bold text-secondary/30 uppercase italic tracking-wider">
                    unidades
                  </span>
                </div>
                <p className="text-[11px] text-secondary/70 font-medium mt-4 border-t border-border/5 pt-4">
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
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 bg-white rounded-[2.5rem] border border-border/10 p-10 ">
          <div className="mb-8">
            <h3 className="text-xl font-bold text-foreground tracking-tight">
              Últimos Productos
            </h3>
            <p className="text-[13px] text-secondary/60 font-medium mt-1">
              Los 5 productos más recientemente añadidos al catálogo
            </p>
          </div>
          {isLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-14 bg-accent/20 animate-pulse rounded-2xl"
                />
              ))}
            </div>
          ) : !stats?.recentProducts?.length ? (
            <div className="flex flex-col items-center justify-center h-[260px] text-secondary/30">
              <Package size={40} strokeWidth={1} />
              <p className="mt-3 text-sm font-medium">No hay productos aún</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {stats.recentProducts.map((product, i) => (
                <motion.li
                  key={product.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.06,
                    type: "spring",
                    stiffness: 300,
                    damping: 24,
                  }}
                  className="flex items-center gap-4 px-5 py-3.5 rounded-2xl hover:bg-system-gray-6 transition-colors group"
                >
                  {/* Thumbnail */}
                  <div className="w-10 h-10 rounded-xl bg-system-gray-6 border border-border/10 overflow-hidden shrink-0 flex items-center justify-center text-secondary/30">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageOff size={16} strokeWidth={1.5} />
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-bold text-foreground truncate">
                      {product.name}
                    </p>
                    <p className="text-[12px] text-secondary/50 font-medium">
                      {product.category.name}
                    </p>
                  </div>

                  {/* Price */}
                  <span className="text-[14px] font-bold text-foreground tabular-nums shrink-0">
                    $
                    {product.price.toLocaleString("es-MX", {
                      minimumFractionDigits: 2,
                    })}
                  </span>
                </motion.li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-[2.5rem] border border-border/10 p-10 ">
          {isLoading ? (
            <div className="h-[320px] w-full bg-accent/20 animate-pulse rounded-2xl" />
          ) : (
            <CategoryChart data={stats?.productsByCategory || []} />
          )}
        </div>
      </motion.div>
    </div>
  );
};
