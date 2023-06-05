import { FeedEntry } from "twitter/db/schema";

const FeedEntry = ({ entry }: { entry: FeedEntry }) => {
  return (
    <div className="flex flex-row p-4 w-full border-b border-zinc-800">
      <div>
        <div className="w-12 h-12 bg-zinc-500 rounded-full"></div>
      </div>
      <div className="pl-3">
        <div>
          <span className="font-semibold">{entry.user.name}</span>
          <span className="ml-1 text-zinc-500">@{entry.user.username}</span>
        </div>
        <p>{entry.post.content}</p>
      </div>
    </div>
  );
};

export const Feed = ({ feedEntries }: { feedEntries: FeedEntry[] }) => {
  return (
    <div>
      {feedEntries.map((entry) => (
        <FeedEntry key={entry.id} entry={entry} />
      ))}
    </div>
  );
};
