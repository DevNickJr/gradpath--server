import z from "zod";

export const CreateEducationSchema = z.object({
  body: z.object({
    institution: z.string().min(1).max(300),
    degree: z.enum(["BSc", "MSc", "PhD", "PostDoc", "Other"]),
    fieldOfStudy: z.string().min(1).max(300),
    gpa: z.number().min(0).max(10).optional(),
    gpaScale: z.number().min(1).max(10).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    country: z.string().max(100).optional(),
    thesis: z.string().max(500).optional(),
    description: z.string().max(2000).optional(),
  }),
});

export const UpdateEducationSchema = z.object({
  body: z.object({
    institution: z.string().min(1).max(300).optional(),
    degree: z.enum(["BSc", "MSc", "PhD", "PostDoc", "Other"]).optional(),
    fieldOfStudy: z.string().min(1).max(300).optional(),
    gpa: z.number().min(0).max(10).optional(),
    gpaScale: z.number().min(1).max(10).optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    country: z.string().max(100).optional(),
    thesis: z.string().max(500).optional(),
    description: z.string().max(2000).optional(),
  }),
});

export type CreateEducationDTO = z.infer<typeof CreateEducationSchema>["body"];
export type UpdateEducationDTO = z.infer<typeof UpdateEducationSchema>["body"];
