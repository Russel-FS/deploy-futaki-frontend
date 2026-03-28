"use client";

import React, { useState } from "react";
import { Container } from "./container";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TopBar } from "./top-bar";
import { SearchBar } from "./search-bar";
import FutakiLogo from "./futaki-logo";
import { Menu, X } from "lucide-react";

export const Navbar: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <TopBar />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
      >
        <Container className="h-16 md:h-18 flex items-center justify-between gap-4 md:gap-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:opacity-80 transition-opacity">
              <FutakiLogo className="h-8 md:h-10 w-auto" />
            </Link>
          </div>

          <SearchBar className="hidden md:block flex-1 max-w-sm" />

          <div className="flex items-center gap-4 md:gap-8">
            <nav className="hidden lg:flex items-center gap-8 text-[13px] font-medium text-secondary">
              <Link
                href="/catalog"
                className="hover:text-primary transition-colors"
              >
                Tienda
              </Link>
              <Link
                href="#blog"
                className="hover:text-primary transition-colors"
              >
                Blog
              </Link>
            </nav>
            <div className="hidden lg:flex items-center gap-4 border-l border-border pl-8">
              <button className="bg-primary text-primary-foreground px-5 py-2 rounded-full text-[13px] font-bold hover:opacity-90 transition-opacity whitespace-nowrap">
                Contacto
              </button>
            </div>

            <button
              className="lg:hidden p-2 -mr-2 text-secondary hover:text-primary transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </Container>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border/50 bg-background overflow-hidden"
            >
              <Container className="py-6 flex flex-col gap-6">
                <SearchBar className="w-full md:hidden" />
                <nav className="flex flex-col gap-4 text-sm font-bold text-foreground">
                  <Link
                    href="/catalog"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors"
                  >
                    Tienda
                  </Link>
                  <Link
                    href="#blog"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="#contacto"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="hover:text-primary transition-colors"
                  >
                    Contacto
                  </Link>
                </nav>
              </Container>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};
