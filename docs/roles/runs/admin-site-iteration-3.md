# Task: DB-based multi-user login and missing essentials

## Owner
- Vision: Çok kullanıcılı giriş ve temel site iskeleti tamam.
- Scope: DB login, kullanıcı yönetimi şifre alanı, temel navigasyon/404.
- Constraints: Mevcut Next.js + Postgres mimarisi korunur.
- Success metrics: Admin giriş DB üzerinden çalışır, kullanıcılar yönetilir.

## Analyst
- User stories: Admin kullanıcı oluşturur, giriş yapar, rolüne göre erişir.
- Risks: Eski veritabanı schema uyumsuzluğu, init.sql tekrar çalışmaması.
- Open questions: Şifre sıfırlama ve mail doğrulama gerekecek mi?

## Architect
- Design: Postgres pgcrypto ile password_hash; login crypt karşılaştırma.
- Boundaries: Auth API ve Users API güncellendi; UI formları genişletildi.
- Trade-offs: Basit schema, ayrı migration aracı yok.

## Developer
- Implemented: users tablosuna username + password_hash, pgcrypto extension.
- Implemented: login DB doğrulama, kullanıcı ekleme/güncelleme şifre desteği.
- Implemented: Header/footer ve 404 sayfası.

## Reviewer
- Checks: Login DB query + crypt doğrulaması.
- Checks: Kullanıcı ekleme zorunlu alanlar ve rol validasyonu.

## Tester
- Steps: admin/admin123 ile giriş, kullanıcı oluşturma, yeni kullanıcı ile giriş.
- Steps: Eski volume varsa silip init.sql ile yeniden kurulum.

## Documenter
- README güncellendi, varsayılan login bilgileri eklendi.
