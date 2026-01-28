export default function CvPage() {
  return (
    <div className="grid" style={{ gap: "24px" }}>
      <header className="card">
        <h1>Özgeçmiş</h1>
        <p className="muted">Ömer ÇANGA · Full Stack Developer</p>
        <div className="chips">
          <span className="chip">Spring Framework</span>
          <span className="chip">Angular</span>
          <span className="chip">Full-Stack Development</span>
        </div>
      </header>

      <section className="card">
        <h2>Deneyim</h2>
        <div className="timeline">
          <div className="timeline-item">
            <strong>TÜBİTAK BİLGEM YTE</strong> · Full Stack Developer
            <div className="muted">Mart 2024 - Günümüz · Ankara</div>
            <div>Türk Telekom (Gantek) VM ve Bulut Servis projeleri.</div>
          </div>
          <div className="timeline-item">
            <strong>TÜBİTAK</strong> · Software Engineer
            <div className="muted">Ocak 2022 - Ekim 2023 · Ankara</div>
          </div>
          <div className="timeline-item">
            <strong>Milli Savunma</strong> · IT Specialist
            <div className="muted">Temmuz 2021 - Aralık 2021 · Ankara</div>
          </div>
          <div className="timeline-item">
            <strong>Social Security Institution</strong> · Programmer
            <div className="muted">Ekim 2017 - Haziran 2021 · Ankara</div>
          </div>
          <div className="timeline-item">
            <strong>Turkish Employment Agency (İŞKUR)</strong> · Sistem Sorumlusu
            <div className="muted">Temmuz 2012 - Ekim 2017 · Ankara</div>
          </div>
          <div className="timeline-item">
            <strong>AMAÇ YAZILIM</strong> · Yazılım Stajı (C# ASP.NET)
            <div className="muted">Ağustos 2011 · 1 ay</div>
          </div>
          <div className="timeline-item">
            <strong>MATESA TEXTILES</strong> · Bilgi İşlem
            <div className="muted">Ocak 2007 - Mart 2007 · Kahramanmaraş</div>
          </div>
        </div>
      </section>

      <section className="card">
        <h2>Eğitim</h2>
        <ul>
          <li>Erciyes University - MS, Civil Aviation (2022-2024)</li>
          <li>Erciyes Üniversitesi - Bilgisayar Mühendisliği (2010-2015)</li>
          <li>İzmir Yüksek Teknoloji Enstitüsü - Lisans Hazırlık (2008-2009)</li>
          <li>Anadolu Üniversitesi - İşletme (2012-2015)</li>
          <li>Çukurova Üniversitesi - Bilgisayar Programcılığı (2006-2008)</li>
        </ul>
      </section>

      <section className="card">
        <h2>Sertifikalar</h2>
        <ul>
          <li>Java Tutorial course</li>
          <li>Python 3 Certificate of Completion</li>
          <li>SQL Fundamentals</li>
          <li>MCPS: Microsoft Certified Professional</li>
          <li>C++ Certificate of Completion</li>
        </ul>
      </section>
    </div>
  );
}
