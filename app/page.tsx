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
import {Card, CardHeader, CardBody, CardFooter, Divider} from "@nextui-org/react";
import { TiStarFullOutline } from "react-icons/ti";
import { CiBookmark } from "react-icons/ci";
import { CiLocationArrow1 } from "react-icons/ci";
import { Inter as FontSans } from "next/font/google"
import mainImage from './codeSnippet2.png'
import Image from "next/image";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

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
	function clickingAction(){

	}
	return(
		<div className = {fontSans.className}>
			<div className = 'inline-flex max-sm:flex-col'>
			<div className = 'py-20 w-1/2 mx-4'>
			<div className = 'text-4xl  font-bold inline-flex gap-2'>Create<div className="text-4xl font-bold text-blue-400">beautiful 
			</div></div>
			<div className = 'text-4xl font-bold'>e-magazine designs regardless of your experience</div>
			
			<div className = ' py-6 font-thin flex align-middle text-gray-400 '>clean, beautiful and elegant</div>
			<div className = 'py-4 flex '><Link href = '/sign-in'><Button color = 'primary' variant='shadow'>Get Started</Button></Link><div className = 'inline-flex px-8'><Link href = 'https://github.com/Baryonae/emcams.git'><Button color = 'primary' variant = 'flat' startContent = {<FaGithub size = '20' />}  >Github</Button></Link></div></div>
			<div className = 'flex '>
			</div>
			</div>
			<div>
				<Image width={600} alt = 'some image' src =	{mainImage} unoptimized={true} className = 'rounded-3xl h-max bg-gradient-radial bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-400 from-0% to-transparent via-30% via-cyan-950 to-55% ' />
			</div>	
			</div>
			<div id = '#reviews' className = 'w-full bg-gradient-to-r from-transparent via-[#00091b] to-transparent h-full flex justify-center border-t border-b border-gray-800'>
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
			<div className = 'px-8 py-20' id = 'title'><div className = 'text-4xl font-bold'>Some Title</div></div>

		</div>
	)
}
