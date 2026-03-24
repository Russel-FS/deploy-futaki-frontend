import { useQuery } from "@tanstack/react-query";

export const useAdminStats = () => {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: () => fetch("/api/admin/stats").then((res) => res.json()),
  });
};
