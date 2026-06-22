import z from "zod";

export const CreateTestScoreSchema = z.object({
  body: z.object({
    testName: z.enum(["GRE", "TOEFL", "IELTS", "GMAT", "Other"]),
    score: z.number().min(0),
    subScores: z.record(z.string(), z.number()).optional(),
    dateTaken: z.string().optional(),
    expiryDate: z.string().optional(),
  }),
});

export const UpdateTestScoreSchema = z.object({
  body: z.object({
    testName: z.enum(["GRE", "TOEFL", "IELTS", "GMAT", "Other"]).optional(),
    score: z.number().min(0).optional(),
    subScores: z.record(z.string(), z.number()).optional(),
    dateTaken: z.string().optional(),
    expiryDate: z.string().optional(),
  }),
});

export type CreateTestScoreDTO = z.infer<typeof CreateTestScoreSchema>["body"];
export type UpdateTestScoreDTO = z.infer<typeof UpdateTestScoreSchema>["body"];
