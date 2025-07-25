"use client";
import Image from "next/image";
import { Suspense, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CirclePlay, Trash } from "lucide-react";
import { Button } from "../ui/button";

import { useDeleteMutation } from "@/hooks/useDeleteMutation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "../ui/input";
import SignPlayCanvs from "./sign-play-canvas";
import TimeDisplay from "../common/time-display";
import { cn } from "@/lib/utils";
import { SignType } from "@/services/schema/sign-schema";
import Loading from "../common/loading";

const SignItem = ({ image_url, created_at, id, message, writer, avatar }: SignType) => {
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const [open, setIsOpen] = useState(false);
  const [playing, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { mutate, isPending, isError } = useDeleteMutation(handleClose);

  function handleClose() {
    setIsOpen(false);
  }

  const handleDelete = () => {
    if (passwordRef.current) {
      const password = passwordRef.current.value;
      if (password.length === 0 || password.trim().length === 0) return passwordRef.current.focus();
      mutate({ id, password });
    }
  };

  const stopDraw = () => {
    setIsPlaying(false);
  };

  const shouldTruncate = message.length > 50;

  const avatar_image = avatar ? `/images/${avatar}.png` : "/images/male1.png";

  return (
    <Card className="gap-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Avatar className="rounded-none">
            <AvatarImage src={avatar_image} />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>

          <div className="flex flex-col text-xs">
            <p>{writer}</p>
            <TimeDisplay isoDate={created_at} />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button
              title="흔적보기"
              disabled={playing}
              className="ml-auto cursor-pointer"
              variant={playing ? "default" : "outline"}
              onClick={() => {
                setIsPlaying(true);
              }}
            >
              <CirclePlay />
            </Button>
            <Dialog open={open} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button
                  title="삭제"
                  className="cursor-pointer text-xs"
                  disabled={playing}
                  variant="outline"
                >
                  <Trash />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[250px]">
                <DialogHeader>
                  <DialogTitle className="text-center">비밀번호</DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2">
                  <Input
                    disabled={isPending}
                    name="password"
                    type="password"
                    placeholder="비밀번호"
                    ref={passwordRef}
                  />
                  {isError && <div className="text-xs text-red-500">비밀번호를 확인해주세요.</div>}
                </div>

                <div className="m-auto">
                  <Button
                    disabled={isPending}
                    variant="destructive"
                    className="cursor-pointer"
                    onClick={handleDelete}
                  >
                    확인
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border bg-gray-50 p-4">
          {playing ? (
            <ErrorBoundary
              fallback={
                <div className="flex h-40 w-full flex-col items-center justify-center gap-1.5 bg-gray-200 font-semibold">
                  <p>흔적을 발견하지 못했습니다.</p>
                  <button
                    onClick={() => stopDraw()}
                    className="cursor-pointer rounded-md bg-white p-1 text-xs hover:bg-gray-50"
                  >
                    서명 보기
                  </button>
                </div>
              }
            >
              <Suspense
                fallback={
                  <div className="flex h-40 w-full items-center justify-center bg-gray-200">
                    <Loading />
                  </div>
                }
              >
                <SignPlayCanvs id={id} stopDraw={stopDraw} />
              </Suspense>
            </ErrorBoundary>
          ) : (
            <div className="relative h-40 w-full bg-white">
              <Image
                className="absolute bg-contain"
                fill
                src={image_url}
                alt="서명"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
        </div>
        <div className="flex flex-col pt-3 text-sm leading-relaxed text-gray-700">
          <p
            className={cn(
              "whitespace-pre",
              isExpanded ? "max-h-72 overflow-y-auto" : "line-clamp-3"
            )}
          >
            {message}
          </p>
          {shouldTruncate && (
            <span className="ml-auto pt-1 text-xs text-blue-500">
              <button
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => setIsExpanded((pre) => !pre)}
              >
                {isExpanded ? "접기" : "더보기"}
              </button>
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SignItem;
