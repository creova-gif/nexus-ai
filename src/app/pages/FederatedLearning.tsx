import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Shield, Zap, Lock, Globe, TrendingUp, Activity } from "lucide-react";

const banks = [
  { name: "NexusBank Canada", country: "CA", contribution: 18400, status: "contributing", modelVersion: "v4.2.1", lastSync: "2m ago" },
  { name: "Atlantic Trust", country: "CA", contribution: 12100, status: "contributing", modelVersion: "v4.2.1", lastSync: "4m ago" },
  { name: "Pacific Commerce Bank", country: "CA", contribution: 9800, status: "contributing", modelVersion: "v4.2.1", lastSync: "7m ago" },
  { name: "Northern Credit Union", country: "CA", contribution: 6200, status: "syncing", modelVersion: "v4.2.0", lastSync: "12m ago" },
  { name: "Prairie Financial", country: "CA", contribution: 4500, status: "contributing", modelVersion: "v4.2.1", lastSync: "3m ago" },
];

const metrics = [
  { round: 1, globalAccuracy: 71.2, falsePositive: 22.1 },
  { round: 2, globalAccuracy: 74.8, falsePositive: 19.4 },
  { round: 3, globalAccuracy: 78.3, falsePositive: 16.7 },
  { round: 4, globalAccuracy: 81.1, falsePositive: 14.2 },
  { round: 5, globalAccuracy: 84.6, falsePositive: 11.8 },
  { round: 6, globalAccuracy: 87.9, falsePositive: 9.5 },
  { round: 7, globalAccuracy: 90.2, falsePositive: 7.3 },
  { round: 8, globalAccuracy: 92.7, falsePositive: 5.9 },
];

const privacyControls = [
  { label: "Homomorphic Encryption", desc: "Model weights encrypted before transmission", status: "ACTIVE" },
  { label: "Differential Privacy", desc: "ε=0.1 noise injection on gradient updates", status: "ACTIVE" },
  { label: "Secure Aggregation", desc: "Cryptographic masking during federation", status: "ACTIVE" },
  { label: "PII Zero-Knowledge Proof", desc: "No raw customer data leaves institution", status: "VERIFIED" },
  { label: "Audit Trail Hashing", desc: "SHA-256 signed model deltas per round", status: "ACTIVE" },
];

const latestRound = metrics[metrics.length - 1];
const maxAcc = Math.max(...metrics.map(m => m.globalAccuracy));
const minFP = Math.min(...metrics.map(m => m.falsePositive));

