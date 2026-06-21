"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Aurora from "@/components/Aurora";
import { useMentors } from "@/hooks/useMarketplace";

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
  "SUI MENTOR NFT", "WALRUS KNOWLEDGE", "MEMWAL MEMORY", "SEAL POLICY",
  "CROSS-SESSION RECALL", "BONDING CURVE", "VESTING ESCROW",
  "ON-CHAIN ORACLE", "ROYALTY SPLIT", "ACCESS SHARES", "GAP SIGNAL",
  "SUI OVERFLOW · WALRUS TRACK",
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
    headline: "Give private expertise\ndurable memory.",
    body: "Mint a Sui-native AI mentor, upload encrypted knowledge to Walrus, and let every user-specific conversation persist through MemWal. The mentor becomes an agent that can improve over time instead of resetting every session.",
    stat: "Walrus knowledge · MemWal recall",
  },
  {
    tag: "THE SHAREHOLDER",
    color: "#818cf8",
    borderColor: "rgba(129,140,248,0.22)",
    glowColor: "rgba(129,140,248,0.07)",
    icon: "◈",
    headline: "Co-own access to a\nliving mentor.",
    body: "Access shares trade on a bonding curve and gate queries through Sui + Seal. Query revenue is split on-chain, while public confidence and gap signals show whether the mentor is getting sharper or going stale.",
    stat: "Dividend per query · on-chain",
  },
  {
    tag: "THE LEARNER",
    color: "#f59e0b",
    borderColor: "rgba(245,158,11,0.22)",
    glowColor: "rgba(245,158,11,0.07)",
    icon: "⛨",
    headline: "Ask an agent that\nremembers you.",
    body: "One share gates your access. The mentor answers from encrypted Walrus knowledge plus your own prior conversations from MemWal, so context survives across sessions without being locked into a single app.",
    stat: "Per-user memory · portable context",
  },
];

