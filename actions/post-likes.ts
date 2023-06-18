"use server";

import { getSignedInUser } from "twitter/actions/auth";
import { likePostWithUserId, unlikePostWithUserId } from "twitter/db/post-likes";

export const likePost = async (postId: number) => {
  const decodedToken = await getSignedInUser();
  likePostWithUserId({ userId: decodedToken.id, postId });
};

export const unlikePost = async (postId: number) => {
  const decodedToken = await getSignedInUser();
  unlikePostWithUserId({ userId: decodedToken.id, postId });
};
