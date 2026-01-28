"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        let message = "Giriş bilgileri hatalı.";
        try {
          const payload = await response.json();
          if (payload?.error) {
            message = payload.error;
          }
        } catch (err) {
          message = "Giriş başarısız.";
        }
        setError(message);
        return;
      }
      router.push("/admin");
    } catch (err) {
      setError("Bağlantı hatası oluştu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid" style={{ gap: "24px" }}>
      <header className="card">
        <h1>Admin Girişi</h1>
        <p className="muted">Yönetim paneline erişmek için giriş yapın.</p>
      </header>

      <section className="card">
        <form onSubmit={handleSubmit} className="grid" style={{ gap: "12px" }}>
          <div>
            <label>Kullanıcı adı veya e-posta</label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </div>
          <div>
            <label>Şifre</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
          {error ? <div className="muted">{error}</div> : null}
          <button type="submit" disabled={loading}>
            {loading ? "Giriş yapılıyor..." : "Giriş yap"}
          </button>
        </form>
      </section>
    </div>
  );
}
