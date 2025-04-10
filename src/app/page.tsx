"use client";

import { useState, useEffect } from "react";
import data from "./../../public/data/articles.json";
import Footer from "@/components/footer/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import ScrollVideo from "@/components/video-frames-scroll/VideoFramesScroll";
import Loader from "@/components/loader/Loader";
import ArticlesFeed from "@/components/articles-feed/ArticlesFeed";

export default function Home() {
  const [images, setImages] = useState<HTMLImageElement[] | null>(null);
  const [opacity, setOpacity] = useState(0);
  const totalFrames = 2045;

  useEffect(() => {
    if (images) setOpacity(1);
  }, [images]);

  if (!images) {
    return (
      <div className="relative flex w-full">
        <div className="fixed inset-0 z-60 bg-blue-100 mix-blend-overlay" />
        <div className="fixed inset-0 z-60 bg-zinc-900 mix-blend-screen" />
        <div className="fixed inset-0 z-50 bg-[url('/img/bg-texture.png')] bg-cover bg-center opacity-70 mix-blend-color-burn" />
        <Loader totalFrames={totalFrames} onComplete={setImages} />
      </div>
    );
  }

  return (
    <div className="relative flex w-full">
      <div className="fixed inset-0 z-60 bg-blue-100 mix-blend-overlay" />
      <div className="fixed inset-0 z-60 bg-zinc-900 mix-blend-screen" />
      <div className="fixed inset-0 z-50 bg-[url('/img/bg-texture.png')] bg-cover bg-center opacity-70 mix-blend-color-burn" />

      <div
        style={{ opacity }}
        className="transition-opacity duration-500 ease-in-out"
      >
        <header className="fixed top-0 left-0 flex h-screen w-[60%] justify-start">
          <Sidebar />
          <ScrollVideo images={images} />
        </header>

        <main className="ml-[60%] min-h-screen w-[40%] bg-background">
          <ArticlesFeed sectionsArray={data} />
          <Footer />
        </main>
      </div>
    </div>
  );
}
