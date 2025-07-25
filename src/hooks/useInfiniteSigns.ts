import { getSigns } from "@/services/getSigns";
import { InfiniteSignType } from "@/services/schema/sign-schema";
import { InfiniteData, useInfiniteQuery, UseInfiniteQueryResult } from "@tanstack/react-query";

export const useInfiniteSigns = (): UseInfiniteQueryResult<
  InfiniteData<InfiniteSignType>,
  Error
> => {
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
