'use client'
import { title } from "@/components/primitives";
import Image from "next/image";
import UiBackground from './ui.jpg'
import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google"
import { Input } from "@nextui-org/input";
import { Switch } from "@nextui-org/switch";
import { cn } from "@nextui-org/system";
import { Progress } from "@nextui-org/react";
import { useState } from "react";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('product')
console.log(product);

export default function AboutPage() {
	const [progressValue, setProgressValue] = useState(0)
	const [isSelected, setIsSelected] = useState(false)
	const [titleValue, setTitleValue] = useState('')

	return (
		<div className = {fontSans.className}>
			<div className = 'text-3xl font-bold'>Create</div>
			<div>
				 <Input className = 'my-8 w-unit-7xl' label="Title" placeholder="Enter the title for your magazine"  value = {titleValue} onValueChange={setTitleValue}/>
				<Switch 
				isSelected = {isSelected} onValueChange={setIsSelected}
				classNames={{
					base: cn(
					"inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
					"justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
					"data-[selected=true]:border-primary",
					),
					wrapper: "p-0 h-4 overflow-visible",
					thumb: cn("w-6 h-6 border-2 shadow-lg",
					"group-data-[hover=true]:border-primary",
					//selected
					"group-data-[selected=true]:ml-6",
					// pressed
					"group-data-[pressed=true]:w-7",
					"group-data-[selected]:group-data-[pressed]:ml-4",
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
				<div className = 'py-6'>
				<Switch 
				classNames={{
					base: cn(
					"inline-flex flex-row-reverse w-full max-w-md bg-content1 hover:bg-content2 items-center",
					"justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
					"data-[selected=true]:border-primary",
					),
					wrapper: "p-0 h-4 overflow-visible",
					thumb: cn("w-6 h-6 border-2 shadow-lg",
					"group-data-[hover=true]:border-primary",
					//selected
					"group-data-[selected=true]:ml-6",
					// pressed
					"group-data-[pressed=true]:w-7",
					"group-data-[selected]:group-data-[pressed]:ml-4",
					),
				}}
				>
				<div className="flex flex-col gap-1">
					<p className="text-medium">Enable submissions</p>
					<p className="text-tiny text-default-400">
						Set the magazine to active so that others can create submissions, you can change this later though.
					</p>
				</div>
				</Switch>
				</div>
			</div>
		</div>
	);
}
