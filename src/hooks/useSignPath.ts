"use client";
import { getPaths } from "@/services/getPaths";
import { useQuery } from "@tanstack/react-query";

export const useSignPath = (id: string) => {
  return useQuery({
    enabled: !!id,
    queryKey: ["paths", id],
    queryFn: () => getPaths(id),
    retry: 1,
    staleTime: Infinity,
  });
};
