export const PUBLIC_QUERY_KEYS = {
  CATEGORIES: {
    ALL: ["public", "categories"] as const,
    FEATURED: ["public", "categories", "featured"] as const,
  },
  PRODUCTS: {
    ALL: ["public", "products"] as const,
    FEATURED: ["public", "products", "featured"] as const,
    DETAIL: (id: string) => ["public", "products", "detail", id] as const,
  },
  SLIDES: {
    ALL: ["public", "slides"] as const,
  },
};
