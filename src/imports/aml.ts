import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { amlAlerts, alertInvestigations, suspiciousActivityReports } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const amlRouter = router({
  /**
   * Get all AML alerts for the current user (compliance officer)
   */
  getAlerts: protectedProcedure
    .input(
      z.object({
        status: z.enum(["new", "investigating", "resolved", "escalated"]).optional(),
        limit: z.number().default(50),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return [];

      const baseQuery = db.select().from(amlAlerts);
      const filtered = input.status ? baseQuery.where(eq(amlAlerts.status, input.status)) : baseQuery;
      const alerts = await filtered.orderBy(desc(amlAlerts.createdAt)).limit(input.limit).offset(input.offset);

      return alerts;
    }),

  /**
   * Get alert details with investigation history
   */
  getAlertDetail: protectedProcedure
    .input(z.object({ alertId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return null;

      const alert = await db.select().from(amlAlerts).where(eq(amlAlerts.id, input.alertId)).limit(1);
      if (alert.length === 0) return null;

      const investigations = await db
        .select()
        .from(alertInvestigations)
        .where(eq(alertInvestigations.alertId, input.alertId))
        .orderBy(desc(alertInvestigations.createdAt));

      return {
        alert: alert[0],
        investigations,
      };
    }),

  /**
   * Update alert status
   */
  updateAlertStatus: protectedProcedure
    .input(
      z.object({
        alertId: z.number(),
        status: z.enum(["new", "investigating", "resolved", "escalated"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return false;

      await db
        .update(amlAlerts)
        .set({ status: input.status, updatedAt: new Date() })
        .where(eq(amlAlerts.id, input.alertId));

      return true;
    }),

  /**
   * Create or update an investigation
   */
  createInvestigation: protectedProcedure
    .input(
      z.object({
        alertId: z.number(),
        notes: z.string().optional(),
        findings: z.string().optional(),
        status: z.enum(["open", "in_progress", "closed", "escalated"]).default("open"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return null;

      await db.insert(alertInvestigations).values({
        alertId: input.alertId,
        investigatorId: ctx.user.id,
        notes: input.notes,
        findings: input.findings,
        status: input.status,
      });

      return { success: true };
    }),

  /**
   * Generate a Suspicious Activity Report (SAR)
   */
  generateSAR: protectedProcedure
    .input(
      z.object({
        alertId: z.number(),
        investigationId: z.number(),
        content: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return null;

      // Generate SAR report number (NEXUS-YYYYMMDD-XXXXX format)
      const now = new Date();
      const dateStr = now.toISOString().split("T")[0].replace(/-/g, "");
      const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
      const reportNumber = `NEXUS-${dateStr}-${randomStr}`;

      await db.insert(suspiciousActivityReports).values({
        alertId: input.alertId,
        investigationId: input.investigationId,
        reportNumber,
        content: input.content,
        status: "draft",
        submittedBy: ctx.user.id,
      });

      return { reportNumber, success: true };
    }),

  /**
   * Submit a SAR to authorities
   */
  submitSAR: protectedProcedure
    .input(z.object({ sarId: z.number() }))
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return false;

      await db
        .update(suspiciousActivityReports)
        .set({
          status: "submitted",
          submittedAt: new Date(),
          submittedBy: ctx.user.id,
          updatedAt: new Date(),
        })
        .where(eq(suspiciousActivityReports.id, input.sarId));

      return true;
    }),

  /**
   * Get transaction network data for visualization
   */
  getTransactionNetwork: protectedProcedure
    .input(z.object({ alertId: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return { nodes: [], edges: [] };

      // This is a simplified implementation
      // In production, you would query related transactions and build a network graph
      return {
        nodes: [
          { id: "user-1", label: "Customer A", type: "user" },
          { id: "user-2", label: "Customer B", type: "user" },
          { id: "merchant-1", label: "Merchant X", type: "merchant" },
        ],
        edges: [
          { source: "user-1", target: "merchant-1", label: "$5,000" },
          { source: "user-2", target: "merchant-1", label: "$3,500" },
        ],
      };
    }),
});
