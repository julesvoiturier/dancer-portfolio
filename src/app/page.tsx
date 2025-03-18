"use client";

import ContentSection from "@/modules/ContentSection";
import data from "./../../public/data/performances.json";
import useSmoothScroll from "@/hooks/useSmoothScroll";

export default function Home() {
  useSmoothScroll();

  return (
    <div className="flex">
      <header className="fixed flex h-screen w-[63%] justify-end overflow-x-scroll border-r border-border bg-[url('../../public/img/image.jpg')] bg-cover bg-center">
        {/* <LeftSide /> */}
      </header>

      <main className="ml-[63%] w-[37%]">
        <ContentSection data={data} title="Performances" />
      </main>
    </div>
  );
}
