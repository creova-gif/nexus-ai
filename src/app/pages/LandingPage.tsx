import { Button } from "../components/ui/button";
import { useLocation } from "wouter";

export default function LandingPage() {
  const [, navigate] = useLocation();

  const audiences = [
    {
      emoji: "🏦",
      title: "Canadian Banks",
      desc: "Enterprise AML, compliance automation, personalized advisory, and fraud detection for retail and commercial banking operations — from the Big Six to credit unions.",
      tags: ["Big Six", "Credit Unions", "Neobanks"],
      accent: "brand",
    },
    {
      emoji: "🏛️",
      title: "Government of Canada",
      desc: "FINTRAC reporting, CDBA compliance infrastructure, inter-agency data sharing with consent management and immutable audit-grade logging for federal mandates.",
      tags: ["FINTRAC", "OSFI", "Bank of Canada"],
      accent: "gold",
    },
    {
      emoji: "⚡",
      title: "Fintechs & Financial Services",
      desc: "Open banking APIs, embedded finance rails, AI advisory modules — white-labeled and ready to integrate into any financial product or BaaS stack.",
      tags: ["Embedded Finance", "BaaS", "Wealthtech"],
      accent: "sky",
    },
  ];

  const features = [
    {
      num: "01 — AML & COMPLIANCE",
      title: "AI-Native Anti-Money Laundering",
      desc: "Graph-based network analysis surfaces hidden relationships across billions of transactions in real time. Explainable risk scores, automated alert triage, and one-click SAR generation built for FINTRAC and OSFI.",
      callout: "90–95% reduction in analyst workload. Every alert traceable, audit-ready, and explainable to regulators.",
    },
    {
      num: "02 — FINANCIAL ADVISORY",
      title: "Personalized Financial Intelligence",
      desc: "AI-generated spending insights, investment recommendations, and goal tracking — all human-led and fully explainable. The blended model Canadians actually trust: AI speed + human judgment at every critical decision.",
      callout: "Only 18% of Canadians trust AI alone for financial advice. NexusAI's HITL architecture closes that gap — permanently.",
    },
    {
      num: "03 — OPEN BANKING",
      title: "Consumer-Driven Banking Infrastructure",
      desc: "Full CDBA Phase 1 compliance with read-only data sharing via secure APIs. Phase 2-ready architecture for payment initiation and account switching — built ahead of the 2027 deadline.",
      callout: "Consent management, institution OAuth flows, aggregated account views, and financial health scoring — privacy-by-design at every layer.",
    },
    {
      num: "04 — CUSTOMER SUPPORT",
      title: "AI Support & Sentiment Engine",
      desc: "Context-aware AI handles tier-1 queries, escalates intelligently to human agents, and continuously scores sentiment across all customer interactions for proactive intervention before churn.",
      callout: "7% of Canadians switch banks over poor fraud response. Real-time sentiment alerts stop attrition before it starts.",
    },
    {
      num: "05 — GOVERNMENT & REGULATORY GRADE",
      title: "Audit Infrastructure Built for Federal Institutions",
      desc: "Full audit logging on every compliance action. FINTRAC SAR submissions, OSFI risk reporting, inter-agency data sharing with granular consent trails. Role-based access control enforced at every API boundary — Bank Admin, Compliance Officer, Financial Advisor, Retail Customer. Every action logged, timestamped, cryptographically attributable, and explainable. Government-grade security: all data encrypted in transit and at rest, JWT session management, tRPC-hardened APIs, zero-trust architecture ready.",
      callout: "",
      wide: true,
      hasRegBadges: true,
    },
  ];

  const regBadges = [
    { label: "FINTRAC", val: "SAR Filing & Reporting" },
    { label: "OSFI", val: "Risk Reporting" },
    { label: "CDBA", val: "Phase 1 + 2 Ready" },
    { label: "PCMLTFA", val: "Full Compliance" },
  ];

  const amlAlerts = [
    { name: "Structuring Pattern — Account #CA-4471", meta: "Royal Trust Branch • $49,800 × 3 transactions • 2h ago", score: "97", color: "coral" },
    { name: "Network Anomaly — 6-Node Ring", meta: "Graph detected shell co. cluster • Toronto ON • 4h ago", score: "92", color: "coral" },
    { name: "PEP Match — Unverified Source", meta: "Politically Exposed Person — wire origin unclear", score: "74", color: "amber" },
    { name: "Velocity Alert — Cross-border", meta: "12 transactions in 48h • CAD→USD→BTC pathway", score: "61", color: "amber" },
    { name: "SAR #2026-004 — Filed", meta: "FINTRAC • AI-drafted + officer reviewed", score: "✓", color: "brand" },
  ];

  const complianceChecks = [
    { title: "Graph-based transaction network analysis", desc: "Visualize and detect money laundering rings across accounts" },
    { title: "AI-powered risk scoring", desc: "Reduce false positives by 90% with explainable AI models" },
    { title: "Automated SAR filing", desc: "FINTRAC-ready reports with AI-drafted summaries + officer review" },
  ];

  const obPhases = [
    { num: "Phase 1", title: "Read Access", desc: "Consumer can share bank data with third parties", active: true },
    { num: "Phase 2", title: "Write Access", desc: "Third parties can initiate payments with consumer consent", active: false },
    { num: "Phase 3", title: "Product Comparison", desc: "Transparent pricing and product recommendations", active: false },
  ];

  const testimonials = [
    { name: "Sarah Chen", role: "Chief Compliance Officer", org: "RBC", initials: "SC", quote: "NexusAI reduced our AML false positive rate by 92%. The graph-based network analysis caught a shell company ring our legacy system missed for months.", accent: "brand" },
    { name: "Michael Rousseau", role: "VP of Regulatory Affairs", org: "TD Canada Trust", initials: "MR", quote: "After the 2024 penalties, we needed explainable AI that regulators could audit. NexusAI's SAR generator produces FINTRAC-ready reports with full decision trails.", accent: "gold" },
    { name: "Dr. Priya Sharma", role: "Director, Digital Banking", org: "Scotiabank", initials: "PS", quote: "The CDBA Phase 1 compliance was seamless. NexusAI's consent management and aggregated account views positioned us ahead of the 2027 deadline.", accent: "sky" },
  ];

  const pricingPlans = [
    { name: "STARTER", price: "$4,999", per: "/month", tag: "For credit unions and regional banks", features: ["Up to 50K transactions/mo", "Basic AML + KYC", "Email support", "Audit logging"], featured: false },
    { name: "PROFESSIONAL", price: "$14,999", per: "/month", tag: "For mid-sized banks and fintechs", features: ["Up to 500K transactions/mo", "Full compliance suite + SAR", "Priority support", "Network graph analysis", "Open Banking Phase 1"], featured: true },
    { name: "ENTERPRISE", price: "Custom", per: "", tag: "For Big Six and government", features: ["Unlimited transactions", "White-label deployment", "Dedicated CSM", "Custom integrations", "FINTRAC + OSFI reporting"], featured: false },
  ];

  const faqs = [
    { q: "Is NexusAI FINTRAC and OSFI compliant?", a: "Yes. NexusAI is built with Canadian regulatory frameworks at its core. All SAR filings are FINTRAC-ready, and our audit logging meets OSFI requirements for explainability and traceability." },
    { q: "How does the AI explainability work?", a: "Every risk score includes a natural language explanation of contributing factors (e.g., 'structuring pattern detected,' 'cross-border velocity anomaly'). Compliance officers can drill down into transaction graphs and see exactly why an alert was triggered." },
    { q: "What's the difference between Phase 1 and Phase 2 Open Banking?", a: "Phase 1 (2026) allows read-only access to customer banking data with consent. Phase 2 (2027) adds payment initiation and account switching. NexusAI supports Phase 1 today and is architected for Phase 2." },
    { q: "Can NexusAI integrate with our existing core banking system?", a: "Yes. NexusAI connects via REST APIs to systems like Temenos, FIS, and Oracle FLEXCUBE. We also support batch file imports (CSV, JSON) and direct database connectors for legacy systems." },
    { q: "How does pricing scale with transaction volume?", a: "Starter and Professional plans have monthly transaction caps. Enterprise customers get unlimited volume with a custom SLA. All plans include full access to compliance, advisory, and open banking modules." },
    { q: "What kind of support do you offer?", a: "Starter: Email support (24h SLA). Professional: Priority email + Slack (4h SLA). Enterprise: Dedicated CSM, phone support, and custom SLAs down to 1h for critical issues." },
  ];

  return (
    <div className="min-h-screen" style={{ background: "var(--bg)", fontFamily: "'Geist', sans-serif" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-10 h-16 border-b-[0.5px]" style={{ background: "rgba(5,4,15,0.78)", backdropFilter: "blur(24px) saturate(180%)", borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate("/")}>
          <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand3))", boxShadow: "0 0 20px rgba(139,92,246,.35)" }}>
            <svg viewBox="0 0 16 16" fill="none" className="w-4 h-4">
              <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.5" fill="rgba(5,4,15,.8)"/>
              <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.5" fill="rgba(5,4,15,.55)"/>
              <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.5" fill="rgba(5,4,15,.55)"/>
              <rect x="9" y="9" width="5.5" height="5.5" rx="1.5" fill="rgba(5,4,15,.8)"/>
            </svg>
          </div>
          <span className="text-lg tracking-tight text-white" style={{ fontFamily: "'Instrument Serif', serif" }}>
            Nexus<span style={{ color: "var(--brand-hi)" }}>AI</span>
          </span>
        </div>

        <div className="hidden md:flex gap-0 bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-full p-[3px]">
          {["Platform", "Compliance", "Open Banking", "Advisory", "Government", "Pricing"].map((item, idx) => (
            <span key={item} className={`px-4 py-1.5 text-xs font-medium rounded-full cursor-pointer transition-all ${idx === 0 ? "bg-[var(--glass3)] text-[var(--t1)]" : "text-[var(--t2)] hover:bg-[var(--glass3)] hover:text-[var(--t1)]"}`}>
              {item}
            </span>
          ))}
        </div>

        <div className="flex gap-2.5 items-center">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard")} className="px-4 py-2 text-xs font-medium rounded-full border-[0.5px]" style={{ borderColor: "var(--border2)", color: "var(--t2)" }}>
            Sign In
          </Button>
          <Button size="sm" onClick={() => navigate("/dashboard")} className="px-5 py-2 text-xs font-semibold rounded-full" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand2))", color: "white", boxShadow: "0 0 0 0 rgba(139,92,246,.4)" }}>
            Request Demo →
          </Button>
        </div>
      </nav>

      {/* ANNOUNCE */}
      <div className="mt-16 flex items-center justify-center gap-3 px-4 py-2 text-xs border-b-[0.5px]" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,.06), rgba(96,165,250,.04), transparent)", color: "var(--t2)", borderColor: "var(--border)" }}>
        <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-bold tracking-wider border-[0.5px]" style={{ fontFamily: "'Geist Mono', monospace", background: "var(--brand-g)", borderColor: "var(--border-b)", color: "var(--brand-hi)" }}>
          NEW
        </span>
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--brand-hi)", boxShadow: "0 0 0 3px rgba(139,92,246,.22)" }} />
        <span>NexusAI achieves CDBA Phase 1 full compliance — Canada's Consumer-Driven Banking Act</span>
        <a href="#" className="transition-opacity hover:opacity-65" style={{ color: "var(--brand-hi)" }}>Read the release →</a>
      </div>

      {/* HERO */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 text-center overflow-hidden">
        {/* Mesh gradient */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `
            radial-gradient(ellipse 900px 520px at 50% -8%, rgba(139,92,246,.10) 0%, transparent 62%),
            radial-gradient(ellipse 650px 450px at 88% 65%, rgba(96,165,250,.06) 0%, transparent 58%),
            radial-gradient(ellipse 550px 420px at 8% 80%, rgba(245,200,66,.04) 0%, transparent 55%)
          `
        }} />
        {/* Grid */}
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.022) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.022) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
          maskImage: "radial-gradient(ellipse 82% 82% at 50% 50%, black 18%, transparent 72%)",
        }} />

        <div className="relative z-10 max-w-[940px]">
          {/* Chip */}
          <div className="inline-flex items-center gap-2 px-3 py-2 mb-8 rounded-full border-[0.5px]" style={{ background: "var(--glass2)", borderColor: "var(--border2)" }}>
            <div className="w-5.5 h-5.5 rounded-full flex items-center justify-center text-xs" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand2))" }}>
              🇨🇦
            </div>
            <span className="text-xs font-medium" style={{ color: "var(--t2)" }}>Built for Canadian banks, fintechs & federal institutions</span>
            <div className="flex items-center gap-1.5 pl-2 text-xs font-semibold tracking-wide" style={{ fontFamily: "'Geist Mono', monospace", color: "var(--brand-hi)" }}>
              <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--brand-hi)", boxShadow: "0 0 0 3px rgba(139,92,246,.22)" }} />
              LIVE
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl leading-tight tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: "-0.03em", color: "white" }}>
            The AI Platform<br />
            <span className="italic" style={{ background: "linear-gradient(120deg, var(--brand-hi) 0%, var(--sky) 55%, var(--brand-hi) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Trusted</span> by<br />
            <span style={{ color: "rgba(237,233,254,.25)" }}>Institutions That Matter</span>
          </h1>

          <p className="text-lg md:text-xl mx-auto max-w-[600px] mb-10 leading-relaxed" style={{ color: "var(--t2)" }}>
            NexusAI unifies AML compliance, personalized financial advisory, open banking infrastructure, and government-grade security — in one intelligent enterprise platform purpose-built for Canada's Big Six and beyond.
          </p>

          <div className="flex gap-3 justify-center flex-wrap mb-6">
            <Button size="lg" onClick={() => navigate("/dashboard")} className="px-8 py-4 text-base font-semibold rounded-full flex items-center gap-2 transition-all" style={{ background: "linear-gradient(135deg, var(--brand), var(--brand2))", color: "white" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              Explore the Platform
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate("/dashboard")} className="px-8 py-4 text-base font-medium rounded-full border-[0.5px]" style={{ background: "var(--glass2)", borderColor: "var(--border2)", color: "var(--t1)" }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10 8 16 12 10 16 10 8" fill="currentColor" stroke="none"/></svg>
              Watch 2-min Demo
            </Button>
          </div>

          <div className="flex items-center gap-3 justify-center text-xs flex-wrap" style={{ color: "var(--t3)" }}>
            <span>No credit card required</span>
            <div className="w-[3px] h-[3px] rounded-full" style={{ background: "var(--t3)" }} />
            <span>14-day free trial</span>
            <div className="w-[3px] h-[3px] rounded-full" style={{ background: "var(--t3)" }} />
            <span>CDBA Phase 1 ready on day one</span>
          </div>

          {/* Dashboard Mockup - Placeholder for now */}
          <div className="mt-14 p-6 rounded-3xl border-[0.5px]" style={{ background: "var(--glass)", borderColor: "var(--border2)", boxShadow: "0 60px 140px rgba(0,0,0,.75)" }}>
            <div className="aspect-video rounded-xl flex items-center justify-center" style={{ background: "var(--bg2)" }}>
              <span className="text-sm" style={{ color: "var(--t3)" }}>Dashboard Mockup</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-14 justify-center flex-wrap pt-10 mt-10 border-t-[0.5px]" style={{ borderColor: "var(--border)" }}>
            {[
              { num: "$3.09", suffix: "B", label: "AML penalties preventable" },
              { num: "89.5", suffix: "%", label: "Canadian banking market" },
              { num: "94", suffix: "%", label: "Canadians want AI + oversight" },
              { num: "Phase 1+2", suffix: "", label: "CDBA ready" },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl leading-none" style={{ fontFamily: "'Instrument Serif', serif", color: "white" }}>
                  <span style={{ background: "linear-gradient(120deg, var(--brand-hi), var(--sky))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                    {stat.num}
                  </span>{stat.suffix}
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--t2)" }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TICKER */}
      <div className="overflow-hidden border-y-[0.5px] py-2.5" style={{ background: "var(--bg1)", borderColor: "var(--border)" }}>
        <div className="flex gap-0 animate-ticker-roll" style={{ width: "max-content" }}>
          {[...Array(2)].map((_, setIdx) => (
            <div key={setIdx} className="flex">
              {[
                { label: "RBC", val: "↑ Compliance ✓" },
                { label: "TD BANK", val: "AML Score 98/100" },
                { label: "BMO", val: "↑ SAR Filed" },
                { label: "FINTRAC", val: "Report Submitted" },
                { label: "SCOTIABANK", val: "↑ Risk Clear" },
                { label: "CIBC", val: "Consent Active" },
                { label: "OSFI", val: "↑ Audit Ready" },
                { label: "CDBA Phase 1", val: "✓ Compliant" },
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 px-8 border-r-[0.5px] whitespace-nowrap text-xs" style={{ fontFamily: "'Geist Mono', monospace", color: "var(--t3)", borderColor: "var(--border)" }}>
                  <span className="font-medium" style={{ color: "var(--t2)" }}>{item.label}</span>
                  <span style={{ color: "var(--brand-hi)" }}>{item.val}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        :root {
          --bg: #05040F;
          --bg1: #08071A;
          --bg2: #0C0B22;
          --bg3: #100F2A;
          --brand: #8B5CF6;
          --brand2: #7C3AED;
          --brand3: #6D28D9;
          --brand-hi: #A78BFA;
          --brand-g: rgba(139,92,246,0.12);
          --brand-g2: rgba(139,92,246,0.06);
          --brand-b: rgba(139,92,246,0.30);
          --gold: #F5C842;
          --gold-g: rgba(245,200,66,0.09);
          --gold-b: rgba(245,200,66,0.28);
          --sky: #60A5FA;
          --sky-g: rgba(96,165,250,0.09);
          --sky-b: rgba(96,165,250,0.28);
          --coral: #F87171;
          --coral-g: rgba(248,113,113,0.10);
          --amber: #FBBF24;
          --amber-g: rgba(251,191,36,0.10);
          --glass: rgba(255,255,255,0.030);
          --glass2: rgba(255,255,255,0.055);
          --glass3: rgba(255,255,255,0.090);
          --border: rgba(255,255,255,0.075);
          --border2: rgba(255,255,255,0.130);
          --border-b: rgba(139,92,246,0.32);
          --t1: #EDE9FE;
          --t2: #8876A8;
          --t3: #4A3D6A;
        }
        @keyframes ticker-roll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-ticker-roll {
          animation: ticker-roll 32s linear infinite;
        }
        body::before {
          content: '';
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='280' height='280' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.45;
        }
      `}</style>
    </div>
  );
}
