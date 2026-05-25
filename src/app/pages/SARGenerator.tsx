import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAppStore } from "../store";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FileText, CheckCircle, XCircle, Zap, Send, Clock, User } from "lucide-react";

const sarTypes = [
  "Structuring / Smurfing",
  "PEP / Sanctions Match",
  "Rapid Fund Movement",
  "Cross-Border Anomaly",
  "Crypto Exchange Activity",
  "Shell Company Network",
];

export default function SARGenerator() {
  const { sarDrafts, sarSubject, sarType, sarSummary, setSarSubject, setSarType, generateSarDraft, updateSarStatus } = useAppStore();
  const [activeTab, setActiveTab] = useState<"drafts" | "create">("drafts");
  const [selectedId, setSelectedId] = useState<string | null>(sarDrafts[0]?.id || null);

  const selected = sarDrafts.find(s => s.id === selectedId);

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending": return "bg-[rgba(251,191,36,.12)] text-[var(--amber)] border-[rgba(251,191,36,.3)]";
      case "approved": return "bg-[rgba(52,211,153,.10)] text-[var(--teal)] border-[rgba(52,211,153,.28)]";
      case "rejected": return "bg-[rgba(248,113,113,.12)] text-[var(--coral)] border-[rgba(248,113,113,.3)]";
      default: return "";
    }
  };

  return (
    <DashboardLayout pageTitle="SAR Generator" breadcrumb="FINTRAC Reporting">
      <div className="flex flex-col gap-4">

        {/* Tab Bar */}
        <div className="flex gap-1 bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg p-1 w-fit">
          {(["drafts", "create"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-1.5 text-xs font-bold rounded-md transition-all font-['Geist_Mono'] capitalize ${activeTab === tab ? "bg-[var(--brand)] text-white" : "text-[var(--text-purple-2)] hover:text-[var(--text-purple)]"}`}
            >
              {tab === "create" ? "New SAR Draft" : "SAR Drafts"}
            </button>
          ))}
        </div>

        {activeTab === "drafts" && (
          <div className="flex gap-4 h-[calc(100vh-190px)]">
            {/* Left: Drafts List */}
            <div className="w-[300px] flex-shrink-0 space-y-2 overflow-y-auto pr-1">
              {sarDrafts.map(sar => (
                <div
                  key={sar.id}
                  onClick={() => setSelectedId(sar.id)}
                  className={`p-3.5 rounded-xl border-[0.5px] cursor-pointer transition-all ${selectedId === sar.id ? "border-[var(--border-purple)] bg-[var(--glass2)]" : "border-[var(--border)] bg-[var(--glass)] hover:border-[var(--border2)]"}`}
                >
                  <div className="flex items-start gap-2.5 mb-2">
                    <div className="w-7 h-7 rounded-md bg-[var(--brand-glow)] flex items-center justify-center flex-shrink-0">
                      <FileText className="w-3.5 h-3.5 text-[var(--brand-hi)]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white truncate">{sar.subject}</div>
                      <div className="text-[0.63rem] text-[var(--text-purple-3)] font-['Geist_Mono']">{sar.id}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.62rem] text-[var(--text-purple-2)]">{sar.type}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[0.58rem] font-bold border-[0.5px] font-['Geist_Mono'] ${getStatusStyle(sar.status)}`}>
                      {sar.status.toUpperCase()}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Detail */}
            {selected ? (
              <Card className="flex-1 glass-2 border-[0.5px] border-[var(--border)] flex flex-col overflow-hidden">
                <div className="px-6 py-4 border-b-[0.5px] border-[var(--border)] bg-[var(--glass)] flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-white font-['Instrument_Serif']">Suspicious Activity Report</h2>
                    <p className="text-xs text-[var(--text-purple-2)] mt-1 flex items-center gap-2">
                      <span className="font-['Geist_Mono']">{selected.id}</span>
                      <span>·</span>
                      <User className="w-3 h-3" />
                      <span>{selected.author}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="glass border-[var(--coral)] text-[var(--coral)] text-xs h-8" onClick={() => updateSarStatus(selected.id, "rejected")}>
                      <XCircle className="w-3.5 h-3.5 mr-1" /> Reject
                    </Button>
                    <Button size="sm" className="gradient-purple text-white text-xs h-8" onClick={() => updateSarStatus(selected.id, "approved")}>
                      <CheckCircle className="w-3.5 h-3.5 mr-1" /> Approve & File
                    </Button>
                  </div>
                </div>
                <div className="p-6 flex-1 overflow-y-auto">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                      { label: "Subject Entity", value: selected.subject },
                      { label: "Activity Type", value: selected.type, color: "var(--brand-hi)" },
                      { label: "Status", value: selected.status.toUpperCase(), color: selected.status === "approved" ? "var(--teal)" : selected.status === "rejected" ? "var(--coral)" : "var(--amber)" },
                      { label: "Report Format", value: "FINTRAC STR-2026", color: "var(--text-purple)" },
                    ].map((f, i) => (
                      <div key={i} className="bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg p-4">
                        <div className="text-[0.6rem] font-bold uppercase tracking-wider text-[var(--text-purple-3)] font-['Geist_Mono'] mb-1">{f.label}</div>
                        <div className="text-sm font-semibold" style={{ color: f.color || "var(--text-purple)" }}>{f.value}</div>
                      </div>
                    ))}
                  </div>
                  <h3 className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-3">AI-Generated Narrative Summary</h3>
                  <div className="bg-[var(--bg)] border-[0.5px] border-[var(--brand-glow)] rounded-lg p-5 relative">
                    <div className="absolute top-3 right-3 flex items-center gap-1 text-[0.6rem] text-[var(--brand-hi)] font-['Geist_Mono'] font-bold">
                      <Zap className="w-2.5 h-2.5" /> AI DRAFTED
                    </div>
                    <p className="text-sm text-[var(--text-purple)] leading-relaxed">{selected.summary}</p>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-[0.65rem] text-[var(--text-purple-3)]">
                    <Clock className="w-3 h-3" />
                    <span>Draft created for FINTRAC compliance · Officer review required before submission</span>
                  </div>
                </div>
              </Card>
            ) : (
              <div className="flex-1 flex items-center justify-center border-[0.5px] border-dashed border-[var(--border)] rounded-xl">
                <p className="text-[var(--text-purple-2)] text-sm">Select a SAR draft to review</p>
              </div>
            )}
          </div>
        )}

        {activeTab === "create" && (
          <Card className="glass-2 border-[0.5px] border-[var(--border)] max-w-2xl">
            <div className="px-6 py-4 border-b-[0.5px] border-[var(--border)] bg-[var(--glass)]">
              <h2 className="text-lg font-bold text-white font-['Instrument_Serif']">Generate New SAR Draft</h2>
              <p className="text-xs text-[var(--text-purple-2)] mt-1">AI will generate a FINTRAC-ready narrative based on your inputs</p>
            </div>
            <div className="p-6 space-y-5">
              <div>
                <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-2">Subject Entity / Account</label>
                <input
                  value={sarSubject}
                  onChange={e => setSarSubject(e.target.value)}
                  placeholder="e.g. Account #CA-4471, Global Trade Corp"
                  className="w-full bg-[var(--bg)] border-[0.5px] border-[var(--border)] rounded-lg px-4 py-2.5 text-sm text-[var(--text-purple)] placeholder:text-[var(--text-purple-3)] outline-none focus:border-[var(--border-purple)]"
                />
              </div>
              <div>
                <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-2">Activity Type</label>
                <div className="grid grid-cols-2 gap-2">
                  {sarTypes.map(type => (
                    <button
                      key={type}
                      onClick={() => setSarType(type)}
                      className={`px-3 py-2.5 rounded-lg border-[0.5px] text-xs text-left transition-all ${sarType === type ? "border-[var(--border-purple)] bg-[var(--brand-glow)] text-[var(--brand-hi)]" : "border-[var(--border)] bg-[var(--glass)] text-[var(--text-purple-2)] hover:border-[var(--border2)]"}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              {sarSummary && (
                <div>
                  <label className="block text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-2">Generated Narrative</label>
                  <div className="bg-[var(--bg)] border-[0.5px] border-[var(--brand-glow)] rounded-lg p-4 text-sm text-[var(--text-purple)] leading-relaxed">{sarSummary}</div>
                </div>
              )}
              <div className="flex gap-3 pt-2">
                <Button
                  className="gradient-purple text-white border-none gap-2"
                  onClick={() => { generateSarDraft(); setActiveTab("drafts"); }}
                  disabled={!sarSubject}
                >
                  <Zap className="w-3.5 h-3.5" /> Generate Draft
                </Button>
                <Button variant="outline" className="glass border-[var(--border)] text-[var(--text-purple-2)] gap-2">
                  <Send className="w-3.5 h-3.5" /> Submit Directly
                </Button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
