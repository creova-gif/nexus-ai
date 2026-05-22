import { protectedProcedure, adminProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { users, platformAnalytics, auditLogs } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const adminRouter = router({
  /**
   * Get all users (admin only)
   */
  getAllUsers: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];

    const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));
    return allUsers;
  }),

  /**
   * Get users by role (admin only)
   */
  getUsersByRole: adminProcedure
    .input(z.object({ role: z.enum(["bank_admin", "compliance_officer", "financial_advisor", "retail_customer"]) }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const roleUsers = await db.select().from(users).where(eq(users.role, input.role));
      return roleUsers;
    }),

  /**
   * Update user role (admin only)
   */
  updateUserRole: adminProcedure
    .input(
      z.object({
        userId: z.number(),
        role: z.enum(["bank_admin", "compliance_officer", "financial_advisor", "retail_customer"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return false;

      await db.update(users).set({ role: input.role, updatedAt: new Date() }).where(eq(users.id, input.userId));

      return true;
    }),

  /**
   * Get platform analytics
   */
  getAnalytics: adminProcedure.query(async () => {
    const db = await getDb();
    if (!db) return [];

    const analytics = await db.select().from(platformAnalytics).orderBy(desc(platformAnalytics.createdAt));
    return analytics;
  }),

  /**
   * Record a metric
   */
  recordMetric: adminProcedure
    .input(
      z.object({
        metric: z.string(),
        value: z.string(),
        period: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return false;

      await db.insert(platformAnalytics).values({
        metric: input.metric,
        value: input.value,
        period: input.period,
      });

      return true;
    }),

  /**
   * Get audit logs
   */
  getAuditLogs: adminProcedure
    .input(
      z.object({
        limit: z.number().default(100),
        offset: z.number().default(0),
      })
    )
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return [];

      const logs = await db
        .select()
        .from(auditLogs)
        .orderBy(desc(auditLogs.createdAt))
        .limit(input.limit)
        .offset(input.offset);

      return logs;
    }),

  /**
   * Log an audit event
   */
  logAuditEvent: protectedProcedure
    .input(
      z.object({
        action: z.string(),
        resource: z.string(),
        resourceId: z.number().optional(),
        details: z.record(z.string(), z.any()).optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return false;

      await db.insert(auditLogs).values({
        userId: ctx.user.id,
        action: input.action,
        resource: input.resource,
        resourceId: input.resourceId,
        details: input.details as any,
      });

      return true;
    }),

  /**
   * Get platform health status
   */
  getHealthStatus: adminProcedure.query(async () => {
    // In a real implementation, this would check database, cache, external services, etc.
      return {
        status: "healthy" as const,
        database: "connected" as const,
        cache: "operational" as const,
        timestamp: new Date().toISOString(),
      };
  }),
});
