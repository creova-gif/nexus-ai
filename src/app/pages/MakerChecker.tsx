import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { CheckCircle, XCircle, Clock, AlertTriangle, ShieldCheck, BarChart2, RefreshCw, Eye } from "lucide-react";

const qaQueue = [
  { id: "QA-2026-0041", originalCase: "CASE-2026-0039", entity: "Viktor Sokolov", closedBy: "J. Okafor", closedAt: "May 22, 16:40", decision: "No Further Action", riskScore: 88, flagged: true, reason: "High risk score closed without SAR" },
  { id: "QA-2026-0038", originalCase: "CASE-2026-0033", entity: "Blue Horizon Finance", closedBy: "S. Patel", closedAt: "May 21, 14:20", decision: "No Further Action", riskScore: 54, flagged: false, reason: null },
  { id: "QA-2026-0031", originalCase: "CASE-2026-0026", entity: "Meridian Holdings Ltd", closedBy: "J. Okafor", closedAt: "May 20, 11:05", decision: "SAR Filed", riskScore: 74, flagged: false, reason: null },
];

const metrics = [
  { label: "Cases Closed (30D)", value: "214", sub: "21 routed to QA", color: "var(--brand-hi)" },
  { label: "QA Pass Rate", value: "91.2%", sub: "18 / 21 approved", color: "var(--teal)" },
  { label: "QA Overturned", value: "3", sub: "decisions reversed", color: "var(--coral)" },
  { label: "Avg Review Time", value: "6.4h", sub: "target: < 8h", color: "var(--amber)" },
];

const recentDecisions = [
  { id: "QA-2026-0029", entity: "Pacific Commerce", outcome: "Approved", reviewer: "M. Singh", date: "May 20" },
  { id: "QA-2026-0025", entity: "Shell LLC A", outcome: "Overturned", reviewer: "M. Singh", date: "May 18" },
  { id: "QA-2026-0022", entity: "Northern Holdings", outcome: "Approved", reviewer: "D. Clarke", date: "May 17" },
  { id: "QA-2026-0019", entity: "Offshore Trust B", outcome: "Overturned", reviewer: "M. Singh", date: "May 16" },
  { id: "QA-2026-0015", entity: "Acct #CA-1102", outcome: "Approved", reviewer: "D. Clarke", date: "May 14" },
];

