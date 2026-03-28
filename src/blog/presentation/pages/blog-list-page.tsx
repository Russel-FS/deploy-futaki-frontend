"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/blog/domain/models/blog-post.model";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Navbar } from "@/shared/ui/navbar";
import { Footer } from "@/core/presentation/footer";

const formatDate = (date: Date | string) =>
  new Date(date).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export const BlogListPage = () => {
  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["public-blog-posts"],
    queryFn: () => fetch("/api/blog").then((r) => r.json()),
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Hero */}
      <section className="pt-24 pb-12 px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-xs font-black uppercase tracking-widest text-primary/70 mb-4 block">
            Artículos y Noticias
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-foreground leading-tight">
            Blog Futeki
          </h1>
          <p className="text-base text-secondary/60 font-medium mt-4 max-w-xl">
            Noticias, artículos de tecnología, guías y más sobre el mundo del
            hardware y periféricos gaming.
          </p>
        </motion.div>
      </section>

      {/* posteos */}
      <section className="px-6 pb-24 max-w-5xl mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-3xl bg-system-gray-6 animate-pulse h-80"
              />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24 text-secondary/40">
            <p className="text-lg font-semibold">
              No hay artículos publicados aún.
            </p>
            <p className="text-sm mt-2">¡Vuelve pronto!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} className="block">
                  {/* portada */}
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-system-gray-6 mb-4">
                    {post.imageUrl ? (
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-primary/10 to-system-gray-5 flex items-center justify-center">
                        <span className="text-4xl">📝</span>
                      </div>
                    )}
                  </div>

                  {/* Contenido */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 text-[11px] font-semibold text-secondary/50">
                      <span className="flex items-center gap-1">
                        <Calendar size={11} />
                        {formatDate(post.createdAt)}
                      </span>
                      {post.author?.name && (
                        <span className="flex items-center gap-1">
                          <User size={11} />
                          {post.author.name}
                        </span>
                      )}
                    </div>

                    <h2 className="text-base font-black text-foreground leading-snug group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {post.excerpt && (
                      <p className="text-sm text-secondary/60 font-medium line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    )}

                    <div className="flex items-center gap-1 text-xs font-bold text-primary pt-1">
                      Leer artículo
                      <ArrowRight
                        size={12}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
};
