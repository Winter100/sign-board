"use client";

import SignItem from "./sign-item";
import { useEffect, useRef } from "react";
import { useInfiniteSigns } from "@/hooks/useInfiniteSigns";
import SkeletonCanvas from "../common/skeleton-canvas";
import { cn } from "@/lib/utils";

const SignList = () => {
  const { hasNextPage, isFetchingNextPage, fetchNextPage, isLoading, isError, data } =
    useInfiniteSigns();
  const observerTargetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentObserverTarget = observerTargetRef.current;
    if (!currentObserverTarget || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: "100px",
        threshold: 0.1,
      }
    );

    observer.observe(currentObserverTarget);

    return () => {
      if (currentObserverTarget) {
        observer.unobserve(currentObserverTarget);
      }
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-10">
        <SkeletonCanvas />
        <SkeletonCanvas />
        <SkeletonCanvas />
      </div>
    );
  }

  if (isError || !data?.pages[0]) {
    return (
      <div className="flex flex-col items-center gap-4 p-10">
        <p>서명을 받아오지 못했습니다.</p>
        <p>잠시 후 다시 시도해주세요.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10">
      {data?.pages.map((page) => page.item.map((sign) => <SignItem key={sign.id} {...sign} />))}
      {hasNextPage && (
        <div ref={observerTargetRef} className="flex h-10 items-center justify-center">
          {isFetchingNextPage ? "더 불러오는 중..." : "스크롤하여 더 보기"}
        </div>
      )}

      {!hasNextPage && !isError && (
        <div
          className={cn(
            "flex items-center justify-center text-2xl font-bold text-gray-900",
            data.pages[0].item.length < 1 && "min-h-[80dvh]"
          )}
        >
          {data?.pages[0].item.length < 1 ? "서명이 없습니다" : "마지막 서명 입니다."}
        </div>
      )}
    </div>
  );
};

export default SignList;
