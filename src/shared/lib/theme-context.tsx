"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
type Palette =
  | "apple"
  | "midnight"
  | "nature"
  | "rose"
  | "industrial"
  | "custom";

interface ThemeContextType {
  theme: Theme;
  palette: Palette;
  customColor: string;
  toggleTheme: () => void;
  setPalette: (palette: Palette) => void;
  setCustomColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [palette, setPaletteState] = useState<Palette>("apple");
  const [customColor, setCustomColorState] = useState<string>("#0071e3");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
      .matches
      ? "dark"
      : "light";
    const initialTheme = savedTheme || systemTheme;

    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    }

    const savedPalette = localStorage.getItem("palette") as Palette | null;
    const savedCustomColor = localStorage.getItem("customColor");

    if (savedCustomColor) {
      setCustomColorState(savedCustomColor);
    }

    if (savedPalette) {
      setPaletteState(savedPalette);
      document.documentElement.setAttribute("data-palette", savedPalette);

      if (savedPalette === "custom" && savedCustomColor) {
        document.documentElement.style.setProperty(
          "--primary",
          savedCustomColor,
        );
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const setPalette = (newPalette: Palette) => {
    setPaletteState(newPalette);
    localStorage.setItem("palette", newPalette);
    document.documentElement.setAttribute("data-palette", newPalette);

    if (newPalette !== "custom") {
      document.documentElement.style.removeProperty("--primary");
    } else {
      document.documentElement.style.setProperty("--primary", customColor);
    }
  };

  const setCustomColor = (color: string) => {
    setCustomColorState(color);
    localStorage.setItem("customColor", color);
    if (palette === "custom") {
      document.documentElement.style.setProperty("--primary", color);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        palette,
        customColor,
        toggleTheme,
        setPalette,
        setCustomColor,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
