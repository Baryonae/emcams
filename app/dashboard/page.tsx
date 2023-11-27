'use client'
import { title } from "@/components/primitives";
import { ClerkLoading, ClerkLoaded, UserButton, clerkClient, currentUser, useUser, SignOutButton } from "@clerk/nextjs";
import {Button, Chip, Link} from "@nextui-org/react";
import { useState } from "react";
import UserThing from "./userData";
import supabase from './client'
import {Spinner} from "@nextui-org/react";

import { redirect } from "next/navigation";



export default function DocsPage() {
	 const { isLoaded, isSignedIn, user } = useUser();
	if(isSignedIn){
	return (
		
		<div>
			<ClerkLoading><div className = 'h-full flex justify-center items-center'><Spinner /></div></ClerkLoading>
			<ClerkLoaded>
			<div className = 'font-bold text-3xl inline-flex gap-4 gap'>Dashboard <Chip size = 'sm' color="success" variant="flat">New</Chip><div className = 'flex justify-end'></div></div>
			<div className = 'py-4'>welcome, {user?.firstName} !<div className = 'px-4 inline-flex'> <SignOutButton ><Button size = 'sm' 	color = 'primary' variant = 'flat'>Sign Out</Button></SignOutButton></div> </div>
			</ClerkLoaded>
		</div>
		
		
	);
	}
	else{
		return(
			<div>
				<Link href = '/' className = 'justify-center items-center flex'>Go back to Homepage</Link>
			</div>
		)
	}
}
