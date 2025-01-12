import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPathPublic =
    path === "/login" || path === "/signup" || path === "/"; // Public paths

  const token = request.cookies.get("token")?.value || ""; // Get token value from cookies

  // Redirect logged-in users to the homepage only if they access `/login` or `/signup`
  if ((path === "/login" || path === "/signup") && token) {
    return NextResponse.redirect(new URL("/home", request.nextUrl));
  }

  // Allow users to access `/` even if they have a token (no redirect loop)
  if (path === "/" && token) {
    return NextResponse.next();
  }

  // Redirect users to login if they are trying to access protected paths without a token
  if (!isPathPublic && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/signup", "/home", "/home/:path*"],
};
