import React from "react";
import { motion } from "framer-motion";

interface MemphisEmptyStateProps {
  message: string;
}

export const MemphisEmptyState: React.FC<MemphisEmptyStateProps> = ({
  message,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative w-64 h-48 mb-6"
      >
        <svg
          viewBox="0 0 400 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          <path
            d="M50 150C50 94.7715 94.7715 50 150 50H250C305.228 50 350 94.7715 350 150C350 205.228 305.228 250 250 250H150C94.7715 250 50 205.228 50 150Z"
            fill="#f2f2f7"
          />

          <path
            d="M150 250C150 194.772 194.772 150 250 150C305.228 150 350 194.772 350 250H150Z"
            fill="#0071e3"
            opacity="0.9"
          />

          <circle cx="250" cy="110" r="35" fill="#1d1d1f" />

          <rect
            x="80"
            y="140"
            width="100"
            height="80"
            rx="12"
            fill="#ffffff"
            stroke="#d2d2d7"
            strokeWidth="6"
          />
          <path
            d="M100 160H160M100 180H140"
            stroke="#d2d2d7"
            strokeWidth="6"
            strokeLinecap="round"
          />

          <circle
            cx="160"
            cy="110"
            r="28"
            fill="#ffffff"
            stroke="#0071e3"
            strokeWidth="8"
          />
          <path
            d="M140 130L115 155"
            stroke="#0071e3"
            strokeWidth="10"
            strokeLinecap="round"
          />

          <circle cx="80" cy="80" r="12" fill="#ffcc00" />
          <path
            d="M310 70L325 85M325 70L310 85"
            stroke="#ff3b30"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <circle cx="340" cy="220" r="8" fill="#34c759" />
        </svg>
      </motion.div>
      <h3 className="text-[17px] font-bold text-foreground mb-1.5">
        {message}
      </h3>
      <p className="text-[14px] text-secondary/80 font-medium text-center max-w-xs leading-relaxed">
        Agrega contenido o ajusta tu búsqueda.
      </p>
    </div>
  );
};
