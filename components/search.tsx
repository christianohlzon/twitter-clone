"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SearchIcon } from "lucide-react";

import { searchUsersByUsername } from "twitter/db/users";
import { User } from "twitter/db/schema";

let timeout: undefined | ReturnType<typeof setTimeout>;

export const Search = () => {
  const [value, setValue] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const clearSearch = () => {
    setValue("");
    setUsers([]);
  };

  useEffect(() => {
    const handleSearch = async () => {
      const users = await searchUsersByUsername(value);
      setUsers(users);
      setIsLoading(false);
    };

    setIsLoading(true);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      if (value === "") {
        setUsers([]);
        return;
      }
      handleSearch();
    }, 400);
  }, [value]);

  return (
    <div className="relative w-full">
      <SearchIcon size={16} className="absolute top-3 left-4 text-zinc-400" />
      <input
        type="text"
        className="bg-zinc-800 text-zinc-50 w-full rounded-full pl-10 py-2 outline-none focus:outline-sky-500"
        placeholder="Search for user"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value.length > 0 && (
        <div className="absolute top-12 left-0 w-full bg-zinc-950 rounded-lg shadow-lg border  border-zinc-700 divide-y divide-zinc-700">
          {users.length ? (
            users.map((user) => (
              <Link
                href={`/${user.username}`}
                key={user.id}
                className="flex flex-row items-center p-2"
                onClick={clearSearch}
              >
                <div className="w-10 h-10 rounded-full bg-zinc-800"></div>
                <div className="ml-2">
                  <div className="">{user.name}</div>
                  <div className="text-sm font-bold text-zinc-400">
                    @{user.username}
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="p-2">
              {isLoading ? "Loading..." : "No users found."}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
