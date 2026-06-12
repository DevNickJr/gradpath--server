import { RolesEnum } from "@/shared/interfaces";
import z from "zod";

export const CreateUserSchema = z.object({
  body: z.object({
    email: z.email({ error: "email not valid" }),
    password: z.string().min(8),
    role: z.enum(RolesEnum, {
      error: "Role must be student | agent"
    }).default(RolesEnum.STUDENT)
  })
});

export type CreateUserDTO = z.infer<typeof CreateUserSchema>["body"];

export const LoginUserSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(8),
    rememberMe: z.boolean().default(false)
  })
});

export type LoginUserDTO = z.infer<typeof LoginUserSchema>["body"];