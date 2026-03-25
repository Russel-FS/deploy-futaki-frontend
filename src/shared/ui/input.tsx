"use client";

import React, { forwardRef } from "react";
import { cn } from "@/shared/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex w-full bg-system-gray-6 border border-transparent rounded-2xl p-3.5 text-sm font-bold placeholder:text-secondary/30 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all",
            error && "border-red-500/50 bg-red-500/5",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-tight">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label className="text-[10px] font-black uppercase tracking-widest text-secondary/40 ml-1">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            "flex w-full bg-system-gray-6 border border-transparent rounded-2xl p-3.5 text-sm font-bold placeholder:text-secondary/30 focus:outline-none focus:ring-1 focus:ring-primary/20 transition-all min-h-[80px] resize-none",
            error && "border-red-500/50 bg-red-500/5",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="text-[10px] font-bold text-red-500 ml-1 uppercase tracking-tight">
            {error}
          </p>
        )}
      </div>
    );
  }
);

TextArea.displayName = "TextArea";
