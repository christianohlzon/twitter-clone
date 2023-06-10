// import { Inter } from "next/font/google";
import Link from "next/link";

import { Search } from "twitter/components/search";
import { GoogleIcon } from "twitter/components/google-icon";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

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
      <body className={"font-sans bg-zinc-950 text-zinc-50 h-full"}>
        <div className="flex flex-row justify-center min-h-full">
          <div className=" w-60 mr-4 mt-4">
            <div className="fixed">
              <h2 className="font-semibold mb-3 text-lg">
                Sign in or create account
              </h2>
              <Link
                href="/sign-in"
                className="bg-zinc-50 w-full text-zinc-950 px-5 py-2 rounded-full items-center flex flex-row"
                prefetch={false}
              >
                <GoogleIcon />
                Continue with Google
              </Link>
            </div>
          </div>
          <div className="min-h-screen w-128 border border-solid border-x-1 border-y-0 border-zinc-800">
            {children}
          </div>
          <div className="w-60 ml-4 mt-4">
            <div className="fixed">
              <Search />
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
