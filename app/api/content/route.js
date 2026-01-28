import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { requireRole } from "@/lib/auth";

export async function GET() {
  const pool = getPool();
  const result = await pool.query(
    "SELECT id, title, body, tags, status, created_at FROM content ORDER BY created_at DESC"
  );
  return NextResponse.json({ items: result.rows });
}

export async function POST(request) {
  const authError = requireRole(request, ["admin", "engineer"]);
  if (authError) {
    return authError;
  }
  const pool = getPool();
  const body = await request.json();
  const { title, body: contentBody, tags, status } = body;
  if (!title || !contentBody) {
    return NextResponse.json(
      { error: "Başlık ve içerik zorunludur." },
      { status: 400 }
    );
  }
  if (status && !["draft", "published"].includes(status)) {
    return NextResponse.json({ error: "Geçersiz durum." }, { status: 400 });
  }
  const normalizedTags = typeof tags === "string" ? tags.trim() : "";
  const result = await pool.query(
    "INSERT INTO content (title, body, tags, status) VALUES ($1, $2, $3, $4) RETURNING id, title, body, tags, status, created_at",
    [title, contentBody, normalizedTags, status || "draft"]
  );
  return NextResponse.json({ item: result.rows[0] }, { status: 201 });
}
