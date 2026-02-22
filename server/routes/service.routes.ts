import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import * as repo from "../repositories/service.repository.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(repo.findAll());
});

router.get("/:id", (req, res) => {
  const service = repo.findById(Number(req.params.id));
  if (!service) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(service);
});

router.post("/", requireAuth, (req, res) => {
  const { title, description, image, categories } = req.body;
  if (!title || !description) {
    res.status(400).json({ error: "Title and description required" });
    return;
  }
  const service = repo.create({ title, description, image, categories });
  res.status(201).json(service);
});

router.put("/:id", requireAuth, (req, res) => {
  const { title, description, image, categories } = req.body;
  const service = repo.update(Number(req.params.id), { title, description, image, categories });
  if (!service) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(service);
});

router.delete("/:id", requireAuth, (req, res) => {
  if (!repo.remove(Number(req.params.id))) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.status(204).end();
});

export default router;
