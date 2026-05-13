"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Aurora from "@/components/Aurora";

// ─── Particle Network Canvas ─────────────────────────────────────────────────
function ParticleCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const mouse = { x: -9999, y: -9999 };

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    const N = 100;
    const pts = Array.from({ length: N }, () => ({
      x: Math.random() * (canvas?.offsetWidth ?? 800),
      y: Math.random() * (canvas?.offsetHeight ?? 600),
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 1.1 + 0.3,
    }));

    const MAX = 135;

    function tick() {
      if (!ctx || !canvas) return;
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      ctx.clearRect(0, 0, W, H);

      for (const p of pts) {
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 90 && dist > 0) {
          p.vx += (dx / dist) * 0.055;
          p.vy += (dy / dist) * 0.055;
        }
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > 1.1) { p.vx *= 0.97; p.vy *= 0.97; }
        p.x = ((p.x + p.vx) + W) % W;
        p.y = ((p.y + p.vy) + H) % H;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(45,212,191,0.6)";
        ctx.fill();
      }

      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const d = Math.hypot(pts[i].x - pts[j].x, pts[i].y - pts[j].y);
          if (d < MAX) {
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.strokeStyle = `rgba(45,212,191,${0.15 * (1 - d / MAX)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(tick);
    }

    canvas.addEventListener("mousemove", (e) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    canvas.addEventListener("mouseleave", () => { mouse.x = -9999; mouse.y = -9999; });
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className={className} />;
}

// ─── Marquee ─────────────────────────────────────────────────────────────────
const MARQUEE = [
  "MENTOR iNFT", "0G STORAGE", "TEE COMPUTE", "ERC-7857 STANDARD",
  "SEALED INFERENCE", "BONDING CURVE", "VESTING ESCROW",
  "ON-CHAIN ORACLE", "ROYALTY SPLIT", "ACCESS SHARES", "GAP SIGNAL",
  "0G MAINNET · CHAIN ID 16661",
];

function Marquee() {
  return (
    <div className="relative overflow-hidden border-y border-[#141a1f] bg-[#050607] py-3 select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...MARQUEE, ...MARQUEE].map((item, i) => (
          <span key={i} className="mx-5 text-[10px] font-bold tracking-[0.22em] text-[#374151]">
            {item}
            <span className="mx-5 text-[#2dd4bf]/25">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Scroll Stack ─────────────────────────────────────────────────────────────
const STACK_CARDS = [
  {
    tag: "THE MENTOR",
    color: "#2dd4bf",
    borderColor: "rgba(45,212,191,0.22)",
    glowColor: "rgba(45,212,191,0.07)",
    icon: "⬡",
    headline: "Tokenize 12 years of\ntactical insight.",
    body: "Mint yourself as an Intelligent NFT on 0G Chain. Upload your knowledge base — encrypted client-side, Merkle-rooted, privately stored. Earn royalties forever. Every query settled atomically on-chain via a royalty split.",
    stat: "50% initial shares retained on mint",
  },
  {
    tag: "THE SHAREHOLDER",
    color: "#818cf8",
    borderColor: "rgba(129,140,248,0.22)",
    glowColor: "rgba(129,140,248,0.07)",
    icon: "◈",
    headline: "Co-own the upside of\nhuman knowledge.",
    body: "Access shares trade on a bonding curve — price rises monotonically with every purchase. Pro-rata cut of every query executed, distributed on-chain without any intermediary, custodian, or manual claim window.",
    stat: "Dividend per query · on-chain",
  },
  {
    tag: "THE LEARNER",
    color: "#f59e0b",
    borderColor: "rgba(245,158,11,0.22)",
    glowColor: "rgba(245,158,11,0.07)",
    icon: "⛨",
    headline: "Access intelligence that\nisn't on the internet.",
    body: "One share gates your access. Questions answered inside a TEE — the oracle host, the GPU provider, even the platform operator cannot read your query or the response. Confidential by architecture, not by policy.",
    stat: "TEE-sealed · zero operator access",
  },
];

function ScrollStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [prog, setProg] = useState(0);

  useEffect(() => {
    function onScroll() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.offsetHeight - window.innerHeight;
      if (scrollable <= 0) return;
      // -rect.top = how many px we've scrolled INTO the container
      const scrolled = -rect.top;
      setProg(Math.max(0, Math.min(1, scrolled / scrollable)));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const total = STACK_CARDS.length;
  // activePos: 0 when prog=0 (card 0), total-1 when prog=1 (last card)
  const activePos = prog * (total - 1);

  return (
    <div ref={containerRef} style={{ height: "320vh" }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-6">
        <p className="mb-10 text-[10px] font-extrabold uppercase tracking-[0.35em] text-[#2a3038]">
          Three ways to participate
        </p>

        {/* Step indicator */}
        <div className="mb-6 flex gap-3">
          {STACK_CARDS.map((c, i) => (
            <button
              key={i}
              className="flex items-center gap-2 rounded-full px-3 py-1 transition-all duration-300"
              style={{
                background: Math.abs(i - activePos) < 0.4 ? `${c.glowColor}` : "transparent",
                border: `1px solid ${Math.abs(i - activePos) < 0.4 ? c.borderColor : "rgba(42,48,56,0.6)"}`,
              }}
            >
              <span className="text-[10px]">{c.icon}</span>
              <span
                className="text-[9px] font-extrabold tracking-[0.18em] transition-all duration-300"
                style={{ color: Math.abs(i - activePos) < 0.4 ? c.color : "#2a3038" }}
              >
                {c.tag}
              </span>
            </button>
          ))}
        </div>

        <div className="relative w-full max-w-2xl" style={{ height: 440 }}>
          {STACK_CARDS.map((card, i) => {
            const offset = i - activePos;

            // Future cards (not yet active): peek from below
            // Active card (offset ≈ 0): center stage
            // Past cards (offset < 0): slide out upward
            let ty = 0, scale = 1, opacity = 1;

            if (offset > 0) {
              // Upcoming cards stacked below
              ty = Math.min(offset * 48, 96);
              scale = Math.max(0.88, 1 - offset * 0.058);
              opacity = Math.max(0, 1 - offset * 0.55);
            } else if (offset < 0) {
              // Past cards slide up and fade
              ty = Math.max(offset * 36, -72);
              scale = Math.max(0.85, 1 + offset * 0.05);
              opacity = Math.max(0, 1 + offset * 1.1);
            }

            const isActive = Math.abs(offset) < 0.4;

            return (
              <div
                key={i}
                className="absolute inset-0 rounded-2xl border flex flex-col p-10"
                style={{
                  transform: `translateY(${ty}px) scale(${scale})`,
                  opacity,
                  zIndex: isActive ? 20 : Math.max(0, total - Math.round(Math.abs(offset)) - 1),
                  background: isActive
                    ? `linear-gradient(145deg, ${card.glowColor} 0%, #06090b 100%)`
                    : "#06090b",
                  borderColor: isActive ? card.borderColor : "rgba(26,31,38,0.9)",
                  boxShadow: isActive ? `0 0 80px ${card.glowColor}, 0 1px 0 inset ${card.borderColor}` : "none",
                  willChange: "transform, opacity",
                }}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex-1">
                    <span
                      className="mb-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-extrabold tracking-[0.2em]"
                      style={{
                        color: card.color,
                        background: `${card.glowColor}`,
                        border: `1px solid ${card.borderColor}`,
                      }}
                    >
                      <span>{card.icon}</span>
                      {card.tag}
                    </span>
                    <h3 className="text-[28px] font-extrabold leading-[1.18] text-white whitespace-pre-line tracking-tight">
                      {card.headline}
                    </h3>
                  </div>
                </div>

                <p className="flex-1 text-[14px] leading-[1.85] text-[#6b7280]">{card.body}</p>

                <div className="mt-6 flex items-center gap-3">
                  <div className="h-px flex-1" style={{ background: card.borderColor }} />
                  <span className="text-[11px] font-bold tracking-[0.15em]" style={{ color: card.color }}>
                    {card.stat}
                  </span>
                </div>

                {/* Card number */}
                <div
                  className="absolute bottom-6 right-8 text-[11px] font-extrabold tracking-[0.2em]"
                  style={{ color: `${card.color}40` }}
                >
                  {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 50); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="bg-[#0b0d0f] text-[#d1d5db] font-mono [overflow-x:clip]">

      {/* ── Nav ── */}
      <nav
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? "rgba(11,13,15,0.92)" : "transparent",
          borderBottom: scrolled ? "1px solid #141a1f" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <span className="text-[15px] font-extrabold tracking-[0.22em] text-white">
            TAC<span className="text-[#2dd4bf]">IT</span>
          </span>
          <div className="hidden items-center gap-8 md:flex">
            {[["How it works", "#how"], ["0G Stack", "#stack"], ["Manifesto", "#manifesto"]].map(([label, href]) => (
              <a key={label} href={href} className="text-[11px] font-bold tracking-[0.1em] text-[#4b5563] transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </div>
          <Link
            href="/marketplace"
            className="flex items-center gap-2 rounded-lg border border-[rgba(45,212,191,0.4)] bg-[rgba(45,212,191,0.06)] px-4 py-2 text-[11px] font-extrabold tracking-[0.12em] text-[#2dd4bf] transition-all hover:bg-[rgba(45,212,191,0.12)] hover:border-[rgba(45,212,191,0.7)]"
          >
            LAUNCH APP
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
        {/* Aurora glow bg */}
        <div className="absolute inset-0 opacity-25">
          <Aurora colorStops={["#0b0d0f", "#0a2e28", "#080f11"]} amplitude={0.55} blend={0.38} speed={0.35} />
        </div>
        {/* Particle network */}
        <ParticleCanvas className="absolute inset-0 h-full w-full" />
        {/* Radial dark vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_50%,transparent_20%,#0b0d0f_75%)]" />
        {/* Bottom fade */}
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0b0d0f] to-transparent" />

        <div className="relative z-10 max-w-4xl">
          {/* Live badge */}
          <div className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[rgba(45,212,191,0.18)] bg-[rgba(45,212,191,0.04)] px-5 py-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2dd4bf] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#2dd4bf]" />
            </span>
            <span className="text-[10px] font-extrabold tracking-[0.25em] text-[#2dd4bf]">
              LIVE ON 0G MAINNET · ERC-7857 iNFT
            </span>
          </div>

          <h1 className="mb-7 text-[clamp(34px,5.5vw,72px)] font-extrabold leading-[1.06] tracking-[-0.025em] text-white">
            The knowledge that
            <br />
            compounds most is the
            <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(90deg, #2dd4bf 0%, #67e8f9 50%, #2dd4bf 100%)" }}
            >
              knowledge you cannot publish.
            </span>
          </h1>

          <p className="mx-auto mb-12 max-w-[480px] text-[15px] leading-[1.75] text-[#5b6470]">
            Experts mint themselves as Intelligent NFTs. Fans co-own the upside on a bonding curve. Every query sealed inside a TEE on 0G Compute.
            <br />
            <span className="text-[#9ca3af]">No operator. No trust required.</span>
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/marketplace"
              className="flex items-center gap-2.5 rounded-xl bg-[#2dd4bf] px-8 py-4 text-[12px] font-extrabold tracking-[0.12em] text-black shadow-[0_0_35px_rgba(45,212,191,0.22)] transition-all hover:shadow-[0_0_55px_rgba(45,212,191,0.42)] hover:bg-[#25c4af]"
            >
              EXPLORE MARKETPLACE
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <a
              href="#how"
              className="flex items-center gap-2 rounded-xl border border-[#222830] bg-transparent px-8 py-4 text-[12px] font-extrabold tracking-[0.12em] text-[#6b7280] transition-all hover:border-[#374151] hover:text-white"
            >
              HOW IT WORKS
            </a>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-10 flex flex-col items-center gap-2 opacity-30">
          <span className="text-[9px] tracking-[0.28em] text-[#4b5563]">SCROLL</span>
          <div className="h-10 w-px bg-gradient-to-b from-[#4b5563] to-transparent" />
        </div>
      </section>

      {/* ── Marquee ── */}
      <Marquee />

      {/* ── Problem ── */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-[#2a3038]">The problem</p>
        <h2 className="mb-16 max-w-xl text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-tight text-white">
          Every monetization path for expertise fails on at least one axis.
        </h2>

        <div className="grid gap-px overflow-hidden rounded-xl bg-[#141a1f] md:grid-cols-4">
          {[
            { label: "Paid consulting", fail: "Time-bound. Doesn't scale beyond your calendar. No asset value." },
            { label: "Online courses", fail: "Public the moment they ship. Instantly stale. No upgrade loop." },
            { label: "Social tokens", fail: "Pure speculation. Zero underlying utility. No privacy path." },
            { label: "LLM fine-tunes", fail: "Operator can exfiltrate. No royalty path. No confidentiality guarantee." },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-4 bg-[#0a0c0f] p-8">
              <p className="text-[13px] font-bold text-[#d1d5db]">{item.label}</p>
              <p className="flex-1 text-[12px] leading-[1.75] text-[#4b5563]">{item.fail}</p>
              <span className="inline-flex w-fit items-center gap-1.5 rounded border border-red-900/40 bg-red-950/30 px-2.5 py-1 text-[9px] font-bold tracking-[0.15em] text-red-500/70">
                ✕ FAILS
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-[rgba(45,212,191,0.16)] bg-[rgba(45,212,191,0.03)] p-8">
          <div className="flex items-start gap-5">
            <span className="mt-0.5 shrink-0 text-[22px] text-[#2dd4bf]">⊛</span>
            <div>
              <p className="mb-2 text-[12px] font-extrabold tracking-[0.15em] text-[#2dd4bf]">
                TACIT SOLVES ALL THREE SIMULTANEOUSLY
              </p>
              <p className="text-[13px] leading-[1.8] text-[#6b7280]">
                The expert earns <strong className="text-white font-bold">forever</strong> — royalties vest on every query.
                The shareholder owns <strong className="text-white font-bold">productive upside</strong> — dividend per query, live on-chain.
                The learner gets <strong className="text-white font-bold">verifiable confidentiality</strong> — sealed inside a TEE, not a policy doc.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Manifesto ── */}
      <section id="manifesto" className="border-y border-[#0f1318] bg-[#070a0c] px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl space-y-6">
          {[
            "Knowledge that can't be screenshotted.",
            "Returns that don't require your calendar.",
            "Ownership without custodians.",
          ].map((line, i) => (
            <p
              key={i}
              className="text-[clamp(18px,2.5vw,28px)] font-extrabold leading-[1.3] tracking-tight"
              style={{ color: i === 0 ? "white" : i === 1 ? "#9ca3af" : "#374151" }}
            >
              {line}
            </p>
          ))}
        </div>
      </section>

      {/* ── Scroll Stack ── */}
      <section id="how" className="pt-24">
        <div className="mx-auto max-w-7xl px-6 pb-16">
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-[#2a3038]">The actors</p>
          <h2 className="max-w-lg text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-tight text-white">
            Every actor wins only when the loop spins.
          </h2>
        </div>
        <ScrollStack />
      </section>

      {/* ── How it Works ── */}
      <section className="mx-auto max-w-4xl px-6 py-28">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-[#2a3038]">The flow</p>
        <h2 className="mb-16 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-tight text-white">
          From wallet to sealed answer.
        </h2>

        <div className="relative pl-0">
          {/* Vertical line */}
          <div className="absolute left-5 top-5 bottom-5 w-px bg-gradient-to-b from-[#2dd4bf]/50 via-[#2dd4bf]/20 to-transparent" />

          {[
            { n: "01", title: "Mint iNFT", body: "Expert mints AIMentorINFT (ERC-7857) on 0G Chain. Uploads encrypted knowledge to 0G Storage — only the Merkle root (storageRef) lives on-chain. Sealed AES key stored via setSealedKey." },
            { n: "02", title: "Buy Access Share", body: "Shareholder buys on the bonding curve via AccessSharesMarket. Price rises monotonically. One share is sufficient to gate query access." },
            { n: "03", title: "Execute Query (payable)", body: "Learner calls executeQuery — MentorMarketplace atomically settles the payment: mentor royalty vested to VestingEscrow, shareholder dividend distributed pro-rata. All in one tx." },
            { n: "04", title: "TEE Inference", body: "Oracle service fetches the encrypted blob from 0G Storage, unwraps the sealed key inside the TEE enclave on 0G Compute, runs inference. The key never leaves the enclave. Answer returned." },
            { n: "05", title: "On-Chain Confidence Signal", body: "LLM self-reports confidence. Below threshold → gapCount incremented on-chain, visible to shareholders as a sell signal. Expert patches the gap → storageRef rotates → price recovers." },
          ].map((step) => (
            <div key={step.n} className="relative mb-10 flex gap-8 pl-14">
              <div className="absolute left-0 top-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2dd4bf]/25 bg-[#0b1a18] text-[9px] font-extrabold text-[#2dd4bf]">
                {step.n}
              </div>
              <div>
                <p className="mb-2 text-[15px] font-bold text-white">{step.title}</p>
                <p className="text-[13px] leading-[1.8] text-[#4b5563] max-w-lg">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 0G Stack ── */}
      <section id="stack" className="mx-auto max-w-7xl px-6 py-20">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-[#2a3038]">0G integration</p>
        <h2 className="mb-4 text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.15] tracking-tight text-white">
          Structurally inseparable from the 0G stack.
        </h2>
        <p className="mb-14 max-w-xl text-[14px] leading-[1.75] text-[#4b5563]">
          Removing any single primitive breaks a core invariant. There is no AWS fallback path — the product only exists because 0G exists.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {[
            {
              label: "0G CHAIN",
              color: "#2dd4bf",
              icon: "⬡",
              headline: "6 contracts · Chain ID 16661",
              detail: "iNFT custody, bonding curve, atomic revenue split, vesting escrow, and oracle signaling all settle on-chain. No off-chain state for fund movement. Deployed and live.",
              tag: "Deployed · Mainnet · May 2026",
            },
            {
              label: "0G STORAGE",
              color: "#60a5fa",
              icon: "▣",
              headline: "Encrypted knowledge vault",
              detail: "Mentor knowledge encrypted client-side and pushed to indexer-storage-turbo.0g.ai. Root hash anchored in AIMentorINFT.storageRef. KV for live context, Log for immutable archive.",
              tag: "KV + Log layer",
            },
            {
              label: "0G COMPUTE (TEE)",
              color: "#a78bfa",
              icon: "⛨",
              headline: "Sealed inference · attestation",
              detail: "Inference runs inside a TEE-attested provider on 0G Compute. Sealed key unwrapped only inside the enclave — never exposed to oracle host, GPU operator, or platform.",
              tag: "Zero operator access",
            },
            {
              label: "ERC-7857 iNFT",
              color: "#f59e0b",
              icon: "◈",
              headline: "Intelligent NFT standard",
              detail: "Mentor identity + sealed-key custody. iTransfer and iClone with multi-proof validation allow ownership transitions without leaking the underlying knowledge base.",
              tag: "464 LOC · AIMentorINFT.sol",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="group relative overflow-hidden rounded-xl border border-[#141a1f] bg-[#070a0c] p-8 transition-all duration-300 hover:border-opacity-60"
              style={{ ["--c" as string]: item.color }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: `radial-gradient(circle at 75% 25%, color-mix(in srgb, ${item.color} 7%, transparent) 0%, transparent 55%)` }}
              />
              <div className="relative">
                <div className="mb-6 flex items-start justify-between">
                  <span
                    className="text-[10px] font-extrabold tracking-[0.22em]"
                    style={{ color: item.color }}
                  >
                    {item.label}
                  </span>
                  <span className="text-[26px] leading-none" style={{ color: item.color }}>{item.icon}</span>
                </div>
                <p className="mb-3 text-[16px] font-bold leading-snug text-white">{item.headline}</p>
                <p className="mb-7 text-[13px] leading-[1.8] text-[#4b5563]">{item.detail}</p>
                <span
                  className="inline-block rounded-full px-3 py-1 text-[10px] font-bold tracking-[0.15em]"
                  style={{
                    color: item.color,
                    background: `color-mix(in srgb, ${item.color} 8%, transparent)`,
                    border: `1px solid color-mix(in srgb, ${item.color} 14%, transparent)`,
                  }}
                >
                  {item.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Stats strip ── */}
      <div className="border-y border-[#0f1318] bg-[#070a0c]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-[#0f1318] md:grid-cols-4">
          {[
            ["2", "Mentors on-chain"],
            ["11", "Total queries"],
            ["6", "Smart contracts"],
            ["0G", "Mainnet · Chain 16661"],
          ].map(([val, label]) => (
            <div key={label} className="px-8 py-8">
              <p className="mb-1 text-[28px] font-extrabold text-white">{val}</p>
              <p className="text-[11px] tracking-[0.1em] text-[#374151]">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Final CTA ── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="relative overflow-hidden rounded-2xl border border-[rgba(45,212,191,0.12)] bg-[#050d0b] p-16 text-center">
          <div className="absolute inset-0 opacity-15">
            <Aurora colorStops={["#050d0b", "#0c3530", "#050d0b"]} amplitude={0.7} blend={0.32} speed={0.28} />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(45,212,191,0.06),transparent)]" />

          <div className="relative z-10">
            <p className="mb-5 text-[10px] font-extrabold uppercase tracking-[0.35em] text-[#2dd4bf]/50">
              0G APAC Hackathon · May 2026
            </p>
            <h2 className="mb-5 text-[clamp(28px,4vw,52px)] font-extrabold leading-[1.1] tracking-tight text-white">
              Your knowledge is an asset.
              <br />
              <span className="text-[#2dd4bf]">Start earning from it.</span>
            </h2>
            <p className="mx-auto mb-10 max-w-md text-[14px] leading-[1.75] text-[#4b5563]">
              Live on 0G Mainnet. Connect your wallet and explore the first market for knowledge that stays permanently private.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-3 rounded-xl bg-[#2dd4bf] px-10 py-4 text-[13px] font-extrabold tracking-[0.12em] text-black shadow-[0_0_50px_rgba(45,212,191,0.25)] transition-all hover:shadow-[0_0_70px_rgba(45,212,191,0.45)]"
              >
                OPEN MARKETPLACE
                <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <a
                href="https://github.com/faisalganteng1265/0G"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-[#222830] px-8 py-4 text-[13px] font-bold tracking-[0.1em] text-[#6b7280] transition-all hover:border-[#374151] hover:text-white"
              >
                VIEW SOURCE
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#0f1318] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <span className="text-[14px] font-extrabold tracking-[0.22em] text-white">
            TAC<span className="text-[#2dd4bf]">IT</span>
          </span>
          <p className="text-[10px] tracking-[0.1em] text-[#2a3038]">
            © 2026 TACIT · POWERED BY 0G PROTOCOL · MIT LICENSE
          </p>
          <div className="flex gap-6">
            {["GITHUB", "0G EXPLORER", "DOCUMENTATION"].map((l) => (
              <button key={l} className="text-[10px] font-bold tracking-[0.12em] text-[#2a3038] transition-colors hover:text-[#6b7280]">
                {l}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
