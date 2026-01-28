import "./globals.css";

export const metadata = {
  title: "Bilgisayar Mühendisi Portalı",
  description: "Basit yönetim paneli olan kişisel site"
};

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body>
        <div className="container">
          <header className="site-header">
            <div className="brand">Ömer ÇANGA</div>
            <nav className="site-nav">
              <a href="/">Ana Sayfa</a>
              <a href="/cv">Özgeçmiş</a>
              <a href="/blog">Blog</a>
              <a href="/iletisim">İletişim</a>
              <a href="/admin">Admin</a>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="site-footer">
            <span>© 2026 Ömer ÇANGA</span>
            <span className="muted">
              Full Stack Developer · Ankara, Türkiye
            </span>
          </footer>
        </div>
      </body>
    </html>
  );
}
