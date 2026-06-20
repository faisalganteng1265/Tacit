import { Router, Request, Response } from "express";
import { z } from "zod";
import {
  checkQueryAccess,
  getAllMentors,
  getBuyQuote,
  getCurrentPrice,
  getMentorState,
  getQueryPrice,
} from "../lib/sui.js";

const router = Router();

const OBJECT_ID_RE = /^0x[0-9a-fA-F]+$/;

const StateQuery = z.object({ stateId: z.string().regex(OBJECT_ID_RE) });
const AddressQuery = StateQuery.extend({ userAddress: z.string().regex(OBJECT_ID_RE) });
const QuoteQuery = StateQuery.extend({ amount: z.coerce.number().int().positive().default(1) });

// GET /market/mentors — list all mentors (via MentorRegistered events, cached 60s)
router.get("/mentors", async (_req: Request, res: Response) => {
  try {
    const mentors = await getAllMentors();
    res.json({ ok: true, mentors });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// GET /market/access?stateId=0x...&userAddress=0x...
router.get("/access", async (req: Request, res: Response) => {
  const parsed = AddressQuery.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  try {
    const access = await checkQueryAccess(parsed.data.stateId, parsed.data.userAddress);
    res.json({ ok: true, access });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

// GET /market/quote?stateId=0x...&amount=10
// Display-only pricing in MIST; the frontend builds its own `moveCall` to
// actually buy shares or execute a query (no backend tx-payload step needed
// — Move calls don't require an ABI-encoding round trip).
router.get("/quote", async (req: Request, res: Response) => {
  const parsed = QuoteQuery.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.flatten() });
    return;
  }
  try {
    const { stateId, amount } = parsed.data;
    const state = await getMentorState(stateId);
    const [sharePriceMist, buySharesCostMist, queryPriceMist] = await Promise.all([
      getCurrentPrice(state.sharePoolId),
      getBuyQuote(state.sharePoolId, amount),
      getQueryPrice(),
    ]);
    res.json({
      ok: true,
      quote: { stateId, amount, sharePoolId: state.sharePoolId, sharePriceMist, buySharesCostMist, queryPriceMist },
    });
  } catch (err) {
    res.status(500).json({ error: String(err) });
  }
});

export default router;
