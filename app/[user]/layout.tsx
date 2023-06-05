import { User } from "twitter/db/schema";
import { getUserAndFeedByUsername } from "twitter/db/users";
import { ProfileNavbar } from "twitter/components/profile-navbar";

export default async function User({
  params,
  children,
}: {
  params: { user: string };
  children: React.ReactNode;
}) {
  const user = await getUserAndFeedByUsername(params.user);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="flex flex-row justify-center h-full">
      <div className="h-full w-128 border border-solid border-x-1 border-y-0 border-zinc-800">
        <div className="w-full border-b border-zinc-800">
          <div className="p-4">
            <div className="flex flex-row justify-between">
              <div className="flex flex-row">
                <div className="w-12 h-12 bg-zinc-500 rounded-full"></div>
                <div className="ml-2">
                  <h1 className="font-semibold text-lg">{user.name}</h1>
                  <p className="text-zinc-500">@{user.username}</p>
                </div>
              </div>
              <button className="bg-sky-500 hover:opacity-70 transition py-2 px-8 font-semibold rounded-full my-auto">
                Follow
              </button>
            </div>
            <p className="mt-3">{user.bio}</p>
          </div>
          <ProfileNavbar user={user} />
        </div>
        {children}
      </div>
    </div>
  );
}
