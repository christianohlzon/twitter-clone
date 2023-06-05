import {
  boolean,
  int,
  mysqlTable,
  serial,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { relations, InferModel } from "drizzle-orm";

export type User = InferModel<typeof users>;
export type Post = InferModel<typeof posts>;
export type PostLike = InferModel<typeof postLikes>;
export interface FeedEntry extends InferModel<typeof feedEntries> {
  post: Post;
  user: User;
}

export const users = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    username: varchar("username", { length: 20 }).notNull(),
    bio: varchar("bio", { length: 140 }),
  },
  (users) => ({
    usernameIndex: uniqueIndex("username_idx").on(users.username),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  feedEntries: many(feedEntries),
}));

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  content: varchar("content", { length: 140 }),
  authorId: int("author_id").notNull(),
  replyToPostId: int("reply_to_post_id"),
  quoteToPostId: int("quote_to_post_id"),
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

export const feedEntries = mysqlTable("feed_entries", {
  id: serial("id").primaryKey(),
  isRepost: boolean("is_repost").default(false),
  postId: int("post_id").notNull(),
  userId: int("user_id").notNull(),
});

export const feedEntriesRelations = relations(feedEntries, ({ one }) => ({
  post: one(posts, { fields: [feedEntries.postId], references: [posts.id] }),
  user: one(users, { fields: [feedEntries.userId], references: [users.id] }),
}));
