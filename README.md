# bmad-project

Basit bir bilgisayar mühendisi web sitesi ve yönetim paneli.

## Kurulum
1. `.env.example` dosyasını `.env` olarak kopyalayın ve değerleri düzenleyin.
2. Docker ile başlatın:

```
docker compose up --build
```

## Erişim
- Site: http://localhost:3000
- Admin: http://localhost:3000/admin (login sayfasına yönlendirir)

## Admin giriş bilgisi
- Varsayılan kullanıcı: `admin`
- Varsayılan şifre: `admin123`
- Alternatif kullanıcı: `engineer` / `engineer123`

Not: Bu kullanıcılar `db/init.sql` ile ilk kurulumda oluşturulur. Daha önce
kurulum yaptıysanız veritabanını sıfırlamak için docker volume’u silmeniz
gerekebilir.
