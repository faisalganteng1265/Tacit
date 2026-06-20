import "dotenv/config";
import express from "express";
import cors from "cors";
import uploadRouter from "./routes/upload.js";
import queryRouter from "./routes/query.js";
import oracleRouter from "./routes/oracle.js";
import marketRouter from "./routes/market.js";

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.use("/upload", uploadRouter);
app.use("/query", queryRouter);
app.use("/oracle", oracleRouter);
app.use("/market", marketRouter);

app.listen(PORT, () => {
  console.log(`[server] listening on http://localhost:${PORT}`);
  console.log(`[server] endpoints:`);
  console.log(`  POST /upload          — encrypt via Seal, store on Walrus, anchor blob id`);
  console.log(`  POST /query           — Atoma confidential-compute inference`);
  console.log(`  GET  /market/mentors  — list mentors via MentorRegistered events`);
  console.log(`  GET  /market/access   — check share-based access`);
  console.log(`  GET  /market/quote    — share/query prices in MIST`);
  console.log(`  GET  /oracle/services — list Atoma models`);
  console.log(`  POST /oracle/confidence`);
  console.log(`  POST /oracle/gap/increment`);
  console.log(`  POST /oracle/gap/resolve`);
});
