import Database from "better-sqlite3";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "data");
const DB_PATH = path.join(DATA_DIR, "cms.db");

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const db = new Database(DB_PATH);

db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    image TEXT DEFAULT '',
    featured INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS project_steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    project_id INTEGER NOT NULL,
    step_title TEXT NOT NULL,
    description TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS service_categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    service_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT DEFAULT '',
    sort_order INTEGER DEFAULT 0,
    FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS contact_info (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    phone TEXT DEFAULT '',
    email TEXT DEFAULT '',
    whatsapp TEXT DEFAULT '',
    address TEXT DEFAULT '',
    updated_at TEXT DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT DEFAULT '',
    message TEXT NOT NULL,
    is_read INTEGER DEFAULT 0,
    created_at TEXT DEFAULT (datetime('now'))
  );
`);

export default db;
