"use client";
import React, { useState } from "react";
import { Poppins as FontSans } from "next/font/google";
import { Paytone_One } from "next/font/google";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io5";
import { Card, CardFooter, Divider, Image } from "@nextui-org/react";
import { AiOutlineLike } from "react-icons/ai";
import { AiTwotoneLike } from "react-icons/ai";
import supabase from "./client";
import { CiShare2 } from "react-icons/ci";

import { CiYoutube } from "react-icons/ci";
//imported everything ig

const headingFont = Paytone_One({
  subsets: ["latin"],
  weight: "400",
});
interface Type {
  postId: number;
  className: string;
  postHeading: string;
  postContent: string;
}
function HypeThemeInsider(data: Type) {
  const [likeStatus, setLikeStatus] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  async function getImageUrl() {
    const { data: posts } = await supabase
      .from("posts")
      .select("illustration")
      .eq("postHeading", data.postHeading);
    if (posts) {
      posts.map((post) => {
        setImageUrl(post.illustration);
        const { data } = supabase.storage
          .from("illustrations")
          .getPublicUrl(post.illustration);
        setImageUrl(data.publicUrl);
      });
    } else {
      console.log("no illustrations");
    }
  }
  getImageUrl();

  return (
    <div>
      <div>
        <div key={data.postId}>
          <div className="mb-6 shadow-">
            <div className={data.className}>
              <div className="p-8 rounded-2xl">
                <div className="text-4xl">
                  <div className={headingFont.className}>
                    <div className="">{data.postHeading}</div>
                  </div>
                </div>
                <div>
                  <div className="w-full py-8 inline-flex max-sm:flex-col">
                    <div className="w-1/2 pr-6 max-sm:w-full">
                      {data.postContent}
                      <div className="">
                        <div className="py-4 inline-flex border-1 border-dashed border-black w-fit px-6 my-8 rounded-2xl italic">
                          By Author{" "}
                          <div className="inline-flex pl-6">
                            <Link href="">
                              <CiShare2 className="" size={25} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-1/2 max-sm:w-full max-sm:py-8">
                      <Card isFooterBlurred radius="lg" className="border-none">
                        <Image
                          isBlurred
                          width={600}
                          alt="image not found"
                          src={imageUrl}
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
                                setLikeStatus((likeStatus) => !likeStatus);
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
    </div>
  );
}

export default HypeThemeInsider;
