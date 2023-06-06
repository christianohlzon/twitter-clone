import {
  boolean,
  datetime,
  int,
  mysqlTable,
  serial,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/mysql-core";
import { relations, InferModel } from "drizzle-orm";

export type User = InferModel<typeof users>;
export type Post = InferModel<typeof posts>;
export type PostWithAuthor = InferModel<typeof posts> & {
  author: User;
};
export interface PostWithRelations extends InferModel<typeof posts> {
  author: User;
  likes: PostLike[];
  replies: Post[];
  replyToPost?: PostWithAuthor;
}
export type PostLike = InferModel<typeof postLikes>;
export interface PostLikeWithPost extends InferModel<typeof postLikes> {
  post: PostWithRelations;
}
export interface FeedEntry extends InferModel<typeof feedEntries> {
  post: PostWithRelations;
  user: User;
}

export const users = mysqlTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
    username: varchar("username", { length: 20 }).notNull(),
    bio: varchar("bio", { length: 140 }),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (users) => ({
    usernameIndex: uniqueIndex("username_idx").on(users.username),
  })
);

export const usersRelations = relations(users, ({ many }) => ({
  feedEntries: many(feedEntries),
  likes: many(postLikes),
}));

export const posts = mysqlTable("posts", {
  id: serial("id").primaryKey(),
  content: varchar("content", { length: 140 }),
  authorId: int("author_id").notNull(),
  replyToPostId: int("reply_to_post_id"),
  quotePostId: int("quote_to_post_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, { fields: [posts.authorId], references: [users.id] }),
  replyToPost: one(posts, {
    fields: [posts.replyToPostId],
    references: [posts.id],
    relationName: "replyToPost",
  }),
  likes: many(postLikes),
  replies: many(posts, { relationName: "replyToPost" }),
  // reposts: many(feedEntries),
}));

export const postLikes = mysqlTable("post_likes", {
  id: serial("id").primaryKey(),
  postId: int("post_id").notNull(),
  userId: int("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const postLikesRelations = relations(postLikes, ({ one }) => ({
  post: one(posts, { fields: [postLikes.postId], references: [posts.id] }),
  user: one(users, { fields: [postLikes.userId], references: [users.id] }),
}));

export const feedEntries = mysqlTable("feed_entries", {
  id: serial("id").primaryKey(),
  isRepost: boolean("is_repost").default(false),
  isReply: boolean("is_reply").default(false),
  postId: int("post_id").notNull(),
  userId: int("user_id").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const feedEntriesRelations = relations(feedEntries, ({ one }) => ({
  post: one(posts, { fields: [feedEntries.postId], references: [posts.id] }),
  user: one(users, { fields: [feedEntries.userId], references: [users.id] }),
}));
