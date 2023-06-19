"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, MessageCircle, Repeat2 } from "lucide-react";

import { PostWithRelations, User, PostLike } from "twitter/db/schema";
import { timeSince } from "twitter/utils/time";
import { DecodedJWT } from "twitter/utils/middleware-auth";
import { likePost, unlikePost } from "twitter/actions/post-likes";
import { ProfileAvatar } from "./profile-avatar";

export const PostInteraction = ({
  likes,
  repost,
  replies,
  currentUser,
  postId,
  postAuthor,
}: {
  likes: PostLike[];
  repost: number;
  replies: number;
  currentUser?: DecodedJWT;
  postId: number;
  postAuthor: User;
}) => {
  const isLikedByUser =
    !currentUser || likes.some((like) => like.userId === currentUser.id);

  const [isLiked, setIsLiked] = useState(isLikedByUser);
  const heartAction = () => {
    if (isLiked) {
      setIsLiked(false);
      unlikePost(postId);
    } else {
      setIsLiked(true);
      likePost(postId);
    }
  };

  const likeCountAdjustment =
    isLikedByUser && isLiked ? 0 : isLiked ? 1 : isLikedByUser ? -1 : 0;
  return (
    <form className="text-sm text-zinc-500 mt-2 flex flex-row">
      <Link href={`/${postAuthor.username}/${postId}/reply`} className="flex items-center hover:text-sky-500 relative z-20">
        <MessageCircle size={16} />
        <span className="ml-1">{replies}</span>
      </Link>
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
      currentUser?: DecodedJWT;
    }
  | {
      post: PostWithRelations;
      isRepost: false;
      entryUser: null;
      currentUser?: DecodedJWT;
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
        <div className="pt-2">
          <ProfileAvatar size={48} />
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
            postAuthor={post.author}
          />
        </div>
      </div>
    </div>
  );
};

export const Post = ({
  post,
  currentUser,
}: {
  post: PostWithRelations;
  currentUser?: DecodedJWT;
}) => {
  return (
    <div className="px-4 py-2 pt-4 w-full border-b border-zinc-800">
      <div className="flex flex-row">
        <div className="w-12 h-12 bg-zinc-500 rounded-full mr-2"></div>
        <Link href={`/${post.author.username}`}>
          <span className="font-semibold block">{post.author.name}</span>
          <span className=" text-zinc-500 block">@{post.author.username}</span>
        </Link>
      </div>
      <div>
        {post.replyToPost && (
          <span className="text-zinc-500">
            Reply to{" "}
            <Link
              href={`/${post.replyToPost.author.username}`}
              className="text-sky-500 hover:underline"
            >
              @{post.replyToPost.author.username}
            </Link>
          </span>
        )}
        <p className="text-xl mt-3 mb-1">{post.content}</p>
        <div>
          <span className="text-zinc-500">{timeSince(post.createdAt)}</span>
        </div>
        <PostInteraction
          postId={post.id}
          postAuthor={post.author}
          likes={post.likes}
          repost={0}
          replies={post.replies.length}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};
