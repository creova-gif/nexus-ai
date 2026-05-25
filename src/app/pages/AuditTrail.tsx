import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Activity, Filter, Search, Download, AlertTriangle, FileText, Users, CheckCircle, Shield, Zap } from "lucide-react";

const auditLogs = [
  { id: "AUD-1081", time: "2026-05-22 14:32:11", actor: "Marie Chen", role: "Compliance Officer", action: "SAR Filed", target: "SAR-104 · Account #CA-4471", category: "SAR", severity: "high", ip: "10.0.1.45" },
  { id: "AUD-1080", time: "2026-05-22 14:10:05", actor: "System", role: "AI Engine", action: "Alert Generated", target: "Structuring Pattern · $49,800 × 3", category: "Alert", severity: "critical", ip: "internal" },
  { id: "AUD-1079", time: "2026-05-22 13:55:22", actor: "Marie Chen", role: "Compliance Officer", action: "KYC Approved", target: "KYC-002 · Maria Gonzalez", category: "KYC", severity: "low", ip: "10.0.1.45" },
  { id: "AUD-1078", time: "2026-05-22 13:44:03", actor: "James Park", role: "Bank Admin", action: "Rule Enabled", target: "R-1003 · Structuring Anomalies", category: "Rules", severity: "medium", ip: "10.0.1.22" },
  { id: "AUD-1077", time: "2026-05-22 12:30:18", actor: "System", role: "AI Engine", action: "Network Graph Scan", target: "Global Trade Corp · 6-node cluster", category: "Network", severity: "high", ip: "internal" },
  { id: "AUD-1076", time: "2026-05-22 11:15:42", actor: "Sophie Renaud", role: "Supervisor", action: "SAR Approved", target: "SAR-105 · Global Trade Corp", category: "SAR", severity: "high", ip: "10.0.1.67" },
  { id: "AUD-1075", time: "2026-05-22 10:02:55", actor: "Marie Chen", role: "Compliance Officer", action: "Case Opened", target: "CASE-992 · Suspected Structuring", category: "Case", severity: "medium", ip: "10.0.1.45" },
  { id: "AUD-1074", time: "2026-05-22 09:45:30", actor: "System", role: "Screening Engine", action: "Sanctions Match", target: "Blue Horizon Finance · OFAC SDN 99%", category: "Sanctions", severity: "critical", ip: "internal" },
  { id: "AUD-1073", time: "2026-05-22 09:10:11", actor: "James Park", role: "Bank Admin", action: "User Login", target: "Session started · 2FA verified", category: "Auth", severity: "low", ip: "10.0.1.22" },
  { id: "AUD-1072", time: "2026-05-22 08:55:03", actor: "Marie Chen", role: "Compliance Officer", action: "Alert Closed", target: "Alert #AML-2026-0469 · Resolved", category: "Alert", severity: "low", ip: "10.0.1.45" },
];

const categoryIcons: Record<string, typeof Activity> = {
  SAR: FileText, Alert: AlertTriangle, KYC: Users, Rules: Shield, Network: Activity, Case: FileText, Sanctions: Shield, Auth: CheckCircle,
};

const severityStyle: Record<string, string> = {
  critical: "bg-[rgba(248,113,113,.12)] text-[var(--coral)] border-[rgba(248,113,113,.3)]",
  high: "bg-[rgba(251,191,36,.12)] text-[var(--amber)] border-[rgba(251,191,36,.3)]",
  medium: "bg-[var(--brand-glow)] text-[var(--brand-hi)] border-[var(--border-purple)]",
  low: "bg-[rgba(52,211,153,.10)] text-[var(--teal)] border-[rgba(52,211,153,.28)]",
};

const categoryStyle: Record<string, string> = {
  SAR: "text-[var(--brand-hi)]", Alert: "text-[var(--coral)]", KYC: "text-[var(--sky)]",
  Rules: "text-[var(--teal)]", Network: "text-[var(--amber)]", Case: "text-[var(--brand-hi)]",
  Sanctions: "text-[var(--coral)]", Auth: "text-[var(--teal)]",
};

