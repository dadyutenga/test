import db from "../database.js";

interface ContactInfoRow {
  id: number;
  phone: string;
  email: string;
  whatsapp: string;
  address: string;
  updated_at: string;
}

interface MessageRow {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: number;
  created_at: string;
}

export function getContactInfo(): ContactInfoRow {
  let info = db.prepare("SELECT * FROM contact_info WHERE id = 1").get() as ContactInfoRow | undefined;
  if (!info) {
    db.prepare("INSERT INTO contact_info (id, phone, email, whatsapp, address) VALUES (1, '', '', '', '')").run();
    info = db.prepare("SELECT * FROM contact_info WHERE id = 1").get() as ContactInfoRow;
  }
  return info;
}

export function updateContactInfo(data: {
  phone?: string;
  email?: string;
  whatsapp?: string;
  address?: string;
}): ContactInfoRow {
  const fields: string[] = [];
  const values: any[] = [];

  if (data.phone !== undefined) { fields.push("phone = ?"); values.push(data.phone); }
  if (data.email !== undefined) { fields.push("email = ?"); values.push(data.email); }
  if (data.whatsapp !== undefined) { fields.push("whatsapp = ?"); values.push(data.whatsapp); }
  if (data.address !== undefined) { fields.push("address = ?"); values.push(data.address); }

  if (fields.length > 0) {
    fields.push("updated_at = datetime('now')");
    db.prepare(`UPDATE contact_info SET ${fields.join(", ")} WHERE id = 1`).run(...values);
  }

  return getContactInfo();
}

export function getAllMessages(): MessageRow[] {
  return db.prepare("SELECT * FROM contact_messages ORDER BY created_at DESC").all() as MessageRow[];
}

export function getMessageById(id: number): MessageRow | undefined {
  return db.prepare("SELECT * FROM contact_messages WHERE id = ?").get(id) as MessageRow | undefined;
}

export function createMessage(data: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}): MessageRow {
  const result = db
    .prepare("INSERT INTO contact_messages (name, email, subject, message) VALUES (?, ?, ?, ?)")
    .run(data.name, data.email, data.subject || "", data.message);
  return db.prepare("SELECT * FROM contact_messages WHERE id = ?").get(Number(result.lastInsertRowid)) as MessageRow;
}

export function markAsRead(id: number): boolean {
  return db.prepare("UPDATE contact_messages SET is_read = 1 WHERE id = ?").run(id).changes > 0;
}

export function deleteMessage(id: number): boolean {
  return db.prepare("DELETE FROM contact_messages WHERE id = ?").run(id).changes > 0;
}
