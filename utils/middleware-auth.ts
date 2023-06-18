import type { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export interface JWTUser {
  id: number;
  username: string;
}

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

  const { payload } = await jose.jwtVerify(refreshToken, jwtSecret);

  return payload as unknown as DecodedRefreshToken;
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
      const decodedRefreshToken = await verifyRefreshToken(request);
      await createAndSetJWTCookie({
        id: decodedRefreshToken.id,
        username: decodedRefreshToken.username,
        response,
      });
    } catch (e) {
      throw new Error("Refresh token is invalid");
    }
  }
};
