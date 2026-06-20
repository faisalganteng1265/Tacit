import { Router, Request, Response } from "express";
import { z } from "zod";
import { listServices } from "../lib/compute.js";
import { oracleIncrementGap, oracleResolveGap, oracleUpdateConfidence } from "../lib/sui.js";

const router = Router();

const StateBody = z.object({ stateId: z.string().regex(/^0x[0-9a-fA-F]+$/) });
const ConfidenceBody = StateBody.extend({ score: z.coerce.number().int().min(0).max(100) });

// GET /oracle/services — list chat-capable models available on Atoma
router.get("/services", async (_req: Request, res: Response) => {
  try {
    const services = await listServices();
    res.json({ ok: true, services });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// POST /oracle/confidence — manual confidence override
router.post("/confidence", async (req: Request, res: Response) => {
  const parsed = ConfidenceBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  try {
    const txDigest = await oracleUpdateConfidence(parsed.data.stateId, parsed.data.score);
    res.json({ ok: true, txDigest });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// POST /oracle/gap/increment — flag a new blind spot
router.post("/gap/increment", async (req: Request, res: Response) => {
  const parsed = StateBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  try {
    const txDigest = await oracleIncrementGap(parsed.data.stateId);
    res.json({ ok: true, txDigest });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// POST /oracle/gap/resolve — mark a gap resolved after the mentor updates knowledge
router.post("/gap/resolve", async (req: Request, res: Response) => {
  const parsed = StateBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  try {
    const txDigest = await oracleResolveGap(parsed.data.stateId);
    res.json({ ok: true, txDigest });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
