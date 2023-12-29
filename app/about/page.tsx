import { title } from "@/components/primitives";
import { User } from "@nextui-org/react";
import { Poppins as PoppinsFont } from "next/font/google";
import Image from "next/image";
import { FaGithub } from "react-icons/fa";
import { IoDocumentOutline } from "react-icons/io5";
import { FaProjectDiagram } from "react-icons/fa";

//inserted
import suvodip from "./suvodip1.jpg";
import Link from "next/link";
const popins = PoppinsFont({
  subsets: ["latin"],
  weight: "300",
});

export default function AboutPage() {
  return (
    <div className={popins.className}>
      <div className="flex justify-center">
        <div className="bg-[#111212] p-20 w-fit rounded-2xl shadow-2xl shadow-teal-400/50 hover:shadow-teal-400 hover:transition-all hover:shadow-2xl">
          <div className="text-3xl font-italic">About</div>
          <div className="inline-flex">
            <Image
              src={suvodip}
              alt="image missing"
              className="rounded-full w-40 my-12"
            />
            <div className="mt-20 mx-12 text-gray-400">
              <div className="">
                <div>
                  <Link href="https://github.com/Baryonae">
                    <div className="inline-flex gap-2">
                      <div className="">
                        <FaGithub size={20} />
                      </div>
                      <div className="">Github</div>
                    </div>
                  </Link>
                </div>

                <div>
                  <Link href="https://github.com/Baryonae">
                    <div className="inline-flex gap-2">
                      <div className="">
                        <IoDocumentOutline size={20} />
                      </div>
                      <div className="">Portfolio</div>
                    </div>
                  </Link>
                </div>

                <div>
                  <Link href="https://github.com/Baryonae">
                    <div className="inline-flex gap-2">
                      <div className="">
                        <FaProjectDiagram size={20} />
                      </div>
                      <div className="">Projects</div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="text-3xl font-bold">Suvodip Chakraborty</div>
          <div className="text-md text-gray-400 font-thin">
            Software Developer (student)
          </div>
          <div className="my-6 font-thin w-unit-8xl text-xl">
            This site is entirely designed and developed (full stack) by me i
            used a number of trending technologies to make this happen such as
            nextjs tailwind react js clerk and much more! the source code is
            available for free on github in my landing page, hope you like the
            experience of this site. Dont forget to leave some feedback about my
            site, because it took a lot of effort to be made
          </div>
        </div>
      </div>
    </div>
  );
}
