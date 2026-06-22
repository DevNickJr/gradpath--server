import z from "zod";

export const CreateInquirySchema = z.object({
  body: z.object({
    subject: z.string().min(1).max(300),
    message: z.string().min(1).max(5000),
  }),
});

export const ReplyInquirySchema = z.object({
  body: z.object({
    message: z.string().min(1).max(5000),
  }),
});

export const UpdateInquiryStatusSchema = z.object({
  body: z.object({
    status: z.enum(["open", "resolved"]),
  }),
});

export type CreateInquiryDTO = z.infer<typeof CreateInquirySchema>["body"];
export type ReplyInquiryDTO = z.infer<typeof ReplyInquirySchema>["body"];
export type UpdateInquiryStatusDTO = z.infer<typeof UpdateInquiryStatusSchema>["body"];
