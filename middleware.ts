import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/posts/ljuset-i-rymden") {
    const url = new URL(request.url);
    url.pathname += "/";
    return NextResponse.redirect(url, 308);
  }
  return NextResponse.next();
}

export const config = { matcher: "/posts/ljuset-i-rymden/:path*" };
