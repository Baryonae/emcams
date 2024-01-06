"use client";
import React, { useState } from "react";
import { Input, Textarea } from "@nextui-org/input";
import { useUser } from "@clerk/nextjs";
import supabase from "./client";
import { Poppins as FontSans } from "next/font/google";
import { Button } from "@nextui-org/button";
import { IoCloudUploadOutline } from "react-icons/io5";
import { useSearchParams } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

const fontSans = FontSans({
  subsets: ["latin"],
  weight: "300",
});

function App() {
  const searchParams = useSearchParams();
  const magazineToken = searchParams.get("magazineToken");
  const { isLoaded, isSignedIn, user } = useUser();
  const [mainVisibility, setMainVisibility] = useState("hidden");
  const [value, setValue] = useState("");
  const [file, setFile] = useState([]);
  const [articleHeading, setArticleHeading] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function Something() {
    const { data: roles } = await supabase
      .from("users")
      .select()
      .eq("username", user?.firstName);
    roles?.map((role) => {});
  }
  const UploadPost = async (e: any) => {
    const formattedValue = value.replace(/\n/g, "<br>");
    const file = e.target.files?.[0];
    const fileName = file?.name.toString();
    const fakeFileName = `${user?.firstName}`;

    console.log("uploaded");
    const { data: heading } = await supabase.from("submissions").insert({
      postHeading: articleHeading,
      postContent: formattedValue,
      magazineToken: magazineToken,
    });

    try {
      setValue("");
      setArticleHeading("");
    } catch (error) {}
  };

  Something();

  return (
    <div className={fontSans.className}>
      {magazineToken && (
        <div>
          <div className="text-2xl my-4 font-thin max-sm:flex max-sm:justify-center max-sm:items-center">
            <div className={fontSans.className}>
              {articleHeading.length == 0 && <div>New Submission</div>}
              {articleHeading.length > 0 && <div>{articleHeading}</div>}
            </div>
          </div>
          <Textarea
            variant="bordered"
            placeholder="Start writing your submission...."
            disableAnimation
            disableAutosize
            classNames={{
              base: "h-fit w-3/5 inline-flex max-sm:w-full",
              input: "resize-y min-h-[600px] inline-flex",
            }}
            value={value}
            onValueChange={setValue}
          />
          <div className="inline-flex ml-10">
            <div className="text-2xl font-bold max-sm:py-12">
              <div className={fontSans.className}>Create Post</div>
              <div>
                <Input
                  placeholder="Enter the Title"
                  className="w-unit-6xl flex flex-wrap my-8"
                  variant="bordered"
                  value={articleHeading}
                  onValueChange={setArticleHeading}
                />
              </div>
              <div className=""></div>
              <div className="text-xl font-thin">
                {value.length > 0 && articleHeading.length > 0 && (
                  <div>
                    <Button
                      color="primary"
                      onPress={UploadPost}
                      onClick={onOpen}
                      className="max-sm:w-full"
                    >
                      Create Post
                    </Button>
                  </div>
                )}
                {(value.length === 0 || articleHeading.length === 0) && (
                  <div>
                    <Button
                      isDisabled
                      color="primary"
                      className="max-sm:w-full"
                    >
                      <div className={fontSans.className}>Create Post</div>
                    </Button>
                  </div>
                )}
              </div>
              <Modal
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Upload Successful
                      </ModalHeader>
                      <ModalBody>
                        <div>
                          Your post has been successfully uploaded to the
                          database! it will be later reviewed by the admins and
                          notified!
                        </div>
                        <div>Thank you for using emcams</div>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                          Post another submission
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
          <div></div>
        </div>
      )}
      {!magazineToken && (
        <div>
          You can only submit through a link shared by the magazine Admin
        </div>
      )}
    </div>
  );
}

export default App;
