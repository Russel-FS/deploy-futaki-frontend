import React from "react";
import { 
  Package, 
  Tags, 
  Users, 
  ArrowUpRight 
} from "lucide-react";
import { useAdminStats } from "../hooks/use-admin-stats";

export const AdminDashboardPageContent = () => {
  const { data: stats, isLoading } = useAdminStats();

  const statItems = [
    { label: "Total Productos", value: stats?.products ?? 0, icon: Package, color: "text-blue-500", bg: "bg-blue-50" },
    { label: "Categorías", value: stats?.categories ?? 0, icon: Tags, color: "text-purple-500", bg: "bg-purple-50" },
    { label: "Administradores", value: stats?.admins ?? 0, icon: Users, color: "text-green-500", bg: "bg-green-50" },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-secondary mt-1">Bienvenido al panel de administración de Futeki.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {statItems.map((stat, i) => (
          <div key={i} className="p-6 bg-white rounded-3xl border border-border/50 hover:shadow-sm transition-all group">
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl`}>
                <stat.icon size={24} />
              </div>
              <ArrowUpRight className="text-border group-hover:text-primary transition-colors" size={20} />
            </div>
            <div>
              <p className="text-secondary text-sm font-medium">{stat.label}</p>
              <h3 className="text-3xl font-bold mt-1">
                {isLoading ? (
                  <div className="h-9 w-16 bg-accent animate-pulse rounded-lg" />
                ) : (
                  stat.value
                )}
              </h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-border/50 p-8 h-64 flex items-center justify-center text-secondary border-dashed">
        <p>Próximamente: Gráficos de actividad y stock bajo.</p>
      </div>
    </div>
  );
};
