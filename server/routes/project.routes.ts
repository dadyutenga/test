import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import * as repo from "../repositories/project.repository.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(repo.findAll());
});

router.get("/:id", (req, res) => {
  const project = repo.findById(Number(req.params.id));
  if (!project) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(project);
});

router.post("/", requireAuth, (req, res) => {
  const { title, category, image, featured, steps } = req.body;
  if (!title || !category) {
    res.status(400).json({ error: "Title and category required" });
    return;
  }
  const project = repo.create({ title, category, image, featured, steps });
  res.status(201).json(project);
});

router.put("/:id", requireAuth, (req, res) => {
  const { title, category, image, featured, steps } = req.body;
  const project = repo.update(Number(req.params.id), { title, category, image, featured, steps });
  if (!project) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(project);
});

router.delete("/:id", requireAuth, (req, res) => {
  if (!repo.remove(Number(req.params.id))) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.status(204).end();
});

export default router;
