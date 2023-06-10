import { JWT, OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";

export interface JWTUser {
  id: number;
  username: string;
}

const jwtSecret = process.env.JWT_SECRET as string;

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

export const createJWT = ({
  username,
  id,
}: {
  username: string;
  id: number;
}) => {
  const token = jwt.sign({ id, username }, jwtSecret, {
    expiresIn: "10m",
  });
  return token;
};


export const verifyJWT = async (token?: string) => {
  if (!token) throw new Error("No JWT provided");   

  const jwtUser = jwt.verify(token, jwtSecret);
  return jwtUser as JWTUser;
};