"use client";

import React from "react";
import { Container } from "@/shared/ui/container";
import { MOCK_POSTS } from "../infrastructure/mock-posts";
import { motion } from "framer-motion";

export const BlogSection: React.FC = () => {
  return (
    <section id="blog" className="py-24 bg-accent/30">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Inspiración Futeki.</h2>
          <p className="text-secondary text-lg max-w-2xl mx-auto">
            Explora nuestras últimas historias sobre diseño, tecnología e innovación sostenible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {MOCK_POSTS.map((post) => (
            <motion.div 
              key={post.id}
              whileHover={{ scale: 1.01 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-video mb-6 overflow-hidden rounded-3xl">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-3">{post.date}</p>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">{post.title}</h3>
              <p className="text-secondary line-clamp-2">{post.excerpt}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
};
