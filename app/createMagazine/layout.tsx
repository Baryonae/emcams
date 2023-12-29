import clsx from "clsx";
import { Open_Sans as FontSans } from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
