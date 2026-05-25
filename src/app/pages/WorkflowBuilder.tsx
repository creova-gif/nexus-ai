import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Plus, Play, Save, ChevronRight, Trash2, GitBranch, Filter, Users, AlertTriangle, Zap } from "lucide-react";

type NodeType = "trigger" | "condition" | "action";

interface WorkflowNode {
  id: string;
  type: NodeType;
  label: string;
  detail: string;
  color: string;
}

const defaultNodes: WorkflowNode[] = [
  { id: "n1", type: "trigger", label: "Transaction Alert Fired", detail: "Amount > $50,000 CAD", color: "var(--brand-hi)" },
  { id: "n2", type: "condition", label: "Crypto Wallet Linked?", detail: "Entity has linked wallet address", color: "var(--amber)" },
  { id: "n3", type: "action", label: "Route to Senior Investigations", detail: "Assign to Senior Investigator queue", color: "var(--teal)" },
];

const savedRules = [
  { name: "Crypto Escalation Rule", triggers: 147, modified: "May 22" },
  { name: "PEP High-Value Triage", triggers: 83, modified: "May 19" },
  { name: "Structuring Auto-Flag", triggers: 214, modified: "May 17" },
];

const triggerOptions = [
  "Transaction Alert Fired",
  "New AML Alert > $50K",
  "PEP Match Detected",
  "Sanctions Hit",
  "Risk Score Change",
  "KYC Document Received",
];

const conditionOptions = [
  "Crypto Wallet Linked",
  "Entity is PEP",
  "Risk Score > 80",
  "Country in High-Risk List",
  "Transaction Type = Structuring",
  "Customer Age < 30 days",
];

const actionOptions = [
  "Route to Senior Investigator",
  "Route to Sanctions Team",
  "Auto-File SAR Draft",
  "Send Document Request",
  "Escalate to CRO",
  "Freeze Account (Pending Review)",
  "Notify Compliance Manager",
];

const typeIcon = { trigger: Zap, condition: GitBranch, action: Users };
const typeLabel = { trigger: "TRIGGER", condition: "CONDITION", action: "ACTION" };

