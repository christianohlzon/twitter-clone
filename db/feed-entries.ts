import { db } from "./index";

export const getFeedEntryPostsByUserId = (userId: number) => {
  return db.query.feedEntries.findMany({
    where: (feedEntries, { eq }) => eq(feedEntries.userId, userId),
    with: {
      post: true,
      user: true,
    },
  });
};
