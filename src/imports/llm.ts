import { invokeLLM } from "./_core/llm";

/**
 * Generate AI-powered financial insights based on spending data
 */
export async function generateSpendingInsights(spendingData: Record<string, number>) {
  const prompt = `Analyze the following spending data and provide 2-3 actionable financial insights:
${Object.entries(spendingData)
  .map(([category, amount]) => `- ${category}: $${amount}`)
  .join("\n")}

Provide insights in a concise, professional manner suitable for a financial advisory dashboard.`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "You are a financial advisor providing insights on spending patterns. Be concise and actionable.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0]?.message.content || "Unable to generate insights";
}

/**
 * Generate investment recommendations based on user profile
 */
export async function generateInvestmentRecommendations(
  riskProfile: string,
  investmentAmount: number,
  investmentHorizon: string
) {
  const prompt = `Generate 3 investment recommendations for:
- Risk Profile: ${riskProfile}
- Investment Amount: $${investmentAmount}
- Time Horizon: ${investmentHorizon}

Format each recommendation as: [Asset Class] - [Rationale] - [Expected Return Range]`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "You are an expert investment advisor. Provide recommendations based on Canadian market context.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0]?.message.content || "Unable to generate recommendations";
}

/**
 * Analyze transaction for AML/fraud detection
 */
export async function analyzeTransactionForAML(
  transactionData: {
    amount: number;
    merchant: string;
    category: string;
    userHistory: string;
  }
) {
  const prompt = `Analyze this transaction for potential AML/fraud concerns:
- Amount: $${transactionData.amount}
- Merchant: ${transactionData.merchant}
- Category: ${transactionData.category}
- User History: ${transactionData.userHistory}

Provide a risk score (0-100) and brief analysis.`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "You are an AML compliance expert. Analyze transactions for suspicious patterns.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0]?.message.content || "Unable to analyze transaction";
}

/**
 * Generate SAR (Suspicious Activity Report) content
 */
export async function generateSARContent(
  alertData: {
    alertType: string;
    riskScore: number;
    description: string;
    investigationFindings: string;
  }
) {
  const prompt = `Generate a professional Suspicious Activity Report (SAR) based on:
- Alert Type: ${alertData.alertType}
- Risk Score: ${alertData.riskScore}%
- Description: ${alertData.description}
- Investigation Findings: ${alertData.investigationFindings}

Format as a formal SAR with sections: Summary, Transaction Details, Risk Assessment, Findings, Recommendation.`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content:
          "You are a compliance officer drafting SARs. Use formal, professional language compliant with Canadian banking regulations.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0]?.message.content || "Unable to generate SAR";
}

/**
 * Analyze customer sentiment from support messages
 */
export async function analyzeSentiment(message: string): Promise<"positive" | "neutral" | "negative"> {
  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: "Analyze the sentiment of the following message. Respond with only one word: positive, neutral, or negative.",
      },
      {
        role: "user",
        content: message,
      },
    ],
  });

  const content = response.choices[0]?.message.content;
  const sentiment = typeof content === "string" ? content.toLowerCase().trim() : "neutral";
  if (sentiment === "positive" || sentiment === "neutral" || sentiment === "negative") {
    return sentiment;
  }
  return "neutral";
}

/**
 * Generate customer support response
 */
export async function generateSupportResponse(
  customerMessage: string,
  context: { previousMessages?: string; userProfile?: string }
) {
  const contextStr = context.previousMessages ? `Previous context: ${context.previousMessages}\n` : "";
  const profileStr = context.userProfile ? `User profile: ${context.userProfile}\n` : "";

  const prompt = `${contextStr}${profileStr}Customer message: "${customerMessage}"

Provide a helpful, professional response addressing their concern. Keep it concise and friendly.`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content:
          "You are a helpful NexusAI customer support assistant. Provide clear, professional responses to customer inquiries about banking, investments, and financial services.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return response.choices[0]?.message.content || "Thank you for your message. How can I help you today?";
}

/**
 * Extract structured data from unstructured text
 */
export async function extractFinancialData(
  text: string,
  dataType: "transaction" | "goal" | "recommendation"
) {
  const prompt = `Extract ${dataType} information from the following text and return as JSON:
"${text}"

Return only valid JSON with relevant fields for a ${dataType}.`;

  const response = await invokeLLM({
    messages: [
      {
        role: "system",
        content: `You are a data extraction expert. Extract ${dataType} information and return valid JSON only.`,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    response_format: {
      type: "json_schema",
      json_schema: {
        name: `${dataType}_extraction`,
        strict: false,
        schema: {
          type: "object",
          properties: {
            extracted: { type: "boolean" },
            data: { type: "object" },
          },
        },
      },
    },
  });

  try {
    const content = response.choices[0]?.message.content;
    const contentStr = typeof content === "string" ? content : "";
    return contentStr ? JSON.parse(contentStr) : { extracted: false, data: {} };
  } catch {
    return { extracted: false, data: {} };
  }
}
