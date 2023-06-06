import { db } from "./index";

export const getUserAndPostsByUsername = (username: string) => {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
    with: {
      feedEntries: {
        where: (feedEntries, { eq }) => eq(feedEntries.isReply, false),
        orderBy: (feedEntries, { desc }) => [desc(feedEntries.createdAt)],
        with: {
          user: true,
          post: {
            with: {
              author: true,
              likes: true,
              replies: true,
            },
          },
        },
      },
    },
  });
};

export const getUserAndRepliesByUsername = (username: string) => {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
    with: {
      feedEntries: {
        where: (feedEntries, { eq }) => eq(feedEntries.isReply, true),
        orderBy: (feedEntries, { desc }) => [desc(feedEntries.createdAt)],
        with: {
          user: true,
          post: {
            with: {
              author: true,
              likes: true,
              replies: true,
              replyToPost: {
                with: {
                  author: true,
                },
              }
            },
          },
        },
      },
    },
  });
};

export const getUserAndLikesByUsername = (username: string) => {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
    with: {
      likes: {
        with: {
          post: {
            with: {
              author: true,
              likes: true,
              replies: true,
            },
          },
        },
      },
    },
  });
};

export const getUserByUsername = (username: string) => {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
  });
};
