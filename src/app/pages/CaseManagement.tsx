import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useAppStore } from "../store";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Briefcase, Clock, Paperclip, Send, UserCheck, ShieldAlert } from "lucide-react";

export default function CaseManagement() {
  const { cases, addCaseNote } = useAppStore();
  const [selectedCaseId, setSelectedCaseId] = useState<string | null>(cases[0]?.id || null);
  const [noteInput, setNoteInput] = useState("");

  const selectedCase = cases.find(c => c.id === selectedCaseId);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'text-[var(--coral)] bg-[rgba(248,113,113,.15)]';
      case 'closed': return 'text-[var(--teal)] bg-[rgba(45,212,191,.15)]';
      default: return 'text-[var(--amber)] bg-[rgba(251,191,36,.15)]';
    }
  };

  return (
    <DashboardLayout pageTitle="Case Management" breadcrumb="Active Investigations">
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-120px)]">
        
        {/* Left List: Cases */}
        <div className="w-full lg:w-1/3 flex flex-col gap-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-bold text-white font-['Instrument_Serif']">Open Cases</h2>
            <span className="text-xs text-[var(--text-purple-2)]">{cases.length} active</span>
          </div>

          <div className="flex flex-col gap-3 overflow-y-auto pr-2 pb-10">
            {cases.map(c => (
              <Card 
                key={c.id} 
                className={`glass border-[0.5px] p-4 cursor-pointer transition-all ${selectedCaseId === c.id ? 'border-[var(--border-purple)] bg-[var(--glass2)]' : 'border-[var(--border)] hover:border-[var(--border2)]'}`}
                onClick={() => setSelectedCaseId(c.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[rgba(139,92,246,.15)] text-[var(--brand-hi)] flex items-center justify-center">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white max-w-[150px] truncate">{c.title}</h3>
                      <p className="text-[0.65rem] text-[var(--text-purple-3)] uppercase tracking-wider">{c.id}</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-3 pt-3 border-t-[0.5px] border-[var(--border)]">
                  <span className={`px-2 py-0.5 rounded-full text-[0.6rem] font-bold uppercase ${getStatusColor(c.status)}`}>
                    {c.status}
                  </span>
                  <div className="flex items-center gap-1.5 text-[0.65rem] text-[var(--text-purple-2)]">
                    <UserCheck className="w-3 h-3" />
                    <span>{c.assignee}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Detail: Case File & Audit Trail */}
        <div className="w-full lg:w-2/3">
          {selectedCase ? (
            <Card className="glass border-[0.5px] border-[var(--border)] h-full flex flex-col overflow-hidden">
              <div className="px-6 py-5 border-b-[0.5px] border-[var(--border)] bg-[var(--glass2)]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-white font-['Instrument_Serif']">{selectedCase.title}</h2>
                    <p className="text-sm text-[var(--text-purple-2)] mt-1 flex items-center gap-2">
                      <span className="uppercase text-[0.65rem] tracking-wider font-bold">{selectedCase.id}</span>
                      <span>•</span>
                      <span>Assigned to: {selectedCase.assignee}</span>
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="glass border-[var(--border)] text-[var(--text-purple-2)]">
                      Reassign
                    </Button>
                    <Button size="sm" className="gradient-purple text-white border-none">
                      Close Case
                    </Button>
                  </div>
                </div>
                <div className="flex gap-4">
                   <div className="flex-1 bg-[var(--bg)] border-[0.5px] border-[var(--border)] rounded-md p-3 flex items-center gap-3">
                      <ShieldAlert className="w-5 h-5 text-[var(--amber)]" />
                      <div>
                        <div className="text-[0.65rem] text-[var(--text-purple-3)] uppercase">Current Stage</div>
                        <div className="text-xs font-semibold text-white">Evidence Gathering</div>
                      </div>
                   </div>
                   <div className="flex-1 bg-[var(--bg)] border-[0.5px] border-[var(--border)] rounded-md p-3 flex items-center gap-3">
                      <Clock className="w-5 h-5 text-[var(--teal)]" />
                      <div>
                        <div className="text-[0.65rem] text-[var(--text-purple-3)] uppercase">Time Active</div>
                        <div className="text-xs font-semibold text-white">42 Hours</div>
                      </div>
                   </div>
                </div>
              </div>

              {/* Audit Log / Notes */}
              <div className="p-6 flex-1 overflow-y-auto bg-[var(--bg)]">
                <h3 className="text-sm font-bold text-[var(--text-purple-2)] mb-4 uppercase tracking-widest font-['Geist_Mono']">Audit Trail & Investigation Notes</h3>
                
                <div className="relative border-l border-[var(--border)] ml-3 pl-5 space-y-6">
                  {selectedCase.notes.map((note, idx) => (
                    <div key={idx} className="relative">
                      <div className="absolute -left-[25px] top-1 w-2 h-2 rounded-full bg-[var(--brand-hi)]" style={{ boxShadow: "0 0 0 4px var(--bg)" }} />
                      <div className="mb-1 flex items-center gap-2 text-xs">
                        <span className="font-bold text-white">{note.author}</span>
                        <span className="text-[var(--text-purple-3)] text-[0.65rem]">{new Date(note.timestamp).toLocaleString()}</span>
                      </div>
                      <div className="bg-[var(--glass2)] border-[0.5px] border-[var(--border)] p-3 rounded-md text-sm text-[var(--text-purple)]">
                        {note.text}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input */}
              <div className="px-4 py-3 border-t-[0.5px] border-[var(--border)] bg-[var(--glass)] flex gap-2 items-center">
                <Button size="sm" variant="outline" className="px-2 h-auto glass border-[var(--border)] text-[var(--text-purple-2)]">
                  <Paperclip className="w-4 h-4" />
                </Button>
                <input
                  type="text"
                  placeholder="Add a secure investigation note..."
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && noteInput.trim()) {
                      addCaseNote(selectedCase.id, noteInput.trim());
                      setNoteInput("");
                    }
                  }}
                  className="flex-1 px-3 py-2 text-xs bg-[var(--bg)] border-[0.5px] border-[var(--border)] rounded-md text-[var(--text-purple)] placeholder:text-[var(--text-purple-3)] outline-none focus:border-[var(--border-purple)]"
                />
                <Button 
                  size="sm" 
                  className="px-3 py-2 h-auto gradient-purple text-white"
                  onClick={() => {
                    if (noteInput.trim()) {
                      addCaseNote(selectedCase.id, noteInput.trim());
                      setNoteInput("");
                    }
                  }}
                >
                  <Send className="w-3.5 h-3.5" />
                </Button>
              </div>
            </Card>
          ) : (
            <div className="h-full flex items-center justify-center border-[0.5px] border-dashed border-[var(--border)] rounded-xl">
              <p className="text-[var(--text-purple-2)]">Select a case to view details.</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
