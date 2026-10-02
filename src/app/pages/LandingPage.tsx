import { Button } from "../components/ui/button";
import { useLocation } from "wouter";
import PrototypeNotice from "../components/PrototypeNotice";

export default function LandingPage() {
  const [, navigate] = useLocation();

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
          {[
            { label: "Platform", href: "#platform" },
            { label: "Compliance", href: "#compliance" },
            { label: "Open Banking", href: "#openbanking" },
            { label: "Advisory", href: "#advisory" },
            { label: "Government", href: "#government" },
            { label: "Pricing", href: "#pricing" },
            { label: "Product Tour", href: "/tour" },
          ].map((item, idx) => (
            <a key={item.label} href={item.href} className={`px-4 py-1.5 text-xs font-medium rounded-full cursor-pointer transition-all no-underline ${idx === 6 ? "bg-[rgba(139,92,246,0.25)] text-[var(--brand-hi)] border-[0.5px] border-[rgba(139,92,246,0.4)]" : idx === 0 ? "bg-[var(--glass3)] text-[var(--t1)]" : "text-[var(--t2)] hover:bg-[var(--glass3)] hover:text-[var(--t1)]"}`}>
              {item.label}
            </a>
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

      <div className="mt-16">
        <PrototypeNotice />
      </div>

      {/* ANNOUNCE */}
      <div className="flex items-center justify-center gap-3 px-4 py-2 text-xs border-b-[0.5px]" style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,.06), rgba(96,165,250,.04), transparent)", color: "var(--t2)", borderColor: "var(--border)" }}>
        <span className="px-2.5 py-1 rounded-full text-[0.65rem] font-bold tracking-wider border-[0.5px]" style={{ fontFamily: "'Geist Mono', monospace", background: "var(--brand-g)", borderColor: "var(--border-b)", color: "var(--brand-hi)" }}>
          ARCHITECTURE
        </span>
        <span>NexusAI is architected for CDBA Phase 1 (read-only open banking) requirements — no formal regulatory certification has been obtained</span>
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
          </div>

          <h1 className="text-5xl md:text-7xl leading-tight tracking-tight mb-6" style={{ fontFamily: "'Instrument Serif', serif", letterSpacing: "-0.03em", color: "white" }}>
            The AI Platform<br />
            <span className="italic" style={{ background: "linear-gradient(120deg, var(--brand-hi) 0%, var(--sky) 55%, var(--brand-hi) 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Sketched</span> as a<br />
            <span style={{ color: "rgba(237,233,254,.25)" }}>Prototype</span>
          </h1>

          <p className="text-lg md:text-xl mx-auto max-w-[600px] mb-10 leading-relaxed" style={{ color: "var(--t2)" }}>
            A prototype that sketches AML workflows, advisory screens, and open-banking ideas. It has no bank customers, no regulator endorsement, and no certification.
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
            <span>Not a commercial offer</span>
            <div className="w-[3px] h-[3px] rounded-full" style={{ background: "var(--t3)" }} />
            <span>No trial is available</span>
            <div className="w-[3px] h-[3px] rounded-full" style={{ background: "var(--t3)" }} />
            <span>No certification claimed</span>
          </div>

          {/* Live Dashboard Preview */}
          <div className="mt-14 p-[5px] rounded-3xl border-[0.5px]" style={{ background: "linear-gradient(145deg, rgba(139,92,246,.18), rgba(96,165,250,.08), rgba(139,92,246,.06))", borderColor: "rgba(139,92,246,.35)", boxShadow: "0 0 0 1px rgba(0,0,0,.6), 0 60px 140px rgba(0,0,0,.85), 0 0 80px rgba(139,92,246,.12)" }}>
            <div className="rounded-[22px] overflow-hidden border-[0.5px]" style={{ background: "var(--bg)", borderColor: "rgba(255,255,255,.06)" }}>
              {/* Window chrome */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b-[0.5px]" style={{ background: "rgba(8,7,26,0.95)", borderColor: "rgba(255,255,255,.06)" }}>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f56" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#ffbd2e" }} />
                  <div className="w-3 h-3 rounded-full" style={{ background: "#27c93f" }} />
                </div>
                <div className="flex-1 mx-4">
                  <div className="mx-auto w-52 h-5 rounded-md flex items-center px-3 gap-2" style={{ background: "rgba(255,255,255,.05)", border: "0.5px solid rgba(255,255,255,.08)" }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: "rgba(139,92,246,.6)" }} />
                    <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: "9px", color: "rgba(255,255,255,.35)" }}>app.nexusai.ca/dashboard</span>
                  </div>
                </div>
              </div>
              {/* Dashboard body */}
              <div className="flex" style={{ height: "360px" }}>
                {/* Mini sidebar */}
                <div className="w-[140px] flex-shrink-0 border-r-[0.5px] flex flex-col" style={{ background: "rgba(8,7,26,.97)", borderColor: "rgba(255,255,255,.06)" }}>
                  <div className="px-3 py-3 border-b-[0.5px] flex items-center gap-2" style={{ borderColor: "rgba(255,255,255,.06)" }}>
                    <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg,#8B5CF6,#7C3AED)" }}>
                      <svg viewBox="0 0 16 16" fill="none" style={{ width: 10, height: 10 }}>
                        <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.5" fill="rgba(5,4,15,.8)"/>
                        <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.5" fill="rgba(5,4,15,.5)"/>
                        <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.5" fill="rgba(5,4,15,.5)"/>
                        <rect x="9" y="9" width="5.5" height="5.5" rx="1.5" fill="rgba(5,4,15,.8)"/>
                      </svg>
                    </div>
                    <span style={{ fontFamily: "'Instrument Serif',serif", fontSize: "11px", color: "white" }}>Nexus<b style={{ color: "#A78BFA" }}>AI</b></span>
                  </div>
                  <div className="px-2 py-2 flex-1 overflow-hidden">
                    {[
                      { label: "Overview", active: false, dot: "" },
                      { label: "AML Alerts", active: true, dot: "7" },
                      { label: "Network Graph", active: false, dot: "" },
                      { label: "Perpetual KYC", active: false, dot: "3" },
                      { label: "SAR Generator", active: false, dot: "" },
                      { label: "Risk Profile", active: false, dot: "" },
                      { label: "UBO Discovery", active: false, dot: "" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between px-2 py-1.5 rounded-md mb-0.5" style={{ background: item.active ? "rgba(139,92,246,.15)" : "transparent", position: "relative" }}>
                        {item.active && <div style={{ position: "absolute", left: 0, top: "20%", width: "2px", height: "60%", background: "#A78BFA", borderRadius: "0 2px 2px 0" }} />}
                        <span style={{ fontSize: "9px", color: item.active ? "#A78BFA" : "rgba(167,139,250,.45)", fontFamily: "'Geist',sans-serif" }}>{item.label}</span>
                        {item.dot && <span style={{ fontSize: "7px", fontFamily: "'Geist Mono',monospace", fontWeight: "bold", color: item.active ? "#A78BFA" : "rgba(167,139,250,.4)", background: item.active ? "rgba(139,92,246,.2)" : "rgba(139,92,246,.08)", padding: "1px 4px", borderRadius: "999px" }}>{item.dot}</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 overflow-hidden flex flex-col">
                  {/* Top bar */}
                  <div className="flex items-center justify-between px-4 py-2.5 border-b-[0.5px] flex-shrink-0" style={{ background: "rgba(5,4,15,.98)", borderColor: "rgba(255,255,255,.06)" }}>
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: "700", color: "white", fontFamily: "'Geist',sans-serif" }}>AML Alerts</div>
                      <div style={{ fontSize: "8px", color: "rgba(167,139,250,.5)", fontFamily: "'Geist Mono',monospace" }}>NexusAI › Alert Triage</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div style={{ fontSize: "8px", color: "rgba(167,139,250,.5)", background: "rgba(255,255,255,.04)", border: "0.5px solid rgba(255,255,255,.08)", borderRadius: "6px", padding: "3px 8px", fontFamily: "'Geist Mono',monospace" }}>Today</div>
                      <div style={{ width: "18px", height: "18px", borderRadius: "50%", background: "linear-gradient(135deg,#8B5CF6,#7C3AED)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "7px", color: "white", fontWeight: "bold" }}>JO</span>
                      </div>
                    </div>
                  </div>

                  {/* Content area */}
                  <div className="flex gap-0 flex-1 overflow-hidden">
                    {/* Alert list */}
                    <div className="flex-1 overflow-hidden px-3 py-3 flex flex-col gap-2">
                      {/* Stat row */}
                      <div className="grid grid-cols-4 gap-2 flex-shrink-0">
                        {[
                          { label: "CRITICAL", val: "3", color: "#F87171" },
                          { label: "HIGH", val: "4", color: "#FBBF24" },
                          { label: "SAMPLE", val: "2", color: "#A78BFA" },
                          { label: "CLEARED", val: "18", color: "#34D399" },
                        ].map((s, i) => (
                          <div key={i} className="rounded-lg px-2 py-1.5" style={{ background: "rgba(255,255,255,.03)", border: "0.5px solid rgba(255,255,255,.07)" }}>
                            <div style={{ fontSize: "7px", color: "rgba(167,139,250,.5)", fontFamily: "'Geist Mono',monospace", marginBottom: "2px" }}>{s.label}</div>
                            <div style={{ fontSize: "16px", fontFamily: "'Instrument Serif',serif", color: s.color, lineHeight: 1 }}>{s.val}</div>
                          </div>
                        ))}
                      </div>

                      {/* Alert rows */}
                      {[
                        { name: "Structuring — Acct #SAMPLE-4471", meta: "Example branch · $49,800×3 · 2h ago", score: 97, color: "#F87171" },
                        { name: "Network Anomaly — 6-Node Ring", meta: "Shell co. cluster detected · Toronto", score: 92, color: "#F87171" },
                        { name: "PEP Match — Unverified Source", meta: "Politically Exposed Person · wire origin unclear", score: 74, color: "#FBBF24" },
                        { name: "Velocity Alert — Cross-border", meta: "12 txns in 48h · CAD→USD→BTC", score: 61, color: "#FBBF24" },
                        { name: "Sample draft only", meta: "Not filed · illustrative text", score: 0, color: "#34D399", isSar: true },
                      ].map((alert, i) => (
                        <div key={i} className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 flex-shrink-0" style={{ background: "rgba(255,255,255,.03)", border: `0.5px solid ${alert.color}22` }}>
                          <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: alert.color, flexShrink: 0, boxShadow: `0 0 6px ${alert.color}66` }} />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: "9px", fontWeight: "600", color: "rgba(237,233,254,.9)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontFamily: "'Geist',sans-serif" }}>{alert.name}</div>
                            <div style={{ fontSize: "8px", color: "rgba(167,139,250,.45)", marginTop: "1px", fontFamily: "'Geist',sans-serif" }}>{alert.meta}</div>
                          </div>
                          {!alert.isSar && (
                            <div style={{ fontSize: "10px", fontWeight: "bold", color: alert.color, fontFamily: "'Geist Mono',monospace", flexShrink: 0 }}>{alert.score}</div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Right: XAI panel */}
                    <div className="w-[165px] flex-shrink-0 border-l-[0.5px] px-3 py-3 flex flex-col gap-2.5" style={{ borderColor: "rgba(255,255,255,.06)" }}>
                      <div style={{ fontSize: "8px", fontFamily: "'Geist Mono',monospace", color: "rgba(167,139,250,.5)", fontWeight: "bold", letterSpacing: "0.08em", marginBottom: "2px" }}>XAI RISK BREAKDOWN</div>
                      <div className="rounded-lg p-2.5" style={{ background: "rgba(139,92,246,.08)", border: "0.5px solid rgba(139,92,246,.2)" }}>
                        <div style={{ fontSize: "8px", color: "rgba(167,139,250,.6)", fontFamily: "'Geist Mono',monospace", marginBottom: "6px" }}>Acct #CA-4471</div>
                        {[
                          { label: "Base Score", val: 20, color: "#A78BFA" },
                          { label: "Geographic Risk", val: 15, color: "#60A5FA" },
                          { label: "PEP Association", val: 25, color: "#F87171" },
                          { label: "Txn Velocity", val: 18, color: "#FBBF24" },
                          { label: "Network Anomaly", val: 7, color: "#34D399" },
                        ].map((row, i) => (
                          <div key={i} style={{ marginBottom: "6px" }}>
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2px" }}>
                              <span style={{ fontSize: "7.5px", color: "rgba(237,233,254,.6)", fontFamily: "'Geist',sans-serif" }}>{row.label}</span>
                              <span style={{ fontSize: "7.5px", fontWeight: "bold", color: row.color, fontFamily: "'Geist Mono',monospace" }}>+{row.val}</span>
                            </div>
                            <div style={{ height: "3px", background: "rgba(255,255,255,.08)", borderRadius: "2px", overflow: "hidden" }}>
                              <div style={{ height: "100%", width: `${(row.val / 30) * 100}%`, background: row.color, borderRadius: "2px" }} />
                            </div>
                          </div>
                        ))}
                        <div style={{ borderTop: "0.5px solid rgba(255,255,255,.08)", paddingTop: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "7.5px", color: "rgba(167,139,250,.6)", fontFamily: "'Geist Mono',monospace" }}>TOTAL</span>
                          <span style={{ fontSize: "16px", fontWeight: "bold", fontFamily: "'Instrument Serif',serif", color: "#F87171" }}>85</span>
                        </div>
                      </div>

                      <div style={{ fontSize: "8px", fontFamily: "'Geist Mono',monospace", color: "rgba(167,139,250,.5)", fontWeight: "bold", letterSpacing: "0.08em", marginBottom: "2px" }}>SAMPLE STATUS</div>
                      <div className="rounded-lg p-2" style={{ background: "rgba(52,211,153,.06)", border: "0.5px solid rgba(52,211,153,.2)" }}>
                        {[
                          { label: "STR-SAMPLE-0041", status: "SAMPLE", color: "#34D399" },
                          { label: "STR-SAMPLE-0039", status: "DRAFT", color: "#FBBF24" },
                        ].map((r, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: i === 0 ? "5px" : "0" }}>
                            <span style={{ fontSize: "7px", color: "rgba(167,139,250,.55)", fontFamily: "'Geist Mono',monospace" }}>{r.label}</span>
                            <span style={{ fontSize: "6.5px", fontWeight: "bold", color: r.color, fontFamily: "'Geist Mono',monospace" }}>{r.status}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-14 justify-center flex-wrap pt-10 mt-10 border-t-[0.5px]" style={{ borderColor: "var(--border)" }}>
            {[
              { num: "Demo", suffix: "", label: "Illustrative interface" },
              { num: "None", suffix: "", label: "Bank partnerships" },
              { num: "None", suffix: "", label: "Certifications held" },
              { num: "Goal", suffix: "", label: "Architecture only" },
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
                { label: "SAMPLE A", val: "Illustrative metric" },
                { label: "SAMPLE B", val: "Illustrative metric" },
                { label: "SAMPLE C", val: "Illustrative metric" },
                { label: "SAMPLE D", val: "Illustrative metric" },
                { label: "NOT A CUSTOMER", val: "Hypothetical only" },
                { label: "NOT CERTIFIED", val: "No attestation" },
                { label: "NO PARTNERSHIP", val: "None claimed" },
                { label: "PROTOTYPE", val: "Illustrative data" },
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

      {/* TRUST BAR */}
      <div className="py-10 px-6 border-b-[0.5px]" style={{ borderColor: "var(--border)" }}>
        <p className="text-center text-xs mb-4 uppercase tracking-widest font-bold" style={{ color: "var(--t3)", fontFamily: "'Geist Mono',monospace" }}>No institution is a customer, partner, or endorser</p>
        <p className="text-center text-sm max-w-2xl mx-auto" style={{ color: "var(--t2)" }}>Bank names, regulator names, and logos are not shown here. Nothing on this page is a partnership, a filing, or a certification.</p>
      </div>

      {/* CERTIFICATIONS */}
      <div className="py-10 px-6 border-b-[0.5px]" style={{ background: "var(--bg1)", borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto p-6 rounded-2xl border-[0.5px] text-center" style={{ background: "var(--glass)", borderColor: "rgba(251,191,36,.28)" }}>
          <div className="text-[0.65rem] font-bold tracking-wider mb-2" style={{ fontFamily: "'Geist Mono',monospace", color: "#FBBF24" }}>NOT CERTIFIED</div>
          <p className="text-sm" style={{ color: "var(--t2)", lineHeight: 1.7 }}>This prototype does not hold a security audit certification, an information-security certification, or a Canadian regulatory attestation. Treat every screen below as a design sketch.</p>
        </div>
      </div>

      {/* PLATFORM */}
      <div id="platform" className="py-24 px-6 border-b-[0.5px]" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 border-[0.5px]" style={{ fontFamily: "'Geist Mono',monospace", color: "var(--brand-hi)", background: "var(--brand-g)", borderColor: "var(--border-b)" }}>PLATFORM OVERVIEW</div>
            <h2 className="text-4xl md:text-5xl mb-4" style={{ fontFamily: "'Instrument Serif',serif", color: "white" }}>Everything your institution needs.<br /><span className="italic" style={{ color: "var(--brand-hi)" }}>In one platform.</span></h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--t2)" }}>NexusAI replaces 7 point solutions with a single unified platform — reducing vendor complexity, lowering total cost, and giving compliance teams a single source of truth.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { num: "01", title: "Autonomous Alert Triage", desc: "A sketch of agents gathering KYC, watchlist, and graph context into a brief before a person opens the case. No customer has measured this.", stat: "Illustrative workflow", color: "var(--brand-hi)" },
              { num: "02", title: "Explainable Risk Scoring", desc: "A sketch that breaks a score into components such as geography, PEP status, velocity, and network context. This is not an examination finding.", stat: "Design sketch only", color: "var(--sky)" },
              { num: "03", title: "Unified Compliance Hub", desc: "One screen that sketches report drafts, screening, and an audit trail. It does not file reports and it is not attested.", stat: "Sample screens", color: "var(--gold)" },
              { num: "04", title: "No-Code Workflow Builder", desc: "A sketch of visual routing rules — Trigger, Condition, Action — such as a high-value alert routed to a senior reviewer.", stat: "Concept only", color: "var(--coral, #F87171)" },
              { num: "05", title: "Federated AI Model", desc: "A design idea for shared model training that would avoid moving raw records. No institution is participating.", stat: "No participants", color: "var(--brand-hi)" },
              { num: "06", title: "Maker-Checker Quality Gate", desc: "A sketch of sampling closed cases for a second review. Accuracy figures on this page are not measurements.", stat: "Not measured", color: "var(--teal, #34D399)" },
            ].map((f) => (
              <div key={f.num} className="p-6 rounded-2xl border-[0.5px] relative overflow-hidden" style={{ background: "var(--glass)", borderColor: "rgba(255,255,255,.07)" }}>
                <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${f.color}, transparent)` }} />
                <div className="text-[0.6rem] font-bold mb-3" style={{ fontFamily: "'Geist Mono',monospace", color: "var(--t3)" }}>{f.num}</div>
                <h3 className="text-base font-semibold mb-2" style={{ color: "white" }}>{f.title}</h3>
                <p className="text-sm mb-4" style={{ color: "var(--t2)", lineHeight: 1.6 }}>{f.desc}</p>
                <div className="text-xs font-bold px-2 py-1 rounded-full inline-block" style={{ fontFamily: "'Geist Mono',monospace", color: f.color, background: `${f.color}12`, border: `0.5px solid ${f.color}28` }}>{f.stat}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* COMPLIANCE */}
      <div id="compliance" className="py-24 px-6 border-b-[0.5px]" style={{ background: "var(--bg1)", borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 border-[0.5px]" style={{ fontFamily: "'Geist Mono',monospace", color: "var(--coral, #F87171)", background: "rgba(248,113,113,.08)", borderColor: "rgba(248,113,113,.25)" }}>AML & COMPLIANCE</div>
              <h2 className="text-4xl mb-4" style={{ fontFamily: "'Instrument Serif',serif", color: "white" }}>Stop money laundering before it <span className="italic">leaves the country.</span></h2>
              <p className="text-base mb-8" style={{ color: "var(--t2)", lineHeight: 1.7 }}>A sketch of network views, explainable scores, and draft narratives an officer could review. It does not monitor live payments and it does not file with any regulator.</p>
              <div className="space-y-4">
                {[
                  { label: "Graph-based transaction network analysis", desc: "Detect money laundering rings across 3-degree entity networks" },
                  { label: "Fiat-to-Crypto forensics", desc: "Trace funds from bank accounts through crypto wallets and exchanges" },
                  { label: "Autonomous agent investigation", desc: "AI gathers evidence and drafts investigation briefs in under 60 seconds" },
                  { label: "Draft narrative sketch", desc: "Sample text an officer could edit. Nothing is filed." },
                ].map((item) => (
                  <div key={item.label} className="flex gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: "rgba(248,113,113,.12)", border: "0.5px solid rgba(248,113,113,.3)" }}>
                      <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1.5 4L3.5 6L6.5 2" stroke="#F87171" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: "white" }}>{item.label}</div>
                      <div className="text-xs" style={{ color: "var(--t2)" }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {[
                { label: "Sample false-positive sketch", from: 72, to: 6, color: "#F87171" },
                { label: "Sample triage sketch", from: 240, to: 12, suffix: "min", color: "#FBBF24" },
                { label: "Sample draft completeness", from: 61, to: 98, color: "#A78BFA" },
                { label: "Sample coverage sketch", from: 44, to: 94, color: "#34D399" },
              ].map((stat) => (
                <div key={stat.label} className="p-4 rounded-2xl border-[0.5px]" style={{ background: "var(--glass2)", borderColor: "rgba(255,255,255,.08)" }}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-sm font-semibold" style={{ color: "white" }}>{stat.label}</span>
                    <div className="text-right">
                      <div className="text-xs line-through" style={{ color: "var(--t3)" }}>Placeholder: {stat.from}{stat.suffix || "%"}</div>
                      <div className="text-base font-bold" style={{ color: stat.color, fontFamily: "'Instrument Serif',serif" }}>Sketch: {stat.to}{stat.suffix || "%"}</div>
                    </div>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,.06)" }}>
                    <div className="h-full rounded-full" style={{ width: `${stat.to}%`, background: stat.color, boxShadow: `0 0 8px ${stat.color}50` }} />
                  </div>
                </div>
              ))}
              <div className="p-4 rounded-2xl border-[0.5px] text-center" style={{ background: "rgba(248,113,113,.05)", borderColor: "rgba(248,113,113,.2)" }}>
                <div className="text-xl font-bold mb-1" style={{ fontFamily: "'Instrument Serif',serif", color: "#FBBF24" }}>Not a result</div>
                <div className="text-xs" style={{ color: "var(--t2)" }}>Placeholder bars above are not measured outcomes and do not describe any bank.</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* OPEN BANKING */}
      <div id="openbanking" className="py-24 px-6 border-b-[0.5px]" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 border-[0.5px]" style={{ fontFamily: "'Geist Mono',monospace", color: "var(--sky)", background: "rgba(96,165,250,.08)", borderColor: "rgba(96,165,250,.25)" }}>OPEN BANKING</div>
            <h2 className="text-4xl mb-4" style={{ fontFamily: "'Instrument Serif',serif", color: "white" }}>Open-banking sketch.<br /><span className="italic" style={{ color: "var(--sky)" }}>Not a certification.</span></h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--t2)" }}>These cards describe a design goal for consented read access and a later payment idea. No bank is connected, and no open-banking certification has been obtained.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { phase: "Phase 1 — Sketch", title: "Read Access", desc: "A sketch of consumers sharing account data through a consented API. No institution is connected.", status: "SKETCH", color: "var(--sky)" },
              { phase: "Phase 2 — Idea", title: "Write Access & Payments", desc: "An idea for payment initiation with consent. It is not built as a live payment rail and it is not certified.", status: "IDEA", color: "var(--brand-hi)" },
              { phase: "Phase 3 — Roadmap", title: "Product Comparison", desc: "Transparent pricing, AI-powered product recommendations, and rate comparison across institutions — giving consumers unprecedented financial choice.", status: "PLANNED", color: "var(--t2)" },
            ].map((p) => (
              <div key={p.phase} className="p-6 rounded-2xl border-[0.5px] relative" style={{ background: "var(--glass)", borderColor: "rgba(255,255,255,.08)" }}>
                <div className="flex justify-between items-start mb-3">
                  <div className="text-xs font-bold" style={{ color: "var(--t3)", fontFamily: "'Geist Mono',monospace" }}>{p.phase}</div>
                  <div className="px-2 py-0.5 rounded-full text-[0.6rem] font-bold border-[0.5px]" style={{ fontFamily: "'Geist Mono',monospace", color: p.color, background: `${p.color}12`, borderColor: `${p.color}30` }}>{p.status}</div>
                </div>
                <h3 className="text-lg font-semibold mb-2" style={{ color: "white", fontFamily: "'Instrument Serif',serif" }}>{p.title}</h3>
                <p className="text-sm" style={{ color: "var(--t2)", lineHeight: 1.6 }}>{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Consent Management", desc: "Granular per-institution, per-scope consent with revocation" },
              { label: "OAuth 2.0 Flows", desc: "A sample authorization screen. No bank connection exists." },
              { label: "Aggregated Views", desc: "Cross-institution account summaries and financial health scores" },
              { label: "Privacy by Design", desc: "Zero raw PII stored — all data tokenized and scoped" },
            ].map((f) => (
              <div key={f.label} className="p-4 rounded-xl border-[0.5px]" style={{ background: "rgba(96,165,250,.04)", borderColor: "rgba(96,165,250,.14)" }}>
                <div className="text-sm font-semibold mb-1" style={{ color: "white" }}>{f.label}</div>
                <div className="text-xs" style={{ color: "var(--t2)" }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ADVISORY */}
      <div id="advisory" className="py-24 px-6 border-b-[0.5px]" style={{ background: "var(--bg1)", borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-14 items-center">
            <div className="order-2 md:order-1 space-y-4">
              {[
                { label: "AI Spending Insights", value: "Personalized category analysis with anomaly flags", icon: "📊" },
                { label: "Investment Recommendations", value: "Risk-adjusted portfolio suggestions with human advisor sign-off", icon: "📈" },
                { label: "Goal Tracking", value: "Savings, mortgage, and retirement milestones with AI projections", icon: "🎯" },
                { label: "Sentiment Engine", value: "Real-time customer satisfaction scoring across all touchpoints", icon: "💬" },
              ].map((item) => (
                <div key={item.label} className="flex gap-4 p-4 rounded-2xl border-[0.5px]" style={{ background: "var(--glass)", borderColor: "rgba(255,255,255,.07)" }}>
                  <div className="text-2xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <div className="text-sm font-semibold mb-1" style={{ color: "white" }}>{item.label}</div>
                    <div className="text-xs" style={{ color: "var(--t2)" }}>{item.value}</div>
                  </div>
                </div>
              ))}
              <div className="p-5 rounded-2xl border-[0.5px]" style={{ background: "rgba(245,200,66,.05)", borderColor: "rgba(245,200,66,.2)" }}>
                <div className="text-xl font-bold mb-1" style={{ fontFamily: "'Instrument Serif',serif", color: "var(--gold)" }}>No survey cited</div>
                <div className="text-sm" style={{ color: "var(--t2)" }}>This prototype keeps a person in the loop on the sketch screens. It does not cite a survey and it does not claim a trust result.</div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 border-[0.5px]" style={{ fontFamily: "'Geist Mono',monospace", color: "var(--gold)", background: "rgba(245,200,66,.08)", borderColor: "rgba(245,200,66,.25)" }}>FINANCIAL ADVISORY</div>
              <h2 className="text-4xl mb-4" style={{ fontFamily: "'Instrument Serif',serif", color: "white" }}>AI speed.<br /><span className="italic" style={{ color: "var(--gold)" }}>Human judgment.</span><br />At every decision.</h2>
              <p className="text-base mb-6" style={{ color: "var(--t2)", lineHeight: 1.7 }}>The advisory screens pair a generated suggestion with a human sign-off step. That is a product sketch, not a measured trust result and not advice from a registered advisor.</p>
              <div className="flex gap-4 flex-wrap">
                {["HITL Architecture", "Advisor Dashboard", "Sentiment Scoring", "Goal Modelling"].map((tag) => (
                  <div key={tag} className="px-3 py-1.5 rounded-full text-xs border-[0.5px]" style={{ color: "var(--gold)", background: "rgba(245,200,66,.08)", borderColor: "rgba(245,200,66,.22)" }}>{tag}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* GOVERNMENT */}
      <div id="government" className="py-24 px-6 border-b-[0.5px]" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 border-[0.5px]" style={{ fontFamily: "'Geist Mono',monospace", color: "var(--brand-hi)", background: "var(--brand-g)", borderColor: "var(--border-b)" }}>GOVERNMENT GRADE</div>
            <h2 className="text-4xl mb-4" style={{ fontFamily: "'Instrument Serif',serif", color: "white" }}>Oversight sketch.<br /><span className="italic" style={{ color: "var(--brand-hi)" }}>Not endorsed.</span></h2>
            <p className="text-base max-w-xl mx-auto" style={{ color: "var(--t2)" }}>The prototype logs sample actions in the interface. No regulator has reviewed, endorsed, or certified it.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-2xl border-[0.5px]" style={{ background: "rgba(139,92,246,.05)", borderColor: "rgba(139,92,246,.2)" }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: "white" }}>Regulatory Coverage</h3>
              <div className="space-y-3">
                {[
                  { reg: "Reports", desc: "Design target: draft suspicious-transaction narratives. Nothing is submitted." },
                  { reg: "Oversight", desc: "Design target: explainable scores a reviewer could read. Not an examination result." },
                  { reg: "Recordkeeping", desc: "Design target: keep a sample audit trail. Not an attestation that every statutory duty is met." },
                  { reg: "Privacy", desc: "Design target: consent trails in the prototype. Not a privacy-law certification." },
                ].map((item) => (
                  <div key={item.reg} className="flex gap-3">
                    <div className="text-xs font-bold px-2 py-1 rounded-md flex-shrink-0 h-fit" style={{ fontFamily: "'Geist Mono',monospace", color: "var(--brand-hi)", background: "rgba(139,92,246,.12)", border: "0.5px solid rgba(139,92,246,.28)" }}>{item.reg}</div>
                    <div className="text-sm" style={{ color: "var(--t2)" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-6 rounded-2xl border-[0.5px]" style={{ background: "var(--glass)", borderColor: "rgba(255,255,255,.07)" }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: "white" }}>Security Architecture</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Zero-Trust Network", desc: "Every API call verified — no implicit trust" },
                  { label: "AES-256 Encryption", desc: "Data encrypted in transit and at rest" },
                  { label: "JWT Session Mgmt", desc: "Short-lived tokens, automatic rotation" },
                  { label: "Role-Based Access", desc: "4 tiers: CRO, Compliance, Advisor, Client" },
                  { label: "Immutable Audit Log", desc: "Cryptographically signed, tamper-evident" },
                  { label: "No uptime SLA", desc: "This prototype does not offer a measured availability commitment." },
                ].map((item) => (
                  <div key={item.label} className="p-3 rounded-xl border-[0.5px]" style={{ background: "var(--glass)", borderColor: "rgba(255,255,255,.07)" }}>
                    <div className="text-xs font-semibold mb-1" style={{ color: "white" }}>{item.label}</div>
                    <div className="text-[0.65rem]" style={{ color: "var(--t2)" }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {["Prototype only", "No security audit certification", "No information-security certification", "No privacy-law certification", "No regulator attestation", "Illustrative data"].map((badge) => (
              <div key={badge} className="flex items-center gap-2 px-4 py-2 rounded-full border-[0.5px] text-xs" style={{ color: "var(--brand-hi)", background: "rgba(139,92,246,.07)", borderColor: "rgba(139,92,246,.22)" }}>
                <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1.5 4L3.5 6L6.5 2" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="py-24 px-6 border-b-[0.5px]" style={{ background: "var(--bg1)", borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl mb-3" style={{ fontFamily: "'Instrument Serif',serif", color: "white" }}>No customer quotes</h2>
            <p className="text-sm max-w-xl mx-auto" style={{ color: "var(--t2)", lineHeight: 1.7 }}>This prototype has no testimonials. No person at a bank has endorsed it, and no quote on any earlier version of this page was a real customer.</p>
          </div>
          <div className="p-6 rounded-2xl border-[0.5px] text-center" style={{ background: "var(--glass)", borderColor: "rgba(251,191,36,.28)" }}>
            <p className="text-sm" style={{ color: "var(--t1)", lineHeight: 1.7 }}>Hypothetical example, not a customer: “A reviewer could edit a draft and decide whether to keep it.” That sentence is invented for the layout. It is not attributed to anyone.</p>
          </div>
        </div>
      </div>

      {/* PRICING */}
      <div id="pricing" className="py-24 px-6 border-b-[0.5px]" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-bold tracking-wider mb-4 border-[0.5px]" style={{ fontFamily: "'Geist Mono',monospace", color: "var(--brand-hi)", background: "var(--brand-g)", borderColor: "var(--border-b)" }}>PRICING</div>
            <h2 className="text-4xl mb-3" style={{ fontFamily: "'Instrument Serif',serif", color: "white" }}>Transparent pricing.<br /><span className="italic" style={{ color: "var(--brand-hi)" }}>No hidden compliance fees.</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: "STARTER", price: "$4,999", per: "/month", tag: "Illustrative price, not an offer", features: ["Sample transaction cap", "Sample AML and KYC screens", "Sample email support note", "Sample audit log", "Sample report drafts"], featured: false, color: "var(--t2)" },
              { name: "PROFESSIONAL", price: "$14,999", per: "/month", tag: "Illustrative price, not an offer", features: ["Sample transaction cap", "Sample compliance screens", "Sample support note", "Sample network view", "Open-banking sketch", "Sample shared-model idea"], featured: true, color: "var(--brand-hi)" },
              { name: "ENTERPRISE", price: "Custom", per: "", tag: "Illustrative price, not an offer", features: ["Sample unlimited tier", "White-label sketch", "Sample contact role", "Sample API notes", "Sample reporting screens", "Sample investigator view"], featured: false, color: "var(--gold)" },
            ].map((plan) => (
              <div key={plan.name} className="p-7 rounded-2xl border-[0.5px] relative" style={{ background: plan.featured ? "rgba(139,92,246,.08)" : "var(--glass)", borderColor: plan.featured ? "rgba(139,92,246,.4)" : "rgba(255,255,255,.07)", boxShadow: plan.featured ? "0 0 40px rgba(139,92,246,.1)" : "none" }}>
                {plan.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[0.65rem] font-bold" style={{ background: "linear-gradient(135deg,#8B5CF6,#7C3AED)", color: "white", fontFamily: "'Geist Mono',monospace" }}>MOST POPULAR</div>}
                <div className="text-xs font-bold tracking-wider mb-1" style={{ fontFamily: "'Geist Mono',monospace", color: plan.color }}>{plan.name}</div>
                <div className="text-xs mb-4" style={{ color: "var(--t2)" }}>{plan.tag}</div>
                <div className="mb-6">
                  <span className="text-4xl font-bold" style={{ fontFamily: "'Instrument Serif',serif", color: "white" }}>{plan.price}</span>
                  <span className="text-sm" style={{ color: "var(--t2)" }}>{plan.per}</span>
                </div>
                <div className="space-y-2.5 mb-8">
                  {plan.features.map((f) => (
                    <div key={f} className="flex gap-2.5 text-sm" style={{ color: "var(--t1)" }}>
                      <svg className="flex-shrink-0 mt-0.5" width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="6" fill={`${plan.color}18`} stroke={`${plan.color}40`} strokeWidth="0.5"/><path d="M4.5 7L6.5 9L9.5 5" stroke={plan.color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                      {f}
                    </div>
                  ))}
                </div>
                <button className="w-full py-2.5 rounded-full text-sm font-semibold transition-all" style={{ background: plan.featured ? "linear-gradient(135deg,#8B5CF6,#7C3AED)" : "var(--glass2)", color: plan.featured ? "white" : "var(--t1)", border: plan.featured ? "none" : "0.5px solid rgba(255,255,255,.12)" }}>
                  View the prototype
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-24 px-6 border-b-[0.5px]" style={{ background: "var(--bg1)", borderColor: "var(--border)" }}>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl mb-12 text-center" style={{ fontFamily: "'Instrument Serif',serif", color: "white" }}>Frequently asked questions</h2>
          <div className="space-y-3">
            {[
              { q: "Is NexusAI certified for Canadian regulatory filing or supervision?", a: "No. This prototype does not hold a filing, supervisory, privacy, or security certification. Sample screens are not filings and are not examination evidence." },
              { q: "How does the AI explainability work?", a: "The sketch shows a short reason next to a score, such as a structuring pattern or a velocity note. That layout is illustrative. It is not an examination-ready control." },
              { q: "What's the difference between Phase 1 and Phase 2 Open Banking?", a: "In the sketch, phase 1 is read-only sharing and phase 2 is a payment idea. Neither is live, neither is certified, and no bank is connected." },
              { q: "Can NexusAI integrate with our existing core banking system?", a: "Yes. NexusAI connects via REST APIs to systems like Temenos, FIS, and Oracle FLEXCUBE. We also support batch file imports (CSV, JSON) and direct database connectors for legacy systems." },
              { q: "How does the Federated Learning model protect our customer data?", a: "The federated model uses Homomorphic Encryption to ensure model weights are encrypted before transmission. Differential privacy (ε=0.1) adds noise to gradient updates, and a zero-knowledge proof verifies no raw PII ever leaves your institution." },
              { q: "What support options are available?", a: "Starter: Email (24h SLA). Professional: Priority email + Slack (4h SLA). Enterprise: Dedicated CSM, phone support, and custom SLAs down to 1h for critical compliance issues." },
            ].map((faq, i) => (
              <details key={i} className="group rounded-2xl border-[0.5px] overflow-hidden" style={{ background: "var(--glass)", borderColor: "rgba(255,255,255,.07)" }}>
                <summary className="flex justify-between items-center px-6 py-4 cursor-pointer text-sm font-semibold" style={{ color: "white", listStyle: "none" }}>
                  {faq.q}
                  <svg className="flex-shrink-0 ml-4 transition-transform group-open:rotate-45" width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="7" stroke="rgba(167,139,250,.3)" strokeWidth="0.5"/><path d="M8 5v6M5 8h6" stroke="rgba(167,139,250,.7)" strokeWidth="1.2" strokeLinecap="round"/></svg>
                </summary>
                <div className="px-6 pb-5 text-sm" style={{ color: "var(--t2)", lineHeight: 1.7 }}>{faq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER CTA */}
      <div className="py-24 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 700px 400px at 50% 50%, rgba(139,92,246,.08) 0%, transparent 70%)" }} />
        <div className="relative z-10 max-w-2xl mx-auto">
          <div className="text-xs font-bold tracking-widest mb-6 uppercase" style={{ fontFamily: "'Geist Mono',monospace", color: "var(--t3)" }}>Ready when you are</div>
          <h2 className="text-4xl md:text-5xl mb-6" style={{ fontFamily: "'Instrument Serif',serif", color: "white" }}>A prototype you can<br /><span className="italic" style={{ color: "var(--brand-hi)" }}>click through.</span></h2>
          <p className="text-base mb-10" style={{ color: "var(--t2)", lineHeight: 1.7 }}>No institution is using NexusAI in production. The dashboard behind this button is sample data.</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <button onClick={() => navigate("/dashboard")} className="px-8 py-4 rounded-full text-base font-semibold" style={{ background: "linear-gradient(135deg,#8B5CF6,#7C3AED)", color: "white", boxShadow: "0 0 40px rgba(139,92,246,.3)" }}>
              Explore the Platform →
            </button>
            <button className="px-8 py-4 rounded-full text-base font-medium border-[0.5px]" style={{ background: "var(--glass2)", borderColor: "var(--border2)", color: "var(--t1)" }}>
              Request a Demo
            </button>
          </div>
          <div className="flex items-center justify-center gap-6 mt-12 text-xs flex-wrap" style={{ color: "var(--t3)" }}>
            {["Prototype", "No certification", "Illustrative data only", "No uptime claim", "Not a paid product"].map((badge, i) => (
              <span key={badge} className="flex items-center gap-1.5">
                <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5L4 7L8 3" stroke="#4A3D6A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/></svg>
                {badge}
              </span>
            ))}
          </div>
          <div className="mt-16 pt-8 border-t-[0.5px] flex justify-between items-center flex-wrap gap-4" style={{ borderColor: "var(--border)" }}>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "linear-gradient(135deg,#8B5CF6,#7C3AED)" }}>
                <svg viewBox="0 0 16 16" fill="none" style={{ width: 10, height: 10 }}>
                  <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1.5" fill="rgba(5,4,15,.8)"/>
                  <rect x="9" y="1.5" width="5.5" height="5.5" rx="1.5" fill="rgba(5,4,15,.5)"/>
                  <rect x="1.5" y="9" width="5.5" height="5.5" rx="1.5" fill="rgba(5,4,15,.5)"/>
                  <rect x="9" y="9" width="5.5" height="5.5" rx="1.5" fill="rgba(5,4,15,.8)"/>
                </svg>
              </div>
              <span style={{ fontFamily: "'Instrument Serif',serif", color: "rgba(167,139,250,.5)", fontSize: "13px" }}>Nexus<b style={{ color: "rgba(167,139,250,.7)" }}>AI</b></span>
            </div>
            <div className="flex gap-6 text-xs" style={{ color: "var(--t3)" }}>
              {["Privacy note", "Terms note", "Security note", "Prototype notes", "Contact"].map((link) => (
                <a key={link} href="#" className="hover:text-[var(--t2)] transition-colors" style={{ color: "var(--t3)", textDecoration: "none" }}>{link}</a>
              ))}
            </div>
            <div className="text-xs" style={{ color: "var(--t3)" }}>© 2026 NexusAI Inc. Toronto, Ontario</div>
          </div>
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
