"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis"; // Import Lenis for smooth scroll
import { useLenis } from "lenis/react";

interface ContentSectionArticleProps {
  title: string;
  date: string;
  topParagraphs: string[];
  bottomParagraphs: string[];
  image: string;
  imageDescription: string;
  index: number;
  sectionTitleHeight: number;
}

export default function ContentSectionArticle({
  title,
  date,
  topParagraphs,
  bottomParagraphs,
  image,
  imageDescription,
  index,
  sectionTitleHeight,
}: ContentSectionArticleProps) {
  const lenis = useLenis();

  const containerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [hasTitleReachedTop, setHasTitleReachedTop] = useState(false);

  const titleHeight = titleRef.current?.offsetHeight || 0;
  const dynamicTopValue = titleHeight * index + sectionTitleHeight;

  useEffect(() => {
    const handleLenisScroll = () => {
      if (!containerRef.current) return;
      const { top } = containerRef.current.getBoundingClientRect();
      if (top <= dynamicTopValue) {
        setHasTitleReachedTop(true);
      } else {
        setHasTitleReachedTop(false);
      }
    };

    lenis?.on("scroll", handleLenisScroll);
    return () => lenis?.destroy();
  }, [dynamicTopValue]);

  return (
    <section
      ref={containerRef}
      className="relative"
      // style={{ marginTop: sectionTitleHeight }}
    >
      <div
        ref={titleRef}
        className={`sticky z-30 w-full border-t border-border bg-background px-8 py-5`}
        style={{
          top: `${dynamicTopValue}px`,
          position: hasTitleReachedTop ? "fixed" : "sticky",
        }}
      >
        <div className="absolute top-0 left-0 z-30 flex size-3 translate-x-[-50%] translate-y-[-50%] items-center rounded-full bg-border">
          <span className="absolute right-7 text-sm text-nowrap text-gray-400">
            {date}
          </span>
          <h3 className="absolute left-7 text-lg font-bold text-nowrap text-white">
            {title}
          </h3>
        </div>
      </div>

      <div
        style={{
          position: hasTitleReachedTop ? "sticky" : "fixed",
          height: `${titleHeight}px`,
        }}
      ></div>

      <div className="mb-8 flex flex-col gap-8 px-8 pb-8 text-gray-400 transition-all">
        <div className="flex flex-col gap-4">
          {topParagraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
        <div
          style={{ backgroundImage: `url(${image})` }}
          className="h-50 w-full rounded-sm bg-border"
        />
        <p>{imageDescription}</p>
        <div className="flex flex-col gap-4">
          {bottomParagraphs.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
