export default function NotFoundPage() {
  return (
    <div className="grid" style={{ gap: "24px" }}>
      <div className="card">
        <h1>Sayfa bulunamadı</h1>
        <p className="muted">
          Aradığınız sayfa taşınmış veya silinmiş olabilir.
        </p>
        <a href="/" className="primary-link">
          Ana sayfaya dön
        </a>
      </div>
    </div>
  );
}
