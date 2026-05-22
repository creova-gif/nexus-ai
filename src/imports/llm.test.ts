import { describe, it, expect, vi } from "vitest";
import {
  generateSpendingInsights,
  generateInvestmentRecommendations,
  analyzeTransactionForAML,
  analyzeSentiment,
  generateSupportResponse,
} from "./llm";

// Mock the LLM module
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn(async () => ({
    choices: [
      {
        message: {
          content: "Mocked LLM response",
        },
      },
    ],
  })),
}));

describe("LLM Helper Functions", () => {
  it("should generate spending insights", async () => {
    const spendingData = {
      dining: 500,
      groceries: 300,
      entertainment: 200,
    };

    const insights = await generateSpendingInsights(spendingData);
    expect(insights).toBe("Mocked LLM response");
  });

  it("should generate investment recommendations", async () => {
    const recommendations = await generateInvestmentRecommendations("moderate", 50000, "10 years");
    expect(recommendations).toBe("Mocked LLM response");
  });

  it("should analyze transaction for AML", async () => {
    const transactionData = {
      amount: 10000,
      merchant: "Unknown Merchant",
      category: "Other",
      userHistory: "No previous large transactions",
    };

    const analysis = await analyzeTransactionForAML(transactionData);
    expect(analysis).toBe("Mocked LLM response");
  });

  it("should analyze sentiment correctly", async () => {
    const sentiment = await analyzeSentiment("I love your service!");
    expect(["positive", "neutral", "negative"]).toContain(sentiment);
  });

  it("should generate support response", async () => {
    const response = await generateSupportResponse("How do I reset my password?", {
      previousMessages: "User asked about account access",
      userProfile: "Premium customer",
    });

    expect(response).toBe("Mocked LLM response");
  });

  it("should handle sentiment analysis with default value", async () => {
    const sentiment = await analyzeSentiment("");
    expect(sentiment).toBe("neutral");
  });
});
