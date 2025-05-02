import * as z from "zod";
const min = (field: string, minLength: number) =>
  `${field} must be at least ${minLength} characters`;
const max = (field: string, maxLength: number) =>
  `${field} must be less than ${maxLength} characters`;
const email = (field: string) => `${field} must be a valid email`;
const required = (field: string) => `${field} is required`;
export const loginSchema = z.object({
  email: z.string().email(email("Email")),
  password: z
    .string()
    .min(5, min("Password", 5))
    .max(100, max("Password", 100)),
});
export type LoginSchemaType = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(3, min("Name", 3)).max(100, max("Name", 100)),
    email: z.string().email(email("Email")),
    password: z
      .string()
      .min(5, min("Password", 5))
      .max(100, max("Password", 100)),
    confirm: z
      .string()
      .min(5)
      .min(5, min("Password", 5))
      .max(100, max("Password", 100)),
  })
  .refine((data) => data.confirm === data.password, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
export type RegisterSchemaType = z.infer<typeof registerSchema>;
