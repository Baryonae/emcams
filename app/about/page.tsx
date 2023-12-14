import { title } from "@/components/primitives";
import { User } from "@nextui-org/react";
import { Ubuntu as UbuntuFont } from "next/font/google";
import Image from "next/image";
//inserted
import suvodip from "./suvodip1.jpg";

export default function AboutPage() {
  return (
    <div className="mx-auto">
      <div className="text-3xl font-italic">About</div>
      <Image
        src={suvodip}
        alt="image missing"
        className="rounded-full w-40 my-12"
      />
      <div className="text-3xl font-bold">Suvodip Chakraborty</div>
      <div className="text-md text-gray-400 font-thin">Developer (student)</div>
      <div className="my-6 font-thin w-unit-8xl text-xl">
        This site is entirely designed and developed (full stack) by me , i used
        a number of trending technologies to make this happen such as nextjs
        tailwind react js clerk and much more! the source code is available for
        free on github in my landing page, hope you like the experience of this
        site. Don't forget to leave some feedback about my site, because it took
        a lot of effort to be made
      </div>
    </div>
  );
}