export default function WorkflowBuilder() {
  const [nodes, setNodes] = useState<WorkflowNode[]>(defaultNodes);
  const [selected, setSelected] = useState<string | null>("n1");
  const [saved, setSaved] = useState(false);

  const addNode = (type: NodeType) => {
    const defaults: Record<NodeType, { label: string; detail: string; color: string }> = {
      trigger: { label: "New Trigger", detail: "Define trigger condition", color: "var(--brand-hi)" },
      condition: { label: "New Condition", detail: "Define branch condition", color: "var(--amber)" },
      action: { label: "New Action", detail: "Define routing action", color: "var(--teal)" },
    };
    const d = defaults[type];
    const newNode: WorkflowNode = { id: `n${Date.now()}`, type, ...d };
    setNodes(prev => [...prev, newNode]);
    setSelected(newNode.id);
  };

  const removeNode = (id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id));
    setSelected(null);
  };

  const updateNodeLabel = (id: string, label: string) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, label } : n));
  };

  const updateNodeDetail = (id: string, detail: string) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, detail } : n));
  };

  const selectedNode = nodes.find(n => n.id === selected);

  const getOptions = (type: NodeType) => {
    switch (type) {
      case "trigger": return triggerOptions;
      case "condition": return conditionOptions;
      case "action": return actionOptions;
    }
  };

  return (
    <DashboardLayout pageTitle="Workflow Builder" breadcrumb="No-Code Triage">
      <div className="flex gap-4 h-[calc(100vh-130px)]">

        {/* Left: Saved Rules */}
        <div className="w-[220px] flex-shrink-0 flex flex-col gap-3">
          <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] px-1">Saved Rules</div>
          {savedRules.map((r, i) => (
            <div key={i} className="p-3.5 rounded-xl border-[0.5px] border-[var(--border)] bg-[var(--glass)] hover:border-[var(--border2)] cursor-pointer transition-all">
              <div className="text-xs font-semibold text-white mb-1.5">{r.name}</div>
              <div className="flex items-center justify-between text-[0.6rem] text-[var(--text-purple-3)]">
                <span className="font-['Geist_Mono']">{r.triggers} triggers</span>
                <span>Modified {r.modified}</span>
              </div>
            </div>
          ))}

          <Button variant="outline" size="sm" className="glass border-[var(--border)] text-[var(--text-purple-2)] text-xs h-8 gap-1.5 w-full mt-1" onClick={() => { setNodes([]); setSelected(null); }}>
            <Plus className="w-3.5 h-3.5" /> New Rule
          </Button>

          <div className="mt-2 space-y-2">
            <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] px-1">Add Step</div>
            {(["trigger", "condition", "action"] as NodeType[]).map(type => {
              const Icon = typeIcon[type];
              const colors: Record<NodeType, string> = { trigger: "var(--brand-hi)", condition: "var(--amber)", action: "var(--teal)" };
              return (
                <button key={type} onClick={() => addNode(type)} className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg border-[0.5px] border-[var(--border)] bg-[var(--glass)] hover:border-[var(--border2)] transition-all text-left">
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: colors[type] }} />
                  <span className="text-[0.65rem] font-semibold text-[var(--text-purple-2)]">Add {typeLabel[type]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Center: Canvas */}
        <Card className="flex-1 glass-2 border-[0.5px] border-[var(--border)] overflow-hidden relative">
          {/* Toolbar */}
          <div className="absolute top-3 right-3 z-10 flex gap-2">
            <Button size="sm" variant="outline" className="glass border-[var(--border)] text-[var(--text-purple-2)] text-xs h-7 gap-1.5">
              <Play className="w-3 h-3" /> Test Rule
            </Button>
            <Button size="sm" className="gradient-purple text-white text-xs h-7 gap-1.5" onClick={() => { setSaved(true); setTimeout(() => setSaved(false), 2000); }}>
              <Save className="w-3 h-3" /> {saved ? "Saved!" : "Save Rule"}
            </Button>
          </div>

          {/* Background grid */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="wf-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="0.7" fill="rgba(139,92,246,0.07)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#wf-grid)" />
          </svg>

          {/* Flow */}
          <div className="flex flex-col items-center justify-center h-full gap-0 relative z-10 py-8 overflow-y-auto">
            {nodes.map((node, i) => {
              const Icon = typeIcon[node.type];
              const isSelected = selected === node.id;
              return (
                <div key={node.id} className="flex flex-col items-center">
                  {/* Connector line */}
                  {i > 0 && (
                    <div className="flex flex-col items-center">
                      <div className="w-px h-6 bg-[var(--border)]" />
                      <ChevronRight className="w-3 h-3 text-[var(--text-purple-3)] rotate-90 -my-0.5" />
                      <div className="w-px h-6 bg-[var(--border)]" />
                    </div>
                  )}

                  {/* Node */}
                  <div
                    onClick={() => setSelected(node.id)}
                    className={`relative flex items-center gap-3 px-6 py-4 rounded-2xl border-[0.5px] cursor-pointer transition-all min-w-[340px] ${
                      isSelected
                        ? "border-[0.5px] bg-[var(--glass2)]"
                        : "border-[var(--border)] bg-[rgba(5,4,15,0.7)] hover:border-[var(--border2)]"
                    }`}
                    style={isSelected ? { borderColor: node.color, boxShadow: `0 0 0 1px ${node.color}20` } : {}}
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${node.color}15`, border: `0.5px solid ${node.color}30` }}>
                      <Icon className="w-4 h-4" style={{ color: node.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[0.55rem] font-bold font-['Geist_Mono'] uppercase tracking-widest" style={{ color: node.color }}>{typeLabel[node.type]}</span>
                      </div>
                      <div className="text-sm font-semibold text-white leading-tight">{node.label}</div>
                      <div className="text-[0.65rem] text-[var(--text-purple-3)] mt-0.5">{node.detail}</div>
                    </div>
                    {node.type === "condition" && (
                      <div className="flex flex-col gap-1 items-center">
                        <span className="text-[0.55rem] text-[var(--teal)] font-['Geist_Mono'] font-bold">YES</span>
                        <GitBranch className="w-3 h-3 text-[var(--text-purple-3)]" />
                        <span className="text-[0.55rem] text-[var(--coral)] font-['Geist_Mono'] font-bold">NO</span>
                      </div>
                    )}
                    <button onClick={e => { e.stopPropagation(); removeNode(node.id); }} className="w-6 h-6 rounded-md opacity-0 hover:opacity-100 group-hover:opacity-100 flex items-center justify-center hover:bg-[rgba(248,113,113,.15)] transition-all" style={{ opacity: isSelected ? 0.6 : 0 }}>
                      <Trash2 className="w-3 h-3 text-[var(--coral)]" />
                    </button>
                  </div>
                </div>
              );
            })}

            {nodes.length === 0 && (
              <div className="text-center text-[var(--text-purple-3)]">
                <GitBranch className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Add a trigger to start building your workflow</p>
              </div>
            )}
          </div>
        </Card>

        {/* Right: Node Editor */}
        <div className="w-[240px] flex-shrink-0 flex flex-col gap-3">
          <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] px-1">Node Properties</div>

          {selectedNode ? (
            <Card className="glass-2 border-[0.5px] border-[var(--border)] p-4 space-y-4">
              <div>
                <div className="text-[0.58rem] text-[var(--text-purple-3)] uppercase font-['Geist_Mono'] font-bold mb-2">Type</div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: `${selectedNode.color}15` }}>
                    {(() => { const Icon = typeIcon[selectedNode.type]; return <Icon className="w-3.5 h-3.5" style={{ color: selectedNode.color }} />; })()}
                  </div>
                  <span className="text-xs font-bold uppercase font-['Geist_Mono']" style={{ color: selectedNode.color }}>{typeLabel[selectedNode.type]}</span>
                </div>
              </div>

              <div>
                <div className="text-[0.58rem] text-[var(--text-purple-3)] uppercase font-['Geist_Mono'] font-bold mb-2">Label</div>
                <select
                  value={selectedNode.label}
                  onChange={e => updateNodeLabel(selectedNode.id, e.target.value)}
                  className="w-full bg-[var(--bg)] border-[0.5px] border-[var(--border)] rounded-lg px-2.5 py-1.5 text-xs text-[var(--text-purple)] outline-none focus:border-[var(--border-purple)]"
                >
                  {getOptions(selectedNode.type).map(o => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>

              <div>
                <div className="text-[0.58rem] text-[var(--text-purple-3)] uppercase font-['Geist_Mono'] font-bold mb-2">Detail / Threshold</div>
                <input
                  value={selectedNode.detail}
                  onChange={e => updateNodeDetail(selectedNode.id, e.target.value)}
                  className="w-full bg-[var(--bg)] border-[0.5px] border-[var(--border)] rounded-lg px-2.5 py-1.5 text-xs text-[var(--text-purple)] outline-none focus:border-[var(--border-purple)]"
                  placeholder="e.g. Amount > $50,000"
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                className="w-full border-[rgba(248,113,113,.3)] text-[var(--coral)] text-xs h-7 gap-1.5 hover:bg-[rgba(248,113,113,.08)]"
                onClick={() => removeNode(selectedNode.id)}
              >
                <Trash2 className="w-3 h-3" /> Remove Node
              </Button>
            </Card>
          ) : (
            <Card className="glass-2 border-[0.5px] border-[var(--border)] p-4 text-center">
              <Filter className="w-6 h-6 mx-auto mb-2 opacity-30 text-[var(--text-purple-3)]" />
              <p className="text-xs text-[var(--text-purple-3)]">Click a node to edit its properties</p>
            </Card>
          )}

          <Card className="glass-2 border-[0.5px] border-[var(--border)] p-4">
            <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-3">Rule Summary</div>
            <div className="flex justify-between py-1.5 border-b-[0.5px] border-[var(--border)]">
              <span className="text-[0.62rem] text-[var(--text-purple-3)]">Triggers</span>
              <span className="text-[0.62rem] font-bold text-[var(--brand-hi)] font-['Geist_Mono']">{nodes.filter(n => n.type === "trigger").length}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b-[0.5px] border-[var(--border)]">
              <span className="text-[0.62rem] text-[var(--text-purple-3)]">Conditions</span>
              <span className="text-[0.62rem] font-bold text-[var(--amber)] font-['Geist_Mono']">{nodes.filter(n => n.type === "condition").length}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-[0.62rem] text-[var(--text-purple-3)]">Actions</span>
              <span className="text-[0.62rem] font-bold text-[var(--teal)] font-['Geist_Mono']">{nodes.filter(n => n.type === "action").length}</span>
            </div>
          </Card>

          <Card className="glass-2 border-[0.5px] border-[var(--border)] p-4">
            <div className="flex items-center gap-1.5 text-[0.6rem] font-bold text-[var(--brand-hi)] font-['Geist_Mono'] uppercase mb-2">
              <AlertTriangle className="w-3 h-3" /> Example Rules
            </div>
            <div className="space-y-1.5 text-[0.6rem] text-[var(--text-purple-3)]">
              <p className="italic">"If Alert fires AND Crypto Wallet linked → Route to Senior Investigations"</p>
              <p className="italic">"If Risk Score &gt; 90 → Auto-File SAR Draft + Notify CRO"</p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
