"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

import { submitPost } from "twitter/actions/posts";
import { ProfileAvatar } from "twitter/components/profile-avatar";

export const PostForm = ({
  buttonText,
  replyToPostId,
}: {
  buttonText?: string;
  replyToPostId?: number;
}) => {
  const [text, setText] = useState("");
  const [isPending, setIsPending] = useState(false);
  const pathname = usePathname();

  const router = useRouter();

  const isEnabled = text.length > 0 && text.length <= 140;

  const textAreaClassName = `bg-zinc-800 p-2 w-full outline-none border border-solid border-zinc-600 focus:border-zinc-400 rounded-lg ${
    text.length > 140 ? "border-red-700 focus:border-red-700" : ""
  } `;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsPending(true);
    await submitPost({ text, replyToPostId });
    setText("");
    setIsPending(false);
    if (replyToPostId) {
      router.replace(pathname);
    }
    router.refresh();
  };

  return (
    <div className="flex flex-row border-b border-solid border-zinc-800 p-4">
      <div className="flex justify-center">
        <ProfileAvatar size={48} />
      </div>
      <form onSubmit={handleSubmit} className="grow pl-3">
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          className={textAreaClassName}
          rows={3}
          disabled={isPending}
        />
        <div className="w-full flex flex-row justify-end mt-2 pb-1">
          {isPending ? (
            <Loader2 size={24} className="my-auto animate-spin" />
          ) : (
            <span className="my-auto">
              <span className={text.length > 140 ? "text-red-500" : ""}>
                {text.length}
              </span>{" "}
              / 140
            </span>
          )}
          <input
            type="submit"
            className="bg-sky-500 rounded-full font-semibold py-2 px-8 ml-3 disabled:opacity-60 hover:opacity-80 transition-opacity cursor-pointer"
            value={buttonText || "Post"}
            disabled={!isEnabled || isPending}
          />
        </div>
      </form>
    </div>
  );
};
