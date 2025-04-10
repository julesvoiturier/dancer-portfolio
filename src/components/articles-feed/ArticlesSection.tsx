"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { Article } from "@/components/articles-feed/types";
import { useLenis } from "lenis/react";
import useAppStateStore from "@/stores/appStateStore";
import ContentSectionArticle from "./Article";

interface ArticlesSectionProps {
  data: Article[];
  title: string;
  index: number;
}

export default function ArticlesSection({
  data,
  title,
  index,
}: ArticlesSectionProps) {
  const lenis = useLenis();
  const { updateActiveSectionId } = useAppStateStore();

  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const [isFullyScrolled, setIsFullyScrolled] = useState(false);
  const [titleHeight, setTitleHeight] = useState(0);

  const handleLenisScroll = useCallback(() => {
    if (!sectionRef.current) return;
    const { top, bottom } = sectionRef.current.getBoundingClientRect();
    if (top <= 0) updateActiveSectionId(index);
    setIsFullyScrolled(bottom <= 240);
  }, [index, updateActiveSectionId]);

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", handleLenisScroll);
    return () => lenis.off("scroll", handleLenisScroll);
  }, [lenis, handleLenisScroll]);

  useEffect(() => {
    if (titleRef.current) setTitleHeight(titleRef.current.offsetHeight);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`top-0 min-h-dvh border-b border-border-glass bg-background transition-opacity duration-200 ease-in-out ${
        isFullyScrolled ? "opacity-0" : "opacity-100"
      }`}
    >
      <div
        ref={titleRef}
        className="sticky top-0 z-10 w-full bg-background p-8 text-subtitle font-medium text-zinc-200"
      >
        {title}
      </div>

      <div className="relative min-h-dvh">
        {data.map((article, idx) => (
          <ContentSectionArticle
            key={idx}
            {...article}
            index={idx}
            sectionTitleHeight={titleHeight}
          />
        ))}
      </div>
    </section>
  );
}
