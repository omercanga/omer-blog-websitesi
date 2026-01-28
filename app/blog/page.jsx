import { getPool } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const pool = getPool();
  const result = await pool.query(
    "SELECT id, title, body, tags, status, created_at FROM content WHERE status = 'published' ORDER BY created_at DESC"
  );
  const formatDate = (value) =>
    new Date(value).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });

  return (
    <div className="grid" style={{ gap: "24px" }}>
      <header className="card">
        <h1>Blog</h1>
        <p className="muted">Yayınlanan notlar ve proje güncellemeleri.</p>
      </header>
      <section className="grid">
        {result.rows.length === 0 ? (
          <div className="card">
            Henüz yayınlanan içerik yok. İçerik eklemek için yönetim panelini
            kullanabilirsiniz.
            <div style={{ marginTop: "12px" }}>
              <a href="/admin">Yönetim Paneline Git</a>
            </div>
          </div>
        ) : (
          result.rows.map((item) => (
            <article key={item.id} className="card">
              <h2>{item.title}</h2>
              <p className="muted">{formatDate(item.created_at)}</p>
              <p>{item.body}</p>
              {item.tags ? <p className="muted">Etiketler: {item.tags}</p> : null}
            </article>
          ))
        )}
      </section>
    </div>
  );
}
