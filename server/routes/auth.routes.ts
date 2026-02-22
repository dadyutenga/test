import { Router } from "express";
import bcrypt from "bcryptjs";
import { generateToken, requireAuth } from "../middleware/auth.js";
import { findByUsername } from "../repositories/user.repository.js";

const router = Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "Username and password required" });
    return;
  }

  const user = findByUsername(username);
  if (!user || !bcrypt.compareSync(password, user.password_hash)) {
    res.status(401).json({ error: "Invalid credentials" });
    return;
  }

  const token = generateToken(user.id, user.username);
  res.json({ token, username: user.username });
});

router.get("/me", requireAuth, (_req, res) => {
  res.json({ user: (_req as any).user });
});

export default router;
