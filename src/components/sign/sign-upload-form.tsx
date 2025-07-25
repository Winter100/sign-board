"use client";
import Image from "next/image";
import DOMPurify from "dompurify";
import { useCallback, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { CirclePlay, Trash } from "lucide-react";
import { Point } from "@/types/signType";
import { AVATAR } from "@/constant/avatar";
import { createSignSchema, CreateSignType } from "@/services/schema/sign-schema";
import BaseCanvas from "../common/base-canvas";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import { useSignMutation } from "@/hooks/useSignMutation";

interface SignUploadFormProps {
  handleClose: () => void;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const SignUploadForm = ({ handleClose }: SignUploadFormProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawing = useRef(false);
  const allPaths = useRef<Point[][]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const { isPending, mutate } = useSignMutation(handleClose);

  {
    /*
  유효성 검사 완료.
  데이터를 보내기 전 한번더 유효성 검사? 후 보내는 로직 완성하기.
  */
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<CreateSignType>({
    resolver: zodResolver(createSignSchema),
    defaultValues: {
      avatar: "male1",
      message: "",
      password: "",
      paths: [],
      writer: "",
    },
  });

  const selectedAvatar = watch("avatar");
  const messageValue = watch("message");

  useEffect(() => {
    register("avatar");
    register("paths");
  }, [register]);

  const messageLength = messageValue ? messageValue.length : 0;

  const onSubmit = (data: CreateSignType) => {
    const formData = new FormData();

    const { avatar, message, password, paths, writer } = data;

    if (message && typeof message === "string") {
      const santizedMessage = DOMPurify.sanitize(message);
      formData.set("message", santizedMessage);
    }
    formData.set("avatar", avatar);
    formData.set("writer", writer);
    formData.set("password", password);
    formData.set("paths", JSON.stringify(paths));

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.toBlob(async (blob) => {
        if (blob) {
          formData.append("image", blob, "canvas_image.png");
          mutate(formData);
        }
      });
    }
  };

  {
    /* 캔버스에서 마우스 좌표를 얻어오는 함수 */
  }
  const getCanvasMousePosition = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) => {
      const rect = canvas?.getBoundingClientRect();

      const x = (e.clientX - rect.left) * (canvas.width / rect.width);
      const y = (e.clientY - rect.top) * (canvas.height / rect.height);

      return {
        x: Math.round(x),
        y: Math.round(y),
      };
    },
    []
  );

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (isPlaying) return;

    const { x, y } = getCanvasMousePosition(e, canvas);

    isDrawing.current = true;
    allPaths.current.push([{ x, y }]);
    setValue("paths", allPaths.current, { shouldValidate: true });

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = useCallback(
    (e: React.PointerEvent<HTMLCanvasElement>) => {
      if (isPlaying) return;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (!isDrawing.current) return;

      const { x, y } = getCanvasMousePosition(e, canvas);

      allPaths.current[allPaths.current.length - 1].push({ x, y });

      ctx.lineTo(x, y);
      ctx.stroke();
    },
    [isPlaying, getCanvasMousePosition]
  );

  const stopDraw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!isDrawing.current) return;

    setValue("paths", allPaths.current, { shouldValidate: true });
    isDrawing.current = false;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    if (isPlaying) return;

    isDrawing.current = false;
    allPaths.current = [];
    setValue("paths", allPaths.current, { shouldValidate: true });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const drawAnimatedPaths = () => {
    setIsPlaying(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const paths = allPaths.current;

    const handlePlay = async () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      try {
        for (const path of paths) {
          if (path.length > 0) {
            ctx.beginPath();
            if (!path[0].x || !path[0].y) return;
            ctx.moveTo(path[0].x, path[0].y);
          }

          for (let i = 1; i < path.length; i++) {
            const currentPoint = path[i];

            if (!currentPoint.x || !currentPoint.y) return;
            await sleep(3);
            ctx.lineTo(currentPoint.x, currentPoint.y);
            ctx.stroke();
          }
        }
      } catch (e) {
        console.error("흔적 e", e);
      } finally {
        setIsPlaying(false);
      }
    };

    handlePlay();
  };

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
  }, []);

  const disabled = isPlaying || isPending;

  return (
    <form className="flex flex-col gap-10" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-2">
          <label className={cn("text-xs sm:text-sm", errors.avatar && "text-red-400")}>
            아바타
          </label>
          <div className="flex items-center gap-2 rounded-md border p-0.5">
            {AVATAR.map((ava) => (
              <button
                disabled={disabled}
                type="button"
                onClick={() => setValue("avatar", ava.title, { shouldValidate: true })}
                key={ava.title}
                className={cn(
                  "relative h-8 w-8 cursor-pointer rounded-full",
                  selectedAvatar === ava.title ? "" : "opacity-20"
                )}
              >
                <Image src={`/images/${ava.title}.png`} fill alt="a" />
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="writer"
            className={cn("text-xs sm:text-sm", errors.writer && "text-red-400")}
          >
            작성자
          </label>
          <Input
            {...register("writer")}
            minLength={1}
            maxLength={15}
            name="writer"
            id="writer"
            className="text-xs sm:text-base"
            disabled={disabled}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label
            htmlFor="password"
            className={cn("text-xs sm:text-sm", errors.password && "text-red-400")}
          >
            비밀번호
          </label>

          <Input
            {...register("password")}
            minLength={4}
            maxLength={15}
            name="password"
            id="password"
            type="password"
            className="text-xs sm:text-base"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className={cn("text-xs sm:text-sm", errors.message && "text-red-400")}
        >
          <span>메시지</span>
          <span className="ml-1 text-xs text-gray-600">{Math.max(0, 200 - messageLength)}</span>
        </label>
        <Textarea
          {...register("message")}
          disabled={disabled}
          minLength={1}
          maxLength={200}
          className="h-20 resize-none text-xs break-words whitespace-normal sm:text-base"
          name="message"
          id="message"
          placeholder="따뜻한 메시지를 남겨주세요. (최대 200자)"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className={cn("text-xs sm:text-sm", errors.paths && "text-red-400")}>
          서명 그리기
        </label>
        <div className="flex items-center gap-8 rounded-md bg-gray-100 p-3">
          {/* 지우기 버튼 */}
          <Button
            disabled={disabled}
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={clearCanvas}
          >
            <Trash size={18} />
            서명 지우기
          </Button>

          <Button
            disabled={disabled}
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={drawAnimatedPaths}
          >
            <CirclePlay />
            서명 보기
          </Button>
        </div>

        <div className="rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 p-4">
          {/* 캔바스 */}
          <BaseCanvas
            className="h-40 w-full"
            width={600}
            heigth={200}
            onCanvasReady={handleCanvasReady}
            onPointerDown={startDrawing}
            onPointerMove={draw}
            onPointerUp={stopDraw}
            onPointerLeave={stopDraw}
          />

          {/* 캔바스 설명 */}
          <p
            className={cn(
              "mt-2 text-center text-xs",
              errors.paths ? "text-red-400" : "text-gray-500"
            )}
          >
            {errors.paths ? errors.paths.message : "마우스로 드래그하여 서명을 그려주세요."}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-end gap-4">
        <Button className="cursor-pointer" disabled={disabled} type="submit">
          서명 저장하기
        </Button>
      </div>
    </form>
  );
};

export default SignUploadForm;
