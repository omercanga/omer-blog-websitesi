CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  role TEXT NOT NULL DEFAULT 'engineer',
  password_hash TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS content (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  tags TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'draft',
  created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

INSERT INTO users (username, name, email, role, password_hash)
VALUES
  ('admin', 'Admin User', 'admin@example.com', 'admin', crypt('admin123', gen_salt('bf'))),
  ('engineer', 'Sample Engineer', 'engineer@example.com', 'engineer', crypt('engineer123', gen_salt('bf')))
ON CONFLICT DO NOTHING;

INSERT INTO content (title, body, tags, status)
VALUES
  ('Example Project', 'Basic project description.', 'devops,cloud', 'published'),
  ('Research Note', 'Initial research notes.', 'research,notes', 'draft')
ON CONFLICT DO NOTHING;

INSERT INTO settings (key, value)
VALUES
  ('site_title', 'Bilgisayar Mühendisliği Portalı'),
  ('site_tagline', 'Basit yönetim paneli ile kişisel site')
ON CONFLICT DO NOTHING;
