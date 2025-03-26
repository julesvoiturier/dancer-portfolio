import Link from "next/link";

export default function Footer() {
  return (
    <div className="inset-shadow sticky bottom-0 -z-10 h-auto w-full border-l border-border bg-background p-6 pt-8 text-zinc-600">
      <h3 className="pb-6 text-lg font-bold text-nowrap text-zinc-200">
        More informations
      </h3>
      <p className="pb-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas.", "Suspendisse potenti. Cras in nulla nec ex fermentum
        ultricies non eu urna. Nulla facilisi.
      </p>
      <div className="">
        <div className="flex items-center gap-3">
          <p className="text-nowrap">Background video by</p>
          <hr className="w-full text-border" />
          <a
            href="https://www.linkedin.com/in/jules-voiturier/"
            title="LinkedIn"
            className="text-nowrap text-orange-600"
          >
            @brannonyaufilm
          </a>
        </div>
        <div className="flex items-center gap-3">
          <p className="text-nowrap">Developped and designed by</p>
          <hr className="w-full text-border" />
          <a
            href="https://www.linkedin.com/in/jules-voiturier/"
            title="LinkedIn"
            className="text-nowrap text-orange-600"
          >
            Jules Voiturier
          </a>
        </div>
      </div>
    </div>
  );
}
