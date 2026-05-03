type PageKind = "mentors" | "shares" | "gaps" | "earnings" | "security";

interface MentorWorkspaceMockProps {
  kind: PageKind;
}

const panelClass =
  "border border-[rgba(96,165,250,0.24)] bg-[rgba(5,12,15,0.78)] shadow-[inset_0_1px_0_rgba(255,255,255,0.04),0_0_26px_rgba(45,212,191,0.06)]";
const subtleButtonClass =
  "cursor-pointer rounded border border-[rgba(96,165,250,0.28)] bg-[rgba(5,12,15,0.58)] font-mono font-bold tracking-[0.1em] text-[#8f9cac]";
const accentButtonClass =
  "cursor-pointer rounded border border-[rgba(45,212,191,0.62)] bg-[rgba(45,212,191,0.08)] font-mono font-bold tracking-[0.1em] text-[#2dd4bf] shadow-[0_0_16px_rgba(45,212,191,0.08)]";
const solidAccentBtn =
  "cursor-pointer rounded bg-[linear-gradient(90deg,#2dd4bf,#22d3ee)] font-mono font-bold tracking-[0.14em] text-[#021011] shadow-[0_0_22px_rgba(45,212,191,0.26)]";

const pageCopy = {
  mentors: {
    title: "Mentor Studio",
    description:
      "Draft, package, and maintain private expert playbooks before the 0G Storage and TEE integration is connected.",
    eyebrow: "EXPERT WORKSPACE",
  },
  shares: {
    title: "My Access Shares",
    description:
      "Track your curator stakes, earnings, and performance across AI Mentors. Monitor rewards, yield, and portfolio growth in real time.",
    eyebrow: "CURATOR PORTFOLIO",
  },
  gaps: {
    title: "Gap Reports",
    description:
      "Identify blind spots and low-confidence answers from mentors to prioritize knowledge updates and improve answer quality.",
    eyebrow: "CONFIDENCE ORACLE",
  },
  earnings: {
    title: "Earnings",
    description:
      "Royalty, curator rewards, vesting, and platform fees across your mentors and packages.",
    eyebrow: "REVENUE FLOW",
  },
  security: {
    title: "Security Logs",
    description:
      "Track encrypted storage, enclave inference, access checks, TEE attestations, and e-sign audit references across the network.",
    eyebrow: "TEE AUDIT TRAIL",
  },
} satisfies Record<PageKind, { title: string; description: string; eyebrow: string }>;

