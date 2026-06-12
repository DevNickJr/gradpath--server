import axios from "axios";
import env from "@/configs/env.config";
import logger from "@/shared/utils/logger";

interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

interface ChatCompletionResponse {
  content: string;
  model: string;
  totalTokens: number;
}

export async function chatCompletion(messages: ChatMessage[]): Promise<ChatCompletionResponse> {
  if (!env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const response = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: env.OPENAI_MODEL,
      messages,
      temperature: 0.7,
      max_tokens: 4000,
    },
    {
      headers: {
        "Authorization": `Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  const data = response.data;
  logger.info(`OpenAI response: model=${data.model}, tokens=${data.usage?.total_tokens}`);

  return {
    content: data.choices[0]?.message?.content || "",
    model: data.model,
    totalTokens: data.usage?.total_tokens || 0,
  };
}
