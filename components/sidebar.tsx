"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Bird, Compass, Home, User } from "lucide-react";

import { JWTUser } from "twitter/utils/auth";

export const Sidebar = ({ jwtUser }: { jwtUser: JWTUser }) => {
  const pathname = usePathname();
  const navItems = [
    {
      name: "Home",
      icon: Home,
      href: "/",
      isActive: pathname.endsWith("/"),
    },
    {
      name: "Profile",
      icon: User,
      href: `/${jwtUser.username}`,
      isActive: pathname.endsWith(`/${jwtUser.username}`),
    },
    {
      name: "Notifications",
      icon: Bell,
      href: "/notifications",
      isActive: pathname.endsWith("/notifications"),
    },
    {
      name: "Explore",
      icon: Compass,
      href: "/explore",
      isActive: pathname.endsWith("/explore"),
    },
  ];
  return (
    <nav className="pt-4 mr-8 flex flex-row justify-end">
      <div>
        <span className="mb-4 pb-3 border-b border-zinc-700 font-semibold flex flex-row">
          <Bird className=" mr-2" />
          Poster
        </span>
        <ul>
          {navItems.map((item) => {
            return (
              <li key={item.href} className="mb-5">
                <Link
                  href={item.href}
                  className={`flex flex-row items-center text-lg font-semibold hover:text-sky-500 ${
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
      </div>
    </nav>
  );
};
