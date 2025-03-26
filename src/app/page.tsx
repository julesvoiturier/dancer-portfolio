"use client";

import ContentSection from "@/modules/ContentSection";
import data from "./../../public/data/performances.json";
import ContentSectionsContainer from "@/modules/ContentSectionsContainer";
import Footer from "@/modules/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import ScrollVideo from "@/components/scroll-video/ScrollVideo";

export default function Home() {
  return (
    <div className="relative flex h-dvh w-full">
      {/* <div className="fixed inset-0 z-50 bg-gray-400 mix-blend-overlay" /> */}
      <header className="fixed flex h-screen w-[63%] translate-x-[1/2] justify-start overflow-hidden">
        <Sidebar />
        <ScrollVideo />
      </header>

      {/* <ScrollVideo /> */}

      <main className="ml-[63%] w-[37%]">
        <ContentSectionsContainer sectionsData={data} />
        <Footer />
      </main>

      <div className="fixed right-0 -z-20 h-screen border-l border-border" />
    </div>
  );
}
