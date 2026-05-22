import { describe, it, expect, beforeEach, vi } from "vitest";
import { amlRouter } from "./aml";
import type { TrpcContext } from "../_core/context";

// Mock database
vi.mock("../db", () => ({
  getDb: vi.fn(() => null),
}));

function createMockContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "test-user",
      name: "Test User",
      email: "test@example.com",
      loginMethod: "manus",
      role: "compliance_officer",
      bankId: null,
      department: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: {
      protocol: "https",
      headers: {},
    } as any,
    res: {
      clearCookie: vi.fn(),
    } as any,
  };
}

describe("AML Router", () => {
  let ctx: TrpcContext;

  beforeEach(() => {
    ctx = createMockContext();
  });

  describe("getAlerts", () => {
    it("should return empty array when database is unavailable", async () => {
      const caller = amlRouter.createCaller(ctx);
      const result = await caller.getAlerts({});
      expect(result).toEqual([]);
    });
  });

  describe("updateAlertStatus", () => {
    it("should return false when database is unavailable", async () => {
      const caller = amlRouter.createCaller(ctx);
      const result = await caller.updateAlertStatus({
        alertId: 1,
        status: "investigating",
      });
      expect(result).toBe(false);
    });
  });

  describe("getTransactionNetwork", () => {
    it("should return network structure with nodes and edges", async () => {
      const caller = amlRouter.createCaller(ctx);
      const result = await caller.getTransactionNetwork({ alertId: 1 });

      expect(result).toHaveProperty("nodes");
      expect(result).toHaveProperty("edges");
      expect(Array.isArray(result.nodes)).toBe(true);
      expect(Array.isArray(result.edges)).toBe(true);
    });
  });
});
