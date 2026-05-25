import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Search, Building2, User, AlertTriangle, CheckCircle, Download } from "lucide-react";

const uboRegistry = [
  {
    id: "UBO-001",
    entity: "Global Trade Corp",
    jurisdiction: "Ontario, Canada",
    type: "Corporation",
    status: "incomplete",
    structure: [
      {
        name: "Global Trade Corp", type: "corp", ownership: 100, flagged: false,
        children: [
          {
            name: "Offshore Holdings Ltd", type: "corp", ownership: 70, flagged: true, jurisdiction: "Cayman Islands",
            children: [
              { name: "Viktor Sokolov", type: "person", ownership: 51, flagged: true, nationality: "RU", pep: true },
              { name: "Unknown Nominee", type: "person", ownership: 49, flagged: true, nationality: "Unknown", pep: false },
            ]
          },
          {
            name: "Meridian Capital Inc", type: "corp", ownership: 30, flagged: false, jurisdiction: "Canada",
            children: [
              { name: "James Whitfield", type: "person", ownership: 100, flagged: false, nationality: "CA", pep: false },
            ]
          },
        ]
      }
    ]
  },
  {
    id: "UBO-002",
    entity: "Meridian Holdings Ltd",
    jurisdiction: "British Columbia, Canada",
    type: "Corporation",
    status: "verified",
    structure: [
      {
        name: "Meridian Holdings Ltd", type: "corp", ownership: 100, flagged: false,
        children: [
          { name: "James Whitfield", type: "person", ownership: 75, flagged: false, nationality: "CA", pep: false },
          { name: "Lisa Huang", type: "person", ownership: 25, flagged: false, nationality: "CA", pep: false },
        ]
      }
    ]
  },
];

type StructureNode = {
  name: string;
  type: string;
  ownership: number;
  flagged: boolean;
  jurisdiction?: string;
  nationality?: string;
  pep?: boolean;
  children?: StructureNode[];
};

