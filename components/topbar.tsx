"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export const Topbar = ({
  title,
  showGoBackButton,
}: {
  title: string;
  showGoBackButton: boolean;
}) => {
  const router = useRouter()
  return (
    <div className="px-4 py-3 opacity-90 w-full sticky top-0 z-30 bg-zinc-950 border-b border-zinc-800 left-0 flex flex-row items-center">
      {showGoBackButton && (
        <ArrowLeft
          className="inline-block mr-2 cursor-pointer"
          onClick={() => router.back()}
        />
      )}
      <h1 className="text-lg font-bold">{title}</h1>
    </div>
  );
};
