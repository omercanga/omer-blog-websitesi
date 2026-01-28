import Link from "next/link";

export default function HomePage() {
  return (
    <div className="grid" style={{ gap: "24px" }}>
      <header className="hero">
        <div className="section-title">
          <div>
            <h1>Ömer ÇANGA</h1>
            <p className="subtitle">Full Stack Developer · Ankara, Türkiye</p>
          </div>
          <span className="badge">MSc Civil Aviation (2024)</span>
        </div>
        <p className="muted">
          Full-stack geliştirme, Spring Framework ve Angular odaklı; kurum
          projelerinde sistem tasarımı, bakım ve modernizasyon deneyimi.
        </p>
        <nav className="nav">
          <Link href="/cv">Özgeçmiş</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/iletisim">İletişim</Link>
          <Link href="/admin">Yönetim Paneli</Link>
        </nav>
      </header>

      <section className="grid grid-2">
        <div className="card">
          <h2>Hakkımda</h2>
          <p>
            TÜBİTAK BİLGEM YTE’de Full Stack Developer olarak çalışıyorum.
            Kurumsal ölçekte web uygulamaları, servis geliştirme ve kullanıcı
            ihtiyaçlarına göre sistem iyileştirme üzerine yoğunlaşıyorum.
          </p>
          <div className="chips">
            <span className="chip">Full-Stack Development</span>
            <span className="chip">Spring Framework</span>
            <span className="chip">Angular</span>
          </div>
        </div>
        <div className="card">
          <h2>Öne Çıkan Roller</h2>
          <ul>
            <li>Full Stack Developer - TÜBİTAK BİLGEM YTE (2024-)</li>
            <li>Full Stack Developer - Türk Telekom / Gantek (2023-2024)</li>
            <li>Software Engineer - TÜBİTAK (2022-2023)</li>
          </ul>
          <p className="muted">Daha fazlası için CV sayfasını inceleyin.</p>
        </div>
      </section>

      <section className="card">
        <div className="section-title">
          <h2>Yetenekler ve Sertifikalar</h2>
          <span className="badge">İngilizce: Native/Bilingual</span>
        </div>
        <div className="grid grid-2">
          <div>
            <h3>Top Skills</h3>
            <div className="chips">
              <span className="chip">Full-Stack Development</span>
              <span className="chip">Spring Framework</span>
              <span className="chip">Angular</span>
              <span className="chip">SQL Fundamentals</span>
            </div>
          </div>
          <div>
            <h3>Sertifikalar</h3>
            <ul>
              <li>Java Tutorial course</li>
              <li>Python 3 Certificate of Completion</li>
              <li>SQL Fundamentals</li>
              <li>MCPS: Microsoft Certified Professional</li>
              <li>C++ Certificate of Completion</li>
            </ul>
          </div>
        </div>
      </section>

    </div>
  );
}
