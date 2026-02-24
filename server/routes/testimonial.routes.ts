import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import * as repo from "../repositories/testimonial.repository.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(repo.findAll());
});

router.get("/:id", (req, res) => {
  const testimonial = repo.findById(Number(req.params.id));
  if (!testimonial) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(testimonial);
});

router.post("/", requireAuth, (req, res) => {
  const { name, role, text, image } = req.body;
  if (!name || !role || !text) {
    res.status(400).json({ error: "Name, role and text are required" });
    return;
  }
  const testimonial = repo.create({ name, role, text, image });
  res.status(201).json(testimonial);
});

router.put("/:id", requireAuth, (req, res) => {
  const { name, role, text, image } = req.body;
  const testimonial = repo.update(Number(req.params.id), { name, role, text, image });
  if (!testimonial) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json(testimonial);
});

router.delete("/:id", requireAuth, (req, res) => {
  if (!repo.remove(Number(req.params.id))) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.status(204).end();
});

export default router;
