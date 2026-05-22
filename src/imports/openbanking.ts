import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { connectedInstitutions, dataSharingConsents, aggregatedAccounts } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const openbankingRouter = router({
  /**
   * Get connected institutions for the current user
   */
  getConnectedInstitutions: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const institutions = await db
      .select()
      .from(connectedInstitutions)
      .where(eq(connectedInstitutions.userId, ctx.user.id))
      .orderBy(desc(connectedInstitutions.createdAt));

    return institutions;
  }),

  /**
   * Connect a new institution
   */
  connectInstitution: protectedProcedure
    .input(
      z.object({
        institutionName: z.string(),
        institutionCode: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return null;

      await db.insert(connectedInstitutions).values({
        userId: ctx.user.id,
        institutionName: input.institutionName,
        institutionCode: input.institutionCode,
        status: "active",
      });

      return { success: true };
    }),

  /**
   * Get data sharing consents
   */
  getConsents: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const consents = await db
      .select()
      .from(dataSharingConsents)
      .where(eq(dataSharingConsents.userId, ctx.user.id))
      .orderBy(desc(dataSharingConsents.createdAt));

    return consents;
  }),

  /**
   * Grant or revoke data sharing consent
   */
  updateConsent: protectedProcedure
    .input(
      z.object({
        institutionId: z.number(),
        consentType: z.string(),
        status: z.enum(["pending", "approved", "revoked", "expired"]),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return false;

      const existing = await db
        .select()
        .from(dataSharingConsents)
        .where(
          eq(dataSharingConsents.userId, ctx.user.id)
        );

      if (existing.length > 0) {
        await db
          .update(dataSharingConsents)
          .set({ status: input.status, updatedAt: new Date() })
          .where(eq(dataSharingConsents.userId, ctx.user.id));
      } else {
        await db.insert(dataSharingConsents).values({
          userId: ctx.user.id,
          institutionId: input.institutionId,
          consentType: input.consentType,
          status: input.status,
        });
      }

      return true;
    }),

  /**
   * Get aggregated accounts across all connected institutions
   */
  getAggregatedAccounts: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const accounts = await db
      .select()
      .from(aggregatedAccounts)
      .where(eq(aggregatedAccounts.userId, ctx.user.id))
      .orderBy(desc(aggregatedAccounts.createdAt));

    return accounts;
  }),

  /**
   * Get financial overview (total balance across all accounts)
   */
  getFinancialOverview: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return { totalBalance: "0", accountCount: 0, institutions: 0 };

    const accounts = await db
      .select()
      .from(aggregatedAccounts)
      .where(eq(aggregatedAccounts.userId, ctx.user.id));

    const institutions = await db
      .select()
      .from(connectedInstitutions)
      .where(eq(connectedInstitutions.userId, ctx.user.id));

    // Calculate total balance (simplified - in production, use proper decimal arithmetic)
    let totalBalance = 0;
    for (const account of accounts) {
      if (account.balance) {
        totalBalance += parseFloat(account.balance.toString());
      }
    }

    return {
      totalBalance: totalBalance.toFixed(2),
      accountCount: accounts.length,
      institutions: institutions.length,
    };
  }),
});
