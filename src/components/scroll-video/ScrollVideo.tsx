"use client";

import { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";

export function ScrollVideo() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();

  const [isClient, setIsClient] = useState(false); // To detect if we're on the client-side

  // Detect if we're on the client side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const images = useMemo(() => {
    const loadedImages: HTMLImageElement[] = [];

    if (isClient) {
      // Load images only if we're on the client side
      for (let i = 1; i <= 1023; i++) {
        const idx = String(i).padStart(4, "0");
        const img = new Image();
        img.src = `/vid/${idx}.jpg`;
        loadedImages.push(img);
      }
    }

    return loadedImages;
  }, [isClient]); // Recompute when isClient changes

  // We want to map scroll progress to the image index, and the total number of images
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
    handleResize(); // Initial size adjustment

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="h-full w-full">
      <canvas
        className="-z-20 scale-130 object-fill grayscale"
        ref={ref}
      ></canvas>
    </div>
  );
}

export default ScrollVideo;
