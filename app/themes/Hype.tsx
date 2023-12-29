"use client";
import React from "react";
import { Poppins as FontSans } from "next/font/google";
import { Paytone_One } from "next/font/google";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";

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
  MagazineTitle?: string;
  postData?: { postContent: string; postHeading: string }[];
  subHeading?: string;
  subSubHeading?: string;
}
//background 1200*600px
function Hype(data: data) {
  if (data) {
    return (
      <div>
        <div className="bg-scroll bg-[url(https://cdn.pixabay.com/photo/2017/01/31/17/44/highway-2025863_1280.jpg)] p-10 rounded-2xl h-fit shadow-2xl shadow-white/25">
          <div className="mx-12 max-sm:mx-auto" id="headingSection">
            <div className={headingFont.className}>
              <div className="mt-24 text-gray-300 text-5xl">
                {data.MagazineTitle && <div>{data.MagazineTitle}</div>}
                {!data.MagazineTitle && <div>Lorem Ipsum</div>}
              </div>
            </div>
            <div className={fontSans.className}>
              <div className="font-md text-gray-400 py-4">
                {data.subSubHeading && <div>{data.subSubHeading}</div>}
                {!data.subSubHeading && <div>What is Lorem Ipsum?</div>}
              </div>
            </div>
            <div className={fontSans.className}>
              <div className="text-gray-300 text-md my-4 w-1/3 max-sm:w-full">
                {data.subHeading && <div>{data.subHeading}</div>}
                {!data.subHeading && (
                  <div>
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industrys
                    standard dummy text ever since the 1500s
                  </div>
                )}
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
                  <Link href="#startOfMagazine" scroll={true}>
                    <Button
                      variant="shadow"
                      color="primary"
                      className="p-6 my-8 mb-20"
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
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-60" id="startOfMagazine">
          <div className={fontSans.className}>
            <div className="text-4xl">Some Content</div>
            <div className="py-10">
              {data.postData?.map((post) => (
                <div key={1}>
                  <p className="text-4xl">
                    <p className={headingFont.className}>{post.postHeading}</p>
                  </p>
                  <div>
                    <p className=" py-8">{post.postContent}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Hype;
