import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "greenscape-cms-secret-2026";

export function generateToken(userId: number, username: string): string {
  return jwt.sign({ userId, username }, JWT_SECRET, { expiresIn: "7d" });
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }

  try {
    const token = header.split(" ")[1];
    const payload = jwt.verify(token, JWT_SECRET) as { userId: number; username: string };
    (req as any).user = payload;
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}
