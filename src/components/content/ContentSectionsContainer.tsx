"use client";

import { useEffect, useRef } from "react";
import ContentSection from "./ContentSection";

export default function ContentSectionsContainer({ sectionsData }: any) {
  const contentSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("height", contentSectionRef.current?.offsetHeight);
  }, []);

  return (
    <div ref={contentSectionRef} className="relative border-l border-border">
      {sectionsData?.map((section, index) => (
        <ContentSection
          key={index}
          index={index}
          data={section.SectionArticles}
          title={section.SectionTitle}
        />
      ))}
    </div>
  );
}