function CardContent({ card, align = "left" }: { card: typeof STACK_CARDS[0]; align?: "left" | "right" }) {
  return (
    <div className={`flex flex-col gap-7 ${align === "right" ? "items-end text-right" : ""}`}>
      <span className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-extrabold tracking-[0.22em]"
        style={{ color: card.color, background: card.glowColor, border: `1px solid ${card.borderColor}` }}>
        {card.icon} {card.tag}
      </span>
      <h3 className="clash font-extrabold leading-[1.06] tracking-[-0.025em] text-white whitespace-pre-line"
        style={{ fontSize: "clamp(34px,5vw,64px)" }}>
        {card.headline}
      </h3>
      <div className={`h-px max-w-sm ${align === "right" ? "ml-auto" : ""}`}
        style={{ background: align === "right" ? `linear-gradient(270deg, ${card.borderColor}, transparent)` : `linear-gradient(90deg, ${card.borderColor}, transparent)` }} />
      <p className={`max-w-lg text-[14px] leading-[1.85] text-[#5b6470] ${align === "right" ? "ml-auto" : ""}`}>{card.body}</p>
      <div className={`flex items-center gap-3 ${align === "right" ? "flex-row-reverse" : ""}`}>
        <div className="h-px w-8 rounded" style={{ background: card.color }} />
        <span className="text-[11px] font-bold tracking-[0.18em]" style={{ color: card.color }}>{card.stat}</span>
      </div>
    </div>
  );
}

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
      setProg(Math.max(0, Math.min(1, -rect.top / scrollable)));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const total = STACK_CARDS.length;
  const activePos = prog * (total - 1);

  return (
    <div ref={containerRef} style={{ height: "320vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Fullscreen background glow — shifts with active card */}
        <div className="absolute inset-0 transition-all duration-700">
          {STACK_CARDS.map((card, i) => {
            const dist = Math.abs(i - activePos);
            return (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-700"
                style={{
                  opacity: Math.max(0, 1 - dist * 2),
                  background: `radial-gradient(ellipse 55% 60% at 15% 50%, ${card.glowColor} 0%, transparent 65%)`,
                }}
              />
            );
          })}
        </div>

        {/* Left side chapter progress */}
        <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col gap-5">
          {STACK_CARDS.map((c, i) => {
            const isActive = Math.abs(i - activePos) < 0.45;
            return (
              <div key={i} className="flex items-center gap-3 transition-all duration-300" style={{ opacity: isActive ? 1 : 0.22 }}>
                <div className="h-px transition-all duration-300" style={{ width: isActive ? 28 : 12, background: isActive ? c.color : "#2a3038" }} />
                <span className="text-[9px] font-extrabold tracking-[0.22em]" style={{ color: isActive ? c.color : "#2a3038" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
            );
          })}
        </div>

        {/* Cards — full-viewport panels */}
        <div className="relative h-full">
          {STACK_CARDS.map((card, i) => {
            const offset = i - activePos;
            let ty = 0, opacity = 1;

            if (offset > 0) {
              ty = Math.min(offset * 90, 180);
              opacity = Math.max(0, 1 - offset * 4); // invisible past offset 0.25
            } else if (offset < 0) {
              ty = Math.max(offset * 70, -140);
              opacity = Math.max(0, 1 + offset * 4); // invisible past offset -0.25
            }

            return (
              <div
                key={i}
                className="absolute inset-0 flex items-center"
                style={{
                  transform: `translateY(${ty}px)`,
                  opacity,
                  zIndex: Math.abs(offset) < 0.5 ? 10 : Math.max(1, total - Math.round(Math.abs(offset))),
                  willChange: "transform, opacity",
                }}
              >
                {/* ── Panel 1: number left, content right ── */}
                {i === 0 && (
                  <div className="mx-auto w-full max-w-7xl px-8 xl:px-24">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr] lg:gap-16 items-center">
                      <div className="hidden lg:flex flex-col items-start gap-2 select-none">
                        <span className="font-extrabold leading-none tracking-tighter" style={{ fontSize: "clamp(80px,11vw,150px)", color: `${card.color}10` }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[52px] leading-none mt-2" style={{ color: `${card.color}35` }}>{card.icon}</span>
                      </div>
                      <CardContent card={card} />
                    </div>
                  </div>
                )}

                {/* ── Panel 2: content left, number right (flipped) ── */}
                {i === 1 && (
                  <div className="mx-auto w-full max-w-7xl px-8 xl:px-24">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_220px] lg:gap-16 items-center">
                      <CardContent card={card} align="right" />
                      <div className="hidden lg:flex flex-col items-end gap-2 select-none">
                        <span className="font-extrabold leading-none tracking-tighter text-right" style={{ fontSize: "clamp(80px,11vw,150px)", color: `${card.color}10` }}>
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[52px] leading-none mt-2" style={{ color: `${card.color}35` }}>{card.icon}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* ── Panel 3: centered, number as background watermark ── */}
                {i === 2 && (
                  <div className="relative mx-auto w-full max-w-7xl px-8 xl:px-24">
                    {/* Watermark number */}
                    <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
                      <span className="font-extrabold leading-none tracking-tighter" style={{ fontSize: "clamp(160px,24vw,320px)", color: `${card.color}07` }}>
                        {card.icon}
                      </span>
                    </div>
                    <div className="relative z-10 flex flex-col items-center gap-7 text-center max-w-2xl mx-auto">
                      <span className="inline-flex w-fit items-center gap-2 rounded-full px-4 py-1.5 text-[10px] font-extrabold tracking-[0.22em]"
                        style={{ color: card.color, background: card.glowColor, border: `1px solid ${card.borderColor}` }}>
                        {card.icon} {card.tag}
                      </span>
                      <h3 className="font-extrabold leading-[1.06] tracking-[-0.025em] text-white whitespace-pre-line"
                        style={{ fontSize: "clamp(34px,5vw,64px)" }}>
                        {card.headline}
                      </h3>
                      <div className="h-px w-24 mx-auto" style={{ background: card.borderColor }} />
                      <p className="text-[14px] leading-[1.85] text-[#5b6470]">{card.body}</p>
                      <div className="flex items-center gap-3">
                        <div className="h-px w-8 rounded" style={{ background: card.color }} />
                        <span className="text-[11px] font-bold tracking-[0.18em]" style={{ color: card.color }}>{card.stat}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom progress dots */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2.5">
          {STACK_CARDS.map((c, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-400"
              style={{
                width: Math.abs(i - activePos) < 0.4 ? 28 : 8,
                height: 4,
                background: Math.abs(i - activePos) < 0.4 ? c.color : "rgba(42,48,56,0.7)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Fade-in on scroll ────────────────────────────────────────────────────────
function FadeIn({ children, className, delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.12 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={className} style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms` }}>
      {children}
    </div>
  );
}

// ─── Landing Page ─────────────────────────────────────────────────────────────
export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);
  const { data: mentors = [] } = useMentors();

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 50); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="landing-page bg-[#0b0d0f] text-[#d1d5db] [overflow-x:clip]" style={{ fontFamily: "var(--font-satoshi), var(--font-geist-sans), sans-serif" }}>

      {/* ── Nav ── */}
      <nav className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{ background: scrolled ? "rgba(11,13,15,0.94)" : "transparent", borderBottom: scrolled ? "1px solid #141a1f" : "1px solid transparent", backdropFilter: scrolled ? "blur(14px)" : "none" }}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <span className="clash-text text-[16px] font-extrabold tracking-[0.18em] text-white">TAC<span className="text-[#2dd4bf]">IT</span></span>
          <div className="hidden items-center gap-8 md:flex">
            {[["The problem", "#problem"], ["How it works", "#how"], ["Walrus Stack", "#stack"]].map(([l, h]) => (
              <a key={l} href={h} className="text-[11px] font-bold tracking-[0.1em] text-[#4b5563] hover:text-white transition-colors">{l}</a>
            ))}
          </div>
          <Link href="/marketplace" className="flex items-center gap-2 rounded-lg border border-[rgba(45,212,191,0.4)] bg-[rgba(45,212,191,0.06)] px-4 py-2 text-[11px] font-extrabold tracking-[0.12em] text-[#2dd4bf] transition-all hover:bg-[rgba(45,212,191,0.14)]">
            LAUNCH APP <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </nav>

      {/* ── Hero — asymmetric left-aligned ── */}
      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 opacity-20"><Aurora colorStops={["#0b0d0f","#0a2e28","#060e0c"]} amplitude={0.6} blend={0.4} speed={0.3}/></div>
        <ParticleCanvas className="absolute inset-0 h-full w-full"/>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_50%,transparent_20%,#0b0d0f_72%)]"/>
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0b0d0f] to-transparent"/>

        {/* Huge background watermark */}
        <div className="absolute right-[-4vw] top-1/2 -translate-y-1/2 select-none pointer-events-none">
          <span className="text-[clamp(160px,22vw,340px)] font-extrabold leading-none tracking-tighter text-white opacity-[0.025]">TACIT</span>
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-36 pb-24 flex flex-col justify-center min-h-screen">
          {/* Live pill */}
          <div className="mb-10 flex items-center gap-3">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#2dd4bf] opacity-60"/><span className="relative inline-flex h-2 w-2 rounded-full bg-[#2dd4bf]"/></span>
            <span className="text-[10px] font-bold tracking-[0.28em] text-[#2dd4bf]">SUI OVERFLOW 2026 · WALRUS TRACK</span>
          </div>

          {/* Main headline — huge, left-aligned */}
          <h1 className="mb-8 max-w-5xl text-[clamp(42px,7vw,110px)] font-extrabold leading-[0.96] tracking-[-0.03em] text-white">
            AI mentors that<br/>
            <span className="text-[#374151]">remember across</span><br/>
            <span style={{ backgroundImage: "linear-gradient(90deg,#2dd4bf,#67e8f9 50%,#2dd4bf)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              every session.
            </span>
          </h1>

          {/* Subtext + CTAs in a split row */}
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between max-w-5xl">
            <p className="max-w-sm text-[15px] leading-[1.75] text-[#5b6470]">
              Encrypted expert knowledge lives on Walrus. User-specific memory lives in MemWal.
              <span className="block mt-2 text-[#374151]">Sui and Seal enforce who can access it.</span>
            </p>
            <div className="flex items-center gap-4 shrink-0">
              <Link href="/marketplace" className="flex items-center gap-2.5 rounded-xl bg-[#2dd4bf] px-7 py-3.5 text-[12px] font-extrabold tracking-[0.12em] text-black shadow-[0_0_40px_rgba(45,212,191,0.2)] hover:shadow-[0_0_60px_rgba(45,212,191,0.4)] transition-all">
                OPEN APP <svg width="13" height="13" viewBox="0 0 14 14" fill="none"><path d="M2 7h10M7 2l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </Link>
              <a href="#problem" className="text-[12px] font-bold tracking-[0.1em] text-[#4b5563] hover:text-white transition-colors">↓ SCROLL</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <Marquee/>

      {/* ── Huge stats strip ── */}
      <FadeIn>
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-2 gap-px bg-[#141a1f] overflow-hidden rounded-2xl md:grid-cols-4">
            {[
            [mentors.length > 0 ? String(mentors.length) : "—", "Mentors\non-chain", "#2dd4bf"],
            [mentors.length > 0 ? String(mentors.reduce((s, m) => s + m.totalQueries, 0)) : "—", "Total\nqueries", "#60a5fa"],
            ["7", "Move\nmodules", "#a78bfa"],
            ["2", "Walrus data\nlayers", "#f59e0b"],
          ].map(([v, l, c]) => (
              <div key={v} className="group bg-[#070a0c] px-8 py-10 transition-colors hover:bg-[#0a0d10]">
                <p className="mb-2 text-[clamp(44px,6vw,80px)] font-extrabold leading-none tracking-tight" style={{ color: c as string }}>{v}</p>
                <p className="whitespace-pre-line text-[11px] tracking-[0.12em] text-[#374151] leading-[1.6]">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </FadeIn>

      {/* ── Problem — editorial split layout ── */}
      <section id="problem" className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex flex-col gap-16 lg:flex-row lg:gap-24">

          {/* Left: pull quote */}
          <FadeIn className="lg:w-[42%] lg:sticky lg:top-28 self-start">
            <p className="mb-6 text-[10px] font-bold uppercase tracking-[0.32em] text-[#2a3038]">The problem</p>
            <div className="relative">
              <span className="absolute -left-2 -top-8 text-[80px] leading-none text-[#2dd4bf]/10 font-serif select-none">&quot;</span>
              <p className="text-[clamp(22px,2.8vw,34px)] font-extrabold leading-[1.2] tracking-tight text-white">
                Agents should not forget everything when the session ends.
              </p>
              <div className="mt-8 h-px w-16 bg-[#2dd4bf]/30"/>
              <p className="mt-6 text-[13px] leading-[1.8] text-[#4b5563] max-w-sm">
                Private files, user context, and memory need a durable data layer instead of another app-specific database.
              </p>
            </div>
          </FadeIn>

          {/* Right: problem table */}
          <div className="flex-1 flex flex-col gap-1">
            {[
              { label: "Plain chatbots", fail: "Stateless by default. Every important conversation starts from zero." },
              { label: "App-specific memory", fail: "Locked to one tool, model, or backend database." },
              { label: "Centralized file storage", fail: "Private knowledge can be revoked, hidden, or silently changed." },
              { label: "LLM fine-tunes", fail: "Operator can exfiltrate. No clear access policy or memory portability." },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={i * 80}>
                <div className="group flex items-start justify-between gap-6 border-b border-[#141a1f] py-6 transition-colors hover:border-[#1f2937]">
                  <div className="flex-1">
                    <p className="mb-1.5 text-[14px] font-bold text-[#9ca3af] group-hover:text-white transition-colors">{item.label}</p>
                    <p className="text-[12px] leading-[1.7] text-[#374151]">{item.fail}</p>
                  </div>
                  <span className="shrink-0 mt-0.5 text-[9px] font-extrabold tracking-[0.18em] text-red-600/60 border border-red-900/30 bg-red-950/20 rounded px-2 py-1">✕ FAILS</span>
                </div>
              </FadeIn>
            ))}
            <FadeIn delay={350}>
              <div className="mt-2 flex items-start gap-4 rounded-xl border border-[rgba(45,212,191,0.15)] bg-[rgba(45,212,191,0.03)] p-6">
                <span className="shrink-0 text-[10px] font-extrabold tracking-[0.18em] text-[#2dd4bf] border border-[rgba(45,212,191,0.3)] bg-[rgba(45,212,191,0.08)] rounded px-2 py-1">✓ TACIT</span>
                <p className="text-[13px] leading-[1.75] text-[#6b7280]">
                  Walrus stores <strong className="text-white">encrypted knowledge</strong> · MemWal stores <strong className="text-white">agent memory</strong> · Sui + Seal enforce <strong className="text-white">verifiable access</strong>.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Manifesto — staggered asymmetric ── */}
      <section id="manifesto" className="py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <FadeIn>
            <p className="clash text-left text-[clamp(28px,4.5vw,64px)] font-extrabold leading-[1.12] tracking-tight text-white">
              Memory that survives the tab closing.
            </p>
          </FadeIn>
          <FadeIn delay={120}>
            <p className="clash mt-3 text-center text-[clamp(22px,3.5vw,52px)] font-extrabold leading-[1.15] tracking-tight text-[#374151]">
              Knowledge that stays encrypted on Walrus.
            </p>
          </FadeIn>
          <FadeIn delay={240}>
            <p className="clash mt-3 text-right text-[clamp(18px,2.8vw,42px)] font-extrabold leading-[1.2] tracking-tight text-[#1f2937]">
              Access enforced by Sui and Seal.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Scroll Stack ── */}
      <section id="how" className="pt-12">
        <FadeIn>
          <div className="mx-auto max-w-7xl px-6 pb-16">
            <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-[#2a3038]">The actors</p>
            <h2 className="max-w-lg text-[clamp(26px,3vw,42px)] font-extrabold leading-[1.12] tracking-tight text-white">
              Persistent agents need<br/>persistent data.
            </h2>
          </div>
        </FadeIn>
        <ScrollStack/>
      </section>

      {/* ── How it Works — alternating layout ── */}
      <section className="mx-auto max-w-7xl px-6 py-28">
        <FadeIn>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-[#2a3038]">The flow</p>
          <h2 className="mb-20 text-[clamp(26px,3vw,42px)] font-extrabold leading-[1.12] tracking-tight text-white">
            From wallet to<br/>remembered answer.
          </h2>
        </FadeIn>

        <div className="space-y-px">
          {[
            { n: "01", title: "Mint Mentor", body: "Expert mints a Sui MentorNFT paired with shared MentorState. The object anchors identity, access pools, revenue, confidence, and the current Walrus blob pointer.", accent: "#2dd4bf" },
            { n: "02", title: "Upload Knowledge", body: "Private expertise is encrypted with Seal and written to Walrus. Only the blob id is stored on-chain; decryption is approved by a Move policy.", accent: "#60a5fa" },
            { n: "03", title: "Buy Access Share", body: "A user buys access through the bonding curve. Holding a share lets Seal key-servers approve decryption under the mentor's policy.", accent: "#a78bfa" },
            { n: "04", title: "Recall Memory", body: "Before inference, the backend recalls relevant past exchanges for this exact mentor and wallet from MemWal, scoped by namespace.", accent: "#f59e0b" },
            { n: "05", title: "Answer + Improve", body: "The model answers from Walrus knowledge plus MemWal memory. Low confidence increments an on-chain gap signal; mentor patches rotate the Walrus blob.", accent: "#2dd4bf" },
          ].map((step, i) => (
            <FadeIn key={step.n} delay={i * 60}>
              <div className="group grid grid-cols-[60px_1fr] gap-6 border-b border-[#0f1318] py-8 transition-colors hover:bg-[#07090c] hover:border-[#1a1f24] rounded-lg px-4 -mx-4 md:grid-cols-[80px_200px_1fr] md:gap-10">
                <span className="text-[clamp(28px,3vw,40px)] font-extrabold tracking-tighter opacity-20 group-hover:opacity-60 transition-opacity" style={{ color: step.accent }}>{step.n}</span>
                <p className="text-[15px] font-bold text-white self-center">{step.title}</p>
                <p className="text-[13px] leading-[1.8] text-[#4b5563] self-center md:col-start-3">{step.body}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ── Walrus Stack Bento Grid ── */}
      <section id="stack" className="mx-auto max-w-7xl px-6 py-20">
        <FadeIn>
          <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.32em] text-[#2a3038]">Walrus stack integration</p>
          <h2 className="mb-16 text-[clamp(26px,3vw,42px)] font-extrabold leading-[1.12] tracking-tight text-white">
            Structurally inseparable<br/>from Sui, Walrus, and Seal.
          </h2>
        </FadeIn>

        {/* Bento: hero card on top, four equal cards below */}
        <div className="grid gap-3 grid-cols-1 md:grid-cols-2 xl:grid-cols-4">

          {/* Sui — hero card, full width */}
          <FadeIn className="md:col-span-2 xl:col-span-4">
            <div className="group relative h-full min-h-[220px] overflow-hidden rounded-2xl border border-[rgba(45,212,191,0.15)] bg-[#060d0b] p-8 transition-all duration-500 hover:border-[rgba(45,212,191,0.3)]">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(circle at 80% 30%, rgba(45,212,191,0.06) 0%, transparent 60%)" }}/>
              <div className="absolute bottom-0 right-0 text-[clamp(80px,12vw,160px)] font-extrabold leading-none text-[#2dd4bf]/[0.04] select-none tracking-tighter">SUI</div>
              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-auto flex items-start justify-between">
                  <span className="text-[10px] font-extrabold tracking-[0.22em] text-[#2dd4bf]">SUI · MOVE CONTRACTS</span>
                  <span className="text-[28px] text-[#2dd4bf]/40">⬡</span>
                </div>
                <div>
                  <p className="mt-8 text-[clamp(18px,2vw,26px)] font-extrabold leading-tight text-white">7 Move modules<br/>published on testnet</p>
                  <p className="mt-4 text-[13px] leading-[1.8] text-[#4b5563] max-w-lg">Mentor identity, per-mentor bonding-curve markets, atomic revenue split, vesting + clawback, and the Seal access policy all live as capability-gated Move objects — no address-whitelist patterns, no privileged backend state.</p>
                  <span className="mt-6 inline-block rounded-full border border-[rgba(45,212,191,0.18)] bg-[rgba(45,212,191,0.06)] px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-[#2dd4bf]">Published · June 2026</span>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Walrus */}
          <FadeIn delay={80}>
            <div className="group relative h-full min-h-[160px] overflow-hidden rounded-2xl border border-[#141a1f] bg-[#070a0c] p-6 transition-all hover:border-[rgba(96,165,250,0.2)]">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(circle at 80% 20%, rgba(96,165,250,0.07) 0%, transparent 60%)" }}/>
              <div className="relative z-10">
                <div className="mb-4 flex items-start justify-between">
                  <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#60a5fa]">WALRUS</span>
                  <span className="text-[20px] text-[#60a5fa]/40">▣</span>
                </div>
                <p className="text-[14px] font-bold text-white leading-snug">Encrypted knowledge vault</p>
                <p className="mt-2 text-[11px] leading-[1.7] text-[#374151]">Mentor knowledge as a Seal-encrypted blob; only the blob id is anchored on-chain.</p>
              </div>
            </div>
          </FadeIn>

          {/* Seal */}
          <FadeIn delay={160}>
            <div className="group relative h-full min-h-[160px] overflow-hidden rounded-2xl border border-[#141a1f] bg-[#070a0c] p-6 transition-all hover:border-[rgba(245,158,11,0.2)]">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(circle at 80% 20%, rgba(245,158,11,0.07) 0%, transparent 60%)" }}/>
              <div className="relative z-10">
                <div className="mb-4 flex items-start justify-between">
                  <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#f59e0b]">SEAL</span>
                  <span className="text-[20px] text-[#f59e0b]/40">◈</span>
                </div>
                <p className="text-[14px] font-bold text-white leading-snug">Policy-gated decryption</p>
                <p className="mt-2 text-[11px] leading-[1.7] text-[#374151]">seal_approve checks share balance, oracle, or allow-list — enforced by Seal's key-servers, not Tacit.</p>
              </div>
            </div>
          </FadeIn>

          {/* MemWal */}
          <FadeIn delay={240}>
            <div className="group relative h-full min-h-[160px] overflow-hidden rounded-2xl border border-[#141a1f] bg-[#070a0c] p-6 transition-all hover:border-[rgba(167,139,250,0.25)]">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: "radial-gradient(circle at 80% 20%, rgba(167,139,250,0.07) 0%, transparent 60%)" }}/>
              <div className="relative z-10">
                <div className="mb-4 flex items-start justify-between">
                  <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#a78bfa]">MEMWAL</span>
                  <span className="text-[20px] text-[#a78bfa]/40">❖</span>
                </div>
                <p className="text-[14px] font-bold text-white leading-snug">Cross-session agent memory</p>
                <p className="mt-2 text-[11px] leading-[1.7] text-[#374151]">Every exchange is written per (mentor, querier) and recalled before the next answer.</p>
              </div>
            </div>
          </FadeIn>

          {/* Atoma */}
          <FadeIn delay={320}>
            <div className="group relative h-full min-h-[160px] overflow-hidden rounded-2xl border border-[#141a1f] bg-[#07060e] p-6 transition-all hover:border-[rgba(255,107,107,0.25)]">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(255,107,107,0.1) 0%, transparent 65%)" }}/>
              <div className="relative z-10">
                <div className="mb-4 flex items-start justify-between">
                  <span className="text-[10px] font-extrabold tracking-[0.2em] text-[#ff6b6b]">ATOMA</span>
                  <span className="text-[20px] text-[#ff6b6b]/40">✦</span>
                </div>
                <p className="text-[14px] font-bold text-white leading-snug">Confidential TEE inference</p>
                <p className="mt-2 text-[11px] leading-[1.7] text-[#374151]">Architected for Atoma's attested network; swappable to an OpenRouter dev fallback — never reports a fake attestation.</p>
              </div>
            </div>
          </FadeIn>

        </div>

        <FadeIn delay={400}>
          <div className="mt-3 rounded-lg border border-[rgba(45,212,191,0.12)] bg-[rgba(45,212,191,0.03)] p-4">
            <p className="text-[10px] font-extrabold tracking-[0.2em] text-[#2dd4bf]/70">INVARIANT</p>
            <p className="mt-1 text-[11px] text-[#4b5563] leading-[1.6]">&ldquo;No party — not even Tacit's own backend — ever holds a master decryption key.&rdquo;</p>
          </div>
        </FadeIn>
      </section>

      {/* ── Final CTA — full-bleed bold ── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl border border-[rgba(45,212,191,0.1)] bg-[#050d0b]">
            <div className="absolute inset-0 opacity-12"><Aurora colorStops={["#050d0b","#0c3530","#050d0b"]} amplitude={0.7} blend={0.3} speed={0.25}/></div>
            <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-[#2dd4bf]/[0.03] to-transparent"/>

            <div className="relative z-10 px-10 py-16 md:px-16 md:py-20">
              <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="mb-4 text-[10px] font-extrabold uppercase tracking-[0.35em] text-[#2dd4bf]/40">Sui Overflow 2026 · Walrus Track</p>
                  <h2 className="text-[clamp(30px,4.5vw,60px)] font-extrabold leading-[1.08] tracking-tight text-white">
                    Your knowledge<br/>
                    <span className="text-[#2dd4bf]">is an asset.</span>
                  </h2>
                  <p className="mt-5 max-w-sm text-[14px] leading-[1.75] text-[#4b5563]">
                    Live on Sui testnet. The first market for knowledge that stays permanently private — and remembers you.
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-3">
                  <Link href="/marketplace" className="flex items-center justify-center gap-2.5 rounded-xl bg-[#2dd4bf] px-10 py-4 text-[13px] font-extrabold tracking-[0.12em] text-black shadow-[0_0_50px_rgba(45,212,191,0.2)] hover:shadow-[0_0_80px_rgba(45,212,191,0.4)] transition-all">
                    OPEN MARKETPLACE <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </Link>
                  <a href="https://github.com/faisalganteng1265/Tacit" target="_blank" rel="noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-[#1a2028] px-10 py-4 text-[13px] font-bold tracking-[0.1em] text-[#4b5563] hover:border-[#2a3038] hover:text-white transition-all">
                    VIEW SOURCE
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[#0a0e12] px-6 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <span className="text-[14px] font-extrabold tracking-[0.22em] text-white">TAC<span className="text-[#2dd4bf]">IT</span></span>
          <p className="text-[10px] tracking-[0.1em] text-[#1f2937]">© 2026 TACIT · POWERED BY SUI + WALRUS + SEAL · MIT</p>
          <div className="flex gap-6">
            {["GITHUB","SUI EXPLORER","DOCS"].map(l => (
              <button key={l} className="text-[10px] font-bold tracking-[0.12em] text-[#1f2937] hover:text-[#4b5563] transition-colors">{l}</button>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
