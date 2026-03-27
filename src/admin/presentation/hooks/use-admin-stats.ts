import { useQuery } from "@tanstack/react-query";
import { ADMIN_QUERY_KEYS } from "../constants/query-keys";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ADMIN_QUERY_KEYS.DASHBOARD.STATS,
    queryFn: () => fetch("/api/admin/stats").then((res) => res.json()),
  });
};
