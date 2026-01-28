import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { requireRole } from "@/lib/auth";

export async function PUT(request, { params }) {
  const authError = requireRole(request, ["admin"]);
  if (authError) {
    return authError;
  }
  const { id } = params;
  const payload = await request.json();
  const { username, name, email, role, password } = payload;
  if (!username || !name || !email) {
    return NextResponse.json(
      { error: "Kullanıcı adı, ad ve e-posta zorunludur." },
      { status: 400 }
    );
  }
  if (role && !["admin", "engineer", "viewer"].includes(role)) {
    return NextResponse.json({ error: "Geçersiz rol." }, { status: 400 });
  }
  const pool = getPool();
  const result = password
    ? await pool.query(
        "UPDATE users SET username = $1, name = $2, email = $3, role = $4, password_hash = crypt($5, gen_salt('bf')) WHERE id = $6 RETURNING id, username, name, email, role, created_at",
        [username, name, email, role, password, id]
      )
    : await pool.query(
        "UPDATE users SET username = $1, name = $2, email = $3, role = $4 WHERE id = $5 RETURNING id, username, name, email, role, created_at",
        [username, name, email, role, id]
      );
  if (!result.rows[0]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ item: result.rows[0] });
}

export async function DELETE(request, { params }) {
  const authError = requireRole(request, ["admin"]);
  if (authError) {
    return authError;
  }
  const { id } = params;
  const pool = getPool();
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING id",
    [id]
  );
  if (!result.rows[0]) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
