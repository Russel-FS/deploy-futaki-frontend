"use client";

import React from "react";
import { motion } from "framer-motion";

export interface CategoryData {
  name: string;
  count: number;
}

const ACCENT_COLORS = [
  "bg-blue-500",
  "bg-violet-500",
  "bg-pink-500",
  "bg-amber-400",
  "bg-emerald-500",
];

export const CategoryChart = ({ data }: { data: CategoryData[] }) => {
  const max = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-8">
        <h3 className="text-xl font-bold text-foreground tracking-tight">
          Distribución
        </h3>
        <p className="text-[13px] text-secondary/60 font-medium mt-1">
          Productos por categoría
        </p>
      </div>

      {data.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-secondary/30 text-sm font-medium">
          Sin datos disponibles
        </div>
      ) : (
        <ul className="flex-1 flex flex-col justify-between gap-5">
          {data.map((item, i) => (
            <li key={item.name} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[13px] font-semibold text-foreground truncate max-w-[160px]">
                  {item.name}
                </span>
                <span className="text-[13px] font-bold text-secondary/50 tabular-nums">
                  {item.count}
                </span>
              </div>
              <div className="h-[6px] w-full bg-system-gray-6 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${ACCENT_COLORS[i % ACCENT_COLORS.length]}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.count / max) * 100}%` }}
                  transition={{
                    delay: i * 0.08,
                    duration: 0.6,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
