import { getToken } from "next-auth/jwt";
import { NextResponse, NextRequest } from "next/server";

const publicRoutes = ["/sign-in"];
const protectedPaths = [/^\/onboarding(\/.*)?$/, /^\/portfolio(\/.*)?$/];

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

  const isPublicRoute = publicRoutes.includes(pathname);
  const isProtected = protectedPaths.some((regex) => regex.test(pathname));
  //const defaultPortfolio = token && token.defaultPortfolio;

  //handles root route
  if (pathname === "/") {
    if (!token) {
      return NextResponse.redirect(new URL("sign-in", request.url));
    }

    return NextResponse.redirect(
      new URL(`/portfolio/dashboard/`, request.url),
      307
    );

    //return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  // Redirect to sign-in if not authenticated
  if (isProtected && !token) {
    console.log("has no token");
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Redirect to dashboard if already logged in and on public route
  if (isPublicRoute && token) {
    console.log("has token");

    return NextResponse.redirect(
      new URL(`/portfolio/dashboard/`, request.url),
      307
    );

    // return NextResponse.redirect(new URL("/onboarding", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in", "/onboarding/:path*", "/portfolio/:path*"],
};
