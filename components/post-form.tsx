"use client";

import { useState } from "react";

export const PostForm = () => {
  const [text, setText] = useState("");
  const isEnabled = text.length > 0 && text.length <= 140;

  const textAreaClassName = `bg-zinc-800 p-2 w-full outline-none border border-solid border-zinc-600 focus:border-zinc-400 rounded-lg ${
    text.length > 140 ? "border-red-700 focus:border-red-700"  : ""
  } `;

  return (
    <div className="flex flex-row border-b border-solid border-zinc-800 p-4">
      <div className="w-2/12">
        <div className="bg-zinc-500 rounded-full w-16 h-16 mx-auto"></div>
      </div>
      <form className="w-10/12 ">
        <textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          className={textAreaClassName}
        />
        <div className="w-full flex flex-row justify-end mt-2 pb-1">
          <div>
            <span>
              <span className={text.length > 140 ? "text-red-500" : ""}>
                {text.length}
              </span>{" "}
              / 140
            </span>
            <input
              type="submit"
              className="bg-sky-500 rounded-full font-semibold py-2 px-8 ml-3 disabled:opacity-60"
              value="Post"
              disabled={!isEnabled}
            />
          </div>
        </div>
      </form>
    </div>
  );
};
