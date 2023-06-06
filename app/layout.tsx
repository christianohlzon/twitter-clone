import { Search } from "twitter/components/search";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twitter Clone",
  description:
    "Made with Next.js, Server Components, Server Actions, and Drizzle.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-zinc-950 text-zinc-50 h-full"}>
        <div className="flex flex-row justify-center h-full">
          <div className="h-full w-128 border border-solid border-x-1 border-y-0 border-zinc-800">
            {children}
          </div>
          <div className="p-4">
            <Search />
          </div>
        </div>
      </body>
    </html>
  );
}
