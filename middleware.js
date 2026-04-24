import { NextResponse } from "next/server";

/**
 * Middleware for route protection and authentication
 * Handles:
 * - Public route access
 * - Login/signup redirects for authenticated users
 * - Protected route access for authenticated users
 * - Protected API route access
 */

// Public API routes that don't require authentication
const PUBLIC_API_ROUTES = [
  "/api/login",
  "/api/signup",
  "/api/post",
  "/api/search",
];

// Protected routes that require authentication
const PROTECTED_ROUTES = ["/home", "/myblog", "/profile"];

// Protected API routes
const PROTECTED_API_ROUTES = ["/api"];

/**
 * Check if a path is a public API route
 * @param {string} pathname - The request pathname
 * @returns {boolean} True if the route is public
 */
function isPublicApiRoute(pathname) {
  // Exact matches
  if (PUBLIC_API_ROUTES.includes(pathname)) {
    return true;
  }

  // Pattern matches (e.g., /api/post/123)
  if (pathname.match(/^\/api\/post\/[^/]+$/)) {
    return true;
  }

  if (pathname.match(/^\/api\/search\?.*/)) {
    return true;
  }

  return false;
}

/**
 * Check if a path is a protected route
 * @param {string} pathname - The request pathname
 * @returns {boolean} True if the route is protected
 */
function isProtectedRoute(pathname) {
  return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

/**
 * Check if a path is a protected API route
 * @param {string} pathname - The request pathname
 * @returns {boolean} True if the route is a protected API
 */
function isProtectedApiRoute(pathname) {
  // Skip public API routes
  if (isPublicApiRoute(pathname)) {
    return false;
  }

  return pathname.startsWith("/api");
}

export function middleware(request) {
  const authToken = request.cookies.get("authToken")?.value || "";
  const pathname = request.nextUrl.pathname;

  // Log request (optional - enable for debugging)
  if (process.env.DEBUG === "true") {
    console.log(`[${new Date().toISOString()}] ${request.method} ${pathname}`);
  }

  // Allow public API routes
  if (isPublicApiRoute(pathname)) {
    return NextResponse.next();
  }

  // Redirect root to home
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  // Handle login and signup pages
  if (pathname === "/login" || pathname === "/signup") {
    // If user is already authenticated, redirect to home
    if (authToken) {
      return NextResponse.redirect(new URL("/home", request.url));
    }
    return NextResponse.next();
  }

  // Protect private routes (pages)
  if (isProtectedRoute(pathname)) {
    if (!authToken) {
      // Log unauthorized access attempt
      console.warn(
        `[${new Date().toISOString()}] Unauthorized access attempt to ${pathname}`
      );
      return NextResponse.redirect(new URL("/signup", request.url));
    }
    return NextResponse.next();
  }

  // Protect private API routes
  if (isProtectedApiRoute(pathname)) {
    if (!authToken) {
      // Log unauthorized API access
      console.warn(
        `[${new Date().toISOString()}] Unauthorized API access attempt to ${pathname}`
      );
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized",
          message: "Authentication token is required to access this resource",
        },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Include all routes except static files and next internals
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
