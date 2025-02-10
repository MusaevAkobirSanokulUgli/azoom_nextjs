import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define protected routes
const protectedRoutes = [
  "/",
  "/upcoming",
  "/previous",
  "/recordings",
  "/personal-room",
  "/meeting(.*)",
];

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const url = new URL(req.url);

  // Redirect unauthenticated users to the sign-in page
  if (protectedRoutes.includes(url.pathname) && !userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", req.url); // Redirect back after signing in
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

// Exclude public assets and Next.js internals from middleware
export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico|public).*)",
};
