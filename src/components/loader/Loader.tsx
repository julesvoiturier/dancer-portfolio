// "use client";

// import { useEffect, useState } from "react";
// import useFramesLoader from "@/hooks/useFramesLoader";
// import useAppStateStore from "@/stores/appStateStore";

// interface LoaderProps {
//   totalFrames: number;
//   onComplete: (images: HTMLImageElement[]) => void;
// }

// const Loader = ({ totalFrames, onComplete }: LoaderProps) => {
//   const { images, loadingPercentage } = useFramesLoader(totalFrames);
//   const [isVisible, setIsVisible] = useState(true);

//   const MAX_BASE_PADDING = 10; // base padding in px at 100%
//   const MULTIPLIERS = [
//     1, 1.5, 2.25, 3.38, 5.06, 7.59, 11.39, 17.08, 25.62, 38.43, 57.64,
//   ];

//   const scaledPadding = (multiplier: number) =>
//     `${((loadingPercentage / 100) * MAX_BASE_PADDING * multiplier).toFixed(2)}px`;

//   useEffect(() => {
//     if (loadingPercentage >= 0 && loadingPercentage <= 100) {
//       useAppStateStore
//         .getState()
//         .updateFramesLoadingPercentage(loadingPercentage);
//     }
//   }, [loadingPercentage]);

//   useEffect(() => {
//     if (images.length === totalFrames) {
//       setTimeout(() => setIsVisible(false), 500); // Optional fade-out delay
//       onComplete(images);
//     }
//   }, [images, totalFrames, onComplete]);

//   if (!isVisible) return null;

//   const renderNestedDivs = (
//     depth: number,
//     children: React.ReactNode,
//   ): React.ReactNode => {
//     if (depth < 0) return children;
//     return (
//       <div
//         className="flex aspect-[1/2] w-auto items-center justify-center border border-border transition-all duration-100"
//         style={{ padding: scaledPadding(MULTIPLIERS[depth]) }}
//       >
//         {renderNestedDivs(depth - 1, children)}
//       </div>
//     );
//   };

//   return (
//     <div className="relative h-dvh w-full">
//       <div
//         className="absolute top-1/2 left-1/2 flex aspect-square w-auto -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full border border-border bg-background text-3xl font-bold transition-all duration-300"
//         style={{ padding: scaledPadding(0) }}
//       >
//         {renderNestedDivs(
//           MULTIPLIERS.length - 1,
//           <span className="flex h-full w-50 items-center justify-center rounded-full border border-border bg-background">
//             {loadingPercentage.toFixed()}%
//           </span>,
//         )}
//       </div>
//     </div>
//   );
// };

// export default Loader;

"use client";

import { useEffect, useState } from "react";
import useFramesLoader from "@/hooks/useFramesLoader";
import useAppStateStore from "@/stores/appStateStore";

interface LoaderProps {
  totalFrames: number;
  onComplete: (images: HTMLImageElement[]) => void;
}

const Loader = ({ totalFrames, onComplete }: LoaderProps) => {
  const { images, loadingPercentage } = useFramesLoader(totalFrames);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (loadingPercentage >= 0 && loadingPercentage <= 100) {
      useAppStateStore
        .getState()
        .updateFramesLoadingPercentage(loadingPercentage);
    }
  }, [loadingPercentage]);

  useEffect(() => {
    if (images.length === totalFrames) {
      setTimeout(() => setIsVisible(false), 500); // Optional fade-out delay
      onComplete(images);
    }
  }, [images, totalFrames, onComplete]);

  if (!isVisible) return null;

  // Calculate height: Start at 100% and go to 0%
  const width = `${loadingPercentage}%`;

  // Format the loading percentage as a 3-digit string (e.g., 005%)
  const formattedPercentage =
    loadingPercentage.toFixed(0).padStart(3, "0") + "%";

  return (
    <div className="relative h-dvh w-full">
      <div className="absolute top-1/2 right-24 left-24 flex h-[2px] -translate-y-1/2 transform items-center justify-start bg-zinc-800">
        <div
          style={{ width }}
          className="relative h-full bg-zinc-400 transition-all duration-300"
        />
        <span className="absolute top-6 left-0 flex transform flex-col bg-background">
          <p className="leading-none font-bold text-primary-foreground">
            Leelou Lancel
          </p>
          <p className="leading-none font-bold">Loading portfolio content</p>
          <p>{formattedPercentage}</p>
        </span>
      </div>
    </div>
  );
};

export default Loader;
