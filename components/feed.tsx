import { getSignedInUserOrUndefined } from "twitter/actions/auth";
import {
  FeedEntry,
  PostLikeWithPost,
  PostWithRelations,
} from "twitter/db/schema";
import { FeedPost } from "twitter/components/post";

export const FeedEntriesFeed = async ({ feedEntries }: { feedEntries: FeedEntry[] }) => {
  const currentUser = await getSignedInUserOrUndefined();
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
  const currentUser = await getSignedInUserOrUndefined();
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

export const PostFeed = async ({
  posts,
}: {
  posts: PostWithRelations[];
}) => {
  const currentUser = await getSignedInUserOrUndefined();
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
