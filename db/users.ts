"use server";

import { like } from "drizzle-orm";

import { db } from "./index";

export const getUserAndPostsByUsername = async (username: string) => {
  return await db.query.users.findFirst({
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

export const getUserAndRepliesByUsername = async (username: string) => {
  return await db.query.users.findFirst({
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
              },
            },
          },
        },
      },
    },
  });
};

export const getUserAndLikesByUsername = async (username: string) => {
  return await db.query.users.findFirst({
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

export const getUserByUsername = async (username: string) => {
  return await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
    with: {
      followers: true,
      followees: true,
    },
  });
};

export const searchUsersByUsername = async (searchInput: string) => {
  return await db.query.users.findMany({
    where: (users) => like(users.username, `%${searchInput.toLowerCase()}%`),
  });
};
