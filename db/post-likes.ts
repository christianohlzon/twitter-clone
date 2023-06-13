"use server"

import { and, eq } from "drizzle-orm";
import { db } from "./index";
import { postLikes } from "./schema";

export const likePostWithUserId = async ({
  userId,
  postId,
}: {
  userId: number;
  postId: number;
}) => {
  await db.insert(postLikes).values({
    userId,
    postId,
  });
};

export const unlikePostWithUserId = async ({
  userId,
  postId,
}: {
  userId: number;
  postId: number;
}) => {
  await db
    .delete(postLikes)
    .where(and(eq(postLikes.postId, postId), eq(postLikes.userId, userId)));
};
