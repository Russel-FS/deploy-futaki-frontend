"use client";

import React from "react";
import { Container } from "@/shared/ui/container";
import { Button } from "@/shared/ui/button";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <Container className="relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-secondary text-lg font-medium mb-4">Elegancia Futeki</h2>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 max-w-4xl mx-auto leading-[1.1]">
            Tecnología diseñada para <span className="text-primary italic">inspirar</span>.
          </h1>
          <p className="text-secondary text-xl max-w-2xl mx-auto mb-12">
            Explora nuestro catálogo de productos premium. Innovación, minimalismo y potencia en cada detalle.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="primary" className="w-full sm:w-auto">
              Ver Catálogo
            </Button>
            <Button variant="secondary" className="w-full sm:w-auto">
              Saber más
            </Button>
          </div>
        </motion.div>
      </Container>
      
      {/* Abstract Background Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
    </section>
  );
};
