import UserThing from "./userData";
export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<div className="">
				{children}
		
			</div>
		</section>
	);
}
