import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Laptop, CheckCircle, Clock, XCircle, Shield, Link, RefreshCw } from "lucide-react";

const consents = [
  { id: "CON-001", client: "James Whitfield", institution: "RBC Royal Bank", scope: "Account Balance, Transaction History", granted: "2026-04-01", expires: "2027-04-01", status: "active" },
  { id: "CON-002", client: "Priya Sharma", institution: "TD Canada Trust", scope: "Account Balance", granted: "2026-03-15", expires: "2027-03-15", status: "active" },
  { id: "CON-003", client: "David Okonkwo", institution: "Scotiabank", scope: "Account Balance, Transaction History, Credit Score", granted: "2026-02-10", expires: "2026-08-10", status: "expiring" },
  { id: "CON-004", client: "Sophie Tremblay", institution: "BMO", scope: "Transaction History", granted: "2025-12-01", expires: "2026-06-01", status: "revoked" },
];

const connectedApps = [
  { name: "Wealthsimple", type: "Investment Platform", accounts: 1, lastSync: "5m ago", status: "connected" },
  { name: "Mint Canada", type: "Budgeting App", accounts: 3, lastSync: "1h ago", status: "connected" },
  { name: "Borrowell", type: "Credit Monitoring", accounts: 1, lastSync: "2h ago", status: "connected" },
  { name: "Koho", type: "Neobank", accounts: 1, lastSync: "3d ago", status: "stale" },
];

const phases = [
  { num: "Phase 1", title: "Read Access", desc: "Account data sharing with consent", year: "2026", status: "active" },
  { num: "Phase 2", title: "Payment Initiation", desc: "Third-party payment triggers", year: "2027", status: "upcoming" },
  { num: "Phase 3", title: "Product Comparison", desc: "Transparent pricing rails", year: "2028", status: "planned" },
];

