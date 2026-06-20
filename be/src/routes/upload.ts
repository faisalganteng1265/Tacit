import { Router, Request, Response } from "express";
import multer from "multer";
import { z } from "zod";
import { uploadKnowledge } from "../lib/storage.js";
import { getMentorState, oracleResolveGap, oracleUpdateBlobId } from "../lib/sui.js";

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

const OBJECT_ID_RE = /^0x[0-9a-fA-F]+$/;

const UploadBody = z.object({
  stateId: z.string().regex(OBJECT_ID_RE, "stateId must be a Sui object id"),
});

// POST /upload
// Form-data: stateId (the mentor's MentorState object id), file (binary) or text (string)
// Encrypt via Seal -> store on Walrus -> anchor the blob id + initial confidence on-chain.
router.post("/", upload.single("file"), async (req: Request, res: Response) => {
  const parsed = UploadBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  const { stateId } = parsed.data;

  let content: string;
  if (req.file) {
    content = req.file.buffer.toString("utf8");
  } else if (typeof req.body.text === "string" && req.body.text.length > 0) {
    content = req.body.text;
  } else {
    res.status(400).json({ error: "Provide either a file or text field" });
    return;
  }

  try {
    const mentorState = await getMentorState(stateId); // throws if the mentor doesn't exist on-chain

    const { blobId, sizeBytes } = await uploadKnowledge(stateId, content);
    const txDigest = await oracleUpdateBlobId(stateId, blobId, 50);

    // A knowledge update is the mentor's response to an open gap — resolve
    // one (oracle_resolve_gap only steps by 1, mirroring how each
    // low-confidence query only increments by 1).
    const gapResolved = mentorState.gapCount > 0;
    if (gapResolved) {
      await oracleResolveGap(stateId);
    }

    res.json({
      ok: true,
      blobId,
      sizeBytes,
      txDigest,
      gapResolved,
      message: "Knowledge encrypted via Seal, stored on Walrus, blob id anchored on-chain.",
    });
  } catch (err) {
    console.error("[upload] error:", err);
    res.status(500).json({ error: String(err) });
  }
});

export default router;
