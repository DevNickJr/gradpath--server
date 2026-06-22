import z from "zod";

export const CreateCertificationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(300),
    issuingOrg: z.string().max(300).optional(),
    dateIssued: z.string().optional(),
    expiryDate: z.string().optional(),
    credentialUrl: z.string().url().optional(),
  }),
});

export const UpdateCertificationSchema = z.object({
  body: z.object({
    name: z.string().min(1).max(300).optional(),
    issuingOrg: z.string().max(300).optional(),
    dateIssued: z.string().optional(),
    expiryDate: z.string().optional(),
    credentialUrl: z.string().url().optional(),
  }),
});

export type CreateCertificationDTO = z.infer<typeof CreateCertificationSchema>["body"];
export type UpdateCertificationDTO = z.infer<typeof UpdateCertificationSchema>["body"];
