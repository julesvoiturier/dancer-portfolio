import Link from "next/link";

const INITIAL_WIDTH = "w-[33.333%]";
const FULL_WIDTH = "w-[full]";

export default function LeftSide() {
  return (
    <div className={`relative w-1/4 py-8`}>
      <div className="absolute inset-0 bg-zinc-900"></div>
      <div className="relative h-full">
        <div className="absolute top-0 left-0 -translate-x-1/2 text-primary-foreground">
          <p className="text-title leading-none text-nowrap">Leelou Lancel</p>
          <p className="text-base">Dancer portfolio</p>
        </div>

        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-base leading-tight">
          <p>Performance</p>
          <p>Teaching</p>
          <p>Background</p>
        </div>

        <Link
          className="absolute bottom-0 left-0 -translate-x-1/2 text-base text-primary-foreground"
          href="/contact"
        >
          Contact me
        </Link>
      </div>
    </div>
  );
}
