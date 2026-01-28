import AdminClient from "./AdminClient";

export default function AdminPage() {
  return (
    <div className="grid" style={{ gap: "24px" }}>
      <header className="card">
        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px" }}>
          <div>
            <h1>Yönetim Paneli</h1>
            <p className="muted">İçerik, kullanıcı, istatistik ve ayarlar.</p>
            <p className="muted">
              İçerik eklemek ve blogda göstermek için içerik durumunu "Yayınlandı"
              yapın.
            </p>
          </div>
          <a href="/api/auth/logout">Çıkış</a>
        </div>
      </header>
      <AdminClient />
    </div>
  );
}
