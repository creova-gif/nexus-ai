import { protectedProcedure, router } from "../_core/trpc";
import { z } from "zod";
import { getDb } from "../db";
import { supportConversations, supportTickets } from "../../drizzle/schema";
import { eq, desc } from "drizzle-orm";

export const supportRouter = router({
  /**
   * Get or create a support conversation for the current user
   */
  getConversation: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return null;

    const conversations = await db
      .select()
      .from(supportConversations)
      .where(eq(supportConversations.userId, ctx.user.id))
      .orderBy(desc(supportConversations.createdAt))
      .limit(1);

    if (conversations.length > 0) {
      return conversations[0];
    }

    // Create new conversation
    await db.insert(supportConversations).values({
      userId: ctx.user.id,
      status: "active",
    });

    return { userId: ctx.user.id, status: "active" };
  }),

  /**
   * Add a message to the conversation
   */
  addMessage: protectedProcedure
    .input(
      z.object({
        conversationId: z.number(),
        message: z.string(),
        sentiment: z.string().optional(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return false;

      // In a real implementation, you would append to the messages JSON array
      // For now, we'll just update the sentiment
      await db
        .update(supportConversations)
        .set({
          sentiment: input.sentiment || "neutral",
          updatedAt: new Date(),
        })
        .where(eq(supportConversations.id, input.conversationId));

      return true;
    }),

  /**
   * Get all support tickets for the current user
   */
  getTickets: protectedProcedure.query(async ({ ctx }) => {
    const db = await getDb();
    if (!db) return [];

    const tickets = await db
      .select()
      .from(supportTickets)
      .where(eq(supportTickets.userId, ctx.user.id))
      .orderBy(desc(supportTickets.createdAt));

    return tickets;
  }),

  /**
   * Create a support ticket
   */
  createTicket: protectedProcedure
    .input(
      z.object({
        subject: z.string(),
        description: z.string(),
        priority: z.enum(["low", "medium", "high", "urgent"]).default("medium"),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const db = await getDb();
      if (!db) return null;

      // Generate ticket number
      const ticketNumber = `TKT-${Date.now()}`;

      await db.insert(supportTickets).values({
        userId: ctx.user.id,
        ticketNumber,
        subject: input.subject,
        description: input.description,
        priority: input.priority,
        status: "open",
      });

      return { ticketNumber, success: true };
    }),

  /**
   * Update ticket status
   */
  updateTicketStatus: protectedProcedure
    .input(
      z.object({
        ticketId: z.number(),
        status: z.enum(["open", "in_progress", "waiting", "resolved", "closed"]),
      })
    )
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return false;

      await db
        .update(supportTickets)
        .set({ status: input.status, updatedAt: new Date() })
        .where(eq(supportTickets.id, input.ticketId));

      return true;
    }),

  /**
   * Escalate a ticket to human agent
   */
  escalateTicket: protectedProcedure
    .input(z.object({ ticketId: z.number() }))
    .mutation(async ({ input }) => {
      const db = await getDb();
      if (!db) return false;

      await db
        .update(supportTickets)
        .set({ status: "waiting", updatedAt: new Date() })
        .where(eq(supportTickets.id, input.ticketId));

      return true;
    }),
});
