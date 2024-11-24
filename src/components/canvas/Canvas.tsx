import { useEffect, useRef } from "react";
import { ONE_SIDE, render } from "./render";

type Props = {
  type: string;
  value: number;
};

const Canvas = ({ type, value }: Props) => {
  // canvasの初期化
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // ここから描画
  useEffect(() => {
    const getCanvas = async () =>
      await new Promise<HTMLCanvasElement>((resolve) => {
        resolve(canvasRef.current!);
      });

    const getContext = async (canvas: HTMLCanvasElement) =>
      await new Promise<CanvasRenderingContext2D>((resolve) => {
        resolve(canvas.getContext("2d")!);
      });

    const bootRender = async () => {
      const canvas = await getCanvas();
      canvas.width = ONE_SIDE;
      canvas.height = ONE_SIDE;
      const ctx = await getContext(canvas);
      render(ctx, { type, value });
    };

    (async () => await bootRender())();
  }, [type, value]);

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
};

export default Canvas;
