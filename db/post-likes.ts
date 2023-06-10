import { db } from "./index";
import { postLikes } from "./schema";

export const likePostWithUserId = async ({
  userId,
  postId,
}: {
  userId: number;
  postId: number;
}) => {
  // await db.insert(postLikes).values({
  //   userId,
  //   postId,
  // });
};
