import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAppStore } from "../store";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AlertTriangle, Filter, Search, ChevronDown } from "lucide-react";

export default function AMLAlerts() {
  const { alerts, updateAlertStatus } = useAppStore();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const getScoreColor = (score: number) => {
    if (score >= 90) return { bg: "rgba(248,113,113,.12)", text: "var(--coral)" };
    if (score >= 75) return { bg: "rgba(251,191,36,.12)", text: "var(--amber)" };
    return { bg: "var(--brand-glow)", text: "var(--brand-hi)" };
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "NEW": return "bg-[rgba(248,113,113,.12)] text-[var(--coral)] border-[rgba(248,113,113,.22)]";
      case "REVIEWING": return "bg-[rgba(251,191,36,.12)] text-[var(--amber)] border-[rgba(251,191,36,.22)]";
      case "INVESTIGATING": return "bg-[var(--brand-glow)] text-[var(--brand-hi)] border-[var(--border-purple)]";
      case "CLOSED": return "bg-[rgba(52,211,153,.10)] text-[var(--teal)] border-[rgba(52,211,153,.22)]";
      default: return "";
    }
  };

  const filtered = alerts.filter(a => {
    const matchSearch = a.type.toLowerCase().includes(search.toLowerCase()) || a.detail.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "ALL" || a.riskLevel.toUpperCase() === filter;
    return matchSearch && matchFilter;
  });

  const counts = {
    critical: alerts.filter(a => a.riskLevel === "critical").length,
    high: alerts.filter(a => a.riskLevel === "high").length,
    medium: alerts.filter(a => a.riskLevel === "medium").length,
  };

  return (
    <DashboardLayout pageTitle="AML Alerts" breadcrumb="Alert Queue">
      <div className="flex flex-col gap-4">

        {/* Summary Strip */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Total Alerts", value: alerts.length.toString(), color: "var(--brand-hi)", bg: "var(--brand-glow)" },
            { label: "Critical", value: counts.critical.toString(), color: "var(--coral)", bg: "rgba(248,113,113,.10)" },
            { label: "High Risk", value: counts.high.toString(), color: "var(--amber)", bg: "rgba(251,191,36,.10)" },
            { label: "Under Review", value: alerts.filter(a => a.status === "REVIEWING" || a.status === "INVESTIGATING").length.toString(), color: "var(--teal)", bg: "rgba(52,211,153,.10)" },
          ].map((stat, i) => (
            <Card key={i} className="glass-2 border-[0.5px] border-[var(--border)] p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
              <div className="text-[0.6rem] font-bold tracking-widest uppercase text-[var(--text-purple-3)] font-['Geist_Mono'] mb-1">{stat.label}</div>
              <div className="text-2xl font-bold" style={{ color: stat.color, fontFamily: "'Instrument Serif', serif" }}>{stat.value}</div>
            </Card>
          ))}
        </div>

        {/* Filters Row */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-purple-3)]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search alerts..."
              className="w-full bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg pl-9 pr-4 py-2 text-xs text-[var(--text-purple)] placeholder:text-[var(--text-purple-3)] outline-none focus:border-[var(--border-purple)]"
            />
          </div>
          <div className="flex gap-1.5 bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg p-1">
            {["ALL", "CRITICAL", "HIGH", "MEDIUM"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1 text-[0.68rem] font-bold rounded-md transition-all font-['Geist_Mono'] ${filter === f ? "bg-[var(--brand)] text-white" : "text-[var(--text-purple-2)] hover:bg-[var(--glass3)] hover:text-[var(--text-purple)]"}`}
              >
                {f}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" className="glass border-[var(--border)] text-[var(--text-purple-2)] text-xs gap-1.5">
            <Filter className="w-3.5 h-3.5" /> More Filters <ChevronDown className="w-3 h-3" />
          </Button>
        </div>

        {/* Alerts Table */}
        <Card className="glass-2 border-[0.5px] border-[var(--border)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b-[0.5px] border-[var(--border)]">
            <div className="flex items-center gap-2 font-['Geist_Mono'] text-[0.72rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)]">
              <AlertTriangle className="w-3.5 h-3.5 text-[var(--coral)]" />
              Live Alert Queue
            </div>
            <span className="px-2 py-0.5 bg-[rgba(248,113,113,.12)] text-[var(--coral)] rounded-full text-[0.6rem] font-bold font-['Geist_Mono']">
              {filtered.length} ALERTS
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs">
              <thead>
                <tr className="bg-[var(--glass)]">
                  {["Alert Type", "Details", "Risk Score", "Status", "Actions"].map(h => (
                    <th key={h} className={`px-4 py-3 font-['Geist_Mono'] text-[0.6rem] font-bold tracking-wider uppercase text-[var(--text-purple-3)] border-b-[0.5px] border-[var(--border)] ${h === "Actions" ? "text-right" : "text-left"}`}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(alert => {
                  const sc = getScoreColor(alert.score);
                  return (
                    <tr key={alert.id} className="hover:bg-[var(--glass)] transition-colors">
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)]">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: sc.text }} />
                          <span className="font-medium text-[var(--text-purple)]">{alert.type}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] text-[var(--text-purple-2)] max-w-xs truncate">{alert.detail}</td>
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)]">
                        <span className="px-2 py-0.5 rounded-md text-[0.72rem] font-bold font-['Geist_Mono']" style={{ background: sc.bg, color: sc.text }}>
                          {alert.score}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)]">
                        <span className={`px-2 py-0.5 rounded-full text-[0.6rem] font-bold border-[0.5px] font-['Geist_Mono'] ${getStatusStyle(alert.status)}`}>
                          {alert.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] text-right">
                        <div className="flex gap-1.5 justify-end">
                          <button
                            onClick={() => updateAlertStatus(alert.id, "REVIEWING")}
                            className="px-2.5 py-1 text-[0.65rem] font-semibold rounded-md bg-[var(--brand-glow)] text-[var(--brand-hi)] border-[0.5px] border-[var(--border-purple)] hover:opacity-80 transition-opacity"
                          >
                            Review
                          </button>
                          <button
                            onClick={() => updateAlertStatus(alert.id, "CLOSED")}
                            className="px-2.5 py-1 text-[0.65rem] font-semibold rounded-md bg-[rgba(52,211,153,.10)] text-[var(--teal)] border-[0.5px] border-[rgba(52,211,153,.22)] hover:opacity-80 transition-opacity"
                          >
                            Close
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
