import { NextResponse } from "next/server";

export function middleware(request) {
  if (request.nextUrl.pathname === "/" && !request.nextUrl.searchParams.get("testnets")) {
    return NextResponse.redirect(new URL("/?testnets=true", request.url));
  }

  return NextResponse.next();
}
