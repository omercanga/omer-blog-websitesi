# Task: Admin web site with role checkpoints

## Owner
- Vision: Basit, Türkçe, yönetim panelli bilgisayar mühendisi sitesi.
- Scope: Ana sayfa + CV + Blog + İletişim + Admin panel (içerik, kullanıcı, ayar, istatistik).
- Constraints: Docker + Postgres, kolay kurulum.
- Success metrics: Admin CRUD çalışır, login olur, sayfalar erişilebilir.
- Out of scope: Gelişmiş yetkilendirme, dosya yükleme.

## Analyst
- User stories: Ziyaretçi sayfaları görür; Admin giriş yapar; İçerik ekler/günceller/siler; Kullanıcı yönetir; Ayar günceller.
- Risks: Yetkisiz erişim; veri doğrulama eksikliği; docker env eksikliği.
- Open questions: Kullanıcı rolleri için ek yetki gerekli mi?

## Architect
- Design: Next.js App Router, API routes, Postgres.
- Boundaries: UI (app/*), API (app/api/*), DB (lib/db.js).
- Dependencies: pg, Postgres container.
- Trade-offs: Demo seviyesinde oturum cookie.

## Developer
- Implemented: CRUD endpoints, admin UI, login page, middleware, pages.
- Added: Role-based access (admin/engineer/viewer) on API + UI.
- Tests: Manual smoke via Docker Compose.

## Reviewer
- Checks: Unauthorized API access blocked; login redirect works.
- Checks: Role-based permissions enforced on API endpoints.
- Notes: Cookie tabanli demo oturum, production icin guclendirilir.

## Tester
- Steps: docker compose up --build; login; content/user add/edit/delete; blog page shows published.
- Steps: verify role permissions for engineer/viewer.
- Results: Beklenen islem akisi.

## Documenter
- README login notu ve calistirma adimlari guncellendi.
