export const ADMIN_QUERY_KEYS = {
  CATEGORIES: {
    ALL: ["admin", "categories"] as const,
    METRICS: ["admin", "categories", "metrics"] as const,
  },
  PRODUCTS: {
    ALL: ["admin", "products"] as const,
    METRICS: ["admin", "products", "metrics"] as const,
  },
  DASHBOARD: {
    STATS: ["admin", "dashboard", "stats"] as const,
  },
};
