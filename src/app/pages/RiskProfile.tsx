import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAppStore } from "../store";
import { Card } from "../components/ui/card";
import { TrendingUp, TrendingDown, Zap, Info, User, Shield } from "lucide-react";

const customers = [
  {
    id: "ENT-001", name: "Global Trade Corp", type: "Business", totalScore: 85,
    xai: [
      { factor: "Base Score", value: 20, color: "var(--brand-hi)", desc: "Standard entity baseline" },
      { factor: "Geographic Risk", value: 15, color: "var(--amber)", desc: "Jurisdiction: Ukraine, Moldova" },
      { factor: "PEP Association", value: 25, color: "var(--coral)", desc: "Director linked to PEP list" },
      { factor: "Transaction Velocity", value: 18, color: "var(--amber)", desc: "47 txns > $10K in 30 days" },
      { factor: "Network Anomaly", value: 7, color: "var(--brand-hi)", desc: "Connected to 2 flagged entities" },
    ],
    trend: [40, 45, 42, 55, 60, 72, 80, 85],
    segment: "Corporate", country: "CA", since: "2023-11",
  },
  {
    id: "ENT-002", name: "Viktor Sokolov", type: "Individual", totalScore: 94,
    xai: [
      { factor: "Base Score", value: 20, color: "var(--brand-hi)", desc: "Standard individual baseline" },
      { factor: "PEP Match", value: 40, color: "var(--coral)", desc: "Confirmed UN Security Council match" },
      { factor: "Geographic Risk", value: 20, color: "var(--coral)", desc: "Jurisdiction: Russia" },
      { factor: "Adverse Media", value: 14, color: "var(--amber)", desc: "3 recent negative news hits" },
    ],
    trend: [30, 35, 38, 60, 70, 85, 90, 94],
    segment: "HNW Individual", country: "RU", since: "2024-02",
  },
  {
    id: "ENT-003", name: "Meridian Holdings Ltd", type: "Business", totalScore: 38,
    xai: [
      { factor: "Base Score", value: 20, color: "var(--brand-hi)", desc: "Standard entity baseline" },
      { factor: "Geographic Risk", value: 8, color: "var(--teal)", desc: "Jurisdiction: Canada" },
      { factor: "Transaction Pattern", value: 10, color: "var(--teal)", desc: "Normal commercial activity" },
    ],
    trend: [45, 42, 38, 35, 36, 37, 39, 38],
    segment: "SME", country: "CA", since: "2022-06",
  },
];

const getRiskLabel = (score: number) => {
  if (score >= 80) return { label: "CRITICAL", color: "var(--coral)", bg: "rgba(248,113,113,.12)", border: "rgba(248,113,113,.3)" };
  if (score >= 60) return { label: "HIGH", color: "var(--amber)", bg: "rgba(251,191,36,.12)", border: "rgba(251,191,36,.3)" };
  if (score >= 40) return { label: "MEDIUM", color: "var(--brand-hi)", bg: "var(--brand-glow)", border: "var(--border-purple)" };
  return { label: "LOW", color: "var(--teal)", bg: "rgba(52,211,153,.10)", border: "rgba(52,211,153,.28)" };
};

