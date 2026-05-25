import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Send, Paperclip, Lock, Mail, MessageSquare, FileText, CheckCircle, Clock, AlertTriangle } from "lucide-react";

const cases = [
  { id: "CASE-2026-0044", entity: "Account #CA-4471", type: "Structuring", status: "open", unread: 2 },
  { id: "CASE-2026-0041", entity: "Global Trade Corp", type: "Network Anomaly", status: "open", unread: 0 },
  { id: "CASE-2026-0039", entity: "Viktor Sokolov", type: "PEP Match", status: "pending-docs", unread: 1 },
  { id: "CASE-2026-0035", entity: "Meridian Holdings", type: "Sanctions Hit", status: "closed", unread: 0 },
];

type MessageRole = "investigator" | "client" | "system";

interface Message {
  id: number;
  role: MessageRole;
  author: string;
  text: string;
  time: string;
  channel?: string;
  attachment?: string;
  read: boolean;
}

const threadsByCase: Record<string, Message[]> = {
  "CASE-2026-0044": [
    { id: 1, role: "system", author: "NexusAI", text: "Case opened. Automated document request sent via SMS and Email to account holder.", time: "May 22, 09:01", read: true },
    { id: 2, role: "investigator", author: "J. Okafor", text: "Hi — we require source of funds documentation for the three transactions flagged on May 20–22. Please provide bank statements or invoices.", time: "May 22, 09:15", channel: "Email", read: true },
    { id: 3, role: "client", author: "Client (CA-4471)", text: "I can provide the invoices. When do you need them by?", time: "May 22, 11:34", read: true },
    { id: 4, role: "investigator", author: "J. Okafor", text: "Please submit by end of business today. You can upload directly via the secure link in this thread.", time: "May 22, 11:50", channel: "Email", read: true },
    { id: 5, role: "client", author: "Client (CA-4471)", text: "Understood. Uploading now.", time: "May 22, 14:02", read: false },
    { id: 6, role: "client", author: "Client (CA-4471)", text: "Invoice attached.", time: "May 22, 14:05", attachment: "Invoice_May2026.pdf", read: false },
  ],
  "CASE-2026-0039": [
    { id: 1, role: "system", author: "NexusAI", text: "PEP match detected. Awaiting enhanced due diligence documents.", time: "May 20, 08:00", read: true },
    { id: 2, role: "investigator", author: "S. Patel", text: "Mr. Sokolov — we require a source of wealth declaration and a certified passport copy to proceed.", time: "May 20, 09:30", channel: "SMS", read: true },
    { id: 3, role: "client", author: "V. Sokolov", text: "I will have my attorney send these documents.", time: "May 21, 10:15", read: false },
  ],
  "CASE-2026-0041": [],
  "CASE-2026-0035": [
    { id: 1, role: "system", author: "NexusAI", text: "Case closed. All documents received and reviewed. No further action required.", time: "May 18, 16:00", read: true },
  ],
};

const requestTemplates = [
  { label: "Source of Funds", text: "Please provide documentation confirming the source of funds for recent transactions, including bank statements or signed invoices." },
  { label: "Source of Wealth", text: "As part of our enhanced due diligence, please provide a Source of Wealth declaration explaining the origin of your assets." },
  { label: "Invoice / Contract", text: "Please upload the relevant invoice or contract that supports the transaction(s) under review." },
  { label: "Passport / ID", text: "Please provide a certified copy of your government-issued photo identification." },
];

const getStatusStyle = (status: string) => {
  switch (status) {
    case "open": return "text-[var(--brand-hi)] bg-[var(--brand-glow)] border-[var(--border-purple)]";
    case "pending-docs": return "text-[var(--amber)] bg-[rgba(251,191,36,.1)] border-[rgba(251,191,36,.25)]";
    case "closed": return "text-[var(--text-purple-3)] bg-[var(--glass)] border-[var(--border)]";
    default: return "";
  }
};

const getStatusLabel = (status: string) => {
  switch (status) {
    case "open": return "Open";
    case "pending-docs": return "Pending Docs";
    case "closed": return "Closed";
    default: return status;
  }
};

