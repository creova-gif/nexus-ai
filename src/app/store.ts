import { create } from 'zustand';

interface Alert {
  id: number;
  type: string;
  detail: string;
  score: number;
  riskLevel: string;
  status: string;
}

interface ChatMessage {
  type: 'user' | 'bot';
  text: string;
}

export interface KycProfile {
  id: string;
  name: string;
  type: 'individual' | 'business';
  status: 'pending' | 'verified' | 'rejected';
  riskScore: number;
  documents: { type: string; status: 'verified' | 'pending' | 'rejected' }[];
}

export interface Case {
  id: string;
  title: string;
  status: 'open' | 'investigating' | 'closed';
  assignee: string;
  notes: { author: string; text: string; timestamp: string }[];
}

export interface SarDraft {
  id: string;
  subject: string;
  type: string;
  summary: string;
  status: 'pending' | 'approved' | 'rejected';
  author: string;
}

export interface AdverseMediaItem {
  id: string;
  entity: string;
  headline: string;
  source: string;
  date: string;
  severity: 'critical' | 'high' | 'medium';
  status: 'unreviewed' | 'reviewed' | 'escalated';
}

interface AppState {
  alerts: Alert[];
  chatMessages: ChatMessage[];
  sarSubject: string;
  sarType: string;
  sarSummary: string;
  adverseMedia: AdverseMediaItem[];

  addChatMessage: (msg: string) => void;
  updateAlertStatus: (id: number, status: string) => void;
  setSarSubject: (val: string) => void;
  setSarType: (val: string) => void;
  generateSarDraft: () => void;
  resolveAdverseMedia: (id: string, status: 'reviewed' | 'escalated') => void;

  kycProfiles: KycProfile[];
  cases: Case[];
  sarDrafts: SarDraft[];
  updateKycStatus: (id: string, status: 'pending' | 'verified' | 'rejected') => void;
  addCaseNote: (caseId: string, note: string) => void;
  updateSarStatus: (id: string, status: 'approved' | 'rejected') => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  alerts: [
    { id: 1, type: "Structuring — Acct #CA-4471", detail: "$49,800 × 3 txns · Royal Trust · 2h ago", score: 97, riskLevel: "critical", status: "NEW" },
    { id: 2, type: "Network Anomaly — 6-Node Ring", detail: "Shell co. cluster detected · Toronto", score: 92, riskLevel: "critical", status: "REVIEWING" },
    { id: 3, type: "PEP Match — Unverified Source", detail: "Cross-border wire · origin unclear", score: 74, riskLevel: "high", status: "INVESTIGATING" },
    { id: 4, type: "Rapid Movement — Corporate Account", detail: "Funds in/out same day · $180K total", score: 68, riskLevel: "medium", status: "INVESTIGATING" },
    { id: 5, type: "Sanctions Match — Partial Name", detail: "87% match · OFAC screening · pending review", score: 91, riskLevel: "critical", status: "NEW" },
    { id: 6, type: "Unusual Pattern — Business Account", detail: "Weekend activity spike · normally dormant", score: 62, riskLevel: "medium", status: "REVIEWING" },
  ],

  chatMessages: [
    { type: "bot", text: "Alert #AML-2026-0471 shows a structuring pattern. The account has made 3 transactions of $49,800 each over 48 hours — just under the $50K reporting threshold." },
    { type: "user", text: "What's the account history?" },
    { type: "bot", text: "Account #CA-4471 opened 6 months ago. First 4 months dormant. Sudden activity spike in last 60 days — total inflow CA$380K." },
    { type: "user", text: "Draft a SAR" },
  ],

  sarSubject: "",
  sarType: "Structuring / Smurfing",
  sarSummary: "",

  adverseMedia: [
    { id: "AM-001", entity: "Global Trade Corp", headline: "Global Trade Corp executives face money laundering probe in EU", source: "Financial Times", date: "2026-05-22", severity: "critical", status: "unreviewed" },
    { id: "AM-002", entity: "Viktor Sokolov", headline: "Russian oligarch Sokolov linked to sanctions-evasion network", source: "Reuters", date: "2026-05-21", severity: "critical", status: "unreviewed" },
    { id: "AM-003", entity: "Blue Horizon Finance", headline: "Blue Horizon Finance under scrutiny for offshore shell structures", source: "Globe and Mail", date: "2026-05-20", severity: "high", status: "unreviewed" },
    { id: "AM-004", entity: "Meridian Holdings Ltd", headline: "Meridian Holdings discloses undisclosed beneficial owner in annual filing", source: "Bloomberg", date: "2026-05-19", severity: "medium", status: "reviewed" },
  ],

