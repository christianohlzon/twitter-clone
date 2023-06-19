import { getPostById } from "twitter/db/posts";
import { Topbar } from "twitter/components/topbar";
import { Post } from "twitter/components/post";
import { getSignedInUserOrUndefined } from "twitter/actions/auth";
import { PostForm } from "twitter/components/post-form";
import { Feed } from "twitter/components/feed";

export default async function Page({
  params,
  children,
}: {
  params: { user: string; post: string };
  children: React.ReactNode;
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
      {children}
    </>
  );
}
