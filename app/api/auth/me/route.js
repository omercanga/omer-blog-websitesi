import { NextResponse } from "next/server";
import { getRole } from "@/lib/auth";

export async function GET(request) {
  return NextResponse.json({ role: getRole(request) });
}
