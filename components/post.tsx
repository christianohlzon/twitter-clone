"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";

import { PostWithRelations, User, PostLike } from "twitter/db/schema";
import { timeSince } from "twitter/utils/time";
import { JWTUser } from "twitter/utils/auth";
import { likePost } from "twitter/actions/post-likes";
import {
  likePostWithUserId,
  unlikePostWithUserId,
} from "twitter/db/post-likes";

export const PostInteraction = ({
  likes,
  repost,
  replies,
  currentUser,
  postId,
}: {
  likes: PostLike[];
  repost: number;
  replies: number;
  currentUser: JWTUser;
  postId: number;
}) => {
  const isLikedByUser = likes.some((like) => (like.userId = currentUser.id));

  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const heartAction = () => {
    if (isLiked) {
      setIsLiked(false);
      unlikePostWithUserId({ userId: currentUser.id, postId });
    } else {
      setIsLiked(true);
      likePostWithUserId({ userId: currentUser.id, postId });
    }
  };

  const likeCountAdjustment = isLikedByUser && isLiked ? 0 : isLiked ? 1 : isLikedByUser ? -1 : 0
  return (
    <form className="text-sm text-zinc-500 mt-2 flex flex-row">
      <button className="flex items-center hover:text-sky-500 relative z-20">
        <MessageCircle size={16} />
        <span className="ml-1">{replies}</span>
      </button>
      {/* <button className="flex items-center ml-4">
        <Repeat2 size={16} />
        <span className="ml-1">{repost}</span>
      </button> */}
      <button
        className="flex items-center ml-4 hover:text-rose-500 relative z-20"
        formAction={heartAction}
      >
        <Heart
          size={16}
          className={`${isLiked ? "text-rose-500 fill-rose-500" : ""}`}
        />
        <span className="ml-1">{likes.length + likeCountAdjustment}</span>
      </button>
    </form>
  );
};

export const FeedPost = ({
  post,
  isRepost,
  entryUser,
  currentUser,
}:
  | {
      post: PostWithRelations;
      isRepost: boolean;
      entryUser: User;
      currentUser: JWTUser;
    }
  | {
      post: PostWithRelations;
      isRepost: false;
      entryUser: null;
      currentUser: JWTUser;
    }) => {
  return (
    <div className="px-4 py-2 w-full border-b border-zinc-800 relative">
      <Link
        href={`/${post.author.username}/${post.id}`}
        className="w-full h-full absolute inset-0 z-10"
      ></Link>
      {isRepost && (
        <Link
          href={`/${entryUser.username}`}
          className="text-sm mb-1 ml-9 flex flex-row text-zinc-500 hover:underline font-semibold z-20 relative"
        >
          <Repeat2 size={16} className="my-auto" />
          <span className="ml-2">Retweeted by {entryUser.name}</span>
        </Link>
      )}
      <div className="flex flex-row ">
        <div>
          <div className="w-12 h-12 bg-zinc-500 rounded-full mt-1"></div>
        </div>
        <div className="pl-3">
          <div>
            <Link href={`/${post.author.username}`} className="z-20 relative">
              <span className="font-semibold hover:underline">
                {post.author.name}
              </span>
              <span className="ml-1 text-zinc-500">
                @{post.author.username}
              </span>
            </Link>
            <span className="ml-1 text-zinc-500">·</span>
            <span className="ml-1 text-zinc-500">
              {timeSince(post.createdAt)}
            </span>
          </div>
          {post.replyToPost && (
            <span className="text-zinc-500">
              Reply to{" "}
              <Link
                href={`/${post.replyToPost.author.username}`}
                className="text-sky-500 hover:underline z-20 relative"
              >
                @{post.replyToPost.author.username}
              </Link>
            </span>
          )}
          <p>{post.content}</p>
          <PostInteraction
            likes={post.likes}
            repost={0}
            replies={post.replies.length}
            currentUser={currentUser}
            postId={post.id}
          />
        </div>
      </div>
    </div>
  );
};
