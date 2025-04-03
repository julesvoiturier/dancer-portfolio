"use client";

import { useRef, useState, useEffect } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import useAppStateStore from "@/stores/appStateStore";
import useFramesLoader from "@/hooks/useFramesLoader"; // Import the custom image loader hook
import useCanvasRender from "@/hooks/useCanvasRender"; // Import the custom render hook

export function ScrollVideo() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const [isClient, setIsClient] = useState(false);

  // Using the useImageLoader hook to load images
  const totalFrames = 2045;
  const { images, loadingPercentage } = useFramesLoader(totalFrames);

  // Update the app state with the loading percentage
  useEffect(() => {
    if (loadingPercentage >= 0 && loadingPercentage <= 100) {
      useAppStateStore
        .getState()
        .updateFramesLoadingPercentage(loadingPercentage);
    }
  }, [loadingPercentage]);

  // Using the useCanvasRender hook to handle rendering
  const render = useCanvasRender(images);

  const currentIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, totalFrames - 1],
  );

  useMotionValueEvent(currentIndex, "change", (latest) => {
    const scaledIndex = Math.round(latest); // Round to get an integer index
    render(scaledIndex, ref);
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