function MentorsView() {
  const mentors = [
    {
      name: "IndoRegulator_01",
      status: "DRAFT" as const,
      category: "Regulatory Playbook",
      categoryColor: "#4ade80",
      description: "Cross-border regulatory frameworks, licensing paths, and compliance models.",
      docs: 78,
      gaps: 12,
      confidence: 88,
      updatedAgo: "2h ago",
      version: "v0.3.2",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDmEXNoAf-cmrKUiwhuPOpaf-1mlPbR4cehM2rReUiOo2pR5YTe2Y_fOieBJYQw_jjpObE2rUSUeNDpZXLLkfqIKq9eDx6Fq3naaIJ6NOUdh6TvXdSpR1mBGR9lbNuKz4l-ipSme9cTTlN69LdjblpvS-GdoEpVRO9MKyUXZf-pgQ2gP1ewqG9FgLo7t-LG4nmGXSCJbKBwUhTzVhejUHG9tF_1qCcdCRUc30KxL-C4qKOU2qD6qXSfUOcieWVkEwOxSK5b6CoRPc0",
    },
    {
      name: "ExportOps_APAC",
      status: "REVIEW" as const,
      category: "Cross-border Operations",
      categoryColor: "#2dd4bf",
      description: "Export compliance, customs, and logistics operations across APAC.",
      docs: 31,
      gaps: 4,
      confidence: 76,
      updatedAgo: "1d ago",
      version: "v0.2.1",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDwHax8-ONwCEu5RCRFNZaHEf3vFl3ZmHbQAdSZaM4Elv2YyMCoTOc0FZznxMitJ7LYmW39c3plK3Z8ehgMMV-ZK1-gKG21Qvd88ybTMVAgcJNZ61EUyP1Rzts6Af1PoKNP3L2pCYv1dXU_CpwzBY0H7T9WSL1UOwc4J795T3fNLfTee_C1ACovI8R5NBnWJ869DYe0pPkbhyIkST18eVEFU5SXJdxPbakmqDidBwNJorTZNOftAcjn4GlJ0zGc6U-ZcNNl5BltlBc",
    },
    {
      name: "DeFiTax_Advisor",
      status: "READY" as const,
      category: "Crypto Tax Tactics",
      categoryColor: "#2dd4bf",
      description: "On-chain tax strategies, reporting frameworks, and audit defenses.",
      docs: 19,
      gaps: 0,
      confidence: 96,
      updatedAgo: "3d ago",
      version: "v1.0.0",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDwHax8-ONwCEu5RCRFNZaHEf3vFl3ZmHbQAdSZaM4Elv2YyMCoTOc0FZznxMitJ7LYmW39c3plK3Z8ehgMMV-ZK1-gKG21Qvd88ybTMVAgcJNZ61EUyP1Rzts6Af1PoKNP3L2pCYv1dXU_CpwzBY0H7T9WSL1UOwc4J795T3fNLfTee_C1ACovI8R5NBnWJ869DYe0pPkbhyIkST18eVEFU5SXJdxPbakmqDidBwNJorTZNOftAcjn4GlJ0zGc6U-ZcNNl5BltlBc",
    },
  ];

  const statusBadge: Record<"DRAFT" | "REVIEW" | "READY", string> = {
    DRAFT: "border-[#374151] bg-[#111317] text-[#9ca3af]",
    REVIEW: "border-[rgba(251,191,36,0.35)] bg-[rgba(251,191,36,0.08)] text-[#fbbf24]",
    READY: "border-[rgba(45,212,191,0.3)] bg-[rgba(45,212,191,0.08)] text-[#2dd4bf]",
  };

  const tagPill =
    "flex items-center gap-1 rounded border border-[rgba(96,165,250,0.12)] bg-[rgba(255,255,255,0.035)] px-2 py-0.5 text-[9px] text-[#66717f]";

  const mintSteps = [
    { n: 1, label: "PACKAGE", value: "Select a knowledge package", valueClass: "text-[#4b5563]", dropdown: true },
    { n: 2, label: "MENTOR SHARE", value: "50%", valueClass: "text-white" },
    { n: 3, label: "CURATOR POOL", value: "50%", valueClass: "text-white" },
    { n: 4, label: "TEE MODE", value: "ENFORCED", valueClass: "text-[#2dd4bf]", checkmark: true },
    { n: 5, label: "ATTESTATION STATUS", value: "⚠ 3 pending", valueClass: "text-[#fbbf24]", link: true },
  ];

  const recentActivity = [
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <rect x="2" y="1" width="8" height="11" rx="1" stroke="#6b7280" strokeWidth="1.1" />
          <line x1="4" y1="5" x2="8" y2="5" stroke="#6b7280" strokeWidth="0.9" />
          <line x1="4" y1="7" x2="8" y2="7" stroke="#6b7280" strokeWidth="0.9" />
          <line x1="4" y1="9" x2="6.5" y2="9" stroke="#6b7280" strokeWidth="0.9" />
        </svg>
      ),
      title: "IndoRegulator_01 updated",
      detail: "12 files added • 3 gaps remaining",
      time: "2h ago",
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M9 2.5L11.5 5L5 11.5H2.5V9L9 2.5Z" stroke="#6b7280" strokeWidth="1.1" fill="none" />
          <path d="M7.5 4L10 6.5" stroke="#6b7280" strokeWidth="0.9" />
        </svg>
      ),
      title: "ExportOps_APAC e-sign requested",
      detail: "Awaiting 2 curator attestations",
      time: "1d ago",
    },
    {
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M7 1.5L8.5 5.5H12.5L9.5 7.8L10.5 12L7 9.8L3.5 12L4.5 7.8L1.5 5.5H5.5Z" stroke="#6b7280" strokeWidth="1.1" fill="none" />
        </svg>
      ),
      title: "DeFiTax_Advisor passed preview",
      detail: "Confidence improved to 96%",
      time: "3d ago",
    },
  ];

  return (
    <>
      {/* Stat cards */}
      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {/* Knowledge Vault Files */}
        <div className={`${panelClass} rounded-[7px] p-4`}>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[7px] border border-[rgba(45,212,191,0.18)] bg-[rgba(45,212,191,0.12)] shadow-[0_0_18px_rgba(45,212,191,0.14)]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="3.5" y="2" width="9" height="13" rx="1.2" stroke="#2dd4bf" strokeWidth="1.2" />
                <line x1="5.5" y1="6" x2="10.5" y2="6" stroke="#2dd4bf" strokeWidth="1" />
                <line x1="5.5" y1="8.5" x2="10.5" y2="8.5" stroke="#2dd4bf" strokeWidth="1" />
                <line x1="5.5" y1="11" x2="8.5" y2="11" stroke="#2dd4bf" strokeWidth="1" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8b95a3]">Knowledge Vault Files</p>
              <p className="text-[22px] font-bold leading-none text-white">128</p>
              <div className="mt-1 flex items-center justify-between gap-4">
                <p className="shrink-0 text-[10px] text-[#707b89]">Encrypted &amp; stored</p>
                <svg viewBox="0 0 120 18" className="h-[14px] w-[72px] shrink-0" fill="none">
                  <path d="M0,13 C12,13 18,7 28,7 C38,7 43,15 53,15 C63,15 68,5 78,5 C88,5 93,11 103,11 C111,11 116,7 120,7" stroke="#2dd4bf" strokeWidth="1.4" strokeOpacity="0.45" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Avg Confidence */}
        <div className={`${panelClass} rounded-[7px] p-4`}>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[7px] border border-[rgba(45,212,191,0.18)] bg-[rgba(45,212,191,0.12)] shadow-[0_0_18px_rgba(45,212,191,0.14)]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 2.5C9 2.5 3 5 3 9.5C3 12.5 5.5 14.5 9 15.5C12.5 14.5 15 12.5 15 9.5C15 5 9 2.5 9 2.5Z" stroke="#2dd4bf" strokeWidth="1.2" fill="none" />
                <path d="M6.5 9L8.2 10.8L11.5 7" stroke="#2dd4bf" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8b95a3]">Avg Confidence</p>
              <p className="text-[22px] font-bold leading-none text-white">91.6%</p>
              <div className="mt-1 flex items-center justify-between gap-4">
                <p className="shrink-0 text-[10px] text-[#707b89]">Preview confidence</p>
                <div className="h-[3px] w-[86px] shrink-0 rounded-full bg-[#1f2937]">
                  <div className="h-[3px] rounded-full bg-[linear-gradient(90deg,#22d3ee,#2dd4bf)]" style={{ width: "91.6%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending E-Sign */}
        <div className={`${panelClass} rounded-[7px] p-4`}>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[7px] border border-[rgba(45,212,191,0.18)] bg-[rgba(45,212,191,0.12)] shadow-[0_0_18px_rgba(45,212,191,0.14)]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M11.5 3L15 6.5L7 14.5L3.5 14.5L3.5 11L11.5 3Z" stroke="#2dd4bf" strokeWidth="1.2" fill="none" />
                <path d="M9.5 5L13 8.5" stroke="#2dd4bf" strokeWidth="1" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8b95a3]">Pending E-Sign</p>
              <p className="text-[22px] font-bold leading-none text-white">3</p>
              <div className="mt-1 flex items-center justify-between gap-4">
                <p className="shrink-0 text-[10px] text-[#707b89]">Attestations pending</p>
                <svg viewBox="0 0 120 18" className="h-[14px] w-[72px] shrink-0" fill="none">
                  <path d="M0,9 C15,9 20,15 30,15 C40,15 45,4 55,4 C65,4 70,12 80,12 C90,12 96,7 106,7 C111,7 115,9 120,9" stroke="#fbbf24" strokeWidth="1.4" strokeOpacity="0.45" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Active Drafts */}
        <div className={`${panelClass} rounded-[7px] p-4`}>
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[7px] border border-[rgba(45,212,191,0.18)] bg-[rgba(45,212,191,0.12)] shadow-[0_0_18px_rgba(45,212,191,0.14)]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="3" y="12" width="12" height="2.5" rx="1" stroke="#2dd4bf" strokeWidth="1.1" />
                <rect x="3" y="7.5" width="12" height="2.5" rx="1" stroke="#2dd4bf" strokeWidth="1.1" />
                <rect x="3" y="3" width="12" height="2.5" rx="1" stroke="#2dd4bf" strokeWidth="1.1" />
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8b95a3]">Active Drafts</p>
              <p className="text-[22px] font-bold leading-none text-white">5</p>
              <div className="mt-1 flex items-center justify-between gap-4">
                <p className="shrink-0 text-[10px] text-[#707b89]">In progress</p>
                <svg viewBox="0 0 120 18" className="h-[14px] w-[72px] shrink-0" fill="none">
                  <path d="M0,11 C10,11 16,5 26,5 C36,5 41,13 51,13 C61,13 66,7 76,7 C86,7 91,13 101,13 C111,13 115,9 120,9" stroke="#2dd4bf" strokeWidth="1.4" strokeOpacity="0.45" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main grid: packages left, mint+activity right */}
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.36fr_1fr]">
        {/* Left: Knowledge Packages */}
        <div className={`${panelClass} rounded-[7px] p-4`}>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#8b95a3]">⬡</span>
              <h2 className="text-[13px] font-bold tracking-[0.05em] text-white">Mentor Knowledge Packages</h2>
            </div>
            <button className={`flex items-center gap-1.5 px-2.5 py-1 text-[10px] ${subtleButtonClass}`}>
              All Packages <span className="text-[10px]">▾</span>
            </button>
          </div>

          <div className="overflow-hidden rounded border border-[rgba(96,165,250,0.12)] bg-[rgba(3,8,10,0.36)]">
            {mentors.map((mentor) => (
              <div key={mentor.name} className="border-b border-[rgba(96,165,250,0.13)] p-3 last:border-b-0">
                <div className="grid gap-3 md:grid-cols-[72px_minmax(0,1fr)_270px]">
                  {/* Thumbnail */}
                  <div
                    className="h-[78px] w-full shrink-0 rounded border border-[rgba(96,165,250,0.25)] bg-[#071014] bg-cover bg-center shadow-[0_0_18px_rgba(45,212,191,0.08)]"
                    style={{ backgroundImage: `url(${mentor.image})` }}
                  />

                  {/* Text content */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex items-center gap-2">
                      <span className="text-xs font-bold text-white">{mentor.name}</span>
                      <span
                        className={`rounded-[3px] border px-1.5 py-0.5 text-[9px] font-bold tracking-[0.1em] ${statusBadge[mentor.status]}`}
                      >
                        {mentor.status}
                      </span>
                    </div>
                    <p className="mb-1 text-[10px] font-semibold" style={{ color: mentor.categoryColor }}>
                      {mentor.category}
                    </p>
                    <p className="mb-2 line-clamp-2 max-w-[390px] text-[10px] leading-[1.5] text-[#707b89]">
                      {mentor.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className={tagPill}>Updated {mentor.updatedAgo}</span>
                      <span className={tagPill}>
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="#6b7280" strokeWidth="1" strokeLinecap="round" />
                        </svg>
                        {mentor.version}
                      </span>
                      <span className={tagPill}>
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <rect x="2" y="4" width="5" height="4" rx="0.6" stroke="#6b7280" strokeWidth="0.9" />
                          <path d="M3 4V3C3 1.9 6 1.9 6 3V4" stroke="#6b7280" strokeWidth="0.9" />
                        </svg>
                        Private
                      </span>
                    </div>
                  </div>

                  {/* Right: stats + button + menu */}
                  <div className="flex shrink-0 items-center justify-end gap-4">
                    <div className="grid grid-cols-[44px_44px_92px] items-center gap-4">
                      <div className="text-center">
                        <p className="mb-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-[#586474]">DOCS</p>
                        <p className="text-[18px] font-bold text-white">{mentor.docs}</p>
                      </div>
                      <div className="text-center">
                        <p className="mb-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-[#586474]">GAPS</p>
                        <p className="text-[18px] font-bold text-white">{mentor.gaps}</p>
                      </div>
                      <div className="w-[62px]">
                        <p className="mb-0.5 text-[8px] font-bold uppercase tracking-[0.12em] text-[#586474]">CONFIDENCE</p>
                        <p className="mb-1 text-[18px] font-bold text-white">{mentor.confidence}%</p>
                        <div className="h-[3px] rounded-full bg-[#1f2937]">
                          <div className="h-[3px] rounded-full bg-[linear-gradient(90deg,#22d3ee,#2dd4bf)]" style={{ width: `${mentor.confidence}%` }} />
                        </div>
                      </div>
                    </div>
                    <button className={`whitespace-nowrap px-3 py-1.5 text-[9px] ${accentButtonClass}`}>
                      OPEN STUDIO
                    </button>
                    <span className="cursor-pointer text-base text-[#586474] hover:text-[#8b95a3]">⋮</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-center">
            <button className="text-[11px] font-semibold text-[#2dd4bf] hover:opacity-80">
              View all packages →
            </button>
          </div>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Mint New Mentor */}
          <div className={`${panelClass} rounded-[7px] p-4`}>
            <div className="mb-1 flex items-center gap-2">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <circle cx="7" cy="7" r="5.5" stroke="#6b7280" strokeWidth="1.1" />
                <circle cx="7" cy="7" r="2" stroke="#6b7280" strokeWidth="1" />
                <line x1="7" y1="1" x2="7" y2="2.5" stroke="#6b7280" strokeWidth="1" />
                <line x1="7" y1="11.5" x2="7" y2="13" stroke="#6b7280" strokeWidth="1" />
                <line x1="1" y1="7" x2="2.5" y2="7" stroke="#6b7280" strokeWidth="1" />
                <line x1="11.5" y1="7" x2="13" y2="7" stroke="#6b7280" strokeWidth="1" />
              </svg>
              <h2 className="text-[13px] font-bold tracking-[0.05em] text-white">Mint New Mentor</h2>
            </div>
            <p className="mb-4 text-[10px] text-[#6b7280]">
              Finalize your package and mint it as an on-chain mentor.
            </p>

            <div className="mb-4">
              {mintSteps.map((step) => (
                <div key={step.n} className="flex items-center gap-2.5 border-b border-[rgba(96,165,250,0.13)] py-2.5">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-[rgba(45,212,191,0.45)] bg-[rgba(45,212,191,0.09)] text-[9px] font-bold text-[#2dd4bf]">
                    {step.n}
                  </div>
                  <span className="flex-1 text-[9px] font-bold uppercase tracking-[0.12em] text-[#4b5563]">
                    {step.label}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-[10px] font-bold ${step.valueClass}`}>{step.value}</span>
                    {step.checkmark && (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <circle cx="6" cy="6" r="5" stroke="#2dd4bf" strokeWidth="1" />
                        <path d="M3.5 6L5.2 7.7L8.5 4" stroke="#2dd4bf" strokeWidth="1" strokeLinecap="round" />
                      </svg>
                    )}
                    {step.dropdown && <span className="text-[10px] text-[#4b5563]">▾</span>}
                    {step.link && (
                      <button className="text-[10px] font-semibold text-[#2dd4bf]">View</button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button className={`mb-2 flex w-full items-center justify-center gap-2 py-2.5 text-[10px] ${solidAccentBtn}`}>
              PREVIEW MINT FLOW <span className="text-base leading-none">›</span>
            </button>
            <button className={`flex w-full items-center justify-center gap-2 py-2.5 text-[10px] ${subtleButtonClass}`}>
              UPLOAD KNOWLEDGE
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                <path d="M5.5 7.5V2.5M5.5 2.5L3 5M5.5 2.5L8 5" stroke="#9ca3af" strokeWidth="1.1" strokeLinecap="round" />
                <line x1="2" y1="9" x2="9" y2="9" stroke="#9ca3af" strokeWidth="1.1" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          {/* Recent Activity */}
          <div className={`${panelClass} rounded-[7px] p-4`}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                  <path d="M7.5 1L4 7.5H6.5L5.5 12L9 5.5H6.5Z" stroke="#2dd4bf" strokeWidth="1.1" strokeLinejoin="round" fill="none" />
                </svg>
                <h2 className="text-[13px] font-bold tracking-[0.05em] text-white">Recent Activity</h2>
              </div>
              <button className="text-[10px] font-semibold text-[#2dd4bf]">View all</button>
            </div>

            <div className="flex flex-col gap-3">
              {recentActivity.map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded border border-[#2a2d32] bg-[#101215]">
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-semibold text-white">{item.title}</p>
                    <p className="text-[10px] leading-[1.5] text-[#6b7280]">{item.detail}</p>
                  </div>
                  <span className="shrink-0 text-[10px] text-[#4b5563]">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SharesView() {
  const sharePositions = [
    {
      mentor: "IndoRegulator_01",
      shares: "184 shares",
      portfolio: "26.9% of portfolio",
      price: "1,240 0G",
      change: "+14.2%",
      rewards: "42.8 0G",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDmEXNoAf-cmrKUiwhuPOpaf-1mlPbR4cehM2rReUiOo2pR5YTe2Y_fOieBJYQw_jjpObE2rUSUeNDpZXLLkfqIKq9eDx6Fq3naaIJ6NOUdh6TvXdSpR1mBGR9lbNuKz4l-ipSme9cTTlN69LdjblpvS-GdoEpVRO9MKyUXZf-pgQ2gP1ewqG9FgLo7t-LG4nmGXSCJbKBwUhTzVhejUHG9tF_1qCcdCRUc30KxL-C4qKOU2qD6qXSfUOcieWVkEwOxSK5b6CoRPc0",
    },
    {
      mentor: "QuantAlpha_7",
      shares: "61 shares",
      portfolio: "28.6% of portfolio",
      price: "3,890 0G",
      change: "+9.5%",
      rewards: "36.4 0G",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDwHax8-ONwCEu5RCRFNZaHEf3vFl3ZmHbQAdSZaM4Elv2YyMCoTOc0FZznxMitJ7LYmW39c3plK3Z8ehgMMV-ZK1-gKG21Qvd88ybTMVAgcJNZ61EUyP1Rzts6Af1PoKNP3L2pCYv1dXU_CpwzBY0H7T9WSL1UOwc4J795T3fNLfTee_C1ACovI8R5NBnWJ869DYe0pPkbhyIkST18eVEFU5SXJdxPbakmqDidBwNJorTZNOftAcjn4GlJ0zGc6U-ZcNNl5BltlBc",
    },
    {
      mentor: "CyberSec_V2",
      shares: "24 shares",
      portfolio: "17.2% of portfolio",
      price: "8,105 0G",
      change: "+4.1%",
      rewards: "28.7 0G",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC9hN7Aj8iDuVpi80ZyqSXqOofwILzZ4vWR6r2Y1XFYDb6v14RKB-NGZ5izd5lCKWGoar_4i3PibYHZLmzvVDY5LelKLD7jM6NeqaDjfgfhOI8VRi-jrRGoObVKf8cv5Si0_PsEY8lSLEbEDuv2KEv80bgXjfwtE2mQAlU5ajHb9cVgXzWmZxVZvVihmZvKMnoIQ2o2zRWPxOtGCVWFGG7jVV8F3crN16L8knqQs6E4GSUZFjjtjw9BMfJux0V3dGc26QWq8xOodc",
    },
  ];

  const rewards = [
    ["IndoRegulator_01 reward", "Weekly usage rewards distribution", "2h ago", "+12.4 OG", "cyan"],
    ["QuantAlpha_7 reward", "Weekly usage rewards distribution", "12h ago", "+9.7 OG", "yellow"],
    ["CyberSec_V2 reward", "Weekly usage rewards distribution", "1d ago", "+7.3 OG", "cyan"],
    ["IndoRegulator_01 reward", "Milestone bonus achieved", "2d ago", "+13.4 OG", "cyan"],
  ];

  const statCards = [
    { label: "Portfolio Value", value: "684K OG", detail: "Total share value", icon: "stack", stroke: "#2dd4bf" },
    { label: "Usage Rewards", value: "107.9 OG", detail: "Unclaimed rewards", icon: "shield", stroke: "#2dd4bf" },
    { label: "Active Mentors", value: "3", detail: "Mentors with exposure", icon: "users", stroke: "#2dd4bf" },
    { label: "Avg Yield", value: "11.4%", detail: "Weekly yield trend", icon: "percent", stroke: "#2dd4bf" },
  ];

  return (
    <div className="shares-reference">
      <div className="mb-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <div key={stat.label} className={`${panelClass} rounded-[7px] p-4`}>
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[rgba(45,212,191,0.3)] bg-[rgba(45,212,191,0.1)] shadow-[0_0_18px_rgba(45,212,191,0.16)]">
                {stat.icon === "stack" && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <ellipse cx="10" cy="5" rx="6" ry="2.5" stroke={stat.stroke} strokeWidth="1.4" />
                    <path d="M4 5V10C4 11.4 6.7 12.5 10 12.5C13.3 12.5 16 11.4 16 10V5" stroke={stat.stroke} strokeWidth="1.4" />
                    <path d="M4 10V15C4 16.4 6.7 17.5 10 17.5C13.3 17.5 16 16.4 16 15V10" stroke={stat.stroke} strokeWidth="1.4" />
                  </svg>
                )}
                {stat.icon === "shield" && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M10 2.5L16 5V9.5C16 13.2 13.6 16 10 17.5C6.4 16 4 13.2 4 9.5V5L10 2.5Z" stroke={stat.stroke} strokeWidth="1.4" />
                    <path d="M7.4 9.7L9.2 11.4L12.8 7.6" stroke={stat.stroke} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
                {stat.icon === "users" && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <circle cx="7.5" cy="7" r="2.5" stroke={stat.stroke} strokeWidth="1.4" />
                    <circle cx="13.5" cy="8" r="2" stroke={stat.stroke} strokeWidth="1.4" />
                    <path d="M3.5 16C4 13.5 5.5 12.2 7.5 12.2C9.5 12.2 11 13.5 11.5 16" stroke={stat.stroke} strokeWidth="1.4" strokeLinecap="round" />
                    <path d="M11.5 13.2C13.8 13 15.5 14 16.2 16" stroke={stat.stroke} strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                )}
                {stat.icon === "percent" && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 15L15 5" stroke={stat.stroke} strokeWidth="1.5" strokeLinecap="round" />
                    <circle cx="6.5" cy="6.5" r="2" stroke={stat.stroke} strokeWidth="1.3" />
                    <circle cx="13.5" cy="13.5" r="2" stroke={stat.stroke} strokeWidth="1.3" />
                  </svg>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8b95a3]">{stat.label}</p>
                <p className="text-[22px] font-bold leading-none text-white">{stat.value}</p>
                <div className="mt-1 flex items-center justify-between gap-4">
                  <p className="shrink-0 text-[10px] text-[#707b89]">{stat.detail}</p>
                  <svg viewBox="0 0 120 24" className="h-6 w-[82px] shrink-0" fill="none">
                    <path d="M0 18L8 17L14 10L20 16L27 13L33 15L40 9L48 13L55 7L62 12L70 10L78 5L86 17L94 12L101 14L110 8L120 10" stroke="#2dd4bf" strokeWidth="1.4" />
                    <path d="M0 24L0 18L8 17L14 10L20 16L27 13L33 15L40 9L48 13L55 7L62 12L70 10L78 5L86 17L94 12L101 14L110 8L120 10L120 24Z" fill="url(#shareSpark)" opacity="0.18" />
                    <defs>
                      <linearGradient id="shareSpark" x1="60" x2="60" y1="5" y2="24" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#2dd4bf" />
                        <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.25fr_1fr]">
        <div className={`${panelClass} rounded-[7px] p-4`}>
          <div className="mb-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[#2dd4bf]">▥</span>
                <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-white">Portfolio Performance</h2>
              </div>
              <p className="mt-1 pl-6 text-[10px] text-[#707b89]">Total portfolio value over time (OG)</p>
            </div>
            <div className="grid grid-cols-4 overflow-hidden rounded border border-[rgba(96,165,250,0.16)] text-[9px] font-bold">
              {["1W", "1M", "3M", "ALL"].map((range) => (
                <button key={range} className={`px-3 py-1.5 ${range === "1M" ? "bg-[rgba(45,212,191,0.1)] text-[#2dd4bf]" : "text-[#6b7280]"}`}>
                  {range}
                </button>
              ))}
            </div>
          </div>
          <svg viewBox="0 0 720 210" className="h-[210px] w-full" fill="none" preserveAspectRatio="none">
            {[30, 68, 106, 144, 182].map((y) => (
              <line key={y} x1="44" x2="705" y1={y} y2={y} stroke="rgba(96,165,250,0.12)" />
            ))}
            {["720K", "660K", "600K", "540K", "480K"].map((label, index) => (
              <text key={label} x="0" y={34 + index * 38} fill="#707b89" fontSize="11">{label}</text>
            ))}
            <path d="M45 172L66 158L78 128L92 144L110 139L126 132L142 141L162 126L180 121L196 103L214 98L232 78L252 101L272 113L292 99L312 90L334 91L352 116L374 111L394 94L414 99L432 88L452 84L470 74L490 88L508 70L528 39L548 22L568 30L586 16L608 22L628 16L650 7L672 3L690 12" stroke="#22d3ee" strokeWidth="3" strokeLinejoin="round" />
            <path d="M45 210L45 172L66 158L78 128L92 144L110 139L126 132L142 141L162 126L180 121L196 103L214 98L232 78L252 101L272 113L292 99L312 90L334 91L352 116L374 111L394 94L414 99L432 88L452 84L470 74L490 88L508 70L528 39L548 22L568 30L586 16L608 22L628 16L650 7L672 3L690 12L690 210Z" fill="url(#portfolioArea)" />
            <line x1="650" x2="650" y1="8" y2="187" stroke="#2dd4bf" strokeDasharray="3 3" opacity="0.5" />
            <circle cx="650" cy="7" r="5" fill="#2dd4bf" />
            <rect x="672" y="0" width="56" height="18" rx="4" fill="#2dd4bf" />
            <text x="681" y="13" fill="#06221f" fontSize="10" fontWeight="700">684K OG</text>
            {["Apr 22", "Apr 29", "May 6", "May 13", "May 20"].map((label, index) => (
              <text key={label} x={48 + index * 150} y="205" fill="#707b89" fontSize="11">{label}</text>
            ))}
            <defs>
              <linearGradient id="portfolioArea" x1="360" x2="360" y1="5" y2="210" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2dd4bf" stopOpacity="0.38" />
                <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className={`${panelClass} rounded-[7px] p-4`}>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[#2dd4bf]">◈</span>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-white">Allocation</h2>
          </div>
          <div className="grid items-center gap-5 md:grid-cols-[170px_1fr]">
            <div>
              <div className="relative mx-auto h-[160px] w-[160px] rounded-full bg-[conic-gradient(#14b8a6_0_54%,#facc15_54%_83%,#6d5bd0_83%_100%)] p-[22px] shadow-[0_0_34px_rgba(45,212,191,0.1)]">
                <div className="flex h-full w-full flex-col items-center justify-center rounded-full border border-[rgba(96,165,250,0.18)] bg-[#071014] text-center">
                  <span className="text-[18px] font-bold text-white">684K</span>
                  <span className="text-[13px] font-bold leading-none text-white">OG</span>
                  <span className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[#6b7280]">Total</span>
                </div>
              </div>
              <p className="mt-3 text-[10px] text-[#707b89]">Allocation by share value</p>
            </div>
            <div className="overflow-hidden rounded border border-[rgba(96,165,250,0.2)]">
              {[
                ["#14b8a6", "IndoRegulator_01", "370.7K OG", "54.2%"],
                ["#facc15", "QuantAlpha_7", "195.3K OG", "28.6%"],
                ["#6d5bd0", "CyberSec_V2", "117.6K OG", "17.2%"],
              ].map(([color, name, value, pct]) => (
                <div key={name} className="grid grid-cols-[14px_1fr_auto] items-center gap-3 border-b border-[rgba(96,165,250,0.15)] px-4 py-3 last:border-b-0">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                  <span>
                    <span className="block text-[11px] font-bold text-white">{name}</span>
                    <span className="text-[10px] text-[#707b89]">{value}</span>
                  </span>
                  <span className="text-[12px] font-bold text-white">{pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.55fr_0.78fr]">
        <div className={`${panelClass} rounded-[7px] p-4`}>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[#2dd4bf]">◇</span>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-white">Share Positions</h2>
          </div>
          <div className="grid grid-cols-[1.35fr_0.9fr_0.8fr_0.75fr_0.8fr_1fr] gap-3 border-b border-[rgba(96,165,250,0.16)] pb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#586474]">
            <span>Mentor</span><span>Position</span><span>Share Price</span><span>Weekly Change</span><span>Rewards</span><span>Action</span>
          </div>
          {sharePositions.map((row) => (
            <div key={row.mentor} className="grid grid-cols-[1.35fr_0.9fr_0.8fr_0.75fr_0.8fr_1fr] items-center gap-3 border-b border-[rgba(96,165,250,0.12)] py-3 text-[11px]">
              <div className="flex min-w-0 items-center gap-3">
                <div className="h-11 w-11 shrink-0 rounded border border-[rgba(96,165,250,0.25)] bg-cover bg-center" style={{ backgroundImage: `url(${row.image})` }} />
                <div className="min-w-0">
                  <p className="truncate font-bold text-white">{row.mentor}</p>
                  <span className="mt-1 inline-flex rounded border border-[rgba(45,212,191,0.35)] bg-[rgba(45,212,191,0.08)] px-1.5 py-0.5 text-[8px] font-bold text-[#2dd4bf]">ACTIVE</span>
                </div>
              </div>
              <div>
                <p className="font-bold text-white">{row.shares}</p>
                <p className="text-[10px] text-[#707b89]">{row.portfolio}</p>
              </div>
              <p className="font-bold text-white">{row.price}</p>
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#2dd4bf]">{row.change}</span>
                <svg viewBox="0 0 60 18" className="h-4 w-11" fill="none">
                  <path d="M0 9L6 12L12 10L18 13L24 8L30 10L36 7L42 8L48 4L54 5L60 2" stroke="#2dd4bf" strokeWidth="1.3" />
                </svg>
              </div>
              <div>
                <p className="font-bold text-white">{row.rewards}</p>
                <p className="text-[10px] text-[#707b89]">Available</p>
              </div>
              <div className="flex items-center gap-2">
                <button className={`px-3 py-1.5 text-[9px] ${accentButtonClass}`}>CLAIM</button>
                <button className={`px-3 py-1.5 text-[9px] ${subtleButtonClass}`}>MANAGE</button>
                <span className="text-[#586474]">⋮</span>
              </div>
            </div>
          ))}
          <p className="mt-3 text-[10px] text-[#707b89]">Showing 3 of 3 positions</p>
        </div>

        <div className={`${panelClass} rounded-[7px] p-4`}>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#2dd4bf]">◷</span>
              <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-white">Recent Reward Activity</h2>
            </div>
            <button className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#2dd4bf]">View all</button>
          </div>
          <div className="mb-4 flex flex-col gap-3">
            {rewards.map(([title, detail, time, amount, tone]) => (
              <div key={`${title}-${time}`} className="grid grid-cols-[36px_1fr_auto] items-center gap-3">
                <div className={`flex h-9 w-9 items-center justify-center rounded border ${tone === "yellow" ? "border-[rgba(250,204,21,0.32)] bg-[rgba(250,204,21,0.08)] text-[#facc15]" : "border-[rgba(45,212,191,0.32)] bg-[rgba(45,212,191,0.08)] text-[#2dd4bf]"}`}>
                  {tone === "yellow" ? "%" : "♙"}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-bold text-white">{title}</p>
                  <p className="truncate text-[10px] text-[#707b89]">{detail}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-[#707b89]">{time}</p>
                  <p className="text-[11px] font-bold text-[#2dd4bf]">{amount}</p>
                </div>
              </div>
            ))}
          </div>
          <button className={`flex w-full items-center justify-center gap-2 py-2.5 text-[10px] ${accentButtonClass}`}>
            VIEW ALL ACTIVITY <span className="text-base leading-none">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function GapsView() {
  const gaps = [
    ["OSS licensing for foreign-owned PMA", "IndoRegulator_01", "Compliance", "CRITICAL", "28%", "21", "2h ago", "High severity"],
    ["MiCA stablecoin reserve carve-out", "QuantAlpha_7", "Regulation", "HIGH", "41%", "9", "4h ago", "High severity"],
    ["Proxy upgrade incident pattern", "CyberSec_V2", "Security", "MEDIUM", "56%", "5", "6h ago", "Moderate severity"],
    ["Cross-chain bridge risk heuristics", "ChainIntel_3", "Security", "LOW", "72%", "7", "8h ago", "Low severity"],
    ["DAO treasury diversification models", "DeFiSage_01", "Finance", "LOW", "78%", "6", "10h ago", "Low severity"],
  ];

  const priorityTone: Record<string, string> = {
    CRITICAL: "border-red-500/40 bg-red-500/10 text-red-400",
    HIGH: "border-amber-400/40 bg-amber-400/10 text-amber-300",
    MEDIUM: "border-yellow-400/40 bg-yellow-400/10 text-yellow-300",
    LOW: "border-emerald-400/40 bg-emerald-400/10 text-emerald-300",
  };

  const severityColor: Record<string, string> = {
    CRITICAL: "#fb7185",
    HIGH: "#fb923c",
    MEDIUM: "#facc15",
    LOW: "#34d399",
  };

  return (
    <div className="gaps-reference">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-[1fr_0.8fr_1.08fr_1.4fr]">
        {[
          ["◎", "Total Open Gaps", "128", "↗ 18", "vs yesterday", "#2dd4bf"],
          ["△", "Critical Priority", "24", "18.7% of total", "", "#fb7185"],
          ["♧", "Avg Confidence Recovery", "+21.4%", "30d trend", "spark", "#2dd4bf"],
          ["♧", "Pending Reviews", "17", "Needs attention", "", "#2dd4bf"],
        ].map(([icon, label, value, detail, extra, color]) => (
          <div key={label} className={`${panelClass} rounded-[7px] p-4`}>
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border text-[20px]"
                style={{
                  borderColor: `${color}55`,
                  backgroundColor: `${color}14`,
                  color,
                  boxShadow: `0 0 22px ${color}22`,
                }}
              >
                {icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8b95a3]">{label}</p>
                <div className="flex items-end gap-4">
                  <p className="text-[24px] font-bold leading-none text-white">{value}</p>
                  {extra === "spark" ? (
                    <svg viewBox="0 0 130 34" className="h-8 flex-1" fill="none">
                      <path d="M0 28L10 25L18 16L28 20L38 8L48 18L58 11L68 19L78 15L88 4L98 16L108 18L118 13L130 4" stroke="#2dd4bf" strokeWidth="2" />
                      <path d="M0 34L0 28L10 25L18 16L28 20L38 8L48 18L58 11L68 19L78 15L88 4L98 16L108 18L118 13L130 4L130 34Z" fill="#2dd4bf" opacity="0.14" />
                    </svg>
                  ) : (
                    <span className={`text-[11px] font-bold ${label === "Total Open Gaps" ? "text-[#2dd4bf]" : "text-[#8b95a3]"}`}>{detail}</span>
                  )}
                </div>
                {extra !== "spark" && extra && <p className="mt-1 text-[10px] text-[#707b89]">{extra}</p>}
                {extra === "spark" && <p className="mt-1 text-[10px] text-[#707b89]">{detail}</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.95fr_0.95fr]">
        <div className={`${panelClass} rounded-[7px] p-4`}>
          <div className="mb-4">
            <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-white">Priority Gap Queue</h2>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {[
                  ["ALL", "128", "accent"],
                  ["CRITICAL", "24", "critical"],
                  ["IN REVIEW", "17", "warn"],
                  ["RESOLVED", "87", "good"],
                ].map(([label, count, tone]) => (
                  <button
                    key={label}
                    className={`rounded border border-[rgba(96,165,250,0.18)] bg-[rgba(255,255,255,0.025)] px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] ${
                      tone === "accent"
                        ? "text-[#2dd4bf]"
                        : tone === "critical"
                          ? "text-red-400"
                          : tone === "warn"
                            ? "text-amber-300"
                            : "text-emerald-300"
                    }`}
                  >
                    {label} <span className="ml-1 rounded bg-black/25 px-1">{count}</span>
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#586474]">SORT BY</span>
                <button className={`${subtleButtonClass} px-3 py-2 text-[10px]`}>Priority (High → Low)⌄</button>
                <button className={`${subtleButtonClass} px-3 py-2 text-[10px]`}>▽</button>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded border border-[rgba(96,165,250,0.14)]">
            <div className="grid grid-cols-[1.75fr_0.7fr_0.65fr_0.65fr_0.5fr_0.65fr_0.8fr_0.78fr] gap-3 bg-[rgba(255,255,255,0.025)] px-3 py-2 text-[8px] font-bold uppercase tracking-[0.12em] text-[#586474]">
              <span>Gap / Source</span><span>Category</span><span>Priority</span><span>Confidence</span><span>Queries</span><span>Last Updated</span><span>Severity</span><span>Actions</span>
            </div>
            {gaps.map(([title, mentor, category, priority, confidence, queries, updated, severity]) => {
              const numericConfidence = Number(confidence.replace("%", ""));
              return (
                <div key={title} className="grid grid-cols-[1.75fr_0.7fr_0.65fr_0.65fr_0.5fr_0.65fr_0.8fr_0.78fr] items-center gap-3 border-t border-[rgba(96,165,250,0.12)] px-3 py-3 text-[10px]">
                  <div className="flex min-w-0 items-center gap-3">
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border ${priority === "CRITICAL" ? "border-red-500/35 bg-red-500/10 text-red-400" : priority === "HIGH" || priority === "MEDIUM" ? "border-yellow-400/35 bg-yellow-400/10 text-yellow-300" : "border-emerald-400/35 bg-emerald-400/10 text-emerald-300"}`}>△</span>
                    <div className="min-w-0">
                      <p className="truncate font-bold text-white">{title}</p>
                      <p className="text-[#707b89]">{mentor}</p>
                    </div>
                  </div>
                  <span className="w-fit rounded border border-[rgba(96,165,250,0.16)] bg-[rgba(255,255,255,0.05)] px-2 py-1 text-[9px] font-bold text-[#9ca3af]">{category}</span>
                  <span className={`w-fit rounded border px-2 py-1 text-[9px] font-bold ${priorityTone[priority]}`}>{priority}</span>
                  <div className="flex items-center gap-2">
                    <div className="relative h-9 w-9 shrink-0 rounded-full" style={{ background: `conic-gradient(${severityColor[priority]} ${numericConfidence * 3.6}deg, rgba(96,165,250,0.14) 0deg)` }}>
                      <div className="absolute inset-[4px] flex items-center justify-center rounded-full bg-[#071014] text-[9px] font-bold text-white">{confidence}</div>
                    </div>
                  </div>
                  <span className="font-bold text-white">{queries}</span>
                  <span className="text-[#d1d5db]">{updated}</span>
                  <div>
                    <div className="mb-1 flex gap-1">
                      {[0, 1, 2, 3, 4].map((bar) => (
                        <span
                          key={bar}
                          className="h-1.5 w-4 rounded-full"
                          style={{ backgroundColor: bar < (priority === "CRITICAL" ? 5 : priority === "HIGH" ? 4 : priority === "MEDIUM" ? 3 : 5) ? severityColor[priority] : "rgba(96,165,250,0.14)" }}
                        />
                      ))}
                    </div>
                    <p className="text-[9px] text-[#707b89]">{severity}</p>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button className={`${accentButtonClass} px-2 py-1 text-[8px]`}>OPEN REPORT</button>
                    <button className="text-[9px] font-bold text-[#2dd4bf]">ASSIGN UPDATE</button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex items-center justify-between text-[10px] text-[#707b89]">
            <span>Showing 1-5 of 128 gaps</span>
            <div className="flex items-center gap-4">
              <span>‹</span>
              <span className="rounded border border-[#2dd4bf]/45 px-3 py-2 text-[#2dd4bf]">1</span>
              <span>2</span>
              <span>3</span>
              <span>...</span>
              <span>26</span>
              <span>›</span>
            </div>
            <button className={`${subtleButtonClass} px-3 py-2 text-[10px]`}>5 / page ⌄</button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className={`${panelClass} rounded-[7px] p-4`}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-white">Oracle Signals</h2>
                <span className="text-[#707b89]">⊙</span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#707b89]">30D Trend</span>
            </div>
            {[
              ["◎", "Retrieval Match", "64%"],
              ["♧", "Self-Eval Confidence", "71%"],
              ["♧", "Source Freshness", "39%"],
              ["⌁", "Mentor Response SLA", "18h"],
              ["✥", "Citation Coverage", "58%"],
            ].map(([icon, label, value]) => (
              <div key={label} className="mb-3 grid grid-cols-[22px_1fr_115px_42px_54px] items-center gap-2 text-[11px]">
                <span className="text-[#9ca3af]">{icon}</span>
                <span className="text-[#d1d5db]">{label}</span>
                <div className="h-[5px] rounded-full bg-[rgba(96,165,250,0.14)]">
                  <div className="h-[5px] rounded-full bg-[#2dd4bf]" style={{ width: value === "18h" ? "50%" : value }} />
                </div>
                <span className="text-right font-bold text-white">{value}</span>
                <svg viewBox="0 0 54 18" className="h-4 w-[54px]" fill="none">
                  <path d="M0 11L5 8L10 13L15 4L20 10L25 6L30 13L35 5L40 10L45 4L54 8" stroke="#2dd4bf" strokeWidth="1.2" />
                </svg>
              </div>
            ))}
            <button className={`mt-2 w-full py-2 text-[10px] ${accentButtonClass}`}>VIEW SIGNAL DETAILS</button>
          </div>

          <div className={`${panelClass} rounded-[7px] p-4`}>
            <h2 className="mb-4 text-[13px] font-bold uppercase tracking-[0.08em] text-white">Recommended Actions</h2>
            {[
              ["Update IndoRegulator_01 knowledge base", "Resolve 21 critical queries", "CRITICAL", "Unassigned"],
              ["Refresh MiCA regulatory sources", "Improve source freshness", "HIGH", "QuantAlpha_7"],
              ["Review proxy incident runbook", "Add recent attack patterns", "MEDIUM", "CyberSec_V2"],
              ["Expand cross-chain risk dataset", "Add new bridge exploit data", "LOW", "ChainIntel_3"],
            ].map(([title, detail, priority, owner]) => (
              <div key={title} className="mb-2 grid grid-cols-[24px_1fr_auto] items-center gap-3 rounded border border-[rgba(96,165,250,0.1)] bg-[rgba(255,255,255,0.025)] px-3 py-2">
                <span className={`flex h-6 w-6 items-center justify-center rounded-full border ${priorityTone[priority]}`}>△</span>
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-bold text-white">{title}</p>
                  <p className="truncate text-[9px] text-[#707b89]">{detail}</p>
                </div>
                <div className="text-right">
                  <span className={`rounded border px-2 py-0.5 text-[8px] font-bold ${priorityTone[priority]}`}>{priority}</span>
                  <p className="mt-1 text-[9px] text-[#707b89]">{owner}</p>
                </div>
              </div>
            ))}
            <button className={`mt-2 w-full py-2 text-[10px] ${accentButtonClass}`}>VIEW ALL ACTIONS (17) →</button>
          </div>

          <div className={`${panelClass} rounded-[7px] p-4`}>
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-white">Recent Activity</h2>
              <button className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#2dd4bf]">View all</button>
            </div>
            {[
              ["IndoRegulator_01 gap marked as In Review", "2h ago"],
              ["MiCA stablecoin sources refreshed", "4h ago"],
              ["CyberSec_V2 update published", "6h ago"],
              ["ChainIntel_3 assigned 3 new gaps", "8h ago"],
            ].map(([title, time]) => (
              <div key={title} className="mb-2 flex items-center justify-between gap-3 text-[10px]">
                <span className="truncate text-[#d1d5db]">⊙ {title}</span>
                <span className="shrink-0 text-[#707b89]">{time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function EarningsView() {
  const statCards = [
    ["◎", "Gross Revenue", "12,840 OG", "Subscription + pay-per-query", "▲ 12.4% vs last 30 days"],
    ["♕", "Mentor Royalty", "7,704 OG", "Lifetime royalty share", "▲ 9.8% vs last 30 days"],
    ["♣", "Curator Pool", "3,210 OG", "Pro-rata usage rewards", "▲ 7.2% vs last 30 days"],
    ["▱", "Platform Fee", "1,926 OG", "Operational fee allocation", "▲ 5.4% vs last 30 days"],
  ];

  const vestingRows = [
    ["IndoRegulator_01", "Regulatory Watchdog", "18 days", "Jun 18, 2026", "2,910 OG", "65%"],
    ["ExportOps_APAC", "APAC Trade Intelligence", "24 days", "Jun 24, 2026", "1,108 OG", "42%"],
    ["DeFiTax_Advisor", "Defi Tax Optimizer", "7 days", "Jun 7, 2026", "842 OG", "83%"],
    ["AuditGuardian_Pro", "Onchain Audit Monitor", "36 days", "Jul 6, 2026", "654 OG", "28%"],
  ];

  return (
    <div className="earnings-reference">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map(([icon, label, value, detail, trend]) => (
          <div key={label} className={`${panelClass} rounded-[7px] p-4`}>
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#2dd4bf]/35 bg-[#2dd4bf]/10 text-[22px] text-[#2dd4bf] shadow-[0_0_24px_rgba(45,212,191,0.16)]">
                {icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8b95a3]">{label}</p>
                <p className="text-[22px] font-bold leading-none text-white">{value}</p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-[10px] text-[#707b89]">{detail}</p>
                    <p className="mt-1 text-[9px] font-bold text-[#2dd4bf]">{trend}</p>
                  </div>
                  <svg viewBox="0 0 120 44" className="h-11 w-[88px] shrink-0" fill="none">
                    <path d="M0 30L8 26L16 34L24 31L32 22L40 18L48 12L56 16L64 28L72 20L80 17L88 7L96 3L104 12L112 24L120 15" stroke="#2dd4bf" strokeWidth="2" />
                    <path d="M0 44L0 30L8 26L16 34L24 31L32 22L40 18L48 12L56 16L64 28L72 20L80 17L88 7L96 3L104 12L112 24L120 15L120 44Z" fill="#2dd4bf" opacity="0.18" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 xl:grid-cols-[1.35fr_0.86fr_0.42fr]">
        <div className={`${panelClass} rounded-[7px] p-4`}>
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-[#8b95a3]">↯</span>
              <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-white">Revenue Overview</h2>
            </div>
            <div className="flex items-center gap-2">
              {["1W", "1M", "3M", "ALL"].map((range) => (
                <button key={range} className={`rounded border border-[rgba(96,165,250,0.14)] px-2.5 py-1.5 text-[9px] font-bold ${range === "1M" ? "bg-[#2dd4bf]/10 text-[#2dd4bf]" : "text-[#707b89]"}`}>
                  {range}
                </button>
              ))}
              <button className={`${subtleButtonClass} px-2 py-1 text-[10px]`}>▣</button>
            </div>
          </div>
          <svg viewBox="0 0 700 260" className="h-[260px] w-full" fill="none" preserveAspectRatio="none">
            {[42, 84, 126, 168, 210].map((y) => (
              <line key={y} x1="42" x2="602" y1={y} y2={y} stroke="rgba(96,165,250,0.12)" />
            ))}
            {["0G", "1.6K", "1.2K", "800", "400", "0"].map((label, i) => (
              <text key={label} x="0" y={28 + i * 42} fill="#707b89" fontSize="11">{label}</text>
            ))}
            <path d="M42 190L60 150L78 142L96 160L116 176L136 184L156 178L176 190L196 154L216 104L236 122L256 98L276 91L296 80L316 42L336 24L356 52L376 39L396 31L416 18L436 62L456 106L476 129L496 151L516 132L536 115L556 108L576 98L596 135L616 101L636 87L656 76L676 113L696 42" stroke="#2dd4bf" strokeWidth="3" />
            <path d="M42 232L42 190L60 150L78 142L96 160L116 176L136 184L156 178L176 190L196 154L216 104L236 122L256 98L276 91L296 80L316 42L336 24L356 52L376 39L396 31L416 18L436 62L456 106L476 129L496 151L516 132L536 115L556 108L576 98L596 135L616 101L636 87L656 76L676 113L696 42L696 232Z" fill="url(#earningArea)" />
            <circle cx="696" cy="42" r="5" fill="#2dd4bf" />
            <text x="616" y="38" fill="#2dd4bf" fontSize="11" fontWeight="700">CURRENT</text>
            <text x="616" y="62" fill="white" fontSize="13" fontWeight="700">12,840 OG</text>
            <text x="616" y="84" fill="#2dd4bf" fontSize="11" fontWeight="700">▲ 12.4%</text>
            {["Apr 27", "May 4", "May 11", "May 18", "May 25", "May 31"].map((label, index) => (
              <text key={label} x={46 + index * 112} y="252" fill="#707b89" fontSize="11">{label}</text>
            ))}
            <defs>
              <linearGradient id="earningArea" x1="360" x2="360" y1="18" y2="232" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2dd4bf" stopOpacity="0.32" />
                <stop offset="1" stopColor="#2dd4bf" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <div className={`${panelClass} rounded-[7px] p-4`}>
          <div className="mb-5 flex items-center gap-2">
            <span className="text-[#8b95a3]">◔</span>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-white">Revenue Split</h2>
          </div>
          <div className="grid items-center gap-5 md:grid-cols-[170px_1fr]">
            <div className="relative h-[170px] w-[170px] rounded-full bg-[conic-gradient(#2dd4bf_0_60%,#67e8f9_60%_85%,#475569_85%_100%)] p-[28px]">
              <div className="flex h-full w-full flex-col items-center justify-center rounded-full bg-[#071014] text-center">
                <span className="text-[18px] font-bold text-white">12,840</span>
                <span className="text-[13px] font-bold text-white">OG</span>
                <span className="mt-1 text-[9px] uppercase tracking-[0.12em] text-[#707b89]">Total</span>
              </div>
            </div>
            <div>
              {[
                ["#2dd4bf", "Mentor royalty", "7,704 OG", "60%"],
                ["#67e8f9", "Curator rewards", "3,210 OG", "25%"],
                ["#64748b", "Platform fee", "1,926 OG", "15%"],
              ].map(([color, label, value, pct]) => (
                <div key={label} className="grid grid-cols-[14px_1fr_auto] items-center gap-3 border-b border-[rgba(96,165,250,0.14)] py-3 last:border-b-0">
                  <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                  <span>
                    <span className="block text-[11px] text-[#d1d5db]">{label}</span>
                    <span className="text-[10px] text-[#707b89]">{value}</span>
                  </span>
                  <span className="text-[12px] font-bold text-white">{pct}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-5 text-[10px] text-[#707b89]">Distribution based on protocol rules and usage.</p>
        </div>

        <div className={`${panelClass} overflow-hidden rounded-[7px]`}>
          <div className="border-b border-[#2dd4bf]/30 bg-[rgba(45,212,191,0.035)] p-4">
            <div className="mb-8 flex items-center gap-2 text-[#2dd4bf]">
              <span className="text-[18px]">▣</span>
              <h2 className="text-[12px] font-bold uppercase tracking-[0.12em]">Claimable Rewards</h2>
            </div>
            <p className="text-center text-[26px] font-bold text-white">842 OG</p>
            <p className="mt-3 text-center text-[11px] text-[#d1d5db]">Available to claim</p>
          </div>
          <div className="p-4">
            <p className="mb-5 text-center text-[11px] leading-[1.6] text-[#8b95a3]">Includes vested allocations ready for withdrawal.</p>
            <button className={`flex w-full items-center justify-center gap-2 py-2.5 text-[10px] ${solidAccentBtn}`}>CLAIM REWARDS <span className="text-base leading-none">›</span></button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className={`${panelClass} rounded-[7px] p-4`}>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[#8b95a3]">▢</span>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-white">Vesting Queue</h2>
          </div>
          <div className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.8fr_0.45fr] gap-3 border-b border-[rgba(96,165,250,0.14)] pb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#586474]">
            <span>Mentor / Package</span><span>Unlocks In</span><span>Amount</span><span>Progress</span><span>Claim Date</span>
          </div>
          {vestingRows.map(([mentor, subtitle, unlock, date, amount, progress], index) => (
            <div key={mentor} className="grid grid-cols-[1.4fr_0.7fr_0.7fr_0.8fr_0.45fr] items-center gap-3 border-b border-[rgba(96,165,250,0.12)] py-3 text-[11px]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#2dd4bf]/35 bg-[#2dd4bf]/10 text-[#2dd4bf]">{["◈", "⬢", "⬡", "⛨"][index]}</div>
                <div>
                  <p className="font-bold text-white">{mentor}</p>
                  <p className="text-[10px] text-[#707b89]">{subtitle}</p>
                </div>
              </div>
              <div>
                <p className="font-bold text-white">{unlock}</p>
                <p className="text-[10px] text-[#707b89]">{date}</p>
              </div>
              <p className="font-bold text-white">{amount}</p>
              <div className="flex items-center gap-3">
                <div className="h-[6px] flex-1 rounded-full bg-[rgba(96,165,250,0.14)]">
                  <div className="h-[6px] rounded-full bg-[#2dd4bf]" style={{ width: progress }} />
                </div>
                <span className="text-[10px] text-[#d1d5db]">{progress}</span>
              </div>
              <span className="text-center text-[#707b89]">-</span>
            </div>
          ))}
          <button className="mt-4 flex w-full items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#2dd4bf]">VIEW ALL VESTING <span>›</span></button>
        </div>

        <div className={`${panelClass} rounded-[7px] p-4`}>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[#8b95a3]">⌁</span>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-white">Recent Payout Activity</h2>
          </div>
          <div className="grid grid-cols-[1fr_1fr_0.6fr_0.7fr] gap-3 border-b border-[rgba(96,165,250,0.14)] pb-2 text-[9px] font-bold uppercase tracking-[0.12em] text-[#586474]">
            <span>Event</span><span>Source</span><span>Time</span><span className="text-right">Amount</span>
          </div>
          {[
            ["♕", "Mentor Royalty", "IndoRegulator_01", "2h ago", "+412 OG"],
            ["♧", "Curator Reward", "ExportOps_APAC", "5h ago", "+231 OG"],
            ["♕", "Mentor Royalty", "DeFiTax_Advisor", "1d ago", "+318 OG"],
            ["◎", "Platform Fee Allocation", "Protocol", "1d ago", "+147 OG"],
            ["♧", "Curator Reward", "AuditGuardian_Pro", "2d ago", "+164 OG"],
          ].map(([icon, event, source, time, amount]) => (
            <div key={`${event}-${source}-${time}`} className="grid grid-cols-[1fr_1fr_0.6fr_0.7fr] items-center gap-3 border-b border-[rgba(96,165,250,0.12)] py-3 text-[11px]">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#2dd4bf]/30 bg-[#2dd4bf]/10 text-[#2dd4bf]">{icon}</span>
                <span className="text-[#d1d5db]">{event}</span>
              </div>
              <span className="text-[#8b95a3]">{source}</span>
              <span className="text-[#8b95a3]">{time}</span>
              <span className="text-right font-bold text-[#2dd4bf]">{amount}</span>
            </div>
          ))}
          <button className="mt-4 flex w-full items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.12em] text-[#2dd4bf]">VIEW ALL ACTIVITY <span>›</span></button>
        </div>
      </div>
    </div>
  );
}

function SecurityView() {
  const logs = [
    ["⛨", "TEE_ATTESTED", "IndoRegulator_01 query session", "0x7F...91A2", "NODE_01", "VERIFIED", "2 min ago"],
    ["✎", "E_SIGN_REF", "Mentor consent package attached", "ESG-4491", "ESIGN_SVC", "INFO", "18 min ago"],
    ["▱", "STORAGE_COMMIT", "0G log archival hash pinned", "0xA1...CC04", "STORAGE_N1", "INFO", "41 min ago"],
    ["▣", "ACCESS_CHECK", "Subscriber pass validated", "0x09...88FE", "ACCESS_SVC", "LOW", "1 hr ago"],
    ["⇄", "INFT_TRANSFER_DRYRUN", "Ownership handoff proof simulated", "0x44...D902", "INFT_SVC", "LOW", "3 hr ago"],
    ["⬡", "ENCLAVE_BOOT", "TEE enclave boot verified", "0x2B...7EF1", "ENCLAVE_N1", "VERIFIED", "3 hr ago"],
    ["▤", "POLICY_UPDATE", "Access policy rule set updated", "POL-7731", "POLICY_SVC", "MEDIUM", "6 hr ago"],
    ["⌁", "KEY_ROTATION", "Data encryption key rotated", "0x8C...AA31", "KEY_MGR", "INFO", "9 hr ago"],
  ];

  const severityClass: Record<string, string> = {
    VERIFIED: "border-[#2dd4bf]/35 bg-[#2dd4bf]/10 text-[#2dd4bf]",
    INFO: "border-sky-400/35 bg-sky-400/10 text-sky-300",
    LOW: "border-emerald-400/35 bg-emerald-400/10 text-emerald-300",
    MEDIUM: "border-yellow-400/35 bg-yellow-400/10 text-yellow-300",
    HIGH: "border-red-400/35 bg-red-400/10 text-red-300",
  };

  return (
    <div className="security-reference">
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          ["⛨", "Audit Events", "12.8K", "↑ 18.4% vs last 24h", "#2dd4bf"],
          ["⛨", "TEE Verified", "99.2%", "↑ 0.6% vs last 24h", "#2dd4bf"],
          ["△", "Failed Checks", "7", "↓ -12.5% vs last 24h", "#ef4444"],
          ["◔", "Avg Response SLA", "142ms", "↓ -8.7% vs last 24h", "#2dd4bf"],
        ].map(([icon, label, value, trend, color]) => (
          <div key={label} className={`${panelClass} rounded-[7px] p-4`}>
            <div className="flex items-start gap-4">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded border text-[18px]"
                style={{ borderColor: `${color}55`, backgroundColor: `${color}14`, color }}
              >
                {icon}
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#8b95a3]">{label}</p>
                <p className="text-[24px] font-bold leading-none text-white">{value}</p>
                <div className="mt-2 flex items-end justify-between gap-4">
                  <p className="text-[10px] font-bold" style={{ color }}>{trend}</p>
                  <svg viewBox="0 0 100 42" className="h-10 w-[90px] shrink-0" fill="none">
                    <path d="M0 34L8 30L15 20L23 26L31 12L39 18L47 4L55 7L63 25L71 13L79 21L87 11L95 19L100 8" stroke={color} strokeWidth="2" />
                    <path d="M0 42L0 34L8 30L15 20L23 26L31 12L39 18L47 4L55 7L63 25L71 13L79 21L87 11L95 19L100 8L100 42Z" fill={color} opacity="0.16" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.75fr_0.65fr]">
        <div className={`${panelClass} rounded-[7px] p-4`}>
          <div className="mb-4 flex items-center gap-2">
            <span className="text-[#8b95a3]">⛨</span>
            <h2 className="text-[13px] font-bold uppercase tracking-[0.08em] text-white">Audit Event Stream</h2>
          </div>

          <div className="mb-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {["ALL", "TEE", "ACCESS", "STORAGE", "E-SIGN", "ALERTS"].map((tab) => (
                <button
                  key={tab}
                  className={`rounded border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.12em] ${
                    tab === "ALL"
                      ? "border-[#2dd4bf]/50 bg-[#2dd4bf]/10 text-[#2dd4bf]"
                      : "border-[rgba(96,165,250,0.18)] bg-[rgba(255,255,255,0.025)] text-[#8b95a3]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button className={`${subtleButtonClass} px-3 py-2 text-[10px]`}>▽ All Sources⌄</button>
              <button className={`${subtleButtonClass} px-3 py-2 text-[10px]`}>Sort: Newest⌄</button>
              <button className={`${subtleButtonClass} px-3 py-2 text-[10px]`}>☷</button>
            </div>
          </div>

          <div className="overflow-hidden rounded border border-[rgba(96,165,250,0.12)]">
            <div className="grid grid-cols-[1fr_1.55fr_0.78fr_0.72fr_0.66fr_0.65fr_0.56fr] gap-3 bg-[rgba(255,255,255,0.025)] px-3 py-2 text-[8px] font-bold uppercase tracking-[0.12em] text-[#586474]">
              <span>Event</span><span>Detail</span><span>Proof</span><span>Source</span><span>Severity</span><span>Time</span><span>Actions</span>
            </div>
            {logs.map(([icon, event, detail, proof, source, severity, time]) => (
              <div key={`${event}-${time}`} className="grid grid-cols-[1fr_1.55fr_0.78fr_0.72fr_0.66fr_0.65fr_0.56fr] items-center gap-3 border-t border-[rgba(96,165,250,0.12)] px-3 py-3 text-[10px]">
                <span className="flex items-center gap-2 font-bold text-[#2dd4bf]"><span>{icon}</span>{event}</span>
                <span className="truncate text-[#d1d5db]">{detail}</span>
                <span className="text-[#8b95a3]">{proof}</span>
                <span className="text-[#8b95a3]">{source}</span>
                <span className={`w-fit rounded border px-2 py-1 text-[8px] font-bold ${severityClass[severity]}`}>{severity}</span>
                <span className="text-[#8b95a3]">{time}</span>
                <span className="flex items-center gap-2">
                  <button className="rounded border border-[#2dd4bf]/35 px-2 py-1 text-[#2dd4bf]">⊙</button>
                  <button className="rounded border border-[#2dd4bf]/35 px-2 py-1 text-[#2dd4bf]">⌁</button>
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-[10px] text-[#8b95a3]">
            <span>Showing 1 to 10 of 234 events</span>
            <div className="flex items-center gap-3">
              <span className="rounded border border-[rgba(96,165,250,0.18)] px-3 py-2">‹</span>
              <span className="rounded border border-[#2dd4bf]/45 bg-[#2dd4bf]/20 px-3 py-2 text-[#2dd4bf]">1</span>
              <span className="rounded border border-[rgba(96,165,250,0.18)] px-3 py-2">2</span>
              <span className="rounded border border-[rgba(96,165,250,0.18)] px-3 py-2">3</span>
              <span>...</span>
              <span className="rounded border border-[rgba(96,165,250,0.18)] px-3 py-2">24</span>
              <span className="rounded border border-[rgba(96,165,250,0.18)] px-3 py-2">›</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Rows per page:</span>
              <button className={`${subtleButtonClass} px-4 py-2 text-[10px]`}>10⌄</button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className={`${panelClass} rounded-[7px] p-4`}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[#2dd4bf]">⌁</span>
                <h2 className="text-[13px] font-bold tracking-[0.05em] text-white">Security Signals</h2>
              </div>
              <button className="text-[10px] font-bold text-[#2dd4bf]">View All</button>
            </div>
            {[
              ["TEE Health", "99.3%"],
              ["Storage Integrity", "98.7%"],
              ["Access Compliance", "97.6%"],
              ["Signature Coverage", "96.1%"],
              ["Latency Trend (p95)", "142ms"],
            ].map(([label, value]) => (
              <div key={label} className="mb-3 grid grid-cols-[1fr_120px_42px] items-center gap-3 text-[10px]">
                <span className="text-[#d1d5db]">{label}</span>
                <div className="h-[5px] rounded-full bg-[rgba(96,165,250,0.16)]">
                  <div className="h-[5px] rounded-full bg-[#2dd4bf]" style={{ width: value === "142ms" ? "82%" : value }} />
                </div>
                <span className="text-right font-bold text-white">{value}</span>
              </div>
            ))}
            <div className="mt-3 flex justify-between text-[9px] text-[#707b89]">
              <span>0%</span><span>50%</span><span>100%</span>
            </div>
          </div>

          <div className={`${panelClass} rounded-[7px] p-4`}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-red-400">△</span>
                <h2 className="text-[13px] font-bold tracking-[0.05em] text-white">Critical Alerts</h2>
              </div>
              <button className="text-[10px] font-bold text-[#2dd4bf]">View All</button>
            </div>
            {[
              ["Failed access check spike", "HIGH", "ACCESS_SVC"],
              ["Storage integrity drift detected", "MEDIUM", "STORAGE_N1"],
              ["Signature coverage below 97%", "MEDIUM", "ESIGN_SVC"],
              ["Enclave uptime below threshold", "LOW", "ENCLAVE_N1"],
            ].map(([title, severity, source]) => (
              <div key={title} className="mb-3 grid grid-cols-[22px_1fr_auto_auto] items-center gap-2 text-[10px]">
                <span className={severity === "HIGH" ? "text-red-400" : severity === "MEDIUM" ? "text-yellow-300" : "text-emerald-300"}>△</span>
                <span className="truncate text-[#d1d5db]">{title}</span>
                <span className={`rounded border px-2 py-0.5 text-[8px] font-bold ${severityClass[severity]}`}>{severity}</span>
                <span className="text-[#8b95a3]">{source}</span>
              </div>
            ))}
          </div>

          <div className={`${panelClass} rounded-[7px] p-4`}>
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-[#2dd4bf]">☷</span>
                <h2 className="text-[13px] font-bold tracking-[0.05em] text-white">Recent Activity</h2>
              </div>
              <button className="text-[10px] font-bold text-[#2dd4bf]">View All</button>
            </div>
            <div className="relative pl-4">
              <div className="absolute left-[5px] top-2 h-[112px] w-px bg-[#2dd4bf]/50" />
              {[
                ["TEE attestation verified for NODE_01", "2 min ago"],
                ["Mentor consent package signed", "18 min ago"],
                ["Storage commit successful", "41 min ago"],
                ["Subscriber access validated", "1 hr ago"],
                ["Policy rule set updated", "6 hr ago"],
              ].map(([title, time]) => (
                <div key={title} className="relative mb-4 flex items-center justify-between gap-3 text-[10px]">
                  <span className="absolute -left-[14px] h-3 w-3 rounded-full bg-[#2dd4bf] shadow-[0_0_12px_rgba(45,212,191,0.6)]" />
                  <span className="truncate text-[#d1d5db]">{title}</span>
                  <span className="shrink-0 text-[#8b95a3]">{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MentorWorkspaceMock({ kind }: MentorWorkspaceMockProps) {
  const copy = pageCopy[kind];

  return (
    <div className={kind === "mentors" ? "mentor-studio-reference" : ""}>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="mb-2 text-[10px] font-bold tracking-[0.16em] text-[#2dd4bf]">{copy.eyebrow}</p>
          <h1 className="mb-2 text-2xl font-bold text-white">{copy.title}</h1>
          <p className="max-w-[560px] text-xs leading-[1.65] text-[#8b95a3]">{copy.description}</p>
        </div>
        <button className={`shrink-0 px-3 py-1.5 text-[10px] ${subtleButtonClass}`}>MOCK DATA</button>
      </div>

      {kind === "mentors" && <MentorsView />}
      {kind === "shares" && <SharesView />}
      {kind === "gaps" && <GapsView />}
      {kind === "earnings" && <EarningsView />}
      {kind === "security" && <SecurityView />}
    </div>
  );
}
