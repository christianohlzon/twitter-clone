import { UserWithFollows } from "twitter/db/schema";
import { getUserByUsername } from "twitter/db/users";
import { ProfileNavbar } from "twitter/components/profile-navbar";
import { Calendar } from "lucide-react";
import { Topbar } from "twitter/components/topbar";

const Profile = ({ user }: { user: UserWithFollows }) => {
  return (
    <>
      <Topbar title={user.name} showGoBackButton={true} />
      <div className="w-full border-b border-zinc-800">
        <div className="w-full h-40 bg-zinc-700"></div>
        <div className="relative">
          <div className="h-32 w-32 rounded-full bg-zinc-700 absolute -top-16 ml-4 border-4 border-solid border-zinc-950"></div>
          <button className="bg-sky-500 hover:opacity-70 transition py-2 px-8 font-semibold rounded-full absolute top-4 right-4">
            Follow
          </button>
          <div className="p-4 pt-20">
            <div className="flex flex-row justify-between">
              <div>
                <h1 className="font-semibold text-lg">{user.name}</h1>
                <p className="text-zinc-500">@{user.username}</p>
              </div>
            </div>
            <p className="mt-3">{user.bio}</p>
            <div className="items-center flex flex-row space-x-1 text-zinc-500 mt-1">
              <Calendar size={16} />
              <span>Joined {user.createdAt?.toLocaleDateString()}</span>
            </div>
            <div className="mt-2">
              <span className="text-zinc-500">
                <span className="font-bold text-zinc-50 mr-1">
                  {user.followers.length}
                </span>
                followers
              </span>
              <span className="text-zinc-500">
                <span className="font-bold text-zinc-50 ml-2 mr-1">
                  {user.followees.length}
                </span>
                follows
              </span>
            </div>
          </div>
        </div>
        <ProfileNavbar user={user} />
      </div>
    </>
  );
};

export default async function Layout({
  params,
  children,
}: {
  params: { user: string };
  children: React.ReactNode;
}) {
  const user = await getUserByUsername(params.user);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <>
      <Profile user={user} />
      {children}
    </>
  );
}
