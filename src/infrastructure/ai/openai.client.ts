import OpenAI from "openai";
import env from "@/configs/env.config";
import logger from "@/shared/utils/logger";
import { getCurrentProvider, PROVIDERS, recordFailure, recordSuccess } from "./rotation";

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
        model: env.GROQ_MODEL || "llama-3.3-70b-versatile",
        baseURL: "https://api.groq.com/openai/v1",
      };

    case "gemini":
      return {
        apiKey: env.GEMINI_API_KEY,
        model: env.GEMINI_MODEL || "gemini-2.5-flash",
        baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
      };

    case "openai":
      return {
        apiKey: env.OPENAI_API_KEY,
        model: env.OPENAI_MODEL || "gpt-5-mini",
        baseURL: "https://api.openai.com/v1",
      };
    default:
      return {
        apiKey: env.OPENAI_API_KEY,
        model: env.OPENAI_MODEL || "gpt-5-mini",
        baseURL: "https://api.openai.com/v1",
      };
  }
}

export async function chatCompletion(
  messages: ChatMessage[]
): Promise<ChatCompletionResponse> {
  const providerName = getCurrentProvider();
  const provider = getProviderConfig(providerName);

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
      model: provider.model,
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
  } catch (error) {
    recordFailure();
    
    throw error
  }

}