import { cookies } from "next/headers";

import { verifyJWT } from "twitter/utils/auth";
import { FeedEntry, PostLikeWithPost, PostWithRelations } from "twitter/db/schema";
import { FeedPost } from "twitter/components/post";

const getUserFromCookie = async () => {
  const jwtToken = cookies().get("jwt")?.value;
  const jwtUser = await verifyJWT(jwtToken);
  return jwtUser
}


export const Feed = async ({ feedEntries }: { feedEntries: FeedEntry[] }) => {
  const currentUserId = await getUserFromCookie()
  return (
    <div>
      {feedEntries.map((entry) => (
        <FeedPost
          key={entry.id}
          post={entry.post}
          isRepost={!!entry.isRepost}
          entryUser={entry.user}
          currentUser={currentUserId}
        />
      ))}
    </div>
  );
};

export const LikeFeed = async ({ likes }: { likes: PostLikeWithPost[] }) => {
  const currentUserId = await getUserFromCookie()
  return (
    <div>
      {likes.map((like) => (
        <FeedPost
          key={like.id}
          post={like.post}
          isRepost={false}
          entryUser={null}
          currentUser={currentUserId}
        />
      ))}
    </div>
  );
};


export const ExploreFeed = async ({ posts }: { posts: PostWithRelations[] }) => {
  const currentUserId = await getUserFromCookie()
  return (
    <div>
      {posts.map((post) => (
        <FeedPost
          key={post.id}
          post={post}
          isRepost={false}
          entryUser={null}
          currentUser={currentUserId}
        />
      ))}
    </div>
  );
};