import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { spendingInsights, financialGoals, investmentRecommendations, customerProfiles } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const advisoryRouter = router({
  /**
   * Get spending insights for the current user
   */
  getSpendingInsights: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const insights = await db
      .select()
      .from(spendingInsights)
      .where(eq(spendingInsights.userId, ctx.user.id))
      .orderBy(desc(spendingInsights.createdAt));

    return insights;
  }),

  /**
   * Get financial goals for the current user
   */
  getFinancialGoals: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const goals = await db
      .select()
      .from(financialGoals)
      .where(eq(financialGoals.userId, ctx.user.id))
      .orderBy(desc(financialGoals.createdAt));

    return goals;
  }),

  /**
   * Create a new financial goal
   */
  createGoal: protectedProcedure
    .input(
      z.object({
        goalName: z.string(),
        goalType: z.string(),
        targetAmount: z.string(),
        targetDate: z.date().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return null;

      await db.insert(financialGoals).values({
        userId: ctx.user.id,
        goalName: input.goalName,
        goalType: input.goalType,
        targetAmount: input.targetAmount,
        targetDate: input.targetDate,
        status: "active",
      });

      return { success: true };
    }),

  /**
   * Update goal progress
   */
  updateGoalProgress: protectedProcedure
    .input(
      z.object({
        goalId: z.number(),
        currentAmount: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return false;

      await db
        .update(financialGoals)
        .set({ currentAmount: input.currentAmount, updatedAt: new Date() })
        .where(eq(financialGoals.id, input.goalId));

      return true;
    }),

  /**
   * Get investment recommendations
   */
  getRecommendations: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const recommendations = await db
      .select()
      .from(investmentRecommendations)
      .where(eq(investmentRecommendations.userId, ctx.user.id))
      .orderBy(desc(investmentRecommendations.createdAt));

    return recommendations;
  }),

  /**
   * Get or create customer profile
   */
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;

    const profiles = await db
      .select()
      .from(customerProfiles)
      .where(eq(customerProfiles.userId, ctx.user.id));

    if (profiles.length > 0) {
      return profiles[0];
    }

    // Create default profile
    await db.insert(customerProfiles).values({
      userId: ctx.user.id,
      riskProfile: "moderate",
    });

    return { userId: ctx.user.id, riskProfile: "moderate" };
  }),

  /**
   * Update customer profile
   */
  updateProfile: protectedProcedure
    .input(
      z.object({
        riskProfile: z.enum(["conservative", "moderate", "aggressive"]).optional(),
        investmentExperience: z.string().optional(),
        annualIncome: z.string().optional(),
        netWorth: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return false;

      const profiles = await db
        .select()
        .from(customerProfiles)
        .where(eq(customerProfiles.userId, ctx.user.id));

      if (profiles.length === 0) {
        await db.insert(customerProfiles).values({
          userId: ctx.user.id,
          ...input,
        });
      } else {
        await db
          .update(customerProfiles)
          .set({ ...input, updatedAt: new Date() })
          .where(eq(customerProfiles.userId, ctx.user.id));
      }

      return true;
    }),
});
