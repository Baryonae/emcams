"use client";
import React from "react";
import Hype from "./Hype";
import { Paytone_One } from "next/font/google";
import Link from "next/link";
import { Button } from "@nextui-org/button";
import { Poppins as FontSans } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { Card, CardFooter, Image } from "@nextui-org/react";
const headingFont = Paytone_One({
  subsets: ["latin"],
  weight: "400",
});
const fontSans = FontSans({
  subsets: ["latin"],
  weight: "300",
});
function ThemesPage() {
  const searchParams = useSearchParams();
  const themeName = searchParams.get("themeName");
  return (
    <div>
      <div className="h-full w-full">
        <div className="p-8 rounded-2xl">
          <div className="items-center flex text-center justify-center text-gray-500 text-3xl">
            <div className={fontSans.className}>
              <div className="p-6 py-12 inline-flex">Theme Preview</div>
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
          {!themeName && (
            <div className="w-fit">
              <Card isFooterBlurred radius="lg" className="border-none">
                <Image
                  alt="Woman listing to music"
                  className="object-cover"
                  src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
                  width={400}
                />
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <p className="text-tiny text-white/80">Hype</p>
                  <Link href="/createMagazine">
                    <Button
                      className="text-tiny text-white bg-black/20"
                      variant="flat"
                      color="default"
                      radius="lg"
                      size="sm"
                    >
                      Use Theme
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ThemesPage;
