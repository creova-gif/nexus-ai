import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAppStore } from "../store";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FileText, CheckCircle, Clock, AlertTriangle, Download, Send, Code, RefreshCw } from "lucide-react";

const filings = [
  { id: "STR-2026-0041", sar: "SAR-104", subject: "Account #CA-4471", type: "Structuring", filed: "2026-05-20", agency: "FINTRAC", status: "acknowledged", ref: "FIN-ACK-89221", amount: "$149,400" },
  { id: "STR-2026-0042", sar: "SAR-105", subject: "Global Trade Corp", type: "PEP/Sanctions", filed: "2026-05-18", agency: "FINTRAC", status: "pending", ref: "—", amount: "$4.2M" },
  { id: "CTR-2026-0018", sar: "CTR-88", subject: "Viktor Sokolov", type: "Currency Transaction", filed: "2026-05-15", agency: "FinCEN", status: "acknowledged", ref: "FCN-ACK-50132", amount: "$890,000" },
  { id: "STR-2026-0039", sar: "SAR-103", subject: "Meridian Holdings Ltd", type: "Structuring", filed: "2026-05-10", agency: "FINTRAC", status: "rejected", ref: "FIN-REJ-00441", amount: "$310,000" },
];

const sarXmlPreview = (filing: typeof filings[0]) => `<?xml version="1.0" encoding="UTF-8"?>
<FinancialIntelligenceReport>
  <ReportType>STR</ReportType>
  <FilingInstitution>NexusBank Canada</FilingInstitution>
  <ReportDate>${filing.filed}</ReportDate>
  <SuspiciousTransaction>
    <Subject>${filing.subject}</Subject>
    <ActivityType>${filing.type}</ActivityType>
    <Amount>${filing.amount}</Amount>
    <Agency>${filing.agency}</Agency>
  </SuspiciousTransaction>
  <Narrative>Based on analysis, patterns consistent with ${filing.type} were identified requiring mandatory disclosure per PCMLTFA s.7.</Narrative>
</FinancialIntelligenceReport>`;

const sarJsonPreview = (filing: typeof filings[0]) => JSON.stringify({
  report_type: "STR",
  filing_institution: "NexusBank Canada",
  report_date: filing.filed,
  subject: filing.subject,
  activity_type: filing.type,
  amount: filing.amount,
  agency: filing.agency,
  reference: filing.ref,
  status: filing.status,
}, null, 2);

