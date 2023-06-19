import { FeedEntriesFeed } from "twitter/components/feed";
import { getUserAndPostsByUsername } from "twitter/db/users";

export default async function User({ params }: { params: { user: string } }) {
  const user = await getUserAndPostsByUsername(params.user);

  if (!user) {
    return <div>User not found</div>;
  }

  if (!user.feedEntries.length) {
    return (
      <h2 className="text-xl font-semibold text-center mt-10">
        This user hasn&apos;t posted yet.
      </h2>
    );
  }

  return <FeedEntriesFeed feedEntries={user.feedEntries} />;
}
