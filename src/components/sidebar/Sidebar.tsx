"use client";

import Link from "next/link";
import useAppStateStore from "@/stores/appStateStore";
import sectionsData from "./../../../public/data/articles.json";

const TITLE = "Leelou Lancel";
const SUBTITLE = "Dancer portfolio";
const FOOTER_LINK_TEXT = "Contact me";

function SidebarHeader() {
  return (
    <div className="text-primary-foreground">
      <p className="text-subtitle leading-none font-bold">{TITLE}</p>
      <p className="text-base font-semibold">{SUBTITLE}</p>
    </div>
  );
}

function NavItem({ title, isActive }: { title: string; isActive: boolean }) {
  return (
    <button
      aria-current={isActive ? "page" : undefined}
      className={`${
        isActive ? "opacity-100" : "opacity-30"
      } z-20 w-full cursor-pointer text-left font-semibold text-zinc-200 transition-opacity duration-200`}
    >
      {title}
    </button>
  );
}

function SidebarFooter() {
  return (
    <Link
      className="text-base font-semibold text-primary-foreground"
      href="/contact"
    >
      {FOOTER_LINK_TEXT}
    </Link>
  );
}

export default function Sidebar() {
  const activeSection = useAppStateStore((state) => state.activeSectionId);

  return (
    <aside className="fixed z-20 h-full p-8">
      <div className="relative flex h-full flex-col justify-between">
        <SidebarHeader />
        <nav className="flex flex-col items-start text-base leading-tight">
          {sectionsData?.map((section, index) => (
            <NavItem
              key={index}
              title={section.sectionTitle}
              isActive={index === activeSection}
            />
          ))}
        </nav>
        <SidebarFooter />
      </div>
    </aside>
  );
}
