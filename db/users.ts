import { db } from "./index";

export const getUserAndFeedByUsername = (username: string) => {
  return db.query.users.findFirst({
    where: (users, { eq }) => eq(users.username, username),
    with: {
      feedEntries: {
        with: {
          user: true,
          post: {
            with: {
              likes: true,
            }
          },
        },
      }
    },
  });
};
