import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Switch } from "../components/ui/switch";
import { Sliders, Search, Zap, Shield, AlertOctagon } from "lucide-react";

export default function RulesEngine() {
  const [rules, setRules] = useState([
    { id: "R-1001", name: "High Velocity Transfers", category: "AML", riskLevel: "high", enabled: true, description: "Flags accounts sending more than 5 transfers over $10,000 within a 24-hour period." },
    { id: "R-1002", name: "PEP Name Match", category: "Sanctions", riskLevel: "critical", enabled: true, description: "Flags transactions involving names matching politically exposed persons (PEP) lists." },
    { id: "R-1003", name: "Structuring Anomalies", category: "AML", riskLevel: "medium", enabled: true, description: "Identifies multiple deposits just under the $10,000 reporting threshold." },
    { id: "R-1004", name: "New Device Login Spike", category: "Fraud", riskLevel: "low", enabled: false, description: "Alerts when a user logs in from more than 3 unknown devices in a week." },
    { id: "R-1005", name: "Crypto Exchange Velocity", category: "AML", riskLevel: "high", enabled: true, description: "Monitors rapid fund movement to and from known cryptocurrency exchanges." }
  ]);

  const toggleRule = (id: string) => {
    setRules(rules.map(r => r.id === id ? { ...r, enabled: !r.enabled } : r));
  };

  const getRiskIcon = (level: string) => {
    switch (level) {
      case 'critical': return <AlertOctagon className="w-4 h-4 text-[var(--coral)]" />;
      case 'high': return <Zap className="w-4 h-4 text-[var(--amber)]" />;
      default: return <Shield className="w-4 h-4 text-[var(--teal)]" />;
    }
  };

  return (
    <DashboardLayout pageTitle="Rules Engine" breadcrumb="Configuration">
      <div className="flex flex-col gap-6">
        
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[var(--glass2)] border-[0.5px] border-[var(--border)] p-4 rounded-xl">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-purple-3)]" />
            <input 
              type="text" 
              placeholder="Search rules, thresholds, typologies..." 
              className="w-full bg-[var(--bg1)] border-[0.5px] border-[var(--border)] rounded-md pl-9 pr-4 py-2 text-sm text-[var(--text-purple)] placeholder:text-[var(--text-purple-3)] outline-none focus:border-[var(--border-purple)]"
            />
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Button variant="outline" className="glass border-[var(--border)] text-[var(--text-purple-2)] flex-1 md:flex-none">
              <Sliders className="w-4 h-4 mr-2" /> Filters
            </Button>
            <Button className="gradient-purple text-white border-none flex-1 md:flex-none">
              + Create Custom Rule
            </Button>
          </div>
        </div>

        {/* Rules List */}
        <Card className="glass border-[0.5px] border-[var(--border)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-[0.5px] border-[var(--border)] bg-[var(--glass2)]">
                  <th className="px-6 py-4 text-xs font-bold text-[var(--text-purple-3)] uppercase tracking-wider">Rule Details</th>
                  <th className="px-6 py-4 text-xs font-bold text-[var(--text-purple-3)] uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-[var(--text-purple-3)] uppercase tracking-wider">Risk Level</th>
                  <th className="px-6 py-4 text-xs font-bold text-[var(--text-purple-3)] uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y-[0.5px] divide-[var(--border)]">
                {rules.map(rule => (
                  <tr key={rule.id} className="hover:bg-[rgba(255,255,255,0.02)] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full ${rule.enabled ? 'bg-[var(--teal)]' : 'bg-[var(--text-purple-3)]'}`} />
                        <div>
                          <div className="text-sm font-bold text-white mb-1">{rule.name}</div>
                          <div className="text-xs text-[var(--text-purple-2)] max-w-md">{rule.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded bg-[rgba(168,85,247,.1)] border border-[rgba(168,85,247,.2)] text-[0.65rem] font-bold text-[var(--brand-hi)] uppercase">
                        {rule.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 capitalize text-xs text-[var(--text-purple-2)] font-semibold">
                        {getRiskIcon(rule.riskLevel)}
                        {rule.riskLevel}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Switch 
                        checked={rule.enabled} 
                        onCheckedChange={() => toggleRule(rule.id)}
                        className={`${rule.enabled ? 'bg-[var(--brand-hi)]' : 'bg-[var(--bg1)]'}`}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

      </div>
    </DashboardLayout>
  );
}
