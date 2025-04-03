import { useCallback } from "react";

// Custom hook for rendering images on the canvas
const useCanvasRender = (images: HTMLImageElement[]) => {
  return useCallback(
    (index: number, ref: React.RefObject<HTMLCanvasElement>) => {
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
    [images], // This hook depends on the images array
  );
};

export default useCanvasRender;
