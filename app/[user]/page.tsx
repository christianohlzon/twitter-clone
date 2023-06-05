import { Feed } from "twitter/components/feed";
import { getUserAndFeedByUsername } from "twitter/db/users";

export default async function User({ params }: { params: { user: string } }) {
  const user = await getUserAndFeedByUsername(params.user);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <h1>User: @{params.user}</h1>
      <Feed feedEntries={user.feedEntries} />
    </div>
  );
}
