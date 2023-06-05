import { FeedEntry } from "twitter/db/schema";

const FeedEntry = ({ entry }: { entry: FeedEntry }) => {
  return (
    <div key={entry.id}>
      <div>
        <span>{entry.user.name}</span>
        <span>@{entry.user.username}</span>
      </div>
      <p>{entry.post.content}</p>
    </div>
  );
};

export const Feed = ({ feedEntries }: { feedEntries: FeedEntry[] }) => {
  return (
    <>
      {feedEntries.map((entry) => (
        <FeedEntry key={entry.id} entry={entry} />
      ))}
    </>
  );
};
