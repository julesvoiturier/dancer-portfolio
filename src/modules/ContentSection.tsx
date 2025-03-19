"use client";

import { useEffect, useRef, useState } from "react";
import ContentSectionArticle from "./ContentSectionArticle";
import { Article } from "@/utils/global.types";

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
  const sectionTitleRef = useRef<HTMLDivElement>(null);
  const [sectionTitleHeight, setSectionTitleHeight] = useState(0);

  useEffect(() => {
    if (sectionTitleRef.current)
      setSectionTitleHeight(sectionTitleRef.current.offsetHeight);
  }, []);

  return (
    <section className="sticky min-h-dvh bg-background">
      <div
        ref={sectionTitleRef}
        className="sticky top-0 z-20 w-full bg-background p-8 text-subtitle font-medium"
      >
        {title}
      </div>

      <div className="min-h-dvh">
        {data.map((article: Article, index: number) => (
          <ContentSectionArticle
            {...article}
            key={index}
            index={index}
            sectionTitleHeight={sectionTitleHeight}
          />
        ))}
      </div>
    </section>
  );
}
