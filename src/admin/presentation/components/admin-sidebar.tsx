"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, Tags, LogOut, Image } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import FutakiLogo from "@/shared/ui/futaki-logo";
import { motion } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Image, label: "Banner Principal", href: "/admin/hero" },
  { icon: Package, label: "Productos", href: "/admin/products" },
  { icon: Tags, label: "Categorías", href: "/admin/categories" },
];

const tooltipVariants = {
  rest: { opacity: 0, x: -15, scale: 0.95 },
  hover: { opacity: 1, x: 0, scale: 1 },
};

const tooltipTransition = {
  type: "spring",
  stiffness: 400,
  damping: 25,
} as const;

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-[88px] h-[calc(100vh-2rem)] sticky top-4 z-40 my-4 ml-4 hidden md:flex flex-col">
      <div className="flex-1 w-full bg-white/80 backdrop-blur-xl border border-border/10 rounded-3xl shadow-xl shadow-black/5 flex flex-col py-6 items-center">
        {/* Logo Section */}
        <div className="mb-10 w-full px-3">
          <motion.div
            initial="rest"
            whileHover="hover"
            className="relative flex justify-center w-full group"
          >
            <Link
              href="/"
              className="flex items-center justify-center p-3 rounded-2xl outline-none w-full"
            >
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-black/5 group-hover:bg-primary/10 transition-colors">
                <FutakiLogo className="h-10 w-auto text-primary" />
              </div>
            </Link>

            <motion.div
              variants={tooltipVariants}
              transition={tooltipTransition}
              className="absolute left-[110%] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-xl text-white text-[12px] font-bold whitespace-nowrap z-50 shadow-xl pointer-events-none"
            >
              Ir al Sitio Público
            </motion.div>
          </motion.div>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 flex flex-col gap-3 w-full px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <motion.div
                key={item.href}
                initial="rest"
                whileHover="hover"
                className="relative flex items-center justify-center w-full group"
              >
                <Link
                  href={item.href}
                  className={cn(
                    "relative flex items-center justify-center p-3.5 rounded-2xl transition-all w-full outline-none",
                  )}
                >
                  {isActive && (
                    <motion.div
                      layoutId="admin-active-pill"
                      className="absolute inset-0 bg-primary/10 rounded-2xl"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}

                  <item.icon
                    size={22}
                    className={cn(
                      "relative z-10 transition-colors duration-300",
                      isActive
                        ? "text-primary"
                        : "text-secondary/60 group-hover:text-foreground",
                    )}
                  />
                </Link>

                <motion.div
                  variants={tooltipVariants}
                  transition={tooltipTransition}
                  className="absolute left-[110%] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-xl text-white text-[12px] font-bold whitespace-nowrap z-50 shadow-xl pointer-events-none flex items-center gap-2"
                >
                  {item.label}
                  {isActive && (
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                  )}
                </motion.div>
              </motion.div>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="mt-auto px-3 w-full">
          <motion.div
            initial="rest"
            whileHover="hover"
            className="relative flex justify-center w-full group"
          >
            <Link
              href="/"
              className="flex items-center justify-center p-3.5 rounded-2xl transition-all w-full outline-none bg-red-500/5 group-hover:bg-red-500/10 text-red-500/60 group-hover:text-red-500"
            >
              <LogOut
                size={22}
                className="relative z-10 transition-transform duration-300 group-hover:-translate-x-0.5"
              />
            </Link>

            <motion.div
              variants={tooltipVariants}
              transition={tooltipTransition}
              className="absolute left-[110%] top-1/2 -translate-y-1/2 px-3 py-1.5 bg-red-500/90 backdrop-blur-md rounded-xl text-white text-[12px] font-bold whitespace-nowrap z-50 shadow-xl pointer-events-none"
            >
              Cerrar Sesión
            </motion.div>
          </motion.div>
        </div>
      </div>
    </aside>
  );
};
