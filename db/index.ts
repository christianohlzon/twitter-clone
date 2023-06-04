import * as schema from './schema';
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});

const db = drizzle(connection, {
  schema,
});

export const getUsers = async () => {
  const result = await db.query.users.findMany({
    with: {
      posts: true,
    },
  });
  return result;
};
