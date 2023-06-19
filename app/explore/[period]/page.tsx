import Link from "next/link";

import { PostFeed } from "twitter/components/feed";
import { Topbar } from "twitter/components/topbar";
import { getExploreFeed } from "twitter/db/feed-entries";

export default async function Page({ params }: { params: { period: string } }) {
  const oneDay = 24 * 60 * 60 * 1000;
  const periods = [
    {
      name: "Today",
      value: "today",
      sinceDateTime: new Date(
        new Date().setTime(new Date().getTime() - oneDay)
      ),
    },
    {
      name: "This week",
      value: "week",
      sinceDateTime: new Date(
        new Date().setTime(new Date().getTime() - oneDay * 7)
      ),
    },
    {
      name: "This month",
      value: "month",
      sinceDateTime: new Date(
        new Date().setTime(new Date().getTime() - oneDay * 30)
      ),
    },
  ];
  const thePeriod = periods.find((period) => period.value === params.period);

  if (!thePeriod) {
    return <div>Invalid period</div>;
  }

  const unsortedPosts = await getExploreFeed(thePeriod.sinceDateTime)
  const posts = unsortedPosts.sort((a, b) => b.likes.length - a.likes.length)  
  return (
    <div>
      <Topbar title="Explore - Top Posts" showGoBackButton={true} />
      <div className="flex flex-row w-full">
        {periods.map((period) => {
          return (
            <Link
              href={`/explore/${period.value}`}
              key={period.value}
              className={`p-3 font-semibold border-b-2 w-1/3 text-center ${
                period.value === thePeriod.value
                  ? "text-sky-500 border-sky-500"
                  : "text-zinc-400 border-zinc-800"
              }`}
            >
              {period.name}
            </Link>
          );
        })}
      </div>
      <PostFeed posts={posts} />
    </div>
  );
}
