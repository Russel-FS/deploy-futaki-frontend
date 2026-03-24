"use client";

import React from "react";
import { Container } from "./container";
import Link from "next/link";
import { motion } from "framer-motion";
import { TopBar } from "./top-bar";
import { SearchBar } from "./search-bar";
import { Menu } from "lucide-react";
import { COMPANY_CONFIG } from "@/core/config/company.config";
import FutakiLogo from "./futaki-logo";

export const Navbar: React.FC = () => {
  return (
    <>
      <TopBar />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <Container className="h-16 md:h-18 flex items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="hover:opacity-80 transition-opacity"
            >
              <FutakiLogo className="h-8 md:h-10 w-auto" />
            </Link>
          </div>

          <SearchBar />

          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-secondary">
              <Link href="#catalog" className="hover:text-primary transition-colors">Tienda</Link>
              <Link href="#blog" className="hover:text-primary transition-colors">Blog</Link>
            </nav>
            <div className="flex items-center gap-4 border-l border-border pl-8">
              <button className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-[13px] font-bold hover:opacity-90 transition-opacity whitespace-nowrap">
                Contacto
              </button>
            </div>
          </div>
        </Container>
      </motion.nav>
    </>
  );
};
