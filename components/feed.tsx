import { Heart, MessageCircle, Repeat2 } from "lucide-react";
import Link from "next/link";

import { timeSince } from "twitter/utils/time";
import {
  FeedEntry,
  PostWithRelations,
  User,
  PostLikeWithPost,
} from "twitter/db/schema";

export const PostInteraction = ({
  likes,
  repost,
  replies,
}: {
  likes: number;
  repost: number;
  replies: number;
}) => {
  return (
    <div className="text-sm text-zinc-500 mt-2 flex flex-row">
      <button className="flex items-center hover:text-sky-500">
        <MessageCircle size={16} />
        <span className="ml-1">{replies}</span>
      </button>
      {/* <button className="flex items-center ml-4">
        <Repeat2 size={16} />
        <span className="ml-1">{repost}</span>
      </button> */}
      <button className="flex items-center ml-4 hover:text-rose-500">
        <Heart size={16} />
        <span className="ml-1">{likes}</span>
      </button>
    </div>
  );
};

export const FeedPost = ({
  post,
  isRepost,
  entryUser,
}:
  | {
      post: PostWithRelations;
      isRepost: boolean;
      entryUser: User;
    }
  | {
      post: PostWithRelations;
      isRepost: false;
      entryUser: null;
    }) => {
  return (
    <div className="px-4 py-2 w-full border-b border-zinc-800 relative">
      <Link href={`/${post.author.username}/${post.id}`} className="w-full h-full absolute inset-0 z-10"></Link>
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
          <div className="w-12 h-12 bg-zinc-500 rounded-full"></div>
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
            likes={post.likes.length}
            repost={0}
            replies={post.replies.length}
          />
        </div>
      </div>
    </div>
  );
};

export const Feed = ({ feedEntries }: { feedEntries: FeedEntry[] }) => {
  return (
    <div>
      {feedEntries.map((entry) => (
        <FeedPost
          key={entry.id}
          post={entry.post}
          isRepost={!!entry.isRepost}
          entryUser={entry.user}
        />
      ))}
    </div>
  );
};

export const LikeFeed = ({ likes }: { likes: PostLikeWithPost[] }) => {
  return (
    <div>
      {likes.map((like) => (
        <FeedPost
          key={like.id}
          post={like.post}
          isRepost={false}
          entryUser={null}
        />
      ))}
    </div>
  );
};
