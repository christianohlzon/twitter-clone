import { db } from "./index";
import { posts } from "./schema";

export const getPostById = async (id: number) => {
  return db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, id),
    with: {
      author: true,
      likes: true,
      replies: true,
    },
  });
};

export const createPost = async ({
  text,
  userId,
}: {
  text: string;
  userId: number;
}) => {
  return db.insert(posts).values({
    authorId: userId,
    content: text,
  });
};
