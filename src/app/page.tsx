"use client";

import ContentSection from "@/modules/ContentSection";
import data from "./../../public/data/performances.json";
import ReactLenis from "lenis/react";

export default function Home() {
  return (
    <ReactLenis root>
      <div className="flex">
        <header className="fixed flex h-screen w-[63%] justify-end overflow-x-scroll border-r border-border">
          {/* <LeftSide /> */}
        </header>

        <main className="ml-[63%] w-[37%]">
          {data?.map((section: any, index: number) => (
            <ContentSection
              key={index}
              index={index}
              data={section.SectionArticles}
              title={section.SectionTitle}
            />
          ))}
        </main>
      </div>
    </ReactLenis>
  );
}
