"use clinet";

import { useCallback, useEffect, useRef } from "react";
import BaseCanvas from "../common/base-canvas";
import { useSignPath } from "@/hooks/useSignPath";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const SignPlayCanvs = ({ id, stopDraw }: { id: string; stopDraw: () => void }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { data } = useSignPath(id);

  const handleCanvasReady = useCallback((canvas: HTMLCanvasElement) => {
    canvasRef.current = canvas;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handlePlay = async () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      try {
        const paths = data.points;
        for (const path of paths) {
          for (let i = 1; i < path.length; i++) {
            const prevPoint = path[i - 1];
            const currentPoint = path[i];

            if (!currentPoint.x || !currentPoint.y || !prevPoint.x || !prevPoint.y) {
              continue;
            }

            ctx.beginPath();

            ctx.moveTo(prevPoint.x, prevPoint.y);
            ctx.lineTo(currentPoint.x, currentPoint.y);

            ctx.stroke();

            await sleep(3);
          }
        }
      } catch (e) {
        console.error("흔적 e", e);
      } finally {
        stopDraw();
      }
    };

    handlePlay();
  }, [data, stopDraw]);

  return (
    <BaseCanvas
      className="h-40 w-full"
      width={600}
      heigth={200}
      onCanvasReady={handleCanvasReady}
    />
  );
};

export default SignPlayCanvs;
