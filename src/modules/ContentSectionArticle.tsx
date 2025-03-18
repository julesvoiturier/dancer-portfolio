"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis"; // Import Lenis for smooth scroll

interface ContentSectionArticleProps {
  title: string;
  date: string;
  paragraphs: string[];
  index: number;
  sectionTitleHeight: number;
}

export default function ContentSectionArticle({
  title,
  date,
  paragraphs,
  index,
  sectionTitleHeight,
}: ContentSectionArticleProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLElement | null>(null);

  const titleHeight = titleRef.current?.offsetHeight || 0;
  const dynamicTopValue = titleHeight * index + sectionTitleHeight;

  const [hasTitleReachedTop, setHasTitleReachedTop] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
      overscroll: false,
    });

    const handleLenisScroll = () => {
      if (!containerRef.current) return;
      const { top } = containerRef.current.getBoundingClientRect();
      if (top <= dynamicTopValue) {
        setHasTitleReachedTop(true);
      } else {
        setHasTitleReachedTop(false);
      }
    };

    // Attach the scroll event to Lenis
    lenis.on("scroll", handleLenisScroll);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    // Cleanup on unmount
    return () => {
      lenis.destroy();
    };
  }, [dynamicTopValue]);

  return (
    <section ref={containerRef} className="relative">
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

      <article className="mb-8 min-h-dvh px-8 pb-8 text-gray-400 transition-all">
        {paragraphs.map((paragraph, idx) => (
          <p key={idx} className="py-4">
            {paragraph}
          </p>
        ))}
        <div className="h-50 w-full rounded-sm bg-border"></div>
      </article>
    </section>
  );
}
