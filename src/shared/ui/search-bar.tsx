"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/shared/lib/utils";

interface SearchBarProps {
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      router.push(`/catalog?q=${encodeURIComponent(value.trim())}`);
      setValue("");
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <form onSubmit={handleSearch} className="relative group">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Buscar lo que necesites..."
          className="w-full bg-system-gray-6 border border-transparent focus:bg-system-gray-6/50 focus:border-primary h-10 px-10 rounded-full text-xs transition-all outline-none italic font-medium"
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-secondary transition-colors group-hover:text-primary" />
        {value && (
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase text-primary hover:opacity-80 transition-opacity"
          >
            Enter
          </button>
        )}
      </form>
    </div>
  );
};
