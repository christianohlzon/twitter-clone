import { db } from "./index";
import { posts } from "./schema";

export const getPostById = async (id: number) => {
  return db.query.posts.findFirst({
    where: (posts, { eq }) => eq(posts.id, id),
    with: {
      author: true,
      likes: true,
      replies: true,
      replyToPost: {
        with: {
          author: true,
          likes: true,
          replies: true,
          replyToPost: {
            with: {
              author: true,
            },
          },
        },
      },
    },
  });
};

export const getRepliesToPostId = async (id: number) => {
  return db.query.posts.findMany({
    where: (posts, { eq }) => eq(posts.replyToPostId, id),
    with: {
      author: true,
      likes: true,
      replies: true,
    },
    orderBy: (posts, { desc }) => [desc(posts.createdAt)],
  });
};

export const createPost = async ({
  text,
  userId,
  replyToPostId,
}: {
  text: string;
  userId: number;
  replyToPostId?: number;
}) => {
  return db.insert(posts).values({
    authorId: userId,
    content: text,
    replyToPostId,
  });
};
