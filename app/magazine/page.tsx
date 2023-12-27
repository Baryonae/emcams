"use client";
import React, { useState } from "react";
import Hype from "../themes/Hype";
import { useSearchParams } from "next/navigation";
import supabase from "./client";
import { Button, Skeleton } from "@nextui-org/react";
import Link from "next/link";
interface Type {
  postContent: { postContent: string; postHeading: string }[];
  magazineDetails: { instagramLink: string; youtubeLink: string }[];
  youtubeLink: string;
  instagramLink: string;
  subSubHeading: string;
  subHeading: string;
}
function page(type: Type) {
  const searchParams = useSearchParams();
  const magazineToken = searchParams.get("magazineToken");
  const [magazineTitle, setMagazineTitle] = useState("");
  const [postContent, setPostContent] = useState<Type["postContent"]>([]);
  const [youtubeLink, setYoutubeLink] = useState<Type["youtubeLink"]>();
  const [instagramLink, setInstagramLink] = useState<Type["instagramLink"]>();
  const [subHeading, setSubHeading] = useState<Type["subHeading"]>();
  const [subSubHeading, setSubSubHeading] = useState<Type["subSubHeading"]>();

  async function extractMagazineName() {
    const { data: magazines } = await supabase
      .from("magazines")
      .select()
      .eq("magazineToken", magazineToken);
    const { data: postContent } = await supabase
      .from("posts")
      .select()
      .eq("magazineToken", magazineToken);

    const { data: detailsOfMagazine } = await supabase
      .from("magazineDetails")
      .select()
      .eq("magazineToken", magazineToken);
    if (detailsOfMagazine) {
      detailsOfMagazine.map((detail) => {
        setYoutubeLink(detail.youtubeLink);
        setInstagramLink(detail.instagramLink);
        setSubHeading(detail.subHeading);
        setSubSubHeading(detail.subSubHeading);
      });
    }
    if (postContent) {
      setPostContent(postContent);
    }
    magazines?.map((magazine) => {
      if (magazine.status == "active") {
        setMagazineTitle(magazine.magazine_name);
      }
    });
  }
  if (magazineToken) {
    extractMagazineName();
  }
  return (
    <div>
      {magazineTitle.length > 0 && (
        <div>
          <Hype
            MagazineTitle={magazineTitle}
            postData={postContent}
            youtubeUrl={youtubeLink}
            instagramUrl={instagramLink}
            subHeading={subHeading}
            subSubHeading={subSubHeading}
          />
        </div>
      )}
      {magazineTitle.length == 0 && (
        <div>
          <div className="rounded-2xl bg-zinc-950 py-40">
            <Skeleton className="h-12 w-1/4 ml-20 rounded-2xl max-sm:w-3/4 max-sm:ml-6" />
            <Skeleton className="h-40 w-1/4 mt-4 ml-20 rounded-2xl max-sm:w-3/4 max-sm:ml-6" />
            <Skeleton className="h-12 w-1/5 mt-10 ml-20 rounded-2xl max-sm:w-3/5 max-sm:ml-6" />
          </div>
        </div>
      )}
    </div>
  );
}

export default page;
