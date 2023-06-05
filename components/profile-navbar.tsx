"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { User } from "twitter/db/schema";

export const ProfileNavbar = ({ user }: { user: User }) => {
  const pathname = usePathname();

  const navLinks = [
    {
      href: `/${user.username}`,
      label: "Posts",
    },
    {
      href: `/${user.username}/replies`,
      label: "Replies",
    },
    {
      href: `/${user.username}/likes`,
      label: "Likes",
    },
  ];

  return (
    <nav>
      <ul className="flex flex-row justify-around">
        {navLinks.map((link) => {
          const isActive = pathname.endsWith(link.href);
          return (
            <li key={link.href}>
              <Link
                className={`font-semibold  p-3 block border-b-2 hover:text-zinc-50 transition ${
                  isActive
                    ? "text-zinc-50 border-sky-500"
                    : "text-zinc-500 border-zinc-950"
                }`}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
