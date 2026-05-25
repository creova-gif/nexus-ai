import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Activity, CheckCircle, AlertTriangle, Cpu, Database, Zap, Globe, Clock } from "lucide-react";

const services = [
  { name: "AML Detection Engine", uptime: "99.98%", latency: "42ms", status: "operational", requests: "12,441/hr" },
  { name: "FINTRAC SAR API", uptime: "99.95%", latency: "118ms", status: "operational", requests: "84/hr" },
  { name: "Sanctions Screening", uptime: "99.99%", latency: "28ms", status: "operational", requests: "5,320/hr" },
  { name: "Graph Analysis Pipeline", uptime: "99.87%", latency: "340ms", status: "degraded", requests: "230/hr" },
  { name: "Open Banking API Gateway", uptime: "100%", latency: "55ms", status: "operational", requests: "3,100/hr" },
  { name: "KYC Document Processor", uptime: "99.92%", latency: "890ms", status: "operational", requests: "44/hr" },
  { name: "Audit Log Service", uptime: "100%", latency: "11ms", status: "operational", requests: "88,200/hr" },
  { name: "AI Advisory Engine", uptime: "98.4%", latency: "1,200ms", status: "degraded", requests: "310/hr" },
];

const recentIncidents = [
  { id: "INC-041", title: "Graph Analysis Pipeline — elevated latency", severity: "warning", duration: "18m", resolved: false, time: "14:22" },
  { id: "INC-040", title: "AI Advisory Engine — cold start delay", severity: "warning", duration: "5m", resolved: true, time: "09:14" },
  { id: "INC-039", title: "Scheduled maintenance window", severity: "info", duration: "30m", resolved: true, time: "Yesterday 03:00" },
];

const metrics = [
  { label: "Transactions Processed", value: "2.4M", sub: "Last 24h", color: "var(--brand-hi)", icon: Zap },
  { label: "API Uptime", value: "99.96%", sub: "30-day average", color: "var(--teal)", icon: Globe },
  { label: "Avg Response Time", value: "68ms", sub: "P95 across all services", color: "var(--sky)", icon: Clock },
  { label: "DB Queries/sec", value: "4,820", sub: "Peak today", color: "var(--gold)", icon: Database },
];

export default function SystemHealth() {
  return (
    <DashboardLayout pageTitle="System Health" breadcrumb="Platform Status">
      <div className="flex flex-col gap-4">

        {/* Overall Status Banner */}
        <div className="flex items-center gap-3 px-5 py-3.5 bg-[rgba(52,211,153,.06)] border-[0.5px] border-[rgba(52,211,153,.2)] rounded-xl">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--teal)] animate-pulse" style={{ boxShadow: "0 0 0 4px rgba(52,211,153,.15)" }} />
          <span className="text-sm font-semibold text-[var(--teal)]">All Systems Operational</span>
          <span className="text-xs text-[var(--text-purple-2)] ml-2">2 services degraded · non-critical</span>
          <span className="ml-auto text-[0.65rem] text-[var(--text-purple-3)] font-['Geist_Mono']">Last checked: just now</span>
        </div>

        {/* Top Metrics */}
        <div className="grid grid-cols-4 gap-3">
          {metrics.map((m, i) => {
            const Icon = m.icon;
            return (
              <Card key={i} className="glass-2 border-[0.5px] border-[var(--border)] p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${m.color}, transparent)` }} />
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-3.5 h-3.5 opacity-60" style={{ color: m.color }} />
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono']">{m.label}</span>
                </div>
                <div className="text-2xl font-bold font-['Instrument_Serif']" style={{ color: m.color }}>{m.value}</div>
                <div className="text-[0.62rem] text-[var(--text-purple-3)] mt-1">{m.sub}</div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-[1fr_300px] gap-4">
          {/* Service Status Table */}
          <Card className="glass-2 border-[0.5px] border-[var(--border)] overflow-hidden">
            <div className="px-5 py-3 border-b-[0.5px] border-[var(--border)] flex items-center gap-2 font-['Geist_Mono'] text-[0.7rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)]">
              <Cpu className="w-3.5 h-3.5" /> Service Status
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-[var(--glass)]">
                    {["Service", "Status", "Uptime", "Latency", "Throughput"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-['Geist_Mono'] text-[0.58rem] font-bold tracking-wider uppercase text-[var(--text-purple-3)] border-b-[0.5px] border-[var(--border)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {services.map((svc, i) => (
                    <tr key={i} className="hover:bg-[var(--glass)] transition-colors">
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] font-medium text-[var(--text-purple)]">{svc.name}</td>
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)]">
                        <div className="flex items-center gap-1.5">
                          {svc.status === "operational"
                            ? <CheckCircle className="w-3.5 h-3.5 text-[var(--teal)]" />
                            : <AlertTriangle className="w-3.5 h-3.5 text-[var(--amber)]" />
                          }
                          <span className={`text-[0.65rem] font-semibold ${svc.status === "operational" ? "text-[var(--teal)]" : "text-[var(--amber)]"}`}>
                            {svc.status.charAt(0).toUpperCase() + svc.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] font-['Geist_Mono'] text-[var(--teal)]">{svc.uptime}</td>
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] font-['Geist_Mono'] text-[var(--text-purple-2)]">{svc.latency}</td>
                      <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] text-[var(--text-purple-2)]">{svc.requests}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Incidents */}
          <Card className="glass-2 border-[0.5px] border-[var(--border)] flex flex-col overflow-hidden">
            <div className="px-5 py-3 border-b-[0.5px] border-[var(--border)] flex items-center gap-2 font-['Geist_Mono'] text-[0.7rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)]">
              <Activity className="w-3.5 h-3.5" /> Recent Incidents
            </div>
            <div className="p-4 space-y-3 flex-1">
              {recentIncidents.map((inc, i) => (
                <div key={i} className={`p-3 rounded-lg border-[0.5px] ${inc.resolved ? "border-[var(--border)] bg-[var(--glass)]" : "border-[rgba(251,191,36,.3)] bg-[rgba(251,191,36,.05)]"}`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[0.6rem] font-bold font-['Geist_Mono'] text-[var(--text-purple-3)]">{inc.id}</span>
                    <span className={`text-[0.58rem] font-bold px-1.5 py-0.5 rounded-full border-[0.5px] font-['Geist_Mono'] ${inc.resolved ? "bg-[rgba(52,211,153,.10)] text-[var(--teal)] border-[rgba(52,211,153,.28)]" : "bg-[rgba(251,191,36,.12)] text-[var(--amber)] border-[rgba(251,191,36,.3)]"}`}>
                      {inc.resolved ? "RESOLVED" : "ACTIVE"}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-purple)] mb-1.5">{inc.title}</p>
                  <div className="flex items-center justify-between text-[0.6rem] text-[var(--text-purple-3)]">
                    <span>Duration: {inc.duration}</span>
                    <span>{inc.time}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t-[0.5px] border-[var(--border)]">
              <button className="w-full py-1.5 text-[0.68rem] font-semibold text-[var(--brand-hi)] bg-[var(--brand-glow)] border-[0.5px] border-[var(--border-purple)] rounded-lg hover:opacity-80 transition-opacity">
                View Full Incident History
              </button>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
