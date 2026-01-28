import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { requireRole } from "@/lib/auth";

export async function GET() {
  const pool = getPool();
  const result = await pool.query(
    "SELECT id, username, name, email, role, created_at FROM users ORDER BY created_at DESC"
  );
  return NextResponse.json({ items: result.rows });
}

export async function POST(request) {
  const authError = requireRole(request, ["admin"]);
  if (authError) {
    return authError;
  }
  const pool = getPool();
  const body = await request.json();
  const { username, name, email, role, password } = body;
  if (!username || !name || !email || !password) {
    return NextResponse.json(
      { error: "Kullanıcı adı, ad, e-posta ve şifre zorunludur." },
      { status: 400 }
    );
  }
  if (role && !["admin", "engineer", "viewer"].includes(role)) {
    return NextResponse.json({ error: "Geçersiz rol." }, { status: 400 });
  }
  const result = await pool.query(
    "INSERT INTO users (username, name, email, role, password_hash) VALUES ($1, $2, $3, $4, crypt($5, gen_salt('bf'))) RETURNING id, username, name, email, role, created_at",
    [username, name, email, role || "engineer", password]
  );
  return NextResponse.json({ item: result.rows[0] }, { status: 201 });
}
