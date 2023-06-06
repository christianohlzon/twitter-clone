import { getUserAndRepliesByUsername } from "twitter/db/users";
import { Feed } from "twitter/components/feed";

export default async function Replies({
  params,
}: {
  params: { user: string };
}) {
  const user = await getUserAndRepliesByUsername(params.user);

  if (!user) return null;

  if (!user.feedEntries.length) {
    return (
      <h2 className="text-xl font-semibold text-center mt-10">
        This user hasn&apos;t replied to anyone yet.
      </h2>
    );
  }
  return <Feed feedEntries={user.feedEntries} />;
}