export default function AuditTrail() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("ALL");

  const categories = ["ALL", "Alert", "SAR", "KYC", "Sanctions", "Case", "Rules", "Auth"];

  const filtered = auditLogs.filter(log => {
    const matchSearch = log.action.toLowerCase().includes(search.toLowerCase()) || log.actor.toLowerCase().includes(search.toLowerCase()) || log.target.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === "ALL" || log.category === category;
    return matchSearch && matchCat;
  });

  return (
    <DashboardLayout pageTitle="Audit Trail" breadcrumb="Compliance Log">
      <div className="flex flex-col gap-4">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Total Events Today", value: auditLogs.length.toString(), color: "var(--brand-hi)" },
            { label: "Critical Events", value: auditLogs.filter(l => l.severity === "critical").length.toString(), color: "var(--coral)" },
            { label: "SAR Actions", value: auditLogs.filter(l => l.category === "SAR").length.toString(), color: "var(--amber)" },
            { label: "System Events", value: auditLogs.filter(l => l.actor === "System").length.toString(), color: "var(--teal)" },
          ].map((stat, i) => (
            <Card key={i} className="glass-2 border-[0.5px] border-[var(--border)] p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
              <div className="text-[0.6rem] font-bold tracking-widest uppercase text-[var(--text-purple-3)] font-['Geist_Mono'] mb-1">{stat.label}</div>
              <div className="text-2xl font-bold font-['Instrument_Serif']" style={{ color: stat.color }}>{stat.value}</div>
            </Card>
          ))}
        </div>

        {/* Filter Row */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-purple-3)]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search events, actors..."
              className="w-full bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg pl-9 pr-4 py-2 text-xs text-[var(--text-purple)] placeholder:text-[var(--text-purple-3)] outline-none focus:border-[var(--border-purple)]"
            />
          </div>
          <div className="flex gap-1 bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg p-0.5 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-2.5 py-1 text-[0.62rem] font-bold rounded-md transition-all font-['Geist_Mono'] ${category === cat ? "bg-[var(--brand)] text-white" : "text-[var(--text-purple-2)] hover:text-[var(--text-purple)]"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <button className="ml-auto flex items-center gap-1.5 px-3 py-1.5 text-xs text-[var(--text-purple-2)] bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg hover:border-[var(--border2)] transition-colors">
            <Download className="w-3.5 h-3.5" /> Export CSV
          </button>
        </div>

        {/* Log Table */}
        <Card className="glass-2 border-[0.5px] border-[var(--border)] overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b-[0.5px] border-[var(--border)]">
            <div className="flex items-center gap-2 font-['Geist_Mono'] text-[0.7rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)]">
              <Activity className="w-3.5 h-3.5" /> Immutable Audit Log
            </div>
            <div className="flex items-center gap-1.5 text-[0.6rem] text-[var(--brand-hi)] font-['Geist_Mono'] font-bold">
              <Zap className="w-2.5 h-2.5" /> CRYPTOGRAPHICALLY SIGNED
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-[var(--glass)]">
                  {["Time", "Actor", "Action", "Target", "Category", "Severity", "IP"].map(h => (
                    <th key={h} className="px-4 py-3 text-left font-['Geist_Mono'] text-[0.58rem] font-bold tracking-wider uppercase text-[var(--text-purple-3)] border-b-[0.5px] border-[var(--border)]">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(log => {
                  const Icon = categoryIcons[log.category] || Activity;
                  return (
                    <tr key={log.id} className="hover:bg-[var(--glass)] transition-colors">
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] font-['Geist_Mono'] text-[0.65rem] text-[var(--text-purple-3)] whitespace-nowrap">{log.time}</td>
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)]">
                        <div className="text-[var(--text-purple)] font-medium">{log.actor}</div>
                        <div className="text-[0.6rem] text-[var(--text-purple-3)]">{log.role}</div>
                      </td>
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] text-[var(--text-purple)] font-semibold">{log.action}</td>
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] text-[var(--text-purple-2)] max-w-[180px] truncate">{log.target}</td>
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)]">
                        <div className={`flex items-center gap-1.5 text-[0.65rem] font-semibold ${categoryStyle[log.category] || "text-[var(--text-purple-2)]"}`}>
                          <Icon className="w-3 h-3" /> {log.category}
                        </div>
                      </td>
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)]">
                        <span className={`px-2 py-0.5 rounded-full text-[0.58rem] font-bold border-[0.5px] font-['Geist_Mono'] uppercase ${severityStyle[log.severity]}`}>{log.severity}</span>
                      </td>
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] font-['Geist_Mono'] text-[0.62rem] text-[var(--text-purple-3)]">{log.ip}</td>
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
