import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth/auth.config";
import { APP_ROUTES } from "./constants/routes";
import { logger } from "./lib/logger";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  try {
    const isAuthenticated = !!req.auth;
    const { pathname } = req.nextUrl;

    // Protected routes - require authentication
    const protectedRoutes = [APP_ROUTES.DASHBOARD];
    const isProtectedRoute = protectedRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    );

    // Auth routes - redirect if already authenticated
    const authRoutes = [APP_ROUTES.LOGIN];
    const isAuthRoute = authRoutes.some((route) => pathname === route);

    // Redirect unauthenticated users from protected routes to login
    if (isProtectedRoute && !isAuthenticated) {
      logger.info("Unauthenticated access attempt to protected route", {
        pathname,
        redirectTo: APP_ROUTES.LOGIN,
      });
      const loginUrl = new URL(APP_ROUTES.LOGIN, req.url);
      return NextResponse.redirect(loginUrl);
    }

    // Redirect authenticated users from auth routes to dashboard
    if (isAuthRoute && isAuthenticated) {
      logger.debug("Authenticated user accessing auth route, redirecting", {
        pathname,
        redirectTo: APP_ROUTES.DASHBOARD,
      });
      const dashboardUrl = new URL(APP_ROUTES.DASHBOARD, req.url);
      return NextResponse.redirect(dashboardUrl);
    }
    return NextResponse.next();
  } catch (error) {
    logger.error("Auth middleware error", error, {
      pathname: req.nextUrl.pathname,
      url: req.url,
    });
    const { pathname } = req.nextUrl;
    const protectedRoutes = [APP_ROUTES.DASHBOARD];
    const isProtectedRoute = protectedRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/")
    );

    // If error occurred on a protected route, redirect to login for safety
    if (isProtectedRoute) {
      logger.warn("Error on protected route - redirecting to login", {
        pathname,
      });
      const loginUrl = new URL(APP_ROUTES.LOGIN, req.url);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }
});
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (e.g., images, robots.txt)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)",
  ],
};
