import Link from "next/link";

import { getPostById } from "twitter/db/posts";
import { PostInteraction } from "twitter/components/feed";
import { PostWithRelations } from "twitter/db/schema";
import { timeSince } from "twitter/utils/time";

const PostUI = ({ post }: { post: PostWithRelations }) => {
  return (
    <div className="px-4 py-2 pt-4 w-full border-b border-zinc-800">
      <div className="flex flex-row">
        <div className="w-12 h-12 bg-zinc-500 rounded-full mr-2"></div>
        <Link href={`/${post.author.username}`}>
          <span className="font-semibold block">{post.author.name}</span>
          <span className=" text-zinc-500 block">
            @{post.author.username}
          </span>
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
          <span className="text-zinc-500">
            {timeSince(post.createdAt)}
          </span>
        </div>        
        <PostInteraction
          likes={post.likes.length}
          repost={0}
          replies={post.replies.length}
        />
      </div>
    </div>
  );
};

export default async function Post({
  params,
}: {
  params: { user: string; post: string };
}) {
  const id = parseInt(params.post);

  if (isNaN(id)) {
    return <p>Post not found</p>;
  }

  const post = await getPostById(id);

  if (!post || post.author.username !== params.user) {
    return <p>Post not found</p>;
  }

  return <PostUI post={post} />;
}
