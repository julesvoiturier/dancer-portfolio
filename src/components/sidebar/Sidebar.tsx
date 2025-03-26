import Link from "next/link";
import data from "./../../../public/data/performances.json";

export default function Sidebar({ initialPosition }: any) {
  return (
    <div className={`fixed z-20 h-full p-8`}>
      <div className="relative flex h-full flex-col justify-between">
        <div className="text-primary-foreground">
          <p className="text-subtitle leading-none font-bold text-nowrap">
            Leelou Lancel
          </p>
          <p className="text-base font-semibold">Dancer portfolio</p>
        </div>

        <div className="left-0 flex w-full flex-col items-start text-base leading-tight">
          {data.map((section, index) => (
            <div className="group relative" key={index}>
              <button className="z-20 w-full cursor-pointer font-semibold text-zinc-200">
                {section.SectionTitle}
              </button>
            </div>
          ))}
        </div>

        <Link
          className="text-base font-semibold text-primary-foreground"
          href="/contact"
        >
          Contact me
        </Link>
      </div>
    </div>
  );
}
