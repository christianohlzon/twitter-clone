import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import * as jose from "jose";

const alg = "HS256";

const jwtEnvSecret = process.env.JWT_SECRET as string;
const jwtSecret = new TextEncoder().encode(jwtEnvSecret);

export async function GET() {
  const newJWT = await new jose.SignJWT({ id: 1, username: "ohlzon" })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(jwtSecret);
  const newRefreshToken = await new jose.SignJWT({ id: 1, username: "ohlzon" })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(jwtSecret);
  cookies().set({
    name: "jwt",
    value: newJWT,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 60 * 10,
  });
  cookies().set({
    name: "refreshToken",
    value: newRefreshToken,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 60 * 60 * 24 * 30,
  });
  redirect("/");
}
