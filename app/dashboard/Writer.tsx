"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
  Button,
  Chip,
  Snippet,
  Input,
  Pagination,
  Spinner,
} from "@nextui-org/react";
import { HiMiniCog } from "react-icons/hi2";
import { Inter as FontSans } from "next/font/google";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import supabase from "./client";
import { UserButton, useUser } from "@clerk/nextjs";
import { MdOutlinePending } from "react-icons/md";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const columns = [
  {
    key: 1,
    label: "Name",
  },
  {
    key: 2,
    label: "Status",
  },
  {
    key: 2,
    label: "join",
  },
];
function Writer() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [magazineData, setMagazineData] = useState("");
  const [status, setStatus] = useState("");
  const [owner, setOwner] = useState("");
  const [role, setRole] = useState("");
  const [token, setToken] = useState("");
  const [MagazineVisibility, setMagazineVisibility] = useState("hidden");
  const [notFoundVisibility, setNotFoundVisiblity] = useState("");
  const [magazineTokenValue, setMagazineTokenValue] = useState("");
  const [pendingScreen, setPendingScreen] = useState("hidden");

  async function getMagazines() {
    const { data: magazines } = await supabase
      .from("users")
      .select()
      .eq("username", user?.firstName);
    const { data: magaDetails } = await supabase
      .from("magazines")
      .select("status")
      .eq("magazine_name", magazineData);
    const { data: magaOwner } = await supabase
      .from("magazines")
      .select("owner")
      .eq("magazine_name", magazineData);
    const ownerName = JSON.stringify(magaOwner).slice(11, -3);
    const { data: roles } = await supabase
      .from("users")
      .select("role")
      .eq("username", user?.firstName);
    const { data: userTokens } = await supabase
      .from("users")
      .select("userToken")
      .eq("username", user?.firstName);
    const { data: users } = await supabase.from("users").select();
    const { data: pendingAssignedMagazine } = await supabase
      .from("users")
      .select("pendingMagazineRequest")
      .eq("username", user?.firstName);
    setRole(JSON.stringify(roles).slice(10, -3));
    setToken(JSON.stringify(userTokens).slice(15, -3));
    setOwner(ownerName);

    if (
      JSON.stringify(pendingAssignedMagazine) !=
      '[{"pendingMagazineRequest":null}]'
    ) {
      setPendingScreen("");
      setNotFoundVisiblity("hidden");
      setMagazineVisibility("hidden");
    } else if (
      JSON.stringify(pendingAssignedMagazine) ==
      '[{"pendingMagazineRequest":null}]'
    ) {
      setPendingScreen("hidden");
      setNotFoundVisiblity("");
      setMagazineVisibility("hidden");
    }
    if (magazineData) {
      setNotFoundVisiblity("hidden");
      setMagazineVisibility("");
    }
    if (JSON.stringify(magaDetails) == '[{"status":"active"}]') {
      setStatus("active");
    } else {
      setStatus("inactive");
    }
    magazines?.map((magazine) => {
      setMagazineData(magazine?.assignedMagazine?.toString());
    });
  }
  async function leaveMagazine() {
    const { data: leaveMagazine } = await supabase
      .from("users")
      .update({ assignedMagazine: null })
      .eq("username", user?.firstName);
    location.reload();
  }
  async function joinMagazine() {
    const { data: joining } = await supabase
      .from("magazines")
      .select()
      .eq("magazineToken", magazineTokenValue);

    if (JSON.stringify(joining) != "[]") {
      console.log("match found");
      const { data: checkMagazine } = await supabase
        .from("magazines")
        .select("magazine_name")
        .eq("magazineToken", magazineTokenValue);
      const magazineNameValue = JSON.stringify(checkMagazine).slice(19, -3);

      const { data: UpsertData } = await supabase
        .from("users")
        .update({ pendingMagazineRequest: magazineNameValue })
        .eq("username", user?.firstName);
      location.reload();
    }
  }
  getMagazines();

  return (
    <div className={fontSans.className}>
      {magazineData && (
        <div className="inline-flex pt-8 max-sm:flex-col max-sm:flex max-sm:justify-center">
          <div className="flex-col">
            <div className={MagazineVisibility}>
              <div className="h-40 w-96 border-1 border-gray-700 rounded-lg p-6 mr-8 ">
                <div className="inline-flex gap-2">
                  <div className="text-md gap-2">{magazineData}</div>
                  <Chip color="success" variant="flat">
                    {status}
                  </Chip>
                </div>
                <div>
                  <div className="inline-flex gap-2 py-2">
                    {" "}
                    <div className="text-gray-500">Owner / Admin :</div>
                    <div>{owner}</div>
                  </div>
                </div>
                <Button
                  variant="flat"
                  color="danger"
                  className="my-1"
                  onClick={leaveMagazine}
                >
                  Leave
                </Button>
              </div>
            </div>

            <div className={notFoundVisibility}>
              <div className="h-40 w-96 border-1 border-gray-700 rounded-lg p-6 mr-8 ">
                <div className=" text-gray-500">Join magazine</div>
                <div className="py-4 inline-flex">
                  <Input
                    label="Enter magazine token"
                    variant="bordered"
                    className="max-w-[350px] w-[230px]"
                    value={magazineTokenValue}
                    onValueChange={setMagazineTokenValue}
                  />
                  <Button
                    className="h-13 mx-4"
                    variant="bordered"
                    onClick={joinMagazine}
                  >
                    Join
                  </Button>
                </div>
              </div>
            </div>

            <div className={pendingScreen}>
              <div className="h-40 w-96 border-1 border-gray-700 rounded-lg p-6 mr-8">
                <div className="inline-flex">
                  <div>
                    <MdOutlinePending size={30} color="red" />
                  </div>
                  <div className="my-1 px-2">Request Pending</div>
                </div>
                <div className="text-gray-400 bold-thin">
                  Request has been sent to the admin, it will be updated soon
                  after they accept the request.
                </div>
              </div>
            </div>

            <div className="border-1 border-gray-700 w-96  my-4 rounded-lg h-40">
              <div>
                <div className="pl-6 pt-6 inline-flex">
                  <UserButton />{" "}
                  <div className=" px-4 text-lg inline-flex">
                    {user?.firstName}{" "}
                    <div className="font-thin pl-4">({role})</div>
                  </div>
                </div>
              </div>

              <div className="w-72 pt-4">
                <div className=" pl-6 font-thin">
                  <Snippet size="sm" className="font-thin text-xs w-80 ">
                    {token}
                  </Snippet>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Card className="max-w-[300px] h-[335px] p-4 bg-transparent border-1 border-gray-800">
              <CardHeader className="flex gap-3">
                <HiMiniCog size="35" />
                <div className="flex-col">
                  <div className="">Create new submission</div>
                  <div className="text-gray-500 italic">emcams</div>
                </div>
              </CardHeader>
              <Divider />
              <CardBody className="py-4">
                <div className="font-thin">
                  Your submission will be forwarded to the editor, then to the
                  admin for further verification, and finally posted.
                </div>
              </CardBody>
              <Divider />
              <CardFooter className="py-4">
                <Link href="/createPost">
                  <Button color="primary" variant="flat">
                    Create Post
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
      {!magazineData && (
        <div>
          <Spinner color="success" />
        </div>
      )}
    </div>
  );
}

export default Writer;
