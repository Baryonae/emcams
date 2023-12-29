import clsx from "clsx";
import { Fira_Code as FontMono, Inter as FontSans } from "next/font/google";
import { Viewport } from "next";
export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const viewport: Viewport = {
  themeColor: "#00000",
};
export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "min-h-screen bg-background font-sans antialiased",
        fontSans.variable
      )}
    >
      <section className="py-8 md:py-10">
        <div className="">{children}</div>
      </section>
    </div>
    //sample commit
    //another commit
  );
}
