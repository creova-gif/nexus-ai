import { useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { FileText, AlertTriangle, Users, CheckCircle, Send, Clock, Shield, AlertCircleIcon } from "lucide-react";

export default function ComplianceDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const kpis = [
    {
      label: "Active High Risk",
      value: "7",
      highlight: true,
      sub: "↑ 2 from yesterday",
      badge: "↑ CRITICAL",
      badgeClass: "bg-[rgba(248,113,113,.12)] text-[var(--coral)]",
      color: "var(--coral)",
      subColor: "var(--coral)",
    },
    {
      label: "Alerts Today",
      value: "24",
      highlight: true,
      sub: "9 unreviewed",
      badge: "↑ 12%",
      badgeClass: "bg-[var(--amber-glow)] text-[var(--amber)]",
      color: "var(--amber)",
      subColor: "var(--amber)",
    },
    {
      label: "SARs Filed",
      value: "12",
      highlight: true,
      sub: "This month · FINTRAC",
      badge: "✓ OK",
      badgeClass: "bg-[var(--brand-glow)] text-[var(--brand-hi)]",
      color: "var(--brand-hi)",
    },
    {
      label: "Cases Resolved",
      value: "94%",
      highlight: false,
      sub: "↑ 6% vs last month",
      badge: "↑ UP",
      badgeClass: "bg-[var(--teal-glow)] text-[var(--teal)]",
      color: "var(--teal)",
      subColor: "var(--teal)",
    },
    {
      label: "Txn Volume",
      value: "CA$2.4M",
      highlight: true,
      sub: "Last 24 hours",
      badge: "↑ 12%",
      badgeClass: "bg-[var(--teal-glow)] text-[var(--teal)]",
      color: "var(--sky)",
    },
  ];

  const alerts = [
    {
      id: 1,
      type: "Structuring — Acct #CA-4471",
      detail: "$49,800 × 3 txns · Royal Trust · 2h ago",
      score: 97,
      riskLevel: "critical",
      status: "NEW",
    },
    {
      id: 2,
      type: "Network Anomaly — 6-Node Ring",
      detail: "Shell co. cluster detected · Toronto",
      score: 92,
      riskLevel: "critical",
      status: "REVIEWING",
    },
    {
      id: 3,
      type: "PEP Match — Unverified Source",
      detail: "Cross-border wire · origin unclear",
      score: 74,
      riskLevel: "high",
      status: "INVESTIGATING",
    },
    {
      id: 4,
      type: "Rapid Movement — Corporate Account",
      detail: "Funds in/out same day · $180K total",
      score: 68,
      riskLevel: "medium",
      status: "INVESTIGATING",
    },
    {
      id: 5,
      type: "Sanctions Match — Partial Name",
      detail: "87% match · OFAC screening · pending review",
      score: 91,
      riskLevel: "critical",
      status: "NEW",
    },
    {
      id: 6,
      type: "Unusual Pattern — Business Account",
      detail: "Weekend activity spike · normally dormant",
      score: 62,
      riskLevel: "medium",
      status: "REVIEWING",
    },
  ];

  const getScoreColor = (score: number) => {
    if (score >= 90) return { bg: "rgba(248,113,113,.12)", text: "var(--coral)" };
    if (score >= 75) return { bg: "rgba(251,191,36,.12)", text: "var(--amber)" };
    if (score >= 60) return { bg: "var(--brand-glow)", text: "var(--brand-hi)" };
    return { bg: "var(--teal-glow)", text: "var(--teal)" };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "NEW":
        return "bg-[rgba(248,113,113,.12)] text-[var(--coral)] border-[0.5px] border-[rgba(248,113,113,.22)]";
      case "REVIEWING":
        return "bg-[var(--amber-glow)] text-[var(--amber)] border-[0.5px] border-[var(--amber-b)]";
      case "INVESTIGATING":
        return "bg-[var(--brand-glow)] text-[var(--brand-hi)] border-[0.5px] border-[var(--border-purple)]";
      case "CLOSED":
        return "bg-[var(--teal-glow)] text-[var(--teal)] border-[0.5px] border-[var(--teal-b)]";
      default:
        return "";
    }
  };

  const timelineItems = [
    { icon: AlertTriangle, title: "High-risk alert triggered", meta: "Alert #AML-2026-0471", time: "2h ago", color: "var(--coral)" },
    { icon: FileText, title: "Investigation case opened", meta: "Case #INV-0092 · Officer M. Chen", time: "1.5h ago", color: "var(--brand-hi)" },
    { icon: Users, title: "Network graph analyzed", meta: "6-node shell company cluster detected", time: "45m ago", color: "var(--amber)" },
    { icon: CheckCircle, title: "SAR draft generated (AI)", meta: "FINTRAC format · awaiting officer review", time: "12m ago", color: "var(--teal)" },
  ];

  const chatMessages = [
    { type: "bot", text: "Alert #AML-2026-0471 shows a structuring pattern. The account has made 3 transactions of $49,800 each over 48 hours — just under the $50K reporting threshold." },
    { type: "user", text: "What's the account history?" },
    { type: "bot", text: "Account #CA-4471 opened 6 months ago. First 4 months dormant. Sudden activity spike in last 60 days — total inflow CA$380K." },
    { type: "user", text: "Draft a SAR" },
  ];

  const regulatoryStatus = [
    { name: "FINTRAC", status: "COMPLIANT", color: "var(--teal)" },
    { name: "OSFI", status: "AUDIT READY", color: "var(--brand-hi)" },
    { name: "CDBA Phase 1", status: "ACTIVE", color: "var(--teal)" },
    { name: "PCMLTFA", status: "COMPLIANT", color: "var(--teal)" },
  ];

  const todayActions = [
    { label: "Alerts Reviewed", value: "18", icon: AlertTriangle },
    { label: "SARs Drafted", value: "4", icon: FileText },
    { label: "Cases Closed", value: "7", icon: CheckCircle },
    { label: "Auto-Resolved", value: "31", icon: Shield },
  ];

  const generateHeatmapCells = () => {
    const cells = [];
    for (let i = 0; i < 144; i++) {
      const intensity = Math.floor(Math.random() * 6);
      cells.push(
        <div
          key={i}
          className={`aspect-square rounded cursor-default transition-transform hover:scale-125 hover:z-10 relative hm-${intensity}`}
          title={`Activity level: ${intensity}`}
        />
      );
    }
    return cells;
  };

  return (
    <DashboardLayout
      pageTitle="Compliance Overview"
      breadcrumb="Compliance Dashboard"
      role="COMPLIANCE OFFICER"
      userName="Marie Chen"
      userInitials="MC"
      userRole="Sr. Compliance Officer"
    >
      {/* TAB NAVIGATION */}
      <div className="flex gap-2 mb-4 border-b-[0.5px] border-[var(--border)] pb-2">
        {["overview", "alerts", "network", "kyc", "sanctions", "sar"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-t-md transition-all ${
              activeTab === tab
                ? "bg-[var(--brand-glow)] text-[var(--brand-hi)] border-[var(--border-purple)]"
                : "text-[var(--text-purple-2)] hover:text-[var(--text-purple)] hover:bg-[var(--glass)]"
            }`}
            style={{ fontFamily: "'Geist Mono', monospace" }}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <>
      {/* KPI STRIP */}
      <div className="grid grid-cols-5 gap-3 mb-4">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="glass-2 border-[0.5px] border-[var(--border)] rounded-xl p-4 relative overflow-hidden transition-all hover:border-[var(--border2)] hover:-translate-y-0.5"
            style={{ "--kc": kpi.color } as any}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[1.5px] opacity-55"
              style={{
                background: `linear-gradient(90deg, transparent, ${kpi.color}, transparent)`,
              }}
            />
            <div
              className="absolute bottom-[-30px] right-[-30px] w-20 h-20 rounded-full opacity-[0.06] pointer-events-none"
              style={{
                background: `radial-gradient(circle, ${kpi.color}, transparent 70%)`,
              }}
            />
            <div className="font-['Geist_Mono'] text-[0.6rem] font-bold tracking-widest uppercase text-[var(--text-purple-3)] mb-2">
              {kpi.label}
            </div>
            <div className="font-['Instrument_Serif'] text-[1.7rem] text-white leading-none mb-1">
              {kpi.highlight ? <em className="not-italic" style={{ color: kpi.color }}>{kpi.value}</em> : kpi.value}
            </div>
            <div className="text-[0.65rem] text-[var(--text-purple-3)] flex items-center gap-1.5">
              <span style={{ color: kpi.subColor }}>{kpi.sub}</span>
            </div>
            <span className={`absolute top-2.5 right-3 px-2 py-0.5 rounded-full text-[0.58rem] font-bold font-['Geist_Mono'] ${kpi.badgeClass}`}>
              {kpi.badge}
            </span>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT ROW */}
      <div className="grid grid-cols-[1.4fr_200px] gap-4 mb-4">
        {/* ALERT VOLUME HEATMAP */}
        <Card className="glass-2 border-[0.5px] border-[var(--border)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,.06)] to-transparent pointer-events-none" />
          <div className="flex items-center justify-between px-4 py-3 border-b-[0.5px] border-[var(--border)]">
            <div className="font-['Geist_Mono'] text-[0.72rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--brand-hi)]" />
              Alert Volume Heatmap — 12 Months
            </div>
            <span className="px-2 py-0.5 bg-[var(--brand-glow)] text-[var(--brand-hi)] rounded-full text-[0.6rem] font-bold font-['Geist_Mono']">
              BY RISK LEVEL
            </span>
          </div>
          <div className="px-4 py-3.5">
            <div className="grid grid-cols-12 gap-[3px]">
              {generateHeatmapCells()}
            </div>
            <div className="flex items-center gap-2 mt-2.5 text-[0.62rem] text-[var(--text-purple-3)]">
              <span>Low</span>
              <div className="flex gap-[3px]">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-sm hm-${i}`} />
                ))}
              </div>
              <span>High</span>
              <span className="ml-auto">Powered by graph intelligence · PCMLTFA compliant</span>
            </div>
          </div>
        </Card>

        {/* PLATFORM RISK SCORE */}
        <Card className="glass-2 border-[0.5px] border-[var(--border)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,.06)] to-transparent pointer-events-none" />
          <div className="flex items-center justify-between px-4 py-3 border-b-[0.5px] border-[var(--border)]">
            <div className="font-['Geist_Mono'] text-[0.72rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)] flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-[var(--coral)]" />
              Platform Risk
            </div>
          </div>
          <div className="px-4 py-3.5 flex flex-col items-center gap-3">
            <div className="relative">
              <svg width="90" height="90" viewBox="0 0 90 90" className="-rotate-90">
                <circle cx="45" cy="45" r="35" stroke="var(--glass3)" strokeWidth="8" fill="none" />
                <circle
                  cx="45"
                  cy="45"
                  r="35"
                  stroke="var(--coral)"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray="219.9"
                  strokeDashoffset="55"
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="font-['Instrument_Serif'] text-2xl leading-none text-[var(--coral)]">75</div>
                <div className="font-['Geist_Mono'] text-[0.58rem] text-[var(--text-purple-3)] tracking-wider mt-0.5">
                  RISK
                </div>
              </div>
            </div>
            <div className="w-full space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-purple-2)] w-12 flex-shrink-0">AML</span>
                <div className="flex-1 h-1.5 bg-[var(--glass3)] rounded overflow-hidden">
                  <div className="h-full rounded bg-[var(--coral)] w-[82%] transition-all duration-500" />
                </div>
                <span className="text-xs text-[var(--coral)] font-['Geist_Mono'] font-bold w-6 text-right">82</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-purple-2)] w-12 flex-shrink-0">Fraud</span>
                <div className="flex-1 h-1.5 bg-[var(--glass3)] rounded overflow-hidden">
                  <div className="h-full rounded bg-[var(--amber)] w-[64%] transition-all duration-500" />
                </div>
                <span className="text-xs text-[var(--amber)] font-['Geist_Mono'] font-bold w-6 text-right">64</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-[var(--text-purple-2)] w-12 flex-shrink-0">KYC</span>
                <div className="flex-1 h-1.5 bg-[var(--glass3)] rounded overflow-hidden">
                  <div className="h-full rounded bg-[var(--brand-hi)] w-[58%] transition-all duration-500" />
                </div>
                <span className="text-xs text-[var(--brand-hi)] font-['Geist_Mono'] font-bold w-6 text-right">58</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* SECOND ROW - Timeline, Chat, Status Panels */}
      <div className="grid grid-cols-[1.4fr_1fr] gap-4 mb-4">
        {/* INVESTIGATION TIMELINE */}
        <Card className="glass-2 border-[0.5px] border-[var(--border)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,.06)] to-transparent pointer-events-none" />
          <div className="flex items-center justify-between px-4 py-3 border-b-[0.5px] border-[var(--border)]">
            <div className="font-['Geist_Mono'] text-[0.72rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)] flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" />
              Investigation Timeline
            </div>
            <span className="px-2 py-0.5 bg-[var(--brand-glow)] text-[var(--brand-hi)] rounded-full text-[0.6rem] font-bold font-['Geist_Mono']">
              LIVE
            </span>
          </div>
          <div className="px-4 py-3 space-y-3">
            {timelineItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={idx} className="flex gap-3 relative">
                  {idx < timelineItems.length - 1 && (
                    <div className="absolute left-[13px] top-[30px] bottom-[-12px] w-[1px] border-l border-dashed border-[var(--border)]" />
                  )}
                  <div className="w-7 h-7 rounded-md flex items-center justify-center flex-shrink-0 border-[0.5px]" style={{ background: `${item.color}15`, borderColor: `${item.color}30` }}>
                    <Icon className="w-3.5 h-3.5" style={{ color: item.color }} />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium text-[var(--text-purple)]">{item.title}</div>
                    <div className="text-xs text-[var(--text-purple-3)]">{item.meta}</div>
                    <div className="text-xs text-[var(--text-purple-3)] mt-0.5" style={{ fontFamily: "'Geist Mono', monospace" }}>{item.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* RIGHT COLUMN - AI Chat + Status */}
        <div className="space-y-4">
          {/* AI CHAT ASSISTANT */}
          <Card className="glass-2 border-[0.5px] border-[var(--border)] relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,.06)] to-transparent pointer-events-none" />
            <div className="flex items-center justify-between px-4 py-3 border-b-[0.5px] border-[var(--border)]">
              <div className="font-['Geist_Mono'] text-[0.72rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)]">
                AI Assistant
              </div>
            </div>
            <div className="px-4 py-3 space-y-2 max-h-[180px] overflow-y-auto">
              {chatMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === "user" ? "justify-end" : ""}`}>
                  <div className={`px-3 py-2 rounded-lg text-xs max-w-[85%] ${
                    msg.type === "user"
                      ? "bg-[var(--brand-glow)] text-[var(--text-purple)] border-[0.5px] border-[var(--border-purple)]"
                      : "bg-[var(--glass2)] text-[var(--text-purple-2)] border-[0.5px] border-[var(--border)]"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-3 border-t-[0.5px] border-[var(--border)] flex gap-2">
              <input
                type="text"
                placeholder="Ask about this case..."
                className="flex-1 px-3 py-2 text-xs bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-md text-[var(--text-purple)] placeholder:text-[var(--text-purple-3)] outline-none focus:border-[var(--border-purple)]"
              />
              <Button size="sm" className="px-3 py-2 h-auto gradient-purple text-white">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </div>
          </Card>

          {/* REGULATORY STATUS + TODAY'S ACTIONS */}
          <div className="grid grid-cols-2 gap-3">
            {/* Regulatory Status */}
            <Card className="glass-2 border-[0.5px] border-[var(--border)] p-3">
              <div className="font-['Geist_Mono'] text-[0.65rem] font-bold tracking-wider uppercase text-[var(--text-purple-3)] mb-3">
                Regulatory Status
              </div>
              <div className="space-y-2">
                {regulatoryStatus.map((reg, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span className="text-xs text-[var(--text-purple-2)]">{reg.name}</span>
                    <span className="px-2 py-0.5 rounded-full text-[0.58rem] font-bold" style={{ background: `${reg.color}15`, color: reg.color }}>
                      {reg.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Today's Actions */}
            <Card className="glass-2 border-[0.5px] border-[var(--border)] p-3">
              <div className="font-['Geist_Mono'] text-[0.65rem] font-bold tracking-wider uppercase text-[var(--text-purple-3)] mb-3">
                Today's Actions
              </div>
              <div className="grid grid-cols-2 gap-2">
                {todayActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <div key={idx} className="text-center">
                      <div className="text-lg font-bold" style={{ fontFamily: "'Instrument Serif', serif", color: "var(--brand-hi)" }}>
                        {action.value}
                      </div>
                      <div className="text-[0.6rem] text-[var(--text-purple-3)]">{action.label}</div>
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* ALERT QUEUE TABLE */}
      <Card className="glass-2 border-[0.5px] border-[var(--border)] relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,.06)] to-transparent pointer-events-none" />
        <div className="flex items-center justify-between px-4 py-3 border-b-[0.5px] border-[var(--border)]">
          <div className="font-['Geist_Mono'] text-[0.72rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[var(--coral)]" />
            Live Alert Queue
          </div>
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-[rgba(248,113,113,.12)] text-[var(--coral)] rounded-full text-[0.65rem] font-bold font-['Geist_Mono']">
              3 HIGH
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-[var(--bg3)]">
                <th className="px-3 py-2 text-left font-['Geist_Mono'] text-[0.6rem] font-bold tracking-wider uppercase text-[var(--text-purple-3)] border-b-[0.5px] border-[var(--border)] whitespace-nowrap">
                  Alert Type
                </th>
                <th className="px-3 py-2 text-left font-['Geist_Mono'] text-[0.6rem] font-bold tracking-wider uppercase text-[var(--text-purple-3)] border-b-[0.5px] border-[var(--border)]">
                  Details
                </th>
                <th className="px-3 py-2 text-center font-['Geist_Mono'] text-[0.6rem] font-bold tracking-wider uppercase text-[var(--text-purple-3)] border-b-[0.5px] border-[var(--border)]">
                  Risk
                </th>
                <th className="px-3 py-2 text-center font-['Geist_Mono'] text-[0.6rem] font-bold tracking-wider uppercase text-[var(--text-purple-3)] border-b-[0.5px] border-[var(--border)]">
                  Status
                </th>
                <th className="px-3 py-2 text-right font-['Geist_Mono'] text-[0.6rem] font-bold tracking-wider uppercase text-[var(--text-purple-3)] border-b-[0.5px] border-[var(--border)]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {alerts.map((alert) => {
                const scoreColors = getScoreColor(alert.score);
                return (
                  <tr key={alert.id} className="hover:bg-[var(--glass)] transition-colors">
                    <td className="px-3 py-2.5 border-b-[0.5px] border-[var(--border)] text-[var(--text-purple)]">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0 relative"
                          style={{ background: scoreColors.text }}
                        >
                          <div
                            className="absolute inset-[-3px] rounded-full border opacity-25"
                            style={{ borderColor: scoreColors.text }}
                          />
                        </div>
                        <span className="font-medium">{alert.type}</span>
                      </div>
                    </td>
                    <td className="px-3 py-2.5 border-b-[0.5px] border-[var(--border)] text-[var(--text-purple-2)] text-[0.72rem]">
                      {alert.detail}
                    </td>
                    <td className="px-3 py-2.5 border-b-[0.5px] border-[var(--border)] text-center">
                      <span
                        className="inline-flex items-center justify-center w-9 h-5 rounded-md font-['Geist_Mono'] text-[0.68rem] font-bold"
                        style={{ background: scoreColors.bg, color: scoreColors.text }}
                      >
                        {alert.score}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 border-b-[0.5px] border-[var(--border)] text-center">
                      <span className={`px-2.5 py-1 rounded-full text-[0.62rem] font-bold tracking-wide font-['Geist_Mono'] ${getStatusColor(alert.status)}`}>
                        {alert.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 border-b-[0.5px] border-[var(--border)] text-right">
                      <div className="flex gap-1.5 justify-end">
                        <Button
                          size="sm"
                          variant="outline"
                          className="px-2.5 py-1 h-auto text-[0.65rem] font-semibold rounded-md glass border-[var(--border)] hover:border-[var(--border2)] text-[var(--text-purple-2)] hover:text-[var(--text-purple)]"
                        >
                          Review
                        </Button>
                        <Button
                          size="sm"
                          className="px-2.5 py-1 h-auto text-[0.65rem] font-semibold rounded-md gradient-purple text-white border-none hover:opacity-90"
                        >
                          Investigate
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

        </>
      )}

      {/* ALERTS TAB */}
      {activeTab === "alerts" && (
        <Card className="glass-2 border-[0.5px] border-[var(--border)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,.06)] to-transparent pointer-events-none" />
          <div className="px-4 py-3 border-b-[0.5px] border-[var(--border)]">
            <div className="font-['Geist_Mono'] text-[0.72rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)]">
              AML Alerts — Full Table View
            </div>
          </div>
          <div className="p-4">
            <div className="text-sm text-[var(--text-purple-2)]">
              Complete alerts table with 9 columns: Alert ID, Type, Entity/Account, Amount, Country, Risk Score, XAI Reason, Status, Actions
            </div>
            <div className="mt-4 p-8 rounded-lg border-[0.5px] border-dashed border-[var(--border)] text-center">
              <AlertCircleIcon className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: "var(--text-purple-3)" }} />
              <div className="text-sm text-[var(--text-purple-3)]">Alerts table view — Ready for implementation</div>
            </div>
          </div>
        </Card>
      )}

      {/* NETWORK GRAPH TAB */}
      {activeTab === "network" && (
        <Card className="glass-2 border-[0.5px] border-[var(--border)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,.06)] to-transparent pointer-events-none" />
          <div className="px-4 py-3 border-b-[0.5px] border-[var(--border)]">
            <div className="font-['Geist_Mono'] text-[0.72rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)]">
              Transaction Network Graph
            </div>
          </div>
          <div className="p-4">
            <div className="text-sm text-[var(--text-purple-2)] mb-4">
              SVG-based entity relationship visualization showing shell company rings and suspicious transaction patterns
            </div>
            <div className="p-8 rounded-lg border-[0.5px] border-dashed border-[var(--border)] text-center bg-[var(--glass)]">
              <svg className="w-full h-64 opacity-50" viewBox="0 0 400 200">
                <circle cx="200" cy="100" r="20" fill="var(--coral)" opacity="0.3" />
                <circle cx="150" cy="60" r="15" fill="var(--amber)" opacity="0.3" />
                <circle cx="250" cy="60" r="15" fill="var(--amber)" opacity="0.3" />
                <circle cx="120" cy="140" r="15" fill="var(--brand-hi)" opacity="0.3" />
                <circle cx="280" cy="140" r="15" fill="var(--brand-hi)" opacity="0.3" />
                <circle cx="180" cy="180" r="12" fill="var(--teal)" opacity="0.3" />
                <line x1="200" y1="100" x2="150" y2="60" stroke="var(--coral)" strokeWidth="1" opacity="0.4" />
                <line x1="200" y1="100" x2="250" y2="60" stroke="var(--coral)" strokeWidth="1" opacity="0.4" />
                <line x1="200" y1="100" x2="120" y2="140" stroke="var(--amber)" strokeWidth="1" opacity="0.4" />
                <line x1="200" y1="100" x2="280" y2="140" stroke="var(--amber)" strokeWidth="1" opacity="0.4" />
              </svg>
              <div className="text-sm text-[var(--text-purple-3)] mt-4">Network graph visualization — Ready for implementation</div>
            </div>
          </div>
        </Card>
      )}

      {/* KYC TAB */}
      {activeTab === "kyc" && (
        <Card className="glass-2 border-[0.5px] border-[var(--border)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,.06)] to-transparent pointer-events-none" />
          <div className="px-4 py-3 border-b-[0.5px] border-[var(--border)]">
            <div className="font-['Geist_Mono'] text-[0.72rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)]">
              Perpetual KYC — Customer Due Diligence
            </div>
          </div>
          <div className="p-4">
            <div className="text-sm text-[var(--text-purple-2)]">
              Continuous KYC monitoring with risk meters, document verification status, and automated refresh triggers
            </div>
            <div className="mt-4 p-8 rounded-lg border-[0.5px] border-dashed border-[var(--border)] text-center">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: "var(--text-purple-3)" }} />
              <div className="text-sm text-[var(--text-purple-3)]">KYC table and risk meters — Ready for implementation</div>
            </div>
          </div>
        </Card>
      )}

      {/* SANCTIONS TAB */}
      {activeTab === "sanctions" && (
        <Card className="glass-2 border-[0.5px] border-[var(--border)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,.06)] to-transparent pointer-events-none" />
          <div className="px-4 py-3 border-b-[0.5px] border-[var(--border)]">
            <div className="font-['Geist_Mono'] text-[0.72rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)]">
              Sanctions Screening
            </div>
          </div>
          <div className="p-4">
            <div className="text-sm text-[var(--text-purple-2)]">
              OFAC, UN, EU sanctions list screening with fuzzy matching and continuous monitoring
            </div>
            <div className="mt-4 p-8 rounded-lg border-[0.5px] border-dashed border-[var(--border)] text-center">
              <Shield className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: "var(--text-purple-3)" }} />
              <div className="text-sm text-[var(--text-purple-3)]">Sanctions screening list — Ready for implementation</div>
            </div>
          </div>
        </Card>
      )}

      {/* SAR GENERATOR TAB */}
      {activeTab === "sar" && (
        <Card className="glass-2 border-[0.5px] border-[var(--border)] relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[rgba(255,255,255,.06)] to-transparent pointer-events-none" />
          <div className="px-4 py-3 border-b-[0.5px] border-[var(--border)]">
            <div className="font-['Geist_Mono'] text-[0.72rem] font-bold tracking-wider uppercase text-[var(--text-purple-2)]">
              SAR Generator — FINTRAC Reporting
            </div>
          </div>
          <div className="p-4">
            <div className="text-sm text-[var(--text-purple-2)] mb-4">
              AI-drafted Suspicious Activity Reports with officer review workflow and direct FINTRAC submission
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-purple-2)] mb-2">Subject Entity</label>
                <input type="text" placeholder="Account #CA-4471" className="w-full px-3 py-2 text-sm bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-md text-[var(--text-purple)] outline-none focus:border-[var(--border-purple)]" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-purple-2)] mb-2">Suspicious Activity Type</label>
                <select className="w-full px-3 py-2 text-sm bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-md text-[var(--text-purple)] outline-none focus:border-[var(--border-purple)]">
                  <option>Structuring / Smurfing</option>
                  <option>Unusual Transaction Pattern</option>
                  <option>Network Anomaly</option>
                  <option>PEP / Sanctions Match</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[var(--text-purple-2)] mb-2">AI-Generated Summary</label>
                <textarea rows={4} className="w-full px-3 py-2 text-sm bg-[var(--glass)] border-[0.5px] border-[var(--border)] rounded-md text-[var(--text-purple)] outline-none focus:border-[var(--border-purple)]" placeholder="The AI will generate a FINTRAC-ready SAR summary based on the alert details..." />
              </div>
              <div className="flex gap-3">
                <Button className="flex-1 gradient-purple text-white">Generate SAR Draft</Button>
                <Button variant="outline" className="flex-1 glass border-[var(--border)] text-[var(--text-purple-2)]">Review & Submit</Button>
              </div>
            </div>
          </div>
        </Card>
      )}

      <style>{`
        .hm-0 { background: var(--glass2); }
        .hm-1 { background: rgba(139,92,246,.2); }
        .hm-2 { background: rgba(139,92,246,.4); }
        .hm-3 { background: rgba(139,92,246,.65); }
        .hm-4 { background: rgba(139,92,246,.85); }
        .hm-5 { background: var(--brand-hi); }
      `}</style>
    </DashboardLayout>
  );
}
