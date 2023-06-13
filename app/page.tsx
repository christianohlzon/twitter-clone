import { cookies } from "next/headers";
import { verifyJWT } from "twitter/utils/auth";

import { getFollowingFeedByUserId } from "twitter/db/feed-entries";
import { Feed } from "twitter/components/feed";
import { PostForm } from "twitter/components/post-form";
import { Topbar } from "twitter/components/topbar";

export default async function Home() {
  let jwtUser;
  try {
    const jwtToken = cookies().get("jwt")?.value;
    jwtUser = await verifyJWT(jwtToken);
  } catch (e) {
    return <p>Please sign in or create an account</p>;
  }

  console.time("Start query");
  const feedEntries = await getFollowingFeedByUserId(jwtUser.id);
  console.timeEnd("Start query");
  return (
    <div className="relative">
      <Topbar title="Home" showGoBackButton={false} />
      <PostForm />
      <Feed feedEntries={feedEntries} />
    </div>
  );
}
