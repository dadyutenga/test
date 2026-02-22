import db from "../database.js";

interface ProjectRow {
  id: number;
  title: string;
  category: string;
  image: string;
  featured: number;
  sort_order: number;
  created_at: string;
}

interface StepRow {
  id: number;
  project_id: number;
  step_title: string;
  description: string;
  sort_order: number;
}

export interface ProjectWithSteps extends ProjectRow {
  steps: StepRow[];
}

function attachSteps(project: ProjectRow): ProjectWithSteps {
  const steps = db
    .prepare("SELECT * FROM project_steps WHERE project_id = ? ORDER BY sort_order, id")
    .all(project.id) as StepRow[];
  return { ...project, steps };
}

export function findAll(): ProjectWithSteps[] {
  const rows = db.prepare("SELECT * FROM projects ORDER BY sort_order, id").all() as ProjectRow[];
  return rows.map(attachSteps);
}

export function findById(id: number): ProjectWithSteps | undefined {
  const row = db.prepare("SELECT * FROM projects WHERE id = ?").get(id) as ProjectRow | undefined;
  return row ? attachSteps(row) : undefined;
}

export function create(data: {
  title: string;
  category: string;
  image?: string;
  featured?: number;
  steps?: { step_title: string; description: string }[];
}): ProjectWithSteps {
  const maxOrder = (db.prepare("SELECT COALESCE(MAX(sort_order), 0) as m FROM projects").get() as any).m;

  const run = db.transaction(() => {
    const result = db
      .prepare("INSERT INTO projects (title, category, image, featured, sort_order) VALUES (?, ?, ?, ?, ?)")
      .run(data.title, data.category, data.image || "", data.featured || 0, maxOrder + 1);
    const projectId = Number(result.lastInsertRowid);

    if (data.steps?.length) {
      const stmt = db.prepare(
        "INSERT INTO project_steps (project_id, step_title, description, sort_order) VALUES (?, ?, ?, ?)"
      );
      data.steps.forEach((s, i) => stmt.run(projectId, s.step_title, s.description, i + 1));
    }

    return projectId;
  });

  return findById(run())!;
}

export function update(
  id: number,
  data: {
    title?: string;
    category?: string;
    image?: string;
    featured?: number;
    steps?: { step_title: string; description: string }[];
  }
): ProjectWithSteps | undefined {
  if (!findById(id)) return undefined;

  const run = db.transaction(() => {
    const fields: string[] = [];
    const values: any[] = [];

    if (data.title !== undefined) { fields.push("title = ?"); values.push(data.title); }
    if (data.category !== undefined) { fields.push("category = ?"); values.push(data.category); }
    if (data.image !== undefined) { fields.push("image = ?"); values.push(data.image); }
    if (data.featured !== undefined) { fields.push("featured = ?"); values.push(data.featured); }

    if (fields.length > 0) {
      values.push(id);
      db.prepare(`UPDATE projects SET ${fields.join(", ")} WHERE id = ?`).run(...values);
    }

    if (data.steps !== undefined) {
      db.prepare("DELETE FROM project_steps WHERE project_id = ?").run(id);
      const stmt = db.prepare(
        "INSERT INTO project_steps (project_id, step_title, description, sort_order) VALUES (?, ?, ?, ?)"
      );
      data.steps.forEach((s, i) => stmt.run(id, s.step_title, s.description, i + 1));
    }
  });

  run();
  return findById(id);
}

export function remove(id: number): boolean {
  return db.prepare("DELETE FROM projects WHERE id = ?").run(id).changes > 0;
}
