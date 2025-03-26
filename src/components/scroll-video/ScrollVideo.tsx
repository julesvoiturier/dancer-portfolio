"use client";

import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";

export function ScrollVideo() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const [isClient, setIsClient] = useState(false);

  const images = useMemo(() => {
    const loadedImages: HTMLImageElement[] = [];
    if (isClient) {
      for (let i = 1; i <= 2045; i++) {
        const idx = String(i).padStart(4, "0");
        const img = new Image();
        img.src = `/frames/${idx}.jpg`;
        loadedImages.push(img);
      }
    }
    return loadedImages;
  }, [isClient]);

  const totalFrames = images.length;
  const currentIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, totalFrames - 1],
  );

  const render = useCallback(
    (index: number) => {
      const canvas = ref.current;
      if (canvas && images[index]) {
        const context = canvas.getContext("2d");
        const img = images[index];
        if (context) {
          const canvasWidth = canvas.width;
          const canvasHeight = canvas.height;

          // Calculate aspect ratios for cover mode
          const imgAspect = img.width / img.height;
          const canvasAspect = canvasWidth / canvasHeight;

          let drawWidth,
            drawHeight,
            offsetX = 0,
            offsetY = 0;

          // If image aspect is wider than canvas, fit to width and crop height
          if (imgAspect > canvasAspect) {
            drawWidth = canvasWidth;
            drawHeight = canvasWidth / imgAspect;
            offsetY = (canvasHeight - drawHeight) / 2; // Center the image vertically
          }
          // If image aspect is taller than canvas, fit to height and crop width
          else {
            drawHeight = canvasHeight;
            drawWidth = canvasHeight * imgAspect;
            offsetX = (canvasWidth - drawWidth) / 2; // Center the image horizontally
          }

          context.clearRect(0, 0, canvasWidth, canvasHeight); // Clear previous frame
          context.drawImage(img, offsetX, offsetY, drawWidth, drawHeight); // Draw the image in cover mode
        }
      }
    },
    [images],
  );

  useMotionValueEvent(currentIndex, "change", (latest) => {
    const scaledIndex = Math.round(latest); // Round to get an integer index
    render(scaledIndex);
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Resize the canvas when window size changes
  useEffect(() => {
    const handleResize = () => {
      if (ref.current) {
        const canvas = ref.current;
        const parent = canvas.parentElement;
        if (parent) {
          canvas.width = parent.clientWidth;
          canvas.height = parent.clientHeight;
        }
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <canvas
        className="-z-20 scale-135 object-fill grayscale"
        ref={ref}
      ></canvas>
    </div>
  );
}

export default ScrollVideo;
