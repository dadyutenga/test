import { Router } from "express";
import bcrypt from "bcryptjs";
import { generateToken, requireAuth } from "../middleware/auth.js";
import { findByUsername, findById, updatePassword } from "../repositories/user.repository.js";

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

router.post("/change-password", requireAuth, (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    res.status(400).json({ error: "Current password and new password are required" });
    return;
  }

  if (newPassword.length < 6) {
    res.status(400).json({ error: "New password must be at least 6 characters" });
    return;
  }

  const userId = (_req as any).user.userId;
  const user = findById(userId);

  if (!user || !bcrypt.compareSync(currentPassword, user.password_hash)) {
    res.status(401).json({ error: "Current password is incorrect" });
    return;
  }

  const hash = bcrypt.hashSync(newPassword, 10);
  updatePassword(userId, hash);
  res.json({ message: "Password updated successfully" });
});

export default router;
