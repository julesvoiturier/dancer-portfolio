"use client";

import { RefObject, useCallback, useEffect, useRef, useState } from "react";
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
  isFullSectionScrolled: boolean;
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
  isFullSectionScrolled,
}: ContentSectionArticleProps) {
  const lenis = useLenis();

  const containerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [hasTitleReachedTop, setHasTitleReachedTop] = useState(false);

  const titleHeight = titleRef.current?.offsetHeight || 0;
  const dynamicTopValue = titleHeight * index + sectionTitleHeight;

  const handleLenisScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { top } = containerRef.current.getBoundingClientRect();
    if (top <= dynamicTopValue) {
      setHasTitleReachedTop(true);
    } else {
      setHasTitleReachedTop(false);
    }
  }, []);

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", handleLenisScroll);
    return () => lenis.off("scroll", handleLenisScroll);
  }, [lenis, handleLenisScroll]);

  return (
    <section ref={containerRef} className="relative">
      <div
        ref={titleRef}
        className={`bg-opacity-90 sticky z-30 w-full border-t border-border bg-background px-8 py-5`}
        style={{
          top: `${dynamicTopValue}px`,
          position: hasTitleReachedTop ? "fixed" : "sticky",
        }}
      >
        <div className="flex bg-border rounded-full absolute items-center left-0 size-3 top-0 translate-x-[-50%] translate-y-[-50%] z-30">
          <p className="text-nowrap text-sm absolute opacity-50 right-7">
            {date}
          </p>
          <h3 className="text-lg text-nowrap text-white absolute font-bold left-7">
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

      <div className="flex flex-col text-gray-400 gap-8 mb-8 pb-8 px-8 transition-all">
        <div className="flex flex-col gap-3">
          {topParagraphs.map((paragraph, idx) => (
            <p className="leading-tight" key={idx}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="bg-border h-50 rounded-sm w-full"
          />
          <p className="border-border border-t opacity-50 pt-1">
            - {imageDescription}
          </p>
        </div>
        <div className="flex flex-col gap-3">
          {bottomParagraphs.map((paragraph, idx) => (
            <p className="leading-tight" key={idx}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
