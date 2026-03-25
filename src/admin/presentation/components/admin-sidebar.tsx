"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import FutakiLogo from "@/shared/ui/futaki-logo";
import { motion } from "framer-motion";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Productos", href: "/admin/products" },
  { icon: Tags, label: "Categorías", href: "/admin/categories" },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-72 border-r border-border/10 bg-white dark:bg-accent/5 dark:backdrop-blur-3xl flex flex-col sticky top-0 h-screen z-40">
      <div className="p-8 pb-10">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="p-2 bg-primary/10 rounded-xl group-hover:scale-110 transition-transform">
            <FutakiLogo className="h-6 w-auto text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-black tracking-tighter text-foreground leading-none">FUTEKI</h2>
            <span className="text-[10px] font-bold text-secondary/60 uppercase tracking-widest">Admin Panel</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 px-4 flex flex-col gap-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all group",
                isActive 
                  ? "text-primary-foreground" 
                  : "text-secondary hover:text-foreground hover:bg-black/3 dark:hover:bg-white/3"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-primary rounded-2xl shadow-lg shadow-primary/20"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              
              <div className="relative flex items-center gap-3 z-10">
                <item.icon size={20} className={cn(isActive ? "text-white" : "text-secondary group-hover:text-primary transition-colors")} />
                {item.label}
              </div>

              <ChevronRight 
                size={14} 
                className={cn(
                  "relative z-10 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-1",
                  isActive ? "text-white/60" : "text-secondary/40"
                )} 
              />
            </Link>
          );
        })}
      </nav>

      <div className="p-6 mt-auto">
        <div className="p-4 bg-accent/5 rounded-4xl border border-border/5">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-secondary hover:text-red-500 hover:bg-red-500/10 transition-all group"
          >
            <LogOut size={20} className="group-hover:-translate-x-1 transition-transform" />
            Cerrar Sesión
          </Link>
        </div>
      </div>
    </aside>
  );
};
