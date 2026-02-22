import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import * as repo from "../repositories/contact.repository.js";

const router = Router();

router.get("/", (_req, res) => {
  res.json(repo.getContactInfo());
});

router.put("/", requireAuth, (req, res) => {
  const { phone, email, whatsapp, address } = req.body;
  const info = repo.updateContactInfo({ phone, email, whatsapp, address });
  res.json(info);
});

router.get("/messages", requireAuth, (_req, res) => {
  res.json(repo.getAllMessages());
});

router.post("/messages", (req, res) => {
  const { name, email, subject, message } = req.body;
  if (!name || !email || !message) {
    res.status(400).json({ error: "Name, email, and message required" });
    return;
  }
  const msg = repo.createMessage({ name, email, subject, message });
  res.status(201).json(msg);
});

router.patch("/messages/:id/read", requireAuth, (req, res) => {
  if (!repo.markAsRead(Number(req.params.id))) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.json({ success: true });
});

router.delete("/messages/:id", requireAuth, (req, res) => {
  if (!repo.deleteMessage(Number(req.params.id))) {
    res.status(404).json({ error: "Not found" });
    return;
  }
  res.status(204).end();
});

export default router;
