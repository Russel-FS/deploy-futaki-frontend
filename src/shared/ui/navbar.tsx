"use client";

import React from "react";
import { Container } from "./container";
import Link from "next/link";
import { motion } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";

export const Navbar: React.FC = () => {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <Container className="h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity"
        >
          Futeki
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="#catalog"
            className="text-sm font-medium text-secondary hover:text-foreground transition-colors"
          >
            Catálogo
          </Link>
          <Link
            href="#blog"
            className="text-sm font-medium text-secondary hover:text-foreground transition-colors"
          >
            Blog
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-secondary hover:text-foreground transition-colors"
          >
            Nosotros
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="text-sm font-medium hover:opacity-80">
            Contacto
          </button>
        </div>
      </Container>
    </motion.nav>
  );
};
