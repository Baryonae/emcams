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
  CircularProgress,
  Progress,
  Tooltip,
} from "@nextui-org/react";
import { HiMiniCog } from "react-icons/hi2";
import { Inter as FontSans } from "next/font/google";
import { Archivo as ArcFont } from "next/font/google";
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
import { CiLocationArrow1 } from "react-icons/ci";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { Tabs, Tab } from "@nextui-org/react";
import { MdDeleteOutline } from "react-icons/md";

interface User {
  id: number;
  username: string;
  role: string | null;
  assignedMagazine?: string | null;
  submissionStatus: string;
  email: string | null;
}

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
const arcFont = ArcFont({
  subsets: ["latin"],
});

function Admin() {
  const [userData, setUserData] = useState<User[]>([]);
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
  const [youText, setYouText] = useState("");
  const [pendingUsers, setPendingUsers] = useState<User[]>([]);
  const [progress, setProgress] = useState(0);
  const [progressValue, setProgressValue] = useState(``);
  const [username, setUsername] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [totalSubmissions, setTotalSubmissions] = useState<User[]>([]);
  const [submissionColor, setSubmissionColor] = useState("warning");

  async function getMagazines() {
    const { data: magazines } = await supabase
      .from("users")
      .select()
      .eq("username", user?.firstName);
    const { data: users } = await supabase
      .from("users")
      .select()
      .eq("assignedMagazine", magazineData)
      .neq("username", user?.firstName);
    const { data: magaDetails } = await supabase
      .from("magazines")
      .select("status")
      .eq("magazine_name", magazineData);
    const { data: magaOwner } = await supabase
      .from("magazines")
      .select("owner")
      .eq("magazine_name", magazineData);
    const { data: roles } = await supabase
      .from("users")
      .select("role")
      .eq("username", user?.firstName);
    const { data: userTokens } = await supabase
      .from("users")
      .select("userToken")
      .eq("username", user?.firstName);
    const { data: pendingAssignedMagazine } = await supabase
      .from("users")
      .select("pendingMagazineRequest")
      .eq("username", user?.firstName);
    const { data: pendingUsersQuery } = await supabase
      .from("users")
      .select()
      .eq("pendingMagazineRequest", magazineData);
    const { data: submittedUsers } = await supabase
      .from("users")
      .select()
      .match({ assignedMagazine: magazineData, submissionStatus: "submitted" });
    const { data: totalSubmissionsRequired } = await supabase
      .from("users")
      .select()
      .match({ assignedMagazine: magazineData, role: "writer" });
    if (totalSubmissionsRequired) {
      setTotalSubmissions(totalSubmissionsRequired);
    }
    if (submittedUsers) {
      const progress = Math.trunc(
        (submittedUsers?.length / userData?.length) * 100
      );
      const progressValue = `${submittedUsers?.length} / ${userData?.length}`;
      setProgress(progress);
      setProgressValue(progressValue);
    }
    if (user?.firstName) {
      setUsername(user?.firstName);
    }
    const ownerName = JSON.stringify(magaOwner).slice(11, -3);
    setRole(JSON.stringify(roles).slice(10, -3));
    setToken(JSON.stringify(userTokens).slice(15, -3));
    setOwner(ownerName);
    if (pendingUsersQuery) {
      setPendingUsers(pendingUsersQuery);
    }
    if (users) {
      setUserData(users);
    }

    if (
      JSON.stringify(pendingAssignedMagazine) !==
      '[{"pendingMagazineRequest":null}]'
    ) {
      setPendingScreen("");
      setNotFoundVisiblity("hidden");
      setMagazineVisibility("hidden");
    } else if (
      JSON.stringify(pendingAssignedMagazine) ===
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
    if (owner == user?.firstName) {
      setYouText("(you)");
    }
  }
  function submissionStatus(actualSubmissionStatus: string) {
    if (actualSubmissionStatus === "submitted") {
      return (
        <div>
          <Chip color="success" variant="flat">
            {actualSubmissionStatus}
          </Chip>
        </div>
      );
    }
    if (actualSubmissionStatus === "not submitted") {
      return (
        <div>
          <Chip color="danger" variant="flat">
            {actualSubmissionStatus}
          </Chip>
        </div>
      );
    }
  }
  async function kickUser(userToBeKicked: string) {
    const { data: leaveMagazine } = await supabase
      .from("users")
      .update({ assignedMagazine: null })
      .eq("username", userToBeKicked);
  }
  async function leaveMagazine() {
    const { data: leaveMagazine } = await supabase
      .from("users")
      .update({ assignedMagazine: null })
      .eq("username", user?.firstName);
    location.reload();
  }
  async function AllowAccess(usernameValue: string) {
    const { data: deletePending } = await supabase
      .from("users")
      .update({ pendingMagazineRequest: null })
      .match({ username: usernameValue });
    const { data: allowPending } = await supabase
      .from("users")
      .update({ assignedMagazine: magazineData })
      .match({ username: usernameValue });
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
      //location.reload()
    }
  }
  const siteUrl = window.location.href.slice(0, -9) + "profile?user=";
  const profileUrl = siteUrl + user?.firstName;
  getMagazines();
  return (
    <div className={arcFont.className}>
      {userData.length === 0 && (
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="max-w-md"
        />
      )}
      {userData?.length > 0 && (
        <div>
          <div className="inline-flex pt-8 max-sm:flex-col max-sm:flex max-sm:justify-center font-thin">
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
                      <div>
                        {owner}
                        {youText}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button color="primary" variant="flat" className="my-2">
                      Customize
                    </Button>
                  </div>
                </div>
              </div>

              <div className={notFoundVisibility}>
                <div className="h-42 w-96 border-1 border-gray-700 rounded-lg p-6 mr-8 ">
                  <div className=" ">Create new magazine</div>
                  <div className="font-thin text-gray-300">
                    create new space and invite your people here
                  </div>
                  <div className="py-4 inline-flex">
                    <Link href="createMagazine">
                      <Button variant="flat" color="success">
                        Create
                      </Button>
                    </Link>
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
                      <div className="font-thin pl-4">(Admin)</div>
                    </div>
                  </div>
                </div>

                <div className="w-72 pt-4">
                  <div className=" pl-6 font-thin">
                    <Snippet
                      size="sm"
                      className="font-thin text-xs w-82 max-w-82 "
                    >
                      {profileUrl}
                    </Snippet>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-col">
              <div className={arcFont.className}>
                <div className="w-80 bg-[#0a0a0a] p-8 h-42 rounded-2xl backdrop-blur-2xl bg-opacity-60 border-1 border-gray-700">
                  <div className="">Apps</div>
                  <div className="py-4">
                    <Button
                      variant="flat"
                      color="secondary"
                      className="h-12"
                      size="sm"
                    >
                      <CiLocationArrow1 size={20} />
                    </Button>
                  </div>
                </div>
              </div>
              <div>
                <div className="my-4 bg-black border-1 border-gray-700 rounded-2xl p-6 h-36 inline-flex">
                  {username.length > 0 && (
                    <CircularProgress
                      classNames={{
                        svg: "w-24 h-26 drop-shadow-md",
                        indicator: "stroke-violet-500",
                        track: "stroke-transparent",
                        value: "text-sm font-thin text-white",
                      }}
                      value={progress}
                      showValueLabel={true}
                    />
                  )}
                  {owner.length === 0 && <div>Loading</div>}

                  <div className="w-44 p-6">
                    <div className="text-xl">{progressValue} Submissions</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-8">
              {userData?.length === 0 && <p>Loading...</p>}
              {userData?.length > 0 && (
                <Tabs>
                  <Tab key="1" title="Candidates">
                    <Table aria-label="Users" className="w-unit-8xl h-72">
                      <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>ROLE</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                        <TableColumn>Customize</TableColumn>
                      </TableHeader>
                      <TableBody emptyContent={"No users to display"}>
                        {userData?.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell>
                              <div>{user.username}</div>
                              <div className="text-sm font-thin text-gray-500">
                                {user.email}
                              </div>
                            </TableCell>
                            <TableCell className="text-gray-400">
                              {user.role}
                            </TableCell>
                            <TableCell>
                              {submissionStatus(user?.submissionStatus)}
                            </TableCell>
                            <TableCell>
                              <div className="inline-flex">
                                <Tooltip content="Kick User">
                                  <Button
                                    color="danger"
                                    variant="flat"
                                    onPress={() => {
                                      kickUser(user.username);
                                    }}
                                  >
                                    <MdDeleteOutline size="20" />
                                  </Button>
                                </Tooltip>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Tab>
                  <Tab key="2" title="Coming Soon">
                    <Card className="w-unit-8xl h-72">
                      <CardBody>
                        <div className="text-gray-500 items-center text-center flex justify-center my-12">
                          More features coming soon!
                        </div>
                      </CardBody>
                    </Card>
                  </Tab>
                </Tabs>
              )}
            </div>
          </div>
          <div>
            <div className="border-1 border-gray-700 h-60 w-unit-8xl p-10 px-14 rounded-2xl">
              <Table className="w-96 h-60" removeWrapper>
                <TableHeader>
                  <TableColumn>Username</TableColumn>
                  <TableColumn>Role opted For</TableColumn>
                  <TableColumn>Allow</TableColumn>
                </TableHeader>
                <TableBody emptyContent={"No users to display"}>
                  {pendingUsers.map((user) => (
                    <TableRow>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>
                        <div>{user.role}</div>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="flat"
                          color="success"
                          onClick={() => {
                            AllowAccess(user.username);
                          }}
                        >
                          Allow Access
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
