import { db } from "./index";

export const getUserAuthByRefreshToken = async (refreshToken: string) => {
  return db.query.userAuths.findFirst({
    where: (userAuths, { eq }) => eq(userAuths.refreshToken, refreshToken),
    with: {
      user: true,
    },
  });
};
