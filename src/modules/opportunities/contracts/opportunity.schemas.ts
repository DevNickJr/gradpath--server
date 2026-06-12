import z from "zod";

export const CreateOpportunitySchema = z.object({
  body: z.object({
    title: z.string().min(3).max(300),
    description: z.string().min(20).max(10000),
    university: z.string().min(2).max(300),
    country: z.string().min(2).max(100),
    opportunityType: z.enum(["scholarship", "fellowship", "assistantship", "funded_program", "grant"]),
    degreeLevel: z.enum(["bachelors", "masters", "phd", "postdoc"]),
    fieldsOfStudy: z.array(z.string()).default([]),
    fundingType: z.enum(["fully_funded", "partially_funded", "self_funded"]),
    benefits: z.array(z.string()).default([]),
    deadline: z.string().transform(val => new Date(val)),
    applicationLink: z.string().url(),
    sourceUrl: z.string().url().optional(),
    isFeatured: z.boolean().default(false),
  })
});

export type CreateOpportunityDTO = z.infer<typeof CreateOpportunitySchema>["body"];

export const UpdateOpportunitySchema = z.object({
  body: CreateOpportunitySchema.shape.body.partial()
});

export type UpdateOpportunityDTO = z.infer<typeof UpdateOpportunitySchema>["body"];

export const SearchOpportunityQuerySchema = z.object({
  query: z.object({
    country: z.string().optional(),
    degreeLevel: z.enum(["bachelors", "masters", "phd", "postdoc"]).optional(),
    opportunityType: z.enum(["scholarship", "fellowship", "assistantship", "funded_program", "grant"]).optional(),
    fundingType: z.enum(["fully_funded", "partially_funded", "self_funded"]).optional(),
    search: z.string().optional(),
    deadlineBefore: z.string().optional(),
    deadlineAfter: z.string().optional(),
    page: z.string()
      .transform(val => parseInt(val || "1", 10))
      .pipe(z.number().int().positive())
      .optional()
      .default(1),
    limit: z.string()
      .transform(val => parseInt(val || "20", 10))
      .pipe(z.number().int().positive().max(100))
      .optional()
      .default(20),
    sortBy: z.enum(["deadline", "createdAt"]).default("createdAt"),
    sortOrder: z.enum(["ASC", "DESC"]).default("DESC"),
  })
});

export type SearchOpportunityQuery = z.infer<typeof SearchOpportunityQuerySchema>["query"];
