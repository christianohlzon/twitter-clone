import { getSignedInUserOrUndefined } from "twitter/actions/auth";
import { PostForm } from "twitter/components/post-form";
import { redirect } from "next/navigation";

export default async function Page({
  params,
}: {
  params: { user: string; post: string };
}) {
  const postId = parseInt(params.post);
  const user = await getSignedInUserOrUndefined();

  if (!user) {
    return redirect(`/${params.user}/${params.post}`);
  }

  return <PostForm replyToPostId={postId} buttonText="Reply" />;
}