export default function RiskProfile() {
  const [selected, setSelected] = useState(customers[0]);

  const risk = getRiskLabel(selected.totalScore);
  const maxTrend = Math.max(...selected.trend);
  const minTrend = Math.min(...selected.trend);
  const trendRange = maxTrend - minTrend || 1;

  const trendPoints = selected.trend.map((v, i) => {
    const x = (i / (selected.trend.length - 1)) * 340;
    const y = 80 - ((v - minTrend) / trendRange) * 60;
    return `${x},${y}`;
  }).join(" ");

  return (
    <DashboardLayout pageTitle="Risk Profile" breadcrumb="Explainable AI">
      <div className="flex gap-4 h-[calc(100vh-130px)]">

        {/* Left: Customer List */}
        <div className="w-[260px] flex-shrink-0 flex flex-col gap-2 overflow-y-auto">
          <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] px-1 mb-1">Entities</div>
          {customers.map(c => {
            const r = getRiskLabel(c.totalScore);
            return (
              <div
                key={c.id}
                onClick={() => setSelected(c)}
                className={`p-3.5 rounded-xl border-[0.5px] cursor-pointer transition-all ${selected.id === c.id ? "border-[var(--border-purple)] bg-[var(--glass2)]" : "border-[var(--border)] bg-[var(--glass)] hover:border-[var(--border2)]"}`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-full gradient-purple flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {c.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{c.name}</div>
                    <div className="text-[0.62rem] text-[var(--text-purple-3)]">{c.id} · {c.type}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-16 h-1.5 bg-[var(--glass3)] rounded overflow-hidden">
                      <div className="h-full rounded" style={{ width: `${c.totalScore}%`, background: r.color }} />
                    </div>
                    <span className="text-xs font-bold font-['Geist_Mono']" style={{ color: r.color }}>{c.totalScore}</span>
                  </div>
                  <span className="px-1.5 py-0.5 rounded-full text-[0.57rem] font-bold border-[0.5px] font-['Geist_Mono']" style={{ background: r.bg, color: r.color, borderColor: r.border }}>{r.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Profile Detail */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">

          {/* Header */}
          <Card className="glass-2 border-[0.5px] border-[var(--border)] p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px]" style={{ background: `linear-gradient(90deg, transparent, ${risk.color}, transparent)` }} />
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl gradient-purple flex items-center justify-center text-white text-xl font-bold flex-shrink-0">
                {selected.type === "Business" ? <Shield className="w-7 h-7" /> : <User className="w-7 h-7" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-white font-['Instrument_Serif']">{selected.name}</h2>
                  <span className="px-2 py-0.5 rounded-full text-[0.6rem] font-bold border-[0.5px] font-['Geist_Mono']" style={{ background: risk.bg, color: risk.color, borderColor: risk.border }}>{risk.label} RISK</span>
                </div>
                <p className="text-xs text-[var(--text-purple-2)]">{selected.id} · {selected.segment} · {selected.type} · Client since {selected.since}</p>
              </div>
              <div className="text-right">
                <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-1">Risk Score</div>
                <div className="text-4xl font-bold font-['Instrument_Serif']" style={{ color: risk.color }}>{selected.totalScore}</div>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4 flex-1">
            {/* XAI Breakdown */}
            <Card className="glass-2 border-[0.5px] border-[var(--border)] p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-3.5 h-3.5 text-[var(--brand-hi)]" />
                <h3 className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono']">Explainable AI — Score Breakdown</h3>
              </div>

              {/* Formula display */}
              <div className="flex flex-wrap items-center gap-1.5 mb-5 p-3 bg-[var(--bg)] border-[0.5px] border-[var(--border)] rounded-lg text-[0.65rem] font-['Geist_Mono']">
                {selected.xai.map((f, i) => (
                  <span key={i} className="flex items-center gap-1">
                    <span className="font-bold" style={{ color: f.color }}>{f.value}</span>
                    <span className="text-[var(--text-purple-3)]">({f.factor.split(" ")[0]})</span>
                    {i < selected.xai.length - 1 && <span className="text-[var(--text-purple-3)]">+</span>}
                  </span>
                ))}
                <span className="text-[var(--text-purple-3)]">=</span>
                <span className="font-bold text-sm" style={{ color: risk.color }}>{selected.totalScore}</span>
              </div>

              <div className="space-y-3 flex-1">
                {selected.xai.map((factor, i) => (
                  <div key={i}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: factor.color }} />
                        <span className="text-xs font-semibold text-[var(--text-purple)]">{factor.factor}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[0.65rem] text-[var(--text-purple-3)]">{factor.desc}</span>
                        <span className="text-xs font-bold font-['Geist_Mono']" style={{ color: factor.color }}>+{factor.value}</span>
                      </div>
                    </div>
                    <div className="h-1.5 bg-[var(--glass3)] rounded overflow-hidden">
                      <div className="h-full rounded transition-all duration-500" style={{ width: `${(factor.value / selected.totalScore) * 100}%`, background: factor.color }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-3 border-t-[0.5px] border-[var(--border)] flex items-center gap-1.5 text-[0.63rem] text-[var(--text-purple-3)]">
                <Info className="w-3 h-3 flex-shrink-0" />
                <span>Score computed by NexusAI XAI Engine v3.2 · FINTRAC-aligned methodology</span>
              </div>
            </Card>

            {/* Historical Trend */}
            <Card className="glass-2 border-[0.5px] border-[var(--border)] p-5 flex flex-col">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-3.5 h-3.5 text-[var(--brand-hi)]" />
                <h3 className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono']">Historical Risk Trend</h3>
              </div>

              <div className="flex-1 relative">
                <svg viewBox="0 -5 340 100" className="w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="trend-fill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={risk.color} stopOpacity="0.25" />
                      <stop offset="100%" stopColor={risk.color} stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <polygon
                    points={`0,80 ${trendPoints} 340,80`}
                    fill="url(#trend-fill)"
                  />
                  <polyline
                    points={trendPoints}
                    fill="none"
                    stroke={risk.color}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  {selected.trend.map((v, i) => {
                    const x = (i / (selected.trend.length - 1)) * 340;
                    const y = 80 - ((v - minTrend) / trendRange) * 60;
                    return <circle key={i} cx={x} cy={y} r="3" fill={risk.color} />;
                  })}
                </svg>
              </div>

              <div className="flex justify-between mt-3 text-[0.62rem] text-[var(--text-purple-3)] font-['Geist_Mono']">
                {["T-7", "T-6", "T-5", "T-4", "T-3", "T-2", "T-1", "Now"].map(t => (
                  <span key={t}>{t}</span>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[
                  { label: "Min Score", value: minTrend.toString() },
                  { label: "Max Score", value: maxTrend.toString() },
                  { label: "Direction", value: selected.trend[selected.trend.length - 1] > selected.trend[0] ? "Rising" : "Falling" },
                ].map((s, i) => (
                  <div key={i} className="bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg p-2">
                    <div className="text-[0.57rem] text-[var(--text-purple-3)] font-['Geist_Mono'] uppercase mb-0.5">{s.label}</div>
                    <div className="text-sm font-bold flex items-center justify-center gap-1" style={{ color: risk.color }}>
                      {s.label === "Direction" && (s.value === "Rising" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />)}
                      {s.value}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
