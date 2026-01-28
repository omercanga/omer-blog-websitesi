import { NextResponse } from "next/server";

export function getRole(request) {
  return request.cookies.get("admin_role")?.value || "viewer";
}

export function requireRole(request, allowedRoles) {
  const role = getRole(request);
  if (!allowedRoles.includes(role)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }
  return null;
}
