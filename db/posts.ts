import { db } from "./index";

export const getPostById = async (id: number) => {
  return db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, id),
    with: {
      author: true,
      likes: true,
      replies: true,
    },
  });
}