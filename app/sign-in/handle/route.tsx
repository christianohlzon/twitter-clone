import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { createJWT } from "twitter/utils/auth";

export async function GET() {
  const newJWT = createJWT({ id: 1, username: "ohlzon" });
  cookies().set({
    name: "jwt",
    value: newJWT,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 60 * 10,
  });
  redirect("/");
}
