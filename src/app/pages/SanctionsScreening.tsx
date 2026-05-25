import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Search, Shield, AlertOctagon, CheckCircle, Clock, XCircle } from "lucide-react";

const sanctionsList = [
  { id: "SCR-001", name: "Global Trade Corp", matchScore: 87, list: "OFAC SDN", type: "Entity", status: "pending", flaggedOn: "2026-05-20", amount: "$4.2M" },
  { id: "SCR-002", name: "Viktor Sokolov", matchScore: 94, list: "UN Security Council", type: "Individual", status: "confirmed", flaggedOn: "2026-05-19", amount: "$890K" },
  { id: "SCR-003", name: "Meridian Holdings Ltd", matchScore: 72, list: "OFAC SDN", type: "Entity", status: "cleared", flaggedOn: "2026-05-18", amount: "$12.1M" },
  { id: "SCR-004", name: "Elena Marchetti", matchScore: 61, list: "PEP Database", type: "Individual", status: "pending", flaggedOn: "2026-05-17", amount: "$225K" },
  { id: "SCR-005", name: "Blue Horizon Finance", matchScore: 99, list: "EU Consolidated", type: "Entity", status: "confirmed", flaggedOn: "2026-05-16", amount: "$7.5M" },
];

const watchlists = [
  { name: "OFAC SDN List", entries: "12,489", lastSync: "2h ago", status: "active" },
  { name: "UN Security Council", entries: "4,112", lastSync: "4h ago", status: "active" },
  { name: "EU Consolidated List", entries: "8,330", lastSync: "1d ago", status: "active" },
  { name: "PEP Database", entries: "91,204", lastSync: "12h ago", status: "active" },
  { name: "FINTRAC Terrorist Entities", entries: "2,067", lastSync: "6h ago", status: "active" },
];

