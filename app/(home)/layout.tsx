import { cookies } from "next/headers";

import { getSignedInUser } from "twitter/actions/auth";
import { PostForm } from "twitter/components/post-form";
import { Topbar } from "twitter/components/topbar";

export default async function Layout({children}: { children: React.ReactNode}) {
  try {
    await getSignedInUser()
  } catch (e) {
    return <p>Please sign in or create an account</p>;
  }  
  return (
    <div className="relative">
      <Topbar title="Home" showGoBackButton={false} />
      <PostForm />
      {children}
    </div>
  );
}
