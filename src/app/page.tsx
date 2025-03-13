import LeftSide from "@/modules/LeftSide";
import RightSide from "@/modules/RightSide";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex">
      <section className="oveflow-x-scroll fixed flex h-screen w-2/3 justify-end border-r">
        <LeftSide />
      </section>

      <section className="ml-[66.666%] h-[10000px] w-1/3">
        <RightSide />
      </section>
    </div>
  );
}
