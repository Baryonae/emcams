"use client";
import { title } from "@/components/primitives";
import { useSearchParams } from "next/navigation";
import supabase from "./client";
import { useState } from "react";
import { Poppins as FontSans } from "next/font/google";
import { Button } from "@nextui-org/button";
//importing done for now
const fontSans = FontSans({
  subsets: ["latin"],
  weight: "300",
});
//sample test
export default function PricingPage() {
  const [userData, setUserData] = useState("");
  const searchParams = useSearchParams();
  const userName = searchParams.get("user");
  const [userRole, setUserRole] = useState("");
  const [userMagazine, setUserMagazine] = useState("");
  const [userPresence, setUserPresence] = useState(false);

  async function getUsersData() {
    const { data: users } = await supabase
      .from("users")
      .select()
      .eq("username", userName);
    users?.map((user) => {
      setUserRole(user.role);
      setUserMagazine(user.assignedMagazine);

      if (user.role) {
        setUserPresence(true);
      }
    });
    console.log(userName);
    setUserData(JSON.stringify(users));
  }
  getUsersData();
  if (userPresence === true) {
    return (
      <div className={fontSans.className}>
        <div className="p-8 w-fit rounded-2xl bg-zinc-900 font-thin">
          <div className="text-4xl font-bold">{userName}</div>
          <div className="w-96 my-6 py-6 gap-6">
            <div className="">Role: {userRole}</div>
            <div className="">Magazine working on: {userMagazine}</div>
          </div>
        </div>
        <div></div>
      </div>
    );
  } else {
    return <div>User Not found</div>;
  }
}
