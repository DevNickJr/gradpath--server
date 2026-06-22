import OpenAI from "openai";
import env from "@/configs/env.config";
import logger from "@/shared/utils/logger";
import { getCurrentModel, getCurrentProvider, getTotalAvailableConfigurations, PROVIDERS, recordFailure, recordSuccess } from "./rotation";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ChatCompletionResponse {
  content: string;
  model: string;
  totalTokens: number;
}

function getProviderConfig(name: typeof PROVIDERS[number]) {
  switch (name) {
    case "groq":
      return {
        apiKey: env.GROQ_API_KEY,
        baseURL: "https://api.groq.com/openai/v1",
      };

    case "gemini":
      return {
        apiKey: env.GEMINI_API_KEY,
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
      };

    case "openai":
      return {
        apiKey: env.OPENAI_API_KEY,
        baseURL: "https://api.openai.com/v1",
      };
    default:
      return {
        apiKey: env.OPENAI_API_KEY,
        baseURL: "https://api.openai.com/v1",
      };
  }
}

export async function chatCompletion(
  messages: ChatMessage[],
  attemptCount = 0
): Promise<ChatCompletionResponse> {
  const providerName = getCurrentProvider();
  const modelName = getCurrentModel();
  const provider = getProviderConfig(providerName);
  const maxConfigAttempts = getTotalAvailableConfigurations();

  // Safeguard against infinite loops if every single model across all providers is rate-limited
  if (attemptCount >= maxConfigAttempts) {
   logger.error("All tiers and providers are entirely rate-limited.");
    // TODO: Add a time to next call  
    throw new Error("Service temporarily unavailable due to upstream rate limits.");
  }
  
  try {
    if (!provider.apiKey) {
      throw new Error(
        `API key not configured for provider: ${providerName}`
      );
    }
  
    const client = new OpenAI({
      apiKey: provider.apiKey,
      baseURL: provider.baseURL,
    });
  
    const response = await client.chat.completions.create({
      model: modelName,
      messages,
      temperature: 0.7,
      max_tokens: 4000,
    });
  
    logger.info(
      `LLM response: provider=${providerName}, model=${response.model}, tokens=${response.usage?.total_tokens ?? 0}`
    );
  
    recordSuccess();
  
    return {
      content: response.choices?.[0]?.message?.content || "",
      model: response.model,
      totalTokens: response.usage?.total_tokens || 0,
    };
  } catch (error: any) {
    recordFailure();
    
    // 2. Identify if the error is a Rate Limit (429) or Quota/Auth issue (403/401)
    const statusCode = error?.status || error?.statusCode;
    const isRateLimitOrQuota = statusCode === 429 || statusCode === 403 || statusCode === 401;
    const isMissingKey = error?.message?.includes("API key not configured");

    if (isRateLimitOrQuota || isMissingKey) {
      logger.warn(
        `Provider execution failed [Status: ${statusCode || 'Local Config Error'}]. Attempting fallback... Failed Provider: ${providerName}`
      );

      // 3. Fallback Mechanism:
      // Assuming your `recordFailure()` updates the state so that the NEXT call to `getCurrentProvider()` 
      // returns a different provider, we recursively invoke the function again.
      return chatCompletion(messages, attemptCount+1);
    }

    // 4. Critical Developer Error: If it's a structural error (e.g., bad payload syntax 400), don't mask it; throw immediately.
    logger.error(`Critical non-rate-limit error encountered on provider ${providerName}:`, error);
    throw error;
  }

}