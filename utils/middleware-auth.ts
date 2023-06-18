import type { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

import { getUserAuthByRefreshToken } from "twitter/db/user-auths";

export interface DecodedRefreshToken {
  id: number;
  username: string;
  salt: string;
}

export interface DecodedJWT {
  id: number;
  username: string;
}

const alg = "HS256";
const jwtEnvSecret = process.env.JWT_SECRET as string;
const jwtSecret = new TextEncoder().encode(jwtEnvSecret);

export const createAndSetJWTCookie = async ({
  id,
  username,
  response,
}: {
  id: number;
  username: string;
  response: NextResponse;
}) => {
  const newJWT = await new jose.SignJWT({ id, username })
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime("10m")
    .sign(jwtSecret);
  response.cookies.set({
    name: "jwt",
    value: newJWT,
    httpOnly: true,
    sameSite: "strict",
    secure: true,
    maxAge: 60 * 10,
    path: "/",
  });
};

export const verifyJWT = async (request: NextRequest) => {
  const token = request.cookies.get("jwt")?.value;
  if (!token) throw new Error("No JWT provided");

  const { payload } = await jose.jwtVerify(token, jwtSecret);
  return payload as unknown as DecodedJWT;
};

export const verifyRefreshToken = async (request: NextRequest) => {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  if (!refreshToken) throw new Error("No refreshToken provided");

  const userAuth = await getUserAuthByRefreshToken(refreshToken);
  if (!userAuth) throw new Error("Invalid refreshToken provided");

  return userAuth
};

export const refreshJWTWithRefreshToken = async ({
  request,
  response,
}: {
  request: NextRequest;
  response: NextResponse;
}) => {
  try {
    await verifyJWT(request);
  } catch (e) {
    try {
      const userAuth = await verifyRefreshToken(request);
      await createAndSetJWTCookie({
        id: userAuth.user.id,
        username: userAuth.user.username,
        response,
      });
    } catch (e) {
      throw new Error("Refresh token is invalid");
    }
  }
};
