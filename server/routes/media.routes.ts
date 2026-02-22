import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import crypto from "crypto";
import { requireAuth } from "../middleware/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MEDIA_DIR = path.join(__dirname, "..", "media");

if (!fs.existsSync(MEDIA_DIR)) {
  fs.mkdirSync(MEDIA_DIR, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, MEDIA_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = crypto.randomBytes(12).toString("hex");
    cb(null, `${name}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const allowed = [".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"];
    const ext = path.extname(file.originalname).toLowerCase();
    cb(null, allowed.includes(ext));
  },
});

const router = Router();

router.post("/", requireAuth, upload.single("file"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No file uploaded" });
    return;
  }
  res.json({ url: `/media/${req.file.filename}` });
});

export default router;