function TreeNode({ node, depth = 0 }: { node: StructureNode; depth?: number }) {
  const isPerson = node.type === "person";
  const isFlagged = node.flagged;

  return (
    <div className={`${depth > 0 ? "ml-6 mt-2" : ""} relative`}>
      {depth > 0 && (
        <div className="absolute -left-3 top-4 w-3 h-[0.5px] bg-[var(--border)]" />
      )}
      <div className={`flex items-center gap-2.5 p-2.5 rounded-lg border-[0.5px] transition-all w-fit ${isFlagged ? "border-[rgba(248,113,113,.35)] bg-[rgba(248,113,113,.06)]" : "border-[var(--border)] bg-[var(--glass)]"}`}>
        <div className={`w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 ${isPerson ? (isFlagged ? "bg-[rgba(248,113,113,.15)]" : "bg-[rgba(52,211,153,.10)]") : "bg-[var(--brand-glow)]"}`}>
          {isPerson
            ? <User className={`w-3.5 h-3.5 ${isFlagged ? "text-[var(--coral)]" : "text-[var(--teal)]"}`} />
            : <Building2 className="w-3.5 h-3.5 text-[var(--brand-hi)]" />
          }
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold ${isFlagged ? "text-[var(--coral)]" : "text-white"}`}>{node.name}</span>
            {node.pep && (
              <span className="px-1 py-0.5 rounded text-[0.55rem] font-bold bg-[rgba(248,113,113,.15)] text-[var(--coral)] border-[0.5px] border-[rgba(248,113,113,.3)] font-['Geist_Mono']">PEP</span>
            )}
            {node.flagged && !node.pep && (
              <AlertTriangle className="w-3 h-3 text-[var(--coral)]" />
            )}
          </div>
          <div className="flex items-center gap-2 text-[0.6rem] text-[var(--text-purple-3)]">
            <span className="font-['Geist_Mono'] font-bold" style={{ color: node.ownership >= 25 ? "var(--brand-hi)" : "var(--text-purple-2)" }}>{node.ownership}%</span>
            {node.jurisdiction && <span>· {node.jurisdiction}</span>}
            {node.nationality && <span>· {node.nationality}</span>}
          </div>
        </div>
      </div>

      {node.children && node.children.length > 0 && (
        <div className="ml-3 mt-0.5 border-l-[0.5px] border-[var(--border)] pl-0">
          {node.children.map((child, i) => (
            <TreeNode key={i} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function UboDiscovery() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(uboRegistry[0]);

  const filtered = uboRegistry.filter(u =>
    u.entity.toLowerCase().includes(search.toLowerCase())
  );

  const getStatusStyle = (s: string) => {
    switch (s) {
      case "verified": return { label: "VERIFIED", cls: "bg-[rgba(52,211,153,.10)] text-[var(--teal)] border-[rgba(52,211,153,.28)]", icon: CheckCircle };
      case "incomplete": return { label: "INCOMPLETE", cls: "bg-[rgba(248,113,113,.12)] text-[var(--coral)] border-[rgba(248,113,113,.3)]", icon: AlertTriangle };
      default: return { label: s.toUpperCase(), cls: "", icon: AlertTriangle };
    }
  };

  const countNaturalPersons = (nodes: StructureNode[]): number => {
    let count = 0;
    for (const n of nodes) {
      if (n.type === "person") count++;
      if (n.children) count += countNaturalPersons(n.children);
    }
    return count;
  };

  const countFlagged = (nodes: StructureNode[]): number => {
    let count = 0;
    for (const n of nodes) {
      if (n.flagged) count++;
      if (n.children) count += countFlagged(n.children);
    }
    return count;
  };

  return (
    <DashboardLayout pageTitle="UBO Discovery" breadcrumb="Corporate Unwrapping">
      <div className="flex gap-4 h-[calc(100vh-130px)]">

        {/* Left: Entity List */}
        <div className="w-[260px] flex-shrink-0 flex flex-col gap-3 overflow-y-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-purple-3)]" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search entities..."
              className="w-full bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg pl-9 pr-4 py-2 text-xs text-[var(--text-purple)] placeholder:text-[var(--text-purple-3)] outline-none focus:border-[var(--border-purple)]"
            />
          </div>
          {filtered.map(u => {
            const st = getStatusStyle(u.status);
            const Icon = st.icon;
            return (
              <div
                key={u.id}
                onClick={() => setSelected(u)}
                className={`p-3.5 rounded-xl border-[0.5px] cursor-pointer transition-all ${selected.id === u.id ? "border-[var(--border-purple)] bg-[var(--glass2)]" : "border-[var(--border)] bg-[var(--glass)] hover:border-[var(--border2)]"}`}
              >
                <div className="flex items-start gap-2.5 mb-2">
                  <div className="w-7 h-7 rounded-md bg-[var(--brand-glow)] flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-3.5 h-3.5 text-[var(--brand-hi)]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-semibold text-white truncate">{u.entity}</div>
                    <div className="text-[0.62rem] text-[var(--text-purple-3)]">{u.id} · {u.jurisdiction}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[0.62rem] text-[var(--text-purple-3)]">{u.type}</span>
                  <span className={`px-1.5 py-0.5 rounded-full text-[0.57rem] font-bold border-[0.5px] font-['Geist_Mono'] flex items-center gap-1 ${st.cls}`}>
                    <Icon className="w-2.5 h-2.5" />{st.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: UBO Detail */}
        <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
          {selected && (
            <>
              {/* Header */}
              <Card className="glass-2 border-[0.5px] border-[var(--border)] p-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white font-['Instrument_Serif']">{selected.entity}</h2>
                  <p className="text-xs text-[var(--text-purple-2)] mt-1">{selected.id} · {selected.jurisdiction} · {selected.type}</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg px-3 py-2">
                      <div className="text-[0.57rem] text-[var(--text-purple-3)] font-['Geist_Mono'] uppercase mb-0.5">Natural Persons</div>
                      <div className="text-lg font-bold text-[var(--brand-hi)] font-['Instrument_Serif']">{countNaturalPersons(selected.structure)}</div>
                    </div>
                    <div className="bg-[var(--glass)] border-[0.5px] border-[rgba(248,113,113,.25)] rounded-lg px-3 py-2">
                      <div className="text-[0.57rem] text-[var(--text-purple-3)] font-['Geist_Mono'] uppercase mb-0.5">Flagged Nodes</div>
                      <div className="text-lg font-bold text-[var(--coral)] font-['Instrument_Serif']">{countFlagged(selected.structure)}</div>
                    </div>
                  </div>
                  <Button size="sm" className="gradient-purple text-white text-xs h-8 gap-1.5">
                    <Download className="w-3.5 h-3.5" /> Export Report
                  </Button>
                </div>
              </Card>

              {/* Ownership Tree */}
              <Card className="glass-2 border-[0.5px] border-[var(--border)] p-6 flex-1">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="text-[0.65rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono']">Beneficial Ownership Structure</h3>
                  <div className="flex items-center gap-4 text-[0.62rem] text-[var(--text-purple-3)]">
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[var(--brand-hi)]" /><span>Entity</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[var(--teal)]" /><span>Natural Person</span></div>
                    <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[var(--coral)]" /><span>Flagged / PEP</span></div>
                    <div className="flex items-center gap-1.5 font-bold text-[var(--brand-hi)]"><span>&gt;25%</span><span className="font-normal">= UBO threshold</span></div>
                  </div>
                </div>
                <div className="overflow-auto">
                  {selected.structure.map((node, i) => (
                    <TreeNode key={i} node={node} depth={0} />
                  ))}
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
