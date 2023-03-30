import { withClerkMiddleware } from "@clerk/nextjs/server";
import { copyFileSync } from "fs";
import { NextResponse } from "next/server";

export default withClerkMiddleware(() => {
  console.log("Middleware running on all requests");
  return NextResponse.next();
});

// Stop Middleware running on static files
export const config = {
  matcher: "/((?!_next/image|_next/static|favicon.ico).*)",
};
