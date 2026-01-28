import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;
  const isAdmin = pathname.startsWith("/admin");
  const isApi = pathname.startsWith("/api");
  const isLogin = pathname.startsWith("/admin/login");
  const isAuthApi = pathname.startsWith("/api/auth");

  if (!isAdmin && !isApi) {
    return NextResponse.next();
  }

  if (isLogin || isAuthApi) {
    return NextResponse.next();
  }

  const session = request.cookies.get("admin_session")?.value;
  if (session === "1") {
    return NextResponse.next();
  }

  if (isApi) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const loginUrl = new URL("/admin/login", request.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/:path*"]
};
