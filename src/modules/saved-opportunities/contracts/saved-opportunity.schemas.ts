import z from "zod";

export const SaveOpportunitySchema = z.object({
  body: z.object({
    opportunityId: z.string().uuid(),
  })
});

export type SaveOpportunityDTO = z.infer<typeof SaveOpportunitySchema>["body"];
