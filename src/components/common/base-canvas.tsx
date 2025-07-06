import { cn } from "@/lib/utils";
import { ComponentProps, useEffect, useRef } from "react";

interface BaseCanvasProps extends ComponentProps<"canvas"> {
  width?: number;
  heigth?: number;
  onCanvasReady: (ref: HTMLCanvasElement) => void;
}
const BaseCanvas = ({
  width = 600,
  heigth = 200,
  onCanvasReady,
  className,
  ...props
}: BaseCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Failed to get 2D rendering context");
      return;
    }

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#000000";

    onCanvasReady(canvas);
  }, [width, heigth, onCanvasReady]);
  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={heigth}
      className={cn("bg-white", className)}
      {...props}
    >
      캔버스를 지원하지 않는 브라우저 입니다.
    </canvas>
  );
};

export default BaseCanvas;
