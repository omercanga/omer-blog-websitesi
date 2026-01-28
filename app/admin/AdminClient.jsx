"use client";

import { useEffect, useState } from "react";

async function fetchJson(path, options) {
  const response = await fetch(path, options);
  if (!response.ok) {
    let message = "İstek başarısız.";
    try {
      const payload = await response.json();
      if (payload?.error) {
        message = payload.error;
      }
    } catch (err) {
      message = "Sunucu hatası oluştu.";
    }
    throw new Error(message);
  }
  return response.json();
}

export default function AdminClient() {
  const [stats, setStats] = useState(null);
  const [content, setContent] = useState([]);
  const [users, setUsers] = useState([]);
  const [settings, setSettings] = useState({});
  const [role, setRole] = useState("viewer");
  const [form, setForm] = useState({
    title: "",
    body: "",
    tags: "",
    status: "draft"
  });
  const [editingContentId, setEditingContentId] = useState(null);
  const [contentQuery, setContentQuery] = useState("");
  const [contentStatus, setContentStatus] = useState("all");
  const [userForm, setUserForm] = useState({
    username: "",
    name: "",
    email: "",
    role: "engineer",
    password: ""
  });
  const [editingUserId, setEditingUserId] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    setError("");
    const [statsData, contentData, usersData, settingsData, authData] =
      await Promise.all([
        fetchJson("/api/stats"),
        fetchJson("/api/content"),
        fetchJson("/api/users"),
        fetchJson("/api/settings"),
        fetchJson("/api/auth/me")
      ]);
    setStats(statsData);
    setContent(contentData.items);
    setUsers(usersData.items);
    setSettings(settingsData.items);
    setRole(authData.role || "viewer");
    setLoading(false);
  };

  useEffect(() => {
    loadAll().catch((err) => {
      setError(err.message || "Veriler yüklenemedi.");
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);
    const method = editingContentId ? "PUT" : "POST";
    const path = editingContentId
      ? `/api/content/${editingContentId}`
      : "/api/content";
    try {
      await fetchJson(path, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });
      setForm({ title: "", body: "", tags: "", status: "draft" });
      setEditingContentId(null);
      await loadAll();
      setMessage(editingContentId ? "İçerik güncellendi." : "İçerik eklendi.");
    } catch (err) {
      setError(err.message || "İçerik kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  };

  const startEditContent = (item) => {
    setForm({
      title: item.title,
      body: item.body,
      tags: item.tags || "",
      status: item.status
    });
    setEditingContentId(item.id);
  };

  const deleteContent = async (id) => {
    if (!window.confirm("İçeriği silmek istiyor musunuz?")) {
      return;
    }
    setSaving(true);
    setError("");
    try {
      await fetchJson(`/api/content/${id}`, { method: "DELETE" });
      await loadAll();
      setMessage("İçerik silindi.");
    } catch (err) {
      setError(err.message || "İçerik silinemedi.");
    } finally {
      setSaving(false);
    }
  };

  const handleUserSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setSaving(true);
    const method = editingUserId ? "PUT" : "POST";
    const path = editingUserId ? `/api/users/${editingUserId}` : "/api/users";
    try {
      await fetchJson(path, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userForm)
      });
      setUserForm({
        username: "",
        name: "",
        email: "",
        role: "engineer",
        password: ""
      });
      setEditingUserId(null);
      await loadAll();
      setMessage(editingUserId ? "Kullanıcı güncellendi." : "Kullanıcı eklendi.");
    } catch (err) {
      setError(err.message || "Kullanıcı kaydedilemedi.");
    } finally {
      setSaving(false);
    }
  };

  const startEditUser = (item) => {
    setUserForm({
      username: item.username || "",
      name: item.name,
      email: item.email,
      role: item.role,
      password: ""
    });
    setEditingUserId(item.id);
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Kullanıcıyı silmek istiyor musunuz?")) {
      return;
    }
    setSaving(true);
    setError("");
    try {
      await fetchJson(`/api/users/${id}`, { method: "DELETE" });
      await loadAll();
      setMessage("Kullanıcı silindi.");
    } catch (err) {
      setError(err.message || "Kullanıcı silinemedi.");
    } finally {
      setSaving(false);
    }
  };

  const handleSettings = async (event) => {
    event.preventDefault();
    setError("");
    setSaving(true);
    const payload = {
      site_title: settings.site_title || "",
      site_tagline: settings.site_tagline || ""
    };
    try {
      await fetchJson("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      await loadAll();
      setMessage("Ayarlar güncellendi.");
    } catch (err) {
      setError(err.message || "Ayarlar güncellenemedi.");
    } finally {
      setSaving(false);
    }
  };

  const canEditContent = role === "admin" || role === "engineer";
  const canManageUsers = role === "admin";
  const canManageSettings = role === "admin";

  return (
    <div className="grid" style={{ gap: "16px" }}>
      {message ? <div className="card">{message}</div> : null}
      {error ? <div className="card">{error}</div> : null}
      <div className="card">
        <strong>Aktif rol:</strong> {role}
        <div className="muted" style={{ marginTop: "6px" }}>
          Rolü değiştirmek için `.env` içindeki `ADMIN_ROLE` değerini güncelleyin.
        </div>
      </div>

      <section className="grid grid-3">
        <div className="card">
          <h3>İçerik</h3>
          <p className="muted">{stats ? stats.content : "-"}</p>
        </div>
        <div className="card">
          <h3>Kullanıcı</h3>
          <p className="muted">{stats ? stats.users : "-"}</p>
        </div>
        <div className="card">
          <h3>Taslak</h3>
          <p className="muted">{stats ? stats.drafts : "-"}</p>
        </div>
      </section>

      <section className="card">
        <h3>{editingContentId ? "İçerik düzenle" : "Yeni içerik"}</h3>
        {!canEditContent ? (
          <p className="muted">Bu rol içerik düzenleyemez.</p>
        ) : (
          <form onSubmit={handleSubmit} className="grid" style={{ gap: "12px" }}>
            <div>
              <label>Başlık</label>
              <input
                value={form.title}
                onChange={(event) =>
                  setForm({ ...form, title: event.target.value })
                }
                required
              />
            </div>
            <div>
              <label>İçerik</label>
              <textarea
                rows={4}
                value={form.body}
                onChange={(event) =>
                  setForm({ ...form, body: event.target.value })
                }
                required
              />
            </div>
            <div>
              <label>Etiketler (virgülle)</label>
              <input
                value={form.tags}
                onChange={(event) =>
                  setForm({ ...form, tags: event.target.value })
                }
                placeholder="ör: cloud, devops, java"
              />
            </div>
            <div>
              <label>Durum</label>
              <select
                value={form.status}
                onChange={(event) =>
                  setForm({ ...form, status: event.target.value })
                }
              >
                <option value="draft">Taslak</option>
                <option value="published">Yayınlandı</option>
              </select>
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button type="submit" disabled={saving || loading}>
                {editingContentId ? "Güncelle" : "Kaydet"}
              </button>
              {editingContentId ? (
                <button
                  type="button"
                  disabled={saving || loading}
                  onClick={() => {
                    setForm({ title: "", body: "", tags: "", status: "draft" });
                    setEditingContentId(null);
                  }}
                >
                  İptal
                </button>
              ) : null}
            </div>
          </form>
        )}
      </section>

      <section className="grid grid-2">
        <div className="card">
          <h3>İçerikler</h3>
          <div className="grid" style={{ gap: "8px", marginBottom: "12px" }}>
            <input
              placeholder="Başlığa göre ara..."
              value={contentQuery}
              onChange={(event) => setContentQuery(event.target.value)}
            />
            <select
              value={contentStatus}
              onChange={(event) => setContentStatus(event.target.value)}
            >
              <option value="all">Tümü</option>
              <option value="published">Yayınlandı</option>
              <option value="draft">Taslak</option>
            </select>
          </div>
          {loading ? <p className="muted">Yükleniyor...</p> : null}
          {!loading &&
          content.filter((item) => {
            const matchTitle = item.title
              .toLowerCase()
              .includes(contentQuery.toLowerCase());
            const matchStatus =
              contentStatus === "all" || item.status === contentStatus;
            return matchTitle && matchStatus;
          }).length === 0 ? (
            <p className="muted">Aradığınız kritere uygun içerik yok.</p>
          ) : null}
          <ul>
            {content
              .filter((item) => {
                const matchTitle = item.title
                  .toLowerCase()
                  .includes(contentQuery.toLowerCase());
                const matchStatus =
                  contentStatus === "all" || item.status === contentStatus;
                return matchTitle && matchStatus;
              })
              .map((item) => (
              <li key={item.id}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px"
                  }}
                >
                  <span>
                    {item.title} <span className="badge">{item.status}</span>
                  </span>
                  <span style={{ display: "flex", gap: "8px" }}>
                    {canEditContent ? (
                      <>
                        <button
                          type="button"
                          disabled={saving || loading}
                          onClick={() => startEditContent(item)}
                        >
                          Düzenle
                        </button>
                        <button
                          type="button"
                          disabled={saving || loading}
                          onClick={() => deleteContent(item.id)}
                        >
                          Sil
                        </button>
                      </>
                    ) : null}
                  </span>
                </div>
                {item.tags ? (
                  <div className="muted">Etiketler: {item.tags}</div>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
        <div className="card">
          <h3>Kullanıcılar</h3>
          {loading ? <p className="muted">Yükleniyor...</p> : null}
          {!loading && users.length === 0 ? (
            <p className="muted">Henüz kullanıcı yok.</p>
          ) : null}
          <ul>
            {users.map((item) => (
              <li key={item.id}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "12px"
                  }}
                >
                  <span>
                    {item.name} ({item.username || "—"}){" "}
                    <span className="badge">{item.role}</span>
                  </span>
                  <span style={{ display: "flex", gap: "8px" }}>
                    {canManageUsers ? (
                      <>
                        <button
                          type="button"
                          disabled={saving || loading}
                          onClick={() => startEditUser(item)}
                        >
                          Düzenle
                        </button>
                        <button
                          type="button"
                          disabled={saving || loading}
                          onClick={() => deleteUser(item.id)}
                        >
                          Sil
                        </button>
                      </>
                    ) : null}
                  </span>
                </div>
              </li>
            ))}
          </ul>
          {!canManageUsers ? (
            <p className="muted">Bu rol kullanıcı yönetemez.</p>
          ) : null}
        </div>
      </section>

      <section className="card">
        <h3>{editingUserId ? "Kullanıcı düzenle" : "Yeni kullanıcı"}</h3>
        {!canManageUsers ? (
          <p className="muted">Bu rol kullanıcı ekleyemez.</p>
        ) : (
          <form
            onSubmit={handleUserSubmit}
            className="grid"
            style={{ gap: "12px" }}
          >
            <div>
              <label>Kullanıcı adı</label>
              <input
                value={userForm.username}
                onChange={(event) =>
                  setUserForm({ ...userForm, username: event.target.value })
                }
                required
              />
            </div>
            <div>
              <label>Ad soyad</label>
              <input
                value={userForm.name}
                onChange={(event) =>
                  setUserForm({ ...userForm, name: event.target.value })
                }
                required
              />
            </div>
            <div>
              <label>E-posta</label>
              <input
                type="email"
                value={userForm.email}
                onChange={(event) =>
                  setUserForm({ ...userForm, email: event.target.value })
                }
                required
              />
            </div>
            <div>
              <label>Rol</label>
              <select
                value={userForm.role}
                onChange={(event) =>
                  setUserForm({ ...userForm, role: event.target.value })
                }
              >
                <option value="engineer">Engineer</option>
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
            <div>
              <label>Şifre {editingUserId ? "(opsiyonel)" : ""}</label>
              <input
                type="password"
                value={userForm.password}
                onChange={(event) =>
                  setUserForm({ ...userForm, password: event.target.value })
                }
                required={!editingUserId}
              />
            </div>
            <div style={{ display: "flex", gap: "8px" }}>
              <button type="submit" disabled={saving || loading}>
                {editingUserId ? "Güncelle" : "Kaydet"}
              </button>
              {editingUserId ? (
                <button
                  type="button"
                  disabled={saving || loading}
                  onClick={() => {
                    setUserForm({
                      username: "",
                      name: "",
                      email: "",
                      role: "engineer",
                      password: ""
                    });
                    setEditingUserId(null);
                  }}
                >
                  İptal
                </button>
              ) : null}
            </div>
          </form>
        )}
      </section>

      <section className="card">
        <h3>Ayarlar</h3>
        {!canManageSettings ? (
          <div>
            <p className="muted">Bu rol ayarları güncelleyemez.</p>
            <p>
              <strong>Site başlığı:</strong> {settings.site_title || "-"}
            </p>
            <p>
              <strong>Site açıklaması:</strong> {settings.site_tagline || "-"}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSettings} className="grid" style={{ gap: "12px" }}>
            <div>
              <label>Site başlığı</label>
              <input
                value={settings.site_title || ""}
                onChange={(event) =>
                  setSettings({ ...settings, site_title: event.target.value })
                }
              />
            </div>
            <div>
              <label>Site açıklaması</label>
              <input
                value={settings.site_tagline || ""}
                onChange={(event) =>
                  setSettings({ ...settings, site_tagline: event.target.value })
                }
              />
            </div>
            <button type="submit" disabled={saving || loading}>
              Güncelle
            </button>
          </form>
        )}
      </section>
    </div>
  );
}
