"use client";

import { RefObject, useEffect, useRef } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import useCanvasRender from "@/hooks/useCanvasRender";

interface VideoFrameScrollProps {
  images: Array<HTMLImageElement>;
}

export default function VideoFramesScroll({ images }: VideoFrameScrollProps) {
  const render = useCanvasRender(images);
  const { scrollYProgress } = useScroll();
  const currentIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, images.length - 1],
  );

  const ref = useRef<HTMLCanvasElement>(null) as RefObject<HTMLCanvasElement>;

  useMotionValueEvent(currentIndex, "change", (latest) => {
    const index = Math.round(latest);
    render(index, ref);
  });

  useEffect(() => {
    const canvas = ref.current;

    if (canvas?.parentElement) {
      const parentWidth = canvas.parentElement.offsetWidth;
      const parentHeight = canvas.parentElement.offsetHeight;
      canvas.width = parentWidth;
      canvas.height = parentHeight;
    }

    if (images.length) render(0, ref);
  }, [images, render]);

  return (
    <div className="aspect-square w-full overflow-hidden border border-border-glass bg-background">
      <canvas ref={ref} className="-z-20 scale-150 object-fill grayscale" />
    </div>
  );
}
