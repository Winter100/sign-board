import { getSigns } from "@/services/getSigns";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useInfiniteSigns = () => {
  return useInfiniteQuery({
    queryKey: ["sign", "list"],
    queryFn: getSigns,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNextPage && lastPage.nextCursor) {
        return lastPage.nextCursor;
      }
      return undefined;
    },
  });
};
