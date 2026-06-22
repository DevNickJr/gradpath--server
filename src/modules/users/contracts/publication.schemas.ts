import z from "zod";

export const CreatePublicationSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(500),
    journal: z.string().max(300).optional(),
    date: z.string().optional(),
    authors: z.array(z.string()).optional(),
    url: z.string().url().optional(),
    type: z.enum(["journal", "conference", "preprint", "thesis"]).optional(),
  }),
});

export const UpdatePublicationSchema = z.object({
  body: z.object({
    title: z.string().min(1).max(500).optional(),
    journal: z.string().max(300).optional(),
    date: z.string().optional(),
    authors: z.array(z.string()).optional(),
    url: z.string().url().optional(),
    type: z.enum(["journal", "conference", "preprint", "thesis"]).optional(),
  }),
});

export type CreatePublicationDTO = z.infer<typeof CreatePublicationSchema>["body"];
export type UpdatePublicationDTO = z.infer<typeof UpdatePublicationSchema>["body"];
