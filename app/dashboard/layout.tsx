import { Inter as FontSans } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})
export default function DocsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<section>
			<div className={fontSans.className}>
				<div className = 'max-xs:hidden'>{children}</div>
			</div>
		</section>
	);
}
