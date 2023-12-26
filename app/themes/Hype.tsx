"use client";
import React from "react";
import { Poppins as FontSans } from "next/font/google";
import { Paytone_One } from "next/font/google";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";

import { Html } from "next/document";
import { CiYoutube } from "react-icons/ci";
//imported everything ig

const fontSans = FontSans({
  subsets: ["latin"],
  weight: "300",
});
const headingFont = Paytone_One({
  subsets: ["latin"],
  weight: "400",
});
interface data {
  instagramUrl?: string | null;
  youtubeUrl?: string | null;
}
//background 1200*600px
function Hype(data: data) {
  if (data) {
    return (
      <div>
        <div className="bg-[url(https://cdn.pixabay.com/photo/2020/12/25/04/51/polar-lights-5858656_1280.jpg)] p-10 rounded-2xl h-[600px] shadow-2xl shadow-white/25">
          <div className="mx-12 max-sm:mx-12" id="headingSection">
            <div className={headingFont.className}>
              <div className="mt-24 text-gray-300 text-5xl">
                Magazine Heading
              </div>
            </div>
            <div className={fontSans.className}>
              <div className="text-gray-300 text-md my-6 w-1/3 max-sm:w-full">
                This is the most epic thing in this universe hahaha this is the
                subtitle im very proud of this site im very proud of this site
                im very proud of this site
              </div>
              {data.instagramUrl && (
                <div className="inline-flex gap-4 pr-4">
                  <Link href={data.instagramUrl}>
                    <FaInstagram size={25} color="gray" />
                  </Link>
                </div>
              )}
              {data.youtubeUrl && (
                <div className="inline-flex gap-4">
                  <Link href={data.youtubeUrl}>
                    <IoLogoYoutube size={25} color="gray" />
                  </Link>
                </div>
              )}
              <div>
                <div>
                  <Link href="#coolShit" scroll={true}>
                    <Button
                      variant="shadow"
                      color="primary"
                      className="p-6 my-8"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                        />
                      </svg>
                      Start Reading
                    </Button>
                  </Link>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-20">Hmm</div>
      </div>
    );
  }
}
export default Hype;
