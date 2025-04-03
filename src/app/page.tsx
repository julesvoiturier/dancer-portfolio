"use client";

import sectionsData from "./../../public/data/articles.json";
import SectionsContainer from "@/components/content/ContentSectionsContainer";
import Footer from "@/components/content/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import ScrollVideo from "@/components/scroll-video/ScrollVideo";
import useAppStateStore from "@/stores/appStateStore";

export default function Home() {
  const loadedPercentage = useAppStateStore(
    (state) => state.framesLoadingPercentage,
  );

  return (
    <div className="relative flex h-dvh w-full">
      <div className="fixed inset-0 z-60 bg-red-100 mix-blend-overlay" />
      <div className="fixed inset-0 z-50 bg-[url('/img/bg-texture.png')] bg-cover bg-center opacity-75 mix-blend-color-burn" />
      <div className="text-6xl text-white"> {loadedPercentage}%</div>
      <header className="fixed flex h-screen w-[63%] translate-x-[1/2] justify-start overflow-hidden">
        <Sidebar />
        <ScrollVideo />
      </header>

      <main className="ml-[63%] w-[37%] bg-background">
        <SectionsContainer sectionsArray={sectionsData} />
        <Footer />
      </main>
    </div>
  );
}
