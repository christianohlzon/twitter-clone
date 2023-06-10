import { cookies } from "next/headers";
import { verifyJWT } from "twitter/utils/auth";

import { getFollowingFeedByUserId } from "twitter/db/feed-entries";
import { Feed } from "twitter/components/feed";
import { FeedEntry } from "twitter/db/schema";

export default async function Home() {
  let jwtUser;
  try {
    const jwtToken = cookies().get("jwt")?.value;
    jwtUser = await verifyJWT(jwtToken);
  } catch (e) {
    return <p>Please sign in or create an account</p>;
  }

  console.time("Start query")
  const feedEntries = await getFollowingFeedByUserId(jwtUser.id);
  console.timeEnd("Start query")
  return <Feed feedEntries={feedEntries} />;
}
