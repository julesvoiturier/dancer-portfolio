"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import ContentSectionArticle from "./ContentSectionArticle";
import { Article } from "@/utils/global.types";
import { useLenis } from "lenis/react";

interface ContentSectionProps {
  data: Article[];
  title: string;
  index: number;
}

export default function ContentSection({
  data,
  title,
  index,
}: ContentSectionProps) {
  const lenis = useLenis();

  const sectionContainerRef = useRef<HTMLElement>(null);
  const sectionTitleRef = useRef<HTMLDivElement>(null);
  // const isFullSectionScrolled = useRef<boolean>(false);
  const [isFullSectionScrolled, setIsFullSectionScrolled] = useState(false);
  const sectionTitleHeight = sectionTitleRef.current?.offsetHeight || 0;

  const handleLenisScroll = useCallback(() => {
    if (!sectionContainerRef.current) return;
    const { bottom } = sectionContainerRef.current.getBoundingClientRect();

    if (bottom <= 240) {
      setIsFullSectionScrolled(true);
    } else {
      setIsFullSectionScrolled(false);
    }

    // console.log(isFullSectionScrolled.current);
  }, []);

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", handleLenisScroll);
    return () => lenis.off("scroll", handleLenisScroll);
  }, [lenis, handleLenisScroll]);

  return (
    <section
      ref={sectionContainerRef}
      className={`${isFullSectionScrolled ? "opacity-0 ease-in" : ""} top-0 min-h-dvh border-b border-border bg-background transition-all duration-100`}
    >
      <div
        ref={sectionTitleRef}
        className="bg-background p-8 text-subtitle w-full font-medium sticky top-0 z-10"
      >
        {title}
      </div>

      <div className={`relative min-h-dvh`}>
        {data.map((article: Article, index: number) => (
          <ContentSectionArticle
            {...article}
            key={index}
            index={index}
            sectionTitleHeight={sectionTitleHeight}
            isFullSectionScrolled={isFullSectionScrolled}
          />
        ))}
      </div>
    </section>
  );
}
