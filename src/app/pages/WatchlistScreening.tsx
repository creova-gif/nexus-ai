import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAppStore } from "../store";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Newspaper, AlertTriangle, CheckCircle, XCircle, ExternalLink, Filter, Search, Clock } from "lucide-react";

const pepMatches = [
  { id: "PEP-019", name: "Viktor Sokolov", source: "UN Security Council", confidence: 97, matched: "Viktor Sokoloff", status: "pending", date: "2026-05-22" },
  { id: "PEP-020", name: "Ana Santos Lima", source: "OFAC SDN", confidence: 61, matched: "Ana Santos", status: "false_positive", date: "2026-05-21" },
  { id: "PEP-021", name: "Chen Wei", source: "PEP Database", confidence: 54, matched: "Chen Wei (journalist)", status: "false_positive", date: "2026-05-20" },
  { id: "PEP-022", name: "Blue Horizon Finance", source: "EU Consolidated", confidence: 99, matched: "Blue Horizon Finance GmbH", status: "confirmed", date: "2026-05-19" },
];

export default function WatchlistScreening() {
  const { adverseMedia, resolveAdverseMedia } = useAppStore();
  const [mediaSearch, setMediaSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"media" | "pep">("media");
  const [pepStatuses, setPepStatuses] = useState<Record<string, string>>(
    Object.fromEntries(pepMatches.map(p => [p.id, p.status]))
  );

  const filtered = adverseMedia.filter(a =>
    a.entity.toLowerCase().includes(mediaSearch.toLowerCase()) ||
    a.headline.toLowerCase().includes(mediaSearch.toLowerCase())
  );

  const getSeverityStyle = (s: string) => {
    switch (s) {
      case "critical": return { cls: "bg-[rgba(248,113,113,.12)] text-[var(--coral)] border-[rgba(248,113,113,.3)]", label: "CRITICAL" };
      case "high": return { cls: "bg-[rgba(251,191,36,.12)] text-[var(--amber)] border-[rgba(251,191,36,.3)]", label: "HIGH" };
      default: return { cls: "bg-[var(--brand-glow)] text-[var(--brand-hi)] border-[var(--border-purple)]", label: "MEDIUM" };
    }
  };

  const getPepStyle = (s: string) => {
    switch (s) {
      case "confirmed": return "bg-[rgba(248,113,113,.12)] text-[var(--coral)] border-[rgba(248,113,113,.3)]";
      case "false_positive": return "bg-[rgba(52,211,153,.10)] text-[var(--teal)] border-[rgba(52,211,153,.28)]";
      default: return "bg-[rgba(251,191,36,.12)] text-[var(--amber)] border-[rgba(251,191,36,.3)]";
    }
  };

  const setPepStatus = (id: string, status: string) =>
    setPepStatuses(prev => ({ ...prev, [id]: status }));

  return (
    <DashboardLayout pageTitle="Adverse Media & Screening" breadcrumb="Ongoing Monitoring">
      <div className="flex flex-col gap-4">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Media Hits Today", value: adverseMedia.length.toString(), color: "var(--brand-hi)" },
            { label: "Critical Alerts", value: adverseMedia.filter(a => a.severity === "critical").length.toString(), color: "var(--coral)" },
            { label: "PEP Matches", value: pepMatches.length.toString(), color: "var(--amber)" },
            { label: "Pending Resolution", value: Object.values(pepStatuses).filter(s => s === "pending").length.toString(), color: "var(--sky)" },
          ].map((stat, i) => (
            <Card key={i} className="glass-2 border-[0.5px] border-[var(--border)] p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
              <div className="text-[0.6rem] font-bold tracking-widest uppercase text-[var(--text-purple-3)] font-['Geist_Mono'] mb-1">{stat.label}</div>
              <div className="text-2xl font-bold font-['Instrument_Serif']" style={{ color: stat.color }}>{stat.value}</div>
            </Card>
          ))}
        </div>

        {/* Tab Bar */}
        <div className="flex gap-1 bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg p-1 w-fit">
          {(["media", "pep"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-1.5 text-xs font-bold rounded-md transition-all font-['Geist_Mono'] ${activeTab === tab ? "bg-[var(--brand)] text-white" : "text-[var(--text-purple-2)] hover:text-[var(--text-purple)]"}`}
            >
              {tab === "media" ? "Adverse Media Feed" : "PEP / Sanctions Resolution"}
            </button>
          ))}
        </div>

        {activeTab === "media" && (
          <>
            <div className="flex items-center gap-3">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-purple-3)]" />
                <input
                  value={mediaSearch}
                  onChange={e => setMediaSearch(e.target.value)}
                  placeholder="Search entities, headlines..."
                  className="w-full bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg pl-9 pr-4 py-2 text-xs text-[var(--text-purple)] placeholder:text-[var(--text-purple-3)] outline-none focus:border-[var(--border-purple)]"
                />
              </div>
              <Button variant="outline" size="sm" className="glass border-[var(--border)] text-[var(--text-purple-2)] text-xs gap-1.5">
                <Filter className="w-3.5 h-3.5" /> Filter
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {filtered.map(item => {
                const sv = getSeverityStyle(item.severity);
                return (
                  <Card key={item.id} className="glass-2 border-[0.5px] border-[var(--border)] p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-[rgba(248,113,113,.10)] border-[0.5px] border-[rgba(248,113,113,.2)] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Newspaper className="w-4 h-4 text-[var(--coral)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className="text-sm font-bold text-white">{item.entity}</span>
                            <span className={`px-1.5 py-0.5 rounded-full text-[0.57rem] font-bold border-[0.5px] font-['Geist_Mono'] ${sv.cls}`}>{sv.label}</span>
                          </div>
                          <p className="text-sm text-[var(--text-purple)] mb-2 leading-snug">{item.headline}</p>
                          <div className="flex items-center gap-3 text-[0.65rem] text-[var(--text-purple-3)]">
                            <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" />{item.date}</span>
                            <span>{item.source}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 flex-shrink-0">
                        <button
                          onClick={() => resolveAdverseMedia(item.id, "reviewed")}
                          className="px-3 py-1.5 text-[0.65rem] font-bold rounded-lg bg-[var(--brand-glow)] text-[var(--brand-hi)] border-[0.5px] border-[var(--border-purple)] hover:opacity-80 transition-opacity flex items-center gap-1.5"
                        >
                          <CheckCircle className="w-3 h-3" /> Mark Reviewed
                        </button>
                        <button className="px-3 py-1.5 text-[0.65rem] font-bold rounded-lg bg-[var(--glass)] text-[var(--text-purple-2)] border-[0.5px] border-[var(--border)] hover:border-[var(--border2)] transition-colors flex items-center gap-1.5">
                          <ExternalLink className="w-3 h-3" /> View Article
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        )}

        {activeTab === "pep" && (
          <Card className="glass-2 border-[0.5px] border-[var(--border)] overflow-hidden">
            <div className="px-5 py-3 border-b-[0.5px] border-[var(--border)] flex items-center gap-2 font-['Geist_Mono'] text-[0.7rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)]">
              <AlertTriangle className="w-3.5 h-3.5 text-[var(--amber)]" /> PEP & Sanctions Match Resolution
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-[var(--glass)]">
                    {["Client Name", "Matched Entry", "Source List", "Confidence", "Status", "Actions"].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-['Geist_Mono'] text-[0.58rem] font-bold tracking-wider uppercase text-[var(--text-purple-3)] border-b-[0.5px] border-[var(--border)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {pepMatches.map(p => {
                    const status = pepStatuses[p.id];
                    return (
                      <tr key={p.id} className="hover:bg-[var(--glass)] transition-colors">
                        <td className="px-4 py-3.5 border-b-[0.5px] border-[var(--border)] font-medium text-white">{p.name}</td>
                        <td className="px-4 py-3.5 border-b-[0.5px] border-[var(--border)] text-[var(--text-purple-2)]">{p.matched}</td>
                        <td className="px-4 py-3.5 border-b-[0.5px] border-[var(--border)] text-[var(--text-purple-2)]">{p.source}</td>
                        <td className="px-4 py-3.5 border-b-[0.5px] border-[var(--border)]">
                          <span className="font-bold font-['Geist_Mono']" style={{ color: p.confidence >= 90 ? "var(--coral)" : p.confidence >= 70 ? "var(--amber)" : "var(--teal)" }}>
                            {p.confidence}%
                          </span>
                        </td>
                        <td className="px-4 py-3.5 border-b-[0.5px] border-[var(--border)]">
                          <span className={`px-2 py-0.5 rounded-full text-[0.58rem] font-bold border-[0.5px] font-['Geist_Mono'] ${getPepStyle(status)}`}>
                            {status === "false_positive" ? "FALSE POS." : status.toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3.5 border-b-[0.5px] border-[var(--border)]">
                          {status === "pending" ? (
                            <div className="flex gap-1.5">
                              <button onClick={() => setPepStatus(p.id, "confirmed")} className="px-2 py-1 text-[0.62rem] font-bold rounded bg-[rgba(248,113,113,.12)] text-[var(--coral)] border-[0.5px] border-[rgba(248,113,113,.3)] hover:opacity-80 flex items-center gap-1">
                                <AlertTriangle className="w-2.5 h-2.5" /> Confirm
                              </button>
                              <button onClick={() => setPepStatus(p.id, "false_positive")} className="px-2 py-1 text-[0.62rem] font-bold rounded bg-[rgba(52,211,153,.10)] text-[var(--teal)] border-[0.5px] border-[rgba(52,211,153,.28)] hover:opacity-80 flex items-center gap-1">
                                <XCircle className="w-2.5 h-2.5" /> False Pos.
                              </button>
                            </div>
                          ) : (
                            <button onClick={() => setPepStatus(p.id, "pending")} className="text-[0.62rem] text-[var(--text-purple-3)] hover:text-[var(--text-purple-2)] transition-colors">
                              Reset
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
