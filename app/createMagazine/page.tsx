"use client";
import { title } from "@/components/primitives";
import Image from "next/image";
import UiBackground from "./ui.jpg";

import { Input } from "@nextui-org/input";
import { Switch } from "@nextui-org/switch";
import { cn } from "@nextui-org/system";
import { Navbar } from "@/components/navbar";
import {
  Button,
  Progress,
  Radio,
  RadioGroup,
  ScrollShadow,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import Hype from "../themes/Hype";

export default function AboutPage() {
  const [progressValue, setProgressValue] = useState(0);
  const [isSelected, setIsSelected] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("");
  async function uploadData() {}
  uploadData();
  return (
    <div>
      <div className="inline-flex max-sm:flex-col">
        <div>
          <div className="text-3xl font-bold">Create</div>
          <div>
            <Input
              className="my-8 w-unit-7xl"
              label="Title"
              placeholder="Enter the title for your magazine"
              value={titleValue}
              onValueChange={(val) => {
                setTitleValue(val);
                setProgressValue(50);
              }}
            />
            <Switch
              isSelected={isSelected}
              onValueChange={setIsSelected}
              classNames={{
                base: cn(
                  "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                  "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                  "data-[selected=true]:border-primary"
                ),
                wrapper: "p-0 h-4 overflow-visible",
                thumb: cn(
                  "w-6 h-6 border-2 shadow-lg",
                  "group-data-[hover=true]:border-primary",
                  //selected
                  "group-data-[selected=true]:ml-6",
                  // pressed
                  "group-data-[pressed=true]:w-7",
                  "group-data-[selected]:group-data-[pressed]:ml-4"
                ),
              }}
            >
              <div className="flex flex-col gap-1">
                <p className="text-medium">Enable Contents / Index page</p>
                <p className="text-tiny text-default-400">
                  Get the ready-made contents page without any work!
                </p>
              </div>
            </Switch>
            <div className="py-6">
              <Switch
                classNames={{
                  base: cn(
                    "inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
                    "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                    "data-[selected=true]:border-primary"
                  ),
                  wrapper: "p-0 h-4 overflow-visible",
                  thumb: cn(
                    "w-6 h-6 border-2 shadow-lg",
                    "group-data-[hover=true]:border-primary",
                    //selected
                    "group-data-[selected=true]:ml-6",
                    // pressed
                    "group-data-[pressed=true]:w-7",
                    "group-data-[selected]:group-data-[pressed]:ml-4"
                  ),
                }}
              >
                <div className="flex flex-col gap-1">
                  <p className="text-medium">Enable submissions</p>
                  <p className="text-tiny text-default-400">
                    Set the magazine to active so that others can create
                    submissions, you can change this later though.
                  </p>
                </div>
              </Switch>
            </div>
          </div>
          <div>
            <RadioGroup
              label="Select your Desired Theme"
              value={selectedTheme}
              onValueChange={(val) => {
                setSelectedTheme(val);
                setProgressValue(progressValue + 50);
              }}
            >
              <Radio value="Hype" className="py-4">
                Hype <p className="text-gray-400 inline-flex">(Beta)</p>
              </Radio>
            </RadioGroup>
          </div>
          <div>
            {progressValue >= 100 && (
              <Button
                className="my-12 px-52"
                variant="shadow"
                color="secondary"
              >
                Create
              </Button>
            )}
            {progressValue < 100 && (
              <Button
                className="my-12 px-52"
                variant="shadow"
                color="secondary"
                isDisabled
              >
                Create
              </Button>
            )}
          </div>
        </div>

        <div className="w-screen h-screen">
          <div className="mx-12 max-sm:mx-2 max-sm:w-fit max-sm:mr-12 max-sm:h-fit w-1/2 bg-neutral-950 h-2/3 rounded-2xl p-8">
            <ScrollShadow className="h-[550px] w-fit rounded-2xl bg-black">
              <Navbar />
              <div className="mx-16 my-16">
                <Hype />
              </div>
            </ScrollShadow>
          </div>
        </div>
      </div>
    </div>
  );
}
