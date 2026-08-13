import { Router } from "express";
import multer from "multer";
import { extractTextFromPdf } from "../services/extractText.js";
import { parseResumeText } from "../services/parseResume.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "application/pdf") {
      return cb(new Error("Only PDF files are supported"));
    }
    cb(null, true);
  },
});

import crypto from "node:crypto";
import { redis } from "../lib/redis.js";

router.post("/upload", upload.single("resume"), async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const fileHash = crypto
      .createHash("sha256")
      .update(req.file.buffer)
      .digest("hex");

    const cacheKey = `resume:${fileHash}`;

    const cached = await redis.get(cacheKey);
    if (cached) {
      console.log("cache hit for", fileHash);
      return res.status(200).json(JSON.parse(cached));
    }

    const text = await extractTextFromPdf(req.file.buffer);
    const structuredResume = await parseResumeText(text);

    // cache for 1 hour (3600 seconds) — resumes don't change often,
    // but we don't want this to live forever either
    await redis.set(cacheKey, JSON.stringify(structuredResume), "EX", 3600);

    return res.status(200).json(structuredResume);
  } catch (err) {
    next(err);
  }
});

export default router;