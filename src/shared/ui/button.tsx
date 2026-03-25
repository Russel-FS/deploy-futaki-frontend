"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/shared/lib/utils";

interface ButtonProps extends Omit<
  HTMLMotionProps<"button">,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 font-semibold tracking-tight transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";

  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-[12px] rounded-lg",
    md: "px-5 py-2.5 text-[13px] rounded-xl",
    lg: "px-7 py-3.5 text-[15px] rounded-2xl",
  };

  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    secondary:
      "bg-white  text-foreground border border-border/10 hover:bg-system-gray-6  shadow-xs",
    outline:
      "bg-transparent border border-border text-foreground hover:bg-system-gray-6 ",
    ghost:
      "bg-transparent text-secondary hover:text-foreground hover:bg-system-gray-6/50 ",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      className={cn(baseStyles, sizeStyles[size], variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
};
