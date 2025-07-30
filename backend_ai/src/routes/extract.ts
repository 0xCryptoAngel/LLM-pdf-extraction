import express, { type Request, Response } from "express";
import multer from "multer";
import { parsePDFBuffer } from "../services/pdfService";
import { extractStructuredData, extractStructuredDataClaude } from "../services/llmService";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      if (!req.file || !req.file.buffer) {
        return res.status(400).json({ error: "No PDF file uploaded" });
      }

      const rawText = await parsePDFBuffer(req.file.buffer);

      const provider = req.query.provider || "openai";

      let structuredData;

      if (provider === "claude") {
        structuredData = await extractStructuredDataClaude(rawText);
      } else {
        structuredData = await extractStructuredData(rawText);
      }

      res.json(structuredData);
    } catch (err: any) {
      console.error("Extraction error:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

export default router;
