import {
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  uniqueIndex,
  varchar,
  timestamp,
} from "drizzle-orm/mysql-core";

import { relations } from "drizzle-orm";

export const users = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    username: varchar("username", { length: 256 }).notNull(),
  },
  (users) => ({
    usernameIndex: uniqueIndex("username_idx").on(users.username),
  }),
);

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts),
}));

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  content: varchar("content", { length: 140 }),
  authorId: int("author_id").notNull(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
  likes: many(postLikes),
}));

export const postLikes = mysqlTable("post_likes", {
  id: serial("id").primaryKey(),
  postId: int("post_id").notNull(),
  userId: int("user_id").notNull(),
});

export const postLikesRelations = relations(postLikes, ({ one }) => ({
  post: one(posts, { fields: [postLikes.postId], references: [posts.id] }),
}));