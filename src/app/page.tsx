"use client";

import ContentSection from "@/modules/ContentSection";
import data from "./../../public/data/performances.json";
import ContentSectionsContainer from "@/modules/ContentSectionsContainer";

export default function Home() {
  return (
    <div className="flex">
      <header className="flex border-border border-r h-screen justify-end w-[63%] fixed overflow-x-scroll">
        {/* <LeftSide /> */}
      </header>

      <main className="w-[37%] ml-[63%]">
        <ContentSectionsContainer sectionsData={data}/>
        {/* {data?.map((section: any, index: number) => (
          <ContentSection
            key={index}
            index={index}
            data={section.SectionArticles}
            title={section.SectionTitle}
          />
        ))} */}
      </main>
    </div>
  );
}
