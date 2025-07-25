"use client";
import { getPaths } from "@/services/getPaths";
import { PathsType } from "@/services/schema/sign-schema";
import { useSuspenseQuery, UseSuspenseQueryResult } from "@tanstack/react-query";

export const useSignPath = (id: string): UseSuspenseQueryResult<PathsType, Error> => {
  return useSuspenseQuery({
    queryKey: ["paths", id],
    queryFn: () => getPaths(id),
    retry: 1,
    staleTime: Infinity,
  });
};
