import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { TrendingUp, TrendingDown, Target, DollarSign, PieChart, User, Zap } from "lucide-react";

const clients = [
  { id: "CLI-001", name: "James Whitfield", segment: "HNW", portfolio: "$2.4M", ytd: "+14.2%", risk: "Moderate", status: "on-track", advisor: "M. Chen" },
  { id: "CLI-002", name: "Priya Sharma", segment: "Mass Affluent", portfolio: "$380K", ytd: "+6.8%", risk: "Conservative", status: "at-risk", advisor: "M. Chen" },
  { id: "CLI-003", name: "David Okonkwo", segment: "HNW", portfolio: "$1.1M", ytd: "+19.5%", risk: "Aggressive", status: "on-track", advisor: "M. Chen" },
  { id: "CLI-004", name: "Sophie Tremblay", segment: "Mass Affluent", portfolio: "$210K", ytd: "-2.1%", risk: "Moderate", status: "review", advisor: "M. Chen" },
];

const recommendations = [
  { client: "James Whitfield", action: "Rebalance equities — overweight tech by 8%", priority: "high", type: "Rebalance" },
  { client: "Priya Sharma", action: "Increase bond allocation ahead of rate decision", priority: "medium", type: "Allocation" },
  { client: "David Okonkwo", action: "Tax-loss harvesting opportunity in Q2", priority: "low", type: "Tax" },
  { client: "Sophie Tremblay", action: "Risk review — negative YTD, suggest conservative shift", priority: "high", type: "Risk" },
];

const allocationData = [
  { label: "Equities", pct: 54, color: "var(--brand-hi)" },
  { label: "Fixed Income", pct: 22, color: "var(--teal)" },
  { label: "Alternatives", pct: 14, color: "var(--gold)" },
  { label: "Cash", pct: 10, color: "var(--sky)" },
];

