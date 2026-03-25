import { motion } from "framer-motion";
import { Container } from "@/shared/ui/container";
import { WhatsAppIcon } from "@/shared/ui/whatsapp-icon";
import { COMPANY_CONFIG } from "@/core/config/company.config";
import { ChevronLeft, Package } from "lucide-react";
import Link from "next/link";

import { Product } from "@/catalog/domain/entities/catalog.entity";

interface ProductDetailsProps {
  product: Product;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  const whatsappNumber = COMPANY_CONFIG.contact.whatsapp;
  const message = encodeURIComponent(
    COMPANY_CONFIG.whatsappMessages.productQuery(
      product.name,
      product.price.toString(),
    ),
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="min-h-screen bg-[#f5f5f7] dark:bg-background pt-24 pb-20">
      <Container>
        <div className="flex items-center justify-between mb-12">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-foreground transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Volver al catálogo
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square rounded-[2.5rem] overflow-hidden bg-white dark:bg-accent/10 shadow-sm border border-border/20"
          >
            {product.imageUrl ? (
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-normal"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-accent/5">
                <Package size={64} className="text-secondary/20" />
              </div>
            )}
          </motion.div>

          <div className="flex flex-col h-full py-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-6">
                <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full">
                  {product.category?.name}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-foreground mb-4 leading-tight">
                {product.name}
              </h1>
              <p className="text-2xl font-bold mb-4 text-foreground/80 lowercase">
                Desde{" "}
                <span className="uppercase">
                  ${product.price.toLocaleString()}
                </span>
              </p>

              <div className="flex items-center gap-2 mb-8">
                <div
                  className={`w-2 h-2 rounded-full ${product.stock > 0 ? "bg-green-500" : "bg-red-500 animate-pulse"}`}
                />
                <span className="text-sm font-semibold text-foreground/70 tracking-tight">
                  {product.stock > 0
                    ? `En stock (${product.stock} unidades)`
                    : "Agotado temporalmente"}
                </span>
              </div>

              <div className="h-px bg-border/40 w-full mb-8" />

              <div className="mb-10 max-w-lg">
                <h3 className="text-sm font-bold uppercase tracking-widest text-secondary/60 mb-4">
                  Descripción
                </h3>
                <p className="text-lg text-secondary leading-relaxed">
                  {product.description}
                </p>
              </div>

              {product.specs &&
                Array.isArray(product.specs) &&
                product.specs.length > 0 && (
                  <div className="mb-12">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-secondary/60 mb-4">
                      Lo más destacado
                    </h3>
                    <ul className="space-y-3">
                      {product.specs.slice(0, 4).map((spec: any, i: number) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm font-medium text-foreground/80"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          <span className="text-secondary">{spec.label}:</span>
                          <span>{spec.value}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] text-white py-5 rounded-full text-sm font-black uppercase tracking-widest hover:brightness-110 hover:shadow-green-500/20 hover:shadow-xl transition-all active:scale-[0.98]"
                >
                  <WhatsAppIcon className="w-5 h-5 fill-current" />
                  Consultar
                </a>
                {product.specs &&
                  Array.isArray(product.specs) &&
                  product.specs.length > 0 && (
                    <button
                      onClick={() =>
                        document
                          .getElementById("full-specs")
                          ?.scrollIntoView({ behavior: "smooth" })
                      }
                      className="px-8 py-5 rounded-full border border-border/60 text-sm font-bold hover:bg-accent/10 transition-colors"
                    >
                      Ver especificaciones
                    </button>
                  )}
              </div>
            </motion.div>
          </div>
        </div>

        {product.specs &&
          Array.isArray(product.specs) &&
          product.specs.length > 0 && (
            <div
              id="full-specs"
              className="mt-32 pt-24 border-t border-primary/20 pb-40"
            >
              <div className="max-w-4xl mx-auto px-6">
                <h2 className="text-4xl font-extrabold tracking-tight text-foreground mb-20 text-center">
                  Especificaciones Técnicas
                </h2>

                <div className="space-y-16">
                  <section>
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-primary/50 mb-8 pb-2 border-b border-primary/20">
                      Configuración Detallada
                    </h3>
                    <div className="flex flex-col">
                      <div className="grid grid-cols-1 md:grid-cols-2 py-8 border-b border-border/10">
                        <div className="text-lg font-bold text-foreground mb-2 md:mb-0">
                          Categoría
                        </div>
                        <div className="text-lg text-secondary/80 font-medium">
                          {product.category?.name}
                        </div>
                      </div>

                      {product.specs.map((spec: any, i: number) => (
                        <div
                          key={i}
                          className="grid grid-cols-1 md:grid-cols-2 py-8 border-b border-border/10"
                        >
                          <div className="text-lg font-bold text-foreground mb-2 md:mb-0">
                            {spec.label}
                          </div>
                          <div className="text-lg text-secondary/80 font-medium">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </div>
            </div>
          )}
      </Container>
    </div>
  );
};