export default function CommHub() {
  const [selectedCase, setSelectedCase] = useState(cases[0]);
  const [draft, setDraft] = useState("");
  const [channel, setChannel] = useState<"Email" | "SMS">("Email");
  const [messages, setMessages] = useState<Record<string, Message[]>>(threadsByCase);
  const [showTemplates, setShowTemplates] = useState(false);

  const thread = messages[selectedCase.id] || [];

  const sendMessage = () => {
    if (!draft.trim()) return;
    const newMsg: Message = {
      id: Date.now(),
      role: "investigator",
      author: "J. Okafor",
      text: draft,
      time: "Now",
      channel,
      read: true,
    };
    setMessages(prev => ({ ...prev, [selectedCase.id]: [...(prev[selectedCase.id] || []), newMsg] }));
    setDraft("");
  };

  const sendDocRequest = (template: { label: string; text: string }) => {
    const newMsg: Message = {
      id: Date.now(),
      role: "investigator",
      author: "J. Okafor",
      text: template.text,
      time: "Now",
      channel,
      read: true,
    };
    setMessages(prev => ({ ...prev, [selectedCase.id]: [...(prev[selectedCase.id] || []), newMsg] }));
    setShowTemplates(false);
  };

  return (
    <DashboardLayout pageTitle="Communication Hub" breadcrumb="Secure Omnichannel">
      <div className="flex gap-4 h-[calc(100vh-130px)]">

        {/* Case List */}
        <div className="w-[240px] flex-shrink-0 flex flex-col gap-2">
          <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] px-1 mb-1">Active Cases</div>
          {cases.map(c => (
            <div
              key={c.id}
              onClick={() => setSelectedCase(c)}
              className={`p-3.5 rounded-xl border-[0.5px] cursor-pointer transition-all ${selectedCase.id === c.id ? "border-[var(--border-purple)] bg-[var(--glass2)]" : "border-[var(--border)] bg-[var(--glass)] hover:border-[var(--border2)]"}`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-semibold text-white truncate">{c.entity}</span>
                {c.unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-[var(--brand-hi)] text-white text-[0.55rem] font-bold flex items-center justify-center flex-shrink-0 ml-1">{c.unread}</span>
                )}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[0.6rem] text-[var(--text-purple-3)] font-['Geist_Mono']">{c.id.split("-").slice(-1)[0]}</span>
                <span className={`text-[0.55rem] font-bold px-1.5 py-0.5 rounded-full border-[0.5px] font-['Geist_Mono'] ${getStatusStyle(c.status)}`}>
                  {getStatusLabel(c.status)}
                </span>
              </div>
              <div className="text-[0.62rem] text-[var(--text-purple-3)] mt-1">{c.type}</div>
            </div>
          ))}
        </div>

        {/* Thread */}
        <div className="flex-1 flex flex-col glass-2 border-[0.5px] border-[var(--border)] rounded-xl overflow-hidden">
          {/* Thread Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b-[0.5px] border-[var(--border)] bg-[var(--glass)]">
            <div>
              <div className="flex items-center gap-2">
                <Lock className="w-3.5 h-3.5 text-[var(--teal)]" />
                <span className="text-sm font-semibold text-white">{selectedCase.entity}</span>
                <span className={`text-[0.55rem] font-bold px-1.5 py-0.5 rounded-full border-[0.5px] font-['Geist_Mono'] ${getStatusStyle(selectedCase.status)}`}>
                  {getStatusLabel(selectedCase.status)}
                </span>
              </div>
              <div className="text-[0.62rem] text-[var(--text-purple-3)] mt-0.5">{selectedCase.id} · End-to-end encrypted · {selectedCase.type}</div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="glass border-[var(--border)] text-[var(--text-purple-2)] text-xs h-7 gap-1.5">
                <Mail className="w-3 h-3" /> Email Audit
              </Button>
              <Button size="sm" variant="outline" className="glass border-[var(--border)] text-[var(--text-purple-2)] text-xs h-7 gap-1.5">
                <FileText className="w-3 h-3" /> View Case
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-[var(--bg)]">
            {thread.length === 0 ? (
              <div className="h-full flex items-center justify-center text-[var(--text-purple-3)] text-sm">No messages yet. Start the conversation.</div>
            ) : (
              thread.map(msg => {
                if (msg.role === "system") {
                  return (
                    <div key={msg.id} className="flex items-center gap-2 justify-center">
                      <div className="h-px flex-1 bg-[var(--border)]" />
                      <span className="text-[0.6rem] text-[var(--text-purple-3)] font-['Geist_Mono'] px-2">{msg.text} · {msg.time}</span>
                      <div className="h-px flex-1 bg-[var(--border)]" />
                    </div>
                  );
                }
                const isInvestigator = msg.role === "investigator";
                return (
                  <div key={msg.id} className={`flex ${isInvestigator ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[72%] ${isInvestigator ? "items-end" : "items-start"} flex flex-col gap-1`}>
                      <div className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${isInvestigator ? "bg-[var(--brand-glow)] border-[0.5px] border-[var(--border-purple)] text-[var(--text-purple)] rounded-tr-sm" : "bg-[var(--glass2)] border-[0.5px] border-[var(--border)] text-[var(--text-purple)] rounded-tl-sm"}`}>
                        {msg.text}
                        {msg.attachment && (
                          <div className="mt-2 flex items-center gap-2 px-2.5 py-1.5 bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg">
                            <Paperclip className="w-3 h-3 text-[var(--brand-hi)]" />
                            <span className="text-[0.65rem] font-['Geist_Mono'] text-[var(--brand-hi)]">{msg.attachment}</span>
                            <CheckCircle className="w-3 h-3 text-[var(--teal)] ml-auto" />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 px-1 text-[0.58rem] text-[var(--text-purple-3)]">
                        {msg.channel && <span className={`font-['Geist_Mono'] font-bold ${msg.channel === "SMS" ? "text-[var(--teal)]" : "text-[var(--brand-hi)]"}`}>{msg.channel}</span>}
                        <span>{msg.author}</span>
                        <span>·</span>
                        <span>{msg.time}</span>
                        {isInvestigator && <CheckCircle className="w-2.5 h-2.5 text-[var(--teal)]" />}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Composer */}
          <div className="px-5 py-3.5 border-t-[0.5px] border-[var(--border)] bg-[var(--glass)] space-y-2.5">
            {showTemplates && (
              <div className="grid grid-cols-2 gap-2 pb-1">
                {requestTemplates.map((t, i) => (
                  <button
                    key={i}
                    onClick={() => sendDocRequest(t)}
                    className="text-left px-3 py-2 bg-[var(--glass2)] border-[0.5px] border-[var(--border)] rounded-lg hover:border-[var(--border-purple)] transition-all"
                  >
                    <div className="text-[0.65rem] font-bold text-[var(--brand-hi)] mb-0.5">{t.label}</div>
                    <div className="text-[0.58rem] text-[var(--text-purple-3)] line-clamp-2">{t.text}</div>
                  </button>
                ))}
              </div>
            )}
            <div className="flex items-end gap-2">
              <div className="flex-1 relative">
                <textarea
                  value={draft}
                  onChange={e => setDraft(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }}}
                  rows={2}
                  placeholder="Write a secure message..."
                  className="w-full bg-[var(--bg)] border-[0.5px] border-[var(--border)] rounded-xl px-4 py-2.5 text-sm text-[var(--text-purple)] placeholder:text-[var(--text-purple-3)] outline-none focus:border-[var(--border-purple)] resize-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <div className="flex gap-1">
                  {(["Email", "SMS"] as const).map(ch => (
                    <button
                      key={ch}
                      onClick={() => setChannel(ch)}
                      className={`px-2 py-1 rounded-md text-[0.6rem] font-bold font-['Geist_Mono'] border-[0.5px] transition-all ${channel === ch ? "bg-[var(--brand-glow)] text-[var(--brand-hi)] border-[var(--border-purple)]" : "bg-[var(--glass)] text-[var(--text-purple-3)] border-[var(--border)] hover:border-[var(--border2)]"}`}
                    >
                      {ch}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowTemplates(v => !v)}
                  className="px-2 py-1 rounded-md text-[0.6rem] font-bold font-['Geist_Mono'] border-[0.5px] bg-[var(--glass)] text-[var(--text-purple-3)] border-[var(--border)] hover:border-[var(--border2)] flex items-center gap-1 transition-all"
                >
                  <FileText className="w-2.5 h-2.5" /> Templates
                </button>
                <Button size="sm" className="gradient-purple text-white text-xs h-8 gap-1.5" onClick={sendMessage}>
                  <Send className="w-3 h-3" /> Send
                </Button>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[0.58rem] text-[var(--text-purple-3)]">
              <Lock className="w-2.5 h-2.5 text-[var(--teal)]" />
              <span>End-to-end encrypted · Messages are admissible in regulatory proceedings · Delivery receipts logged to audit trail</span>
            </div>
          </div>
        </div>

        {/* Right: Request Panel */}
        <div className="w-[220px] flex-shrink-0 flex flex-col gap-3">
          <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] px-1">Document Requests</div>
          <Card className="glass-2 border-[0.5px] border-[var(--border)] p-4 space-y-2">
            {[
              { label: "Source of Funds", status: "received", icon: CheckCircle, color: "var(--teal)" },
              { label: "Invoice #INV-220", status: "received", icon: CheckCircle, color: "var(--teal)" },
              { label: "Passport Copy", status: "pending", icon: Clock, color: "var(--amber)" },
              { label: "Source of Wealth", status: "not-requested", icon: AlertTriangle, color: "var(--text-purple-3)" },
            ].map((doc, i) => {
              const Icon = doc.icon;
              return (
                <div key={i} className="flex items-center gap-2.5 p-2.5 bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg">
                  <Icon className="w-3.5 h-3.5 flex-shrink-0" style={{ color: doc.color }} />
                  <div className="flex-1 min-w-0">
                    <div className="text-[0.65rem] font-semibold text-[var(--text-purple)] truncate">{doc.label}</div>
                    <div className="text-[0.58rem] text-[var(--text-purple-3)] capitalize">{doc.status.replace("-", " ")}</div>
                  </div>
                </div>
              );
            })}
          </Card>

          <Card className="glass-2 border-[0.5px] border-[var(--border)] p-4">
            <div className="text-[0.6rem] font-bold uppercase tracking-widest text-[var(--text-purple-3)] font-['Geist_Mono'] mb-3">Delivery Stats</div>
            {[
              { label: "Emails Sent", value: "4" },
              { label: "SMS Sent", value: "2" },
              { label: "Docs Received", value: "2 / 3" },
              { label: "Avg Response Time", value: "3.4h" },
            ].map((s, i) => (
              <div key={i} className="flex justify-between py-1.5 border-b-[0.5px] border-[var(--border)] last:border-0">
                <span className="text-[0.62rem] text-[var(--text-purple-3)]">{s.label}</span>
                <span className="text-[0.62rem] font-bold text-[var(--text-purple)] font-['Geist_Mono']">{s.value}</span>
              </div>
            ))}
          </Card>

          <Card className="glass-2 border-[0.5px] border-[var(--border-purple)] p-4 bg-[rgba(139,92,246,.03)]">
            <div className="flex items-center gap-1.5 text-[0.6rem] font-bold text-[var(--brand-hi)] font-['Geist_Mono'] uppercase mb-2">
              <MessageSquare className="w-3 h-3" /> Quick Actions
            </div>
            <div className="space-y-1.5">
              {["Request Invoice", "Request ID Doc", "Send Deadline Notice", "Escalate to Manager"].map((a, i) => (
                <button key={i} className="w-full text-left text-[0.65rem] text-[var(--text-purple-2)] px-2.5 py-1.5 bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-lg hover:border-[var(--border-purple)] transition-all hover:text-white">
                  {a}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
