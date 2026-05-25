import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Search, Filter, ZoomIn, ZoomOut, Download, Network, Maximize, AlertOctagon } from "lucide-react";

export default function EntityGraph() {
  return (
    <DashboardLayout pageTitle="Entity Network Graph" breadcrumb="Link Analysis">
      <div className="flex flex-col h-[calc(100vh-120px)] gap-4">
        
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[var(--glass2)] border-[0.5px] border-[var(--border)] p-4 rounded-xl">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-lg bg-[rgba(168,85,247,.15)] text-purple-400 flex items-center justify-center border-[0.5px] border-[rgba(168,85,247,.3)]">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm">Global Trade Corp - Network Map</h3>
              <p className="text-[0.65rem] text-[var(--text-purple-3)]">Tracing 3 degrees of separation</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="relative hidden md:block w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-purple-3)]" />
              <input 
                type="text" 
                placeholder="Find node or connection..." 
                className="w-full bg-[var(--bg1)] border-[0.5px] border-[var(--border)] rounded-md pl-9 pr-4 py-1.5 text-xs text-[var(--text-purple)] placeholder:text-[var(--text-purple-3)] outline-none focus:border-[var(--border-purple)]"
              />
            </div>
            <Button variant="outline" size="sm" className="glass border-[var(--border)] text-[var(--text-purple-2)]">
              <Filter className="w-3.5 h-3.5 mr-1" /> Filter Nodes
            </Button>
            <Button size="sm" className="gradient-purple text-white border-none">
              <Download className="w-3.5 h-3.5 mr-1" /> Export Map
            </Button>
          </div>
        </div>

        {/* Graph Area */}
        <div className="flex-1 flex gap-4 overflow-hidden">
          {/* Main Visualizer */}
          <Card className="flex-1 glass border-[0.5px] border-[var(--border)] relative overflow-hidden bg-[#050508] flex items-center justify-center pattern-grid">
            
            {/* Absolute Controls */}
            <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
              <Button size="icon" variant="outline" className="w-8 h-8 glass border-[var(--border)] text-[var(--text-purple-2)]"><ZoomIn className="w-4 h-4" /></Button>
              <Button size="icon" variant="outline" className="w-8 h-8 glass border-[var(--border)] text-[var(--text-purple-2)]"><ZoomOut className="w-4 h-4" /></Button>
              <Button size="icon" variant="outline" className="w-8 h-8 glass border-[var(--border)] text-[var(--text-purple-2)]"><Maximize className="w-4 h-4" /></Button>
            </div>

            {/* Mock Graph Visualization SVG */}
            <svg viewBox="0 0 800 600" className="w-full h-full max-w-[800px] max-h-[600px] absolute inset-0 m-auto">
              <defs>
                <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--border-purple)" />
                  <stop offset="100%" stopColor="rgba(248,113,113,0.5)" />
                </linearGradient>
                <radialGradient id="node-glow-amber" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(251,191,36,0.4)" />
                  <stop offset="100%" stopColor="rgba(251,191,36,0)" />
                </radialGradient>
                <radialGradient id="node-glow-coral" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(248,113,113,0.4)" />
                  <stop offset="100%" stopColor="rgba(248,113,113,0)" />
                </radialGradient>
              </defs>

              {/* Edges */}
              <g stroke="var(--border)" strokeWidth="1" strokeDasharray="4 4">
                <line x1="400" y1="300" x2="250" y2="150" />
                <line x1="400" y1="300" x2="550" y2="180" />
                <line x1="400" y1="300" x2="300" y2="450" />
                <line x1="400" y1="300" x2="600" y2="400" stroke="url(#edge-grad)" strokeWidth="2" strokeDasharray="none" />
                <line x1="600" y1="400" x2="700" y2="350" stroke="var(--coral)" strokeWidth="1" strokeDasharray="none" />
                <line x1="250" y1="150" x2="150" y2="200" />
              </g>

              {/* Glowing Backgrounds */}
              <circle cx="600" cy="400" r="40" fill="url(#node-glow-coral)" />
              <circle cx="400" cy="300" r="40" fill="url(#node-glow-amber)" />

              {/* Nodes */}
              <g className="cursor-pointer">
                <circle cx="250" cy="150" r="16" fill="var(--glass2)" stroke="var(--border)" strokeWidth="1.5" />
                <text x="250" y="180" textAnchor="middle" fill="var(--text-purple-2)" fontSize="10" className="font-['Geist_Mono']">Corp A</text>
              </g>

              <g className="cursor-pointer">
                <circle cx="150" cy="200" r="12" fill="var(--glass2)" stroke="var(--border)" strokeWidth="1" />
                <text x="150" y="225" textAnchor="middle" fill="var(--text-purple-3)" fontSize="9">Shell LLC</text>
              </g>

              <g className="cursor-pointer">
                <circle cx="550" cy="180" r="20" fill="var(--glass2)" stroke="var(--border)" strokeWidth="1.5" />
                <text x="550" y="215" textAnchor="middle" fill="var(--text-purple-2)" fontSize="10">Partner XYZ</text>
              </g>

              <g className="cursor-pointer">
                <circle cx="300" cy="450" r="18" fill="var(--glass2)" stroke="var(--border)" strokeWidth="1.5" />
                <text x="300" y="485" textAnchor="middle" fill="var(--text-purple-2)" fontSize="10">Trust Acct</text>
              </g>

              <g className="cursor-pointer hover:scale-110 transition-transform origin-[600px_400px]">
                <circle cx="600" cy="400" r="22" fill="rgba(248,113,113,0.1)" stroke="var(--coral)" strokeWidth="2" />
                <text x="600" y="440" textAnchor="middle" fill="var(--coral)" fontSize="11" fontWeight="bold">Sanctioned Entity</text>
              </g>

              <g className="cursor-pointer">
                <circle cx="700" cy="350" r="12" fill="var(--glass2)" stroke="var(--coral)" strokeWidth="1" />
                <text x="700" y="375" textAnchor="middle" fill="var(--text-purple-3)" fontSize="9">Assoc 1</text>
              </g>

              {/* Root Node */}
              <g className="cursor-pointer">
                <circle cx="400" cy="300" r="28" fill="rgba(139,92,246,0.15)" stroke="var(--brand-hi)" strokeWidth="2" />
                <text x="400" y="345" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">Global Trade Corp</text>
              </g>

              {/* Data labels */}
              <rect x="470" y="335" width="60" height="20" rx="4" fill="rgba(248,113,113,0.2)" stroke="var(--coral)" strokeWidth="0.5" />
              <text x="500" y="348" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">$4.2M</text>

            </svg>
          </Card>

          {/* Right Info Panel */}
          <Card className="hidden lg:flex w-72 glass border-[0.5px] border-[var(--border)] flex-col">
            <div className="p-4 border-b-[0.5px] border-[var(--border)] bg-[var(--glass2)]">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-['Geist_Mono']">Node Details</h3>
            </div>
            <div className="p-4 flex-1">
              <div className="w-12 h-12 rounded-full bg-[rgba(248,113,113,.15)] border-[0.5px] border-[var(--coral)] flex items-center justify-center mb-4">
                <AlertOctagon className="w-6 h-6 text-[var(--coral)]" />
              </div>
              <h4 className="text-lg font-bold text-white mb-1">Sanctioned Entity</h4>
              <p className="text-xs text-[var(--coral)] font-bold mb-4 uppercase tracking-wider">OFAC Match: Critical</p>
              
              <div className="space-y-4 text-xs">
                <div>
                  <div className="text-[var(--text-purple-3)] mb-1">Entity ID</div>
                  <div className="text-white">ENT-884-991</div>
                </div>
                <div>
                  <div className="text-[var(--text-purple-3)] mb-1">Total Volume Transferred</div>
                  <div className="text-white">$4,250,000 USD</div>
                </div>
                <div>
                  <div className="text-[var(--text-purple-3)] mb-1">Relationship to Root</div>
                  <div className="text-white">Direct Wire Recipient (1st Degree)</div>
                </div>
              </div>

              <Button className="w-full mt-6 gradient-purple text-white border-none">
                Add to Case File
              </Button>
            </div>
          </Card>
        </div>

      </div>
    </DashboardLayout>
  );
}
