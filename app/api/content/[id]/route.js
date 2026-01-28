import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { requireRole } from "@/lib/auth";

export async function PUT(request, { params }) {
  const authError = requireRole(request, ["admin", "engineer"]);
  if (authError) {
    return authError;
  }
  const { id } = params;
  const payload = await request.json();
  const { title, body, tags, status } = payload;
  if (!title || !body) {
    return NextResponse.json(
      { error: "Başlık ve içerik zorunludur." },
      { status: 400 }
    );
  }
  if (status && !["draft", "published"].includes(status)) {
    return NextResponse.json({ error: "Geçersiz durum." }, { status: 400 });
  }
  const normalizedTags = typeof tags === "string" ? tags.trim() : "";
  const pool = getPool();
  const result = await pool.query(
    "UPDATE content SET title = $1, body = $2, tags = $3, status = $4 WHERE id = $5 RETURNING id, title, body, tags, status, created_at",
    [title, body, normalizedTags, status, id]
  );
  if (!result.rows[0]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ item: result.rows[0] });
}

export async function DELETE(request, { params }) {
  const authError = requireRole(request, ["admin", "engineer"]);
  if (authError) {
    return authError;
  }
  const { id } = params;
  const pool = getPool();
  const result = await pool.query(
    "DELETE FROM content WHERE id = $1 RETURNING id",
    [id]
  );
  if (!result.rows[0]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
