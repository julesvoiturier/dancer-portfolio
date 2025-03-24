"use client";

import ContentSection from "@/modules/ContentSection";
import data from "./../../public/data/performances.json";
import ContentSectionsContainer from "@/modules/ContentSectionsContainer";
import Footer from "@/modules/Footer";
import Sidebar from "@/components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      <header className="fixed flex h-screen w-[63%] translate-x-[1/2] justify-start overflow-x-scroll p-8">
        <Sidebar />
      </header>

      <main className="ml-[63%] w-[37%] border-l border-border">
        <ContentSectionsContainer sectionsData={data} />
        <Footer />
      </main>

      <div className="fixed right-0 -z-20 h-screen border-l border-border" />
    </div>
  );
}
