import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

const publicRoutes = ["/sign-in"];
const protectedPaths = [/^\/dashboard(\/.*)?$/, /^\/profile(\/.*)?$/];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  //handles OAuth routes
  if (pathname.startsWith("/api/auth") || pathname.startsWith("/auth")) {
    return NextResponse.next();
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  if (pathname === "/") {
    return NextResponse.redirect(
      new URL(token ? "/portfolio" : "/sign-in", request.url)
    );
  }

  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtected = protectedPaths.some((regex) => regex.test(pathname));

  // Redirect to sign-in if not authenticated
  if (isProtected && !token) {
    console.log("has no token", request.url);
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Redirect to dashboard if already logged in and on public route
  if (isPublicRoute && token) {
    console.log("has token");
    return NextResponse.redirect(new URL("/portfolio", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in", "/dashboard/:path*", "/profile/:path*"],
};
