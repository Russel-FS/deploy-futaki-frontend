"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Pencil,
  Trash2,
  Globe,
  Lock,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/shared/ui/button";
import { BlogForm } from "@/admin/presentation/components/blog-form";
import {
  useAdminBlogPosts,
  useCreateBlogPost,
  useUpdateBlogPost,
  useDeleteBlogPost,
} from "@/admin/presentation/hooks/use-blog-posts";
import { BlogPost } from "@/blog/domain/models/blog-post.model";
import Image from "next/image";

export const BlogAdminPage = () => {
  const { data: posts = [], isLoading } = useAdminBlogPosts();
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();
  const deleteMutation = useDeleteBlogPost();

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);

  const handleEdit = (post: BlogPost) => {
    setEditing(post);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleSubmit = (data: Partial<BlogPost>) => {
    if (editing) {
      updateMutation.mutate({ id: editing.id, ...data } as any, {
        onSuccess: () => {
          setShowForm(false);
          setEditing(null);
        },
      });
    } else {
      createMutation.mutate(data as any, {
        onSuccess: () => setShowForm(false),
      });
    }
  };

  const handleDelete = (id: string) => {
    if (confirm("¿Eliminar este artículo permanentemente?")) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-foreground">Blog</h1>
          <p className="text-sm text-secondary/60 font-medium mt-1">
            {posts.length} artículo{posts.length !== 1 ? "s" : ""} en total
          </p>
        </div>
        <Button
          variant="primary"
          onClick={handleCreate}
          className="h-10 px-5 rounded-full gap-2"
        >
          <Plus size={16} />
          Nuevo Artículo
        </Button>
      </div>

      {/* panel del formulario */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white border border-border/10 rounded-3xl p-8 mb-6 "
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-black">
                {editing ? "Editar Artículo" : "Nuevo Artículo"}
              </h2>
              <button
                onClick={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
                className="text-secondary/40 hover:text-foreground transition-colors p-2 rounded-xl hover:bg-system-gray-6"
              >
                ✕
              </button>
            </div>
            <BlogForm
              initialData={editing}
              onSuccess={() => {
                setShowForm(false);
                setEditing(null);
              }}
              onSubmit={handleSubmit}
              isSubmitting={
                createMutation.isPending || updateMutation.isPending
              }
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tabla de posts */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 bg-system-gray-6 rounded-2xl animate-pulse"
            />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-16 text-secondary/40">
          <BookOpen size={40} className="mx-auto mb-4 opacity-30" />
          <p className="font-semibold">No hay artículos todavía</p>
          <p className="text-sm mt-1">
            Crea tu primer artículo haciendo clic en "Nuevo Artículo"
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <motion.div
              key={post.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white border border-border/10 rounded-2xl p-4 flex items-center gap-4 group hover: transition-shadow"
            >
              {/* imagen */}
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-system-gray-6 shrink-0">
                {post.imageUrl ? (
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    width={64}
                    height={64}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen size={20} className="text-secondary/20" />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {post.isPublished ? (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full">
                      <Globe size={9} /> Publicado
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[10px] font-bold text-secondary/40 bg-system-gray-6 px-2 py-0.5 rounded-full">
                      <Lock size={9} /> Borrador
                    </span>
                  )}
                  <span className="text-[10px] text-secondary/40 font-mono truncate">
                    /blog/{post.slug}
                  </span>
                </div>
                <p className="text-sm font-bold text-foreground truncate">
                  {post.title}
                </p>
                {post.excerpt && (
                  <p className="text-xs text-secondary/50 truncate mt-0.5">
                    {post.excerpt}
                  </p>
                )}
              </div>

              {/* acciones */}
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                {post.isPublished && (
                  <a
                    href={`/blog/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl hover:bg-system-gray-6 text-secondary/50 hover:text-foreground transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}
                <button
                  onClick={() => handleEdit(post)}
                  className="p-2 rounded-xl hover:bg-system-gray-6 text-secondary/50 hover:text-foreground transition-colors"
                >
                  <Pencil size={16} />
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="p-2 rounded-xl hover:bg-red-50 text-secondary/40 hover:text-red-500 transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
