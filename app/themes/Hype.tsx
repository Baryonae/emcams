"use client";
import React, { useState } from "react";
import { Poppins as FontSans } from "next/font/google";
import { Paytone_One } from "next/font/google";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { Card, CardFooter, Image } from "@nextui-org/react";
import { AiOutlineLike } from "react-icons/ai";
import { AiTwotoneLike } from "react-icons/ai";
import supabase from "./client";

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
  postData?: {
    postContent: string;
    postHeading: string;
    postId: number;
    className: string;
  }[];
  subHeading?: string;
  subSubHeading?: string;
  imageUrl?: string;
}

const themeFront = [
  {
    key: 1,
    className: "text-[#000814] bg-[#cdb4db]",
  },
  {
    key: 2,
    className: "bg-[#f5ebe0] text-[#0d1b2a]",
  },
];
//background 1200*600px
function Hype(data: data) {
  const [likeStatus, setLikeStatus] = useState(false);

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
            <div className="text-4xl">Posts</div>
            <div className="py-10">
              {data.postData?.map((post) => (
                <div key={post.postId}>
                  <div className="mb-20 shadow-">
                    <div className={post.className}>
                      <div className="p-8 rounded-2xl">
                        <div className="text-4xl">
                          <div className={headingFont.className}>
                            <div className="">{post.postHeading}</div>
                          </div>
                        </div>
                        <div>
                          <p className="w-full py-8 inline-flex max-sm:flex-col">
                            <div className="w-1/2 pr-6 max-sm:w-full">
                              {post.postContent}
                              <div className="py-4 border-1 border-dashed border-black w-fit px-6 my-8 rounded-2xl italic">
                                By Author
                              </div>
                            </div>
                            <div className="w-1/2 max-sm:w-full max-sm:py-8">
                              <Card
                                isFooterBlurred
                                radius="lg"
                                className="border-none"
                              >
                                <Image
                                  isBlurred
                                  width={600}
                                  alt="image not found"
                                  src={data.imageUrl}
                                />
                                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                  <div className="p-2 flex justify-center items-center">
                                    <p className="text-tiny text-white/80">
                                      Illustrated By Someone
                                    </p>
                                  </div>
                                  <div>
                                    <Button
                                      variant="flat"
                                      className="bg-black/20"
                                      onClick={() => {
                                        setLikeStatus(
                                          (likeStatus) => !likeStatus
                                        );
                                      }}
                                    >
                                      {likeStatus == false && (
                                        <AiOutlineLike size={20} />
                                      )}
                                      {likeStatus == true && (
                                        <div className="transform-gpu transition-all">
                                          <AiTwotoneLike size={20} />
                                        </div>
                                      )}
                                    </Button>
                                  </div>
                                </CardFooter>
                              </Card>
                            </div>
                          </p>
                        </div>
                      </div>
                    </div>
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
