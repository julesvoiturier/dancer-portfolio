"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useLenis } from "lenis/react";

interface ArticleProps {
  title: string;
  date: string;
  topParagraphs: Array<string>;
  bottomParagraphs: Array<string>;
  image: string;
  imageDescription: string;
  index: number;
  sectionTitleHeight: number;
}

export default function Article({
  title,
  date,
  topParagraphs,
  bottomParagraphs,
  image,
  imageDescription,
  index,
  sectionTitleHeight,
}: ArticleProps) {
  const lenis = useLenis();

  const containerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLDivElement | null>(null);
  const [hasTitleReachedTop, setHasTitleReachedTop] = useState(false);

  const titleHeight = titleRef.current?.offsetHeight || 0;
  const dynamicTopValue = titleHeight * index + sectionTitleHeight;

  const handleLenisScroll = useCallback(() => {
    if (!containerRef.current) return;
    const { top } = containerRef.current.getBoundingClientRect();
    top <= dynamicTopValue
      ? setHasTitleReachedTop(true)
      : setHasTitleReachedTop(false);
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
        className={`bg-opacity-90 sticky z-30 w-full border-t border-border-glass bg-background px-8 py-5`}
        style={{
          top: `${dynamicTopValue}px`,
          position: hasTitleReachedTop ? "fixed" : "sticky",
        }}
      >
        <div className="absolute top-0 left-0 z-30 flex size-2.5 translate-x-[-50%] translate-y-[-50%] items-center rounded-full bg-border">
          <p className="left:10 absolute text-sm text-nowrap lg:right-5">
            {date}
          </p>
          {/* <div className="left:15 absolute h-[1px] w-dvw bg-border-glass text-sm text-nowrap mix-blend-exclusion lg:right-16" /> */}
          <h3 className="absolute left-9 text-lg font-bold text-nowrap text-zinc-200">
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
        <div className="flex flex-col gap-3">
          {topParagraphs.map((paragraph, idx) => (
            <p className="leading-tight font-light" key={idx}>
              {paragraph}
            </p>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div
            style={{ backgroundImage: `url(${image})` }}
            className="h-50 w-full rounded-sm bg-border"
          />
          <p className="opacity-50">- {imageDescription}</p>
        </div>
        <div className="flex flex-col gap-3">
          {bottomParagraphs.map((paragraph, idx) => (
            <p className="leading-tight font-light" key={idx}>
              {paragraph}
              {paragraph}
              {paragraph}
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
