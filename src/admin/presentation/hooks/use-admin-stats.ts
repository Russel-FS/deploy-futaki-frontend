import { useQuery } from "@tanstack/react-query";
import { ADMIN_QUERY_KEYS } from "../constants/query-keys";

export interface AdminStatsResponse {
  categories: number;
  products: number;
  admins: number;
  productsByCategory: { name: string; count: number }[];
  recentProducts: {
    id: string;
    name: string;
    price: number;
    category: { name: string };
    createdAt: string;
    imageUrl: string | null;
  }[];
}

export const useAdminStats = () => {
  return useQuery<AdminStatsResponse>({
    queryKey: ADMIN_QUERY_KEYS.DASHBOARD.STATS,
    queryFn: () => fetch("/api/admin/stats").then((res) => res.json()),
  });
};