export default function RegulatoryReporting() {
  const { sarDrafts } = useAppStore();
  const [selected, setSelected] = useState(filings[0]);
  const [exportFormat, setExportFormat] = useState<"xml" | "json">("xml");

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "acknowledged": return { cls: "bg-[rgba(52,211,153,.10)] text-[var(--teal)] border-[rgba(52,211,153,.28)]", label: "ACKNOWLEDGED", icon: CheckCircle };
      case "pending": return { cls: "bg-[rgba(251,191,36,.12)] text-[var(--amber)] border-[rgba(251,191,36,.3)]", label: "PENDING", icon: Clock };
      case "rejected": return { cls: "bg-[rgba(248,113,113,.12)] text-[var(--coral)] border-[rgba(248,113,113,.3)]", label: "REJECTED", icon: AlertTriangle };
      default: return { cls: "", label: status.toUpperCase(), icon: Clock };
    }
  };

  return (
    <DashboardLayout pageTitle="Regulatory Reporting Hub" breadcrumb="FinCEN / FINTRAC E-Filing">
      <div className="flex flex-col gap-4">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Total Filed (30d)", value: filings.length.toString(), color: "var(--brand-hi)" },
            { label: "Acknowledged", value: filings.filter(f => f.status === "acknowledged").length.toString(), color: "var(--teal)" },
            { label: "Pending Response", value: filings.filter(f => f.status === "pending").length.toString(), color: "var(--amber)" },
            { label: "Rejected / Resubmit", value: filings.filter(f => f.status === "rejected").length.toString(), color: "var(--coral)" },
          ].map((stat, i) => (
            <Card key={i} className="glass-2 border-[0.5px] border-[var(--border)] p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
              <div className="text-[0.6rem] font-bold tracking-widest uppercase text-[var(--text-purple-3)] font-['Geist_Mono'] mb-1">{stat.label}</div>
              <div className="text-2xl font-bold font-['Instrument_Serif']" style={{ color: stat.color }}>{stat.value}</div>
            </Card>
          ))}
        </div>

        <div className="flex gap-4 flex-1">
          {/* Filing Table */}
          <div className="flex-1 flex flex-col gap-3">
            <Card className="glass-2 border-[0.5px] border-[var(--border)] overflow-hidden">
              <div className="px-5 py-3 border-b-[0.5px] border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2 font-['Geist_Mono'] text-[0.7rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)]">
                  <Send className="w-3.5 h-3.5" /> E-Filed Reports
                </div>
                <Button size="sm" variant="outline" className="glass border-[var(--border)] text-[var(--text-purple-2)] text-xs h-7 gap-1.5">
                  <RefreshCw className="w-3 h-3" /> Sync Status
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-[var(--glass)]">
                      {["Filing ID", "Subject", "Type", "Agency", "Filed Date", "Reference", "Status"].map(h => (
                        <th key={h} className="px-4 py-3 text-left font-['Geist_Mono'] text-[0.58rem] font-bold tracking-wider uppercase text-[var(--text-purple-3)] border-b-[0.5px] border-[var(--border)]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filings.map(f => {
                      const st = getStatusStyle(f.status);
                      const Icon = st.icon;
                      return (
                        <tr
                          key={f.id}
                          onClick={() => setSelected(f)}
                          className={`cursor-pointer transition-colors ${selected.id === f.id ? "bg-[var(--glass2)]" : "hover:bg-[var(--glass)]"}`}
                        >
                          <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] font-['Geist_Mono'] text-[var(--brand-hi)]">{f.id}</td>
                          <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] font-medium text-white">{f.subject}</td>
                          <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] text-[var(--text-purple-2)]">{f.type}</td>
                          <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)]">
                            <span className="px-1.5 py-0.5 rounded text-[0.6rem] font-bold bg-[var(--brand-glow)] text-[var(--brand-hi)] border-[0.5px] border-[var(--border-purple)] font-['Geist_Mono']">{f.agency}</span>
                          </td>
                          <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] text-[var(--text-purple-3)] font-['Geist_Mono']">{f.filed}</td>
                          <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] text-[var(--text-purple-3)] font-['Geist_Mono'] text-[0.65rem]">{f.ref}</td>
                          <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)]">
                            <span className={`px-2 py-0.5 rounded-full text-[0.58rem] font-bold border-[0.5px] font-['Geist_Mono'] flex items-center gap-1 w-fit ${st.cls}`}>
                              <Icon className="w-2.5 h-2.5" />{st.label}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>

          {/* Export Preview */}
          <div className="w-[380px] flex-shrink-0 flex flex-col gap-3">
            <Card className="glass-2 border-[0.5px] border-[var(--border)] flex flex-col flex-1 overflow-hidden">
              <div className="px-4 py-3 border-b-[0.5px] border-[var(--border)] flex items-center justify-between">
                <div className="flex items-center gap-2 font-['Geist_Mono'] text-[0.7rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)]">
                  <Code className="w-3.5 h-3.5" /> Export Preview
                </div>
                <div className="flex gap-1 bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-md p-0.5">
                  {(["xml", "json"] as const).map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => setExportFormat(fmt)}
                      className={`px-3 py-0.5 text-[0.62rem] font-bold rounded transition-all font-['Geist_Mono'] uppercase ${exportFormat === fmt ? "bg-[var(--brand)] text-white" : "text-[var(--text-purple-2)]"}`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="px-4 py-2 border-b-[0.5px] border-[var(--border)] bg-[var(--glass)]">
                <div className="flex items-center justify-between">
                  <span className="text-[0.65rem] text-[var(--text-purple-2)]">{selected.id}</span>
                  <span className="text-[0.63rem] text-[var(--text-purple-3)] font-['Geist_Mono']">{selected.agency} · {selected.filed}</span>
                </div>
              </div>
              <div className="flex-1 overflow-auto p-4 bg-[var(--bg)]">
                <pre className="text-[0.63rem] text-[var(--teal)] font-['Geist_Mono'] leading-relaxed whitespace-pre-wrap break-all">
                  {exportFormat === "xml" ? sarXmlPreview(selected) : sarJsonPreview(selected)}
                </pre>
              </div>
              <div className="p-3 border-t-[0.5px] border-[var(--border)] flex gap-2">
                <Button size="sm" className="gradient-purple text-white text-xs h-8 flex-1 gap-1.5">
                  <Download className="w-3.5 h-3.5" /> Download {exportFormat.toUpperCase()}
                </Button>
                <Button size="sm" variant="outline" className="glass border-[var(--border)] text-[var(--text-purple-2)] text-xs h-8 gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Batch Export
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
