import z from "zod";

export const CreateAwardSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(300),
    issuingOrg: z.string().max(300).optional(),
    date: z.string().optional(),
    description: z.string().max(2000).optional(),
  }),
});

export const UpdateAwardSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(300).optional(),
    issuingOrg: z.string().max(300).optional(),
    date: z.string().optional(),
    description: z.string().max(2000).optional(),
  }),
});

export type CreateAwardDTO = z.infer<typeof CreateAwardSchema>["body"];
export type UpdateAwardDTO = z.infer<typeof UpdateAwardSchema>["body"];
