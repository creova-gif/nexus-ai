import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Shield, AlertTriangle, CheckCircle, Eye, Cpu, Fingerprint, Monitor, Zap } from "lucide-react";

const submissions = [
  { id: "KYC-007", name: "Arjun Mehta", submitted: "2026-05-22 14:32", overallRisk: 12, liveness: 98, keystroke: 94, device: 91, document: 97, synthetic: 4, verdict: "PASS" },
  { id: "KYC-008", name: "Unknown Entity #88", submitted: "2026-05-22 13:15", overallRisk: 87, liveness: 31, keystroke: 28, device: 44, document: 19, synthetic: 92, verdict: "DEEPFAKE" },
  { id: "KYC-009", name: "Sarah O'Brien", submitted: "2026-05-22 11:44", overallRisk: 34, liveness: 81, keystroke: 88, device: 90, document: 73, synthetic: 18, verdict: "REVIEW" },
  { id: "KYC-010", name: "Chen Liu", submitted: "2026-05-22 10:02", overallRisk: 8, liveness: 99, keystroke: 97, device: 98, document: 99, synthetic: 2, verdict: "PASS" },
];

const biometricSignals = [
  { label: "Keystroke Dynamics", icon: Fingerprint, desc: "Typing rhythm, dwell time, flight time between keys", color: "var(--brand-hi)" },
  { label: "Passive Liveness", icon: Eye, desc: "Micro-expression analysis, blink patterns, depth estimation", color: "var(--teal)" },
  { label: "Device Posture", icon: Monitor, desc: "Gyroscope drift, touch pressure, screen orientation micro-movements", color: "var(--sky)" },
  { label: "Document Forensics", icon: Shield, desc: "Pixel-level deepfake artifacts, metadata consistency, EXIF integrity", color: "var(--gold)" },
  { label: "Synthetic Identity Score", icon: Cpu, desc: "GAN fingerprint detection, face generation artifact scoring", color: "var(--coral)" },
];

const getVerdictStyle = (v: string) => {
  switch (v) {
    case "PASS": return { cls: "bg-[rgba(52,211,153,.10)] text-[var(--teal)] border-[rgba(52,211,153,.28)]", icon: CheckCircle };
    case "DEEPFAKE": return { cls: "bg-[rgba(248,113,113,.12)] text-[var(--coral)] border-[rgba(248,113,113,.3)]", icon: AlertTriangle };
    case "REVIEW": return { cls: "bg-[rgba(251,191,36,.12)] text-[var(--amber)] border-[rgba(251,191,36,.3)]", icon: Eye };
    default: return { cls: "", icon: CheckCircle };
  }
};

const getScoreColor = (score: number, inverted = false) => {
  const high = inverted ? score > 70 : score > 80;
  const med = inverted ? score > 40 : score > 60;
  if (high) return inverted ? "var(--coral)" : "var(--teal)";
  if (med) return inverted ? "var(--amber)" : "var(--amber)";
  return inverted ? "var(--teal)" : "var(--coral)";
};

