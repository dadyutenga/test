import db from "../database.js";

interface UserRow {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
}

export function findByUsername(username: string): UserRow | undefined {
  return db.prepare("SELECT * FROM users WHERE username = ?").get(username) as UserRow | undefined;
}

export function createUser(username: string, passwordHash: string): void {
  db.prepare("INSERT OR IGNORE INTO users (username, password_hash) VALUES (?, ?)").run(username, passwordHash);
}

export function hasUsers(): boolean {
  return (db.prepare("SELECT COUNT(*) as count FROM users").get() as { count: number }).count > 0;
}
