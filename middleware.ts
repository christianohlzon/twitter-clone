import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { refreshJWTWithRefreshToken } from "twitter/utils/middleware-auth";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  try {
    await refreshJWTWithRefreshToken({ request, response });
    return response;
  } catch (e) {
    return response;
  }
}
