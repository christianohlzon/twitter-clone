import Image from "next/image";
import { User } from "lucide-react";

export const ProfileAvatar = ({
  url,
  size,
}: {
  url?: string;
  size: number;
}) => {
  return (
    <div
      className=" bg-zinc-500 rounded-full flex items-center justify-center"
      style={{ width: size, height: size }}
    >
      {url ? (
        <Image src={url} alt="Profile avatar" width={size} height={size} />
      ) : (
        <User size={size / 2} />
      )}
    </div>
  );
};
