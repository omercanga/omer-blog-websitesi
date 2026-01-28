import { NextResponse } from "next/server";
import { getPool } from "@/lib/db";
import { requireRole } from "@/lib/auth";

export async function GET() {
  const pool = getPool();
  const result = await pool.query("SELECT key, value FROM settings");
  const items = result.rows.reduce((acc, row) => {
    acc[row.key] = row.value;
    return acc;
  }, {});
  return NextResponse.json({ items });
}

export async function PUT(request) {
  const authError = requireRole(request, ["admin"]);
  if (authError) {
    return authError;
  }
  const pool = getPool();
  const body = await request.json();
  const allowedKeys = ["site_title", "site_tagline"];
  const entries = Object.entries(body).filter(([key]) =>
    allowedKeys.includes(key)
  );
  if (entries.length === 0) {
    return NextResponse.json({ error: "Geçersiz ayar alanı." }, { status: 400 });
  }

  for (const [key, value] of entries) {
    if (!value) {
      return NextResponse.json(
        { error: "Ayar değeri boş olamaz." },
        { status: 400 }
      );
    }
    await pool.query(
      "INSERT INTO settings (key, value) VALUES ($1, $2) ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value",
      [key, value]
    );
  }

  return NextResponse.json({ ok: true });
}
