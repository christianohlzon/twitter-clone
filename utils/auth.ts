const { OAuth2Client } = require("google-auth-library");

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
