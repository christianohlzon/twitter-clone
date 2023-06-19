import { getPostById } from "twitter/db/posts";
import { Topbar } from "twitter/components/topbar";
import { Post } from "twitter/components/post";
import { getSignedInUserOrUndefined } from "twitter/actions/auth";

export default async function Page({
  params,
}: {
  params: { user: string; post: string };
}) {
  const id = parseInt(params.post);

  if (isNaN(id)) {
    return <p>Post not found</p>;
  }

  const post = await getPostById(id);
  const user = await getSignedInUserOrUndefined();

  if (!post || post.author.username !== params.user) {
    return <p>Post not found</p>;
  }

  return (
    <>
      <Topbar title="Post" showGoBackButton={true} />
      <Post post={post} currentUser={user} />
    </>
  );
}