export default function DeepfakeDetection() {
  const [selected, setSelected] = useState(submissions[0]);

  const vd = getVerdictStyle(selected.verdict);
  const VdIcon = vd.icon;

  const scores = [
    { label: "Liveness Score", value: selected.liveness, inverted: false },
    { label: "Keystroke Auth", value: selected.keystroke, inverted: false },
    { label: "Device Integrity", value: selected.device, inverted: false },
    { label: "Doc Authenticity", value: selected.document, inverted: false },
    { label: "Synthetic ID Risk", value: selected.synthetic, inverted: true },
  ];

  return (
    <DashboardLayout pageTitle="Deepfake & Synthetic ID Detection" breadcrumb="Behavioral Biometrics">
      <div className="flex flex-col gap-4">

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Submissions Today", value: submissions.length.toString(), color: "var(--brand-hi)" },
            { label: "Deepfakes Blocked", value: submissions.filter(s => s.verdict === "DEEPFAKE").length.toString(), color: "var(--coral)" },
            { label: "Under Review", value: submissions.filter(s => s.verdict === "REVIEW").length.toString(), color: "var(--amber)" },
            { label: "Verified Pass", value: submissions.filter(s => s.verdict === "PASS").length.toString(), color: "var(--teal)" },
          ].map((stat, i) => (
            <Card key={i} className="glass-2 border-[0.5px] border-[var(--border)] p-4 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[1.5px]" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}, transparent)` }} />
              <div className="text-[0.6rem] font-bold tracking-widest uppercase text-[var(--text-purple-3)] font-['Geist_Mono'] mb-1">{stat.label}</div>
              <div className="text-2xl font-bold font-['Instrument_Serif']" style={{ color: stat.color }}>{stat.value}</div>
            </Card>
          ))}
        </div>

        <div className="flex gap-4">
          {/* Left: Submission Queue */}
          <div className="w-[260px] flex-shrink-0 space-y-2">
            <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] px-1">KYC Submission Queue</div>
            {submissions.map(s => {
              const st = getVerdictStyle(s.verdict);
              const Icon = st.icon;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className={`p-3.5 rounded-xl border-[0.5px] cursor-pointer transition-all ${selected.id === s.id ? "border-[var(--border-purple)] bg-[var(--glass2)]" : "border-[var(--border)] bg-[var(--glass)] hover:border-[var(--border2)]"}`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-semibold text-white">{s.name}</span>
                    <span className={`px-1.5 py-0.5 rounded-full text-[0.57rem] font-bold border-[0.5px] font-['Geist_Mono'] flex items-center gap-1 ${st.cls}`}>
                      <Icon className="w-2.5 h-2.5" />{s.verdict}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-[0.62rem] text-[var(--text-purple-3)]">
                    <span>{s.id}</span>
                    <span>Risk: <span style={{ color: getScoreColor(s.overallRisk, true) }} className="font-bold">{s.overallRisk}</span></span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Detail */}
          <div className="flex-1 flex flex-col gap-4">
            {/* Header */}
            <Card className="glass-2 border-[0.5px] border-[var(--border)] p-5 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h2 className="text-xl font-bold text-white font-['Instrument_Serif']">{selected.name}</h2>
                  <span className={`px-2 py-0.5 rounded-full text-[0.6rem] font-bold border-[0.5px] font-['Geist_Mono'] flex items-center gap-1.5 ${vd.cls}`}>
                    <VdIcon className="w-3 h-3" />{selected.verdict}
                  </span>
                </div>
                <p className="text-xs text-[var(--text-purple-2)]">{selected.id} · Submitted {selected.submitted}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-[0.57rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-1">Synthetic ID Risk</div>
                  <div className="text-3xl font-bold font-['Instrument_Serif']" style={{ color: getScoreColor(selected.synthetic, true) }}>{selected.synthetic}</div>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="glass border-[var(--coral)] text-[var(--coral)] text-xs h-8">Block & Flag</Button>
                  <Button size="sm" className="gradient-purple text-white text-xs h-8 gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" /> Approve KYC
                  </Button>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-4">
              {/* Biometric Scores */}
              <Card className="glass-2 border-[0.5px] border-[var(--border)] p-5">
                <h3 className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-4 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5 text-[var(--brand-hi)]" /> Behavioral Biometric Scores
                </h3>
                <div className="space-y-3.5">
                  {scores.map((s, i) => (
                    <div key={i}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs text-[var(--text-purple-2)]">{s.label}</span>
                        <span className="text-xs font-bold font-['Geist_Mono']" style={{ color: getScoreColor(s.value, s.inverted) }}>{s.value}</span>
                      </div>
                      <div className="h-2 bg-[var(--glass3)] rounded overflow-hidden">
                        <div className="h-full rounded transition-all duration-700" style={{ width: `${s.value}%`, background: getScoreColor(s.value, s.inverted) }} />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Signal Definitions */}
              <Card className="glass-2 border-[0.5px] border-[var(--border)] p-5">
                <h3 className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-4">Detection Signals</h3>
                <div className="space-y-2.5">
                  {biometricSignals.map((sig, i) => {
                    const Icon = sig.icon;
                    return (
                      <div key={i} className="flex items-start gap-3 p-2.5 bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg">
                        <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0" style={{ background: `${sig.color}15`, border: `0.5px solid ${sig.color}30` }}>
                          <Icon className="w-3.5 h-3.5" style={{ color: sig.color }} />
                        </div>
                        <div>
                          <div className="text-[0.68rem] font-semibold text-white">{sig.label}</div>
                          <div className="text-[0.6rem] text-[var(--text-purple-3)] mt-0.5">{sig.desc}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
