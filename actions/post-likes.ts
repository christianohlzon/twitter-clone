"use server";

import { cookies } from "next/headers";

import { verifyJWT } from "twitter/utils/auth";
import { likePostWithUserId } from "twitter/db/post-likes";

export const likePost = async (postId: number) => {
  const jwtToken = cookies().get("jwt")?.value;
  const jwtUser = await verifyJWT(jwtToken);
  likePostWithUserId({ userId: jwtUser.id, postId });
};
