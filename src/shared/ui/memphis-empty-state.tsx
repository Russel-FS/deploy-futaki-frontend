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
        className="relative w-64 h-64 mb-6"
      >
        <img
          src="/not-found.svg"
          className="object-contain w-full h-full"
          alt="Empty State"
        />
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
