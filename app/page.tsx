"use client"
import { FaGithub } from "react-icons/fa";
import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import {Button} from "@nextui-org/react";
import { UserButton, useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";
import { useState } from "react";
import { redirect } from "next/navigation";
import {Card, CardHeader, CardBody, CardFooter, Divider, Image} from "@nextui-org/react";
import { TiStarFullOutline } from "react-icons/ti";
import { CiBookmark } from "react-icons/ci";
import { CiLocationArrow1 } from "react-icons/ci";


const datas=[
	{
		topmostHeading : 'This is an amazing site ',
		topHeading : 'this is small heading',
		body: 'This is another amazing site made by suvodip, here i will put the review once everything is done so have patience',
		cardIcon: <TiStarFullOutline size = '23' />
	},
	{
		topmostHeading: 'this is another top heading',
		topHeading: 'this is another small Heading',
		body: 'this is another body filled of somethign i dont know ok so that is something i dont want to knwo too yeh',
		cardIcon: <CiBookmark size = '23' />
	},
	{
		topmostHeading : 'This is an amazing site ',
		topHeading : 'this is small heading',
		body: 'This is another amazing site made by suvodip, here i will put the review once everything is done so have patience',
		cardIcon: <CiLocationArrow1  size = '23' />
	},
]



//this is the data part for the front page cards


export default function Home() {
	const {isLoaded, isSignedIn, user} = useUser()
	if(isSignedIn){
		redirect('/dashboard')
	}
	return(
		<div>
			<div className = 'py-20 w-1/2 mx-4'>
			<div className = 'text-4xl  font-bold inline-flex gap-2'>Create<div className="text-4xl font-bold text-blue-400">beautiful 
			</div></div>
			<div className = 'text-4xl font-bold'>e-magazine designs regardless of your experience</div>
			
			<div className = ' py-6 font-thin flex align-middle text-gray-400 '>clean, beautiful and elegant</div>
			<div className = 'py-4 flex '><Link href = '/sign-in'><Button color = 'primary' variant='shadow'>Get Started</Button></Link><div className = 'inline-flex px-8'><Link href = 'https://github.com/Baryonae/emcams.git'><Button color = 'primary' variant = 'flat' startContent = {<FaGithub size = '20' />}  >Github</Button></Link></div></div>
			<div className = 'flex '>
			</div>
			</div>

			<div className = 'w-full bg-gradient-to-r from-[#000000] via-[#00091b] to-[#000000] h-full flex justify-center border-t border-b border-gray-800'>
			<div className = 'py-20 px-4'>
			{datas.map((data) => (	
			<div className = 'inline-flex gap-4 px-6 max-sm: py-8 max-sm:justify-center'>
			<Card isBlurred className="max-w-[300px] dark:bg-default-100/40 py-2 px-2"> <CardHeader className = 'flex gap-3'>
			<Button isIconOnly color = 'primary' variant = 'flat'>
			{data.cardIcon}
			</Button> <div className = 'flex-col'><div>{data.topmostHeading}</div>
			<div className = 'text-gray-500'>{data.topHeading}</div></div>
			</CardHeader>
			<CardBody>
				 <div className = 'mx-4'>
					{data.body}
				 </div>
			</CardBody>
			
			</Card>
			</div>
			))}
			</div></div>
			<div className = 'px-8 py-20'><div className = 'text-4xl font-bold'>Some Title</div></div>
		</div>
	)
}
