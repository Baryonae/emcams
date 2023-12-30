"use client";
import React, { useEffect, useState } from "react";
import Hype from "../themes/Hype";
import { useSearchParams } from "next/navigation";
import supabase from "./client";
import { Button, Skeleton } from "@nextui-org/react";
import Link from "next/link";
interface Type {
  postData?: {
    postContent: string;
    postHeading: string;
    postId: number;
    className: string;
  }[];
  magazineDetails: {
    instagramLink: string;
    youtubeLink: string;
  }[];
  youtubeLink: string;
  instagramLink: string;
  subSubHeading: string;
  subHeading: string;
  imageUrl?: string;
}

function MagazinePage(data: Type) {
  const searchParams = useSearchParams();
  const magazineToken = searchParams.get("magazineToken");
  const [magazineTitle, setMagazineTitle] = useState("");
  const [magazineId, setMagazineId] = useState();
  const [postContent, setPostContent] = useState("");
  const [postHeading, setPostHeading] = useState("");
  const [postId, setPostId] = useState();
  const [youtubeLink, setYoutubeLink] = useState<Type["youtubeLink"]>();
  const [instagramLink, setInstagramLink] = useState<Type["instagramLink"]>();
  const [subHeading, setSubHeading] = useState<Type["subHeading"]>();
  const [subSubHeading, setSubSubHeading] = useState<Type["subSubHeading"]>();
  const [postDetails, setPostDetails] = useState<Type["postData"]>([]);
  const [imageUrl, setImageUrl] = useState<Type["imageUrl"]>();

  //fetching imageData Link
  useEffect(() => {
    const fetchImage = async () => {
      try {
        const { data: imageData } = supabase.storage
          .from("illustrations")
          .getPublicUrl("10-14-Night-6k.jpg");

        // Check if the publicUrl exists before updating the state
        if (imageData && imageData.publicUrl) {
          setImageUrl(imageData.publicUrl);
        } else {
          console.log("Image not found");
        }
      } catch (error) {
        console.error("Error fetching image:");
      }
    };

    // Call the fetchImage function only once when the component mounts
    fetchImage();
  }, []); // Empty dependency array ensures this effect runs only once

  async function extractMagazineName() {
    const { data: magazines } = await supabase
      .from("magazines")
      .select()
      .eq("magazineToken", magazineToken);
    const { data: postContent } = await supabase
      .from("posts")
      .select()
      .eq("magazineToken", magazineToken);
    const { data: postDetails } = await supabase
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
        setMagazineId(detail.id);
      });
    }

    if (postDetails) {
      postDetails.map((post) => {
        setPostHeading(post.postHeading);
        setPostContent(post.postContent);
        setPostId(post.id);
      });
    }
    if (postDetails) {
      setPostDetails(postDetails);
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
            postData={postDetails}
            youtubeUrl={youtubeLink}
            instagramUrl={instagramLink}
            subHeading={subHeading}
            subSubHeading={subSubHeading}
            imageUrl={imageUrl}
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

export default MagazinePage;
