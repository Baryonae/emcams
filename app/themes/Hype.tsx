"use client";
import React, { useState } from "react";
import { Anton, Poppins as FontSans } from "next/font/google";
import { Paytone_One } from "next/font/google";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Image,
} from "@nextui-org/react";
import { AiOutlineLike } from "react-icons/ai";
import { AiTwotoneLike } from "react-icons/ai";
import supabase from "./client";

import { CiYoutube } from "react-icons/ci";
import HypeThemeInsider from "./HypeThemeInsider";
import HypeContents from "./HypeContents";
//imported everything ig
const anton = Anton({
  subsets: ["latin"],
  weight: "400",
});
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
const reviews = [
  {
    src: "https://media.licdn.com/dms/image/C4D03AQEwdTv8QHvZqA/profile-displayphoto-shrink_800_800/0/1578071679934?e=2147483647&v=beta&t=ktR8yIIyu-BxBocxg3qGhFNhdxWz1gWgzBRLURFUzpg",
    topmostHeading: "topmostHeading",
    topHeading: "top Heading Here",
    body: "body here so here it goes without any effort hahahha s without any effort hahahhas without any effort hahahhas without any effort hahahhas without any ",
  },
  {
    src: "https://pbs.twimg.com/profile_images/994592419705274369/RLplF55e_400x400.jpg",
    topmostHeading: "Teacher 1",
    topHeading: "top Heading Here",
    body: "body here so here it goes without any effort hahahha s without any effort hahahhas without any effort hahahhas without any effort hahahhas without any ",
  },
  {
    src: "https://www.himalmag.com/wp-content/uploads/2019/07/sample-profile-picture.png",
    topmostHeading: "Teacher 2",
    topHeading: "top Heading Here",
    body: "body here so here it goes without any effort hahahha s without any effort hahahhas without any effort hahahhas without any effort hahahhas without any ",
  },
];
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
        <div id="contents" className="mt-40 mb-20">
          <div className="h-fit p-12 bg-[#fefae0] text-[#283618] rounded-2xl">
            <div className="text-5xl font-extrabold">
              <div className={headingFont.className}>
                From the Principal's Desk
              </div>
              <div className={fontSans.className}>
                <div className="inline-flex max-sm:flex-col max-sm:w-full">
                  <div className="pt-12 text-2xl w-1/4 max-sm:w-full ">
                    <Image
                      src="https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg"
                      width="200"
                      className="rounded-full"
                    />
                  </div>
                  <div className="text-xl py-12 w-2/3 max-sm:w-full break-words">
                    Here the paragraph starts and idk how far it will go but it
                    will go somewhere hahah ok so thi is oidjaosijd Here the
                    paragraph starts and idk how far it will go but it will go
                    somewhere hahah ok so thi is oidjaosijdHere the paragraph
                    starts and idk how far it will go but it will go somewhere
                    hahah ok so thi is oidjaosijdHere the paragraph starts and
                    idk how far it will go but it will go somewhere hahah ok so
                    thi is oidjaosijdHere the paragraph starts and idk how far
                    it will go but it will go somewhere hahah ok so thi is
                    oidjaosijd
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center mt-20">
            <div className="">
              {reviews.map((data) => (
                <div
                  className="inline-flex gap-4 px-6 max-sm: py-8 max-sm:justify-center"
                  key={1}
                >
                  <Card
                    isBlurred
                    className="max-w-[350px] dark:bg-default-100/40 py-2 px-2"
                  >
                    {" "}
                    <CardHeader className="flex gap-3">
                      <Image
                        src={data.src}
                        width="50"
                        height="50"
                        className="rounded-full mx-4 my-2"
                        alt="https://png.pngtree.com/png-vector/20190508/ourmid/pngtree-gallery-vector-icon-png-image_1028015.jpg"
                      />

                      <div className="flex-col">
                        <div>{data.topmostHeading}</div>
                        <div className="text-gray-500">{data.topHeading}</div>
                      </div>
                    </CardHeader>
                    <CardBody>
                      <Divider className="mb-8" />
                      <div className="mx-4 mb-4">{data.body}</div>
                    </CardBody>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div id="#contents">
          <div className="h-fit w-full bg-[#edf2fb] rounded-2xl">
            <div className="bg-[#d7e3fc] border-1 border-[#00b4d8] p-20 rounded-tr-2xl rounded-tl-2xl">
              <div className="text-[#014f86] items-center justify-centeer text-center text-5xl">
                <div className={headingFont.className}>Contents</div>
              </div>
            </div>
            <div className="p-20 text-black">
              <HypeContents />
            </div>
          </div>
        </div>
        <div className="py-6" id="startOfMagazine">
          <div className={fontSans.className}>
            <div className="text-4xl">Posts</div>
            <div className="py-10">
              {/* Here it started */}
              {data.postData && (
                <div>
                  {data.postData?.map((post) => (
                    <div key={post.postId}>
                      <HypeThemeInsider
                        postContent={post.postContent}
                        postHeading={post.postHeading}
                        className={post.className}
                        postId={post.postId}
                      />
                      <Divider className="my-8" />
                      {/*Copied From here*/}
                    </div>
                  ))}
                </div>
              )}
              {/* Here it ended */}
              {!data.postData && (
                <div>
                  <div key={1}>
                    <div className="mb-20 shadow-">
                      <div className="bg-[#f5ebe0] text-[#0d1b2a] rounded-2xl ">
                        <div className="p-8 rounded-2xl">
                          <div className="text-4xl">
                            <div className={headingFont.className}>
                              <div className="">Heading 1</div>
                            </div>
                          </div>
                          <div>
                            <div className="w-full py-8 inline-flex max-sm:flex-col">
                              <div className="w-1/2 pr-6 max-sm:w-full">
                                t is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout. The point of using
                                Lorem Ipsum is that it has a more-or-less normal
                                distribution of letters, as opposed to using
                                'Content here, content here', making it look
                                like readable English. Many desktop publishing
                                packages and web page editors now use Lorem
                                Ipsum as their default model text, and a search
                                for 'lorem ipsum' will uncover many web sites
                                still in their infancy. Various versions have
                                evolved over the years, sometimes by accident,
                                sometimes on purpose (injected humour and the
                                like).
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
                                    src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                                  />
                                  <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                                    <div className="p-2 flex justify-center items-center">
                                      <div className="text-tiny text-white/80">
                                        Illustrated By Someone
                                      </div>
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
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Hype;
