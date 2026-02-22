import db from "../database.js";

interface ServiceRow {
  id: number;
  title: string;
  description: string;
  image: string;
  sort_order: number;
  created_at: string;
}

interface CategoryRow {
  id: number;
  service_id: number;
  name: string;
  description: string;
  image: string;
  sort_order: number;
}

export interface ServiceWithCategories extends ServiceRow {
  categories: CategoryRow[];
}

function attachCategories(service: ServiceRow): ServiceWithCategories {
  const categories = db
    .prepare("SELECT * FROM service_categories WHERE service_id = ? ORDER BY sort_order, id")
    .all(service.id) as CategoryRow[];
  return { ...service, categories };
}

export function findAll(): ServiceWithCategories[] {
  const rows = db.prepare("SELECT * FROM services ORDER BY sort_order, id").all() as ServiceRow[];
  return rows.map(attachCategories);
}

export function findById(id: number): ServiceWithCategories | undefined {
  const row = db.prepare("SELECT * FROM services WHERE id = ?").get(id) as ServiceRow | undefined;
  return row ? attachCategories(row) : undefined;
}

export function create(data: {
  title: string;
  description: string;
  image?: string;
  categories?: { name: string; description: string; image?: string }[];
}): ServiceWithCategories {
  const maxOrder = (db.prepare("SELECT COALESCE(MAX(sort_order), 0) as m FROM services").get() as any).m;

  const run = db.transaction(() => {
    const result = db
      .prepare("INSERT INTO services (title, description, image, sort_order) VALUES (?, ?, ?, ?)")
      .run(data.title, data.description, data.image || "", maxOrder + 1);
    const serviceId = Number(result.lastInsertRowid);

    if (data.categories?.length) {
      const stmt = db.prepare(
        "INSERT INTO service_categories (service_id, name, description, image, sort_order) VALUES (?, ?, ?, ?, ?)"
      );
      data.categories.forEach((c, i) => stmt.run(serviceId, c.name, c.description, c.image || "", i + 1));
    }

    return serviceId;
  });

  return findById(run())!;
}

export function update(
  id: number,
  data: {
    title?: string;
    description?: string;
    image?: string;
    categories?: { name: string; description: string; image?: string }[];
  }
): ServiceWithCategories | undefined {
  if (!findById(id)) return undefined;

  const run = db.transaction(() => {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.title !== undefined) { fields.push("title = ?"); values.push(data.title); }
    if (data.description !== undefined) { fields.push("description = ?"); values.push(data.description); }
    if (data.image !== undefined) { fields.push("image = ?"); values.push(data.image); }

    if (fields.length > 0) {
      values.push(id);
      db.prepare(`UPDATE services SET ${fields.join(", ")} WHERE id = ?`).run(...values);
    }

    if (data.categories !== undefined) {
      db.prepare("DELETE FROM service_categories WHERE service_id = ?").run(id);
      const stmt = db.prepare(
        "INSERT INTO service_categories (service_id, name, description, image, sort_order) VALUES (?, ?, ?, ?, ?)"
      );
      data.categories.forEach((c, i) => stmt.run(id, c.name, c.description, c.image || "", i + 1));
    }
  });

  run();
  return findById(id);
}

export function remove(id: number): boolean {
  return db.prepare("DELETE FROM services WHERE id = ?").run(id).changes > 0;
}
