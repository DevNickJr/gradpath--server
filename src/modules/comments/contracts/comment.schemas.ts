import z from "zod";

export const CreateCommentSchema = z.object({
  body: z.object({
    content: z.string().min(1).max(2000),
    parentId: z.string().uuid().optional(),
  }),
});

export type CreateCommentDTO = z.infer<typeof CreateCommentSchema>["body"];
