import z from "zod";

export const CreateExperienceSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(300),
    organization: z.string().min(1).max(300),
    type: z.enum(["work", "research", "teaching", "volunteer"]),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    isCurrent: z.boolean().optional().default(false),
    description: z.string().max(3000).optional(),
    location: z.string().max(200).optional(),
  }),
});

export const UpdateExperienceSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(300).optional(),
    organization: z.string().min(1).max(300).optional(),
    type: z.enum(["work", "research", "teaching", "volunteer"]).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    isCurrent: z.boolean().optional(),
    description: z.string().max(3000).optional(),
    location: z.string().max(200).optional(),
  }),
});

export type CreateExperienceDTO = z.infer<typeof CreateExperienceSchema>["body"];
export type UpdateExperienceDTO = z.infer<typeof UpdateExperienceSchema>["body"];
