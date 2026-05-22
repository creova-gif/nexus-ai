import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, boolean, json } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extended with NexusAI-specific roles and fields.
 */
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["bank_admin", "compliance_officer", "financial_advisor", "retail_customer"]).default("retail_customer").notNull(),
  bankId: int("bankId"),
  department: varchar("department", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Transactions table for AML and fraud detection
 */
export const transactions = mysqlTable("transactions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  amount: decimal("amount", { precision: 15, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("CAD").notNull(),
  transactionType: varchar("transactionType", { length: 50 }).notNull(),
  status: mysqlEnum("status", ["pending", "completed", "failed", "flagged"]).default("completed").notNull(),
  description: text("description"),
  counterparty: varchar("counterparty", { length: 255 }),
  riskScore: decimal("riskScore", { precision: 5, scale: 2 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = typeof transactions.$inferInsert;

/**
 * AML alerts for compliance monitoring
 */
export const amlAlerts = mysqlTable("aml_alerts", {
  id: int("id").autoincrement().primaryKey(),
  transactionId: int("transactionId").notNull(),
  userId: int("userId").notNull(),
  alertType: varchar("alertType", { length: 100 }).notNull(),
  riskScore: decimal("riskScore", { precision: 5, scale: 2 }).notNull(),
  status: mysqlEnum("status", ["new", "investigating", "resolved", "escalated"]).default("new").notNull(),
  description: text("description"),
  assignedTo: int("assignedTo"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AMLAlert = typeof amlAlerts.$inferSelect;
export type InsertAMLAlert = typeof amlAlerts.$inferInsert;

/**
 * Alert investigations for compliance officers
 */
export const alertInvestigations = mysqlTable("alert_investigations", {
  id: int("id").autoincrement().primaryKey(),
  alertId: int("alertId").notNull(),
  investigatorId: int("investigatorId").notNull(),
  notes: text("notes"),
  findings: text("findings"),
  status: mysqlEnum("status", ["open", "in_progress", "closed", "escalated"]).default("open").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AlertInvestigation = typeof alertInvestigations.$inferSelect;
export type InsertAlertInvestigation = typeof alertInvestigations.$inferInsert;

/**
 * Suspicious Activity Reports (SARs)
 */
export const suspiciousActivityReports = mysqlTable("suspicious_activity_reports", {
  id: int("id").autoincrement().primaryKey(),
  alertId: int("alertId").notNull(),
  investigationId: int("investigationId").notNull(),
  reportNumber: varchar("reportNumber", { length: 50 }).unique(),
  content: text("content"),
  status: mysqlEnum("status", ["draft", "submitted", "acknowledged", "closed"]).default("draft").notNull(),
  submittedAt: timestamp("submittedAt"),
  submittedBy: int("submittedBy"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SuspiciousActivityReport = typeof suspiciousActivityReports.$inferSelect;
export type InsertSuspiciousActivityReport = typeof suspiciousActivityReports.$inferInsert;

/**
 * Customer profiles for financial advisory
 */
export const customerProfiles = mysqlTable("customer_profiles", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull().unique(),
  riskProfile: mysqlEnum("riskProfile", ["conservative", "moderate", "aggressive"]),
  investmentExperience: varchar("investmentExperience", { length: 50 }),
  annualIncome: decimal("annualIncome", { precision: 15, scale: 2 }),
  netWorth: decimal("netWorth", { precision: 15, scale: 2 }),
  preferences: json("preferences"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type CustomerProfile = typeof customerProfiles.$inferSelect;
export type InsertCustomerProfile = typeof customerProfiles.$inferInsert;

/**
 * Spending insights generated by AI
 */
export const spendingInsights = mysqlTable("spending_insights", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  category: varchar("category", { length: 100 }).notNull(),
  totalSpent: decimal("totalSpent", { precision: 15, scale: 2 }),
  averageTransaction: decimal("averageTransaction", { precision: 15, scale: 2 }),
  trend: mysqlEnum("trend", ["increasing", "stable", "decreasing"]),
  insight: text("insight"),
  recommendation: text("recommendation"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SpendingInsight = typeof spendingInsights.$inferSelect;
export type InsertSpendingInsight = typeof spendingInsights.$inferInsert;

/**
 * Financial goals for customers
 */
export const financialGoals = mysqlTable("financial_goals", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  goalName: varchar("goalName", { length: 255 }).notNull(),
  goalType: varchar("goalType", { length: 100 }).notNull(),
  targetAmount: decimal("targetAmount", { precision: 15, scale: 2 }).notNull(),
  currentAmount: decimal("currentAmount", { precision: 15, scale: 2 }).default("0"),
  targetDate: timestamp("targetDate"),
  status: mysqlEnum("status", ["active", "achieved", "abandoned"]).default("active").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type FinancialGoal = typeof financialGoals.$inferSelect;
export type InsertFinancialGoal = typeof financialGoals.$inferInsert;

/**
 * Investment recommendations
 */
export const investmentRecommendations = mysqlTable("investment_recommendations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  recommendationType: varchar("recommendationType", { length: 100 }).notNull(),
  asset: varchar("asset", { length: 255 }).notNull(),
  rationale: text("rationale"),
  expectedReturn: decimal("expectedReturn", { precision: 5, scale: 2 }),
  riskLevel: mysqlEnum("riskLevel", ["low", "medium", "high"]),
  status: mysqlEnum("status", ["pending", "accepted", "rejected", "implemented"]).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type InvestmentRecommendation = typeof investmentRecommendations.$inferSelect;
export type InsertInvestmentRecommendation = typeof investmentRecommendations.$inferInsert;

/**
 * Connected financial institutions for open banking
 */
export const connectedInstitutions = mysqlTable("connected_institutions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  institutionName: varchar("institutionName", { length: 255 }).notNull(),
  institutionCode: varchar("institutionCode", { length: 50 }).notNull(),
  accountCount: int("accountCount").default(0),
  status: mysqlEnum("status", ["active", "inactive", "error"]).default("active").notNull(),
  lastSyncedAt: timestamp("lastSyncedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ConnectedInstitution = typeof connectedInstitutions.$inferSelect;
export type InsertConnectedInstitution = typeof connectedInstitutions.$inferInsert;

/**
 * Data sharing consents for open banking
 */
export const dataSharingConsents = mysqlTable("data_sharing_consents", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  institutionId: int("institutionId").notNull(),
  consentType: varchar("consentType", { length: 100 }).notNull(),
  status: mysqlEnum("status", ["pending", "approved", "revoked", "expired"]).default("pending").notNull(),
  expiresAt: timestamp("expiresAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DataSharingConsent = typeof dataSharingConsents.$inferSelect;
export type InsertDataSharingConsent = typeof dataSharingConsents.$inferInsert;

/**
 * Aggregated accounts from connected institutions
 */
export const aggregatedAccounts = mysqlTable("aggregated_accounts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  institutionId: int("institutionId").notNull(),
  accountNumber: varchar("accountNumber", { length: 50 }).notNull(),
  accountType: varchar("accountType", { length: 50 }).notNull(),
  balance: decimal("balance", { precision: 15, scale: 2 }),
  currency: varchar("currency", { length: 3 }).default("CAD"),
  lastUpdatedAt: timestamp("lastUpdatedAt"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AggregatedAccount = typeof aggregatedAccounts.$inferSelect;
export type InsertAggregatedAccount = typeof aggregatedAccounts.$inferInsert;

/**
 * Support conversations with AI assistant
 */
export const supportConversations = mysqlTable("support_conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  topic: varchar("topic", { length: 255 }),
  status: mysqlEnum("status", ["active", "escalated", "closed"]).default("active").notNull(),
  sentiment: varchar("sentiment", { length: 50 }),
  messages: json("messages"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SupportConversation = typeof supportConversations.$inferSelect;
export type InsertSupportConversation = typeof supportConversations.$inferInsert;

/**
 * Support tickets for escalated cases
 */
export const supportTickets = mysqlTable("support_tickets", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  conversationId: int("conversationId"),
  ticketNumber: varchar("ticketNumber", { length: 50 }).unique(),
  subject: varchar("subject", { length: 255 }).notNull(),
  description: text("description"),
  priority: mysqlEnum("priority", ["low", "medium", "high", "urgent"]).default("medium").notNull(),
  status: mysqlEnum("status", ["open", "in_progress", "waiting", "resolved", "closed"]).default("open").notNull(),
  assignedTo: int("assignedTo"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type SupportTicket = typeof supportTickets.$inferSelect;
export type InsertSupportTicket = typeof supportTickets.$inferInsert;

/**
 * Audit logs for compliance and security
 */
export const auditLogs = mysqlTable("audit_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId"),
  action: varchar("action", { length: 255 }).notNull(),
  resource: varchar("resource", { length: 255 }).notNull(),
  resourceId: int("resourceId"),
  details: json("details"),
  ipAddress: varchar("ipAddress", { length: 45 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type AuditLog = typeof auditLogs.$inferSelect;
export type InsertAuditLog = typeof auditLogs.$inferInsert;

/**
 * Platform analytics for admin dashboard
 */
export const platformAnalytics = mysqlTable("platform_analytics", {
  id: int("id").autoincrement().primaryKey(),
  metric: varchar("metric", { length: 255 }).notNull(),
  value: decimal("value", { precision: 15, scale: 2 }),
  period: varchar("period", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PlatformAnalytic = typeof platformAnalytics.$inferSelect;
export type InsertPlatformAnalytic = typeof platformAnalytics.$inferInsert;