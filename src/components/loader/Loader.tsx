"use client";

import { useEffect } from "react";
import useFramesLoader from "@/hooks/useFramesLoader";
import useAppStateStore from "@/stores/appStateStore";

const LOADER_TEXT = "Loading portfolio content";

interface LoaderProps {
  totalFrames: number;
  onComplete: (images: Array<HTMLImageElement>) => void;
}

const Loader = ({ totalFrames, onComplete }: LoaderProps) => {
  const { images, loadingPercentage } = useFramesLoader(totalFrames);
  const width = `${loadingPercentage}%`;
  const formattedPercentage =
    loadingPercentage.toFixed(0).padStart(3, "0") + "%";

  useEffect(() => {
    if (loadingPercentage >= 0 && loadingPercentage <= 100) {
      useAppStateStore
        .getState()
        .updateFramesLoadingPercentage(loadingPercentage);
    }
  }, [loadingPercentage]);

  useEffect(() => {
    if (images.length === totalFrames) onComplete(images);
  }, [images, totalFrames, onComplete]);

  return (
    <div className="relative h-dvh w-full">
      <div className="absolute top-1/2 right-6 left-6 flex h-[2px] -translate-y-1/2 transform items-center justify-start bg-border-glass lg:right-24 lg:left-24">
        <div
          style={{ width }}
          className="relative h-full bg-border transition-all duration-100"
        />

        <span className="absolute top-3 left-0 flex transform flex-col bg-background">
          <p className="leading-none font-bold">{LOADER_TEXT}</p>
          <p>{formattedPercentage}</p>
        </span>
      </div>
    </div>
  );
};

export default Loader;