export default function OpenBanking() {
  const [activeTab, setActiveTab] = useState<"consents" | "apps" | "compliance">("consents");

  const getConsentStyle = (status: string) => {
    switch (status) {
      case "active": return { icon: CheckCircle, cls: "bg-[rgba(52,211,153,.10)] text-[var(--teal)] border-[rgba(52,211,153,.28)]", label: "ACTIVE" };
      case "expiring": return { icon: Clock, cls: "bg-[rgba(251,191,36,.12)] text-[var(--amber)] border-[rgba(251,191,36,.3)]", label: "EXPIRING" };
      case "revoked": return { icon: XCircle, cls: "bg-[rgba(248,113,113,.12)] text-[var(--coral)] border-[rgba(248,113,113,.3)]", label: "REVOKED" };
      default: return { icon: CheckCircle, cls: "", label: status.toUpperCase() };
    }
  };

  return (
    <DashboardLayout pageTitle="Open Banking" breadcrumb="CDBA Compliance">
      <div className="flex flex-col gap-4">

        {/* CDBA Phase Banner */}
        <div className="flex gap-3">
          {phases.map((p, i) => (
            <Card key={i} className={`flex-1 border-[0.5px] p-4 relative overflow-hidden ${p.status === "active" ? "border-[var(--border-purple)] bg-[var(--brand-glow)]" : "border-[var(--border)] glass"}`}>
              {p.status === "active" && <div className="absolute top-0 left-0 right-0 h-[2px] bg-[var(--brand-hi)]" />}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[0.6rem] font-bold tracking-widest uppercase text-[var(--text-purple-3)] font-['Geist_Mono']">{p.num}</span>
                <span className={`px-1.5 py-0.5 rounded-full text-[0.57rem] font-bold border-[0.5px] font-['Geist_Mono'] ${p.status === "active" ? "bg-[rgba(52,211,153,.10)] text-[var(--teal)] border-[rgba(52,211,153,.28)]" : "bg-[var(--glass)] text-[var(--text-purple-3)] border-[var(--border)]"}`}>
                  {p.status === "active" ? "LIVE" : p.status === "upcoming" ? p.year : "PLANNED"}
                </span>
              </div>
              <div className="text-base font-bold text-white font-['Instrument_Serif']">{p.title}</div>
              <div className="text-[0.68rem] text-[var(--text-purple-2)] mt-1">{p.desc}</div>
            </Card>
          ))}
        </div>

        {/* Tab Bar */}
        <div className="flex gap-1 bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg p-1 w-fit">
          {(["consents", "apps", "compliance"] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-1.5 text-xs font-bold rounded-md transition-all font-['Geist_Mono'] capitalize ${activeTab === tab ? "bg-[var(--brand)] text-white" : "text-[var(--text-purple-2)] hover:text-[var(--text-purple)]"}`}
            >
              {tab === "apps" ? "Connected Apps" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "consents" && (
          <Card className="glass-2 border-[0.5px] border-[var(--border)] overflow-hidden">
            <div className="px-5 py-3 border-b-[0.5px] border-[var(--border)] flex items-center justify-between">
              <div className="flex items-center gap-2 font-['Geist_Mono'] text-[0.7rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)]">
                <Shield className="w-3.5 h-3.5" /> Data Sharing Consents
              </div>
              <span className="text-[0.6rem] text-[var(--text-purple-3)]">{consents.filter(c => c.status === "active").length} active consents</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-[var(--glass)]">
                    {["Client", "Institution", "Data Scope", "Granted", "Expires", "Status", ""].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-['Geist_Mono'] text-[0.58rem] font-bold tracking-wider uppercase text-[var(--text-purple-3)] border-b-[0.5px] border-[var(--border)]">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {consents.map(c => {
                    const st = getConsentStyle(c.status);
                    return (
                      <tr key={c.id} className="hover:bg-[var(--glass)] transition-colors">
                        <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] font-medium text-white">{c.client}</td>
                        <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] text-[var(--text-purple-2)]">{c.institution}</td>
                        <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] text-[var(--text-purple-2)] max-w-[200px] truncate">{c.scope}</td>
                        <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] text-[var(--text-purple-3)] font-['Geist_Mono']">{c.granted}</td>
                        <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)] text-[var(--text-purple-3)] font-['Geist_Mono']">{c.expires}</td>
                        <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)]">
                          <span className={`px-2 py-0.5 rounded-full text-[0.58rem] font-bold border-[0.5px] font-['Geist_Mono'] ${st.cls}`}>{st.label}</span>
                        </td>
                        <td className="px-4 py-3 border-b-[0.5px] border-[var(--border)]">
                          {c.status !== "revoked" && (
                            <button className="text-[0.65rem] text-[var(--coral)] hover:opacity-70 transition-opacity">Revoke</button>
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

        {activeTab === "apps" && (
          <div className="grid grid-cols-2 gap-4">
            {connectedApps.map((app, i) => (
              <Card key={i} className="glass-2 border-[0.5px] border-[var(--border)] p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[var(--glass3)] border-[0.5px] border-[var(--border)] flex items-center justify-center flex-shrink-0">
                  <Laptop className="w-5 h-5 text-[var(--brand-hi)]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-white">{app.name}</h3>
                    <span className={`flex items-center gap-1 text-[0.6rem] font-bold font-['Geist_Mono'] ${app.status === "connected" ? "text-[var(--teal)]" : "text-[var(--amber)]"}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${app.status === "connected" ? "bg-[var(--teal)]" : "bg-[var(--amber)]"}`} />
                      {app.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-purple-2)] mb-3">{app.type} · {app.accounts} account{app.accounts > 1 ? "s" : ""} linked</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[0.62rem] text-[var(--text-purple-3)] flex items-center gap-1">
                      <RefreshCw className="w-2.5 h-2.5" /> Last sync: {app.lastSync}
                    </span>
                    <div className="flex gap-1.5">
                      <button className="px-2.5 py-1 text-[0.62rem] font-semibold rounded bg-[var(--brand-glow)] text-[var(--brand-hi)] border-[0.5px] border-[var(--border-purple)]">Sync</button>
                      <button className="px-2.5 py-1 text-[0.62rem] font-semibold rounded bg-[rgba(248,113,113,.10)] text-[var(--coral)] border-[0.5px] border-[rgba(248,113,113,.25)]">Revoke</button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
            <Card className="glass border-[0.5px] border-dashed border-[var(--border)] p-5 flex items-center justify-center cursor-pointer hover:border-[var(--border-purple)] transition-colors">
              <div className="text-center">
                <Link className="w-6 h-6 text-[var(--text-purple-3)] mx-auto mb-2" />
                <p className="text-sm text-[var(--text-purple-2)]">Connect New App</p>
                <p className="text-[0.65rem] text-[var(--text-purple-3)] mt-1">CDBA Phase 1 compliant</p>
              </div>
            </Card>
          </div>
        )}

        {activeTab === "compliance" && (
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "CDBA Phase 1", desc: "Read-only data sharing compliant", status: "COMPLIANT", color: "var(--teal)" },
              { label: "PIPEDA", desc: "Privacy and data protection", status: "COMPLIANT", color: "var(--teal)" },
              { label: "OAuth 2.0", desc: "Secure authorization framework", status: "ACTIVE", color: "var(--brand-hi)" },
              { label: "CDBA Phase 2", desc: "Payment initiation (2027)", status: "UPCOMING", color: "var(--amber)" },
              { label: "Open ID Connect", desc: "Identity verification layer", status: "ACTIVE", color: "var(--brand-hi)" },
              { label: "Consent Audit Log", desc: "Immutable consent trail", status: "ACTIVE", color: "var(--teal)" },
            ].map((item, i) => (
              <Card key={i} className="glass-2 border-[0.5px] border-[var(--border)] p-5 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }} />
                <div className="text-sm font-bold text-white mb-1">{item.label}</div>
                <div className="text-[0.68rem] text-[var(--text-purple-2)] mb-3">{item.desc}</div>
                <span className="px-2 py-0.5 rounded-full text-[0.6rem] font-bold border-[0.5px] font-['Geist_Mono']" style={{ background: `${item.color}15`, color: item.color, borderColor: `${item.color}30` }}>
                  {item.status}
                </span>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
