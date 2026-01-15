import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/lib/auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes that don't require authentication
  const public_routes = ["/", "/login", "/register", "/api/auth"];

  // Check if the route is public
  const is_public = public_routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (is_public) {
    return NextResponse.next();
  }

  // Check authentication
  const session = await auth();

  if (!session?.user) {
    const login_url = new URL("/login", request.url);
    login_url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(login_url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
};