export default function SanctionsScreening() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(sanctionsList[0]);
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = sanctionsList.filter(s => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = statusFilter === "ALL" || s.status === statusFilter.toLowerCase();
    return matchSearch && matchFilter;
  });

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "confirmed": return { label: "CONFIRMED", cls: "bg-[rgba(248,113,113,.12)] text-[var(--coral)] border-[rgba(248,113,113,.3)]" };
      case "pending": return { label: "PENDING", cls: "bg-[rgba(251,191,36,.12)] text-[var(--amber)] border-[rgba(251,191,36,.3)]" };
      case "cleared": return { label: "CLEARED", cls: "bg-[rgba(52,211,153,.10)] text-[var(--teal)] border-[rgba(52,211,153,.28)]" };
      default: return { label: status.toUpperCase(), cls: "" };
    }
  };

  const getMatchColor = (score: number) => score >= 90 ? "var(--coral)" : score >= 75 ? "var(--amber)" : "var(--brand-hi)";

  return (
    <DashboardLayout pageTitle="Sanctions Screening" breadcrumb="Watchlist Management">
      <div className="flex gap-4 h-[calc(100vh-130px)]">

        {/* Left Panel */}
        <div className="w-[340px] flex-shrink-0 flex flex-col gap-3">
          {/* Search + Filter */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-purple-3)]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search entities, names..."
              className="w-full bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg pl-9 pr-4 py-2 text-xs text-[var(--text-purple)] placeholder:text-[var(--text-purple-3)] outline-none focus:border-[var(--border-purple)]"
            />
          </div>
          <div className="flex gap-1 bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg p-0.5">
            {["ALL", "PENDING", "CONFIRMED", "CLEARED"].map(f => (
              <button
                key={f}
                onClick={() => setStatusFilter(f)}
                className={`flex-1 py-1 text-[0.6rem] font-bold rounded-md transition-all font-['Geist_Mono'] ${statusFilter === f ? "bg-[var(--brand)] text-white" : "text-[var(--text-purple-2)] hover:text-[var(--text-purple)]"}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Match List */}
          <div className="flex-1 overflow-y-auto space-y-2 pr-1">
            {filtered.map(item => {
              const st = getStatusStyle(item.status);
              return (
                <div
                  key={item.id}
                  onClick={() => setSelected(item)}
                  className={`p-3.5 rounded-xl border-[0.5px] cursor-pointer transition-all ${selected?.id === item.id ? "border-[var(--border-purple)] bg-[var(--glass2)]" : "border-[var(--border)] bg-[var(--glass)] hover:border-[var(--border2)]"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-semibold text-white">{item.name}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[0.58rem] font-bold border-[0.5px] font-['Geist_Mono'] ${st.cls}`}>{st.label}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[0.65rem] text-[var(--text-purple-3)]">
                    <span>{item.list}</span>
                    <span>•</span>
                    <span style={{ color: getMatchColor(item.matchScore) }} className="font-bold">{item.matchScore}% match</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col gap-4 overflow-hidden">
          {/* Detail Card */}
          {selected && (
            <Card className="glass-2 border-[0.5px] border-[var(--border)] flex-1 overflow-y-auto">
              <div className="px-6 py-4 border-b-[0.5px] border-[var(--border)] flex justify-between items-start bg-[var(--glass)]">
                <div>
                  <h2 className="text-xl font-bold text-white font-['Instrument_Serif']">{selected.name}</h2>
                  <p className="text-xs text-[var(--text-purple-2)] mt-1">{selected.id} · {selected.type} · Flagged {selected.flaggedOn}</p>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="glass border-[var(--teal)] text-[var(--teal)] text-xs h-8">
                    <CheckCircle className="w-3.5 h-3.5 mr-1" /> Clear
                  </Button>
                  <Button size="sm" className="gradient-purple text-white border-none text-xs h-8">
                    <AlertOctagon className="w-3.5 h-3.5 mr-1" /> Escalate to SAR
                  </Button>
                </div>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                {[
                  { label: "Match Score", value: `${selected.matchScore}%`, color: getMatchColor(selected.matchScore) },
                  { label: "Watchlist", value: selected.list, color: "var(--text-purple)" },
                  { label: "Transaction Volume", value: selected.amount, color: "var(--brand-hi)" },
                  { label: "Entity Type", value: selected.type, color: "var(--text-purple)" },
                ].map((item, i) => (
                  <div key={i} className="bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg p-4">
                    <div className="text-[0.6rem] font-bold uppercase tracking-wider text-[var(--text-purple-3)] font-['Geist_Mono'] mb-1">{item.label}</div>
                    <div className="text-sm font-bold" style={{ color: item.color }}>{item.value}</div>
                  </div>
                ))}
              </div>
              <div className="px-6 pb-6">
                <h3 className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-3">Screening Analysis</h3>
                <div className="bg-[var(--bg)] border-[0.5px] border-[var(--border)] rounded-lg p-4 text-sm text-[var(--text-purple-2)] leading-relaxed">
                  Entity <strong className="text-white">{selected.name}</strong> was flagged against the <strong className="text-[var(--brand-hi)]">{selected.list}</strong> with a {selected.matchScore}% name-match confidence score. The match was triggered by transaction volume of {selected.amount} crossing screening thresholds. Compliance review is required before further processing.
                </div>
              </div>
            </Card>
          )}

          {/* Watchlists status */}
          <Card className="glass-2 border-[0.5px] border-[var(--border)]">
            <div className="px-5 py-3 border-b-[0.5px] border-[var(--border)] flex items-center gap-2 font-['Geist_Mono'] text-[0.7rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)]">
              <Shield className="w-3.5 h-3.5" /> Active Watchlists
            </div>
            <div className="p-4 grid grid-cols-5 gap-3">
              {watchlists.map((wl, i) => (
                <div key={i} className="bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg p-3 text-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[var(--teal)] mx-auto mb-2" style={{ boxShadow: "0 0 0 3px rgba(52,211,153,.15)" }} />
                  <div className="text-[0.6rem] font-bold text-[var(--text-purple)] font-['Geist_Mono'] mb-1 leading-tight">{wl.name}</div>
                  <div className="text-[0.65rem] text-[var(--brand-hi)] font-bold">{wl.entries}</div>
                  <div className="text-[0.58rem] text-[var(--text-purple-3)] mt-1">
                    <Clock className="w-2.5 h-2.5 inline mr-0.5" />{wl.lastSync}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
