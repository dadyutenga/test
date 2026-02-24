import db from "../database.js";

export interface TestimonialRow {
  id: number;
  name: string;
  role: string;
  text: string;
  image: string;
  sort_order: number;
  created_at: string;
}

export function findAll(): TestimonialRow[] {
  return db.prepare("SELECT * FROM testimonials ORDER BY sort_order, id").all() as TestimonialRow[];
}

export function findById(id: number): TestimonialRow | undefined {
  return db.prepare("SELECT * FROM testimonials WHERE id = ?").get(id) as TestimonialRow | undefined;
}

export function create(data: {
  name: string;
  role: string;
  text: string;
  image?: string;
}): TestimonialRow {
  const maxOrder = (db.prepare("SELECT COALESCE(MAX(sort_order), 0) as m FROM testimonials").get() as any).m;
  const result = db
    .prepare("INSERT INTO testimonials (name, role, text, image, sort_order) VALUES (?, ?, ?, ?, ?)")
    .run(data.name, data.role, data.text, data.image || "", maxOrder + 1);
  return findById(Number(result.lastInsertRowid))!;
}

export function update(
  id: number,
  data: { name?: string; role?: string; text?: string; image?: string }
): TestimonialRow | undefined {
  if (!findById(id)) return undefined;

  const fields: string[] = [];
  const values: any[] = [];

  if (data.name !== undefined) { fields.push("name = ?"); values.push(data.name); }
  if (data.role !== undefined) { fields.push("role = ?"); values.push(data.role); }
  if (data.text !== undefined) { fields.push("text = ?"); values.push(data.text); }
  if (data.image !== undefined) { fields.push("image = ?"); values.push(data.image); }

  if (fields.length > 0) {
    values.push(id);
    db.prepare(`UPDATE testimonials SET ${fields.join(", ")} WHERE id = ?`).run(...values);
  }

  return findById(id);
}

export function remove(id: number): boolean {
  return db.prepare("DELETE FROM testimonials WHERE id = ?").run(id).changes > 0;
}
