export default function ContactPage() {
  return (
    <div className="grid" style={{ gap: "24px" }}>
      <header className="card">
        <h1>İletişim</h1>
        <p className="muted">İletişim ve iş birliği için.</p>
      </header>
      <section className="card">
        <h2>İletişim Bilgileri</h2>
        <ul>
          <li>E-posta: omercanga@hotmail.com</li>
          <li>LinkedIn: linkedin.com/in/omercanga</li>
        </ul>
      </section>
      <section className="card">
        <h2>Kişisel Linkler</h2>
        <ul>
          <li>Blogspot: omercanga.blogspot.com</li>
          <li>Umut Diyarı: umutdiyari.wordpress.com</li>
          <li>WordPress: omercanga.wordpress.com</li>
        </ul>
      </section>
      <section className="card">
        <h2>Not</h2>
        <p>
          Kurumsal projeler, danışmanlık ve teknoloji iş birlikleri için
          iletişime geçebilirsiniz.
        </p>
      </section>
    </div>
  );
}
