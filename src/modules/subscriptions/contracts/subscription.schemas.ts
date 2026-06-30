import { z } from "zod";

export const InitiateCheckoutSchema = z.object({
  body: z.object({
    plan: z.enum(["pro", "basic"]),
    redirectUrl: z.string().url(),
  }),
});

export type InitiateCheckoutDTO = z.infer<typeof InitiateCheckoutSchema>["body"];

export const FlutterwaveWebhookSchema = z.object({
  body: z.object({
    event: z.string(),
    data: z.object({
      id: z.number(),
      tx_ref: z.string(),
      flw_ref: z.string(),
      amount: z.number(),
      currency: z.string(),
      status: z.string(),
      customer: z.object({
        email: z.string(),
      }),
      meta: z.record(z.string(), z.any()).optional(),
    }),
  }),
});

export type FlutterwaveWebhookDTO = z.infer<typeof FlutterwaveWebhookSchema>["body"];
