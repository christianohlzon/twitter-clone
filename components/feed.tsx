import { getSignedInUser } from "twitter/actions/auth";
import {
  FeedEntry,
  PostLikeWithPost,
  PostWithRelations,
} from "twitter/db/schema";
import { FeedPost } from "twitter/components/post";

export const Feed = async ({ feedEntries }: { feedEntries: FeedEntry[] }) => {
  const currentUser = await getSignedInUser();
  return (
    <div>
      {feedEntries.map((entry) => (
        <FeedPost
          key={entry.id}
          post={entry.post}
          isRepost={!!entry.isRepost}
          entryUser={entry.user}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export const LikeFeed = async ({ likes }: { likes: PostLikeWithPost[] }) => {
  const currentUser = await getSignedInUser();
  return (
    <div>
      {likes.map((like) => (
        <FeedPost
          key={like.id}
          post={like.post}
          isRepost={false}
          entryUser={null}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};

export const ExploreFeed = async ({
  posts,
}: {
  posts: PostWithRelations[];
}) => {
  const currentUser = await getSignedInUser();
  return (
    <div>
      {posts.map((post) => (
        <FeedPost
          key={post.id}
          post={post}
          isRepost={false}
          entryUser={null}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
};
