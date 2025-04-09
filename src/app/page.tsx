"use client";

import sectionsData from "./../../public/data/articles.json";
import SectionsContainer from "@/components/content/ContentSectionsContainer";
import Footer from "@/components/content/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import ScrollVideo from "@/components/scroll-video/ScrollVideo";
import Loader from "@/components/loader/Loader";
import { useState, useEffect } from "react";

export default function Home() {
  const totalFrames = 2045;
  const [images, setImages] = useState<HTMLImageElement[] | null>(null);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    if (images) {
      setOpacity(1);
    }
  }, [images]);

  return (
    <div className="relative flex w-full">
      {/* BG layers */}
      <div className="fixed inset-0 z-60 bg-red-100 mix-blend-overlay" />
      <div className="fixed inset-0 z-50 bg-[url('/img/bg-texture.png')] bg-cover bg-center opacity-75 mix-blend-color-burn" />

      {!images ? (
        <Loader totalFrames={totalFrames} onComplete={setImages} />
      ) : (
        <div
          style={{ opacity }}
          className="transition-opacity duration-500 ease-in-out"
        >
          {/* Left fixed content */}
          <header className="fixed top-0 left-0 flex h-screen w-[63%] justify-start">
            <Sidebar />
            <ScrollVideo images={images} />
          </header>

          {/* Right scrollable content */}
          <main className="ml-[63%] min-h-screen w-[37%] bg-background">
            <SectionsContainer sectionsArray={sectionsData} />
            <Footer />
          </main>
        </div>
      )}
    </div>
  );
}
