"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  ChevronLeft,
  Settings,
  LogOut
} from "lucide-react";
import { cn } from "@/shared/lib/utils";
import FutakiLogo from "@/shared/ui/futaki-logo";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Package, label: "Productos", href: "/admin/products" },
  { icon: Tags, label: "Categorías", href: "/admin/categories" },
];

export const AdminSidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border bg-white flex flex-col sticky top-0 h-screen">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <FutakiLogo className="h-8 w-auto text-primary" />
        </Link>
      </div>

      <nav className="flex-1 p-4 flex flex-col gap-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all",
                isActive 
                  ? "bg-primary text-primary-foreground" 
                  : "text-secondary hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border mt-auto">
        <Link
          href="/"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium text-secondary hover:bg-accent hover:text-foreground transition-all"
        >
          <LogOut size={18} />
          Cerrar Sesión
        </Link>
      </div>
    </aside>
  );
};
