import { getUserAndLikesByUsername } from "twitter/db/users";
import { LikeFeed } from "twitter/components/feed";

export default async function Replies({
  params,
}: {
  params: { user: string };
}) {
  const user = await getUserAndLikesByUsername(params.user);

  if (!user) return null;

  if (!user.likes.length) {
    return (
      <h2 className="text-xl font-semibold text-center mt-10">
        This user hasn&apos;t liked anything yet.
      </h2>
    );
  }
  return <LikeFeed likes={user.likes} />;
}