export default function FinancialAdvisory() {
  const [selected, setSelected] = useState(clients[0]);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "on-track": return { label: "ON TRACK", cls: "bg-[rgba(52,211,153,.10)] text-[var(--teal)] border-[rgba(52,211,153,.28)]" };
      case "at-risk": return { label: "AT RISK", cls: "bg-[rgba(248,113,113,.12)] text-[var(--coral)] border-[rgba(248,113,113,.3)]" };
      case "review": return { label: "REVIEW", cls: "bg-[rgba(251,191,36,.12)] text-[var(--amber)] border-[rgba(251,191,36,.3)]" };
      default: return { label: status.toUpperCase(), cls: "" };
    }
  };

  const getPriorityStyle = (p: string) => {
    switch (p) {
      case "high": return "text-[var(--coral)]";
      case "medium": return "text-[var(--amber)]";
      default: return "text-[var(--teal)]";
    }
  };

  return (
    <DashboardLayout pageTitle="Financial Advisory" breadcrumb="Client Portfolios">
      <div className="flex gap-4 h-[calc(100vh-130px)]">

        {/* Left: Client List */}
        <div className="w-[280px] flex-shrink-0 flex flex-col gap-2 overflow-y-auto">
          <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] px-1 mb-1">
            {clients.length} Clients
          </div>
          {clients.map(c => {
            const st = getStatusStyle(c.status);
            const isPositive = c.ytd.startsWith("+");
            return (
              <div
                key={c.id}
                onClick={() => setSelected(c)}
                className={`p-3.5 rounded-xl border-[0.5px] cursor-pointer transition-all ${selected?.id === c.id ? "border-[var(--border-purple)] bg-[var(--glass2)]" : "border-[var(--border)] bg-[var(--glass)] hover:border-[var(--border2)]"}`}
              >
                <div className="flex items-center gap-2.5 mb-2">
                  <div className="w-8 h-8 rounded-full gradient-purple flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {c.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{c.name}</div>
                    <div className="text-[0.62rem] text-[var(--text-purple-3)]">{c.segment} · {c.id}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-[var(--brand-hi)]">{c.portfolio}</span>
                  <span className={`text-xs font-bold ${isPositive ? "text-[var(--teal)]" : "text-[var(--coral)]"}`}>
                    {c.ytd} YTD
                  </span>
                </div>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-[0.62rem] text-[var(--text-purple-3)]">{c.risk} Risk</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[0.57rem] font-bold border-[0.5px] font-['Geist_Mono'] ${st.cls}`}>{st.label}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Detail */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
          {selected && (
            <>
              {/* Client Header */}
              <Card className="glass-2 border-[0.5px] border-[var(--border)]">
                <div className="px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full gradient-purple flex items-center justify-center text-white font-bold text-lg">
                      {selected.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white font-['Instrument_Serif']">{selected.name}</h2>
                      <p className="text-xs text-[var(--text-purple-2)]">{selected.segment} · {selected.risk} Risk · Advisor: {selected.advisor}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="glass border-[var(--border)] text-[var(--text-purple-2)] text-xs h-8">
                      <User className="w-3.5 h-3.5 mr-1" /> Client Profile
                    </Button>
                    <Button size="sm" className="gradient-purple text-white text-xs h-8">
                      <Zap className="w-3.5 h-3.5 mr-1" /> AI Insights
                    </Button>
                  </div>
                </div>
              </Card>

              {/* KPI Row */}
              <div className="grid grid-cols-4 gap-3">
                {[
                  { icon: DollarSign, label: "Portfolio Value", value: selected.portfolio, color: "var(--brand-hi)" },
                  { icon: selected.ytd.startsWith("+") ? TrendingUp : TrendingDown, label: "YTD Return", value: selected.ytd, color: selected.ytd.startsWith("+") ? "var(--teal)" : "var(--coral)" },
                  { icon: Target, label: "Risk Profile", value: selected.risk, color: "var(--sky)" },
                  { icon: PieChart, label: "Asset Classes", value: "4 active", color: "var(--gold)" },
                ].map((kpi, i) => {
                  const Icon = kpi.icon;
                  return (
                    <Card key={i} className="glass-2 border-[0.5px] border-[var(--border)] p-4 relative overflow-hidden">
                      <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${kpi.color}, transparent)` }} />
                      <div className="flex items-center gap-2 mb-2">
                        <Icon className="w-3.5 h-3.5 opacity-60" style={{ color: kpi.color }} />
                        <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono']">{kpi.label}</span>
                      </div>
                      <div className="text-xl font-bold font-['Instrument_Serif']" style={{ color: kpi.color }}>{kpi.value}</div>
                    </Card>
                  );
                })}
              </div>

              {/* Allocation + Recommendations */}
              <div className="grid grid-cols-2 gap-4">
                <Card className="glass-2 border-[0.5px] border-[var(--border)] p-5">
                  <h3 className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-4">Asset Allocation</h3>
                  <div className="space-y-3">
                    {allocationData.map((a, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <span className="text-xs text-[var(--text-purple-2)] w-24">{a.label}</span>
                        <div className="flex-1 h-2 bg-[var(--glass3)] rounded overflow-hidden">
                          <div className="h-full rounded transition-all" style={{ width: `${a.pct}%`, background: a.color }} />
                        </div>
                        <span className="text-xs font-bold font-['Geist_Mono'] w-8 text-right" style={{ color: a.color }}>{a.pct}%</span>
                      </div>
                    ))}
                  </div>
                </Card>

                <Card className="glass-2 border-[0.5px] border-[var(--border)] p-5">
                  <h3 className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-4">AI Recommendations</h3>
                  <div className="space-y-2.5">
                    {recommendations.filter(r => r.client === selected.name).length > 0
                      ? recommendations.filter(r => r.client === selected.name).map((r, i) => (
                        <div key={i} className="flex items-start gap-2.5 p-3 bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg">
                          <Zap className={`w-3.5 h-3.5 flex-shrink-0 mt-0.5 ${getPriorityStyle(r.priority)}`} />
                          <div className="flex-1">
                            <div className="text-xs text-[var(--text-purple)]">{r.action}</div>
                            <div className="text-[0.6rem] text-[var(--text-purple-3)] mt-1 font-['Geist_Mono']">{r.type} · {r.priority} priority</div>
                          </div>
                        </div>
                      ))
                      : (
                        <div className="text-xs text-[var(--text-purple-3)] py-4 text-center">No active recommendations</div>
                      )
                    }
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
