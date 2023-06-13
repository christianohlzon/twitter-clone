import { inArray, gt, and, eq, sql } from "drizzle-orm";

import { db } from "./index";
import { feedEntries, posts } from "./schema";

export const getFeedEntryPostsByUserId = (userId: number) => {
  return db.query.feedEntries.findMany({
    where: (feedEntries, { eq }) => eq(feedEntries.userId, userId),
    with: {
      post: true,
      user: true,
    },
  });
};

export const getFollowingFeedByUserId = async (userId: number) => {
  const user = await db.query.users.findFirst({
    where: (users, { eq }) => eq(users.id, userId),
    with: {
      followees: true,
    },
  });
  if (!user) return [];
  const followeeIds = user.followees.map((item) => item.followeeId);
  if (!followeeIds.length) return [];

  return db.query.feedEntries.findMany({
    where: inArray(feedEntries.userId, followeeIds),
    orderBy: (feedEntries, { desc }) => [desc(feedEntries.createdAt)],
    with: {
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
      user: true,
    },
  });
};

export const getExploreFeed = async (sinceDateTime: Date) => {
  return db.query.posts.findMany({
    where: gt(posts.createdAt, sinceDateTime),
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
  });
};
