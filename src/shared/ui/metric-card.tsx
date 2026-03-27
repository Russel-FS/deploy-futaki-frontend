import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/shared/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  isLoading?: boolean;
  className?: string;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  trend,
  isLoading,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn(
        "relative p-5 bg-white border border-border/10 rounded-3xl overflow-hidden group",
        "transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-border/20",
        className,
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <h4 className="text-[14px] font-semibold text-secondary/70 tracking-tight">
          {title}
        </h4>
        {icon && (
          <div className="text-secondary/40 group-hover:text-primary transition-colors duration-300">
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between z-10 relative">
        {isLoading ? (
          <div className="h-9 w-16 bg-system-gray-6 rounded-lg animate-pulse" />
        ) : (
          <div className="text-3xl font-black tracking-tighter text-foreground">
            {value}
          </div>
        )}

        {trend && !isLoading && (
          <div
            className={cn(
              "text-[13px] font-bold px-2 py-0.5 rounded-full mb-1",
              trend.isNeutral
                ? "bg-system-gray-6 text-secondary/80"
                : trend.isPositive
                  ? "text-green-600"
                  : "text-red-600",
            )}
          >
            {trend.value}
          </div>
        )}
      </div>

      <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-primary/5 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </motion.div>
  );
};
