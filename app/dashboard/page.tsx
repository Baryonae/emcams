"use client";
import { title } from "@/components/primitives";
import {
  ClerkLoading,
  ClerkLoaded,
  UserButton,
  clerkClient,
  currentUser,
  useUser,
  SignOutButton,
} from "@clerk/nextjs";
import { Button, CheckboxIcon, Chip, Link, Tooltip } from "@nextui-org/react";
import { useState } from "react";
import supabase from "./client";
import { Spinner } from "@nextui-org/react";
import { FaCheck } from "react-icons/fa6";
import Writer from "./Writer";
import { redirect } from "next/navigation";
import { Inter as FontSans } from "next/font/google";
import Admin from "./Admin";

interface User {
  id: number;
  username: string;
  role: string | null;
  assignedMagazine?: string | null;
  submissionStatus?: string | null;
}

export default function DocsPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [verifiedStatus, setVerifiedStatus] = useState("Not verified");
  const [visibility, setVisibility] = useState("collapse");
  const [verifyButton, setVerifyButton] = useState("");
  const [roleType, setRoleType] = useState("");
  const [writerDiv, setWriterDiv] = useState("hidden");
  const [editorDiv, setEditorDiv] = useState("hidden");
  const [adminDiv, setAdminDiv] = useState("hidden");
  const [users, setUsers] = useState<User[]>([]);

  async function checkVerification() {
    const { data: userSomething } = await supabase
      .from("users")
      .select()
      .eq("username", user?.firstName);
    const { data: roles } = await supabase
      .from("users")
      .select()
      .eq("username", user?.firstName);
    const { data: usersData } = await supabase.from("users").select();
    if (JSON.stringify(userSomething) != "[]") {
      setVerifiedStatus("Verified");
      setVisibility("");
      setVerifyButton("hidden");
    }
    if (usersData) {
      setUsers(usersData);
    }
    roles?.map((role) => {
      if (role.role == "writer") {
        setWriterDiv("");
      } else if (role.role == "editor") {
        setEditorDiv("");
      } else if (role.role == "verifiedAdmin") {
        setAdminDiv("");
      }
    });
  }
  checkVerification();

  if (isSignedIn) {
    if (users.length > 0) {
      return (
        <div>
          <ClerkLoading>
            <div className="h-full flex justify-center items-center">
              <Spinner />
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <div className="font-bold text-3xl inline-flex gap-4 gap">
              Dashboard{" "}
              <Chip size="sm" color="secondary" variant="flat" className="my-2">
                New
              </Chip>
              <div className="flex justify-end"></div>
            </div>
            <div className="py-4">
              welcome, {user?.firstName} !
              <div className="px-4 inline-flex">
                <div className={verifyButton}>
                  <Link href="/verify">Verify</Link>
                </div>
                <div className={visibility}>
                  <Chip
                    startContent={<FaCheck size="18" />}
                    variant="faded"
                    color="success"
                    className="p-2"
                  >
                    {verifiedStatus}
                  </Chip>
                </div>
              </div>
            </div>
            <div className={writerDiv}>
              <Writer />
            </div>
            <div className={editorDiv}>Editor</div>
            <div className={adminDiv}>
              <Admin />
            </div>
          </ClerkLoaded>
        </div>
      );
    } else {
      return (
        <p>
          <Spinner />
        </p>
      );
    }
  } else {
    return (
      <div>
        <ClerkLoading>
          <div className="h-full flex justify-center items-center">
            <Spinner />
          </div>
        </ClerkLoading>
        <ClerkLoaded>
          <Link href="/" className="justify-center items-center flex">
            Go back to Homepage
          </Link>
        </ClerkLoaded>
      </div>
    );
  }
}
