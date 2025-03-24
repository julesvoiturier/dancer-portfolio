import Link from "next/link";
import data from "./../../../public/data/performances.json";

export default function Sidebar({ initialPosition }: any) {
  return (
    <div className={`h-full w-1/4`}>
      <div className="relative h-full">
        <div className="absolute top-0 left-0 text-primary-foreground">
          <p className="text-subtitle leading-none font-bold text-nowrap">
            Leelou Lancel
          </p>
          <p className="text-base">Dancer portfolio</p>
        </div>

        <div className="absolute top-1/2 left-0 flex w-full -translate-y-1/2 flex-col items-start text-base leading-tight">
          {data.map((section, index) => (
            <div className="group relative" key={index}>
              <button className="z-20 w-full cursor-pointer bg-background px-3 font-semibold text-zinc-600">
                {section.SectionTitle}
              </button>
            </div>
          ))}
        </div>

        <Link
          className="absolute bottom-0 left-0 text-base font-semibold text-primary-foreground"
          href="/contact"
        >
          Contact me
        </Link>
      </div>
    </div>
  );
}