export default function MakerChecker() {
  const [queue, setQueue] = useState(qaQueue);
  const [selected, setSelected] = useState(qaQueue[0]);

  const approve = (id: string) => {
    setQueue(prev => prev.filter(q => q.id !== id));
    if (selected?.id === id) setSelected(queue.find(q => q.id !== id) || qaQueue[0]);
  };

  const overturn = (id: string) => {
    setQueue(prev => prev.filter(q => q.id !== id));
    if (selected?.id === id) setSelected(queue.find(q => q.id !== id) || qaQueue[0]);
  };

  return (
    <DashboardLayout pageTitle="Maker-Checker QA" breadcrumb="Automated Quality Assurance">
      <div className="flex flex-col gap-4">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {metrics.map((m, i) => (
            <Card key={i} className="glass-2 border-[0.5px] border-[var(--border)] p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }} />
              <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-1">{m.label}</div>
              <div className="text-2xl font-bold font-['Instrument_Serif']" style={{ color: m.color }}>{m.value}</div>
              <div className="text-[0.6rem] text-[var(--text-purple-3)] mt-0.5">{m.sub}</div>
            </Card>
          ))}
        </div>

        {/* Protocol Explanation */}
        <div className="flex items-start gap-3 px-5 py-3.5 bg-[rgba(139,92,246,.05)] border-[0.5px] border-[var(--border-purple)] rounded-xl">
          <ShieldCheck className="w-4 h-4 text-[var(--brand-hi)] flex-shrink-0 mt-0.5" />
          <div className="text-xs text-[var(--text-purple-2)]">
            <span className="font-semibold text-white">Maker-Checker Protocol: </span>
            Every 10th closed case is automatically routed here for independent QA review. Flagged cases (e.g. high-risk entities closed without a SAR) are prioritized. Overturned decisions are re-opened and escalated to the Compliance Manager.
          </div>
          <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">
            <RefreshCw className="w-3 h-3 text-[var(--teal)]" />
            <span className="text-[0.62rem] text-[var(--teal)] font-['Geist_Mono'] font-bold">AUTO-SAMPLING: ON</span>
          </div>
        </div>

        <div className="flex gap-4">

          {/* QA Queue */}
          <div className="w-[280px] flex-shrink-0 flex flex-col gap-2">
            <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] px-1 mb-1">
              QA Queue <span className="text-[var(--coral)]">({queue.length})</span>
            </div>
            {queue.length === 0 ? (
              <div className="p-8 text-center glass-2 border-[0.5px] border-[var(--border)] rounded-xl">
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-[var(--teal)] opacity-60" />
                <p className="text-xs text-[var(--text-purple-3)]">Queue clear. All cases reviewed.</p>
              </div>
            ) : (
              queue.map(q => (
                <div
                  key={q.id}
                  onClick={() => setSelected(q)}
                  className={`p-3.5 rounded-xl border-[0.5px] cursor-pointer transition-all ${selected?.id === q.id ? "border-[var(--border-purple)] bg-[var(--glass2)]" : "border-[var(--border)] bg-[var(--glass)] hover:border-[var(--border2)]"}`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-xs font-semibold text-white">{q.entity}</div>
                      <div className="text-[0.6rem] text-[var(--text-purple-3)] font-['Geist_Mono'] mt-0.5">{q.id}</div>
                    </div>
                    {q.flagged && <AlertTriangle className="w-3.5 h-3.5 text-[var(--coral)] flex-shrink-0 mt-0.5" />}
                  </div>
                  <div className="flex items-center justify-between text-[0.6rem]">
                    <span className="text-[var(--text-purple-3)]">Closed by {q.closedBy}</span>
                    <span className={`font-bold font-['Geist_Mono']`} style={{ color: q.riskScore > 80 ? "var(--coral)" : q.riskScore > 60 ? "var(--amber)" : "var(--teal)" }}>Risk {q.riskScore}</span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Case Detail */}
          <div className="flex-1 flex flex-col gap-4">
            {selected && queue.find(q => q.id === selected.id) ? (
              <>
                <Card className="glass-2 border-[0.5px] border-[var(--border)] p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="text-lg font-bold text-white font-['Instrument_Serif']">{selected.entity}</h2>
                        {selected.flagged && (
                          <span className="flex items-center gap-1 text-[0.6rem] font-bold text-[var(--coral)] bg-[rgba(248,113,113,.1)] border-[0.5px] border-[rgba(248,113,113,.3)] px-2 py-0.5 rounded-full font-['Geist_Mono']">
                            <AlertTriangle className="w-2.5 h-2.5" /> PRIORITY FLAG
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-[var(--text-purple-2)]">{selected.originalCase} · Closed {selected.closedAt} by {selected.closedBy}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" className="gradient-purple text-white text-xs h-8 gap-1.5" onClick={() => approve(selected.id)}>
                        <CheckCircle className="w-3.5 h-3.5" /> Approve Decision
                      </Button>
                      <Button size="sm" variant="outline" className="border-[rgba(248,113,113,.4)] text-[var(--coral)] text-xs h-8 gap-1.5 hover:bg-[rgba(248,113,113,.08)]" onClick={() => overturn(selected.id)}>
                        <XCircle className="w-3.5 h-3.5" /> Overturn & Re-Open
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Original Decision", value: selected.decision, color: "var(--text-purple)" },
                      { label: "Entity Risk Score", value: selected.riskScore.toString(), color: selected.riskScore > 80 ? "var(--coral)" : selected.riskScore > 60 ? "var(--amber)" : "var(--teal)" },
                      { label: "QA Status", value: "Pending Review", color: "var(--amber)" },
                    ].map((f, i) => (
                      <div key={i} className="p-3 bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg">
                        <div className="text-[0.57rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-1">{f.label}</div>
                        <div className="text-sm font-bold" style={{ color: f.color }}>{f.value}</div>
                      </div>
                    ))}
                  </div>

                  {selected.flagged && selected.reason && (
                    <div className="mt-4 flex items-start gap-2.5 px-4 py-3 bg-[rgba(248,113,113,.06)] border-[0.5px] border-[rgba(248,113,113,.25)] rounded-lg">
                      <AlertTriangle className="w-3.5 h-3.5 text-[var(--coral)] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-[0.65rem] font-bold text-[var(--coral)] mb-0.5">Auto-Flagged by QA Engine</div>
                        <div className="text-[0.65rem] text-[var(--text-purple-2)]">{selected.reason}</div>
                      </div>
                    </div>
                  )}
                </Card>

                <Card className="glass-2 border-[0.5px] border-[var(--border)] p-5">
                  <h3 className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-4 flex items-center gap-2">
                    <Eye className="w-3.5 h-3.5" /> Case Activity Summary
                  </h3>
                  <div className="space-y-2.5">
                    {[
                      { time: "May 20, 08:00", text: "Alert AML-2026-0468 fired — PEP match detected for Viktor Sokolov", type: "alert" },
                      { time: "May 20, 09:15", text: "Case assigned to Investigator J. Okafor", type: "info" },
                      { time: "May 21, 14:30", text: "Document request sent via SMS — Source of Wealth declaration", type: "info" },
                      { time: "May 22, 10:00", text: "Case reviewed. Investigator noted: entity claims diplomatic exemption.", type: "info" },
                      { time: "May 22, 16:40", text: "Case closed: No Further Action — no SAR filed despite risk score of 88", type: "warn" },
                      { time: "May 22, 16:40", text: "QA Engine auto-sampled for maker-checker review", type: "qa" },
                    ].map((e, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${e.type === "alert" ? "bg-[var(--coral)]" : e.type === "warn" ? "bg-[var(--amber)]" : e.type === "qa" ? "bg-[var(--brand-hi)]" : "bg-[var(--text-purple-3)]"}`} />
                        <div>
                          <div className="text-[0.6rem] text-[var(--text-purple-3)] font-['Geist_Mono'] mb-0.5">{e.time}</div>
                          <div className="text-[0.7rem] text-[var(--text-purple-2)]">{e.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <CheckCircle className="w-10 h-10 mx-auto mb-3 text-[var(--teal)] opacity-40" />
                  <p className="text-sm text-[var(--text-purple-3)]">Select a case from the queue to review</p>
                </div>
              </div>
            )}
          </div>

          {/* Right: History */}
          <div className="w-[240px] flex-shrink-0 flex flex-col gap-3">
            <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] px-1">Recent QA Decisions</div>
            <Card className="glass-2 border-[0.5px] border-[var(--border)] overflow-hidden flex-1">
              <div className="divide-y-[0.5px] divide-[var(--border)]">
                {recentDecisions.map((d, i) => (
                  <div key={i} className="px-4 py-3 flex items-center gap-3">
                    {d.outcome === "Approved"
                      ? <CheckCircle className="w-3.5 h-3.5 text-[var(--teal)] flex-shrink-0" />
                      : <XCircle className="w-3.5 h-3.5 text-[var(--coral)] flex-shrink-0" />
                    }
                    <div className="flex-1 min-w-0">
                      <div className="text-[0.65rem] font-semibold text-[var(--text-purple)] truncate">{d.entity}</div>
                      <div className="text-[0.58rem] text-[var(--text-purple-3)]">{d.id} · {d.reviewer} · {d.date}</div>
                    </div>
                    <span className={`text-[0.55rem] font-bold font-['Geist_Mono'] ${d.outcome === "Approved" ? "text-[var(--teal)]" : "text-[var(--coral)]"}`}>{d.outcome.toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="glass-2 border-[0.5px] border-[var(--border)] p-4">
              <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-3 flex items-center gap-1.5">
                <BarChart2 className="w-3 h-3" /> Investigator Accuracy
              </div>
              {[
                { name: "J. Okafor", score: 88 },
                { name: "S. Patel", score: 94 },
                { name: "D. Clarke", score: 97 },
              ].map((inv, i) => (
                <div key={i} className="mb-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-[0.65rem] text-[var(--text-purple-2)]">{inv.name}</span>
                    <span className="text-[0.65rem] font-bold font-['Geist_Mono']" style={{ color: inv.score > 92 ? "var(--teal)" : inv.score > 85 ? "var(--amber)" : "var(--coral)" }}>{inv.score}%</span>
                  </div>
                  <div className="h-1.5 bg-[var(--glass3)] rounded overflow-hidden">
                    <div className="h-full rounded" style={{ width: `${inv.score}%`, background: inv.score > 92 ? "var(--teal)" : inv.score > 85 ? "var(--amber)" : "var(--coral)" }} />
                  </div>
                </div>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
