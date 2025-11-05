import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  //Allow public routes (home, auth, redeem)
  const publicPaths = ["/", "/auth/login", "/auth/signup", "/redeem"];
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  //Block unauthenticated users
  if (!token) {
    const loginUrl = new URL("/auth/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  //Restrict admin area
  if (pathname.startsWith("/admin")) {
    if (token.role !== "admin") {
      const homeUrl = new URL("/", req.url);
      return NextResponse.redirect(homeUrl);
    }
  }

  //Restrict user-only area (optional)
  if (pathname.startsWith("/redeem")) {
    if (token.role !== "user" && token.role !== "admin") {
      const loginUrl = new URL("/auth/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

//Middleware matcher – controls which paths are checked
export const config = {
  matcher: ["/admin/:path*", "/redeem/:path*"],
};
