import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAppStore } from "../store";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FileText, CheckCircle, XCircle, User, Calendar } from "lucide-react";

export default function SupervisorQueue() {
  const { sarDrafts, updateSarStatus } = useAppStore();
  const [selectedSarId, setSelectedSarId] = useState<string | null>(sarDrafts[0]?.id || null);

  const selectedSar = sarDrafts.find(s => s.id === selectedSarId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-[var(--amber)] bg-[rgba(251,191,36,.15)]';
      case 'approved': return 'text-[var(--teal)] bg-[rgba(45,212,191,.15)]';
      case 'rejected': return 'text-[var(--coral)] bg-[rgba(248,113,113,.15)]';
      default: return 'text-[var(--text-purple-2)] bg-[var(--glass2)]';
    }
  };

  return (
    <DashboardLayout pageTitle="Supervisor Queue" breadcrumb="SAR Approvals">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
        
        {/* Left List: SAR Drafts */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-white font-['Instrument_Serif']">Review Queue</h2>
            <span className="text-xs text-[var(--text-purple-2)]">{sarDrafts.length} total</span>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto pr-2 pb-10">
            {sarDrafts.map(sar => (
              <Card 
                key={sar.id} 
                className={`glass border-[0.5px] p-4 cursor-pointer transition-all ${selectedSarId === sar.id ? 'border-[var(--border-purple)] bg-[var(--glass2)]' : 'border-[var(--border)] hover:border-[var(--border2)]'}`}
                onClick={() => setSelectedSarId(sar.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[rgba(168,85,247,.15)] text-purple-400 flex items-center justify-center">
                      <FileText className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white max-w-[150px] truncate">{sar.subject}</h3>
                      <p className="text-[0.65rem] text-[var(--text-purple-3)] uppercase tracking-wider">{sar.id}</p>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-[var(--text-purple-2)] mb-3 line-clamp-1">
                  {sar.type}
                </p>
                
                <div className="flex items-center justify-between pt-3 border-t-[0.5px] border-[var(--border)]">
                  <span className={`px-2 py-0.5 rounded-full text-[0.6rem] font-bold uppercase ${getStatusColor(sar.status)}`}>
                    {sar.status}
                  </span>
                  <div className="flex items-center gap-1.5 text-[0.65rem] text-[var(--text-purple-2)]">
                    <User className="w-3 h-3" />
                    <span>{sar.author}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Detail: SAR Review */}
        <div className="w-full lg:w-2/3">
          {selectedSar ? (
            <Card className="glass border-[0.5px] border-[var(--border)] h-full flex flex-col overflow-hidden">
              <div className="px-6 py-5 border-b-[0.5px] border-[var(--border)] bg-[var(--glass2)] flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-white font-['Instrument_Serif']">Suspicious Activity Report Draft</h2>
                  <p className="text-sm text-[var(--text-purple-2)] mt-1 flex items-center gap-2">
                    <span className="uppercase text-[0.65rem] tracking-wider font-bold">{selectedSar.id}</span>
                    <span>•</span>
                    <span>Drafted by: {selectedSar.author}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="glass border-[var(--coral)] text-[var(--coral)] hover:bg-[rgba(248,113,113,.1)]"
                    onClick={() => updateSarStatus(selectedSar.id, 'rejected')}
                  >
                    <XCircle className="w-3.5 h-3.5 mr-1" />
                    Reject
                  </Button>
                  <Button 
                    size="sm" 
                    className="gradient-purple text-white border-none"
                    onClick={() => updateSarStatus(selectedSar.id, 'approved')}
                  >
                    <CheckCircle className="w-3.5 h-3.5 mr-1" />
                    Approve & File
                  </Button>
                </div>
              </div>

              <div className="p-6 flex-1 overflow-y-auto bg-[var(--bg)]">
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-[var(--glass2)] border-[0.5px] border-[var(--border)] rounded-md p-4">
                    <div className="text-[0.65rem] font-bold text-[var(--text-purple-3)] uppercase tracking-wider mb-1">Subject Entity</div>
                    <div className="text-sm text-white font-semibold">{selectedSar.subject}</div>
                  </div>
                  <div className="bg-[var(--glass2)] border-[0.5px] border-[var(--border)] rounded-md p-4">
                    <div className="text-[0.65rem] font-bold text-[var(--text-purple-3)] uppercase tracking-wider mb-1">Activity Type</div>
                    <div className="text-sm text-[var(--brand-hi)] font-semibold">{selectedSar.type}</div>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-[var(--text-purple-2)] mb-3 uppercase tracking-widest font-['Geist_Mono']">Narrative Summary</h3>
                
                <div className="bg-[var(--bg1)] border-[0.5px] border-[var(--border)] rounded-lg p-5">
                  <p className="text-sm text-[var(--text-purple)] leading-relaxed whitespace-pre-wrap">
                    {selectedSar.summary}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-xs text-[var(--text-purple-3)]">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Draft created on {new Date().toLocaleDateString()} for regulatory compliance.</span>
                </div>
              </div>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border-[0.5px] border-dashed border-[var(--border)] rounded-xl">
              <p className="text-[var(--text-purple-2)]">Select a SAR draft to review.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
