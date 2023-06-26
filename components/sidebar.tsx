"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Bird, Compass, Home, User } from "lucide-react";

import { DecodedJWT } from "twitter/utils/middleware-auth";
import { GoogleIcon } from "twitter/components/google-icon";

const SignUpBox = () => {
  return (
    <>
      <h2 className="font-semibold mb-3">Sign in or create account</h2>
      <Link
        href="/sign-in"
        className="bg-zinc-50 w-full text-zinc-950 px-5 py-2 text-sm rounded-full items-center flex flex-row"
        prefetch={false}
      >
        <GoogleIcon />
        Continue with Google
      </Link>
    </>
  );
};

export const Sidebar = ({ user }: { user?: DecodedJWT }) => {
  const pathname = usePathname();
  const navItems = user
    ? [
        {
          name: "Home",
          icon: Home,
          href: "/",
          isActive: pathname.endsWith("/"),
        },
        {
          name: "Profile",
          icon: User,
          href: `/${user.username}`,
          isActive: pathname.endsWith(`/${user.username}`),
        },
        // {
        //   name: "Notifications",
        //   icon: Bell,
        //   href: "/notifications",
        //   isActive: pathname.endsWith("/notifications"),
        // },
        {
          name: "Explore",
          icon: Compass,
          href: "/explore/today",
          isActive: pathname.startsWith("/explore/"),
        },
      ]
    : [];
  return (
    <nav className="pt-4 mr-8 flex flex-row justify-end">
      <div>
        <span className="mb-4 pb-3 border-b border-zinc-700 font-semibold flex flex-row">
          <Bird className="mr-2" />
          Poster
        </span>
        {user ? (
          <ul>
            {navItems.map((item) => {
              return (
                <li key={item.href} className="mb-5">
                  <Link
                    href={item.href}
                    className={`flex flex-row items-center  hover:text-sky-500 ${
                      item.isActive ? "text-sky-500" : "text-zinc-50"
                    }`}
                  >
                    <item.icon className="mr-3 my-auto" />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <SignUpBox />
        )}
      </div>
    </nav>
  );
};
