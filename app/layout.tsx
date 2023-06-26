import { Inter } from "next/font/google";
import Link from "next/link";

import { getSignedInUserOrUndefined } from "twitter/actions/auth";
import { Search } from "twitter/components/search";
import { Sidebar } from "twitter/components/sidebar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Twitter Clone",
  description:
    "Made with Next.js, Server Components, Server Actions, and Drizzle.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getSignedInUserOrUndefined();
  return (
    <html lang="en">
      <body className={"font-sans bg-zinc-950 text-zinc-50 h-full"}>
        <div className="flex flex-row justify-center min-h-full">
          <div className="w-60 mr-4 mt-4 hidden lg:block">
            <div className="sticky top-0">
              <Sidebar user={user} />
            </div>
          </div>
          <div className=" min-h-screen w-128 border border-solid border-x-1 border-y-0 border-zinc-800">
            {children}
          </div>
          <div className="w-64 ml-4 mt-4 hidden lg:block">
            <div className="fixed w-64">
              <Search />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
