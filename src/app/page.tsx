"use client";

import data from "./../../public/data/performances.json";
import ContentSectionsContainer from "@/components/content/ContentSectionsContainer";
import Footer from "@/components/content/Footer";
import Sidebar from "@/components/sidebar/Sidebar";
import ScrollVideo from "@/components/scroll-video/ScrollVideo";

export default function Home() {
  return (
    <div className="relative flex h-dvh w-full">
      <div className="fixed inset-0 z-60 bg-red-100 mix-blend-overlay" />
      <div className="fixed inset-0 z-50 bg-[url('/img/bg-texture.png')] bg-cover bg-center opacity-75 mix-blend-color-burn" />
      <header className="fixed flex h-screen w-[63%] translate-x-[1/2] justify-start overflow-hidden">
        <Sidebar />
        <ScrollVideo />
      </header>

      <main className="ml-[63%] w-[37%] bg-background">
        <ContentSectionsContainer sectionsData={data} />
        <Footer />
      </main>
    </div>
  );
}