export default function FederatedLearning() {
  const accPoints = metrics.map((m, i) => {
    const x = (i / (metrics.length - 1)) * 340;
    const y = 60 - ((m.globalAccuracy - 70) / 25) * 50;
    return `${x},${y}`;
  }).join(" ");

  const fpPoints = metrics.map((m, i) => {
    const x = (i / (metrics.length - 1)) * 340;
    const y = 60 - ((25 - m.falsePositive) / 25) * 50;
    return `${x},${y}`;
  }).join(" ");

  return (
    <DashboardLayout pageTitle="Federated Learning Network" breadcrumb="Privacy-Preserving AI">
      <div className="flex flex-col gap-4">

        {/* Network Status Banner */}
        <div className="flex items-center gap-4 px-5 py-3.5 bg-[rgba(139,92,246,.06)] border-[0.5px] border-[var(--border-purple)] rounded-xl">
          <div className="w-2.5 h-2.5 rounded-full bg-[var(--brand-hi)] animate-pulse" style={{ boxShadow: "0 0 0 4px rgba(139,92,246,.15)" }} />
          <div>
            <span className="text-sm font-semibold text-[var(--brand-hi)]">Federation Active</span>
            <span className="text-xs text-[var(--text-purple-2)] ml-3">{banks.length} institutions · Round 8 of 10 · No PII transmitted</span>
          </div>
          <div className="ml-auto flex items-center gap-3 text-[0.65rem] text-[var(--text-purple-3)] font-['Geist_Mono']">
            <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> Homomorphic Encryption ON</span>
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> Zero PII Exposure</span>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Global Model Accuracy", value: `${latestRound.globalAccuracy}%`, color: "var(--teal)", icon: TrendingUp },
            { label: "False Positive Rate", value: `${latestRound.falsePositive}%`, color: "var(--brand-hi)", icon: Activity },
            { label: "Participating Banks", value: banks.length.toString(), color: "var(--sky)", icon: Globe },
            { label: "Training Samples", value: `${(banks.reduce((a, b) => a + b.contribution, 0) / 1000).toFixed(1)}K`, color: "var(--gold)", icon: Zap },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Card key={i} className="glass-2 border-[0.5px] border-[var(--border)] p-4 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
                <div className="flex items-center gap-2 mb-2">
                  <Icon className="w-3.5 h-3.5 opacity-60" style={{ color: stat.color }} />
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono']">{stat.label}</span>
                </div>
                <div className="text-2xl font-bold font-['Instrument_Serif']" style={{ color: stat.color }}>{stat.value}</div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-[1fr_1fr_280px] gap-4">
          {/* Model Performance Chart */}
          <Card className="glass-2 border-[0.5px] border-[var(--border)] p-5">
            <h3 className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-4">Global Model Performance — 8 Rounds</h3>
            <div className="relative h-28">
              <svg viewBox="0 -5 340 75" className="w-full h-full" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="acc-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--teal)" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="var(--teal)" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <polygon points={`0,60 ${accPoints} 340,60`} fill="url(#acc-fill)" />
                <polyline points={accPoints} fill="none" stroke="var(--teal)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <polyline points={fpPoints} fill="none" stroke="var(--coral)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="4 3" />
              </svg>
            </div>
            <div className="flex justify-between text-[0.58rem] text-[var(--text-purple-3)] font-['Geist_Mono'] mt-2">
              {metrics.map(m => <span key={m.round}>R{m.round}</span>)}
            </div>
            <div className="flex gap-4 mt-3 text-[0.62rem]">
              <div className="flex items-center gap-1.5"><div className="w-4 h-0.5 bg-[var(--teal)]" /><span className="text-[var(--text-purple-2)]">Accuracy</span></div>
              <div className="flex items-center gap-1.5"><div className="w-4 h-0.5 bg-[var(--coral)]" style={{ borderTop: "1px dashed var(--coral)" }} /><span className="text-[var(--text-purple-2)]">False Positives</span></div>
            </div>
          </Card>

          {/* Contributing Banks */}
          <Card className="glass-2 border-[0.5px] border-[var(--border)] overflow-hidden">
            <div className="px-5 py-3 border-b-[0.5px] border-[var(--border)] text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" /> Network Participants
            </div>
            <div className="divide-y-[0.5px] divide-[var(--border)]">
              {banks.map((bank, i) => (
                <div key={i} className="px-5 py-3 flex items-center gap-3">
                  <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${bank.status === "contributing" ? "bg-[var(--teal)]" : "bg-[var(--amber)] animate-pulse"}`} />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white truncate">{bank.name}</div>
                    <div className="text-[0.6rem] text-[var(--text-purple-3)] font-['Geist_Mono']">
                      {bank.contribution.toLocaleString()} samples · {bank.modelVersion} · {bank.lastSync}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-20 h-1.5 bg-[var(--glass3)] rounded overflow-hidden">
                      <div className="h-full bg-[var(--brand-hi)] rounded" style={{ width: `${(bank.contribution / 18400) * 100}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Privacy Controls */}
          <Card className="glass-2 border-[0.5px] border-[var(--border-purple)] p-4 bg-[rgba(139,92,246,.03)]">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-3.5 h-3.5 text-[var(--brand-hi)]" />
              <h3 className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--brand-hi)] font-['Geist_Mono']">Privacy Controls</h3>
            </div>
            <div className="space-y-3">
              {privacyControls.map((ctrl, i) => (
                <div key={i} className="p-2.5 bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[0.65rem] font-semibold text-white">{ctrl.label}</span>
                    <span className="text-[0.55rem] font-bold text-[var(--teal)] font-['Geist_Mono'] bg-[rgba(52,211,153,.1)] px-1.5 py-0.5 rounded">{ctrl.status}</span>
                  </div>
                  <p className="text-[0.6rem] text-[var(--text-purple-3)]">{ctrl.desc}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
