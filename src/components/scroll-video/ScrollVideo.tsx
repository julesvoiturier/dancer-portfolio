// "use client";

// import { useRef } from "react";
// import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
// import useCanvasRender from "@/hooks/useCanvasRender";

// interface ScrollVideoProps {
//   images: HTMLImageElement[];
// }

// export function ScrollVideo({ images }: ScrollVideoProps) {
//   const ref = useRef<HTMLCanvasElement>(null);
//   const { scrollYProgress } = useScroll();
//   const totalFrames = images.length;

//   const render = useCanvasRender(images);

//   const currentIndex = useTransform(
//     scrollYProgress,
//     [0, 1],
//     [0, totalFrames - 1],
//   );

//   useMotionValueEvent(currentIndex, "change", (latest) => {
//     const scaledIndex = Math.round(latest);
//     render(scaledIndex, ref);
//   });

//   return (
//     <div className="h-full w-full">
//       <canvas
//         className="-z-20 scale-135 object-fill grayscale"
//         ref={ref}
//       ></canvas>
//     </div>
//   );
// }

// export default ScrollVideo;

"use client";

import { useEffect, useRef } from "react";
import { useMotionValueEvent, useScroll, useTransform } from "motion/react";
import useCanvasRender from "@/hooks/useCanvasRender";

interface ScrollVideoProps {
  images: HTMLImageElement[];
}

export default function ScrollVideo({ images }: ScrollVideoProps) {
  const ref = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll();
  const totalFrames = images.length;

  const render = useCanvasRender(images);

  const currentIndex = useTransform(
    scrollYProgress,
    [0, 1],
    [0, totalFrames - 1],
  );

  useEffect(() => {
    const canvas = ref.current;
    if (canvas && canvas.parentElement) {
      const parentWidth = canvas.parentElement.clientWidth;
      const parentHeight = canvas.parentElement.clientHeight;

      canvas.width = parentWidth;
      canvas.height = parentHeight;
    }

    if (images.length) {
      render(0, ref);
    }
  }, [images, render]);

  useMotionValueEvent(currentIndex, "change", (latest) => {
    const index = Math.round(latest);
    render(index, ref);
  });

  return (
    <div className="h-full w-full">
      <canvas className="-z-20 scale-135 object-fill grayscale" ref={ref} />
    </div>
  );
}
