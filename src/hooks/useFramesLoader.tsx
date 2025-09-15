import { useState, useEffect } from "react";

const useFramesLoader = (totalFrames: number) => {
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    const loadImage = (index: number) => {
      const img = new Image();
      img.src = `/frames/${String(index).padStart(4, "0")}.jpg`;

      return new Promise<HTMLImageElement>((resolve, reject) => {
        img.onload = () => resolve(img);
        img.onerror = reject;
      });
    };

    const loadAllImages = async () => {
      for (let i = 1; i <= totalFrames; i++) {
        try {
          const img = await loadImage(i);
          loadedImages.push(img);
          const loadedPercentage = Math.round(
            (loadedImages.length / totalFrames) * 100,
          );
          setLoadingPercentage(loadedPercentage);
        } catch (error) {
          console.error(`Error loading image ${i}:`, error);
        }
      }

      setImages(loadedImages);
    };

    loadAllImages();
  }, [totalFrames]);

  return { images, loadingPercentage };
};

export default useFramesLoader;
