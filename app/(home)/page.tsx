import { getFollowingFeedByUserId } from "twitter/db/feed-entries";
import { FeedEntriesFeed } from "twitter/components/feed";
import { getSignedInUser } from "twitter/actions/auth";
import { DecodedJWT } from "twitter/utils/middleware-auth";

export default async function Home() {
  let user: DecodedJWT | null;
  try {
    user = await getSignedInUser()
  } catch (e) {
    return <p>Please sign in or create an account</p>;
  }
  
  const feedEntries = await getFollowingFeedByUserId(user.id);
  return <FeedEntriesFeed feedEntries={feedEntries} />;
}
