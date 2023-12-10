import { Inter as FontSans } from "next/font/google";
import clsx from "clsx";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      className={clsx(
        "min-h-screen bg-background font-sans antialiased max-sm:hidden",
        fontSans.variable
      )}
    >
      <div className={fontSans.className}>
        <div className="max-xs:hidden">{children}</div>
      </div>
    </section>
  );
}