  kycProfiles: [
    { id: "KYC-001", name: "Global Trade Corp", type: "business", status: "pending", riskScore: 85, documents: [{ type: "Certificate of Incorporation", status: "verified" }, { type: "UBO Declaration", status: "pending" }] },
    { id: "KYC-002", name: "Maria Gonzalez", type: "individual", status: "verified", riskScore: 12, documents: [{ type: "Passport", status: "verified" }, { type: "Proof of Address", status: "verified" }] },
  ],

  cases: [
    { id: "CASE-992", title: "Suspected Structuring - CA-4471", status: "investigating", assignee: "Marie Chen", notes: [{ author: "System", text: "Case automatically created from Alert #1", timestamp: new Date().toISOString() }] },
  ],

  sarDrafts: [
    { id: "SAR-104", subject: "Account #CA-4471", type: "Structuring / Smurfing", summary: "Based on the activity associated with Account #CA-4471, we have identified patterns consistent with Structuring / Smurfing. The transaction history exhibits significant anomalies deviating from typical client profiles. This report has been drafted for FINTRAC compliance review.", status: "pending", author: "Marie Chen" },
    { id: "SAR-105", subject: "Global Trade Corp", type: "PEP / Sanctions Match", summary: "Cross-border wire flags potential match with OFAC sanctioned entities. 87% name similarity detected.", status: "pending", author: "Marie Chen" },
  ],

  addChatMessage: (msg: string) => {
    set((state) => ({ chatMessages: [...state.chatMessages, { type: 'user', text: msg }] }));
    setTimeout(() => {
      set((state) => ({
        chatMessages: [...state.chatMessages, { type: 'bot', text: `I have analyzed your request regarding "${msg}". Our records indicate this requires further investigation by a senior compliance officer.` }]
      }));
    }, 1000);
  },

  updateAlertStatus: (id: number, status: string) => {
    set((state) => ({
      alerts: state.alerts.map(a => a.id === id ? { ...a, status } : a)
    }));
  },

  setSarSubject: (val: string) => set({ sarSubject: val }),
  setSarType: (val: string) => set({ sarType: val }),

  generateSarDraft: () => {
    const { sarSubject, sarType } = get();
    const newSar: SarDraft = {
      id: `SAR-${Math.floor(Math.random() * 1000)}`,
      subject: sarSubject || 'Unknown Entity',
      type: sarType,
      summary: `Based on the activity associated with ${sarSubject || 'the selected entity'}, we have identified patterns consistent with ${sarType}. The transaction history exhibits significant anomalies deviating from typical client profiles. This report has been drafted for FINTRAC compliance review.`,
      status: 'pending',
      author: 'Marie Chen'
    };
    set((state) => ({
      sarSummary: newSar.summary,
      sarDrafts: [newSar, ...state.sarDrafts]
    }));
  },

  resolveAdverseMedia: (id: string, status: 'reviewed' | 'escalated') => {
    set((state) => ({
      adverseMedia: state.adverseMedia.map(a => a.id === id ? { ...a, status } : a)
    }));
  },

  updateKycStatus: (id: string, status: 'pending' | 'verified' | 'rejected') => {
    set((state) => ({
      kycProfiles: state.kycProfiles.map(p => p.id === id ? { ...p, status } : p)
    }));
  },

  addCaseNote: (caseId: string, note: string) => {
    set((state) => ({
      cases: state.cases.map(c => c.id === caseId ? { ...c, notes: [...c.notes, { author: "Marie Chen", text: note, timestamp: new Date().toISOString() }] } : c)
    }));
  },

  updateSarStatus: (id: string, status: 'approved' | 'rejected') => {
    set((state) => ({
      sarDrafts: state.sarDrafts.map(s => s.id === id ? { ...s, status } : s)
    }));
  }
}));
