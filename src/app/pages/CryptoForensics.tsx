import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Search, Download, AlertTriangle, Filter, Zap } from "lucide-react";

const walletNodes = [
  { id: "w1", label: "0x4f2...9a1c", type: "wallet", risk: "critical", x: 620, y: 220, volume: "$1.2M" },
  { id: "w2", label: "0xb3d...41ff", type: "wallet", risk: "high", x: 720, y: 350, volume: "$340K" },
  { id: "w3", label: "bc1q...mx3k", type: "wallet", risk: "medium", x: 580, y: 390, volume: "$88K" },
  { id: "w4", label: "Binance Hot Wallet", type: "exchange", risk: "medium", x: 800, y: 240, volume: "Exchange" },
];

const fiatNodes = [
  { id: "f1", label: "Acct #CA-4471", type: "fiat", risk: "critical", x: 400, y: 290, volume: "$149K" },
  { id: "f2", label: "Global Trade Corp", type: "fiat", risk: "high", x: 250, y: 200, volume: "$4.2M" },
  { id: "f3", label: "Shell LLC A", type: "fiat", risk: "high", x: 280, y: 380, volume: "$620K" },
];

const edges = [
  { from: "f1", to: "w1", amount: "$149,400", type: "off-ramp" },
  { from: "f2", to: "f1", amount: "$4.2M", type: "fiat" },
  { from: "f3", to: "f1", amount: "$620K", type: "fiat" },
  { from: "w1", to: "w2", amount: "$340K", type: "crypto" },
  { from: "w1", to: "w3", amount: "$88K", type: "crypto" },
  { from: "w2", to: "w4", amount: "$220K", type: "on-ramp" },
];

const getNodePos = (id: string) => {
  return [...fiatNodes, ...walletNodes].find(n => n.id === id) || { x: 0, y: 0 };
};

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "critical": return "var(--coral)";
    case "high": return "var(--amber)";
    case "medium": return "var(--brand-hi)";
    default: return "var(--text-purple-2)";
  }
};

const getEdgeColor = (type: string) => {
  switch (type) {
    case "off-ramp": return "rgba(248,113,113,0.7)";
    case "on-ramp": return "rgba(251,191,36,0.7)";
    case "crypto": return "rgba(139,92,246,0.5)";
    default: return "rgba(168,85,247,0.3)";
  }
};

const recentTransfers = [
  { from: "Acct #CA-4471", to: "0x4f2...9a1c", amount: "$149,400", time: "2026-05-22 14:10", type: "FIAT → CRYPTO", flagged: true },
  { from: "0x4f2...9a1c", to: "0xb3d...41ff", amount: "$340,000", time: "2026-05-22 14:22", type: "CRYPTO → CRYPTO", flagged: true },
  { from: "0xb3d...41ff", to: "Binance Hot Wallet", amount: "$220,000", time: "2026-05-22 15:05", type: "CRYPTO → EXCHANGE", flagged: false },
  { from: "Global Trade Corp", to: "Acct #CA-4471", amount: "$4,200,000", time: "2026-05-21 09:00", type: "FIAT → FIAT", flagged: true },
];

