import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code"
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import {Button, Card, CardFooter, Image} from "@nextui-org/react";
import macImage from './images/google.jpeg'
export default function Home() {
	return(
		<div>
			<div className = 'text-4xl font-bold text-center'>Create</div>
			<div className="text-4xl font-bold text-center text-blue-400">Anything! 
			</div>
			<div className = ' py-4 font-thin text-center items-center flex justify-center align-middle'>Cross your limits anytime, anywhere!</div>
			<div className = 'py-4 flex items-center align-middle justify-center'><Button color = 'primary' variant='shadow'>Get Started</Button></div>
			<div className = 'flex items-center align-middle justify-center'>
				 
			</div>
		</div>
	)
}
