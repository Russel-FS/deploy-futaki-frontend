"use client";

import React from "react";
import { Search } from "lucide-react";

export const SearchBar: React.FC = () => {
  return (
    <div className="flex-1 max-w-sm hidden md:block">
      <div className="relative group">
        <input
          type="text"
          placeholder="Buscar..."
          className="w-full bg-accent/50 dark:bg-accent/20 border border-transparent focus:border-primary/30 focus:ring-4 focus:ring-primary/10 h-9 px-10 rounded-full text-xs transition-all outline-none"
        />
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-secondary transition-colors" />
      </div>
    </div>
  );
};
