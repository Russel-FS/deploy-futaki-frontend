"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Tags,
  LogOut,
  ChevronRight,
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
    <aside className="w-72 border-r border-border/40 bg-white  flex flex-col sticky top-0 h-screen z-40">
      <div className="p-10">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl group-hover:scale-105 transition-transform">
            <FutakiLogo className="h-10 w-auto text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-foreground leading-[1.1]">
              Futeki
            </h2>
            <span className="text-[10px] font-bold text-secondary/40 uppercase tracking-[0.2em]">
              Administrador
            </span>
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
                "relative flex items-center justify-between px-5 py-3 rounded-xl text-[13px] font-semibold transition-all group",
                isActive
                  ? "text-primary"
                  : "text-secondary hover:text-foreground hover:bg-system-gray-6 ",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative flex items-center gap-3.5 z-10">
                <item.icon
                  size={18}
                  className={cn(
                    isActive
                      ? "text-primary"
                      : "text-secondary group-hover:text-primary transition-colors",
                  )}
                />
                {item.label}
              </div>

              <ChevronRight
                size={14}
                className={cn(
                  "relative z-10 transition-all opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5",
                  isActive ? "text-primary/40" : "text-secondary/40",
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
            <LogOut
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Cerrar Sesión
          </Link>
        </div>
      </div>
    </aside>
  );
};
