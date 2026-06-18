import z from "zod";

export const GenerateDocumentSchema = z.object({
  body: z.object({
    type: z.enum(["cv", "sop", "research_proposal"]),
    prompt: z.string().max(5000).optional(),
    opportunityId: z.string().uuid().optional(),
  })
});

export type GenerateDocumentDTO = z.infer<typeof GenerateDocumentSchema>["body"];