export default function CryptoForensics() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>("f1");

  const selectedNode = [...fiatNodes, ...walletNodes].find(n => n.id === selected);

  return (
    <DashboardLayout pageTitle="Fiat-to-Crypto Forensics" breadcrumb="Unified Money Trail">
      <div className="flex flex-col gap-4 h-[calc(100vh-130px)]">

        {/* Controls */}
        <div className="flex items-center gap-3 bg-[var(--glass2)] border-[0.5px] border-[var(--border)] rounded-xl p-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-purple-3)]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search wallet, IBAN, entity..."
              className="w-full bg-[var(--bg)] border-[0.5px] border-[var(--border)] rounded-lg pl-9 pr-4 py-1.5 text-xs text-[var(--text-purple)] placeholder:text-[var(--text-purple-3)] outline-none focus:border-[var(--border-purple)]"
            />
          </div>
          <div className="flex gap-2 ml-2 text-[0.62rem] font-bold font-['Geist_Mono']">
            {[
              { label: "FIAT", color: "var(--brand-hi)", bg: "var(--brand-glow)" },
              { label: "CRYPTO", color: "#a78bfa", bg: "rgba(139,92,246,.12)" },
              { label: "OFF-RAMP", color: "var(--coral)", bg: "rgba(248,113,113,.12)" },
              { label: "EXCHANGE", color: "var(--amber)", bg: "rgba(251,191,36,.12)" },
            ].map(l => (
              <span key={l.label} className="px-2 py-1 rounded-md border-[0.5px] flex items-center gap-1.5" style={{ background: l.bg, color: l.color, borderColor: `${l.color}40` }}>
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: l.color }} />
                {l.label}
              </span>
            ))}
          </div>
          <div className="ml-auto flex gap-2">
            <Button variant="outline" size="sm" className="glass border-[var(--border)] text-[var(--text-purple-2)] text-xs h-8 gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filter
            </Button>
            <Button size="sm" className="gradient-purple text-white text-xs h-8 gap-1.5">
              <Download className="w-3.5 h-3.5" /> Export Graph
            </Button>
          </div>
        </div>

        <div className="flex gap-4 flex-1 overflow-hidden">
          {/* Graph */}
          <Card className="flex-1 glass-2 border-[0.5px] border-[var(--border)] relative overflow-hidden bg-[#05040f]">
            <svg className="w-full h-full absolute inset-0" viewBox="0 0 1060 550">
              <defs>
                <radialGradient id="coral-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(248,113,113,0.3)" />
                  <stop offset="100%" stopColor="rgba(248,113,113,0)" />
                </radialGradient>
                <radialGradient id="purple-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(139,92,246,0.25)" />
                  <stop offset="100%" stopColor="rgba(139,92,246,0)" />
                </radialGradient>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="rgba(139,92,246,0.5)" />
                </marker>
                <marker id="arrow-red" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="rgba(248,113,113,0.7)" />
                </marker>
              </defs>

              {/* Grid dots */}
              {Array.from({ length: 20 }).map((_, row) =>
                Array.from({ length: 30 }).map((_, col) => (
                  <circle key={`${row}-${col}`} cx={col * 37 + 18} cy={row * 28 + 14} r="0.7" fill="rgba(139,92,246,0.08)" />
                ))
              )}

              {/* Glow halos */}
              <circle cx="400" cy="290" r="55" fill="url(#coral-glow)" />
              <circle cx="620" cy="220" r="45" fill="url(#coral-glow)" />
              <circle cx="250" cy="200" r="40" fill="url(#purple-glow)" />

              {/* Edges */}
              {edges.map((e, i) => {
                const from = getNodePos(e.from);
                const to = getNodePos(e.to);
                const mx = (from.x + to.x) / 2;
                const my = (from.y + to.y) / 2 - 30;
                return (
                  <g key={i}>
                    <path
                      d={`M${from.x},${from.y} Q${mx},${my} ${to.x},${to.y}`}
                      fill="none"
                      stroke={getEdgeColor(e.type)}
                      strokeWidth={e.type === "off-ramp" ? "2.5" : "1.5"}
                      strokeDasharray={e.type === "fiat" ? "none" : "6 3"}
                      markerEnd={e.type === "off-ramp" ? "url(#arrow-red)" : "url(#arrow)"}
                    />
                    <text x={mx} y={my - 6} textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9" fontFamily="monospace">{e.amount}</text>
                  </g>
                );
              })}

              {/* Fiat nodes */}
              {fiatNodes.map(n => (
                <g key={n.id} className="cursor-pointer" onClick={() => setSelected(n.id)}>
                  <rect x={n.x - 48} y={n.y - 18} width="96" height="36" rx="6" fill={selected === n.id ? "rgba(139,92,246,0.2)" : "rgba(5,4,15,0.8)"} stroke={getRiskColor(n.risk)} strokeWidth={selected === n.id ? "2" : "1"} />
                  <text x={n.x} y={n.y - 4} textAnchor="middle" fill="white" fontSize="10" fontFamily="monospace" fontWeight="bold">{n.label}</text>
                  <text x={n.x} y={n.y + 10} textAnchor="middle" fill={getRiskColor(n.risk)} fontSize="9">FIAT · {n.volume}</text>
                </g>
              ))}

              {/* Wallet nodes */}
              {walletNodes.map(n => (
                <g key={n.id} className="cursor-pointer" onClick={() => setSelected(n.id)}>
                  <polygon
                    points={`${n.x},${n.y - 22} ${n.x + 38},${n.y + 11} ${n.x - 38},${n.y + 11}`}
                    fill={selected === n.id ? "rgba(139,92,246,0.2)" : "rgba(5,4,15,0.7)"}
                    stroke={n.type === "exchange" ? "var(--amber)" : getRiskColor(n.risk)}
                    strokeWidth={selected === n.id ? "2" : "1"}
                  />
                  <text x={n.x} y={n.y + 2} textAnchor="middle" fill="white" fontSize="9" fontFamily="monospace">{n.label}</text>
                  <text x={n.x} y={n.y + 20} textAnchor="middle" fill={n.type === "exchange" ? "var(--amber)" : getRiskColor(n.risk)} fontSize="8">
                    {n.type === "exchange" ? "DEX/CEX" : "CRYPTO"} · {n.volume}
                  </text>
                </g>
              ))}

              {/* Legend */}
              <rect x="18" y="16" width="130" height="80" rx="6" fill="rgba(5,4,15,0.85)" stroke="rgba(139,92,246,0.2)" strokeWidth="0.5" />
              <text x="28" y="34" fill="rgba(255,255,255,0.5)" fontSize="8" fontFamily="monospace" fontWeight="bold">LEGEND</text>
              <rect x="28" y="40" width="14" height="10" rx="2" fill="rgba(5,4,15,0.8)" stroke="rgba(139,92,246,0.6)" strokeWidth="1" />
              <text x="47" y="50" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="monospace">Fiat Account</text>
              <polygon points="35,68 42,78 28,78" fill="rgba(5,4,15,0.8)" stroke="rgba(139,92,246,0.6)" strokeWidth="1" />
              <text x="47" y="76" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="monospace">Crypto Wallet</text>
              <line x1="28" y1="87" x2="42" y2="87" stroke="rgba(248,113,113,0.7)" strokeWidth="2" strokeDasharray="4 2" />
              <text x="47" y="91" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="monospace">Fiat→Crypto</text>
            </svg>
          </Card>

          {/* Right Panel */}
          <div className="w-[280px] flex-shrink-0 flex flex-col gap-3">
            {/* Node Details */}
            <Card className="glass-2 border-[0.5px] border-[var(--border)] p-4">
              <div className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-3">Node Details</div>
              {selectedNode ? (
                <div className="space-y-2.5">
                  <div><div className="text-[0.57rem] text-[var(--text-purple-3)] uppercase font-['Geist_Mono']">Identifier</div><div className="text-xs font-bold text-white font-['Geist_Mono'] mt-0.5">{selectedNode.label}</div></div>
                  <div><div className="text-[0.57rem] text-[var(--text-purple-3)] uppercase font-['Geist_Mono']">Type</div><div className="text-xs text-[var(--text-purple)] mt-0.5 uppercase font-['Geist_Mono']">{selectedNode.type}</div></div>
                  <div><div className="text-[0.57rem] text-[var(--text-purple-3)] uppercase font-['Geist_Mono']">Total Volume</div><div className="text-xs font-bold text-[var(--brand-hi)] mt-0.5">{selectedNode.volume}</div></div>
                  <div><div className="text-[0.57rem] text-[var(--text-purple-3)] uppercase font-['Geist_Mono']">Risk Level</div>
                    <span className="text-[0.65rem] font-bold" style={{ color: getRiskColor(selectedNode.risk) }}>{selectedNode.risk.toUpperCase()}</span>
                  </div>
                  <Button size="sm" className="gradient-purple text-white text-xs h-7 gap-1.5 w-full mt-2">
                    <AlertTriangle className="w-3 h-3" /> Flag & Investigate
                  </Button>
                </div>
              ) : (
                <p className="text-xs text-[var(--text-purple-3)]">Click a node to inspect</p>
              )}
            </Card>

            {/* Recent Transfers */}
            <Card className="glass-2 border-[0.5px] border-[var(--border)] flex-1 overflow-hidden flex flex-col">
              <div className="px-4 py-3 border-b-[0.5px] border-[var(--border)] text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-[var(--brand-hi)]" /> Money Trail
              </div>
              <div className="flex-1 overflow-y-auto divide-y-[0.5px] divide-[var(--border)]">
                {recentTransfers.map((t, i) => (
                  <div key={i} className={`p-3 ${t.flagged ? "bg-[rgba(248,113,113,.03)]" : ""}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[0.6rem] font-bold font-['Geist_Mono'] text-[var(--brand-hi)]">{t.type}</span>
                      {t.flagged && <AlertTriangle className="w-3 h-3 text-[var(--coral)]" />}
                    </div>
                    <div className="text-[0.65rem] text-[var(--text-purple-3)] truncate">{t.from}</div>
                    <div className="text-[0.6rem] text-[var(--text-purple-3)] my-0.5">↓ {t.amount}</div>
                    <div className="text-[0.65rem] text-[var(--text-purple-3)] truncate">{t.to}</div>
                    <div className="text-[0.58rem] text-[var(--text-purple-3)] mt-1 font-['Geist_Mono']">{t.time}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
