import z from "zod";
import { RolesEnum } from "./user.interfaces";

export const UpdateProfileSchema = z.object({
  body: z.object({
    firstName: z.string().min(1).max(100).optional(),
    lastName: z.string().min(1).max(100).optional(),
    phoneNumber: z.string().min(7).max(20).optional(),
    bio: z.string().max(1000).optional(),
    profileImage: z.string().url().optional(),
    university: z.string().max(200).optional(),
    degree: z.enum(["BSc", "MSc", "PhD", "PostDoc", "Other"]).optional(),
    fieldOfStudy: z.string().max(200).optional(),
    gpa: z.number().min(0).max(5).optional(),
    graduationYear: z.number().int().min(1990).max(2040).optional(),
    countryOfOrigin: z.string().max(100).optional(),
    targetCountries: z.array(z.string()).optional(),
    researchInterests: z.array(z.string()).optional(),
    publications: z.array(z.string()).optional(),
    workExperience: z.string().max(5000).optional(),
    skills: z.array(z.string()).optional(),
    gpaScale: z.number().min(4).max(5).default(5),
  })
});

export type UpdateProfileDTO = z.infer<typeof UpdateProfileSchema>["body"];


export const UpdateRoleSchema = z.object({
  body: z.object({
    userId: z.string().min(1, { error: "userId must be provided" }),
    role: z.enum(RolesEnum, {
      error: "Role must be one of the approved roles"
    }),
  })
});

export type UpdateRoleDTO = z.infer<typeof UpdateRoleSchema>["body"];
