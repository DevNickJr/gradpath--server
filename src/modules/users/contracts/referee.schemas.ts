import z from "zod";

export const CreateRefereeSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(200),
    title: z.string().max(200).optional(),
    institution: z.string().max(300).optional(),
    email: z.string().email().optional(),
    phone: z.string().max(20).optional(),
    relationship: z.string().max(200).optional(),
  }),
});

export const UpdateRefereeSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(200).optional(),
    title: z.string().max(200).optional(),
    institution: z.string().max(300).optional(),
    email: z.string().email().optional(),
    phone: z.string().max(20).optional(),
    relationship: z.string().max(200).optional(),
  }),
});

export type CreateRefereeDTO = z.infer<typeof CreateRefereeSchema>["body"];
export type UpdateRefereeDTO = z.infer<typeof UpdateRefereeSchema>["body"];
