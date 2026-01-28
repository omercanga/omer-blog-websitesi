import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";

export async function POST(request) {
  const body = await request.json();
  const { username, password } = body;

  if (!username || !password) {
    return NextResponse.json(
      { error: "Kullanıcı adı ve şifre zorunludur." },
      { status: 400 }
    );
  }

  try {
    const pool = getPool();
    const result = await pool.query(
      "SELECT id, role FROM users WHERE (username = $1 OR email = $1) AND password_hash = crypt($2, password_hash)",
      [username, password]
    );

    if (!result.rows[0]) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = NextResponse.json({ ok: true });
    response.cookies.set("admin_session", "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/"
    });
    response.cookies.set("admin_role", result.rows[0].role, {
      httpOnly: true,
      sameSite: "lax",
      path: "/"
    });
    return response;
  } catch (err) {
    return NextResponse.json(
      { error: "Veritabanı bağlantısı başarısız." },
      { status: 500 }
    );
  }
}
