"use server";

import { getSignedInUser } from "twitter/actions/auth";
import { createPost } from "twitter/db/posts";
import { createFeedEntry } from "twitter/db/feed-entries";

export const submitPost = async (text: string) => {
  const user = await getSignedInUser();
  const post = await createPost({ text, userId: user.id });
  await createFeedEntry({
    userId: user.id,
    postId: parseInt(post.insertId),
  });
};
