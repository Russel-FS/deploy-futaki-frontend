"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/blog/domain/models/blog-post.model";
import { Calendar, User, ArrowLeft } from "lucide-react";
import { Navbar } from "@/shared/ui/navbar";
import { Footer } from "@/core/presentation/footer";

/**
 * Formatea una fecha
 * @param date Fecha a formatear
 * @returns Fecha formateada
 */
const formatDate = (date: Date | string) =>
  new Date(date).toLocaleDateString("es-PE", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

/**
 * Renderiza el contenido del artículo
 * @param content Contenido del artículo
 * @returns Contenido renderizado
 */
const renderContent = (content: string) => {
  return content
    .split("\n")
    .map((line, i) => {
      if (line.startsWith("# "))
        return `<h1 key="${i}" class="text-3xl font-black mt-10 mb-4">${line.slice(2)}</h1>`;
      if (line.startsWith("## "))
        return `<h2 key="${i}" class="text-2xl font-black mt-8 mb-3">${line.slice(3)}</h2>`;
      if (line.startsWith("### "))
        return `<h3 key="${i}" class="text-xl font-bold mt-6 mb-2">${line.slice(4)}</h3>`;
      if (line.startsWith("- "))
        return `<li key="${i}" class="ml-5 list-disc">${line.slice(2)}</li>`;
      if (line.startsWith("**") && line.endsWith("**"))
        return `<strong key="${i}" class="font-bold">${line.slice(2, -2)}</strong>`;
      if (line === "") return `<br key="${i}" />`;
      return `<p key="${i}" class="leading-relaxed">${line}</p>`;
    })
    .join("");
};

export const BlogPostPage = () => {
  const { slug } = useParams() as { slug: string };

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<BlogPost>({
    queryKey: ["public-blog-post", slug],
    queryFn: () =>
      fetch(`/api/blog/${slug}`).then((r) => {
        if (!r.ok) throw new Error("No se pudo obtener el artículo");
        return r.json();
      }),
    enabled: !!slug,
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {isLoading && (
        <div className="max-w-3xl mx-auto pt-28 px-6 space-y-4">
          <div className="h-8 bg-system-gray-6 rounded-xl animate-pulse w-2/3" />
          <div className="h-6 bg-system-gray-6 rounded-xl animate-pulse w-1/3" />
          <div className="aspect-video bg-system-gray-6 rounded-3xl animate-pulse mt-8" />
        </div>
      )}

      {isError && (
        <div className="max-w-3xl mx-auto pt-28 px-6 text-center">
          <p className="text-secondary/50 font-semibold">
            Artículo no encontrado.
          </p>
          <Link
            href="/blog"
            className="text-primary text-sm font-bold mt-4 inline-block"
          >
            ← Volver al Blog
          </Link>
        </div>
      )}

      {post && (
        <article className="max-w-3xl mx-auto pt-24 pb-24 px-6">
          {/* Back */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-secondary/50 hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft size={14} />
            Todos los artículos
          </Link>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-4 text-[12px] font-semibold text-secondary/50 mb-4">
              <span className="flex items-center gap-1">
                <Calendar size={12} />
                {formatDate(post.createdAt)}
              </span>
              {post.author?.name && (
                <span className="flex items-center gap-1">
                  <User size={12} />
                  {post.author.name}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-black text-foreground leading-tight mb-4">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-base text-secondary/60 font-medium leading-relaxed border-l-2 border-primary/30 pl-4 mb-8">
                {post.excerpt}
              </p>
            )}
          </motion.div>

          {/* imagen de portada */}
          {post.imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative aspect-video rounded-3xl overflow-hidden mb-12"
            >
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover"
              />
            </motion.div>
          )}

          {/* contenido */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="prose prose-sm max-w-none text-foreground/80 text-[15px] leading-[1.9] space-y-2 font-medium"
            dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
          />
        </article>
      )}
      <Footer />
    </div>
  );
};
