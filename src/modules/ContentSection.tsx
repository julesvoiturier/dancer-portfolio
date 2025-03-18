"use client";

import { ReactNode, useRef, useState } from "react";
import ContentSectionArticle from "./ContentSectionArticle";

interface ContentSectionProps {
  data: any;
  title: string;
}

export default function ContentSection({ data, title }: ContentSectionProps) {
  const sectionTitleRef = useRef<HTMLElement | null>(null);
  const sectionTitleHeight = sectionTitleRef.current?.offsetHeight || 0;

  return (
    <section className="min-h-dvh">
      <div
        ref={sectionTitleRef}
        className="fixed top-0 z-20 mb-8 w-full bg-background p-8"
      >
        <h1 className="text-subtitle font-medium">{title}</h1>
      </div>
      <div className="relative mt-28">
        {data.SectionArticles.map((article, index) => (
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
