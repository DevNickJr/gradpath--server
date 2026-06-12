import z from "zod";

export const CreateApplicationSchema = z.object({
  body: z.object({
    opportunityId: z.string().uuid(),
    notes: z.string().max(2000).default(""),
    deadlineAt: z.string().transform(val => new Date(val)).optional(),
  })
});

export type CreateApplicationDTO = z.infer<typeof CreateApplicationSchema>["body"];

export const UpdateApplicationSchema = z.object({
  body: z.object({
    status: z.enum(["interested", "applying", "submitted", "accepted", "rejected", "withdrawn"]).optional(),
    notes: z.string().max(2000).optional(),
    submittedAt: z.string().transform(val => new Date(val)).optional(),
    deadlineAt: z.string().transform(val => new Date(val)).optional(),
  })
});

export type UpdateApplicationDTO = z.infer<typeof UpdateApplicationSchema>["body"];
