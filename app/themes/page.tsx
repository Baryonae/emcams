"use client";
import React from "react";
import Hype from "./Hype";
import { Paytone_One } from "next/font/google";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Poppins as FontSans } from "next/font/google";
import { useSearchParams } from "next/navigation";
const headingFont = Paytone_One({
  subsets: ["latin"],
  weight: "400",
});
const fontSans = FontSans({
  subsets: ["latin"],
  weight: "300",
});
function page() {
  const searchParams = useSearchParams();
  const themeName = searchParams.get("themeName");
  return (
    <div>
      <div className="h-full w-full">
        <div className="p-8 rounded-2xl">
          <div className="items-center flex text-center justify-center text-gray-500 text-3xl">
            <div className={fontSans.className}>
              <div className="p-6 inline-flex">Theme Preview</div>
              <Link href="/createMagazine">
                <Button
                  variant="light"
                  color="secondary"
                  className="mx-8 py-6 max-sm:my-4"
                >
                  Use Theme
                </Button>
              </Link>
            </div>
          </div>
          {themeName === "hype" && (
            <div>
              <Hype
                instagramUrl="https://instagram.com"
                youtubeUrl="https://youtube.com"
              />
            </div>
          )}
          {!themeName && <div>List of Themes</div>}
        </div>
      </div>
    </div>
  );
}

export default page;
