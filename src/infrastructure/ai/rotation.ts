import logger from "@/shared/utils/logger";

export const PROVIDERS = ["openai", "groq", "gemini"] as const;

let currentProviderIndex = 0;
let consecutiveFailures = 0;

export function getCurrentProvider() {
  return PROVIDERS[currentProviderIndex];
}

export function recordSuccess() {
  consecutiveFailures = 0;
}

export function recordFailure() {
  consecutiveFailures++;

  if (consecutiveFailures >= 3) {
    currentProviderIndex =
      (currentProviderIndex + 1) % PROVIDERS.length;

    consecutiveFailures = 0;

    logger.warn(
      `Switching provider to ${getCurrentProvider()} after 3 consecutive failures`
    );
  }
}