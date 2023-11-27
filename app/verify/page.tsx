import { title } from "@/components/primitives";
import {Button, Input} from "@nextui-org/react";
export default function PricingPage() {
	return (
		<div>
			<div className = 'text-3xl font-bold'>Verify yourself</div>
			<div className = 'py-8'>
				<form>
				<Input type = 'username' label = 'username' name = 'username' id = 'username' className ='py-4'/>
				<Input type = 'type' label = 'type' name = 'type' id = 'type' className = 'py-4'/>
				<Button color = 'primary' className = 'py-4'>Submit</Button>
				</form>
			</div>
		</div>
	);
}
