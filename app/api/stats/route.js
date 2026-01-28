import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function GET() {
  const pool = getPool();
  const [contentCount, userCount, draftCount] = await Promise.all([
    pool.query("SELECT COUNT(*)::int AS count FROM content"),
    pool.query("SELECT COUNT(*)::int AS count FROM users"),
    pool.query("SELECT COUNT(*)::int AS count FROM content WHERE status = 'draft'")
  ]);

  return NextResponse.json({
    content: contentCount.rows[0].count,
    users: userCount.rows[0].count,
    drafts: draftCount.rows[0].count
  });
}
