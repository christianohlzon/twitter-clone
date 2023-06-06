import { getGoogleAuthUrl } from "twitter/utils/auth";
import { redirect } from "next/navigation";

export async function GET() {
  const url = getGoogleAuthUrl();
  redirect(url);
}
