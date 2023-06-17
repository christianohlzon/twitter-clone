"use server";

import { cookies } from "next/headers";
import * as jose from "jose";
import { DecodedJWT } from "twitter/utils/middleware-auth";
import { OAuth2Client } from "google-auth-library";

const alg = "HS256";
const jwtEnvSecret = process.env.JWT_SECRET as string;
const jwtSecret = new TextEncoder().encode(jwtEnvSecret);

export const getSignedInUser = async () => {
  try {
    const token = cookies().get("jwt")?.value;
    if (!token) throw new Error("No JWT provided");

    const { payload } = await jose.jwtVerify(token, jwtSecret);
    return payload as unknown as DecodedJWT;
  } catch (e) {
    const token = cookies().get("refreshToken")?.value;
    if (!token) throw new Error("No JWT provided");

    const { payload } = await jose.jwtVerify(token, jwtSecret);
    return {
      id: payload.id,
      username: payload.username,
    } as unknown as DecodedJWT;
  }
};

export const getGoogleAuthUrl = () => {
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URL
  );
  const authorizeUrl = oAuth2Client.generateAuthUrl({
    scope: "https://www.googleapis.com/auth/userinfo.email",
  });

  return authorizeUrl;
};