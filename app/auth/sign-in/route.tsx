import { getGoogleAuthUrl } from "twitter/actions/auth";
import { redirect } from "next/navigation";

export async function GET() {
  const url = getGoogleAuthUrl();
  redirect(url);
}
