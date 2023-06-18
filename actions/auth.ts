"use server";
 
import { cookies, headers } from "next/headers";
import * as jose from "jose";
import { DecodedJWT } from "twitter/utils/middleware-auth";
import { OAuth2Client } from "google-auth-library";

const alg = "HS256";
const jwtEnvSecret = process.env.JWT_SECRET as string;
const jwtSecret = new TextEncoder().encode(jwtEnvSecret);

export const getSignedInUser = async () => {
  try {
    const setCookieJWTHeader = headers().get("set-cookie")?.split(';')[0].replace('jwt=', '')
    const token = cookies().get("jwt")?.value || setCookieJWTHeader
    if (!token) throw new Error("No JWT provided");

    const { payload } = await jose.jwtVerify(token, jwtSecret);
    return payload as unknown as DecodedJWT;
  } catch (e) { 
    throw new Error("Invalid JWT");
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